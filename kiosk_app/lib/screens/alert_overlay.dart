import 'package:flutter/material.dart';

import '../services/kiosk_sync.dart';
import '../theme/app_colors.dart';

/// Overlay phát nhắc nhở toàn màn hình cho người già.
/// Nền xanh dương cho nhắc thường, đỏ cho khẩn cấp. Có nút "Đã hiểu" lớn để bấm tắt.
class AlertOverlay extends StatelessWidget {
  const AlertOverlay({
    super.key,
    required this.alert,
    required this.onDismiss,
  });

  final KioskAlert alert;
  final VoidCallback onDismiss;

  @override
  Widget build(BuildContext context) {
    final emergency = alert.isEmergency;
    final background = emergency ? AppColors.danger : AppColors.brand;
    final icon = emergency
        ? Icons.phone_in_talk_rounded
        : Icons.notifications_active_rounded;

    return Container(
      color: background,
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(28),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Spacer(),
              Container(
                padding: const EdgeInsets.all(28),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.16),
                  shape: BoxShape.circle,
                ),
                child: Icon(icon, size: 96, color: Colors.white),
              ),
              const SizedBox(height: 28),
              Text(
                alert.title,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 56,
                  fontWeight: FontWeight.w900,
                ),
              ),
              const SizedBox(height: 24),
              Text(
                alert.message,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 42,
                  fontWeight: FontWeight.w800,
                  height: 1.2,
                ),
              ),
              const Spacer(),
              SizedBox(
                width: double.infinity,
                child: FilledButton(
                  onPressed: onDismiss,
                  style: FilledButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: background,
                    padding: const EdgeInsets.symmetric(vertical: 26),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                  ),
                  child: const Text(
                    'Đã hiểu',
                    style: TextStyle(fontSize: 36, fontWeight: FontWeight.w900),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
