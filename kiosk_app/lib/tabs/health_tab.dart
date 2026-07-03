import 'package:flutter/material.dart';

import '../services/kiosk_sync.dart';
import '../theme/app_colors.dart';
import '../widgets/reminder_card.dart';

/// Tab Sức khỏe — dùng màu sắc mới của bảng màu Hân.
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
          'Your Health Today',
          style: TextStyle(
            color: AppColors.ink,
            fontSize: 28,
            fontWeight: FontWeight.w800,
          ),
        ),
        const SizedBox(height: 20),
        _MetricCard(
          emoji: '❤️',
          emojiColor: AppColors.danger,
          label: 'Heart Rate',
          value: hr != null ? '$hr' : '--',
          unit: hr != null ? 'BPM' : 'no data',
          badgeLabel: sync.vitalsStatus == 'Normal'
              ? 'Normal'
              : sync.vitalsStatus == 'Elevated'
                  ? 'Elevated'
                  : sync.vitalsStatus,
          badgeBg: sync.vitalsStatus == 'Elevated'
              ? const Color(0xFFFEF3C7)
              : const Color(0xFFD1FAE5),
          badgeFg: sync.vitalsStatus == 'Elevated'
              ? AppColors.morningText
              : AppColors.action,
        ),
        const SizedBox(height: 14),
        _MetricCard(
          emoji: inHome ? '🏠' : '🚶',
          emojiColor: inHome ? AppColors.action : AppColors.warning,
          label: 'Location',
          value: inHome ? 'In Home' : 'Outside',
          unit: inHome ? 'safe zone' : 'outside safe zone',
          badgeLabel: inHome ? 'Safe' : 'Attention',
          badgeBg: inHome
              ? const Color(0xFFD1FAE5)
              : const Color(0xFFFEE2E2),
          badgeFg: inHome ? AppColors.action : AppColors.danger,
        ),
        const SizedBox(height: 14),
        _MetricCard(
          emoji: '📶',
          emojiColor: AppColors.brand,
          label: 'Connection',
          value: 'Active',
          unit: sync.bleEnabled ? 'sensor enabled' : 'sensor disabled',
          badgeLabel: 'Connected',
          badgeBg: const Color(0xFFDBEAFE),
          badgeFg: AppColors.noonText,
        ),
      ],
    );
  }
}

class _MetricCard extends StatelessWidget {
  const _MetricCard({
    required this.emoji,
    required this.emojiColor,
    required this.label,
    required this.value,
    required this.unit,
    required this.badgeLabel,
    required this.badgeBg,
    required this.badgeFg,
  });

  final String emoji;
  final Color emojiColor;
  final String label;
  final String value;
  final String unit;
  final String badgeLabel;
  final Color badgeBg;
  final Color badgeFg;

  @override
  Widget build(BuildContext context) {
    return SectionCard(
      padding: const EdgeInsets.all(22),
      child: Row(
        children: [
          // Icon vòng tròn
          Container(
            width: 68,
            height: 68,
            decoration: BoxDecoration(
              color: emojiColor.withValues(alpha: 0.12),
              borderRadius: BorderRadius.circular(18),
            ),
            child: Center(
              child: Text(emoji, style: const TextStyle(fontSize: 32)),
            ),
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
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
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
                        fontSize: 32,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Flexible(
                      child: Text(
                        unit,
                        style: const TextStyle(
                          color: AppColors.inkSoft,
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          // Badge trạng thái
          Container(
            padding:
                const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
            decoration: BoxDecoration(
              color: badgeBg,
              borderRadius: BorderRadius.circular(9999),
            ),
            child: Text(
              badgeLabel,
              style: TextStyle(
                color: badgeFg,
                fontSize: 14,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
