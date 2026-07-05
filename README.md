# Remember.For.Me — Ambient Elderly Care Ecosystem

<p align="center">
  <img src="https://img.shields.io/badge/Status-MVP%20Demo-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Firebase-Realtime%20DB-orange?style=for-the-badge&logo=firebase" />
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Flutter-Web%20%2F%20Android-02569B?style=for-the-badge&logo=flutter" />
</p>

> **Remember.For.Me** is a cross-platform ambient care system designed to help elderly individuals with cognitive decline (Alzheimer's, dementia) stay safe at home — while giving family caregivers real-time visibility and peace of mind.

---

## 📌 Table of Contents

1. [Project Overview](#-project-overview)
2. [System Architecture](#-system-architecture)
3. [App Breakdown](#-app-breakdown)
   - [Caregiver Portal (React Web)](#1-caregiver-portal--react-web)
   - [Kiosk Screen (Flutter)](#2-patient-kiosk-screen--flutter)
4. [Key Features](#-key-features)
5. [Firebase Database Schema](#-firebase-database-schema)
6. [Quick Start](#-quick-start)
7. [Demo Guide](#-demo-guide)
8. [Repository Structure](#-repository-structure)
9. [Tech Stack](#-tech-stack)

---

## 🧭 Project Overview

**Remember.For.Me** bridges the gap between remote caregiving and in-home ambient assistance. It targets families caring for elderly members with memory impairment who need gentle, non-intrusive daily support.

The ecosystem consists of **two synchronized applications** sharing a **Firebase Realtime Database** as a live communication backbone:

| Component | Platform | Role |
|---|---|---|
| **Caregiver Portal** | React Web App | Remote monitoring, routine management, alert control |
| **Patient Kiosk** | Flutter (Android / Web) | Home ambient screen, TTS announcements, health display |

The system is designed for **zero-friction use by the elderly** — requiring no technical knowledge on their part — while giving caregivers powerful real-time controls from any device.

---

## 🏗 System Architecture

```
┌─────────────────────────┐         ┌────────────────────────────────┐
│   Caregiver Portal      │         │       Patient Kiosk            │
│   (React + Vite)        │         │    (Flutter Web / Android)     │
│                         │         │                                │
│  • Dashboard overview   │◄───────►│  • Ambient home screen         │
│  • Routine management   │         │  • TTS voice announcements     │
│  • Vitals simulation    │  RTDB   │  • Health metrics display      │
│  • BLE tag tracking     │◄──────► │  • Real-time routine timeline  │
│  • Emergency SOS        │         │  • Alert overlay (fullscreen)  │
│  • Geofence alerts      │         │  • Pairing via 6-digit PIN     │
│  • Onboarding wizard    │         │                                │
└─────────────────────────┘         └────────────────────────────────┘
            │                                       │
            └───────────────┬───────────────────────┘
                            │
               ┌────────────▼────────────┐
               │  Firebase Realtime DB   │
               │  families/{familyId}/   │
               │  • elder/vitals         │
               │  • tasks/               │
               │  • emergency/           │
               │  • tracker_alert/       │
               │  • kiosk/               │
               │  • ble_tags/            │
               │  • events/              │
               └─────────────────────────┘
```

### Data Flow (Live Demo)
1. Caregiver configures a **daily routine** on the web portal and clicks **Trigger**.
2. Firebase RTDB propagates the update instantly.
3. Kiosk receives the update and displays a **fullscreen announcement overlay**.
4. **Text-to-Speech reads the reminder aloud** (up to 3 times) in the appropriate language (English / Vietnamese, auto-detected).
5. The elderly user taps **"Okay, I remember"** — or the overlay auto-dismisses after all TTS cycles.
6. Task status is marked as `Completed` in Firebase and reflected live on the caregiver portal.

---

## 📱 App Breakdown

### 1. Caregiver Portal — React Web

**Location:** `caregiver/`  
**URL (local dev):** `http://localhost:8080`

The Caregiver Portal is a premium-grade responsive web dashboard built for family members and professional caregivers to remotely manage care for their elderly relative.

#### 🔑 Core Sections

| Tab | Description |
|---|---|
| **Home** | Real-time overview: elder vitals, location status, upcoming routines, BLE tag statuses, alert feed |
| **Manage** | Full CRUD management for daily routines, BLE asset tags; view and clear completed tasks |
| **Settings** | Account management, Kiosk pairing, profile editing, geofence config, demo controls |

#### ✨ Notable Capabilities
- **Onboarding Setup Wizard** — 3-step guided wizard for new accounts: Kiosk pairing → Family names → First routine
- **Unique Family Isolation** — Each new account auto-generates a unique `familyId` so data never overlaps
- **Demo Simulation Panel** — Home tab panel lets you simulate geofence breach (`Wander Alert`) or abnormal vitals (120 bpm High / 45 bpm Low) live during a pitch
- **Emergency Buzzer** — Web Audio API synthesizes a dual-tone siren (`880Hz`/`660Hz`) in the caregiver's browser whenever a geofence or vitals alert fires
- **Clear Completed Routines** — Bulk-delete all completed routines from Firebase to keep the UI clean
- **Re-run Setup Wizard** — Settings → Demo controls → allows re-demonstrating the onboarding flow without creating a new account

---

### 2. Patient Kiosk Screen — Flutter

**Location:** `kiosk_app/`  
**URL (local web):** `http://localhost:8081`  
**APK (Android):** `kiosk-app-release.apk` (root of repository)

The Patient Kiosk is a Flutter application designed to run full-screen on a home TV, tablet, or dedicated Android device. It serves as the elder's ambient companion — always on, always visible, never intrusive.

#### 🖥️ Screen Tabs

| Tab | Description |
|---|---|
| **Home** | Digital clock + date, greeting message, reassurance text, today's upcoming routine card |
| **Reminders** | Full timeline of scheduled routines grouped by time period (Morning / Afternoon / Evening / Night) |
| **Health** | Live heart rate (bpm), location safety status (In Home / Outside Safe Zone), kiosk connection health |

#### 🔔 Alert Overlay
When a routine is triggered or an emergency SOS is sent, the Kiosk displays a **full-screen animated overlay** with:
- Pulsing sound-wave animation rings
- Large-print reminder message (≥36px font for accessibility)
- Text-to-Speech announcement repeated up to 3 times
- Auto-dismiss after all TTS cycles complete (no action required from the elderly user)
- **"Okay, I remember"** button for early dismissal

#### 🔧 Pairing System
- Kiosk generates a random **6-digit PIN** on first launch and publishes it to Firebase `pairing_codes/`
- Caregiver enters the PIN in the Onboarding Wizard → Kiosk receives `familyId` and saves it locally
- Subsequent launches skip the pairing screen automatically
- PIN is **clickable/copyable** directly in the browser

#### 🛠️ Debug & Simulation Panel
Long-press the **"Remember.For.Me"** header on the Kiosk home screen (≥1 second) to open the hidden simulation panel:
- **Simulate: At Home** — sets elder status to `in_home`
- **Simulate: Away (Wandering)** — sets elder status to `out_of_home`, triggers geofence alert
- **Reset Kiosk Pairing (Logout)** — clears local `family_id` and returns to the PIN pairing screen for demo resets

---

## ✅ Key Features

| Feature | Details |
|---|---|
| 🔄 **Real-Time Sync** | Sub-second data propagation between portal and kiosk via Firebase RTDB |
| 🔊 **Smart TTS** | Auto-detects language (Vietnamese/English) from reminder text and selects the matching TTS voice |
| 🚨 **Emergency SOS** | Caregiver triggers one-tap SOS → Kiosk locks screen with red emergency overlay + loud voice alert |
| 📍 **Geofence Simulation** | Simulate elder leaving the safe zone, triggering visual + audio alerts on caregiver portal |
| ❤️ **Vitals Override** | Simulate dangerous heart rates (120 bpm high / 45 bpm low) for live demo presentations |
| 🔔 **Audio Buzzer** | Web Audio API synthesizes emergency siren in caregiver browser — zero external dependencies |
| 📱 **BLE Asset Tags** | Track important items (wallet, keys, medicine bag) with virtual Bluetooth tags |
| 🏠 **Onboarding Wizard** | Guided 3-step setup for new families: link Kiosk → set names → create first routine |
| 🧹 **Auto-hide Completed** | Completed routines disappear from active list, collapsible into a "Completed" drawer |
| 🔐 **Auth Isolation** | Firebase Auth + unique familyId ensures each household's data is fully isolated |

---

## 🗄 Firebase Database Schema

All data is scoped under `families/{familyId}/` to ensure multi-household isolation.

```json
families/
  {familyId}/
    elder/
      name: "Grandma Lan"
      vitals/
        heartRate: 72
        status: "Normal"       // "Normal" | "High" | "Low"
        isOverride: false      // true = Kiosk pauses its own simulation
      location/
        status: "in_home"      // "in_home" | "out_of_home"
        safeZoneName: "Home"

    tasks/
      {taskId}/
        name: "Take morning medication"
        scheduled_time: "08:00"
        day_part: "Morning"
        status: "Pending"      // "Pending" | "Triggered" | "Completed"
        is_auto: true
        voice_text: "Time to take your morning pills!"

    emergency/
      is_triggered: false
      message: "Emergency! Your caregiver is calling."
      triggeredAt: 1720000000000

    tracker_alert/
      is_active: false
      message: "Elder has left the safe zone!"
      timestamp: 1720000000000

    kiosk/
      online: true
      lastHeartbeatAt: 1720000000000
      name: "Living Room Kiosk"

    ble_tags/
      {tagId}/
        name: "Leather Wallet Tag"
        location: "Bedroom drawer"
        status: "safe"         // "safe" | "away"
        connectionStatus: "connected"

    events/
      {eventId}/
        type: "trigger"        // "trigger" | "complete" | "emergency" | "tracker_alert"
        title: "Morning Medication triggered"
        message: "..."
        timestamp: 1720000000000

onboarding_completed: true
pairing_codes/
  {6-digit-PIN}/
    familyId: ""
    createdAt: 1720000000000
```

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version | Purpose |
|---|---|---|
| Node.js | ≥ 18.x | Caregiver Portal |
| npm | ≥ 9.x | Package manager |
| Flutter SDK | ≥ 3.22 | Kiosk App |
| Python | ≥ 3.x | Static web server (optional) |

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/remember-for-me.git
cd remember-for-me
```

---

### 2. Launch the Caregiver Portal

```bash
cd caregiver
npm install
npm run dev
```

> ✅ Open **[http://localhost:8080](http://localhost:8080)** in your browser.

To log in, either:
- Click **"Continue as Guest"** to instantly explore the demo dashboard (`family_001`)
- Click **"Sign Up"** to create a new family account and run through the Onboarding Wizard

---

### 3. Launch the Patient Kiosk

**Option A — Run via Flutter (Chrome, recommended for demo):**
```bash
cd kiosk_app
flutter pub get
flutter run -d chrome --web-port 8081
```

**Option B — Serve pre-built web assets:**
```bash
cd kiosk_app
flutter build web --no-tree-shake-icons
cd build/web
python -m http.server 8081
```

> ✅ Open **[http://localhost:8081](http://localhost:8081)** in a second browser tab.

**Option C — Android Tablet / TV (Physical Device):**
Install the precompiled APK at the root of the repository:
```bash
adb install kiosk-app-release.apk
```

---

### 4. Link Kiosk to Caregiver Account

1. Open the Kiosk in browser — a **6-digit PIN** is displayed. Click to copy it.
2. In the Caregiver Portal, sign up / log in → the **Onboarding Wizard** launches automatically.
3. Enter the PIN in Step 1 → click **Link Kiosk** → both apps are now paired!
4. Complete Steps 2 & 3 (enter names → create first routine).
5. Both apps are fully synced and ready.

---

## 🎬 Demo Guide

> Perfect for live pitching at competitions or investor demos.

### Scenario A — Routine Reminder
1. In the **Caregiver Portal → Manage tab**, click **Trigger** on any routine.
2. Watch the **Kiosk screen** instantly show a fullscreen overlay with animated sound waves.
3. Hear the **TTS voice** read the reminder aloud (English or Vietnamese, auto-detected).
4. The overlay auto-dismisses after 3 repetitions.

### Scenario B — Geofence Wander Alert
1. On the **Home tab**, find the **Demo Simulation Panel** at the bottom.
2. Click **🚶 Wander Alert** → the elder's map turns red, the Caregiver Portal shows danger status.
3. The caregiver's browser plays an **emergency buzzer sound** (beep beep beep beep).
4. Click **🏠 In Home** to reset.

### Scenario C — Abnormal Vitals
1. On the **Demo Simulation Panel**, click **🔴 120 bpm (High)** or **🔵 45 bpm (Low)**.
2. The vitals card on the portal updates instantly, the feed logs a warning event.
3. The Kiosk's Health tab also reflects the abnormal reading in real time.
4. Click **🟢 72 bpm (Normal)** to reset.

### Scenario D — Emergency SOS
1. Click the **red SOS button** anywhere on the Caregiver Portal.
2. Confirm the alert dialog.
3. The Kiosk immediately shows a **red fullscreen emergency overlay**.
4. The TTS voice announces: *"Emergency! Your caregiver is calling. Please look at the screen."*

### Reset for Next Demo Run
- **Caregiver**: Settings → Demo controls → **Re-run Setup Wizard**
- **Kiosk**: Long-press header → **Reset Kiosk Pairing (Logout)**
- Both apps are back to onboarding state, ready for a fresh run.

---

## 📂 Repository Structure

```
REMEMBER.FOR.ME/
├── caregiver/                    # Caregiver Web Dashboard (React + Vite)
│   ├── src/
│   │   ├── App.tsx               # Main state controller, Firebase bindings, all handlers
│   │   ├── firebase.ts           # Firebase Auth & Realtime Database helpers
│   │   ├── screens/
│   │   │   └── HomeScreen.tsx    # Home tab, Management tab, Simulation Panel
│   │   ├── components/           # Shared UI components (Header, Navigation, Modals)
│   │   └── types.ts              # TypeScript type definitions
│   ├── vite.config.ts            # Vite server configuration (Port 8080)
│   └── package.json
│
├── kiosk_app/                    # Patient Kiosk Application (Flutter)
│   ├── lib/
│   │   ├── main.dart             # App initialization, routing, pairing logic
│   │   ├── firebase_options.dart # Multi-platform Firebase credentials
│   │   ├── services/
│   │   │   └── kiosk_sync.dart   # RTDB listener, vitals simulation, BLE scan, alert stream
│   │   ├── screens/
│   │   │   ├── kiosk_home.dart   # Main shell: navigation, TTS loop, smart language detection
│   │   │   ├── alert_overlay.dart # Animated announcement overlay (routine + emergency)
│   │   │   ├── pairing_screen.dart # 6-digit PIN pairing screen (copyable, Firebase listener)
│   │   │   └── debug_panel.dart  # Hidden simulation panel (geofence, vitals, reset)
│   │   ├── tabs/
│   │   │   ├── home_tab.dart     # Clock, greeting, today's routine card
│   │   │   ├── reminders_tab.dart # Full schedule timeline grouped by day part
│   │   │   └── health_tab.dart   # Vitals & location status cards
│   │   ├── models/task.dart       # Task data model
│   │   ├── theme/app_colors.dart  # Warm cream color palette
│   │   └── widgets/              # Reusable UI widgets
│   ├── build/web/                # Pre-built web assets (served via python http.server)
│   └── pubspec.yaml
│
├── docs/
│   └── firebase_schema.json      # Database schema reference
│
├── kiosk-app-release.apk         # Pre-compiled Android APK for physical device deploy
├── DEVELOPER_ONBOARDING.md       # Detailed dev environment setup guide
├── PROJECT_SUMMARY.md            # In-depth architecture analysis
└── README.md                     # This file
```

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Caregiver Frontend** | React 18 + Vite + TypeScript | Web dashboard framework |
| **Caregiver Styling** | Vanilla CSS + Custom Design System | Premium UI with glassmorphism, animations |
| **Kiosk App** | Flutter 3.22 (Dart) | Cross-platform kiosk application |
| **Kiosk TTS** | flutter_tts 4.x | Text-to-speech voice announcements |
| **Database & Auth** | Firebase Realtime Database + Firebase Auth | Real-time sync, user authentication |
| **Audio Alerts** | Web Audio API (browser-native) | Emergency siren synthesis — zero dependencies |
| **Icons** | Lucide React | Caregiver portal icons |
| **Fonts** | Google Fonts (Inter) | Typography |
| **State Management** | React hooks (useState, useEffect, useRef) | Caregiver portal state |
| **Build Tools** | Vite (caregiver), Flutter build (kiosk) | Development & production builds |

---

## 👥 Team

Built for the **Bách Khoa Innovation Challenge 2025** by a team passionate about making technology accessible and meaningful for aging communities.

---

## 📄 License

This project is developed as an academic MVP prototype. All rights reserved to the development team.
