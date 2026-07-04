# Caregiver Handover Notes

## Overview

This note is for the next team or engineer picking up the `caregiver` app.

The caregiver app is a React + Vite + Firebase prototype for the Remember.For.Me care dashboard. It currently mixes real Firebase reads/writes with some demo assumptions and placeholder product logic.

Use this document as the high-level handover. For backend/hardware-specific follow-up, also read [caregiver_backend_handoff.md](/Users/trananhngoc/Desktop/Remember_FOR_ME/docs/caregiver_backend_handoff.md).

## Current Product Structure

The app was intentionally split into 2 main caregiver pages:

### Page 1: `Home`

Purpose: monitor-only, low-interaction summary screen.

Current contents:
- safety map and home-zone visual
- current location
- latest tracker alert summary
- recently completed tasks
- one upcoming task
- kiosk online/offline summary

This page is meant to stay visually clean and should not be overloaded with admin actions.

### Page 2: `Manage`

Purpose: caregiver actions and configuration.

Current contents:
- BLE tag add / edit / delete / connect / disconnect / status toggle
- routine/task editing
- routine triggering
- alerts timeline
- emergency action button

This is the right place for operational controls going forward.

### Page 3: `Settings`

Purpose: account, preferences, support placeholders.

Status:
- partially wired to Firebase user profile
- many tiles are still demo placeholders

## Main Files

Core app state and Firebase wiring:
- [App.tsx](/Users/trananhngoc/Desktop/Remember_FOR_ME/caregiver/src/App.tsx)

Home and Manage screen layout:
- [HomeScreen.tsx](/Users/trananhngoc/Desktop/Remember_FOR_ME/caregiver/src/screens/HomeScreen.tsx)

Shared UI shell and bottom navigation:
- [common.tsx](/Users/trananhngoc/Desktop/Remember_FOR_ME/caregiver/src/components/common.tsx)

Type definitions:
- [types.ts](/Users/trananhngoc/Desktop/Remember_FOR_ME/caregiver/src/types.ts)

Firebase helpers:
- [firebase.ts](/Users/trananhngoc/Desktop/Remember_FOR_ME/caregiver/src/firebase.ts)

Backend follow-up note:
- [caregiver_backend_handoff.md](/Users/trananhngoc/Desktop/Remember_FOR_ME/docs/caregiver_backend_handoff.md)

## Data Wiring That Exists Today

The caregiver app currently reads or writes these Firebase RTDB paths:

- `families/{familyId}/elder`
- `families/{familyId}/kiosk`
- `families/{familyId}/tracker_alert`
- `families/{familyId}/tasks/{taskId}`
- `families/{familyId}/ble_tags/{tagId}`
- `families/{familyId}/emergency`
- `users/{uid}`

The app also uses Firebase Auth for caregiver sign-in and sign-up.

## What Is Already Working

### Caregiver auth

- sign in
- sign up
- logout
- load caregiver profile and preferences

### Task management

- read tasks from Firebase
- add task
- edit task
- save task
- trigger task manually
- display routine period and voice flag

### BLE tag management

- read BLE tags from Firebase
- add tag
- edit tag
- delete tag
- mark tag connected / disconnected
- toggle safe / away state

### Tracker and home monitoring UI

- read elder status
- read kiosk presence
- read tracker alert state
- render monitor cards
- render safety map

### Emergency workflow

- caregiver can write emergency trigger into Firebase

## Important Product Decisions Already Made

### 1. Home page was intentionally simplified

Earlier versions had too many actions on one screen. The current structure deliberately keeps Page 1 focused on quick monitoring only.

If future work adds more controls, they should usually go to `Manage`, not back onto `Home`.

### 2. BLE tag “Connect” is not real BLE pairing yet

The UI and Firebase flow exist, but this is still product-level pairing state, not confirmed hardware pairing.

Real BLE behavior still needs:
- scanner app
- native bridge
- kiosk-side BLE permissions
- or local hardware gateway

Details are in [caregiver_backend_handoff.md](/Users/trananhngoc/Desktop/Remember_FOR_ME/docs/caregiver_backend_handoff.md).

### 3. Alert timeline is still frontend-composed

The timeline shown in `Manage` is not yet a canonical event log stored in Firebase.

That means:
- useful for prototype UX
- not enough for production audit/history

## Known Gaps / Pending Work

### Backend / hardware

- real BLE scanning and presence detection
- real tracker ingestion
- real geofence engine
- real kiosk heartbeat producer
- real emergency responder workflow
- optional canonical event stream for alerts timeline

### Product / UX

- Settings still contains several placeholder screens
- some copy still says “demo”
- no strong separation yet between caregiver roles/permissions
- no loading skeletons or explicit empty-state strategy beyond basic messaging

### Technical

- chunk size warning still appears in Vite production build
- there is a local permission issue with `npm run build` through `.bin/tsc`
- direct `node .../vite.js` and `node .../tsc` commands work fine

## Recommended Next Tasks

If another frontend engineer continues this app, the next reasonable tasks are:

1. Persist and display a real event stream under `families/{familyId}/events`
2. Add explicit loading and error states for Firebase subscriptions
3. Clean up placeholder settings pages
4. Add filtering or sections inside `Manage` if it grows too large
5. Tighten mobile spacing and interaction states after product structure is stable

If backend/hardware teams continue this app, the priority tasks are:

1. own `ble_tags` scanner contract
2. own `tasks` scheduler and completion flow
3. own tracker and geofence producer
4. own emergency response worker
5. own kiosk heartbeat producer

## Local Run Notes

Project directory:
- `/Users/trananhngoc/Desktop/Remember_FOR_ME/caregiver`

Use these commands:

```bash
cd /Users/trananhngoc/Desktop/Remember_FOR_ME/caregiver
node node_modules/vite/bin/vite.js --host
```

Type-check:

```bash
node caregiver/node_modules/typescript/bin/tsc -b caregiver
```

Production build:

```bash
cd /Users/trananhngoc/Desktop/Remember_FOR_ME/caregiver
node node_modules/vite/bin/vite.js build
```

Reason:
- `npm run build` may fail locally because `node_modules/.bin/tsc` has a permission issue in this workspace snapshot.

## Final Notes For The Next Person

- Treat `Home` as the calm, readable overview.
- Treat `Manage` as the caregiver operations page.
- Avoid pushing more admin controls back onto the overview page unless product explicitly wants that change.
- If you are implementing real BLE or tracker behavior, do not trust the current “connected” UI state as hardware truth until the scanner/gateway flow is in place.
