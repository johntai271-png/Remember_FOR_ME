import 'dart:async';
import 'dart:math';

import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_blue_plus/flutter_blue_plus.dart';

import '../models/task.dart';

const familyId = 'family_001';
const familyPath = 'families/$familyId';
const defaultEmergencyMessage =
    'Ngoại ơi, con đang gọi. Xin hãy nhìn vào màn hình.';

/// Một thông báo cần phát loa + hiển thị overlay.
class KioskAlert {
  const KioskAlert({
    required this.id,
    required this.title,
    required this.message,
    required this.isEmergency,
  });

  final String id;
  final String title;
  final String message;
  final bool isEmergency;
}

bool _isDesktopOrWeb() =>
    kIsWeb || defaultTargetPlatform == TargetPlatform.windows;

/// Gom toàn bộ logic đồng bộ Firebase của Kiosk:
/// - Lắng nghe `tasks`, `emergency`, `elder/status`, `ble`.
/// - Phát heartbeat 10s, mô phỏng vitals 30s.
/// - Cập nhật `tracker_alert` theo trạng thái elder.
/// - Quét BLE tag để suy ra in_home / out_of_home (chỉ trên thiết bị thật).
class KioskSyncService extends ChangeNotifier {
  KioskSyncService() : _familyRef = FirebaseDatabase.instance.ref(familyPath);

  final DatabaseReference _familyRef;
  final Random _random = Random();

  StreamSubscription<DatabaseEvent>? _tasksSub;
  StreamSubscription<DatabaseEvent>? _emergencySub;
  StreamSubscription<DatabaseEvent>? _elderSub;
  StreamSubscription<DatabaseEvent>? _bleConfigSub;
  StreamSubscription<List<ScanResult>>? _bleResultsSub;
  Timer? _heartbeatTimer;
  Timer? _vitalsTimer;
  Timer? _scheduleTimer;
  Timer? _bleScanTimer;
  Timer? _bleMissingTimer;

  List<KioskTask> _tasks = const [];
  String _elderStatus = 'unknown';
  String _elderName = 'Ngoại';
  int? _heartRateBpm;
  String _vitalsStatus = 'No data';
  bool _bleEnabled = false;
  String _tagId = 'SMART_TAG_UUID';
  DateTime? _lastTagSeenAt;

  /// Theo dõi task đã tự kêu theo lịch, gắn theo ngày để reset mỗi ngày mới.
  /// Khóa = "yyyy-mm-dd:taskId".
  final Set<String> _autoFiredKeys = {};

  /// Hàng đợi alert phát ra cho UI tiêu thụ.
  final StreamController<KioskAlert> _alertController =
      StreamController<KioskAlert>.broadcast();

  List<KioskTask> get tasks => _tasks;
  String get elderStatus => _elderStatus;
  String get elderName => _elderName;
  int? get heartRateBpm => _heartRateBpm;
  String get vitalsStatus => _vitalsStatus;
  bool get bleEnabled => _bleEnabled;
  String get tagId => _tagId;
  Stream<KioskAlert> get alerts => _alertController.stream;

  void start() {
    _listenToFirebase();
    _startHeartbeat();
    _startVitalsSimulation();
    _startScheduleWatcher();
  }

