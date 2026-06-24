# Tóm Tắt Dự Án & Giải Thích Cấu Trúc File (PROJECT_SUMMARY)

Tài liệu này tổng hợp lại toàn bộ các công việc đã thực hiện, những gì hệ thống đang có và giải thích chi tiết cấu trúc từng file/thư mục trong dự án **Remember.For.Me**.

---

## 1. Tổng Quan Những Việc Đã Làm (Cho Đến Hiện Tại)

Dự án **Remember.For.Me** là giải pháp hỗ trợ người cao tuổi (người bệnh/ngoại) thông qua ứng dụng Kiosk chạy tại nhà và Dashboard quản lý từ xa dành cho người chăm sóc. Chúng ta đã hoàn thành các hạng mục sau:

1. **Tái cấu trúc mã nguồn**: Chia rõ ràng thành 2 dự án riêng biệt trong cùng một repository:
   * `caregiver/`: Dự án React (Web) quản lý dành cho người chăm sóc.
   * `kiosk_app/`: Dự án Flutter (Android/Web/Windows) hiển thị nhắc nhở và tương tác tại nhà của người bệnh.
2. **Tích hợp Firebase Realtime Database**:
   * Cấu hình Firebase đồng bộ thời gian thực cho cả hai ứng dụng.
   * Tạo cơ chế kết nối bắc cầu: Khi người chăm sóc bấm kích hoạt một tác vụ (Routine), hệ thống React tự động đồng bộ sang bảng `reminders` của Flutter Kiosk để phát âm thanh thông báo và phát giọng nói tiếng Việt.
3. **Phát triển Dashboard Người Chăm Sóc (React + Vite + Tailwind)**:
   * Thiết kế giao diện hiện đại với màu sắc hài hòa, hiển thị trạng thái sinh tồn (vitals) và vị trí của người bệnh.
   * Tích hợp cơ chế thông báo Toast, nút bấm Kích hoạt khẩn cấp (Emergency Call) hiển thị cảnh báo đỏ trên Kiosk.
   * Xử lý dữ liệu động hỗ trợ cả định dạng boolean (`true/false`) và chuỗi (`"True"/"False"`) để tránh lỗi kiểu dữ liệu trên Firebase.
