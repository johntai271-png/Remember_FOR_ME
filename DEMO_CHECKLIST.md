# ✅ DEMO CHECKLIST — Remember.For.Me

> In hoặc mở file này ra làm theo khi demo. Đánh dấu `[x]` từng mục.

---

## 1. Chuẩn bị trước (làm ở nhà, trước khi lên demo)

- [ ] Máy có **Node.js ≥ 18** (`node -v`) và đã chạy `cd caregiver && npm install` ít nhất 1 lần
- [ ] Bật được dashboard: `cd caregiver && npm run dev` → mở `http://localhost:8080`
- [ ] Vào web bấm **"Continue as Guest"** vào được (không kẹt màn trắng)
- [ ] Trình duyệt đã **cho phép Thông báo** (bấm Allow); Windows **tắt Focus Assist / Do Not Disturb**
- [ ] File **`kiosk-app-release.apk`** đã có (gốc repo). Nếu demo Kiosk trên điện thoại: cài sẵn lên Android
- [ ] (Nếu dùng thẻ BLE thật) đã cài **nRF Connect**, biết UUID thẻ, đã đặt `ble/tagId` + `ble/enabled=true`

---

## 2. Thiết bị lúc demo

| Vai | Thiết bị | Mở gì |
|---|---|---|
| Người chăm sóc | Laptop / máy trình chiếu | Dashboard `http://localhost:8080` |
| Màn hình cụ | Android (APK) **hoặc** Chrome | Kiosk |
| (tuỳ chọn) Beacon | Android/iPhone phát iBeacon | chỉ khi demo BLE thật |

> **Không có phần cứng?** Vẫn demo đủ 100% bằng **Demo Simulation Panel** (nút Wander / vitals).

---

## 3. Khởi động (ngay trước khi trình bày)

- [ ] Chạy `cd caregiver && npm run dev` → dashboard lên `http://localhost:8080`
- [ ] Dashboard: **Continue as Guest** → **Allow** thông báo
- [ ] Kiosk: mở app → **"Bỏ qua · Demo với family_001"** → thấy màn hình cụ (đồng hồ + lịch nhắc)
- [ ] Kiểm tra 2 app **cùng `family_001`** (thêm task ở web thấy hiện trên Kiosk)

---

## 4. Kịch bản demo (bấm & kỳ vọng)

### A. Nhắc lịch
- [ ] Web → tab **Manage** → thêm lời nhắc (tên, giờ) → **Lưu**
- [ ] Lời nhắc **hiện trên Kiosk**
- [ ] Bấm **Trigger** → Kiosk **hiện overlay toàn màn hình + đọc to** 🔊
- [ ] Cụ bấm **"Đã hiểu"** → web đổi **Completed**

### B. Ra khỏi nhà → báo vào app con
- [ ] Web → Home → **Demo Simulation Panel** → **🚶 Wander Alert**
- [ ] Bản đồ chuyển **đỏ "Outside safe zone"**
- [ ] Caregiver **kêu chuông + banner đỏ + thông báo "🚨 Người thân đã ra khỏi nhà"**
- [ ] Bấm **🏠 In Home (Safe)** → về xanh an toàn

### C. Nhịp tim bất thường
- [ ] Bấm **🔴 120 (High)** → thông báo **"❤️ Nhịp tim cao bất thường — 120 bpm"**
- [ ] Bấm **🔵 45 (Low)** → thông báo **"❤️ Nhịp tim thấp bất thường — 45 bpm"**
- [ ] Bấm **🟢 72 (Normal)** để reset

### D. Emergency SOS
- [ ] Bấm nút **SOS** → xác nhận → Kiosk **đỏ toàn màn hình + đọc thông báo khẩn cấp**

### E. (Tuỳ chọn) BLE thật
- [ ] Android (Kiosk) + thẻ/beacon gần nhau → dashboard **In Home**
- [ ] Mang beacon đi xa / tắt phát → sau ~10s → **Out of Home → báo động**

---

## 5. Reset để chạy demo lần sau
- [ ] Web → Manage → nút **Reset** trên "Alerts Timeline" → timeline sạch
- [ ] Web → **🏠 In Home** + **72 (Normal)** → về trạng thái an toàn
- [ ] Kiosk → giữ tiêu đề **"Remember.For.Me" 2 giây** → panel debug (nếu cần reset ghép nối)

---

## 6. Xử lý sự cố nhanh

| Hiện tượng | Xử lý |
|---|---|
| Không thấy thông báo bật lên | Bấm **Allow** quyền Thông báo; tắt **Focus Assist** của Windows |
| Kiosk Chrome không báo "ra khỏi nhà" | Chrome không quét BLE — dùng nút **Wander Alert** hoặc panel debug |
| Thêm task không hiện trên Kiosk | Kiểm tra cả 2 đang ở `family_001`; kiểm tra mạng internet |
| TTS không đọc | Android: cài giọng tiếng Việt (Settings → Text-to-speech); Chrome tuỳ máy |
| Bản đồ không hiện | Cần internet để tải ô bản đồ OpenStreetMap |
| `npm run build` báo lỗi | Bình thường (lỗi type cũ) — cứ dùng `npm run dev` |

---

## 7. Nhắc chung
- [ ] Có **internet** (Firebase + bản đồ cần mạng)
- [ ] Âm lượng loa đủ nghe (TTS + chuông báo)
- [ ] Đã thử chạy trọn 1 lượt A→E **trước** khi lên sân khấu