  void _listenToFirebase() {
    _tasksSub = _familyRef.child('tasks').onValue.listen((event) {
      final tasks = KioskTask.parseList(event.snapshot.value);
      _tasks = tasks;
      notifyListeners();
      for (final task in tasks.where((t) => t.isTriggered)) {
        _alertController.add(KioskAlert(
          id: task.id,
          title: task.name,
          message: task.speakText,
          isEmergency: false,
        ));
      }
    });

    _emergencySub = _familyRef.child('emergency').onValue.listen((event) {
      final data =
          event.snapshot.value is Map ? event.snapshot.value as Map : const {};
      if (KioskTask.fromMap('emergency', {'is_triggered': data['is_triggered']})
          .isTriggered) {
        _alertController.add(KioskAlert(
          id: 'emergency',
          title: 'Cuộc gọi khẩn cấp',
          message: '${data['message'] ?? defaultEmergencyMessage}',
          isEmergency: true,
        ));
      }
    });

    _elderSub = _familyRef.child('elder').onValue.listen((event) {
      final data =
          event.snapshot.value is Map ? event.snapshot.value as Map : const {};
      _elderStatus = '${data['status'] ?? 'unknown'}';
      _elderName = '${data['name'] ?? 'Ngoại'}';
      final vitals = data['vitals'] is Map ? data['vitals'] as Map : const {};
      _heartRateBpm = _toInt(vitals['heartRateBpm']);
      _vitalsStatus = '${vitals['status'] ?? 'No data'}';
      notifyListeners();
    });

    _bleConfigSub = _familyRef.child('ble').onValue.listen((event) {
      final data =
          event.snapshot.value is Map ? event.snapshot.value as Map : const {};
      _bleEnabled = '${data['enabled']}'.toLowerCase() == 'true';
      _tagId = '${data['tagId'] ?? 'SMART_TAG_UUID'}';
      notifyListeners();
      _bleEnabled ? _startBleScanLoop() : _stopBleScanLoop();
    });
  }

  // --- Ack: kiosk đã phát xong nhắc nhở ---
  Future<void> markTaskSpoken(String taskId) async {
    if (taskId == 'emergency') {
      await _familyRef.child('emergency').update({
        'is_triggered': false,
        'triggeredAt': null,
      });
      return;
    }
    await _familyRef.child('tasks/$taskId').update({
      'is_triggered': false,
      'spokenAt': ServerValue.timestamp,
      'status': 'Completed',
      'completedAt': ServerValue.timestamp,
    });
  }

  Future<void> forceVolumeFlag() async {
    await _familyRef.child('kiosk/volumeForced').set(true);
  }

  // --- Tự động kêu khi tới giờ ---
  // Mỗi 30s kiểm tra: task bật Auto run (is_auto), chưa hoàn thành, chưa đang
  // nhắc, và giờ hiện tại đã tới/qua scheduled_time trong vòng 2 phút → bật
  // is_triggered=true trên Firebase. Việc bật cờ này khiến cả kiosk lẫn
  // caregiver thấy task đang nhắc (đồng bộ như khi bấm Trigger tay).
  void _startScheduleWatcher() {
    _checkSchedule();
    _scheduleTimer =
        Timer.periodic(const Duration(seconds: 30), (_) => _checkSchedule());
  }

  Future<void> _checkSchedule() async {
    final now = DateTime.now();
    final dayKey =
        '${now.year}-${now.month.toString().padLeft(2, '0')}-${now.day.toString().padLeft(2, '0')}';
    final nowMinutes = now.hour * 60 + now.minute;

    for (final task in _tasks) {
      if (!task.isAuto) continue;
      if (task.isTriggered || task.isCompleted) continue;

      // Cửa sổ kích hoạt: từ đúng giờ đến 2 phút sau (tránh lỡ nhịp timer 30s).
      final diff = nowMinutes - task.minutesOfDay;
      if (diff < 0 || diff > 2) continue;

      final firedKey = '$dayKey:${task.id}';
      if (_autoFiredKeys.contains(firedKey)) continue;
      _autoFiredKeys.add(firedKey);

      await _familyRef.child('tasks/${task.id}').update({
        'status': 'Running',
        'is_triggered': true,
        'triggeredAt': ServerValue.timestamp,
        'spokenAt': null,
        'completedAt': null,
        'triggerMode': 'auto',
      });
    }
  }

  // --- Heartbeat ---
  void _startHeartbeat() {
    Future<void> beat() async {
      await _familyRef.child('kiosk').update({
        'online': true,
        'lastHeartbeatAt': ServerValue.timestamp,
      });
    }

    beat();
    _heartbeatTimer =
        Timer.periodic(const Duration(seconds: 10), (_) => beat());
  }

