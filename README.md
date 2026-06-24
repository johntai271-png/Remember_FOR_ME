# Remember.For.Me

**Remember.For.Me** là một dự án MVP demo dùng để hỗ trợ người cao tuổi (người bệnh/ngoại) tại nhà thông qua thiết bị Kiosk, kết hợp với trang quản lý từ xa dành cho người chăm sóc.

Hệ thống bao gồm 2 phần chính:
*   `caregiver/`: Ứng dụng web dành cho người chăm sóc, được xây dựng bằng **React + Vite + Tailwind CSS** và kết nối thời gian thực qua **Firebase Realtime Database**.
*   `kiosk_app/`: Ứng dụng Kiosk chạy tại nhà người bệnh, được xây dựng bằng **Flutter**, hỗ trợ đa nền tảng (**Android APK**, **Web Chrome**, **Windows Desktop**) tích hợp giọng nói tiếng Việt (TTS).

---

## Sơ Đồ Quy Trình Hoạt Động (Demo Flow)

```text
Người chăm sóc bấm nút trên Web Dashboard (React)
  ↳ Ghi nhận trạng thái công việc và cập nhật Firebase Realtime Database
      ↳ Thiết bị Kiosk (Flutter) lắng nghe thay đổi lập tức
          ↳ Hiển thị cảnh báo toàn màn hình + Phát giọng nói tiếng Việt (TTS)
              ↳ Tự động phản hồi kết quả và thiết lập lại trạng thái ban đầu
```

---

## Cấu Trúc Dự Án (Repository Structure)

Dưới đây là sơ đồ chi tiết cấu trúc thư mục hiện tại của dự án:

```text
REMEMBER.FOR.ME/
├── caregiver/                 # Mã nguồn trang quản lý của người chăm sóc (React)
│   ├── package.json           # Thư viện và kịch bản khởi chạy web
│   ├── vite.config.ts         # Cấu hình máy chủ phát triển Vite (cổng 8080)
│   ├── tailwind.config.js     # Cấu hình CSS Tailwind thiết kế giao diện
│   └── src/
│       ├── App.tsx            # Giao diện chính và logic đồng bộ Firebase của Dashboard
│       ├── firebase.ts        # Hàm khởi tạo Firebase & đọc/ghi DB
│       ├── index.css          # Token CSS & Styling
│       └── main.tsx           # Điểm khởi chạy React
│
├── kiosk_app/                 # Mã nguồn ứng dụng nhắc nhở Kiosk (Flutter)
│   ├── pubspec.yaml           # Thư viện Dart (TTS, Bluetooth, Firebase, Wakelock)
│   ├── android/               # Dự án Android gốc (chứa google-services.json)
│   ├── web/                   # Cấu hình chạy ứng dụng Kiosk trên Web Chrome
│   ├── windows/               # Cấu hình chạy ứng dụng Kiosk trên Windows Desktop
│   └── lib/
│       ├── firebase_options.dart # Cấu hình Firebase cho đa nền tảng
│       └── main.dart          # Logic thông báo Kiosk, BLE và giọng nói tiếng Việt
│
├── docs/                      # Thư mục chứa tài liệu và cấu trúc DB mẫu
│   └── firebase_schema.json   # Cấu trúc JSON mẫu của Firebase Realtime Database
│
├── PROJECT_SUMMARY.md         # Bản tóm tắt các hạng mục đã làm & chi tiết từng file
├── DEVELOPER_ONBOARDING.md    # Hướng dẫn chi tiết cho lập trình viên mới thiết lập dự án
└── kiosk-app-release.apk      # File cài đặt ứng dụng Kiosk hoàn chỉnh chạy trên Android
```

---

## Hướng Dẫn Chạy Nhanh (Quick Start)

### 1. Khởi chạy Caregiver Web App
```bash
cd caregiver
npm install
npm run dev
```
👉 Truy cập trang quản lý tại địa chỉ: **[http://localhost:8080](http://localhost:8080)**.

### 2. Khởi chạy Kiosk App (Flutter)
Bạn có thể chạy thử nghiệm trực tiếp trên trình duyệt Web hoặc Windows cho nhẹ máy bằng lệnh:
```bash
cd kiosk_app
flutter pub get
# Chạy trên trình duyệt Chrome (Khuyên dùng khi lập trình)
flutter run -d chrome
# Hoặc chạy dưới dạng phần mềm Windows
flutter run -d windows
```
*(Nếu muốn cài trực tiếp trên máy tính bảng/điện thoại Android thật, hãy sử dụng file **`kiosk-app-release.apk`** ở thư mục gốc).*

---

## Cơ Sở Dữ Liệu Firebase Paths

Hệ thống sử dụng một gia đình demo mặc định là `families/family_001`. Các nhánh dữ liệu chính bao gồm:
*   `elder`: Tên, trạng thái vị trí (trong nhà/ngoài nhà), thời điểm nhìn thấy cuối cùng.
*   `reminders`: Danh sách lịch nhắc nhở buổi sáng (`morning`), trưa (`noon`), tối (`evening`).
*   `emergency`: Trạng thái kích hoạt cuộc gọi khẩn cấp (`is_triggered`) và nội dung giọng nói thông báo.
*   `kiosk`: Trạng thái kết nối trực tuyến của thiết bị Kiosk (`online`, `lastHeartbeatAt`).
*   `ble`: Cấu hình quét cảm biến Bluetooth BLE.

Để biết thêm thông tin chi tiết về mã nguồn và cách phát triển dự án, vui lòng đọc các tài liệu sau:
*   **[PROJECT_SUMMARY.md](file:///c:/Users/LENOVO/Downloads/REMEMBERFORME/REMEMBER.FOR.ME/REMEMBER.FOR.ME/PROJECT_SUMMARY.md)**: Chi tiết kiến trúc & mã nguồn.
*   **[DEVELOPER_ONBOARDING.md](file:///c:/Users/LENOVO/Downloads/REMEMBERFORME/REMEMBER.FOR.ME/REMEMBER.FOR.ME/DEVELOPER_ONBOARDING.md)**: Hướng dẫn cài đặt cho thành viên mới.

