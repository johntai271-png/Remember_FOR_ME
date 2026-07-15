import 'dart:async';
import 'dart:math';

import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../theme/app_colors.dart';

/// Màn hình ghép nối mã PIN cho TV / máy tính bảng Kiosk.
/// Tự động sinh mã ngẫu nhiên 6 chữ số và đẩy lên Firebase node `pairing_codes/{PIN}`.
/// Chờ Caregiver nhập mã này trên web để nhận được `familyId` động và chuyển sang Home.
class PairingScreen extends StatefulWidget {
  const PairingScreen({super.key});

  @override
  State<PairingScreen> createState() => _PairingScreenState();
}

class _PairingScreenState extends State<PairingScreen> {
  String _pairingPin = '';
  StreamSubscription<DatabaseEvent>? _pairingSub;
  final DatabaseReference _dbRef = FirebaseDatabase.instance.ref();
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _generateAndPublishPin();
  }

  /// Bỏ qua ghép nối — vào thẳng chế độ demo với `family_001`
  /// (khớp với "Continue as Guest" bên web caregiver).
  Future<void> _skipToDemo() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('family_id', 'family_001');
    } catch (e) {
      debugPrint('Save demo family_id failed: $e');
    }
    if (mounted) {
      Navigator.of(context)
          .pushReplacementNamed('/home', arguments: 'family_001');
    }
  }

  void _generateAndPublishPin() {
    setState(() {
      _isLoading = true;
    });

    // 1. Sinh mã PIN 6 số ngẫu nhiên
    final random = Random();
    final pin = (100000 + random.nextInt(900000)).toString();
    setState(() {
      _pairingPin = pin;
      _isLoading = false;
    });

    final pinRef = _dbRef.child('pairing_codes/$pin');

    try {
      // 2. Publish lên Firebase node pairing_codes
      pinRef.set({
        'familyId': '',
        'createdAt': ServerValue.timestamp,
      });

      // 3. Lắng nghe cập nhật khi Caregiver nhập mã này trên web
      _pairingSub = pinRef.onValue.listen((event) async {
        final value = event.snapshot.value;
        if (value is Map) {
          final familyId = value['familyId'];
          if (familyId != null && familyId.toString().trim().isNotEmpty) {
            // Lưu familyId động vào máy
            final prefs = await SharedPreferences.getInstance();
            await prefs.setString('family_id', familyId.toString());

            // Xóa mã PIN trên Firebase để giải phóng tài nguyên
            await pinRef.remove();

            // Điều hướng sang Kiosk Home Page
            if (mounted) {
              Navigator.of(context).pushReplacementNamed('/home', arguments: familyId.toString());
            }
          }
        }
      });
    } catch (err) {
      debugPrint('Firebase pairing setup error: $err');
    }
  }

  @override
  Widget build(BuildContext context) {
    final formattedPin = _pairingPin.length == 6
        ? _pairingPin
        : '...';

    return Scaffold(
      backgroundColor: AppColors.shell,
      body: Center(
        child: SingleChildScrollView(
          child: Container(
            width: 520,
            margin: const EdgeInsets.all(24),
            padding: const EdgeInsets.fromLTRB(40, 48, 40, 48),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(28),
              border: Border.all(color: AppColors.cardBorder),
              boxShadow: const [AppColors.cardShadow],
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                // Logo & Header
                Container(
                  width: 72,
                  height: 72,
                  decoration: const BoxDecoration(
                    color: AppColors.lavender,
                    shape: BoxShape.circle,
                  ),
                  child: const Center(
                    child: Text('📺', style: TextStyle(fontSize: 36)),
                  ),
                ),
                const SizedBox(height: 24),
                const Text(
                  'Link Kiosk Device',
                  style: TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.w800,
                    color: AppColors.ink,
                  ),
                ),
                const SizedBox(height: 12),
                const Text(
                  'Please enter this pairing code on the Caregiver Portal to connect this screen to your household:',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 16,
                    height: 1.4,
                    color: AppColors.inkSoft,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 38),

                // Hiển thị mã PIN
                _isLoading
                    ? const CircularProgressIndicator()
                    : MouseRegion(
                        cursor: SystemMouseCursors.click,
                        child: GestureDetector(
                          onTap: () {
                            Clipboard.setData(ClipboardData(text: _pairingPin));
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text('PIN $_pairingPin copied to clipboard!'),
                                duration: const Duration(seconds: 2),
                                behavior: SnackBarBehavior.floating,
                              ),
                            );
                          },
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 40, vertical: 20),
                            decoration: BoxDecoration(
                              color: AppColors.lavender,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: SelectableText(
                              formattedPin,
                              style: const TextStyle(
                                fontSize: 52,
                                fontWeight: FontWeight.w900,
                                color: AppColors.brand,
                                letterSpacing: 2,
                              ),
                            ),
                          ),
                        ),
                      ),
                const SizedBox(height: 40),

                // Trạng thái chờ
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const SizedBox(
                      width: 18,
                      height: 18,
                      child: CircularProgressIndicator(
                        strokeWidth: 2.5,
                        valueColor:
                            AlwaysStoppedAnimation<Color>(AppColors.inkSoft),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Text(
                      'Waiting for connection...',
                      style: TextStyle(
                        fontSize: 15,
                        fontStyle: FontStyle.italic,
                        fontWeight: FontWeight.w600,
                        color: AppColors.inkSoft.withValues(alpha: 0.8),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 28),

                // Lối tắt demo: vào thẳng family_001 (không cần ghép nối)
                TextButton(
                  onPressed: _skipToDemo,
                  child: Text(
                    'Bỏ qua · Demo với family_001',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w700,
                      color: AppColors.brand.withValues(alpha: 0.9),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _pairingSub?.cancel();
    super.dispose();
  }
}
