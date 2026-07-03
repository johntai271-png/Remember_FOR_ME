import 'package:flutter/material.dart';

import '../models/task.dart';
import '../services/kiosk_sync.dart';
import '../theme/app_colors.dart';
import '../widgets/reminder_card.dart';

/// Tab Lời nhắc — giao diện period blocks theo màu sắc của Hân.
/// Buổi hiện tại được highlight viền indigo + scale nhẹ.
class RemindersTab extends StatelessWidget {
  const RemindersTab({super.key, required this.sync, required this.now});

  final KioskSyncService sync;
  final DateTime now;

  @override
  Widget build(BuildContext context) {
    final tasks = sync.tasks;
    final currentPart =
        DayPartInfo.fromMinutes(now.hour * 60 + now.minute);

    if (tasks.isEmpty) {
      return const Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('📋', style: TextStyle(fontSize: 56)),
            SizedBox(height: 16),
            Text(
              'No reminders scheduled.',
              style: TextStyle(
                color: AppColors.inkSoft,
                fontSize: 24,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      );
    }

    return ListView(
      padding: const EdgeInsets.fromLTRB(24, 24, 24, 32),
      children: [
        const Text(
          "Today's Schedule",
          style: TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.w800,
            color: AppColors.ink,
          ),
        ),
        const SizedBox(height: 20),
        for (final part in DayPart.values)
          _PeriodSection(
            part: part,
            tasks: tasks.where((t) => t.dayPart == part).toList(),
            highlighted: part == currentPart,
          ),
      ],
    );
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Khối một buổi — màu sắc đặc trưng của Hân, viền indigo khi đang là buổi hiện tại
// ────────────────────────────────────────────────────────────────────────────
class _PeriodSection extends StatelessWidget {
  const _PeriodSection({
    required this.part,
    required this.tasks,
    required this.highlighted,
  });

  final DayPart part;
  final List<KioskTask> tasks;
  final bool highlighted;

  @override
  Widget build(BuildContext context) {
    final (bg, textColor) = switch (part) {
      DayPart.morning => (AppColors.morningBg, AppColors.morningText),
      DayPart.noon    => (AppColors.noonBg,    AppColors.noonText),
      DayPart.evening => (AppColors.eveningBg, AppColors.eveningText),
    };

    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: bg,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: highlighted
                ? AppColors.brand
                : Colors.transparent,
            width: 2,
          ),
          boxShadow: highlighted
              ? [
                  BoxShadow(
                    color: AppColors.brand.withValues(alpha: 0.12),
                    blurRadius: 30,
                    spreadRadius: 4,
                  )
                ]
              : const [AppColors.cardShadow],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Row(
              children: [
                Text(part.icon, style: const TextStyle(fontSize: 24)),
                const SizedBox(width: 12),
                Text(
                  part.labelVi,
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w700,
                    color: textColor,
                  ),
                ),
                if (highlighted) ...[
                  const SizedBox(width: 10),
                  Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 12, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppColors.brand,
                      borderRadius: BorderRadius.circular(9999),
                    ),
                    child: const Text(
                      'Current Period',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 13,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ),
                ],
              ],
            ),
            Divider(
              color: textColor.withValues(alpha: 0.2),
              height: 20,
            ),
            if (tasks.isEmpty)
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 4),
                child: Text(
                  'No reminders.',
                  style: TextStyle(
                    color: textColor.withValues(alpha: 0.65),
                    fontSize: 17,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              )
            else
              for (final task in tasks)
                Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: ReminderCard(task: task),
                ),
          ],
        ),
      ),
    );
  }
}
