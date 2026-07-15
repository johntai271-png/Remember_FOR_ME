import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  formatDistance,
  formatRelativeTime,
  haversineMeters,
  isValidLatLng,
  type LatLng,
} from "../utils";

// Toạ độ nhà mặc định khi Firebase chưa có node `home` (TP.HCM).
export const DEFAULT_HOME: HomeZone = {
  lat: 10.7769,
  lng: 106.7009,
  radiusMeters: 150,
  label: "Home",
};

export type HomeZone = LatLng & { radiusMeters: number; label?: string };

type ElderLike = {
  status?: string;
  locationLabel?: string;
  location?: { lat?: number; lng?: number; accuracy?: number; updatedAt?: number; source?: string };
};

/** Chuẩn hoá node home từ Firebase (chấp nhận thiếu field → dùng mặc định). */
export function normalizeHome(raw: any): HomeZone {
  if (!raw || typeof raw !== "object") return DEFAULT_HOME;
  const lat = Number(raw.lat);
  const lng = Number(raw.lng);
  const radiusMeters = Number(raw.radiusMeters);
  return {
    lat: Number.isFinite(lat) ? lat : DEFAULT_HOME.lat,
    lng: Number.isFinite(lng) ? lng : DEFAULT_HOME.lng,
    radiusMeters: Number.isFinite(radiusMeters) && radiusMeters > 0 ? radiusMeters : DEFAULT_HOME.radiusMeters,
    label: typeof raw.label === "string" && raw.label.trim() ? raw.label : DEFAULT_HOME.label,
  };
}

