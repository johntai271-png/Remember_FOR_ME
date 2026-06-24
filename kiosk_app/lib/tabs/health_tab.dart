import 'package:flutter/material.dart';

import '../services/kiosk_sync.dart';
import '../theme/app_colors.dart';
import '../widgets/reminder_card.dart';

/// Tab Sức khỏe: nhịp tim mô phỏng, vị trí (in_home/out_of_home), kết nối.
class HealthTab extends StatelessWidget {
  const HealthTab({super.key, required this.sync});

  final KioskSyncService sync;

  @override
  Widget build(BuildContext context) {
    final inHome = sync.elderStatus == 'in_home';
    final hr = sync.heartRateBpm;

    return ListView(
      padding: const EdgeInsets.fromLTRB(24, 24, 24, 32),
      children: [
        const Text(
          'Sức khỏe của Ngoại',
          style: TextStyle(
            color: AppColors.ink,
            fontSize: 30,
            fontWeight: FontWeight.w900,
          ),
        ),
        const SizedBox(height: 20),
        _MetricCard(
          icon: Icons.favorite_rounded,
          iconColor: AppColors.danger,
          label: 'Nhịp tim',
          value: hr != null ? '$hr' : '--',
          unit: hr != null ? 'nhịp/phút' : 'chưa có dữ liệu',
          note: sync.vitalsStatus == 'Normal'
              ? 'Bình thường'
              : sync.vitalsStatus == 'Elevated'
                  ? 'Hơi cao'
                  : sync.vitalsStatus,
        ),
        const SizedBox(height: 16),
        _MetricCard(
          icon: inHome ? Icons.home_rounded : Icons.directions_walk_rounded,
          iconColor: inHome ? AppColors.action : AppColors.warning,
          label: 'Vị trí',
          value: inHome ? 'Trong nhà' : 'Ra ngoài',
          unit: inHome ? 'khu vực an toàn' : 'ngoài khu vực an toàn',
          note: inHome ? 'An toàn' : 'Cần chú ý',
          noteColor: inHome ? AppColors.action : AppColors.danger,
        ),
        const SizedBox(height: 16),
        _MetricCard(
          icon: Icons.wifi_rounded,
          iconColor: AppColors.brand,
          label: 'Kết nối',
          value: 'Đang hoạt động',
          unit: sync.bleEnabled ? 'cảm biến đang bật' : 'cảm biến đang tắt',
          note: 'Đã kết nối',
        ),
      ],
    );
  }
}

class _MetricCard extends StatelessWidget {
  const _MetricCard({
    required this.icon,
    required this.iconColor,
    required this.label,
    required this.value,
    required this.unit,
    required this.note,
    this.noteColor = AppColors.action,
  });

  final IconData icon;
  final Color iconColor;
  final String label;
  final String value;
  final String unit;
  final String note;
  final Color noteColor;

  @override
  Widget build(BuildContext context) {
    return SectionCard(
      padding: const EdgeInsets.all(22),
      child: Row(
        children: [
          Container(
            width: 72,
            height: 72,
            decoration: BoxDecoration(
              color: iconColor.withValues(alpha: 0.14),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Icon(icon, color: iconColor, size: 38),
          ),
          const SizedBox(width: 18),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: const TextStyle(
                    color: AppColors.inkSoft,
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 2),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.baseline,
                  textBaseline: TextBaseline.alphabetic,
                  children: [
                    Text(
                      value,
                      style: const TextStyle(
                        color: AppColors.ink,
                        fontSize: 34,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Flexible(
                      child: Text(
                        unit,
                        style: const TextStyle(
                          color: AppColors.inkSoft,
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
            decoration: BoxDecoration(
              color: noteColor.withValues(alpha: 0.12),
              borderRadius: BorderRadius.circular(999),
            ),
            child: Text(
              note,
              style: TextStyle(
                color: noteColor,
                fontSize: 16,
                fontWeight: FontWeight.w800,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
