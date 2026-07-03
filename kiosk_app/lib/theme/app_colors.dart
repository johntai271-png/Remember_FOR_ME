import 'package:flutter/material.dart';

/// Bảng màu đồng bộ với thiết kế "Patient Kiosk" của Hân:
/// Nền kem ấm, màu indigo chủ đạo, 3 buổi có màu sắc riêng biệt.
class AppColors {
  AppColors._();

  // ── Màu chủ đạo (Indigo) ──────────────────────────────────────────────────
  static const brand     = Color(0xFF4F46E5); // indigo — #4f46e5
  static const brandDark = Color(0xFF4338CA); // indigo đậm — #4338ca
  static const active    = Color(0xFF4F46E5); // alias dùng cho nav active

  // ── Nền & thẻ ────────────────────────────────────────────────────────────
  static const shell    = Color(0xFFF9F6F0); // warm cream — #f9f6f0
  static const cardBg   = Color(0xFFFFFFFF);
  static const lavender = Color(0xFFEEF0FF); // nền ô nav active (nhạt)

  // ── Văn bản ───────────────────────────────────────────────────────────────
  static const ink     = Color(0xFF1C1D21); // chữ đậm — #1c1d21
  static const inkSoft = Color(0xFF4B5563); // chữ phụ — #4b5563

  // ── Trạng thái ───────────────────────────────────────────────────────────
  static const action  = Color(0xFF10B981); // xanh lá "safe" — #10b981
  static const danger  = Color(0xFFEF4444); // đỏ nguy hiểm — #ef4444
  static const warning = Color(0xFFF59E0B); // vàng cảnh báo — #f59e0b

  // ── Màu buổi trong ngày (theo Hân) ───────────────────────────────────────
  static const morningBg   = Color(0xFFFEF3C7); // vàng nhạt ấm
  static const morningText = Color(0xFF92400E); // nâu đất

  static const noonBg   = Color(0xFFDBEAFE); // xanh nhạt nhẹ
  static const noonText = Color(0xFF1E40AF); // xanh dương đậm

  static const eveningBg   = Color(0xFFF3E8FF); // tím nhạt lavender
  static const eveningText = Color(0xFF6B21A8); // tím đậm

  // ── Reassurance box ───────────────────────────────────────────────────────
  static const reassuranceBg     = Color(0xFFE0F2FE); // xanh baby — #e0f2fe
  static const reassuranceBorder = Color(0xFFBAE6FD); // xanh nhạt hơn
  static const reassuranceTitle  = Color(0xFF0369A1); // xanh đậm tiêu đề
  static const reassuranceText   = Color(0xFF0C4A6E); // xanh rất đậm nội dung

  // ── Alert overlay (Voice Announcement Card) ───────────────────────────────
  static const alertBg     = Color(0xFF1E1B4B); // deep twilight blue — #1e1b4b
  static const alertBorder = Color(0xFF4338CA); // indigo border
  static const alertAccent = Color(0xFFA5B4FC); // indigo sáng — #a5b4fc
  static const alertWave   = Color(0xFF818CF8); // indigo wave rings

  // ── Card ─────────────────────────────────────────────────────────────────
  static const cardBorder = Color(0xFFE5E7EB);
  static const cardShadow = BoxShadow(
    color: Color(0x0A000000),
    blurRadius: 20,
    offset: Offset(0, 4),
  );
}
