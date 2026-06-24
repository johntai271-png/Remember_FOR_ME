# Remember.For.Me

Remember.For.Me is an MVP demo for caregiver-driven reminders and emergency alerts.

The system has two parts:

- `caregiver/`: mobile-first browser app built with HTML, CSS, vanilla JavaScript, and Firebase Realtime Database.
- `kiosk_app/`: Android-first Flutter kiosk app for an elderly person’s home tablet or phone.

The demo flow is:

```text
Caregiver web button
-> Firebase Realtime Database
-> Flutter kiosk listener
-> fullscreen alert + TTS
-> trigger reset
```

## Repository Structure

```text
caregiver/
  index.html
  styles.css
  app.js
  firebase-config.js.example
  README.md
docs/
  firebase_schema.json
  mvp_setup.md
  demo_script.md
kiosk_app/
  lib/main.dart
  android/
  pubspec.yaml
README.md
```

## Quick Start

1. Create a Firebase project and enable Realtime Database.
2. Import `docs/firebase_schema.json`.
3. Copy `caregiver/firebase-config.js.example` to `caregiver/firebase-config.js`.
4. Paste your Firebase web config into `caregiver/firebase-config.js`.
5. Run the caregiver web app:

```bash
python3 -m http.server 8080
```

6. Open `http://localhost:8080/caregiver/`.
7. Install Flutter, configure Firebase for Android, then run the kiosk app:

```bash
cd kiosk_app
flutter pub get
flutter run
```

See `docs/mvp_setup.md` for full setup and `docs/demo_script.md` for the demo flow.

## Firebase Paths

The MVP uses one demo family:

```text
families/family_001
```

Important child paths:

- `elder`: name, in-home/out-of-home status, last seen time.
- `reminders`: morning, noon, and evening reminder records.
- `emergency`: immediate emergency trigger and spoken message.
- `kiosk`: online heartbeat state.
- `ble`: optional smart tag scan configuration.

## Security

Do not commit real Firebase credentials.

The following local files are ignored:

- `caregiver/firebase-config.js`
- `kiosk_app/android/app/google-services.json`

Use Firebase test rules only for local demos. Tighten rules before any public or shared deployment.

## Current Limitations

- Flutter and Firebase CLI were not installed in the original shell used to scaffold this project, so Flutter dependency resolution and analysis must be run after installing Flutter.
- BLE is intentionally demo-safe. It can be disabled and replaced by the kiosk simulation buttons.
- There is no custom backend, MQTT broker, AWS IoT integration, or native mobile caregiver app in this MVP.
