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
      await _tts.setSpeechRate(0.42);
      await _tts.setVolume(1.0);
      await _tts.setPitch(1.0);
      await _selectVietnameseVoice();
    } catch (e) {
      debugPrint('TTS configuration failed: $e');
    }
  }

  /// Chọn giọng đọc tiếng Việt. Ưu tiên đặt ngôn ngữ vi-VN; nếu thiết bị có
  /// liệt kê giọng, tìm đúng giọng locale "vi" để đảm bảo đọc được tiếng Việt.
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
        debugPrint('Đã chọn giọng tiếng Việt: ${viVoice['name']}');
      } else {
        debugPrint('Không tìm thấy giọng tiếng Việt trên thiết bị này.');
      }
    } catch (e) {
      debugPrint('Voice selection failed: $e');
    }
  }

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

    try {
      await _tts.stop();
      await _tts.speak(alert.message);
    } catch (e) {
      debugPrint('TTS speak failed: $e');
    }

    if (_activeAlert?.id == alert.id) {
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
      return Scaffold(
        body: AlertOverlay(
          alert: alert,
          onDismiss: () => _dismissAlert(alert),
        ),
      );
    }

    return Scaffold(
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
                color: AppColors.brand,
                fontSize: 26,
                fontWeight: FontWeight.w900,
              ),
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 9),
            decoration: BoxDecoration(
              color: inHome
                  ? const Color(0xFF97F3A8)
                  : const Color(0xFFFFE0A6),
              borderRadius: BorderRadius.circular(999),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  inHome ? Icons.home_rounded : Icons.directions_walk_rounded,
                  size: 18,
                  color: inHome
                      ? const Color(0xFF106228)
                      : const Color(0xFF8A5A00),
                ),
                const SizedBox(width: 6),
                Text(
                  inHome ? 'Trong nhà' : 'Ra ngoài',
                  style: TextStyle(
                    color: inHome
                        ? const Color(0xFF106228)
                        : const Color(0xFF8A5A00),
                    fontSize: 16,
                    fontWeight: FontWeight.w800,
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
      (Icons.home_rounded, 'Trang chủ'),
      (Icons.notifications_rounded, 'Lời nhắc'),
      (Icons.favorite_rounded, 'Sức khỏe'),
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
                    icon: items[i].$1,
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
    required this.icon,
    required this.label,
    required this.active,
    required this.onTap,
  });

  final IconData icon;
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
            Icon(
              icon,
              size: 30,
              color: active ? AppColors.brand : AppColors.inkSoft,
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                color: active ? AppColors.brand : AppColors.inkSoft,
                fontSize: 15,
                fontWeight: active ? FontWeight.w800 : FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
