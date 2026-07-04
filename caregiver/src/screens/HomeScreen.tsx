import { useState, type ReactNode } from "react";
import {
  BellRing,
  CheckCircle2,
  Clock3,
  HeartPulse,
  House,
  MapPinned,
  Pencil,
  Play,
  Plus,
  Save,
  ShieldAlert,
  Tag,
  Trash2,
  Volume2,
  X,
} from "lucide-react";

import { InfoBox } from "../components/common";
import type { AlertFeedItem, BleTag, Routine, ViewMode } from "../types";
import { formatClock, formatRelativeTime, formatTimestamp } from "../utils";

export function HomeScreen({
  elder,
  kiosk,
  trackerAlert,
  completedRoutines,
  upcomingRoutine,
}: {
  elder: any;
  kiosk: any;
  trackerAlert: any;
  completedRoutines: Routine[];
  upcomingRoutine: Routine | null;
}) {
  return (
    <>
      <section className="space-y-3">
        <p className="text-base font-semibold text-slate-600">Page 1</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[46px]">
          Live Care Overview
        </h1>
        <p className="max-w-3xl text-base font-medium leading-7 text-slate-600">
          A quick-read monitor for location, routine progress, next reminder, and tracker alerts.
        </p>
      </section>

      <StatusCard elder={elder} kiosk={kiosk} />

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SafetyMapCard elder={elder} trackerAlert={trackerAlert} />
        <TrackerAlertsCard trackerAlert={trackerAlert} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <CompletedTasksCard completedRoutines={completedRoutines} />
        <UpcomingTaskCard upcomingRoutine={upcomingRoutine} />
      </section>
    </>
  );
}

export function ManagementScreen({
  routines,
  bleTags,
  feedItems,
  onAddNew,
  onModeChange,
  onFieldChange,
  onTrigger,
  onSave,
  onOpenEmergency,
  onToggleTag,
  onAddTag,
  onUpdateTag,
  onDeleteTag,
  onConnectTag,
  onDisconnectTag,
}: {
  routines: Routine[];
  bleTags: BleTag[];
  feedItems: AlertFeedItem[];
  onAddNew: () => void;
  onModeChange: (id: string, mode: ViewMode) => void;
  onFieldChange: <K extends keyof Routine>(id: string, key: K, value: Routine[K]) => void;
  onTrigger: (id: string) => void;
  onSave: (id: string) => void;
  onOpenEmergency: () => void;
  onToggleTag: (id: string) => void;
  onAddTag: (name: string, location: string, hardwareId: string) => Promise<boolean>;
  onUpdateTag: (id: string, patch: Partial<Pick<BleTag, "name" | "location" | "hardwareId">>) => void;
  onDeleteTag: (id: string) => void;
  onConnectTag: (id: string) => void;
  onDisconnectTag: (id: string) => void;
}) {
  return (
    <section className="space-y-6">
      <div className="card-shell p-5 sm:p-6">
        <p className="text-base font-semibold text-slate-600">Page 2</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Manage Tasks, Tags, and Alerts
        </h1>
        <p className="mt-3 max-w-3xl text-base font-medium leading-7 text-slate-600">
          Use this page for caregiver actions like editing routines, pairing tags, and reviewing
          the alert timeline.
        </p>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <TagStatusCard
          bleTags={bleTags}
          onToggleTag={onToggleTag}
          onAddTag={onAddTag}
          onUpdateTag={onUpdateTag}
          onDeleteTag={onDeleteTag}
          onConnectTag={onConnectTag}
          onDisconnectTag={onDisconnectTag}
        />
        <ActivityFeedCard feedItems={feedItems} />
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Routine Management
          </h2>
          <button
            type="button"
            onClick={onAddNew}
            className="text-base font-bold text-brand transition hover:text-blue-700"
          >
            Add New
          </button>
        </div>

        <div className="space-y-6">
          {routines.map((routine) => (
            <RoutineCard
              key={routine.id}
              routine={routine}
              onModeChange={onModeChange}
              onFieldChange={onFieldChange}
              onTrigger={onTrigger}
              onSave={onSave}
            />
          ))}
        </div>
      </section>

      <EmergencySection onOpenModal={onOpenEmergency} />
    </section>
  );
}

