import 'dart:async';
import 'dart:convert';

import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_blue_plus/flutter_blue_plus.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:volume_controller/volume_controller.dart';
import 'package:wakelock_plus/wakelock_plus.dart';

const familyId = 'family_001';
const familyPath = 'families/$familyId';
const defaultEmergencyMessage = 'Ngoại ơi, con đang gọi. Xin hãy nhìn vào màn hình.';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  await WakelockPlus.enable();
  await SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.landscapeLeft,
    DeviceOrientation.landscapeRight,
    DeviceOrientation.portraitUp,
  ]);
  runApp(const RememberForMeKiosk());
}

class RememberForMeKiosk extends StatelessWidget {
  const RememberForMeKiosk({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Remember.For.Me Kiosk',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF005B6B),
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
      ),
      home: const KioskHomePage(),
    );
  }
}

class Reminder {
  const Reminder({
    required this.key,
    required this.label,
    required this.time,
    required this.text,
    required this.isTriggered,
  });

  final String key;
  final String label;
  final String time;
  final String text;
  final bool isTriggered;

  Map<String, dynamic> toJson() => {
        'time': time,
        'text': text,
        'is_triggered': isTriggered,
      };

  static Reminder fromMap(String key, Object? value) {
    final data = value is Map ? value : const {};
    return Reminder(
      key: key,
      label: switch (key) {
        'morning' => 'Morning',
        'noon' => 'Noon',
        'evening' => 'Evening',
        _ => key,
      },
      time: '${data['time'] ?? _defaultTime(key)}',
      text: '${data['text'] ?? _defaultText(key)}',
      isTriggered: data['is_triggered'] == true,
    );
  }

  static String _defaultTime(String key) {
    return switch (key) {
      'morning' => '08:00',
      'noon' => '12:00',
      'evening' => '19:00',
      _ => '--:--',
    };
  }

  static String _defaultText(String key) {
    return switch (key) {
      'morning' => 'Ngoại ơi đến giờ uống thuốc sáng',
      'noon' => 'Ngoại ơi đến giờ ăn trưa',
      'evening' => 'Ngoại ơi đến giờ uống thuốc tối',
      _ => '',
    };
  }
}

class KioskHomePage extends StatefulWidget {
  const KioskHomePage({super.key});

  @override
  State<KioskHomePage> createState() => _KioskHomePageState();
}

class _KioskHomePageState extends State<KioskHomePage> {
  final DatabaseReference _familyRef = FirebaseDatabase.instance.ref(familyPath);
  final FlutterTts _tts = FlutterTts();

  StreamSubscription<DatabaseEvent>? _remindersSub;
  StreamSubscription<DatabaseEvent>? _emergencySub;
  StreamSubscription<DatabaseEvent>? _elderSub;
  StreamSubscription<DatabaseEvent>? _bleConfigSub;
  StreamSubscription<List<ScanResult>>? _bleResultsSub;
  Timer? _heartbeatTimer;
  Timer? _bleScanTimer;
  Timer? _bleMissingTimer;

  List<Reminder> _reminders = const [];
  String _elderStatus = 'unknown';
  String? _activeTitle;
  String? _activeMessage;
  bool _isEmergency = false;
  bool _bleEnabled = false;
  String _tagId = 'SMART_TAG_UUID';
  DateTime? _lastTagSeenAt;

  @override
  void initState() {
    super.initState();
    _configureDevice();
    _configureTts();
    _loadCachedReminders();
    _listenToFirebase();
    _startHeartbeat();
  }

  Future<void> _configureDevice() async {
    await [
      Permission.bluetoothScan,
      Permission.bluetoothConnect,
      Permission.locationWhenInUse,
    ].request();
  }

  Future<void> _configureTts() async {
    await _tts.setLanguage('vi-VN');
    await _tts.setSpeechRate(0.42);
    await _tts.setVolume(1.0);
    await _tts.awaitSpeakCompletion(true);
    _tts.setCompletionHandler(() {
      if (mounted) {
        setState(() {
          _activeTitle = null;
          _activeMessage = null;
          _isEmergency = false;
        });
      }
    });
  }

  Future<void> _loadCachedReminders() async {
    final prefs = await SharedPreferences.getInstance();
    final cached = prefs.getString('latest_reminders');
    if (cached == null) {
      setState(() => _reminders = _defaultReminders());
      return;
    }

    final decoded = jsonDecode(cached);
    if (decoded is Map<String, dynamic>) {
      setState(() => _reminders = _parseReminders(decoded));
    }
  }

