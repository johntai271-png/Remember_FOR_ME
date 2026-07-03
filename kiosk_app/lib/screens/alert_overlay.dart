import 'package:flutter/material.dart';

import '../services/kiosk_sync.dart';
import '../theme/app_colors.dart';

/// Alert overlay phong cách "Voice Announcement Card" của Hân:
/// - Nền đêm sâu (#1e1b4b) với viền indigo
/// - Hiệu ứng sóng âm lan rộng từ icon chuông
/// - Text nhắc nhở to rõ, nút "Okay, tôi nhớ rồi"
class AlertOverlay extends StatefulWidget {
  const AlertOverlay({
    super.key,
    required this.alert,
    required this.onDismiss,
  });

  final KioskAlert alert;
  final VoidCallback onDismiss;

  @override
  State<AlertOverlay> createState() => _AlertOverlayState();
}

class _AlertOverlayState extends State<AlertOverlay>
    with TickerProviderStateMixin {
  late final AnimationController _wave1;
  late final AnimationController _wave2;

  @override
  void initState() {
    super.initState();
    // Sóng 1 — bắt đầu ngay
    _wave1 = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1800),
    )..repeat();
    // Sóng 2 — delay 0.9s (nửa chu kỳ)
    _wave2 = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1800),
    )..repeat();
    // Chạy wave2 muộn hơn bằng cách forward từ giữa
    Future.microtask(() async {
      await Future.delayed(const Duration(milliseconds: 900));
      if (mounted) _wave2.forward(from: 0);
    });
  }

  @override
  void dispose() {
    _wave1.dispose();
    _wave2.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final emergency = widget.alert.isEmergency;
    // Khẩn cấp dùng màu đỏ sâu; nhắc thường dùng indigo sâu của Hân
    final bgColor = emergency ? const Color(0xFF3B0A0A) : const Color(0xFF12111E);
    final cardColor = emergency ? AppColors.danger : AppColors.alertBg;
    final borderColor = emergency ? const Color(0xFFDC2626) : AppColors.alertBorder;
    final accentColor = emergency ? Colors.white : AppColors.alertAccent;
    final waveColor = emergency ? Colors.red.shade300 : AppColors.alertWave;

    return Container(
      color: bgColor,
      child: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 620),
            child: Container(
              margin: const EdgeInsets.all(28),
              padding: const EdgeInsets.fromLTRB(40, 48, 40, 40),
              decoration: BoxDecoration(
                color: cardColor,
                border: Border.all(color: borderColor, width: 2),
                borderRadius: BorderRadius.circular(32),
                boxShadow: [
                  BoxShadow(
                    color: borderColor.withValues(alpha: 0.5),
                    blurRadius: 60,
                    spreadRadius: 8,
                  ),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // ── Icon chuông với sóng âm ──────────────────────────────
                  SizedBox(
                    width: 130,
                    height: 130,
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        // Sóng 1
                        AnimatedBuilder(
                          animation: _wave1,
                          builder: (_, __) =>
                              _WaveRing(progress: _wave1.value, color: waveColor),
                        ),
                        // Sóng 2 (delay)
                        AnimatedBuilder(
                          animation: _wave2,
                          builder: (_, __) =>
                              _WaveRing(progress: _wave2.value, color: waveColor),
                        ),
                        // Icon vòng trong
                        Container(
                          width: 90,
                          height: 90,
                          decoration: BoxDecoration(
                            color: accentColor.withValues(alpha: 0.18),
                            shape: BoxShape.circle,
                          ),
                          child: const Center(
                            child: Text('🔔', style: TextStyle(fontSize: 38)),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),

                  // ── Tiêu đề nhỏ ──────────────────────────────────────────
                  Text(
                    emergency ? widget.alert.title : 'Reminder',
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.w700,
                      color: accentColor,
                    ),
                  ),
                  const SizedBox(height: 16),

                  // ── Nội dung nhắc — font lớn để người già đọc được ───────
                  Text(
                    widget.alert.message,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 36,
                      fontWeight: FontWeight.w700,
                      color: Colors.white,
                      height: 1.3,
                    ),
                  ),
                  const SizedBox(height: 10),

                  // ── Dòng phụ ─────────────────────────────────────────────
                  Text(
                    'Reading aloud caregiver reminder...',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.white.withValues(alpha: 0.55),
                    ),
                  ),
                  const SizedBox(height: 36),

                  // ── Nút xác nhận ─────────────────────────────────────────
                  GestureDetector(
                    onTap: widget.onDismiss,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 52, vertical: 20),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(9999),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.white.withValues(alpha: 0.25),
                            blurRadius: 24,
                          ),
                        ],
                      ),
                      child: Text(
                        'Okay, I remember',
                        style: TextStyle(
                          color: cardColor,
                          fontSize: 22,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// Một vòng sóng âm đang lan rộng và mờ dần.
class _WaveRing extends StatelessWidget {
  const _WaveRing({required this.progress, required this.color});

  final double progress; // 0.0 → 1.0
  final Color color;

  @override
  Widget build(BuildContext context) {
    final size = 90.0 + 55.0 * progress;
    final opacity = (1.0 - progress).clamp(0.0, 0.85);
    return Opacity(
      opacity: opacity,
      child: Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(color: color, width: 2),
        ),
      ),
    );
  }
}