function StatusCard({ elder, kiosk }: { elder: any; kiosk: any }) {
  const recentHeartbeat = kiosk.lastHeartbeatAt && Date.now() - kiosk.lastHeartbeatAt < 30000;
  const isKioskOnline = kiosk.online && recentHeartbeat;
  const locationLabel =
    elder.locationLabel || (elder.status === "in_home" ? "In Home" : "Out of Home");
  const relativeTime = elder.lastSeenAt ? formatRelativeTime(elder.lastSeenAt) : "No recent data";
  const heartRate = elder.vitals?.heartRateBpm ?? null;
  const vitalsStatus = elder.vitals?.status || "No data";

  return (
    <section className="card-shell p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-center gap-5">
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23d9e8d2'/%3E%3Cstop offset='100%25' stop-color='%23eef2ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='160' height='160' rx='80' fill='url(%23bg)' /%3E%3Ccircle cx='80' cy='60' r='28' fill='%23fff7ef' /%3E%3Cpath d='M42 136c8-24 24-36 38-36s30 12 38 36' fill='%23fff7ef' /%3E%3Crect x='4' y='4' width='152' height='152' rx='76' fill='none' stroke='%238b6cff' stroke-width='8'/%3E%3C/svg%3E"
            alt={elder.name || elder.displayName || "Mom Eleanor"}
            className={`h-16 w-16 rounded-full border-4 object-cover sm:h-20 sm:w-20 ${
              elder.status === "in_home" ? "border-active" : "border-slate-300"
            }`}
          />
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-[36px] lg:text-[32px]">
              {elder.name || elder.displayName || "Mom (Eleanor)"}
            </h2>
            <p className="mt-1 text-lg font-medium text-slate-600 sm:text-[24px] lg:text-[20px]">
              {isKioskOnline ? "Home Monitoring Active" : "Home Monitoring Inactive"}
            </p>
          </div>
        </div>

        <div
          className={`pill-button gap-2 text-[12px] font-extrabold uppercase tracking-wide ${
            isKioskOnline ? "bg-[#97f3a8] text-[#106228]" : "bg-slate-200 text-slate-600"
          }`}
        >
          <span
            className={`h-3 w-3 rounded-full ${isKioskOnline ? "bg-[#106228]" : "bg-slate-600"}`}
          />
          {isKioskOnline ? "LIVE" : "OFFLINE"}
        </div>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-2 xl:grid-cols-4">
        <InfoBox
          icon={<House className="h-9 w-9 text-action" />}
          label="Current Location"
          value={
            <span className="inline-flex items-center gap-3 text-action">
              <span
                className={`h-6 w-6 rounded-full bg-gradient-to-b ${
                  elder.status === "in_home"
                    ? "from-[#39d435] to-[#179420] shadow-[0_2px_8px_rgba(43,160,47,0.45)]"
                    : "from-red-400 to-red-600 shadow-[0_2px_8px_rgba(220,38,38,0.45)]"
                }`}
              />
              {locationLabel}
            </span>
          }
        />
        <InfoBox
          icon={<Clock3 className="h-9 w-9 text-brand" />}
          label="Last detected"
          value={relativeTime}
        />
        <InfoBox
          icon={<HeartPulse className="h-9 w-9 text-[#c91818]" />}
          label="Vitals"
          value={`${vitalsStatus}${heartRate != null ? ` (${heartRate} bpm)` : ""}`}
        />
        <InfoBox
          icon={<BellRing className="h-9 w-9 text-[#f59e0b]" />}
          label="Kiosk stream"
          value={isKioskOnline ? "Streaming live" : "Awaiting heartbeat"}
        />
      </div>
    </section>
  );
}