  void _listenToFirebase() {
    _remindersSub = _familyRef.child('reminders').onValue.listen((event) async {
      final value = event.snapshot.value;
      final reminders = _parseReminders(value);
      setState(() => _reminders = reminders);
      await _cacheReminders(reminders);

      for (final reminder in reminders.where((item) => item.isTriggered)) {
        await _playReminder(reminder);
      }
    });

    _emergencySub = _familyRef.child('emergency').onValue.listen((event) async {
      final data = event.snapshot.value is Map ? event.snapshot.value as Map : const {};
      if (data['is_triggered'] == true) {
        await _playEmergency('${data['message'] ?? defaultEmergencyMessage}');
      }
    });

    _elderSub = _familyRef.child('elder/status').onValue.listen((event) {
      setState(() => _elderStatus = '${event.snapshot.value ?? 'unknown'}');
    });

    _bleConfigSub = _familyRef.child('ble').onValue.listen((event) {
      final data = event.snapshot.value is Map ? event.snapshot.value as Map : const {};
      final enabled = data['enabled'] == true;
      setState(() {
        _bleEnabled = enabled;
        _tagId = '${data['tagId'] ?? 'SMART_TAG_UUID'}';
      });
      enabled ? _startBleScanLoop() : _stopBleScanLoop();
    });
  }

  List<Reminder> _parseReminders(Object? value) {
    final data = value is Map ? value : const {};
    return ['morning', 'noon', 'evening']
        .map((key) => Reminder.fromMap(key, data[key]))
        .toList(growable: false);
  }

  List<Reminder> _defaultReminders() {
    return ['morning', 'noon', 'evening']
        .map((key) => Reminder.fromMap(key, null))
        .toList(growable: false);
  }

  Future<void> _cacheReminders(List<Reminder> reminders) async {
    final prefs = await SharedPreferences.getInstance();
    final encoded = jsonEncode({
      for (final reminder in reminders) reminder.key: reminder.toJson(),
    });
    await prefs.setString('latest_reminders', encoded);
  }

  Future<void> _playReminder(Reminder reminder) async {
    await _showAndSpeak(
      title: reminder.label,
      message: reminder.text,
      emergency: false,
    );
    await _familyRef.child('reminders/${reminder.key}').update({
      'is_triggered': false,
      'triggeredAt': null,
    });
  }

  Future<void> _playEmergency(String message) async {
    await _showAndSpeak(
      title: 'Emergency',
      message: message,
      emergency: true,
    );
    await _familyRef.child('emergency').update({
      'is_triggered': false,
      'triggeredAt': null,
    });
  }

  Future<void> _showAndSpeak({
    required String title,
    required String message,
    required bool emergency,
  }) async {
    await VolumeController.instance.setVolume(1.0);
    await _familyRef.child('kiosk/volumeForced').set(true);
    if (mounted) {
      setState(() {
        _activeTitle = title;
        _activeMessage = message;
        _isEmergency = emergency;
      });
    }
    await _tts.stop();
    await _tts.speak(message);
  }

  void _startHeartbeat() {
    Future<void> beat() async {
      await _familyRef.child('kiosk').update({
        'online': true,
        'lastHeartbeatAt': ServerValue.timestamp,
      });
    }

    beat();
    _heartbeatTimer = Timer.periodic(const Duration(seconds: 10), (_) => beat());
  }

  void _startBleScanLoop() {
    _bleScanTimer?.cancel();
    _bleScanTimer = Timer.periodic(const Duration(seconds: 5), (_) => _scanForTag());
    _scanForTag();
  }

  Future<void> _scanForTag() async {
    if (!_bleEnabled) return;

    _bleResultsSub ??= FlutterBluePlus.scanResults.listen((results) {
      final found = results.any((result) {
        final id = result.device.remoteId.toString();
        final services = result.advertisementData.serviceUuids.join(',');
        return id.contains(_tagId) || services.contains(_tagId);
      });
      if (found) {
        _markTagDetected();
      }
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
      if (lastSeen == null || DateTime.now().difference(lastSeen).inSeconds > 10) {
        _writeStatus('out_of_home');
      }
    });

    await _familyRef.update({
      'elder/status': 'in_home',
      'elder/lastSeenAt': ServerValue.timestamp,
      'ble/lastDetectedAt': ServerValue.timestamp,
    });
  }

