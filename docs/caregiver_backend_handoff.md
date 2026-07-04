# Caregiver Backend Handoff

## Scope

This note covers the `caregiver` web app features that still need database, backend, or hardware integration work to be production-ready.

## BLE Tag Management

### What is already wired

- UI supports create, edit, delete, connect, disconnect, and status toggle for BLE tags.
- Firebase RTDB path used by the caregiver app:
  - `families/{familyId}/ble_tags/{tagId}`
- Current tag shape expected by the app:

```json
{
  "name": "Front Door Keys Tag",
  "location": "Kitchen Hook",
  "hardwareId": "BLE-KEYS-002",
  "status": "safe",
  "connectionStatus": "connected",
  "lastConnectedAt": 1751520000000,
  "createdAt": 1751520000000,
  "updatedAt": 1751520000000
}
```

### What is still missing for real BLE connection

- A real BLE bridge is still missing.
- The web app currently stores the caregiver intent to pair a tag, but it does not scan nearby BLE devices itself in a production-safe way.
- To make this real, another team needs one of these:
  - A native mobile app that scans BLE tags and writes presence updates into Firebase.
  - A home kiosk / tablet companion app with BLE permissions and background scanning.
  - A local gateway service at home that scans BLE devices and publishes presence into Firebase or another backend.

### Recommended backend/hardware contract

- Source of truth path:
  - `families/{familyId}/ble_tags/{tagId}`
- Scanner service should update:
  - `connectionStatus`: `connected` or `disconnected`
  - `status`: `safe` when in range, `away` when missing
  - `lastConnectedAt`
  - optional `rssi`
  - optional `batteryPercent`
  - optional `lastSeenAt`
- Suggested extra fields:

```json
{
  "hardwareId": "AA:BB:CC:DD:EE:FF",
  "deviceType": "tile",
  "lastSeenAt": 1751520000000,
  "rssi": -63,
  "batteryPercent": 88,
  "firmwareVersion": "1.0.4"
}
```

### Product gap to note

- `Connect` in the caregiver app currently means “pair this saved tag record to a device ID in Firebase”.
- It does not yet mean “BLE handshake completed with real hardware”.
- The hardware/scanner team should replace or validate this state with actual scan results.

## Routine Management

### Already wired

- Reads/writes to:
  - `families/{familyId}/tasks/{taskId}`
- Current fields already used:
  - `name`
  - `scheduled_time`
  - `is_auto`
  - `period`
  - `voiceEnabled`
  - `status`
  - `triggeredAt`
  - `completedAt`
  - `updatedAt`

### Still needed

- Kiosk side should consume `period` and `voiceEnabled`.
- Background scheduler should actually trigger reminders at `scheduled_time`.
- Completion acknowledgements should write back final state after the elder interacts with the kiosk.
- Voice engine service should mark `spokenAt`.

## Tracker / Geofence

### Already wired

- Reads:
  - `families/{familyId}/elder`
  - `families/{familyId}/tracker_alert`
  - `families/{familyId}/kiosk`

### Still needed

- Real tracker provider or wearable ingestion.
- Actual coordinates, safe-zone checks, and heartbeat timestamps.
- Recommended producer responsibilities:
  - update `elder.status`
  - update `elder.locationLabel`
  - update `elder.lastSeenAt`
  - update `elder.vitals.heartRateBpm`
  - update `tracker_alert.is_active`
  - update `tracker_alert.type`
  - update `tracker_alert.message`
  - update `tracker_alert.updatedAt`
  - update `tracker_alert.safeZoneStatus`

## Emergency Flow

### Already wired

- Caregiver app writes to:
  - `families/{familyId}/emergency`

### Still needed

- A backend worker or responder service must listen for:
  - `emergency.is_triggered === true`
- That service should:
  - notify emergency contacts
  - optionally trigger kiosk full-screen message
  - write response status back into Firebase

### Suggested fields

```json
{
  "is_triggered": true,
  "triggeredAt": 1751520000000,
  "message": "Ngoại ơi, con đang gọi. Xin hãy nhìn vào màn hình.",
  "acknowledgedAt": null,
  "resolvedAt": null,
  "handledBy": null
}
```

## Kiosk Presence

### Already wired

- Caregiver app reads:
  - `families/{familyId}/kiosk`

### Still needed

- Kiosk client should heartbeat on an interval.
- Suggested fields:
  - `online`
  - `name`
  - `lastHeartbeatAt`
  - `volumeForced`
  - optional `deviceId`
  - optional `appVersion`

## Alert Timeline

### Current state

- Timeline is still composed in the caregiver frontend from current app state.
- It is not stored as canonical history in Firebase.

### Needed for production

- A persisted event stream, for example:
  - `families/{familyId}/events/{eventId}`
- Suggested event categories:
  - `tag_connected`
  - `tag_disconnected`
  - `tag_missing`
  - `routine_triggered`
  - `routine_completed`
  - `tracker_alert`
  - `emergency_triggered`
  - `kiosk_offline`

## Summary For The Other Team

- The caregiver app can now save BLE tags to Firebase and expose a clear pairing flow.
- Real BLE connectivity still needs a scanner/gateway/native client.
- The main RTDB paths that the other team should own are:
  - `families/{familyId}/ble_tags`
  - `families/{familyId}/tasks`
  - `families/{familyId}/elder`
  - `families/{familyId}/tracker_alert`
  - `families/{familyId}/kiosk`
  - `families/{familyId}/emergency`
  - optional `families/{familyId}/events`
