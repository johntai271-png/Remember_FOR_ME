import type { ReactNode } from "react";
import {
  CheckCircle2,
  Clock3,
  HeartPulse,
  House,
  Play,
  Save,
  ShieldAlert,
} from "lucide-react";

import { InfoBox } from "../components/common";
import type { Routine, ViewMode } from "../types";
import { formatClock, formatRelativeTime, formatTimestamp } from "../utils";

export function HomeScreen({
  elder,
  kiosk,
  routines,
  trackerAlert,
  onAddNew,
  onModeChange,
  onFieldChange,
  onTrigger,
  onSave,
  onOpenEmergency,
}: {
  elder: any;
  kiosk: any;
  routines: Routine[];
  trackerAlert: any;
  onAddNew: () => void;
  onModeChange: (id: string, mode: ViewMode) => void;
  onFieldChange: <K extends keyof Routine>(id: string, key: K, value: Routine[K]) => void;
  onTrigger: (id: string) => void;
  onSave: (id: string) => void;
  onOpenEmergency: () => void;
}) {
  return (
    <>
      <section className="space-y-3">
        <p className="text-lg font-semibold text-slate-600">Welcome back,</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[58px]">
          {elder.caregiverGreeting || "Good morning, Sarah"}
        </h1>
      </section>

      <StatusCard elder={elder} kiosk={kiosk} />

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Manage Routines
          </h2>
          <button
            type="button"
            onClick={onAddNew}
            className="text-lg font-bold text-brand transition hover:text-blue-700"
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

      <TrackerAlertsCard trackerAlert={trackerAlert} />

      <EmergencySection onOpenModal={onOpenEmergency} />
    </>
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
    <section className="card-shell p-6 sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-center gap-5">
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23d9e8d2'/%3E%3Cstop offset='100%25' stop-color='%23eef2ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='160' height='160' rx='80' fill='url(%23bg)' /%3E%3Ccircle cx='80' cy='60' r='28' fill='%23fff7ef' /%3E%3Cpath d='M42 136c8-24 24-36 38-36s30 12 38 36' fill='%23fff7ef' /%3E%3Crect x='4' y='4' width='152' height='152' rx='76' fill='none' stroke='%238b6cff' stroke-width='8'/%3E%3C/svg%3E"
            alt={elder.name || elder.displayName || "Mom Eleanor"}
            className={`h-20 w-20 rounded-full border-4 object-cover sm:h-24 sm:w-24 ${
              elder.status === "in_home" ? "border-active" : "border-slate-300"
            }`}
          />
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-[52px] lg:text-[42px]">
              {elder.name || elder.displayName || "Mom (Eleanor)"}
            </h2>
            <p className="mt-1 text-2xl font-medium text-slate-600 sm:text-[32px] lg:text-[24px]">
              {isKioskOnline ? "Home Monitoring Active" : "Home Monitoring Inactive"}
            </p>
          </div>
        </div>

        <div
          className={`pill-button gap-2 text-[15px] font-extrabold uppercase tracking-wide ${
            isKioskOnline ? "bg-[#97f3a8] text-[#106228]" : "bg-slate-200 text-slate-600"
          }`}
        >
          <span
            className={`h-3 w-3 rounded-full ${isKioskOnline ? "bg-[#106228]" : "bg-slate-600"}`}
          />
          {isKioskOnline ? "LIVE" : "OFFLINE"}
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
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
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex items-center gap-3 text-lg font-semibold text-slate-700 sm:text-[18px]">
          <HeartPulse className="h-6 w-6 text-active" />
          Vitals: {vitalsStatus}
          {heartRate != null ? ` (${heartRate} bpm)` : ""}
        </div>
        <button type="button" className="text-xl font-extrabold text-brand transition hover:text-blue-700">
          View Map &gt;
        </button>
      </div>
    </section>
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
    <article className="card-shell p-5 sm:p-6 lg:p-8">
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
          <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr_120px]">
            <FieldGroup
              label="Name"
              input={
                <input
                  value={routine.name}
                  onChange={(event) => onFieldChange(routine.id, "name", event.target.value)}
                  disabled={isRunning}
                  className="h-20 w-full rounded-[20px] bg-lavender px-6 text-[22px] font-medium text-slate-800 outline-none ring-0 placeholder:text-slate-400 disabled:opacity-60"
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
                  className="h-20 w-full rounded-[20px] bg-lavender px-6 text-[22px] font-medium text-slate-800 outline-none ring-0 placeholder:text-slate-400 disabled:opacity-60"
                />
              }
            />
            <FieldGroup
              label="Auto run"
              input={
                <div className="flex h-20 items-center justify-center rounded-[20px] bg-lavender">
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
      className={`inline-flex min-h-[72px] items-center justify-center gap-3 rounded-[20px] bg-action px-6 text-2xl font-semibold text-white transition hover:bg-[#0f622b] disabled:cursor-not-allowed disabled:opacity-50 ${
        fullWidth ? "w-full" : "w-full"
      }`}
    >
      <Icon className="h-7 w-7" />
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
    <section className="card-shell p-5 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Tracker Alerts</h2>
          <p className="mt-2 text-xl font-medium text-slate-600 sm:text-[18px]">
            Wrist tracker pushes alerts for abnormal heart rate or inactivity.
          </p>
        </div>
        <span className={`pill-button ${active ? "bg-[#ffd6d6] text-[#c91818]" : "bg-[#e9f6eb] text-action"}`}>
          {active ? "Alert" : "Normal"}
        </span>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <InfoBox label="Latest event" value={formatAlertType(trackerAlert.type)} icon={null} />
        <InfoBox label="Source" value={trackerAlert.source || "Tracker"} icon={null} />
        <div className="info-box lg:col-span-2">
          <p className="text-xl font-medium text-slate-600 sm:text-[18px]">Updated</p>
          <p className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-[22px]">
            {trackerAlert.updatedAt ? formatTimestamp(new Date(trackerAlert.updatedAt)) : "No events yet"}
          </p>
        </div>
      </div>

      <p className="mt-6 text-lg font-medium text-slate-700">
        {active ? trackerAlert.message || "Tracker has detected an issue." : "No active tracker alert."}
      </p>
    </section>
  );
}

function EmergencySection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="card-shell border-[#f4b5b5] bg-[#ffd6d6] p-5 shadow-card sm:p-6 lg:p-8">
      <h2 className="text-3xl font-extrabold text-[#a50f0f] sm:text-4xl">Need Immediate Attention?</h2>
      <p className="mt-3 text-xl font-medium text-[#bf4f4f] sm:text-[18px]">
        Connecting you directly with emergency services and local responders.
      </p>
      <button
        type="button"
        onClick={onOpenModal}
        className="mt-8 inline-flex min-h-[88px] w-full items-center justify-center gap-3 rounded-full bg-[#c91818] px-8 text-2xl font-semibold text-white transition hover:bg-[#b11212]"
      >
        <ShieldAlert className="h-7 w-7" />
        Send Emergency Alert
      </button>
    </section>
  );
}
