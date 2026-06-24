import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:wakelock_plus/wakelock_plus.dart';

import 'firebase_options.dart';
import 'screens/kiosk_home.dart';
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

  runApp(const RememberForMeKiosk());
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
  const RememberForMeKiosk({super.key});

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
        fontFamily: 'Roboto',
        useMaterial3: true,
      ),
      home: const KioskHomePage(),
    );
  }
}
