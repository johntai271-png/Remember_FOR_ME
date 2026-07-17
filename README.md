# Remember.For.Me

**A two-screen care system that helps seniors live independently — and lets their family know they're okay.**

<p align="center">
  <img src="https://img.shields.io/badge/Status-MVP%20Demo-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Firebase-Realtime%20DB-orange?style=for-the-badge&logo=firebase" />
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Flutter-Dart-02569B?style=for-the-badge&logo=flutter" />
</p>

Seniors with mild memory loss miss medication and daily routines, and sometimes wander outside safe areas. Families have no way to know until it's too late. Remember.For.Me pairs a **simple kiosk screen for the senior** with a **caregiver dashboard for the family**, synced in real time.

---

## Table of contents

- [What it does](#what-it-does)
- [How it works](#how-it-works)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Demo scenario (5 minutes)](#demo-scenario-5-minutes)
- [Feature guide](#feature-guide)
- [Data model](#data-model)
- [Project structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Known limitations](#known-limitations)

---

## What it does

| For the senior (Kiosk) | For the family (Caregiver dashboard) |
| --- | --- |
| Large, calm screen with clock and today's routines | Create and schedule reminders |
| Full-screen reminder with a **spoken prompt** | Trigger a reminder instantly |
| Hears **a real family member's recorded voice** — not a robot | **Record or upload** that voice per reminder |
| One big **"Got it"** button to confirm | See the confirmation land in real time |
| Emergency SOS takeover screen | Send an SOS |
| — | **Live safety map** + alert when the senior leaves the safe zone |
| — | Heart-rate status and **desktop notifications** |
| — | **Alerts timeline** of everything that happened |

---

## How it works

```
┌──────────────────────┐         ┌──────────────────────┐
│  Caregiver Dashboard │         │     Patient Kiosk    │
│  React + Vite + TS   │         │       Flutter        │
│     (port 8080)      │         │  (Chrome 8090 / APK) │
└──────────┬───────────┘         └───────────┬──────────┘
           │                                 │
           │      Firebase Realtime DB       │
           └──────────►  families/  ◄────────┘
                        {familyId}
                     (demo: family_001)
```

**There is no backend server.** Both apps read and write the same Firebase Realtime Database node and stay in sync through live subscriptions — anything one app writes, the other sees within milliseconds.

**Tech**

- **Caregiver** — React 18, Vite, TypeScript, Tailwind CSS, Leaflet + OpenStreetMap (no map API key needed)
- **Kiosk** — Flutter (Dart), `flutter_tts` for speech, `audioplayers` for family voice clips, `flutter_blue_plus` for BLE proximity
- **Sync** — Firebase Realtime Database

---

## Prerequisites

| Tool | Version used | Needed for |
| --- | --- | --- |
| **Node.js** | 18+ (tested on v24) | Caregiver dashboard |
| **Flutter** | 3.24+ (tested on 3.44.3) | Patient kiosk |
| **Chrome** | any recent | Running the kiosk on web |
| **Internet** | required | Firebase sync + map tiles |

Firebase credentials for the demo project are already included in the repo — **no configuration step is required**.

---

## Quick start

Run each app in its own terminal.

### 1. Caregiver dashboard

```bash
cd caregiver
npm install        # first time only
npm run dev        # → http://localhost:8080
```

In the browser: click **Continue as Guest**, then **Allow** when asked for notification permission (needed for wander and heart-rate alerts).

### 2. Patient kiosk

**Option A — Chrome (easiest, recommended for demo)**

```bash
cd kiosk_app
flutter pub get    # first time only
flutter run -d chrome --web-port 8090
```

> `flutter run -d chrome` opens its own Chrome window. Don't also open port 8090 manually — you'd end up with two kiosk instances.

**Option B — Android device (only needed for real Bluetooth)**

Install the prebuilt `kiosk-app-release.apk`, or build it:

```bash
cd kiosk_app
flutter build apk --release
```

### 3. Pair the two apps

On the kiosk, either:

- tap **"Bỏ qua · Demo với family_001"** to jump straight into the demo family, or
- use the PIN flow to pair normally.

Both apps must be on the **same family** (`family_001` for the demo). Verify it: add a reminder on the dashboard — it should appear on the kiosk immediately.

---

## Demo scenario (5 minutes)

> **Before you start:** both apps running · kiosk paired to `family_001` · notifications allowed · speaker volume up · Focus Assist / Do Not Disturb **off**.
>
> Click once on the kiosk window first — Chrome blocks audio until the page has been interacted with.

### Act 1 — "Mom forgets her medication" (the core loop)

| # | You do | Audience sees |
| --- | --- | --- |
| 1 | Dashboard → **Manage** → **Add New** → name it *Take blood pressure pill*, set a time → **Save** | The reminder appears **instantly on the kiosk** — no refresh |
| 2 | Switch the routine to **Edit** → *Giọng gia đình* → 🎤 **Record** → say *"Mum, time for your blood pressure pill"* → **Stop** → ▶️ **Play** to check | "That's her son's actual voice." |
| 3 | Press **Trigger** | The kiosk takes over the full screen and **plays the son's real voice** — not a robot |
| 4 | On the kiosk press **"Got it"** | Dashboard flips to **Completed**, and a green ✅ entry lands on the **Alerts Timeline** |

> **The point to land:** a reminder from someone you love gets followed. A reminder from a machine gets ignored.

### Act 2 — "Mom walked out the front door" (safety)

| # | You do | Audience sees |
| --- | --- | --- |
| 5 | Dashboard → **Home** → point at the green **Safety Map** | "She's inside the safe zone around home." |
| 6 | **Demo Simulation Panel** → **🚶 Wander Alert** | Map turns **red — Outside safe zone**, alarm sounds, and a **desktop notification** fires |
| 7 | Explain the model | "In production she wears a small Bluetooth tag; the kiosk at home scans for it. Here we simulate the moment she leaves." |
| 8 | Press **🏠 In Home (Safe)** | Map returns to **green** |

### Act 3 — "Something's wrong" (health + emergency)

| # | You do | Audience sees |
| --- | --- | --- |
| 9 | **🔴 120 (High)** | Notification: *abnormal heart rate — 120 bpm* |
| 10 | Press **SOS** → confirm | Kiosk becomes a **full-screen red emergency takeover** with a spoken alert |
| 11 | Point at the **Alerts Timeline** | Every event is there — colour-coded, with icons and source labels |

### Reset for the next run

Dashboard → **Manage** → **🔄 Reset Demo** (top-right).

One click: all reminders → **Pending**, timeline cleared, and any live kiosk overlay closes itself. **Recorded voices are kept** — you don't have to re-record.

---

## Feature guide

### Family voice reminders

Instead of a robotic text-to-speech voice, the kiosk can play **a real recording of a family member**.

- **Where:** Dashboard → **Manage** → routine → **Edit** → *Giọng gia đình*
- **Record** with your microphone, or **Upload** an existing audio file
- **Play** to preview, **Delete** to remove
- Stored as base64 at `tasks/{id}/voiceClip` — **no Firebase Storage or billing required**
- Keep clips short (under ~15s / 900 KB)
- **Fallback:** any reminder without a clip is spoken by standard TTS, exactly as before

### Live safety map

Real Leaflet + OpenStreetMap. Shows the home safe zone and whether the senior is inside it. Free — no API key.

The location model is **BLE proximity**, not GPS: the kiosk at home scans for the senior's Bluetooth tag. Tag nearby → *at home*. Tag gone → *outside safe zone* → caregiver alerted.

### Desktop notifications

The dashboard raises OS notifications for **wander** and **abnormal heart rate**, so the family is alerted even when the tab isn't focused. Requires clicking **Allow** once.

### Alerts timeline

A live, colour-coded history driven by real events:

| Type | Icon | Meaning |
| --- | --- | --- |
| Emergency | 🛡️ red | SOS raised |
| Location | 📍 amber | Left / returned to the safe zone |
| Completed | ✅ green | Senior confirmed a reminder |
| Activity | 🔔 lavender | Everything else |

### Demo simulation panel

Buttons that simulate wander and heart-rate events without any hardware — this is how location is demonstrated when no Bluetooth tag is present.

---

## Data model

Everything lives under `families/{familyId}` (demo: `family_001`).

| Path | Written by | Purpose |
| --- | --- | --- |
| `tasks/{taskId}` | Caregiver | Reminder: `name`, `scheduled_time`, `status`, `is_triggered`, `voiceClip` |
| `events/{eventId}` | Both | Alerts timeline entries |
| `elder` | Kiosk | `status` (in_home / out_of_home), `vitals` |
| `tracker_alert` | Caregiver / kiosk | Wander alert state |
| `home` | Caregiver | Safe-zone centre + radius |
| `emergency` | Caregiver | SOS trigger |
| `kiosk` | Kiosk | Heartbeat / online state |
| `ble` | Caregiver | `tagId`, `enabled` for BLE proximity |

**Reminder lifecycle:** `Pending` → *(Trigger)* → `Running` → *(senior taps "Got it")* → `Completed`.

---

## Project structure

```
caregiver/                    Caregiver dashboard (React + Vite)
  src/
    App.tsx                   State, Firebase subscriptions, handlers
    firebase.ts               Firebase init + helpers
    types.ts                  Shared types
    components/
      LiveSafetyMap.tsx       Leaflet map + geofence
      common.tsx              Header, bottom nav, toast, modal
    screens/
      HomeScreen.tsx          Home + Manage screens, routine cards,
                              voice recorder, alerts timeline
kiosk_app/                    Patient kiosk (Flutter)
  lib/
    main.dart                 Routing (paired → /home, else → /pairing)
    models/task.dart          KioskTask (incl. voiceClip)
    services/kiosk_sync.dart  Firebase sync, alerts, BLE scanning
    screens/
      kiosk_home.dart         Kiosk UI, TTS + voice-clip playback
      pairing_screen.dart     PIN pairing + demo skip
      alert_overlay.dart      Full-screen reminder / SOS
      debug_panel.dart        Reset pairing, diagnostics
docs/                         Guides and schema
DEMO_CHECKLIST.md             Tick-through checklist for demo day
kiosk-app-release.apk         Prebuilt Android kiosk
```

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| **No sound on the kiosk** | Chrome blocks audio until you interact — click once on the kiosk page, then trigger again |
| **No desktop notifications** | Click **Allow** on the permission prompt; turn off Focus Assist / Do Not Disturb |
| **Two kiosk windows** | `flutter run -d chrome` already opens one — don't open port 8090 manually |
| **Kiosk goes straight to Home, you wanted Pairing** | It's already paired (by design). Hold the **"Remember.For.Me"** title for 2s → **Reset Kiosk Pairing (Logout)** |
| **Reminder doesn't reach the kiosk** | Check both apps are on `family_001`; check internet |
| **Map tiles blank** | OpenStreetMap tiles need internet |
| **Kiosk on Chrome never reports "left home"** | Expected — browsers can't scan Bluetooth. Use the **Wander Alert** simulation button |
| **`npm run build` fails** | Known: 3 pre-existing type errors. Use `npm run dev`, or `npx vite build` to produce a bundle |
| **Port 8090 already in use** | Kill the stale process, then re-run `flutter run` |

---

## Known limitations

- **Bluetooth scanning only works in the Android app.** Chrome and the web build cannot scan BLE, so location is demonstrated with the simulation panel. Real BLE needs an Android kiosk **plus** a second device or an iBeacon tag acting as the senior's tag.
- **Vitals are simulated** by the kiosk on a timer; no real health sensor is connected.
- **Speech language depends on the device** — the kiosk uses whatever TTS voices the OS/browser has installed. Family voice recordings sidestep this entirely.
- **`npm run build`** fails on 3 pre-existing type errors in `App.tsx`; the dev server and `vite build` are unaffected.

---

Built for the Bách Khoa Innovation Challenge.