  Future<void> _writeStatus(String status) async {
    await _familyRef.update({
      'elder/status': status,
      'elder/lastSeenAt': ServerValue.timestamp,
    });
  }

  void _stopBleScanLoop() {
    _bleScanTimer?.cancel();
    _bleMissingTimer?.cancel();
    FlutterBluePlus.stopScan();
  }

  @override
  void dispose() {
    _remindersSub?.cancel();
    _emergencySub?.cancel();
    _elderSub?.cancel();
    _bleConfigSub?.cancel();
    _bleResultsSub?.cancel();
    _heartbeatTimer?.cancel();
    _bleScanTimer?.cancel();
    _bleMissingTimer?.cancel();
    _tts.stop();
    _familyRef.child('kiosk/online').set(false);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final active = _activeMessage != null;
    return Scaffold(
      backgroundColor: active
          ? (_isEmergency ? const Color(0xFFB00020) : const Color(0xFF003E4A))
          : const Color(0xFF050B12),
      body: SafeArea(
        child: active ? _buildAlert() : _buildDashboard(),
      ),
    );
  }

  Widget _buildDashboard() {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  'Remember.For.Me',
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.w800,
                        color: Colors.white,
                      ),
                ),
              ),
              _StatusPill(label: _formatStatus(_elderStatus)),
            ],
          ),
          const SizedBox(height: 20),
          Expanded(
            child: LayoutBuilder(
              builder: (context, constraints) {
                final horizontal = constraints.maxWidth > 720;
                return Flex(
                  direction: horizontal ? Axis.horizontal : Axis.vertical,
                  children: [
                    for (final reminder in _reminders)
                      Expanded(
                        child: Padding(
                          padding: EdgeInsets.only(
                            right: horizontal && reminder != _reminders.last ? 12 : 0,
                            bottom: !horizontal && reminder != _reminders.last ? 12 : 0,
                          ),
                          child: _ReminderBlock(reminder: reminder),
                        ),
                      ),
                  ],
                );
              },
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: FilledButton(
                  onPressed: () => _writeStatus('in_home'),
                  child: const Text('Simulate In-Home'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: FilledButton.tonal(
                  onPressed: () => _writeStatus('out_of_home'),
                  child: const Text('Simulate Out-of-Home'),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            _bleEnabled ? 'BLE scanning enabled for $_tagId' : 'BLE disabled; simulation buttons ready',
            textAlign: TextAlign.center,
            style: const TextStyle(color: Colors.white70, fontSize: 18),
          ),
        ],
      ),
    );
  }

  Widget _buildAlert() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(28),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              _activeTitle ?? '',
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 58,
                fontWeight: FontWeight.w900,
              ),
            ),
            const SizedBox(height: 28),
            Text(
              _activeMessage ?? '',
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 44,
                fontWeight: FontWeight.w800,
                height: 1.18,
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _formatStatus(String status) {
    return switch (status) {
      'in_home' => 'In-Home',
      'out_of_home' => 'Out-of-Home',
      _ => 'Unknown',
    };
  }
}

class _StatusPill extends StatelessWidget {
  const _StatusPill({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        label,
        style: const TextStyle(
          color: Color(0xFF050B12),
          fontSize: 22,
          fontWeight: FontWeight.w900,
        ),
      ),
    );
  }
}

class _ReminderBlock extends StatelessWidget {
  const _ReminderBlock({required this.reminder});

  final Reminder reminder;

  @override
  Widget build(BuildContext context) {
    final highlighted = reminder.isTriggered;
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: highlighted ? const Color(0xFFFFC857) : const Color(0xFF101A27),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: highlighted ? const Color(0xFFFFF1B8) : const Color(0xFF334155),
          width: 2,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            reminder.label,
            style: TextStyle(
              color: highlighted ? const Color(0xFF1B1B1B) : Colors.white70,
              fontSize: 28,
              fontWeight: FontWeight.w800,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            reminder.time,
            style: TextStyle(
              color: highlighted ? const Color(0xFF1B1B1B) : Colors.white,
              fontSize: 52,
              fontWeight: FontWeight.w900,
            ),
          ),
          const SizedBox(height: 18),
          Expanded(
            child: Text(
              reminder.text,
              style: TextStyle(
                color: highlighted ? const Color(0xFF1B1B1B) : Colors.white,
                fontSize: 32,
                fontWeight: FontWeight.w800,
                height: 1.18,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