function SafetyMapCard({ elder, trackerAlert }: { elder: any; trackerAlert: any }) {
  const outsideSafeZone =
    elder.status !== "in_home" ||
    trackerAlert.safeZoneStatus === "outside" ||
    trackerAlert.type === "out_of_safe_zone";
  const trackerX = outsideSafeZone ? 276 : 200;
  const trackerY = outsideSafeZone ? 92 : 150;

  return (
    <section className="card-shell p-4 sm:p-5 lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Safety Map</h2>
          <p className="mt-2 text-base font-medium text-slate-600 sm:text-[16px]">
            Live geofence overview and home-zone status for the wearable tracker.
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

      <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200/80 bg-[#0f172a] p-4">
        <svg viewBox="0 0 400 300" className="h-[220px] w-full rounded-[20px] bg-[#0b1220]">
          <defs>
            <pattern id="care-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="400" height="300" fill="url(#care-grid)" />
          <rect x="0" y="82" width="400" height="14" fill="#1e293b" opacity="0.85" />
          <rect x="0" y="210" width="400" height="14" fill="#1e293b" opacity="0.85" />
          <rect x="122" y="0" width="14" height="300" fill="#1e293b" opacity="0.85" />
          <rect x="282" y="0" width="14" height="300" fill="#1e293b" opacity="0.85" />
          <circle
            cx="200"
            cy="150"
            r="75"
            fill={outsideSafeZone ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.12)"}
            stroke={outsideSafeZone ? "#ef4444" : "#10b981"}
            strokeDasharray="4 4"
          />
          <circle cx="200" cy="150" r="10" fill="#3b82f6" opacity="0.35" />
          <rect x="194" y="144" width="12" height="12" fill="#60a5fa" rx="2" />
          <text x="213" y="154" fill="#cbd5e1" fontSize="9">HOME STATION</text>
          <circle
            cx={trackerX}
            cy={trackerY}
            r="13"
            fill={outsideSafeZone ? "rgba(239,68,68,0.28)" : "rgba(59,130,246,0.32)"}
          />
          <circle cx={trackerX} cy={trackerY} r="6" fill={outsideSafeZone ? "#ef4444" : "#3b82f6"} />
        </svg>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="info-box">
          <p className="text-xl font-medium text-slate-600 sm:text-[18px]">Coordinates</p>
          <p className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-[22px]">
            {outsideSafeZone ? "1.3552° N, 103.8234° E" : "1.3521° N, 103.8198° E"}
          </p>
        </div>
        <div className="info-box">
          <p className="text-xl font-medium text-slate-600 sm:text-[18px]">Safety status</p>
          <p className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-[22px]">
            {outsideSafeZone ? "Geofence breach detected" : "Safe inside home zone"}
          </p>
        </div>
      </div>
    </section>
  );
}

function CompletedTasksCard({ completedRoutines }: { completedRoutines: Routine[] }) {
  return (
    <section className="card-shell p-4 sm:p-5 lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Tasks Completed</h2>
          <p className="mt-2 text-base font-medium text-slate-600 sm:text-[16px]">
            Recent routines already marked as done.
          </p>
        </div>
        <span className="pill-button bg-[#e9f6eb] text-action">
          {completedRoutines.length} done
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {completedRoutines.length === 0 ? (
          <div className="info-box">
            <p className="text-xl font-semibold text-slate-600">No completed routines yet.</p>
          </div>
        ) : (
          completedRoutines.slice(0, 4).map((routine) => (
            <div
              key={routine.id}
              className="rounded-[22px] border border-slate-200/80 bg-lavender px-5 py-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">{routine.name}</p>
                  <p className="mt-1 text-base font-semibold text-slate-600">{routine.note}</p>
                </div>
                <span className="text-lg font-bold text-brand">{formatClock(routine.time)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function UpcomingTaskCard({ upcomingRoutine }: { upcomingRoutine: Routine | null }) {
  return (
    <section className="card-shell p-4 sm:p-5 lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Next Task</h2>
          <p className="mt-2 text-base font-medium text-slate-600 sm:text-[16px]">
            The next routine that still needs attention.
          </p>
        </div>
        <Clock3 className="h-8 w-8 text-brand" />
      </div>

      {upcomingRoutine ? (
        <div className="mt-5 rounded-[22px] border border-slate-200/80 bg-lavender px-5 py-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="pill-button bg-white text-slate-700">{upcomingRoutine.period}</span>
            {upcomingRoutine.voiceEnabled ? (
              <span className="pill-button bg-[#eef4ff] text-brand">
                <Volume2 className="h-4 w-4" />
                Voice
              </span>
            ) : null}
            <span className="pill-button bg-[#dfe8ff] text-slate-700">{upcomingRoutine.status}</span>
          </div>
          <h3 className="mt-4 text-2xl font-extrabold text-slate-900">{upcomingRoutine.name}</h3>
          <p className="mt-2 text-base font-semibold text-slate-600">{upcomingRoutine.note}</p>
          <div className="mt-5 text-3xl font-black tracking-tight text-brand">
            {formatClock(upcomingRoutine.time)}
          </div>
        </div>
      ) : (
        <div className="mt-6 info-box">
          <p className="text-xl font-semibold text-slate-600">No upcoming task found.</p>
        </div>
      )}
    </section>
  );
}

function TagStatusCard({
  bleTags,
  onToggleTag,
  onAddTag,
  onUpdateTag,
  onDeleteTag,
  onConnectTag,
  onDisconnectTag,
}: {
  bleTags: BleTag[];
  onToggleTag: (id: string) => void;
  onAddTag: (name: string, location: string, hardwareId: string) => Promise<boolean>;
  onUpdateTag: (id: string, patch: Partial<Pick<BleTag, "name" | "location" | "hardwareId">>) => void;
  onDeleteTag: (id: string) => void;
  onConnectTag: (id: string) => void;
  onDisconnectTag: (id: string) => void;
}) {
  const [newTagName, setNewTagName] = useState("");
  const [newTagLocation, setNewTagLocation] = useState("");
  const [newTagHardwareId, setNewTagHardwareId] = useState("");

  async function submitNewTag() {
    const added = await onAddTag(newTagName, newTagLocation, newTagHardwareId);
    if (!added) return;
    setNewTagName("");
    setNewTagLocation("");
    setNewTagHardwareId("");
  }

  return (
    <section className="card-shell p-4 sm:p-5 lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">BLE Proximity Tags</h2>
          <p className="mt-2 text-base font-medium text-slate-600 sm:text-[16px]">
            Add, connect, rename, or remove in-home item tags.
          </p>
        </div>
        <Tag className="h-8 w-8 text-brand" />
      </div>

      <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-white px-5 py-4">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-slate-500">
          Add New Tag
        </p>
        <div className="mt-4 grid gap-3">
          <input
            value={newTagName}
            onChange={(event) => setNewTagName(event.target.value)}
            placeholder="Tag name"
            className="h-12 rounded-[16px] bg-lavender px-4 text-base font-medium text-slate-800 outline-none"
          />
          <input
            value={newTagLocation}
            onChange={(event) => setNewTagLocation(event.target.value)}
            placeholder="Location"
            className="h-12 rounded-[16px] bg-lavender px-4 text-base font-medium text-slate-800 outline-none"
          />
          <input
            value={newTagHardwareId}
            onChange={(event) => setNewTagHardwareId(event.target.value)}
            placeholder="Device ID / MAC / tag UID"
            className="h-12 rounded-[16px] bg-lavender px-4 text-base font-medium text-slate-800 outline-none"
          />
          <button
            type="button"
            onClick={() => void submitNewTag()}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-active px-5 text-base font-bold text-white transition hover:bg-[#7a5df0]"
          >
            <Plus className="h-5 w-5" />
            Add Tag
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {bleTags.map((tag) => (
          <TagItem
            key={tag.id}
            tag={tag}
            inRange={tag.status === "safe"}
            onToggleTag={onToggleTag}
            onUpdateTag={onUpdateTag}
            onDeleteTag={onDeleteTag}
            onConnectTag={onConnectTag}
            onDisconnectTag={onDisconnectTag}
          />
        ))}
      </div>
    </section>
  );
}

function TagItem({
  tag,
  inRange,
  onToggleTag,
  onUpdateTag,
  onDeleteTag,
  onConnectTag,
  onDisconnectTag,
}: {
  tag: BleTag;
  inRange: boolean;
  onToggleTag: (id: string) => void;
  onUpdateTag: (id: string, patch: Partial<Pick<BleTag, "name" | "location" | "hardwareId">>) => void;
  onDeleteTag: (id: string) => void;
  onConnectTag: (id: string) => void;
  onDisconnectTag: (id: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(tag.name);
  const [draftLocation, setDraftLocation] = useState(tag.location);
  const [draftHardwareId, setDraftHardwareId] = useState(tag.hardwareId);

  function startEdit() {
    setDraftName(tag.name);
    setDraftLocation(tag.location);
    setDraftHardwareId(tag.hardwareId);
    setIsEditing(true);
  }

  function cancelEdit() {
    setDraftName(tag.name);
    setDraftLocation(tag.location);
    setDraftHardwareId(tag.hardwareId);
    setIsEditing(false);
  }

  function saveEdit() {
    onUpdateTag(tag.id, {
      name: draftName,
      location: draftLocation,
      hardwareId: draftHardwareId,
    });
    setIsEditing(false);
  }

  return (
    <div className="rounded-[24px] border border-slate-200/80 bg-lavender px-5 py-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  value={draftName}
                  onChange={(event) => setDraftName(event.target.value)}
                  className="h-11 w-full rounded-[14px] bg-white px-4 text-base font-semibold text-slate-900 outline-none"
                />
                <input
                  value={draftLocation}
                  onChange={(event) => setDraftLocation(event.target.value)}
                  className="h-11 w-full rounded-[14px] bg-white px-4 text-base font-medium text-slate-700 outline-none"
                />
                <input
                  value={draftHardwareId}
                  onChange={(event) => setDraftHardwareId(event.target.value)}
                  placeholder="Device ID / MAC / tag UID"
                  className="h-11 w-full rounded-[14px] bg-white px-4 text-base font-medium text-slate-700 outline-none"
                />
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-extrabold text-slate-900">{tag.name}</h3>
                <p className="mt-1 text-base font-semibold text-slate-600">{tag.location}</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Device ID: {tag.hardwareId || "Not assigned"}
                </p>
              </>
            )}
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end">
            <span
              className={`pill-button shrink-0 ${
                inRange ? "bg-[#e9f6eb] text-action" : "bg-[#fff3cd] text-[#b97400]"
              }`}
            >
              {inRange ? "Near station" : "Away / misplaced"}
            </span>
            <span
              className={`pill-button shrink-0 ${
                tag.connectionStatus === "connected"
                  ? "bg-[#e7f7ff] text-[#0f5fa8]"
                  : tag.connectionStatus === "pairing"
                    ? "bg-[#fff7d6] text-[#8b6a00]"
                    : "bg-white text-slate-600"
              }`}
            >
              {tag.connectionStatus === "connected"
                ? "Connected"
                : tag.connectionStatus === "pairing"
                  ? "Pairing"
                  : "Disconnected"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onToggleTag(tag.id)}
            className="rounded-full bg-white px-4 py-2 text-base font-bold text-brand shadow-sm transition hover:bg-slate-50"
          >
            Toggle
          </button>

          {tag.connectionStatus === "connected" ? (
            <button
              type="button"
              onClick={() => onDisconnectTag(tag.id)}
              className="inline-flex items-center gap-2 rounded-full bg-[#fff4d8] px-4 py-2 text-base font-bold text-[#8b6a00] transition hover:bg-[#ffedc2]"
            >
              Disconnect
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onConnectTag(tag.id)}
              className="inline-flex items-center gap-2 rounded-full bg-[#e7f7ff] px-4 py-2 text-base font-bold text-[#0f5fa8] transition hover:bg-[#d7f1ff]"
            >
              Connect
            </button>
          )}

          {isEditing ? (
            <>
              <button
                type="button"
                onClick={saveEdit}
                className="inline-flex items-center gap-2 rounded-full bg-active px-4 py-2 text-base font-bold text-white transition hover:bg-[#7a5df0]"
              >
                <Save className="h-4 w-4" />
                Save
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-base font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={startEdit}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-base font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </button>
          )}

          <button
            type="button"
            onClick={() => onDeleteTag(tag.id)}
            className="inline-flex items-center gap-2 rounded-full bg-[#fff1f1] px-4 py-2 text-base font-bold text-[#c91818] transition hover:bg-[#ffe1e1]"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function RoutineCard({
  routine,
  onModeChange,
  onFieldChange,
  onTrigger,
  onSave,
}: {
  routine: Routine;
  onModeChange: (id: string, mode: ViewMode) => void;
  onFieldChange: <K extends keyof Routine>(id: string, key: K, value: Routine[K]) => void;
  onTrigger: (id: string) => void;
  onSave: (id: string) => void;
}) {
  const isCompleted = routine.status === "Completed";
  const isRunning = routine.status === "Running";
  const badgeClasses = isCompleted
    ? "bg-[#e9f6eb] text-action"
    : isRunning
      ? "bg-yellow-100 text-yellow-800 animate-pulse"
      : "bg-[#dfe8ff] text-slate-600";

  return (
    <article className="card-shell p-4 sm:p-5 lg:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`pill-button gap-2 ${badgeClasses}`}>
            {isCompleted ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : isRunning ? (
              <span className="inline-flex h-5 w-5 items-center justify-center font-bold">◔</span>
            ) : (
              <Clock3 className="h-5 w-5" />
            )}
            {routine.status}
          </span>
          <span className="pill-button bg-white text-slate-700">{routine.period}</span>
          {routine.voiceEnabled ? (
            <span className="pill-button bg-[#eef4ff] text-brand">
              <Volume2 className="h-4 w-4" />
              Voice
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <span className="text-base font-medium text-slate-600 sm:text-[18px]">{routine.note}</span>
          <SegmentedControl
            mode={routine.mode}
            onChange={(mode) => onModeChange(routine.id, mode)}
            disabled={isRunning}
          />
        </div>
      </div>

      {routine.mode === "edit" ? (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr_160px]">
            <FieldGroup
              label="Name"
              input={
                <input
                  value={routine.name}
                  onChange={(event) => onFieldChange(routine.id, "name", event.target.value)}
                  disabled={isRunning}
              className="h-16 w-full rounded-[18px] bg-lavender px-5 text-[18px] font-medium text-slate-800 outline-none ring-0 placeholder:text-slate-400 disabled:opacity-60"
                />
              }
            />
            <FieldGroup
              label="Scheduled time"
              input={
                <input
                  type="time"
                  value={routine.time}
                  onChange={(event) => onFieldChange(routine.id, "time", event.target.value)}
                  disabled={isRunning}
                  className="h-16 w-full rounded-[18px] bg-lavender px-5 text-[18px] font-medium text-slate-800 outline-none ring-0 placeholder:text-slate-400 disabled:opacity-60"
                />
              }
            />
            <FieldGroup
              label="Auto run"
              input={
                <div className="flex h-16 items-center justify-center rounded-[18px] bg-lavender">
                  <input
                    type="checkbox"
                    checked={routine.autoRun}
                    onChange={(event) => onFieldChange(routine.id, "autoRun", event.target.checked)}
                    disabled={isRunning}
                    className="h-9 w-9 rounded-md border-0 disabled:opacity-60"
                  />
                </div>
              }
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_180px]">
            <FieldGroup
              label="Routine period"
              input={
                <select
                  value={routine.period}
                  onChange={(event) =>
                    onFieldChange(routine.id, "period", event.target.value as Routine["period"])
                  }
                  disabled={isRunning}
                  className="h-16 w-full rounded-[18px] bg-lavender px-5 text-[18px] font-medium text-slate-800 outline-none disabled:opacity-60"
                >
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
              }
            />
            <FieldGroup
              label="Voice prompt"
              input={
                <div className="flex h-16 items-center justify-center rounded-[18px] bg-lavender">
                  <input
                    type="checkbox"
                    checked={routine.voiceEnabled}
                    onChange={(event) =>
                      onFieldChange(routine.id, "voiceEnabled", event.target.checked)
                    }
                    disabled={isRunning}
                    className="h-9 w-9 rounded-md border-0 disabled:opacity-60"
                  />
                </div>
              }
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <ActionButton
              icon={Play}
              label={isRunning ? "Running..." : "Trigger"}
              onClick={() => onTrigger(routine.id)}
              disabled={isRunning}
            />
            <ActionButton
              icon={Save}
              label="Save"
              onClick={() => onSave(routine.id)}
              disabled={isRunning}
            />
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900 sm:text-[20px]">{routine.name}</h3>
            </div>
            <div className="text-right text-2xl font-semibold text-slate-600 sm:text-[18px]">
              {formatClock(routine.time)}
            </div>
          </div>

          <ActionButton
            icon={Play}
            label={isRunning ? "Running..." : "Trigger"}
            onClick={() => onTrigger(routine.id)}
            disabled={isRunning}
            fullWidth
          />
        </div>
      )}
    </article>
  );
}

function ActivityFeedCard({ feedItems }: { feedItems: AlertFeedItem[] }) {
  return (
    <section className="card-shell p-4 sm:p-5 lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Alerts Timeline</h2>
          <p className="mt-2 text-base font-medium text-slate-600 sm:text-[16px]">
            Timeline and action history are kept on the management page.
          </p>
        </div>
        <BellRing className="h-8 w-8 text-brand" />
      </div>

      <div className="mt-6 space-y-4">
        {feedItems.map((item) => (
          <div
            key={item.id}
            className="rounded-[24px] border border-slate-200/80 bg-lavender px-5 py-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xl font-extrabold text-slate-900">{item.title}</p>
                <p className="mt-2 text-base font-medium text-slate-600">{item.message}</p>
              </div>
              <span
                className={`pill-button whitespace-nowrap ${
                  item.level === "danger"
                    ? "bg-[#ffd6d6] text-[#c91818]"
                    : item.level === "warning"
                      ? "bg-[#fff3cd] text-[#b97400]"
                      : item.level === "success"
                        ? "bg-[#e9f6eb] text-action"
                        : "bg-white text-slate-700"
                }`}
              >
                {item.timestampLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FieldGroup({ label, input }: { label: string; input: ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="block text-xl font-bold text-slate-600 sm:text-[18px]">{label}</label>
      {input}
    </div>
  );
}

function SegmentedControl({
  mode,
  onChange,
  disabled = false,
}: {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
  disabled?: boolean;
}) {
  return (
    <div className="inline-flex rounded-full bg-[#eef0ff] p-1 shadow-sm">
      {(["view", "edit"] as const).map((item) => {
        const active = item === mode;
        return (
          <button
            key={item}
            type="button"
            disabled={disabled}
            onClick={() => onChange(item)}
            className={`rounded-full px-5 py-2 text-lg font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${
              active ? "bg-white text-brand shadow-sm" : "text-slate-600"
            }`}
          >
            {item === "view" ? "View" : "Edit"}
          </button>
        );
      })}
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
  onClick,
  fullWidth = false,
  disabled = false,
}: {
  icon: typeof Play;
  label: string;
  onClick: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-[58px] items-center justify-center gap-3 rounded-[18px] bg-action px-5 text-lg font-semibold text-white transition hover:bg-[#0f622b] disabled:cursor-not-allowed disabled:opacity-50 ${
        fullWidth ? "w-full" : "w-full"
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );
}

function TrackerAlertsCard({ trackerAlert }: { trackerAlert: any }) {
  const active =
    trackerAlert.is_active === true ||
    trackerAlert.is_active === "true" ||
    trackerAlert.is_active === "True";

  const formatAlertType = (type: string | null) => {
    if (type === "abnormal_heart_rate") return "Abnormal heart rate";
    if (type === "inactive") return "Inactive";
    if (type === "out_of_safe_zone") return "Out of safe zone";
    return "No alert";
  };

  return (
    <section className="card-shell p-4 sm:p-5 lg:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Tracker Alerts</h2>
          <p className="mt-2 text-base font-medium text-slate-600 sm:text-[16px]">
            Wrist tracker pushes alerts for abnormal heart rate, inactivity, and safe-zone issues.
          </p>
        </div>
        <span className={`pill-button ${active ? "bg-[#ffd6d6] text-[#c91818]" : "bg-[#e9f6eb] text-action"}`}>
          {active ? "Alert" : "Normal"}
        </span>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <InfoBox
          label="Latest event"
          value={formatAlertType(trackerAlert.type)}
          icon={<MapPinned className="h-9 w-9 text-brand" />}
        />
        <InfoBox
          label="Source"
          value={trackerAlert.source || "Tracker"}
          icon={<HeartPulse className="h-9 w-9 text-[#c91818]" />}
        />
        <div className="info-box lg:col-span-2">
          <p className="text-xl font-medium text-slate-600 sm:text-[18px]">Updated</p>
          <p className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-[22px]">
            {trackerAlert.updatedAt ? formatTimestamp(new Date(trackerAlert.updatedAt)) : "No events yet"}
          </p>
        </div>
      </div>

      <p className="mt-5 text-base font-medium text-slate-700">
        {active ? trackerAlert.message || "Tracker has detected an issue." : "No active tracker alert."}
      </p>
    </section>
  );
}

function EmergencySection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="card-shell border-[#f4b5b5] bg-[#ffd6d6] p-4 shadow-card sm:p-5 lg:p-6">
      <h2 className="text-2xl font-extrabold text-[#a50f0f] sm:text-3xl">Need Immediate Attention?</h2>
      <p className="mt-3 text-base font-medium text-[#bf4f4f] sm:text-[16px]">
        Keep high-risk actions on the management page so the overview page stays clean.
      </p>
      <button
        type="button"
        onClick={onOpenModal}
        className="mt-6 inline-flex min-h-[64px] w-full items-center justify-center gap-3 rounded-full bg-[#c91818] px-6 text-lg font-semibold text-white transition hover:bg-[#b11212]"
      >
        <ShieldAlert className="h-5 w-5" />
        Send Emergency Alert
      </button>
    </section>
  );
}
