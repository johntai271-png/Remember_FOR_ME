import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:wakelock_plus/wakelock_plus.dart';

import 'firebase_options.dart';
import 'screens/kiosk_home.dart';
import 'screens/pairing_screen.dart';
import 'theme/app_colors.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  try {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
  } catch (e) {
    debugPrint('Firebase initialization failed: $e');
  }

  try {
    await WakelockPlus.enable();
  } catch (e) {
    debugPrint('Wakelock failed to enable: $e');
  }

  try {
    await SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
    await SystemChrome.setPreferredOrientations([
      DeviceOrientation.landscapeLeft,
      DeviceOrientation.landscapeRight,
      DeviceOrientation.portraitUp,
    ]);
  } catch (e) {
    debugPrint('SystemChrome configuration failed: $e');
  }

  await _requestPermissions();

  // Đọc family_id đã lưu từ trước (nếu có)
  String? familyId;
  try {
    final prefs = await SharedPreferences.getInstance();
    familyId = prefs.getString('family_id');
  } catch (e) {
    debugPrint('SharedPreferences read failed: $e');
  }

  runApp(RememberForMeKiosk(initialFamilyId: familyId));
}

Future<void> _requestPermissions() async {
  if (kIsWeb || defaultTargetPlatform == TargetPlatform.windows) return;
  try {
    await [
      Permission.bluetoothScan,
      Permission.bluetoothConnect,
      Permission.locationWhenInUse,
    ].request();
  } catch (e) {
    debugPrint('Device permissions configuration failed: $e');
  }
}

class RememberForMeKiosk extends StatelessWidget {
  const RememberForMeKiosk({super.key, this.initialFamilyId});

  final String? initialFamilyId;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Remember.For.Me Kiosk',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.brand,
          brightness: Brightness.light,
        ),
        scaffoldBackgroundColor: AppColors.shell,
        textTheme: GoogleFonts.interTextTheme(
          ThemeData.light().textTheme,
        ),
        useMaterial3: true,
      ),
      // Nếu đã liên kết gia đình thì vào thẳng Home, ngược lại hiển thị màn hình ghép nối PIN
      initialRoute: initialFamilyId != null ? '/home' : '/pairing',
      routes: {
        '/pairing': (context) => const PairingScreen(),
        '/home': (context) {
          final args = ModalRoute.of(context)!.settings.arguments as String?;
          final familyId = args ?? initialFamilyId ?? 'family_001';
          return KioskHomePage(familyId: familyId);
        },
      },
    );
  }
}

