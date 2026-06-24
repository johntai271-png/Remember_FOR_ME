# Demo Script

1. Seed Firebase Realtime Database with `docs/firebase_schema.json`.
2. Start the caregiver web app:

```bash
python3 -m http.server 8080
```

3. Open `http://localhost:8080/caregiver/` on a phone or desktop browser.
4. Start the kiosk app on an Android tablet or phone with `flutter run`.
5. Confirm the caregiver dashboard shows:
   - Elder name: `Ngoại`
   - Home status: `In-Home`
   - Kiosk: `Online` after the first heartbeat
6. Change the three reminder messages or times, then tap `Save all`.
7. Tap `Trigger Morning`.
8. Confirm the kiosk shows a full-screen reminder and speaks the morning reminder.
9. Confirm the Firebase flag resets to `is_triggered: false`.
10. Tap `Send Emergency Alert`.
11. Confirm the kiosk shows a red full-screen emergency and speaks the emergency message.
12. On the kiosk, tap `Simulate Out-of-Home`.
13. Confirm the caregiver dashboard updates to `Out-of-Home`.
14. Tap `Simulate In-Home`.
15. Confirm the caregiver dashboard updates to `In-Home`.

## Fallbacks

- If BLE hardware is unreliable, keep `ble.enabled` as `false` and use simulation buttons.
- If TTS does not speak, check Android media volume and text-to-speech language settings.
- If the caregiver app says `Config needed`, create `caregiver/firebase-config.js` from the example file.