function elderDivIcon(outside: boolean) {
  const color = outside ? "#ef4444" : "#2563eb";
  return L.divIcon({
    className: "rfm-elder-icon",
    html: `<span class="rfm-pulse" style="--rfm:${color}"></span><span class="rfm-dot" style="background:${color}"></span>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
}

const homeIcon = L.divIcon({
  className: "rfm-home-icon",
  html: `<span class="rfm-home">🏠</span>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

/**
 * Bản đồ an toàn thời gian thực (Leaflet + OpenStreetMap).
 * - Đọc vị trí thật của người già từ `elder.location {lat,lng}`.
 * - Vẽ vùng an toàn (geofence) quanh `home` với bán kính `radiusMeters`.
 * - Tính khoảng cách thật (Haversine) → cảnh báo khi vượt vùng.
 */
export function LiveSafetyMap({
  elder,
  home,
  trackerAlert,
}: {
  elder: ElderLike;
  home: HomeZone;
  trackerAlert: any;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const elderMarkerRef = useRef<L.Marker | null>(null);
  const accuracyRef = useRef<L.Circle | null>(null);
  const homeMarkerRef = useRef<L.Marker | null>(null);
  const zoneRef = useRef<L.Circle | null>(null);

  const elderPos: LatLng | null = useMemo(
    () => (isValidLatLng(elder.location) ? { lat: elder.location!.lat!, lng: elder.location!.lng! } : null),
    [elder.location],
  );

  const distance = elderPos ? haversineMeters(elderPos, home) : null;

  // Ưu tiên toạ độ thật; nếu chưa có GPS thì fallback theo status/tracker_alert.
  const outsideSafeZone =
    distance !== null
      ? distance > home.radiusMeters
      : elder.status === "out_of_home" ||
        trackerAlert?.safeZoneStatus === "outside" ||
        trackerAlert?.type === "out_of_safe_zone";

  // Khởi tạo map một lần.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: [home.lat, home.lng],
      zoom: 16,
      zoomControl: true,
      attributionControl: true,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    mapRef.current = map;
    // Leaflet đôi khi tính sai kích thước khi container mới mount.
    setTimeout(() => map.invalidateSize(), 200);
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cập nhật vùng an toàn (home + geofence).
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const center: [number, number] = [home.lat, home.lng];

    if (!homeMarkerRef.current) {
      homeMarkerRef.current = L.marker(center, { icon: homeIcon }).addTo(map);
    } else {
      homeMarkerRef.current.setLatLng(center);
    }
    homeMarkerRef.current.bindPopup(`${home.label ?? "Home"} · vùng an toàn ${home.radiusMeters} m`);

    if (!zoneRef.current) {
      zoneRef.current = L.circle(center, {
        radius: home.radiusMeters,
        color: outsideSafeZone ? "#ef4444" : "#10b981",
        weight: 2,
        dashArray: "6 6",
        fillColor: outsideSafeZone ? "#ef4444" : "#10b981",
        fillOpacity: 0.1,
      }).addTo(map);
    } else {
      zoneRef.current.setLatLng(center);
      zoneRef.current.setRadius(home.radiusMeters);
      zoneRef.current.setStyle({
        color: outsideSafeZone ? "#ef4444" : "#10b981",
        fillColor: outsideSafeZone ? "#ef4444" : "#10b981",
      });
    }
  }, [home.lat, home.lng, home.radiusMeters, home.label, outsideSafeZone]);

  // Cập nhật vị trí người già.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (!elderPos) {
      // Chưa có GPS → xoá marker cũ, chỉ hiển thị vùng nhà.
      elderMarkerRef.current?.remove();
      elderMarkerRef.current = null;
      accuracyRef.current?.remove();
      accuracyRef.current = null;
      map.setView([home.lat, home.lng], 16);
      return;
    }

    const pos: [number, number] = [elderPos.lat, elderPos.lng];
    const icon = elderDivIcon(outsideSafeZone);

    if (!elderMarkerRef.current) {
      elderMarkerRef.current = L.marker(pos, { icon, zIndexOffset: 1000 }).addTo(map);
    } else {
      elderMarkerRef.current.setLatLng(pos);
      elderMarkerRef.current.setIcon(icon);
    }

    // Vòng độ chính xác GPS (accuracy) nếu có.
    const accuracy = Number(elder.location?.accuracy);
    if (Number.isFinite(accuracy) && accuracy > 0) {
      if (!accuracyRef.current) {
        accuracyRef.current = L.circle(pos, {
          radius: accuracy,
          color: "#2563eb",
          weight: 1,
          fillColor: "#2563eb",
          fillOpacity: 0.08,
        }).addTo(map);
      } else {
        accuracyRef.current.setLatLng(pos);
        accuracyRef.current.setRadius(accuracy);
      }
    } else {
      accuracyRef.current?.remove();
      accuracyRef.current = null;
    }

    // Fit cả nhà lẫn người vào khung nhìn.
    const bounds = L.latLngBounds([pos, [home.lat, home.lng]]);
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 17 });
  }, [elderPos, outsideSafeZone, elder.location?.accuracy, home.lat, home.lng]);

  const updatedAt = elder.location?.updatedAt;
  const source = elder.location?.source;
  const lastUpdate =
    Number(elder.location?.updatedAt) ||
    Number(trackerAlert?.updatedAt) ||
    Number((elder as any).lastSeenAt) ||
    0;

  return (
    <section className="card-shell p-4 sm:p-5 lg:p-6">
      <style>{`
        .rfm-elder-icon { position: relative; }
        .rfm-elder-icon .rfm-dot { position:absolute; top:7px; left:7px; width:12px; height:12px; border-radius:9999px; box-shadow:0 0 0 3px #fff, 0 1px 4px rgba(0,0,0,.4); }
        .rfm-elder-icon .rfm-pulse { position:absolute; top:0; left:0; width:26px; height:26px; border-radius:9999px; background:var(--rfm); opacity:.35; animation:rfm-pulse 1.6s ease-out infinite; }
        @keyframes rfm-pulse { 0%{transform:scale(.5);opacity:.5} 100%{transform:scale(1.6);opacity:0} }
        .rfm-home-icon .rfm-home { font-size:22px; line-height:30px; filter:drop-shadow(0 1px 2px rgba(0,0,0,.4)); }
        .leaflet-container { font: inherit; }
      `}</style>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Safety Map</h2>
          <p className="mt-2 text-base font-medium text-slate-600 sm:text-[16px]">
            {elderPos
              ? "Live GPS location and home-zone status."
              : "Home safe-zone status via BLE tag proximity."}
          </p>
        </div>
        <span
          className={`pill-button ${
            outsideSafeZone ? "bg-[#ffd6d6] text-[#c91818]" : "bg-[#e9f6eb] text-action"
          }`}
        >
          {outsideSafeZone ? "Outside zone" : "Inside zone"}
        </span>
      </div>

      <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200/80">
        <div ref={containerRef} className="h-[240px] w-full sm:h-[280px]" />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {elderPos ? (
          <>
            <div className="info-box">
              <p className="text-xl font-medium text-slate-600 sm:text-[18px]">Coordinates</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-[22px]">
                {`${elderPos.lat.toFixed(5)}, ${elderPos.lng.toFixed(5)}`}
              </p>
              {updatedAt ? (
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {source ? `${String(source).toUpperCase()} · ` : ""}
                  {formatRelativeTime(Number(updatedAt))}
                </p>
              ) : null}
            </div>
            <div className="info-box">
              <p className="text-xl font-medium text-slate-600 sm:text-[18px]">Distance from home</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-[22px]">
                {distance !== null ? formatDistance(distance) : "—"}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {outsideSafeZone ? "Geofence breach detected" : `Safe inside ${home.radiusMeters} m zone`}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="info-box">
              <p className="text-xl font-medium text-slate-600 sm:text-[18px]">Location status</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-[22px]">
                {outsideSafeZone ? "Outside safe zone" : "At home"}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {outsideSafeZone ? "BLE tag out of range" : `Detected within home zone`}
              </p>
            </div>
            <div className="info-box">
              <p className="text-xl font-medium text-slate-600 sm:text-[18px]">Last update</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-[22px]">
                {lastUpdate ? formatRelativeTime(lastUpdate) : "No data yet"}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-500">Tracked via BLE tag</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