4. **Phát triển Ứng dụng Kiosk (Flutter)**:
   * Hỗ trợ đa nền tảng: Đã kích hoạt môi trường chạy trên **Web (Chrome)** và **Windows Desktop** bên cạnh **Android (APK)** để phục vụ việc lập trình thử nghiệm dễ dàng.
   * Xử lý an toàn (try-catch) toàn bộ các phần cứng như: Đọc thẻ Bluetooth BLE, Điều khiển âm lượng loa (Volume Controller), Khóa màn hình (Wakelock), Giọng nói tiếng Việt (Flutter TTS). Điều này giúp ứng dụng chạy ổn định trên mọi môi trường mà không bị crash màn hình trắng.
   * Xuất bản file cài đặt sẵn: Đã biên dịch ra file **[kiosk-app-release.apk](file:///c:/Users/LENOVO/Downloads/REMEMBERFORME/REMEMBER.FOR.ME/REMEMBER.FOR.ME/kiosk-app-release.apk)** ở thư mục gốc để cài đặt nhanh lên thiết bị Android.

---

## 2. Cấu Trúc Thư Mục & Giải Thích Chi Tiết Từng File

Dưới đây là sơ đồ cấu trúc của toàn bộ dự án:

```text
REMEMBER.FOR.ME/
├── caregiver/                 # Mã nguồn ứng dụng quản lý của người chăm sóc (React)
│   ├── package.json           # Danh sách thư viện và tập lệnh chạy ứng dụng Web
│   ├── vite.config.ts         # Cấu hình máy chủ phát triển Vite (chạy ở cổng 8080)
│   ├── tailwind.config.js     # Cấu hình CSS Tailwind để thiết kế giao diện
│   ├── index.html             # File HTML gốc của trang web
│   └── src/
│       ├── App.tsx            # [QUAN TRỌNG] Logic và giao diện chính của Dashboard
│       ├── firebase.ts        # [QUAN TRỌNG] Khởi tạo Firebase Web & các hàm đọc/ghi DB
│       ├── index.css          # Định nghĩa kiểu dáng và các token CSS
│       └── main.tsx           # File khởi chạy ứng dụng React
│
├── kiosk_app/                 # Mã nguồn ứng dụng hiển thị nhắc nhở (Flutter)
│   ├── pubspec.yaml           # Danh sách thư viện Dart/Flutter (TTS, Bluetooth, Firebase)
│   ├── android/               # Chứa cấu hình dự án gốc Android
│   │   └── app/
│   │       └── google-services.json # File cấu hình kết nối Firebase của Android
│   ├── web/                   # Thư mục chứa cấu hình chạy Kiosk trên trình duyệt Chrome
│   ├── windows/               # Thư mục chứa cấu hình chạy Kiosk trên Windows Desktop
│   └── lib/
│       ├── firebase_options.dart # [QUAN TRỌNG] Chứa cấu hình Firebase cho Android/Web/Windows
│       └── main.dart          # [QUAN TRỌNG] Logic giao diện, TTS tiếng Việt và đọc dữ liệu Kiosk
│
├── docs/                      # Thư mục chứa tài liệu thiết kế và sơ đồ
│   └── firebase_schema.json   # Cấu trúc cơ sở dữ liệu mẫu trên Firebase Realtime Database
│
└── kiosk-app-release.apk      # File cài đặt ứng dụng Kiosk hoàn chỉnh chạy trên Android
```

### Chi tiết các file Logic chính:

#### A. Phía Web Caregiver (`caregiver/`)
1. **[App.tsx](file:///c:/Users/LENOVO/Downloads/REMEMBERFORME/REMEMBER.FOR.ME/REMEMBER.FOR.ME/caregiver/src/App.tsx)**: 
   * Đọc trạng thái từ Firebase về (vitals của người bệnh, tín hiệu online của Kiosk, trạng thái khẩn cấp).
   * Hiển thị danh sách Routines (Lịch trình).
   * Khi người dùng bấm kích hoạt một Routine, hàm `handleTrigger` sẽ ghi dữ liệu vào `/tasks` đồng thời cập nhật trạng thái tương ứng sang `/reminders` để gửi tín hiệu tới Kiosk.
2. **[firebase.ts](file:///c:/Users/LENOVO/Downloads/REMEMBERFORME/REMEMBER.FOR.ME/REMEMBER.FOR.ME/caregiver/src/firebase.ts)**:
   * Chứa khóa API của Firebase (`firebaseConfig`).
   * Định nghĩa đường dẫn mặc định là `families/family_001` (tất cả dữ liệu của gia đình này sẽ lưu ở đây).
   * Xuất ra các hàm tiện ích: `subscribeToPath` (lắng nghe thay đổi), `updatePath` (cập nhật dữ liệu), `transactTask` (giao dịch an toàn).

#### B. Phía Flutter Kiosk (`kiosk_app/`)
1. **[main.dart](file:///c:/Users/LENOVO/Downloads/REMEMBERFORME/REMEMBER.FOR.ME/REMEMBER.FOR.ME/kiosk_app/lib/main.dart)**:
   * Hàm `main()` khởi tạo Firebase và cấu hình hệ thống (giữ màn hình luôn sáng, ẩn thanh điều hướng).
   * Lắng nghe nhánh `reminders` trên Firebase. Khi phát hiện bất kỳ reminder nào có trạng thái `is_triggered: true`, nó sẽ gọi bộ đọc Text-to-Speech (TTS) để phát âm thanh bằng tiếng Việt ("Ngoại ơi đến giờ uống thuốc sáng",...).
   * Đồng thời, lắng nghe nhánh `emergency`. Nếu có tín hiệu khẩn cấp từ người chăm sóc, màn hình Kiosk chuyển sang màu đỏ và phát thông điệp kêu gọi sự chú ý của người bệnh.
2. **[firebase_options.dart](file:///c:/Users/LENOVO/Downloads/REMEMBERFORME/REMEMBER.FOR.ME/REMEMBER.FOR.ME/kiosk_app/lib/firebase_options.dart)**:
   * Chứa các thông số cấu hình của Firebase dành riêng cho từng nền tảng (Android, Web và các nền tảng Desktop).
