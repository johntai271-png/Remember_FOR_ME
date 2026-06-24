import 'package:flutter/material.dart';

import '../models/task.dart';
import '../theme/app_colors.dart';

/// Khung thẻ trắng bo góc + bóng, đồng bộ `.card-shell` của caregiver.
class SectionCard extends StatelessWidget {
  const SectionCard({super.key, required this.child, this.padding});

  final Widget child;
  final EdgeInsetsGeometry? padding;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: padding ?? const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppColors.cardBorder),
        boxShadow: const [AppColors.cardShadow],
      ),
      child: child,
    );
  }
}

/// Pill trạng thái tiếng Việt (Đang nhắc / Đã xong / Sắp tới).
class StatusBadge extends StatelessWidget {
  const StatusBadge({super.key, required this.task});

  final KioskTask task;

  @override
  Widget build(BuildContext context) {
    final (bg, fg, label) = switch (task) {
      _ when task.isTriggered => (AppColors.warning, AppColors.ink, 'Đang nhắc'),
      _ when task.isCompleted => (
          const Color(0xFFE9F6EB),
          AppColors.action,
          'Đã xong'
        ),
      _ => (AppColors.lavender, AppColors.inkSoft, 'Sắp tới'),
    };

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            task.isTriggered
                ? Icons.notifications_active_rounded
                : task.isCompleted
                    ? Icons.check_circle_rounded
                    : Icons.schedule_rounded,
            size: 18,
            color: fg,
          ),
          const SizedBox(width: 6),
          Text(
            label,
            style: TextStyle(
              color: fg,
              fontSize: 16,
              fontWeight: FontWeight.w800,
            ),
          ),
        ],
      ),
    );
  }
}

/// Thẻ một lời nhắc dùng chung cho mọi tab.
class ReminderCard extends StatelessWidget {
  const ReminderCard({super.key, required this.task});

  final KioskTask task;

  @override
  Widget build(BuildContext context) {
    final part = task.dayPart;
    final triggered = task.isTriggered;

    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: triggered ? AppColors.warning : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: triggered ? const Color(0xFFEAB13B) : AppColors.cardBorder,
          width: triggered ? 2 : 1,
        ),
        boxShadow: const [AppColors.cardShadow],
      ),
      child: Row(
        children: [
          Container(
            width: 64,
            height: 64,
            decoration: BoxDecoration(
              color: triggered
                  ? AppColors.ink.withValues(alpha: 0.12)
                  : part.color.withValues(alpha: 0.16),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Icon(
              part.icon,
              size: 32,
              color: triggered ? AppColors.ink : part.color,
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  task.time,
                  style: const TextStyle(
                    color: AppColors.ink,
                    fontSize: 30,
                    fontWeight: FontWeight.w900,
                    height: 1.0,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  task.text,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: AppColors.ink,
                    fontSize: 20,
                    fontWeight: FontWeight.w700,
                    height: 1.2,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          StatusBadge(task: task),
        ],
      ),
    );
  }
}
