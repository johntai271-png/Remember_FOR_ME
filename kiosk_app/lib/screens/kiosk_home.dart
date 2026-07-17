import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';

import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:volume_controller/volume_controller.dart';

import '../services/kiosk_sync.dart';
import '../tabs/health_tab.dart';
import '../tabs/home_tab.dart';
import '../tabs/reminders_tab.dart';
import '../theme/app_colors.dart';
import 'alert_overlay.dart';
import 'debug_panel.dart';

class KioskHomePage extends StatefulWidget {
  const KioskHomePage({super.key, required this.familyId});

  final String familyId;

  @override
  State<KioskHomePage> createState() => _KioskHomePageState();
}

class _KioskHomePageState extends State<KioskHomePage> {
  late final KioskSyncService _sync;
  final FlutterTts _tts = FlutterTts();
  final AudioPlayer _audioPlayer = AudioPlayer();

  StreamSubscription<KioskAlert>? _alertSub;
  StreamSubscription<String>? _dismissSub;
  Timer? _clockTimer;
  DateTime _now = DateTime.now();
  int _tabIndex = 0;

  KioskAlert? _activeAlert;
  final Set<String> _speaking = {};

  @override
  void initState() {
    super.initState();
    _sync = KioskSyncService(familyId: widget.familyId);
    _configureTts();
    _sync.start();
    _alertSub = _sync.alerts.listen(_handleAlert);
    _dismissSub = _sync.dismissals.listen(_handleRemoteDismiss);
    _clockTimer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (mounted) setState(() => _now = DateTime.now());
    });
  }

  Future<void> _configureTts() async {
    try {
      await _tts.awaitSpeakCompletion(true);
      await _tts.setSpeechRate(0.52);
      await _tts.setVolume(1.0);
      await _tts.setPitch(1.0);
      await _selectVietnameseVoice();
    } catch (e) {
      debugPrint('TTS configuration failed: $e');
    }
  }

  /// Select Vietnamese voice. Prefer vi-VN.
  Future<void> _selectVietnameseVoice() async {
    try {
      await _tts.setLanguage('vi-VN');
    } catch (e) {
      debugPrint('setLanguage(vi-VN) failed: $e');
    }

    try {
      final voices = await _tts.getVoices;
      if (voices is! List) return;

      Map? viVoice;
      for (final raw in voices) {
        if (raw is! Map) continue;
        final locale = '${raw['locale'] ?? ''}'.toLowerCase();
        if (locale.startsWith('vi')) {
          viVoice = raw;
          break;
        }
      }

      if (viVoice != null) {
        await _tts.setVoice({
          'name': '${viVoice['name']}',
          'locale': '${viVoice['locale']}',
        });
        debugPrint('Selected Vietnamese voice: ${viVoice['name']}');
      } else {
        debugPrint('Vietnamese voice not found on this device.');
      }
    } catch (e) {
      debugPrint('Voice selection failed: $e');
    }
  }

  // Số lần nhắc lại TTS (3 lần giúp người cao tuổi không bỏ lỡ)
  static const int _ttsRepeatCount = 3;
  // Khoảng dừng giữa các lần nhắc (1.5 giây)
  static const Duration _ttsRepeatGap = Duration(milliseconds: 1500);

  /// Sau khi đọc xong, overlay Ở LẠI chờ cụ bấm "Đã hiểu" trong khoảng này.
  /// Hết giờ mà không ai bấm -> ghi "No response" (KHÔNG BAO GIỜ ghi Completed
  /// thay cụ — hệ thống không được bịa ra việc cụ đã xác nhận).
  static const Duration _noResponseTimeout = Duration(seconds: 60);

  /// Nghỉ giữa hai lần nhắc lại (giọng gia đình / TTS) trong lúc chờ cụ bấm.
  static const Duration _announceGap = Duration(seconds: 3);

  Future<void> _handleAlert(KioskAlert alert) async {
    if (_speaking.contains(alert.id)) return;
    _speaking.add(alert.id);

    try {
      await VolumeController.instance.setVolume(1.0);
    } catch (e) {
      debugPrint('Volume controller not supported on this platform: $e');
    }
    await _sync.forceVolumeFlag();

    if (mounted) setState(() => _activeAlert = alert);

    if (alert.isEmergency) {
      // SOS: đọc vài lần rồi đóng. markTaskSpoken chỉ tắt cờ emergency, an toàn.
      await _speakTts(alert);
      if (_activeAlert?.id == alert.id && _speaking.contains(alert.id)) {
        await _dismissAlert(alert);
      }
      return;
    }

    // Lời nhắc: lặp lại tới khi cụ bấm "Đã hiểu" hoặc hết thời gian chờ.
    await _announceUntilAcknowledged(alert);
  }

  /// Lặp lại lời nhắc — giọng gia đình, hoặc TTS nếu không có/không phát được —
  /// LIÊN TỤC tới khi cụ bấm "Đã hiểu" (thoát ngay) hoặc hết _noResponseTimeout.
  /// Hết giờ mà không ai bấm -> "No response" (không tự nhận thay cụ).
  Future<void> _announceUntilAcknowledged(KioskAlert alert) async {
    final bytes = _decodeAudioBytes(alert.voiceClip ?? '');
    var useClip = bytes != null && bytes.isNotEmpty;
    final deadline = DateTime.now().add(_noResponseTimeout);
    var round = 0;

    while (_speaking.contains(alert.id) &&
        _activeAlert?.id == alert.id &&
        DateTime.now().isBefore(deadline)) {
      round++;
      if (useClip) {
        try {
          await _playClipOnce(bytes!);
          debugPrint('Phát giọng gia đình lần $round cho ${alert.id}');
        } catch (e) {
          debugPrint('Phát giọng gia đình lỗi ($e) — chuyển sang TTS.');
          useClip = false;
          continue; // đọc TTS ngay ở vòng kế
        }
      } else {
        await _speakOnce(alert);
        debugPrint('TTS lần $round cho ${alert.id}');
      }
      // Nghỉ giữa hai lần nhắc, nhưng thoát ngay nếu cụ bấm.
      await _interruptibleGap(alert, _announceGap);
    }

    if (_activeAlert?.id == alert.id && _speaking.contains(alert.id)) {
      await _timeoutAlert(alert);
    }
  }

  /// Phát clip giọng gia đình đúng MỘT lần (BytesSource ổn định trên web).
  Future<void> _playClipOnce(Uint8List bytes) async {
    // Đăng ký "phát xong" TRƯỚC khi play để không bỏ lỡ với clip ngắn; timeout
    // chỉ là chốt an toàn khi nền web không bắn onPlayerComplete.
    final done = _audioPlayer.onPlayerComplete.first
        .then<bool>((_) => true)
        .catchError((_) => false);
    await _audioPlayer.stop();
    await _audioPlayer.play(BytesSource(bytes));
    await done.timeout(const Duration(seconds: 12), onTimeout: () => false);
  }

  /// Đọc nội dung bằng giọng máy đúng MỘT lần (tự chọn vi-VN / en-US).
  Future<void> _speakOnce(KioskAlert alert) async {
    await _tts.stop();
    final hasVi = RegExp(r'[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệđìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ]')
        .hasMatch(alert.message.toLowerCase());
    if (hasVi) {
      await _tts.setLanguage('vi-VN');
      await _tts.setSpeechRate(0.52);
    } else {
      await _tts.setLanguage('en-US');
      await _tts.setSpeechRate(0.48);
    }
    await _tts.speak(alert.message);
  }

  /// Nghỉ giữa các lần nhắc nhưng thoát NGAY khi cụ bấm / caregiver reset.
  Future<void> _interruptibleGap(KioskAlert alert, Duration total) async {
    final end = DateTime.now().add(total);
    while (DateTime.now().isBefore(end)) {
      if (!_speaking.contains(alert.id) || _activeAlert?.id != alert.id) return;
      await Future.delayed(const Duration(milliseconds: 200));
    }
  }

  /// Hết thời gian chờ mà cụ không phản hồi: đóng overlay và báo TRUNG THỰC
  /// ("No response"), không đánh dấu Completed.
  Future<void> _timeoutAlert(KioskAlert alert) async {
    try {
      await _tts.stop();
      await _audioPlayer.stop();
    } catch (_) {}
    _speaking.remove(alert.id);
    if (mounted && _activeAlert?.id == alert.id) {
      setState(() => _activeAlert = null);
    }
    debugPrint('Không có phản hồi cho ${alert.id} sau $_noResponseTimeout.');
    await _sync.markTaskNoResponse(alert.id);
  }

  /// Tách bytes âm thanh từ data URI ("data:audio/...;base64,XXXX") hoặc base64 thô.
  Uint8List? _decodeAudioBytes(String value) {
    var b64 = value;
    final marker = b64.indexOf('base64,');
    if (marker >= 0) b64 = b64.substring(marker + 7);
    try {
      return base64Decode(b64);
    } catch (_) {
      return null;
    }
  }

  /// Đọc nội dung bằng giọng máy (TTS), lặp _ttsRepeatCount lần. Dùng cho SOS.
  Future<void> _speakTts(KioskAlert alert) async {
    for (int round = 1; round <= _ttsRepeatCount; round++) {
      // Nếu người dùng đã bấm "Đã hiểu", dừng phát sớm
      if (!_speaking.contains(alert.id)) break;
      try {
        await _speakOnce(alert);
        debugPrint('TTS lần $round/$_ttsRepeatCount: ${alert.message}');
      } catch (e) {
        debugPrint('TTS speak failed (round $round): $e');
        break;
      }
      // Dừng giữa các lần nhắc (trừ lần cuối)
      if (round < _ttsRepeatCount && _speaking.contains(alert.id)) {
        await Future.delayed(_ttsRepeatGap);
      }
    }
  }

  Future<void> _dismissAlert(KioskAlert alert) async {
    try {
      await _tts.stop();
      await _audioPlayer.stop();
    } catch (_) {}
    // Xóa _speaking trước khi await để re-trigger không bị chặn
    _speaking.remove(alert.id);
    if (mounted && _activeAlert?.id == alert.id) {
      setState(() => _activeAlert = null);
    }
    await _sync.markTaskSpoken(alert.id);
  }

  /// Caregiver đã reset/hủy task (Reset Demo) -> đóng overlay đang hiện của task
  /// đó. KHÔNG ghi Completed vì task vừa được đưa về Pending.
  Future<void> _handleRemoteDismiss(String taskId) async {
    if (_activeAlert?.id != taskId) return;
    try {
      await _tts.stop();
      await _audioPlayer.stop();
    } catch (_) {}
    _speaking.remove(taskId);
    if (mounted && _activeAlert?.id == taskId) {
      setState(() => _activeAlert = null);
    }
    debugPrint('Overlay của $taskId bị đóng do caregiver reset.');
  }

  void _openDebugPanel() {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (_) => DebugPanel(sync: _sync)),
    );
  }

  @override
  Widget build(BuildContext context) {
    final alert = _activeAlert;
    if (alert != null) {
      return PopScope(
        canPop: false, // Chặn nút back vật lý khi đang phát cảnh báo
        child: Scaffold(
          body: AlertOverlay(
            alert: alert,
            onDismiss: () => _dismissAlert(alert),
          ),
        ),
      );
    }

    return PopScope(
      canPop: false, // Chặn nút back vật lý ở màn hình chính
      child: Scaffold(
        backgroundColor: AppColors.shell,
        body: SafeArea(
          bottom: false,
          child: ListenableBuilder(
            listenable: _sync,
            builder: (context, _) => Column(
              children: [
                _buildTopBar(),
                Expanded(
                  child: IndexedStack(
                    index: _tabIndex,
                    children: [
                      HomeTab(sync: _sync, now: _now),
                      RemindersTab(sync: _sync, now: _now),
                      HealthTab(sync: _sync),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
        bottomNavigationBar: _buildBottomNav(),
      ),
    );
  }

  Widget _buildTopBar() {
    final inHome = _sync.elderStatus == 'in_home';
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 16, 24, 0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          GestureDetector(
            onLongPress: _openDebugPanel,
            child: const Text(
              'Remember.For.Me',
              style: TextStyle(
                color: AppColors.brand, // indigo
                fontSize: 26,
                fontWeight: FontWeight.w900,
              ),
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 9),
            decoration: BoxDecoration(
              color: inHome
                  ? AppColors.reassuranceBg
                  : const Color(0xFFFEF3C7),
              borderRadius: BorderRadius.circular(999),
              border: Border.all(
                color: inHome
                    ? AppColors.reassuranceBorder
                    : const Color(0xFFFCD34D),
              ),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  inHome ? '🏠' : '🚶',
                  style: const TextStyle(fontSize: 16),
                ),
                const SizedBox(width: 6),
                Text(
                  inHome ? 'At Home' : 'Away',
                  style: TextStyle(
                    color: inHome
                        ? AppColors.reassuranceTitle
                        : AppColors.morningText,
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBottomNav() {
    const items = [
      ('🏠', 'Home'),
      ('🔔', 'Schedule'),
      ('❤️', 'Health'),
    ];
    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Color(0x14283948),
            blurRadius: 30,
            offset: Offset(0, -10),
          ),
        ],
      ),
      child: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
          child: Row(
            children: [
              for (var i = 0; i < items.length; i++)
                Expanded(
                  child: _NavButton(
                    emoji: items[i].$1,
                    label: items[i].$2,
                    active: _tabIndex == i,
                    onTap: () => setState(() => _tabIndex = i),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _alertSub?.cancel();
    _dismissSub?.cancel();
    _clockTimer?.cancel();
    _tts.stop();
    _audioPlayer.dispose();
    _sync.dispose();
    super.dispose();
  }
}

class _NavButton extends StatelessWidget {
  const _NavButton({
    required this.emoji,
    required this.label,
    required this.active,
    required this.onTap,
  });

  final String emoji;
  final String label;
  final bool active;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        padding: const EdgeInsets.symmetric(vertical: 10),
        margin: const EdgeInsets.symmetric(horizontal: 4),
        decoration: BoxDecoration(
          color: active ? AppColors.lavender : Colors.transparent,
          borderRadius: BorderRadius.circular(18),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              emoji,
              style: const TextStyle(fontSize: 26),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                color: active ? AppColors.brand : AppColors.inkSoft,
                fontSize: 14,
                fontWeight: active ? FontWeight.w800 : FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
