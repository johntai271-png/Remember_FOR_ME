# MVP Setup

## Firebase

1. Create a Firebase project.
2. Enable Realtime Database.
3. Start in test mode for a local demo, then tighten rules before sharing publicly.
4. Import `docs/firebase_schema.json` into Realtime Database.
5. Create a Firebase web app and copy its config.
6. Copy `caregiver/firebase-config.js.example` to `caregiver/firebase-config.js`.
7. Paste the web config into `caregiver/firebase-config.js`.

## Caregiver Web App

From the repository root:

```bash
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080/caregiver/
```

The page uses Firebase browser modules and writes to `families/family_001`.

Timed tasks are also stored in Firebase under:

```text
families/family_001/tasks
```

Each task includes:

- `name`
- `scheduled_time`
- `is_auto`
- `status`
- `lastTriggeredAt`
- `completedAt`
- `triggerMode`

## Kiosk Flutter App

Flutter is required but was not installed in the original implementation shell.

1. Install Flutter and Android Studio.
2. From `kiosk_app/`, run:

```bash
flutter pub get
```

3. Configure Firebase for Android:

```bash
dart pub global activate flutterfire_cli
flutterfire configure
```

4. Make sure Android package name is:

```text
com.rememberforme.kiosk
```

5. Put the generated `google-services.json` under:

```text
kiosk_app/android/app/google-services.json
```

6. Run on an Android phone or tablet:

```bash
flutter run
```

## BLE

BLE is disabled by default in the seed data:

```json
"ble": {
  "enabled": false,
  "tagId": "SMART_TAG_UUID"
}
```

For a reliable demo, keep BLE disabled and use the kiosk simulation buttons. To test BLE, set `ble.enabled` to `true` and set `ble.tagId` to a substring that matches the target device ID or advertised service UUID.

## Demo Notes

- The caregiver web app and kiosk app both use `family_001`.
- The kiosk updates `kiosk.online` and `kiosk.lastHeartbeatAt` every 10 seconds.
- The caregiver web app treats the kiosk as offline when the last heartbeat is older than 30 seconds.
- The kiosk resets reminder and emergency triggers after TTS playback completes.
