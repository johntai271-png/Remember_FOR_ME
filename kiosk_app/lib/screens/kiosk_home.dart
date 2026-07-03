import 'dart:async';

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
  const KioskHomePage({super.key});

  @override
  State<KioskHomePage> createState() => _KioskHomePageState();
}

class _KioskHomePageState extends State<KioskHomePage> {
  final KioskSyncService _sync = KioskSyncService();
  final FlutterTts _tts = FlutterTts();

  StreamSubscription<KioskAlert>? _alertSub;
  Timer? _clockTimer;
  DateTime _now = DateTime.now();
  int _tabIndex = 0;

  KioskAlert? _activeAlert;
  final Set<String> _speaking = {};

  @override
  void initState() {
    super.initState();
    _configureTts();
    _sync.start();
    _alertSub = _sync.alerts.listen(_handleAlert);
    _clockTimer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (mounted) setState(() => _now = DateTime.now());
    });
  }

  Future<void> _configureTts() async {
    try {
      await _tts.awaitSpeakCompletion(true);
      await _tts.setSpeechRate(0.48); // English speech rate is slightly faster than Vietnamese usually
      await _tts.setVolume(1.0);
      await _tts.setPitch(1.0);
      await _selectEnglishVoice();
    } catch (e) {
      debugPrint('TTS configuration failed: $e');
    }
  }

  /// Select English voice. Prefer en-US.
  Future<void> _selectEnglishVoice() async {
    try {
      await _tts.setLanguage('en-US');
    } catch (e) {
      debugPrint('setLanguage(en-US) failed: $e');
    }

    try {
      final voices = await _tts.getVoices;
      if (voices is! List) return;

      Map? enVoice;
      for (final raw in voices) {
        if (raw is! Map) continue;
        final locale = '${raw['locale'] ?? ''}'.toLowerCase();
        if (locale.startsWith('en')) {
          enVoice = raw;
          break;
        }
      }

      if (enVoice != null) {
        await _tts.setVoice({
          'name': '${enVoice['name']}',
          'locale': '${enVoice['locale']}',
        });
        debugPrint('Selected English voice: ${enVoice['name']}');
      } else {
        debugPrint('English voice not found on this device.');
      }
    } catch (e) {
      debugPrint('Voice selection failed: $e');
    }
  }

  // Số lần nhắc lại TTS (3 lần giúp người cao tuổi không bỏ lỡ)
  static const int _ttsRepeatCount = 3;
  // Khoảng dừng giữa các lần nhắc (1.5 giây)
  static const Duration _ttsRepeatGap = Duration(milliseconds: 1500);

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

    // Lặp lại TTS _ttsRepeatCount lần — người dùng có thể bấm "Đã hiểu"
    // bất kỳ lúc nào để dừng sớm (kiểm tra _speaking sau mỗi lần).
    for (int round = 1; round <= _ttsRepeatCount; round++) {
      // Nếu người dùng đã bấm "Đã hiểu", dừng phát sớm
      if (!_speaking.contains(alert.id)) break;

      try {
        await _tts.stop();
        await _tts.speak(alert.message);
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

    // Sau khi phát xong tất cả các lần, tự động xác nhận nếu chưa bị dismiss
    if (_activeAlert?.id == alert.id && _speaking.contains(alert.id)) {
      await _dismissAlert(alert);
    }
  }

  Future<void> _dismissAlert(KioskAlert alert) async {
    try {
      await _tts.stop();
    } catch (_) {}
    await _sync.markTaskSpoken(alert.id);
    _speaking.remove(alert.id);
    if (mounted && _activeAlert?.id == alert.id) {
      setState(() => _activeAlert = null);
    }
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
    _clockTimer?.cancel();
    _tts.stop();
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
