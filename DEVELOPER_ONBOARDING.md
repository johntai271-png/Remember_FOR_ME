# Hướng Dẫn Lập Trình Viên Mới Thiết Lập Dự Án (DEVELOPER_ONBOARDING)

Tài liệu này hướng dẫn các thành viên trong nhóm tải dự án về máy cá nhân và thiết lập môi trường để có thể tiếp tục phát triển giao diện cũng như logic cho cả hai ứng dụng.

---

## 1. Yêu Cầu Hệ Thống (Prerequisites)

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt các công cụ sau:
*   **Git**: Dùng để quản lý mã nguồn.
*   **Node.js (Phiên bản 18 trở lên)**: Dùng để chạy Web React.
*   **Flutter SDK (Phiên bản 3.22.x trở lên)** và **Dart SDK**: Dùng để chạy Kiosk App.
*   **Trình soạn thảo mã nguồn**: Khuyên dùng **VS Code** (tiện lợi và nhẹ) hoặc **Android Studio** (đã cấu hình Flutter plugin).

---

## 2. Các Bước Thiết Lập & Khởi Chạy Dự Án

Sau khi tải mã nguồn dự án về máy, bạn mở thư mục dự án và làm theo các bước dưới đây:

### Bước 1: Chạy Ứng Dụng Quản Lý (Caregiver Web App)
1. Mở cửa sổ Terminal tại thư mục `caregiver/`:
   ```bash
   cd caregiver
   ```
2. Cài đặt các thư viện Node.js:
   ```bash
   npm install
   ```
3. Khởi chạy máy chủ phát triển cục bộ:
   ```bash
   npm run dev
   ```
4. Mở trình duyệt và truy cập: **[http://localhost:8080/](http://localhost:8080/)** để xem giao diện Dashboard.

---

### Bước 2: Chạy Ứng Dụng Nhắc Nhở (Kiosk App - Flutter)
Bạn có thể chạy thử nghiệm ứng dụng Flutter trực tiếp trên trình duyệt Web (Chrome) rất nhẹ và không tốn RAM.

1. Cài đặt plugin **Flutter** và **Dart** trong trình soạn thảo của bạn (VS Code Extension hoặc Android Studio Plugins).
2. Mở Terminal tại thư mục `kiosk_app/`:
   ```bash
   cd kiosk_app
   ```
3. Tải về các thư viện của Flutter:
   ```bash
   flutter pub get
   ```
4. Khởi chạy thử nghiệm trên trình duyệt Chrome (khuyên dùng khi viết code giao diện):
   ```bash
   flutter run -d chrome
   ```
   *(Hoặc nếu muốn chạy trực tiếp dưới dạng phần mềm Windows: `flutter run -d windows`)*.
5. Khi thay đổi code Dart trong thư mục `lib/`, hãy nhấn **Lưu file (`Ctrl + S`)** hoặc nhấn phím **`r`** tại Terminal để kích hoạt **Hot Reload** cập nhật giao diện ngay lập tức.

---

## 3. Cách Hai Ứng Dụng Đồng Bộ Dữ Liệu Với Nhau

Cả hai ứng dụng đều kết nối chung vào một cơ sở dữ liệu **Firebase Realtime Database** tại địa chỉ:
`https://rememberforme-fc18b-default-rtdb.firebaseio.com/`

Luồng hoạt động đồng bộ như sau:
1. **Caregiver App (React)** hiển thị danh sách công việc từ nhánh dữ liệu:
   `families/family_001/tasks`
2. Khi người chăm sóc bấm nút **"Kích hoạt (Play)"** trên web:
   * Web ghi nhận trạng thái công việc chuyển sang `"Running"`.
   * Web gửi một lệnh ghi đè sang nhánh dữ liệu: `families/family_001/reminders/{tên_tác_vụ}/is_triggered = true`.
3. **Kiosk App (Flutter)** liên tục lắng nghe nhánh `families/family_001/reminders/`.
   * Ngay khi thấy `is_triggered` chuyển sang `true`, Kiosk sẽ hiển thị màn hình thông báo to rõ màu xanh.
   * Đồng thời phát giọng nói tiếng Việt bằng loa ngoài ("Ngoại ơi đến giờ...").
   * Sau khi phát xong, Kiosk tự động trả lại giá trị `is_triggered = false` trên Firebase để chuẩn bị cho lần nhắc nhở tiếp theo.

---

## 4. Hướng Dẫn Cài Đặt Lên Thiết Bị Android Thật (Để Đi Báo Cáo/Demo)

Nếu bạn cần đem ứng dụng Kiosk đi báo cáo hoặc cài trực tiếp vào máy tính bảng Android:
1. Copy file **`kiosk-app-release.apk`** nằm ở thư mục gốc của dự án vào thiết bị Android.
2. Trên thiết bị Android, mở trình quản lý file, chọn file APK này và nhấn cài đặt (nếu máy hỏi quyền cài đặt từ nguồn không xác định, hãy nhấn Đồng ý).
3. Sau khi cài xong, mở ứng dụng **Remember.For.Me Kiosk** lên. Thiết bị của bạn sẽ kết nối trực tiếp với Dashboard của người chăm sóc qua internet.
