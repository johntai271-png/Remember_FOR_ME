# Remember.For.Me — Hệ sinh thái chăm sóc người cao tuổi tại nhà

<p align="center">
  <img src="https://img.shields.io/badge/Status-MVP%20Demo-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Firebase-Realtime%20DB-orange?style=for-the-badge&logo=firebase" />
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Flutter-Android-02569B?style=for-the-badge&logo=flutter" />
</p>

> **Remember.For.Me** giúp người cao tuổi (đặc biệt là người suy giảm nhận thức — Alzheimer, sa sút trí tuệ) sống an toàn tại nhà, đồng thời cho người thân theo dõi và hỗ trợ từ xa theo **thời gian thực**.

---

## 📌 Mục lục

1. [Tổng quan](#-tổng-quan)
2. [Kiến trúc](#-kiến-trúc)
3. [Tính năng](#-tính-năng)
4. [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
5. [Cài đặt & chạy](#-cài-đặt--chạy)
6. [Hướng dẫn Demo](#-hướng-dẫn-demo)
7. [Định vị bằng thẻ BLE (real hardware)](#-định-vị-bằng-thẻ-ble-real-hardware)
8. [Firebase Schema](#-firebase-schema)
9. [Tech Stack](#-tech-stack)

---

## 🧭 Tổng quan

Hệ thống gồm **hai ứng dụng** dùng chung **một Firebase Realtime Database** làm cầu nối — **không có server backend riêng**. Mọi giao tiếp diễn ra bằng cách đọc/ghi các node dưới `families/{familyId}`.

| Thành phần | Nền tảng | Vai trò |
|---|---|---|
| **Caregiver Portal** | React + Vite + TypeScript (Web) | Bảng điều khiển của người chăm sóc: theo dõi, quản lý lịch nhắc, nhận báo động |
| **Patient Kiosk** | Flutter (Android APK chính; Web/Windows cho dev) | Màn hình của người già: đồng hồ lớn, đọc nhắc bằng giọng nói (TTS), hiển thị cảnh báo toàn màn hình |

Thiết kế để **người cao tuổi dùng được mà không cần biết công nghệ**, còn người chăm sóc thì điều khiển thời gian thực từ bất kỳ thiết bị nào.

---

## 🏗 Kiến trúc

```
┌──────────────────────────┐        ┌──────────────────────────┐
│   Caregiver Portal       │        │      Patient Kiosk        │
│   (React + Vite)         │◄──────►│   (Flutter / Android)     │
│  • Theo dõi vitals/vị trí│  RTDB  │  • Đồng hồ + lịch nhắc     │
│  • Quản lý lịch nhắc      │◄──────►│  • Đọc nhắc bằng TTS       │
│  • Báo động (chuông +     │        │  • Overlay toàn màn hình  │
│    thông báo hệ thống)   │        │  • Quét thẻ BLE (Android) │
└──────────────────────────┘        └──────────────────────────┘
             │                                   │
             └─────────────┬─────────────────────┘
                 ┌──────────▼──────────┐
                 │  Firebase RTDB      │
                 │  families/{id}/     │
                 │  elder · tasks ·    │
                 │  emergency · kiosk ·│
                 │  tracker_alert ·    │
                 │  ble · events · home│
                 └─────────────────────┘
```

**Luồng nhắc nhở (có xác nhận thật):**
1. Caregiver bấm **Trigger** → transaction đặt `tasks/{id}/is_triggered = true`.
2. Kiosk lắng nghe `tasks` → hiện overlay toàn màn hình + đọc `text` bằng TTS.
3. Người già bấm **"Đã hiểu"** (hoặc TTS đọc xong) → Kiosk ghi `status: "Completed"` → Caregiver thấy **Completed** ngay (ack thật, không delay giả).

**Nhắc tự động:** Kiosk kiểm tra mỗi 30s; task có `is_auto == true` tới giờ (`scheduled_time`) sẽ tự bật `is_triggered`, mỗi task 1 lần/ngày.

---

## ✨ Tính năng

| Tính năng | Chi tiết |
|---|---|
| 🔄 **Đồng bộ thời gian thực** | Dưới 1 giây qua Firebase RTDB |
| 🔊 **TTS đọc nhắc** | Kiosk đọc to lời nhắc; overlay chữ lớn (≥36px) cho dễ nhìn |
| 📍 **Định vị "ra khỏi nhà"** | Kiosk (Android) quét **thẻ BLE** người già đeo; mất tín hiệu → `out_of_home` |
| 🗺️ **Bản đồ an toàn** | Leaflet + OpenStreetMap: hiện vùng an toàn quanh nhà, đổi đỏ khi ra ngoài |
| 📲 **Báo vào app người con** | Ra khỏi nhà **hoặc** nhịp tim cao/thấp → Caregiver **kêu chuông + banner đỏ + thông báo hệ thống** bật lên |
| 🚨 **Emergency SOS** | Caregiver bấm SOS → Kiosk khoá màn hình đỏ + đọc thông báo khẩn cấp |
| ❤️ **Vitals** | Nhịp tim mô phỏng; mô phỏng cao (120) / thấp (45) để demo |
| 🧹 **Reset Timeline** | Nút xoá toàn bộ dòng cảnh báo (Alerts Timeline) để demo lại sạch |
| 🔗 **Ghép nối Kiosk** | Mã PIN 6 số, hoặc nút **"Bỏ qua · Demo với family_001"** để demo nhanh |
| 🎮 **Demo Simulation Panel** | Mô phỏng Wander / vitals cao–thấp ngay khi pitch, không cần phần cứng |

---

## 📂 Cấu trúc thư mục

```
REMEMBER.FOR.ME/
├── caregiver/                     # Dashboard người chăm sóc (React + Vite)
│   └── src/
│       ├── App.tsx                # State + Firebase bindings + toàn bộ handlers
│       ├── firebase.ts            # Cấu hình & helper Firebase
│       ├── screens/HomeScreen.tsx # Tab Home + Manage + Simulation Panel
│       ├── components/
│       │   └── LiveSafetyMap.tsx  # Bản đồ an toàn (Leaflet + OSM)
│       └── utils.ts               # Haversine, format, geo helpers
│
├── kiosk_app/                     # App màn hình người già (Flutter)
│   └── lib/
│       ├── services/kiosk_sync.dart   # Listener Firebase, heartbeat, quét BLE, ack
│       ├── screens/
│       │   ├── kiosk_home.dart        # Dashboard cụ + TTS
│       │   ├── alert_overlay.dart     # Overlay nhắc/khẩn cấp toàn màn hình
│       │   ├── pairing_screen.dart    # Ghép nối PIN + nút Demo
│       │   └── debug_panel.dart       # Panel test ẩn (giữ tiêu đề 2s)
│       └── tabs/                       # Home / Reminders / Health
│
├── docs/
│   ├── Huong-Dan-Demo.docx            # Hướng dẫn demo chi tiết (tiếng Việt)
│   ├── Remember-For-Me-Tom-Tat-Du-An.docx
│   └── firebase_schema.json
│
├── kiosk-app-release.apk          # APK Android build sẵn để demo
├── DEMO_CHECKLIST.md              # Checklist chạy demo (xem trước khi trình bày)
└── README.md
```

> Ngoài ra ở gốc repo có `app.js`, `index.html`, `style.css` — bản **mô phỏng offline** (vanilla JS) chạy thẳng trong trình duyệt, không cần Firebase; dùng để xem nhanh giao diện.

---

## 🚀 Cài đặt & chạy

### Yêu cầu
- Node.js ≥ 18, npm ≥ 9 (cho Caregiver)
- Flutter SDK ≥ 3.22 (cho Kiosk); Android SDK nếu build APK

### 1. Caregiver Portal (web)
```bash
cd caregiver
npm install
npm run dev          # chạy ở http://localhost:8080
```
Vào web → **"Continue as Guest"** để xem demo ngay (`family_001`).

> ⚠️ `npm run build` hiện còn vài lỗi type cũ **không liên quan tính năng** — dùng `npm run dev` để demo, hoặc `npx vite build` để kiểm tra bundle.

### 2. Patient Kiosk
**Android (khuyến nghị cho demo):**
```bash
adb install kiosk-app-release.apk       # hoặc chép file APK vào máy rồi cài
```
Mở app → cho phép Bluetooth + Vị trí → bấm **"Bỏ qua · Demo với family_001"**.

**Chrome (dev UI, KHÔNG quét BLE):**
```bash
cd kiosk_app
flutter pub get
flutter run -d chrome --web-port 8090
```

---

## 🎬 Hướng dẫn Demo

Chi tiết đầy đủ trong **[docs/Huong-Dan-Demo.docx](docs/Huong-Dan-Demo.docx)** và **[DEMO_CHECKLIST.md](DEMO_CHECKLIST.md)**.

**Kịch bản A — Nhắc lịch:** Manage → thêm/bấm **Trigger** → Kiosk hiện overlay + đọc to → cụ bấm "Đã hiểu" → web thành **Completed**.

**Kịch bản B — Ra khỏi nhà (không cần phần cứng):** Home → **Demo Simulation Panel** → **🚶 Wander Alert** → bản đồ đỏ + **chuông + thông báo "🚨 ra khỏi nhà"** trên Caregiver.

**Kịch bản C — Nhịp tim bất thường:** bấm **120 (High)** / **45 (Low)** → thông báo "❤️ Nhịp tim bất thường".

**Kịch bản D — SOS:** bấm nút SOS → Kiosk hiện đỏ toàn màn hình + đọc thông báo.

**Reset để demo lại:** tab Manage → nút **Reset** trên "Alerts Timeline"; Kiosk → giữ tiêu đề 2s → panel debug.

---

## 📡 Định vị bằng thẻ BLE (real hardware)

Định vị "ra khỏi nhà" **không dùng GPS**, mà dùng **proximity BLE**:

- **Kiosk chạy trên máy Android** = máy quét cố định ở nhà.
- Người già đeo **1 thẻ iBeacon** nhỏ (pin CR2032). Thẻ ở gần = *in_home*; đi xa ~10–15m mất sóng = *out_of_home* → báo Caregiver.
- Kiosk khớp thẻ theo **MAC / tên / Service UUID / UUID iBeacon** (đọc cả beacon do iPhone phát).

**Cấu hình:** cài **nRF Connect** để đọc UUID/MAC thẻ → đặt `ble/tagId` = định danh đó, `ble/enabled = true`.

> ⚠️ Quét BLE **chỉ chạy trên app native** (Android). Bản Chrome/web **không quét được** — khi đó dùng nút giả lập "Wander Alert" hoặc panel debug của Kiosk.
> Mua thẻ: iBeacon keyfob (Holy-IOT / MinewTech / Feasycom). **KHÔNG** dùng AirTag / Tile / SmartTag (hệ đóng, app tự viết không đọc được).

---

## 🗄 Firebase Schema

Dữ liệu dưới `families/{familyId}/` (demo dùng `family_001`):

```jsonc
families/family_001/
  elder/       { name, status: "in_home"|"out_of_home", lastSeenAt,
                 vitals: { status, heartRateBpm, updatedAt } }
  tasks/{id}/  { name, scheduled_time, is_auto, status, text,
                 is_triggered, triggeredAt, spokenAt, completedAt, triggerMode }
  emergency/   { is_triggered, message, triggeredAt }
  tracker_alert/ { is_active, type, message, severity, safeZoneStatus, source }
  kiosk/       { online, lastHeartbeatAt }
  ble/         { enabled, tagId }
  home/        { lat, lng, radiusMeters, label }   // tâm + bán kính vùng an toàn
  events/{id}/ { type, title, message, timestamp, by }
pairing_codes/{PIN}/ { familyId, createdAt }
```

---

## 🛠 Tech Stack

| Lớp | Công nghệ |
|---|---|
| Caregiver | React 18 + Vite + TypeScript + Tailwind |
| Bản đồ | Leaflet + OpenStreetMap (miễn phí, không API key) |
| Kiosk | Flutter (Dart), flutter_tts, flutter_blue_plus |
| Backend | Firebase Realtime Database + Firebase Auth |
| Báo động | Web Audio API + Notification API (trình duyệt) |

---

## 👥 Team

Xây dựng cho **Bách Khoa Innovation Challenge 2025** — công nghệ dễ tiếp cận, ý nghĩa cho người cao tuổi.
