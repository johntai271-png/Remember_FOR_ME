import 'package:flutter/material.dart';

import '../models/task.dart';
import '../services/kiosk_sync.dart';
import '../theme/app_colors.dart';
import '../widgets/reminder_card.dart';

/// Tab Lời nhắc: toàn bộ lời nhắc gom theo buổi Sáng / Trưa / Tối.
/// Buổi tương ứng giờ hiện tại được làm nổi bật.
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
        child: Text(
          'Chưa có lời nhắc nào.',
          style: TextStyle(
            color: AppColors.inkSoft,
            fontSize: 24,
            fontWeight: FontWeight.w600,
          ),
        ),
      );
    }

    return ListView(
      padding: const EdgeInsets.fromLTRB(24, 24, 24, 32),
      children: [
        for (final part in DayPart.values)
          _DayPartSection(
            part: part,
            tasks: tasks.where((t) => t.dayPart == part).toList(),
            highlighted: part == currentPart,
          ),
      ],
    );
  }
}

class _DayPartSection extends StatelessWidget {
  const _DayPartSection({
    required this.part,
    required this.tasks,
    required this.highlighted,
  });

  final DayPart part;
  final List<KioskTask> tasks;
  final bool highlighted;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: part.color.withValues(alpha: 0.16),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(part.icon, color: part.color, size: 26),
              ),
              const SizedBox(width: 12),
              Text(
                part.labelVi,
                style: const TextStyle(
                  color: AppColors.ink,
                  fontSize: 26,
                  fontWeight: FontWeight.w800,
                ),
              ),
              if (highlighted) ...[
                const SizedBox(width: 10),
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
                  decoration: BoxDecoration(
                    color: AppColors.brand,
                    borderRadius: BorderRadius.circular(999),
                  ),
                  child: const Text(
                    'Bây giờ',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 14,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ),
              ],
            ],
          ),
          const SizedBox(height: 12),
          if (tasks.isEmpty)
            Padding(
              padding: const EdgeInsets.only(left: 4, bottom: 4),
              child: Text(
                'Không có lời nhắc.',
                style: TextStyle(
                  color: AppColors.inkSoft.withValues(alpha: 0.7),
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
            )
          else
            for (final task in tasks)
              Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: ReminderCard(task: task),
              ),
        ],
      ),
    );
  }
}
