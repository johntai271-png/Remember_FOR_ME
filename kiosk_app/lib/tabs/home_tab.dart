import 'package:flutter/material.dart';

import '../models/task.dart';
import '../services/kiosk_sync.dart';
import '../theme/app_colors.dart';
import '../widgets/reminder_card.dart';

/// Tab Trang chủ: đồng hồ lớn, lời nhắc kế tiếp nổi bật, tiến độ hôm nay.
class HomeTab extends StatelessWidget {
  const HomeTab({
    super.key,
    required this.sync,
    required this.now,
  });

  final KioskSyncService sync;
  final DateTime now;

  @override
  Widget build(BuildContext context) {
    final tasks = sync.tasks;
    final nextTask = _pickNextTask(tasks);
    final done = tasks.where((t) => t.isCompleted).length;

    return ListView(
      padding: const EdgeInsets.fromLTRB(24, 24, 24, 32),
      children: [
        _ClockHeader(now: now, elderName: sync.elderName),
        const SizedBox(height: 24),
        _NextReminderCard(task: nextTask, hasTasks: tasks.isNotEmpty),
        const SizedBox(height: 20),
        _ProgressCard(done: done, total: tasks.length),
      ],
    );
  }

  /// Lời nhắc kế tiếp = task đang nhắc (nếu có), nếu không thì task chưa xong
  /// gần nhất kể từ giờ hiện tại; nếu hết thì task chưa xong đầu ngày.
  KioskTask? _pickNextTask(List<KioskTask> tasks) {
    if (tasks.isEmpty) return null;
    final triggered = tasks.where((t) => t.isTriggered);
    if (triggered.isNotEmpty) return triggered.first;

    final pending = tasks.where((t) => !t.isCompleted).toList();
    if (pending.isEmpty) return null;

    final nowMinutes = now.hour * 60 + now.minute;
    final upcoming =
        pending.where((t) => t.minutesOfDay >= nowMinutes).toList();
    return upcoming.isNotEmpty ? upcoming.first : pending.first;
  }
}

class _ClockHeader extends StatelessWidget {
  const _ClockHeader({required this.now, required this.elderName});

  final DateTime now;
  final String elderName;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '${_greeting(now)}, $elderName',
          style: const TextStyle(
            color: AppColors.inkSoft,
            fontSize: 24,
            fontWeight: FontWeight.w700,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          _clock(now),
          style: const TextStyle(
            color: AppColors.brand,
            fontSize: 96,
            fontWeight: FontWeight.w900,
            height: 1.0,
          ),
        ),
        Text(
          _dateVi(now),
          style: const TextStyle(
            color: AppColors.ink,
            fontSize: 22,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }

  String _greeting(DateTime t) {
    if (t.hour < 11) return 'Chào buổi sáng';
    if (t.hour < 14) return 'Chào buổi trưa';
    if (t.hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  }

  String _clock(DateTime t) =>
      '${t.hour.toString().padLeft(2, '0')}:${t.minute.toString().padLeft(2, '0')}';

  String _dateVi(DateTime t) {
    const weekdays = [
      'Thứ Hai',
      'Thứ Ba',
      'Thứ Tư',
      'Thứ Năm',
      'Thứ Sáu',
      'Thứ Bảy',
      'Chủ Nhật',
    ];
    return '${weekdays[t.weekday - 1]}, ngày ${t.day} tháng ${t.month} năm ${t.year}';
  }
}

class _NextReminderCard extends StatelessWidget {
  const _NextReminderCard({required this.task, required this.hasTasks});

  final KioskTask? task;
  final bool hasTasks;

  @override
  Widget build(BuildContext context) {
    final t = task;
    return SectionCard(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Icon(Icons.notifications_active_rounded,
                  color: AppColors.brand, size: 26),
              SizedBox(width: 10),
              Text(
                'Lời nhắc tiếp theo',
                style: TextStyle(
                  color: AppColors.ink,
                  fontSize: 24,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          if (t == null)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 18),
              child: Text(
                hasTasks
                    ? 'Hôm nay đã xong tất cả lời nhắc. Ngoại nghỉ ngơi nhé!'
                    : 'Chưa có lời nhắc nào.',
                style: const TextStyle(
                  color: AppColors.inkSoft,
                  fontSize: 22,
                  fontWeight: FontWeight.w600,
                ),
              ),
            )
          else
            ReminderCard(task: t),
        ],
      ),
    );
  }
}

class _ProgressCard extends StatelessWidget {
  const _ProgressCard({required this.done, required this.total});

  final int done;
  final int total;

  @override
  Widget build(BuildContext context) {
    final ratio = total == 0 ? 0.0 : done / total;
    return SectionCard(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Tiến độ hôm nay',
                style: TextStyle(
                  color: AppColors.ink,
                  fontSize: 22,
                  fontWeight: FontWeight.w800,
                ),
              ),
              Text(
                '$done/$total',
                style: const TextStyle(
                  color: AppColors.action,
                  fontSize: 26,
                  fontWeight: FontWeight.w900,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          ClipRRect(
            borderRadius: BorderRadius.circular(999),
            child: LinearProgressIndicator(
              value: ratio,
              minHeight: 16,
              backgroundColor: AppColors.lavender,
              valueColor:
                  const AlwaysStoppedAnimation<Color>(AppColors.action),
            ),
          ),
        ],
      ),
    );
  }
}
