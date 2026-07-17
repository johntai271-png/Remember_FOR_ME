import { useRef, useState, type ChangeEvent, type ReactNode } from "react";
import {
  BellRing,
  CheckCircle2,
  Clock3,
  HeartPulse,
  House,
  MapPinned,
  Mic,
  Pencil,
  Play,
  Plus,
  RotateCcw,
  Save,
  ShieldAlert,
  Square,
  Tag,
  Trash2,
  Upload,
  Volume2,
  X,
} from "lucide-react";

import { InfoBox } from "../components/common";
import { LiveSafetyMap, type HomeZone } from "../components/LiveSafetyMap";
import type { AlertFeedItem, BleTag, Routine, ViewMode } from "../types";
import { formatClock, formatRelativeTime, formatTimestamp } from "../utils";

export function HomeScreen({
  elder,
  kiosk,
  home,
  trackerAlert,
  completedRoutines,
  upcomingRoutine,
  dataLoading,
  onSimulateLocation,
  onSimulateHeartRate,
  onResetSimulation,
}: {
  elder: any;
  kiosk: any;
  home: HomeZone;
  trackerAlert: any;
  completedRoutines: Routine[];
  upcomingRoutine: Routine | null;
  dataLoading: boolean;
  onSimulateLocation: (status: "in_home" | "out_of_home") => Promise<void>;
  onSimulateHeartRate: (bpm: number, label: "Normal" | "High" | "Low") => Promise<void>;
  onResetSimulation: () => Promise<void>;
}) {
  if (dataLoading) return <SkeletonHome />;

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
        <LiveSafetyMap elder={elder} home={home} trackerAlert={trackerAlert} />
        <TrackerAlertsCard trackerAlert={trackerAlert} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <CompletedTasksCard completedRoutines={completedRoutines} />
        <UpcomingTaskCard upcomingRoutine={upcomingRoutine} />
      </section>

      {/* Demo Simulation Controls */}
      <SimulationPanel
        elder={elder}
        onSimulateLocation={onSimulateLocation}
        onSimulateHeartRate={onSimulateHeartRate}
        onResetSimulation={onResetSimulation}
      />
    </>
  );
}

