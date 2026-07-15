export function createAvatarSvg(stroke: string, fillA: string, fillB: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${fillA}" />
          <stop offset="100%" stop-color="${fillB}" />
        </linearGradient>
      </defs>
      <rect width="160" height="160" rx="80" fill="url(#bg)" />
      <circle cx="80" cy="60" r="28" fill="#fff7ef" />
      <path d="M42 136c8-24 24-36 38-36s30 12 38 36" fill="#fff7ef" />
      <rect x="4" y="4" width="152" height="152" rx="76" fill="none" stroke="${stroke}" stroke-width="8"/>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function formatTimestamp(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatRelativeTime(timestamp: number) {
  if (!timestamp) return "No recent data";
  const diffMinutes = Math.max(1, Math.round((Date.now() - timestamp) / 60000));
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
}

export function formatClock(timeValue: string) {
  if (!timeValue) return "--:--";
  const [hourText = "0", minuteText = "0"] = timeValue.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${String(displayHour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${period}`;
}

// ─── Geo helpers (định vị người) ─────────────────────────────────────────────

export type LatLng = { lat: number; lng: number };

/** Khoảng cách giữa 2 toạ độ (mét) theo công thức Haversine. */
export function haversineMeters(a: LatLng, b: LatLng): number {
  const R = 6371000; // bán kính Trái Đất (m)
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Định dạng khoảng cách dễ đọc: 85 m / 1.2 km. */
export function formatDistance(meters: number): string {
  if (!Number.isFinite(meters)) return "—";
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(meters < 10000 ? 2 : 1)} km`;
}

/** Toạ độ hợp lệ (kiểm tra thô để tránh vẽ điểm rác lên map). */
export function isValidLatLng(value: any): value is LatLng {
  return (
    value &&
    typeof value.lat === "number" &&
    typeof value.lng === "number" &&
    Number.isFinite(value.lat) &&
    Number.isFinite(value.lng) &&
    Math.abs(value.lat) <= 90 &&
    Math.abs(value.lng) <= 180
  );
}

/**
 * Dịch một toạ độ đi `meters` mét theo hướng `bearingDeg` (0 = Bắc, 90 = Đông).
 * Dùng để tạo điểm mô phỏng "ra khỏi vùng an toàn" cách nhà một quãng thật.
 */
export function offsetLatLng(origin: LatLng, meters: number, bearingDeg: number): LatLng {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  const brng = toRad(bearingDeg);
  const lat1 = toRad(origin.lat);
  const lng1 = toRad(origin.lng);
  const dR = meters / R;
  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(dR) + Math.cos(lat1) * Math.sin(dR) * Math.cos(brng),
  );
  const lng2 =
    lng1 +
    Math.atan2(
      Math.sin(brng) * Math.sin(dR) * Math.cos(lat1),
      Math.cos(dR) - Math.sin(lat1) * Math.sin(lat2),
    );
  return { lat: toDeg(lat2), lng: toDeg(lng2) };
}

export function formatTaskNote(task: any) {
  const startedAt = task.triggeredAt || task.lastTriggeredAt;
  if (task.status === "Running" && startedAt) {
    return `Started at ${formatTimestamp(new Date(startedAt))}`;
  }
  if (task.status === "Completed" && task.completedAt) {
    return `Completed at ${formatTimestamp(new Date(task.completedAt))}`;
  }
  return task.is_auto ? "Auto mode enabled" : "Manual mode only";
}
