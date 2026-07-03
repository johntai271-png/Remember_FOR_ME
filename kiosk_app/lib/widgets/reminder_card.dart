import 'package:flutter/material.dart';

import '../models/task.dart';
import '../theme/app_colors.dart';

/// Khung thẻ trắng bo góc + bóng — dùng chung cho mọi section.
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
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.cardBorder),
        boxShadow: const [AppColors.cardShadow],
      ),
      child: child,
    );
  }
}

/// Badge trạng thái tiếng Việt — kiểu pill nhỏ gọn.
class StatusBadge extends StatelessWidget {
  const StatusBadge({super.key, required this.task});

  final KioskTask task;

  @override
  Widget build(BuildContext context) {
    final (emoji, label, bg, fg) = switch (task) {
      _ when task.isTriggered => ('🔔', 'Đang nhắc', const Color(0xFFFEF3C7), AppColors.morningText),
      _ when task.isCompleted => ('✅', 'Đã xong', const Color(0xFFD1FAE5), AppColors.action),
      _ => ('⏰', 'Sắp tới', AppColors.lavender, AppColors.inkSoft),
    };

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(9999),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(emoji, style: const TextStyle(fontSize: 14)),
          const SizedBox(width: 5),
          Text(
            label,
            style: TextStyle(
              color: fg,
              fontSize: 14,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}

/// Thẻ lời nhắc — kiểu kiosk-event-item của Hân:
/// Nền trắng, giờ bold to, tên task, icon trạng thái bên phải.
class ReminderCard extends StatelessWidget {
  const ReminderCard({super.key, required this.task});

  final KioskTask task;

  @override
  Widget build(BuildContext context) {
    final triggered = task.isTriggered;
    final completed = task.isCompleted;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 13),
      decoration: BoxDecoration(
        color: triggered
            ? const Color(0xFFFFFBEB)
            : Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: triggered
              ? const Color(0xFFFCD34D)
              : AppColors.cardBorder,
          width: triggered ? 2 : 1,
        ),
        boxShadow: const [AppColors.cardShadow],
      ),
      child: Row(
        children: [
          // Giờ — to và đậm
          Text(
            task.time,
            style: const TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w800,
              color: AppColors.ink,
            ),
          ),
          const SizedBox(width: 16),
          // Nội dung lời nhắc
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  task.text,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: 17,
                    fontWeight: FontWeight.w600,
                    color: completed ? AppColors.inkSoft : AppColors.ink,
                    decoration: completed ? TextDecoration.lineThrough : null,
                    height: 1.2,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          // Icon trạng thái
          if (triggered)
            const Text('🔔', style: TextStyle(fontSize: 22))
          else if (completed)
            const Text('✅', style: TextStyle(fontSize: 22))
          else
            const Text('⏰', style: TextStyle(fontSize: 20)),
        ],
      ),
    );
  }
}
