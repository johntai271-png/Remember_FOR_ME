import 'package:flutter/material.dart';

import '../models/task.dart';
import '../services/kiosk_sync.dart';
import '../theme/app_colors.dart';
import '../widgets/reminder_card.dart';

/// Tab Trang chủ — theo layout 2 cột của Hân:
/// Trái: Đồng hồ to + ngày + Weather widget + Reassurance box
/// Phải: Lịch hôm nay gom 3 buổi (Sáng / Trưa / Tối)
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
    final size = MediaQuery.sizeOf(context);
    // Dùng layout 2 cột nếu màn hình đủ rộng (tablet landscape / web)
    final isWide = size.width >= 700;

    if (isWide) {
      return Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // ── Cột trái ────────────────────────────────────────────────────
          Expanded(
            flex: 10,
            child: SingleChildScrollView(
              padding: const EdgeInsets.fromLTRB(28, 28, 16, 32),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _ClockSection(now: now, elderName: sync.elderName),
                  const SizedBox(height: 24),
                  const _WeatherWidget(),
                  const SizedBox(height: 24),
                  _ReassuranceBox(elderName: sync.elderName),
                ],
              ),
            ),
          ),
          // ── Cột phải ────────────────────────────────────────────────────
          Expanded(
            flex: 12, // tỉ lệ 1:1.2 như Hân (10:12)
            child: SingleChildScrollView(
              padding: const EdgeInsets.fromLTRB(16, 28, 28, 32),
              child: _ScheduleColumn(tasks: tasks, now: now),
            ),
          ),
        ],
      );
    }

    // Layout 1 cột cho màn hình nhỏ (portrait phone)
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(20, 20, 20, 32),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _ClockSection(now: now, elderName: sync.elderName),
          const SizedBox(height: 20),
          const _WeatherWidget(),
          const SizedBox(height: 20),
          _ReassuranceBox(elderName: sync.elderName),
          const SizedBox(height: 24),
          _ScheduleColumn(tasks: tasks, now: now),
        ],
      ),
    );
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Đồng hồ lớn + ngày tháng
// ────────────────────────────────────────────────────────────────────────────
class _ClockSection extends StatelessWidget {
  const _ClockSection({required this.now, required this.elderName});

