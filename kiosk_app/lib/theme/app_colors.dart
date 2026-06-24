import 'package:flutter/material.dart';

/// Bảng màu đồng bộ với Caregiver web (tailwind.config.js + index.css).
/// brand=#1d5bd8, action=#137333, active=#8b6cff, lavender=#eef0ff, shell=#f6f6ff.
class AppColors {
  AppColors._();

  static const brand = Color(0xFF1D5BD8); // xanh dương chủ đạo
  static const brandDark = Color(0xFF1648B0);
  static const action = Color(0xFF137333); // xanh lá (hoàn thành / xác nhận)
  static const active = Color(0xFF8B6CFF); // tím nhấn
  static const lavender = Color(0xFFEEF0FF); // nền ô nhạt
  static const shell = Color(0xFFF6F6FF); // nền tổng thể
  static const danger = Color(0xFFC91818); // đỏ khẩn cấp
  static const warning = Color(0xFFFFC857); // vàng đang nhắc

  static const ink = Color(0xFF18243B); // chữ đậm
  static const inkSoft = Color(0xFF5B6678); // chữ phụ
  static const cardBorder = Color(0xFFE3E6F5);

  /// Bóng đổ thẻ giống `shadow-card` của caregiver.
  static const cardShadow = BoxShadow(
    color: Color(0x14364870), // rgba(54,72,112,0.08)
    blurRadius: 40,
    offset: Offset(0, 18),
  );
}