export function ManagementScreen({
  routines,
  bleTags,
  feedItems,
  dataLoading,
  onAddNew,
  onModeChange,
  onFieldChange,
  onTrigger,
  onReset,
  onSave,
  onRecordVoice,
  onOpenEmergency,
  onToggleTag,
  onAddTag,
  onUpdateTag,
  onDeleteTag,
  onConnectTag,
  onDisconnectTag,
  onClearCompleted,
  onResetTimeline,
  onResetDemo,
}: {
  routines: Routine[];
  bleTags: BleTag[];
  feedItems: AlertFeedItem[];
  dataLoading: boolean;
  onAddNew: () => void;
  onModeChange: (id: string, mode: ViewMode) => void;
  onFieldChange: <K extends keyof Routine>(id: string, key: K, value: Routine[K]) => void;
  onTrigger: (id: string) => void;
  onReset: (id: string) => void;
  onSave: (id: string) => void;
  onRecordVoice: (id: string, clip: string | null) => void;
  onOpenEmergency: () => void;
  onToggleTag: (id: string) => void;
  onAddTag: (name: string, location: string, hardwareId: string) => Promise<boolean>;
  onUpdateTag: (id: string, patch: Partial<Pick<BleTag, "name" | "location" | "hardwareId">>) => void;
  onDeleteTag: (id: string) => void;
  onConnectTag: (id: string) => void;
  onDisconnectTag: (id: string) => void;
  onClearCompleted: () => void;
  onResetTimeline: () => void;
  onResetDemo: () => void;
}) {
  const [filterPeriod, setFilterPeriod] = useState<"all" | "morning" | "afternoon" | "evening">("all");
  const [showCompletedList, setShowCompletedList] = useState(false);

  if (dataLoading) return <SkeletonManage />;

  const activeRoutines = routines.filter((routine) => routine.status !== "Completed");
  const completedRoutines = routines.filter((routine) => routine.status === "Completed");

  const filteredRoutines = activeRoutines.filter((routine) => {
    if (filterPeriod === "all") return true;
    return routine.period === filterPeriod;
  });

  return (
    <section className="space-y-6">
      <div className="card-shell p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-semibold text-slate-600">Page 2</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Manage Tasks, Tags, and Alerts
            </h1>
            <p className="mt-3 max-w-3xl text-base font-medium leading-7 text-slate-600">
              Use this page for caregiver actions like editing routines, pairing tags, and reviewing
              the alert timeline.
            </p>
          </div>
          <button
            type="button"
            onClick={onResetDemo}
            title="Đưa mọi lời nhắc về Pending và xoá Alerts Timeline (giữ giọng đã ghi)"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-red-200 bg-red-50 px-5 py-3 text-base font-bold text-red-600 transition hover:bg-red-100"
          >
            <RotateCcw className="h-5 w-5" />
            Reset Demo
          </button>
        </div>
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
        <ActivityFeedCard feedItems={feedItems} onReset={onResetTimeline} />
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

        {/* Period Filter Buttons */}
        <div className="flex flex-wrap gap-2 pb-1">
          {(["all", "morning", "afternoon", "evening"] as const).map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => setFilterPeriod(period)}
              className={`rounded-full px-4 py-2 text-sm font-extrabold uppercase tracking-wider transition ${
                filterPeriod === period
                  ? "bg-active text-white shadow-sm"
                  : "bg-lavender text-slate-600 hover:bg-slate-200"
              }`}
            >
              {period === "all"
                ? "🌍 All"
                : period === "morning"
                  ? "🌅 Morning"
                  : period === "afternoon"
                    ? "☀️ Afternoon"
                    : "🌙 Evening"}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredRoutines.length === 0 ? (
            <div className="info-box py-6 text-center">
              <p className="text-lg font-semibold text-slate-500">No active routines scheduled for this period.</p>
            </div>
          ) : (
            filteredRoutines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onModeChange={onModeChange}
                onFieldChange={onFieldChange}
                onTrigger={onTrigger}
                onReset={onReset}
                onSave={onSave}
                onRecordVoice={onRecordVoice}
              />
            ))
          )}
        </div>

        {/* Collapsible Completed Routines Section */}
        {completedRoutines.length > 0 && (
          <div className="pt-6 border-t border-slate-200/85 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setShowCompletedList(!showCompletedList)}
                className="inline-flex items-center gap-2 text-lg font-extrabold text-slate-500 hover:text-slate-700 transition outline-none"
              >
                <span>{showCompletedList ? "▼" : "▶"} Completed Routines ({completedRoutines.length})</span>
              </button>
              {showCompletedList && (
                <button
                  type="button"
                  onClick={onClearCompleted}
                  className="rounded-full bg-slate-100 border border-slate-200/60 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 transition shrink-0"
                >
                  Clear All
                </button>
              )}
            </div>

            {showCompletedList && (
              <div className="grid gap-4 sm:grid-cols-2">
                {completedRoutines.map((routine) => (
                  <div
                    key={routine.id}
                    className="rounded-[22px] border border-slate-200/80 bg-slate-100/50 p-4 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <h3 className="text-lg font-extrabold text-slate-500 line-through truncate">
                        {routine.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-400">
                        Scheduled at {formatClock(routine.time)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onReset(routine.id)}
                      className="rounded-full bg-lavender px-4 py-2 text-xs font-bold text-active hover:bg-[#e4ddff] transition shrink-0"
                    >
                      Reset
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
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
  onReset,
  onSave,
  onRecordVoice,
}: {
  routine: Routine;
  onModeChange: (id: string, mode: ViewMode) => void;
  onFieldChange: <K extends keyof Routine>(id: string, key: K, value: Routine[K]) => void;
  onTrigger: (id: string) => void;
  onReset: (id: string) => void;
  onSave: (id: string) => void;
  onRecordVoice: (id: string, clip: string | null) => void;
}) {
  const isCompleted = routine.status === "Completed";
  const isRunning = routine.status === "Running";
  const isNoResponse = routine.status === "No response";
  const badgeClasses = isCompleted
    ? "bg-[#e9f6eb] text-action"
    : isRunning
      ? "bg-yellow-100 text-yellow-800 animate-pulse"
      : isNoResponse
        ? "bg-[#ffe0c7] text-[#c2410c]"
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
            ) : isNoResponse ? (
              <BellRing className="h-5 w-5" />
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

          <FieldGroup
            label="Giọng gia đình (phát thay giọng máy)"
            input={
              <VoiceRecorder
                value={routine.voiceClip}
                onChange={(clip) => onRecordVoice(routine.id, clip)}
                disabled={isRunning}
              />
            }
          />

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
          {isRunning ? (
            <button
              type="button"
              onClick={() => onReset(routine.id)}
              className="inline-flex w-full min-h-[52px] items-center justify-center gap-2 rounded-[18px] border-2 border-red-200 bg-red-50 text-base font-bold text-red-600 transition hover:bg-red-100"
            >
              <X className="h-5 w-5" />
              Stop &amp; Reset to Pending
            </button>
          ) : null}
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
          {isRunning ? (
            <button
              type="button"
              onClick={() => onReset(routine.id)}
              className="inline-flex w-full min-h-[52px] items-center justify-center gap-2 rounded-[18px] border-2 border-red-200 bg-red-50 text-base font-bold text-red-600 transition hover:bg-red-100"
            >
              <X className="h-5 w-5" />
              Stop &amp; Reset to Pending
            </button>
          ) : null}
        </div>
      )}
    </article>
  );
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

// ~900KB: dư cho một câu nói ngắn dạng webm/opus, vẫn an toàn cho Realtime Database.
const MAX_VOICE_BYTES = 900_000;

function VoiceRecorder({
  value,
  onChange,
  disabled = false,
}: {
  value?: string | null;
  onChange: (clip: string | null) => void;
  disabled?: boolean;
}) {
  const [recording, setRecording] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const hasClip = typeof value === "string" && value.length > 0;

  async function startRecording() {
    if (disabled || busy) return;
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        if (blob.size > MAX_VOICE_BYTES) {
          setError("Đoạn ghi quá dài — hãy ghi ngắn hơn (dưới ~15 giây).");
          setBusy(false);
          return;
        }
        try {
          onChange(await blobToDataUrl(blob));
        } catch {
          setError("Không xử lý được đoạn ghi.");
        }
        setBusy(false);
      };
      recorderRef.current = recorder;
      recorder.start();
      setRecording(true);
    } catch {
      setError("Không truy cập được micro. Hãy cho phép quyền micro cho trình duyệt.");
    }
  }

  function stopRecording() {
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      setBusy(true);
      recorder.stop();
    }
    setRecording(false);
  }

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setError(null);
    if (file.size > MAX_VOICE_BYTES) {
      setError("File quá lớn — hãy chọn đoạn ghi ngắn (dưới ~900KB).");
      return;
    }
    try {
      onChange(await blobToDataUrl(file));
    } catch {
      setError("Không đọc được file âm thanh.");
    }
  }

  function playPreview() {
    if (!hasClip) return;
    const audio = audioRef.current ?? new Audio();
    audioRef.current = audio;
    audio.src = value as string;
    void audio.play().catch(() => setError("Trình duyệt không phát được đoạn này."));
  }

  return (
    <div className="rounded-[18px] bg-lavender p-4">
      <div className="flex flex-wrap items-center gap-3">
        {recording ? (
          <button
            type="button"
            onClick={stopRecording}
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
          >
            <Square className="h-4 w-4" />
            Dừng ghi
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void startRecording()}
            disabled={disabled || busy}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            <Mic className="h-4 w-4" />
            {busy ? "Đang lưu..." : hasClip ? "Ghi lại" : "Ghi âm"}
          </button>
        )}

        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
          <Upload className="h-4 w-4" />
          Tải lên
          <input
            type="file"
            accept="audio/*"
            className="hidden"
            disabled={disabled}
            onChange={(event) => void handleUpload(event)}
          />
        </label>

        {hasClip ? (
          <>
            <button
              type="button"
              onClick={playPreview}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <Play className="h-4 w-4" />
              Nghe thử
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" />
              Xoá
            </button>
          </>
        ) : null}
      </div>

      <p className="mt-3 text-sm font-medium text-slate-500">
        {recording
          ? "🔴 Đang ghi... nói lời nhắc bằng giọng của bạn rồi bấm Dừng ghi."
          : hasClip
            ? "✓ Đã có giọng gia đình — Kiosk sẽ phát giọng này khi nhắc, thay cho giọng máy."
            : "Chưa có giọng — Kiosk dùng giọng máy (TTS). Ghi âm hoặc tải lên để cụ nghe giọng người thân."}
      </p>
      {error ? <p className="mt-2 text-sm font-semibold text-red-600">{error}</p> : null}
    </div>
  );
}