  // --- Vitals mô phỏng: nhịp tim dao động quanh 72 ---
  void _startVitalsSimulation() {
    Future<void> tick() async {
      final hr = 68 + _random.nextInt(12); // 68..79
      final status = hr > 78 ? 'Elevated' : 'Normal';
      await _familyRef.child('elder/vitals').update({
        'heartRateBpm': hr,
        'status': status,
        'updatedAt': ServerValue.timestamp,
      });
    }

    tick();
    _vitalsTimer = Timer.periodic(const Duration(seconds: 30), (_) => tick());
  }

  // --- BLE scanning (chỉ thiết bị thật) ---
  void _startBleScanLoop() {
    _bleScanTimer?.cancel();
    if (_isDesktopOrWeb()) return;
    _bleScanTimer =
        Timer.periodic(const Duration(seconds: 5), (_) => _scanForTag());
    _scanForTag();
  }

  Future<void> _scanForTag() async {
    if (_isDesktopOrWeb() || !_bleEnabled) return;

    _bleResultsSub ??= FlutterBluePlus.scanResults.listen((results) {
      final found = results.any((result) {
        final id = result.device.remoteId.toString();
        final services = result.advertisementData.serviceUuids.join(',');
        return id.contains(_tagId) || services.contains(_tagId);
      });
      if (found) _markTagDetected();
    });

    try {
      await FlutterBluePlus.startScan(timeout: const Duration(seconds: 4));
    } catch (_) {
      return;
    }
  }

  Future<void> _markTagDetected() async {
    _lastTagSeenAt = DateTime.now();
    _bleMissingTimer?.cancel();
    _bleMissingTimer = Timer(const Duration(seconds: 10), () {
      final lastSeen = _lastTagSeenAt;
      if (lastSeen == null ||
          DateTime.now().difference(lastSeen).inSeconds > 10) {
        setElderStatus('out_of_home');
      }
    });

    await _familyRef.update({
      'elder/status': 'in_home',
      'elder/lastSeenAt': ServerValue.timestamp,
      'ble/lastDetectedAt': ServerValue.timestamp,
    });
    await _updateTrackerAlert('in_home');
  }

  void _stopBleScanLoop() {
    _bleScanTimer?.cancel();
    _bleMissingTimer?.cancel();
    if (_isDesktopOrWeb()) return;
    try {
      FlutterBluePlus.stopScan();
    } catch (_) {}
  }

  // --- Cập nhật trạng thái elder + tracker_alert (dùng cả cho debug panel) ---
  Future<void> setElderStatus(String status) async {
    await _familyRef.update({
      'elder/status': status,
      'elder/lastSeenAt': ServerValue.timestamp,
    });
    await _updateTrackerAlert(status);
  }

  Future<void> _updateTrackerAlert(String status) async {
    final outOfHome = status == 'out_of_home';
    await _familyRef.child('tracker_alert').update({
      'is_active': outOfHome,
      'type': outOfHome ? 'out_of_safe_zone' : null,
      'message': outOfHome
          ? 'Ngoại đã ra khỏi khu vực an toàn.'
          : 'Ngoại đang ở trong nhà.',
      'severity': outOfHome ? 'warning' : 'normal',
      'safeZoneStatus': outOfHome ? 'outside' : 'inside',
      'source': 'BLE tracker',
      'updatedAt': ServerValue.timestamp,
    });
  }

  Future<void> goOffline() async {
    await _familyRef.child('kiosk/online').set(false);
  }

  static int? _toInt(Object? value) {
    if (value is int) return value;
    if (value is num) return value.toInt();
    return int.tryParse('$value');
  }

  @override
  void dispose() {
    _tasksSub?.cancel();
    _emergencySub?.cancel();
    _elderSub?.cancel();
    _bleConfigSub?.cancel();
    _bleResultsSub?.cancel();
    _heartbeatTimer?.cancel();
    _vitalsTimer?.cancel();
    _scheduleTimer?.cancel();
    _bleScanTimer?.cancel();
    _bleMissingTimer?.cancel();
    _alertController.close();
    goOffline();
    super.dispose();
  }
}