  final DateTime now;
  final String elderName;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '${_greeting(now)}, $elderName 👋',
          style: const TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.w600,
            color: AppColors.inkSoft,
          ),
        ),
        const SizedBox(height: 4),
        // Đồng hồ cực lớn — 5.5rem ≈ 88sp
        Text(
          _clock(now),
          style: const TextStyle(
            fontSize: 88,
            fontWeight: FontWeight.w800,
            color: AppColors.ink,
            height: 1.0,
            letterSpacing: -2,
          ),
        ),
        Text(
          _dateVi(now),
          style: const TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.w600,
            color: AppColors.inkSoft,
          ),
        ),
      ],
    );
  }

  String _greeting(DateTime t) {
    if (t.hour < 11) return 'Good morning';
    if (t.hour < 14) return 'Good afternoon';
    if (t.hour < 18) return 'Good afternoon';
    return 'Good evening';
  }

  String _clock(DateTime t) =>
      '${t.hour.toString().padLeft(2, '0')}:${t.minute.toString().padLeft(2, '0')}';

  String _dateVi(DateTime t) {
    const wd = [
      'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday', 'Sunday',
    ];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return '${wd[t.weekday - 1]}, ${months[t.month - 1]} ${t.day}';
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Weather widget (mô phỏng tĩnh giống Hân vì chưa có API)
// ────────────────────────────────────────────────────────────────────────────
class _WeatherWidget extends StatelessWidget {
  const _WeatherWidget();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
      decoration: BoxDecoration(
        color: AppColors.cardBg,
        border: Border.all(color: AppColors.cardBorder),
        borderRadius: BorderRadius.circular(20),
        boxShadow: const [AppColors.cardShadow],
      ),
      child: const Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('☀️', style: TextStyle(fontSize: 36)),
          SizedBox(width: 20),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '31°C',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w700,
                  color: AppColors.ink,
                ),
              ),
              Text(
                'Sunny & warm',
                style: TextStyle(
                  fontSize: 15,
                  color: AppColors.inkSoft,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Hộp trấn an (Reassurance box) — baby blue như Hân
// ────────────────────────────────────────────────────────────────────────────
class _ReassuranceBox extends StatelessWidget {
  const _ReassuranceBox({required this.elderName});

  final String elderName;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: AppColors.reassuranceBg,
        border: Border.all(color: AppColors.reassuranceBorder),
        borderRadius: BorderRadius.circular(20),
      ),
      child: const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '👋 You are Safe at Home',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w700,
              color: AppColors.reassuranceTitle,
            ),
          ),
          SizedBox(height: 8),
          Text(
            'Your caregiver is keeping watch and will contact you if needed. '
            'Please relax and follow your schedule today!',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w500,
              color: AppColors.reassuranceText,
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Cột lịch 3 buổi
// ────────────────────────────────────────────────────────────────────────────
class _ScheduleColumn extends StatelessWidget {
  const _ScheduleColumn({required this.tasks, required this.now});

  final List<KioskTask> tasks;
  final DateTime now;

  @override
  Widget build(BuildContext context) {
    final currentPart = DayPartInfo.fromMinutes(now.hour * 60 + now.minute);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Your Routine Today',
          style: TextStyle(
            fontSize: 26,
            fontWeight: FontWeight.w700,
            color: AppColors.ink,
          ),
        ),
        const SizedBox(height: 16),
        for (final part in DayPart.values)
          Padding(
            padding: const EdgeInsets.only(bottom: 16),
            child: _PeriodBlock(
              part: part,
              tasks: tasks.where((t) => t.dayPart == part).toList(),
              isCurrent: part == currentPart,
            ),
          ),
        if (tasks.isEmpty)
          const Padding(
            padding: EdgeInsets.only(top: 16),
            child: Text(
              'No routines scheduled for today.',
              style: TextStyle(
                color: AppColors.inkSoft,
                fontSize: 18,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
      ],
    );
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Khối một buổi trong ngày — màu sắc theo Hân
// ────────────────────────────────────────────────────────────────────────────
class _PeriodBlock extends StatelessWidget {
  const _PeriodBlock({
    required this.part,
    required this.tasks,
    required this.isCurrent,
  });

  final DayPart part;
  final List<KioskTask> tasks;
  final bool isCurrent;

  @override
  Widget build(BuildContext context) {
    final (bg, textColor) = switch (part) {
      DayPart.morning => (AppColors.morningBg, AppColors.morningText),
      DayPart.noon    => (AppColors.noonBg,    AppColors.noonText),
      DayPart.evening => (AppColors.eveningBg, AppColors.eveningText),
    };

    return AnimatedContainer(
      duration: const Duration(milliseconds: 250),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: isCurrent
              ? AppColors.brand.withValues(alpha: 0.6)
              : Colors.transparent,
          width: 2,
        ),
        boxShadow: isCurrent
            ? [
                BoxShadow(
                  color: AppColors.brand.withValues(alpha: 0.10),
                  blurRadius: 30,
                  spreadRadius: 2,
                )
              ]
            : const [AppColors.cardShadow],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header buổi
          Row(
            children: [
              Text(part.icon, style: const TextStyle(fontSize: 22)),
              const SizedBox(width: 10),
              Text(
                part.labelVi,
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                  color: textColor,
                  letterSpacing: 0.3,
                ),
              ),
              if (isCurrent) ...[
                const SizedBox(width: 10),
                Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 12, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(9999),
                  ),
                  child: Text(
                    'Current Period',
                    style: TextStyle(
                      color: textColor,
                      fontSize: 12,
                      fontWeight: FontWeight.w800,
                      letterSpacing: 0.5,
                    ),
                  ),
                ),
              ],
            ],
          ),
          const SizedBox(height: 4),
          Divider(color: textColor.withValues(alpha: 0.18), height: 16),
          // Các lời nhắc trong buổi
          if (tasks.isEmpty)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Text(
                'No reminders.',
                style: TextStyle(
                  color: textColor.withValues(alpha: 0.7),
                  fontSize: 15,
                  fontWeight: FontWeight.w500,
                ),
              ),
            )
          else
            for (final task in tasks)
              Padding(
                padding: const EdgeInsets.only(top: 8),
                child: _EventItem(task: task),
              ),
        ],
      ),
    );
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Event item trong khối buổi — giống .kiosk-event-item của Hân
// ────────────────────────────────────────────────────────────────────────────
class _EventItem extends StatelessWidget {
  const _EventItem({required this.task});

  final KioskTask task;

  @override
  Widget build(BuildContext context) {
    final triggered = task.isTriggered;
    final completed = task.isCompleted;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
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
          // Giờ
          Text(
            task.time,
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w700,
              color: AppColors.ink,
            ),
          ),
          const SizedBox(width: 16),
          // Tên lời nhắc
          Expanded(
            child: Text(
              task.text,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                fontSize: 17,
                fontWeight: FontWeight.w600,
                color: completed
                    ? AppColors.inkSoft
                    : AppColors.ink,
                decoration: completed
                    ? TextDecoration.lineThrough
                    : null,
              ),
            ),
          ),
          // Trạng thái icon
          const SizedBox(width: 8),
          if (triggered)
            const Text('🔔', style: TextStyle(fontSize: 20))
          else if (completed)
            const Text('✅', style: TextStyle(fontSize: 20))
          else
            const Text('⏰', style: TextStyle(fontSize: 18)),
        ],
      ),
    );
  }
}