const ACTIVITY_META = {
  danger: {
    Icon: ShieldAlert,
    label: "Khẩn cấp",
    source: "Cảnh báo hệ thống",
    dotBg: "bg-[#ffe1e1]",
    dotText: "text-[#c91818]",
    border: "border-[#ffd0d0]",
    bg: "bg-[#fff6f6]",
    pill: "bg-[#ffd6d6] text-[#c91818]",
  },
  warning: {
    Icon: MapPinned,
    label: "Vị trí",
    source: "Theo dõi định vị",
    dotBg: "bg-[#fff0cf]",
    dotText: "text-[#b97400]",
    border: "border-[#ffe6b0]",
    bg: "bg-[#fffdf5]",
    pill: "bg-[#fff3cd] text-[#b97400]",
  },
  success: {
    Icon: CheckCircle2,
    label: "Hoàn thành",
    source: "Từ Kiosk của cụ",
    dotBg: "bg-[#e2f5e6]",
    dotText: "text-action",
    border: "border-[#cdeecd]",
    bg: "bg-[#f7fdf8]",
    pill: "bg-[#e9f6eb] text-action",
  },
  info: {
    Icon: BellRing,
    label: "Hoạt động",
    source: "Hệ thống",
    dotBg: "bg-[#e6ecff]",
    dotText: "text-brand",
    border: "border-slate-200/80",
    bg: "bg-lavender",
    pill: "bg-white text-slate-700",
  },
} as const;

