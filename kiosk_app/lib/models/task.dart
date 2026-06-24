import 'package:flutter/material.dart';

import '../theme/app_colors.dart';

/// Buổi trong ngày để gom nhóm và lọc lời nhắc.
enum DayPart { morning, noon, evening }

extension DayPartInfo on DayPart {
  String get labelVi => switch (this) {
        DayPart.morning => 'Buổi sáng',
        DayPart.noon => 'Buổi trưa',
        DayPart.evening => 'Buổi tối',
      };

  IconData get icon => switch (this) {
        DayPart.morning => Icons.wb_sunny_rounded,
        DayPart.noon => Icons.light_mode_rounded,
        DayPart.evening => Icons.nightlight_round,
      };

  Color get color => switch (this) {
        DayPart.morning => AppColors.warning,
        DayPart.noon => AppColors.brand,
        DayPart.evening => AppColors.active,
      };

  /// Buổi tương ứng với một thời điểm (dùng để biết "đang là buổi nào").
  static DayPart fromMinutes(int minutes) {
    if (minutes < 11 * 60) return DayPart.morning; // < 11:00
    if (minutes < 16 * 60) return DayPart.noon; // 11:00–16:00
    return DayPart.evening; // >= 16:00
  }
}

/// Model nhắc nhở của Kiosk, đọc trực tiếp từ node `tasks/{taskId}` trên Firebase.
/// Tolerate cả kiểu bool lẫn chuỗi ("true"/"True") vì Realtime Database có thể lưu cả hai.
class KioskTask {
  const KioskTask({
    required this.id,
    required this.name,
    required this.time,
    required this.text,
    required this.status,
    required this.isTriggered,
    required this.isAuto,
    required this.minutesOfDay,
    this.triggeredAt,
    this.spokenAt,
    this.completedAt,
  });

  final String id;
  final String name;
  final String time;
  final String text;
  final String status;
  final bool isTriggered;
  final bool isAuto;
  final int minutesOfDay; // số phút tính từ 00:00, dùng để sort & gom buổi
  final int? triggeredAt;
  final int? spokenAt;
  final int? completedAt;

  bool get isCompleted => status.toLowerCase() == 'completed';
  bool get isRunning => status.toLowerCase() == 'running';

  DayPart get dayPart => DayPartInfo.fromMinutes(minutesOfDay);

  /// Nội dung phát loa: ưu tiên `text`, fallback về `name`.
  String get speakText => text.trim().isNotEmpty ? text.trim() : name;

  static KioskTask fromMap(String id, Object? value) {
    final data = value is Map ? value : const {};
    final name = '${data['name'] ?? 'Lời nhắc'}';
    final rawText = '${data['text'] ?? ''}'.trim();
    final time = '${data['scheduled_time'] ?? '--:--'}';
    return KioskTask(
      id: id,
      name: name,
      time: time,
      text: rawText.isEmpty ? name : rawText,
      status: '${data['status'] ?? 'Pending'}',
      isTriggered: _asBool(data['is_triggered']),
      isAuto: _asBool(data['is_auto']),
      minutesOfDay: _parseMinutes(time),
      triggeredAt: _asInt(data['triggeredAt']),
      spokenAt: _asInt(data['spokenAt']),
      completedAt: _asInt(data['completedAt']),
    );
  }

  /// Parse toàn bộ node `tasks` thành danh sách, sort theo giờ.
  static List<KioskTask> parseList(Object? value) {
    final data = value is Map ? value : const {};
    final list = data.entries
        .map((entry) => KioskTask.fromMap('${entry.key}', entry.value))
        .toList();
    list.sort((a, b) => a.minutesOfDay.compareTo(b.minutesOfDay));
    return List.unmodifiable(list);
  }

  static int _parseMinutes(String time) {
    final parts = time.split(':');
    if (parts.length < 2) return 0;
    final h = int.tryParse(parts[0].trim()) ?? 0;
    final m = int.tryParse(parts[1].trim()) ?? 0;
    return h * 60 + m;
  }

  static bool _asBool(Object? value) {
    if (value is bool) return value;
    final text = '$value'.trim().toLowerCase();
    return text == 'true';
  }

  static int? _asInt(Object? value) {
    if (value is int) return value;
    if (value is num) return value.toInt();
    return int.tryParse('$value');
  }
}

/// Nhãn trạng thái tiếng Việt cho thẻ nhắc nhở.
String taskStatusLabelVi(KioskTask task) {
  if (task.isTriggered) return 'Đang nhắc';
  if (task.isCompleted) return 'Đã xong';
  return 'Sắp tới';
}