// "Không phản hồi" cũng là level warning như cảnh báo vị trí, nên phải tách
// riêng theo `kind` để không bị gắn nhầm nhãn/icon định vị.
const NO_RESPONSE_META = {
  Icon: Clock3,
  label: "Không phản hồi",
  source: "Cụ chưa xác nhận",
  dotBg: "bg-[#ffe8d6]",
  dotText: "text-[#c2410c]",
  border: "border-[#fed7aa]",
  bg: "bg-[#fff8f3]",
  pill: "bg-[#ffe0c7] text-[#c2410c]",
} as const;

function activityMeta(item: AlertFeedItem) {
  if (item.kind === "no_response") return NO_RESPONSE_META;
  return ACTIVITY_META[item.level] ?? ACTIVITY_META.info;
}

function ActivityFeedCard({
  feedItems,
  onReset,
}: {
  feedItems: AlertFeedItem[];
  onReset: () => void;
}) {
  return (
    <section className="card-shell p-4 sm:p-5 lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Alerts Timeline</h2>
            {feedItems.length > 0 ? (
              <span className="pill-button bg-[#eef2ff] text-[#3558c8]">{feedItems.length} sự kiện</span>
            ) : null}
          </div>
          <p className="mt-2 text-base font-medium text-slate-600 sm:text-[16px]">
            Nhật ký hoạt động &amp; cảnh báo theo thời gian thực.
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-base font-bold text-slate-700 transition hover:bg-slate-50"
        >
          <Trash2 className="h-5 w-5" />
          Reset
        </button>
      </div>

      <div className="mt-6">
        {feedItems.length === 0 ? (
          <div className="info-box flex items-center gap-3">
            <BellRing className="h-6 w-6 shrink-0 text-slate-400" />
            <p className="text-lg font-semibold text-slate-500">Chưa có cảnh báo nào.</p>
          </div>
        ) : (
          <ol className="relative space-y-4">
            {feedItems.length > 1 ? (
              <span
                aria-hidden
                className="pointer-events-none absolute left-[21px] top-6 bottom-6 w-0.5 bg-slate-200"
              />
            ) : null}
            {feedItems.map((item) => {
              const meta = activityMeta(item);
              const Icon = meta.Icon;
              return (
                <li key={item.id} className="relative flex gap-4">
                  <span
                    className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-4 ring-white ${meta.dotBg} ${meta.dotText}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className={`flex-1 rounded-[20px] border ${meta.border} ${meta.bg} px-5 py-4`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className={`pill-button ${meta.pill}`}>{meta.label}</span>
                        <span className="text-sm font-semibold text-slate-500">{meta.source}</span>
                      </div>
                      <span className="whitespace-nowrap text-sm font-semibold text-slate-500">
                        {item.timestampLabel}
                      </span>
                    </div>
                    <p className="mt-2 text-xl font-extrabold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-base font-medium text-slate-600">{item.message}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
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

// ─────────────────────────────────────────────────────────────────────────────
// Shared skeleton primitives
// ─────────────────────────────────────────────────────────────────────────────
function Sk({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-[14px] bg-slate-200 ${className ?? ""}`} />;
}

function SkCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`card-shell p-5 sm:p-6 ${className ?? ""}`}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Home tab skeleton — mirrors StatusCard, SafetyMapCard, CompletedTasksCard
// ─────────────────────────────────────────────────────────────────────────────
function SkeletonHome() {
  return (
    <>
      {/* Heading */}
      <section className="space-y-3">
        <Sk className="h-4 w-20" />
        <Sk className="h-10 w-72 rounded-[18px]" />
        <Sk className="h-5 w-96" />
      </section>

      {/* StatusCard */}
      <SkCard>
        <div className="flex items-center gap-5">
          <Sk className="h-20 w-20 shrink-0 rounded-full" />
          <div className="flex-1 space-y-3">
            <Sk className="h-8 w-56" />
            <Sk className="h-5 w-40" />
          </div>
          <Sk className="h-8 w-24 rounded-full" />
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="info-box space-y-3">
              <Sk className="h-9 w-9 rounded-full" />
              <Sk className="h-4 w-20" />
              <Sk className="h-6 w-28" />
            </div>
          ))}
        </div>
      </SkCard>

      {/* SafetyMapCard + TrackerAlertsCard */}
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SkCard>
          <Sk className="h-7 w-40" />
          <Sk className="mt-2 h-5 w-64" />
          <Sk className="mt-6 h-[220px] w-full rounded-[20px]" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Sk className="h-20 rounded-[20px]" />
            <Sk className="h-20 rounded-[20px]" />
          </div>
        </SkCard>
        <SkCard>
          <Sk className="h-7 w-40" />
          <div className="mt-5 space-y-3">
            {[1, 2, 3].map((i) => (
              <Sk key={i} className="h-16 rounded-[18px]" />
            ))}
          </div>
        </SkCard>
      </section>

      {/* CompletedTasksCard + UpcomingTaskCard */}
      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <SkCard>
          <Sk className="h-7 w-44" />
          <div className="mt-5 space-y-3">
            {[1, 2, 3].map((i) => (
              <Sk key={i} className="h-14 rounded-[18px]" />
            ))}
          </div>
        </SkCard>
        <SkCard>
          <Sk className="h-7 w-44" />
          <div className="mt-5 space-y-3">
            <Sk className="h-5 w-52" />
            <Sk className="h-12 w-36 rounded-[18px]" />
          </div>
        </SkCard>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Manage tab skeleton — mirrors TagStatusCard, ActivityFeedCard, RoutineCards
// ─────────────────────────────────────────────────────────────────────────────
function SkeletonManage() {
  return (
    <section className="space-y-6">
      {/* Page heading */}
      <SkCard>
        <Sk className="h-4 w-16" />
        <Sk className="mt-2 h-9 w-72 rounded-[18px]" />
        <Sk className="mt-3 h-5 w-full max-w-xl" />
      </SkCard>

      {/* BLE Tags + Activity Feed */}
      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <SkCard>
          <Sk className="h-7 w-40" />
          <Sk className="mt-2 h-5 w-64" />
          <Sk className="mt-6 h-28 w-full rounded-[20px]" />
          <div className="mt-6 space-y-3">
            {[1, 2].map((i) => (
              <Sk key={i} className="h-20 rounded-[20px]" />
            ))}
          </div>
        </SkCard>
        <SkCard>
          <Sk className="h-7 w-40" />
          <div className="mt-5 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Sk key={i} className="h-16 rounded-[18px]" />
            ))}
          </div>
        </SkCard>
      </section>

      {/* Routine cards */}
      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <Sk className="h-8 w-52 rounded-[18px]" />
          <Sk className="h-5 w-20" />
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <SkCard key={i}>
              <div className="flex flex-wrap items-center gap-3">
                <Sk className="h-8 w-24 rounded-full" />
                <Sk className="h-8 w-20 rounded-full" />
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <Sk className="h-6 w-48" />
                <Sk className="h-6 w-20" />
              </div>
              <Sk className="mt-5 h-14 w-full rounded-[18px]" />
            </SkCard>
          ))}
        </div>
      </section>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Demo Simulation Panel — controls to simulate Geofence breaches and heart rate alerts
// ─────────────────────────────────────────────────────────────────────────────
function SimulationPanel({
  elder,
  onSimulateLocation,
  onSimulateHeartRate,
  onResetSimulation,
}: {
  elder: any;
  onSimulateLocation: (status: "in_home" | "out_of_home") => Promise<void>;
  onSimulateHeartRate: (bpm: number, label: "Normal" | "High" | "Low") => Promise<void>;
  onResetSimulation: () => Promise<void>;
}) {
  const isOverride = elder.vitals?.isOverride === true;
  const currentBpm = elder.vitals?.heartRateBpm ?? 72;

  return (
    <section className="card-shell p-5 sm:p-6 border-2 border-dashed border-active/40 bg-lavender/40 space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>🎮</span> Demo Simulation Panel
          </h2>
          <p className="text-sm font-semibold text-slate-500 mt-1">
            Use these controls during pitching to simulate real-time patient alerts and vitals warnings.
          </p>
        </div>
        {isOverride && (
          <button
            type="button"
            onClick={() => void onResetSimulation()}
            className="rounded-full bg-active text-white px-4 py-2 text-xs font-bold shadow-sm hover:bg-[#7a5df0] transition shrink-0"
          >
            Reset Override
          </button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 pt-2">
        {/* Location Status */}
        <div className="space-y-3">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Geofence zone (Location)
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => void onSimulateLocation("in_home")}
              className={`flex-1 py-3 px-4 rounded-[18px] font-bold text-sm transition ${
                elder.status === "in_home"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              🏠 In Home (Safe)
            </button>
            <button
              type="button"
              onClick={() => void onSimulateLocation("out_of_home")}
              className={`flex-1 py-3 px-4 rounded-[18px] font-bold text-sm transition ${
                elder.status !== "in_home"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              🚶 Wander Alert
            </button>
          </div>
        </div>

        {/* Heart Rate Vitals */}
        <div className="space-y-3">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Vitals Status (Heart Rate - bpm)
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => void onSimulateHeartRate(72, "Normal")}
              className={`flex-1 py-3 px-2 rounded-[18px] font-bold text-sm transition ${
                isOverride && currentBpm === 72
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              🟢 72 (Normal)
            </button>
            <button
              type="button"
              onClick={() => void onSimulateHeartRate(120, "High")}
              className={`flex-1 py-3 px-2 rounded-[18px] font-bold text-sm transition ${
                isOverride && currentBpm === 120
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-white text-rose-700 border border-rose-200 hover:bg-rose-50"
              }`}
            >
              🔴 120 (High)
            </button>
            <button
              type="button"
              onClick={() => void onSimulateHeartRate(45, "Low")}
              className={`flex-1 py-3 px-2 rounded-[18px] font-bold text-sm transition ${
                isOverride && currentBpm === 45
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-blue-700 border border-blue-200 hover:bg-blue-50"
              }`}
            >
              🔵 45 (Low)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
