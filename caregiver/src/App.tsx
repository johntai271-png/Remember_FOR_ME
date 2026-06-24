import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CheckCircle2,
  Clock3,
  HeartPulse,
  History,
  Home,
  House,
  Play,
  Save,
  Settings,
  ShieldAlert,
  X,
} from "lucide-react";
import { subscribeToPath, updatePath, transactTask } from "./firebase";

type RoutineStatus = "Completed" | "Pending" | "Running";
type ViewMode = "view" | "edit";

type Routine = {
  id: string;
  name: string;
  time: string;
  autoRun: boolean;
  status: RoutineStatus;
  note: string;
  updatedAt?: string | number;
  mode: ViewMode;
};

type ToastState = {
  id: number;
  message: string;
};

const caregiverAvatar = createAvatarSvg("#1d5bd8", "#f0d1c3", "#5ca2ff");
const elderAvatar = createAvatarSvg("#8b6cff", "#d9e8d2", "#eef2ff");

export default function App() {
  const [elder, setElder] = useState<any>({
    name: "Ngoai",
    displayName: "Mom (Eleanor)",
    caregiverGreeting: "Good morning, Sarah",
    status: "in_home",
    locationLabel: "In Home",
    lastSeenAt: Date.now() - 2 * 60 * 1000,
    vitals: {
      status: "Normal",
      heartRateBpm: 72,
    },
  });

  const [kiosk, setKiosk] = useState<any>({
    online: false,
    lastHeartbeatAt: null,
    volumeForced: false,
  });

  const [trackerAlert, setTrackerAlert] = useState<any>({
    is_active: false,
    type: null,
    source: "Tracker",
    message: null,
    severity: "normal",
    updatedAt: null,
    safeZoneStatus: "inside",
  });

  const [routines, setRoutines] = useState<Routine[]>([]);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  // Sync with Firebase Database
  useEffect(() => {
    const unsubElder = subscribeToPath("elder", (snapshot) => {
      const val = snapshot.val();
      if (val) setElder(val);
    });

    const unsubKiosk = subscribeToPath("kiosk", (snapshot) => {
      const val = snapshot.val();
      if (val) setKiosk(val);
    });

    const unsubTracker = subscribeToPath("tracker_alert", (snapshot) => {
      const val = snapshot.val();
      if (val) setTrackerAlert(val);
    });

    const unsubTasks = subscribeToPath("tasks", (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.entries(data).map(([id, val]: [string, any]) => {
        return {
          id,
          name: val.name || "Untitled task",
          time: val.scheduled_time || "09:00",
          autoRun: !!val.is_auto,
          status: (val.status as RoutineStatus) || "Pending",
          note: formatTaskNote(val),
          updatedAt: val.updatedAt || val.completedAt || val.lastTriggeredAt || undefined,
        };
      });

      // Sort by time
      list.sort((a, b) => a.time.localeCompare(b.time));

      setRoutines((prev) => {
        return list.map((item) => {
          const existing = prev.find((r) => r.id === item.id);
          return {
            ...item,
            mode: existing ? existing.mode : "view",
          } as Routine;
        });
      });
    });

    return () => {
      unsubElder();
      unsubKiosk();
      unsubTracker();
      unsubTasks();
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const completedCount = useMemo(
    () => routines.filter((routine) => routine.status === "Completed").length,
    [routines],
  );

  const handleTrigger = async (id: string) => {
    const routine = routines.find((r) => r.id === id);
    if (!routine) return;

    try {
      const { committed } = await transactTask(id, (currentTask) => {
        if (!currentTask) return currentTask;
        if (currentTask.status === "Running") {
          return currentTask;
        }

        return {
          ...currentTask,
          status: "Running",
          lastTriggeredAt: Date.now(),
          completedAt: null,
          updatedAt: Date.now(),
          triggerMode: "manual",
        };
      });

      if (!committed) {
        pushToast(`Routine ${routine.name} is already running.`);
        return;
      }

      pushToast(`Triggered ${routine.name}.`);

      // Bridge to Flutter kiosk reminders (morning/noon/evening)
      let reminderKey = "";
      const lowerName = routine.name.toLowerCase();
      if (id === "task_001" || id === "routine-1" || lowerName.includes("morning")) {
        reminderKey = "morning";
      } else if (id === "task_002" || id === "routine-2" || lowerName.includes("lunch") || lowerName.includes("noon")) {
        reminderKey = "noon";
      } else if (id === "task_003" || id === "routine-3" || lowerName.includes("evening") || lowerName.includes("night")) {
        reminderKey = "evening";
      } else {
        // Fallback: choose morning
        reminderKey = "morning";
      }

      if (reminderKey) {
        await updatePath(`reminders/${reminderKey}`, {
          is_triggered: true,
          triggeredAt: Date.now(),
          text: routine.name,
          time: routine.time,
        });
      }

      // Wait to simulate running delay
      await new Promise((resolve) => setTimeout(resolve, 1400));

      // Mark completed
      await updatePath(`tasks/${id}`, {
        status: "Completed",
        completedAt: Date.now(),
        updatedAt: Date.now(),
        triggerMode: "manual",
      });
    } catch (error) {
      console.error(error);
      pushToast(`Failed to trigger ${routine.name}.`);
    }
  };

  const handleFieldChange = <K extends keyof Routine>(id: string, key: K, value: Routine[K]) => {
    setRoutines((current) =>
      current.map((routine) => (routine.id === id ? { ...routine, [key]: value } : routine)),
    );
  };

  const handleSave = async (id: string) => {
    const routine = routines.find((r) => r.id === id);
    if (!routine) return;

    if (!routine.name.trim() || !routine.time) {
      pushToast("Task name and time are required.");
      return;
    }

    try {
      await updatePath(`tasks/${id}`, {
        name: routine.name.trim(),
        scheduled_time: routine.time,
        is_auto: routine.autoRun,
        updatedAt: Date.now(),
      });

      setRoutines((current) =>
        current.map((r) => (r.id === id ? { ...r, mode: "view" } : r))
      );
      pushToast("Routine saved.");
    } catch (error) {
      console.error(error);
      pushToast("Failed to save routine.");
    }
  };

  const handleModeChange = (id: string, mode: ViewMode) => {
    setRoutines((current) =>
      current.map((routine) => (routine.id === id ? { ...routine, mode } : routine)),
    );
  };

  const handleAddNew = async () => {
    const nextId = `task_${String(Date.now()).slice(-6)}`;
    const newTask = {
      name: `New routine ${routines.length + 1}`,
      scheduled_time: "09:00",
      is_auto: false,
      status: "Pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      lastTriggeredAt: null,
      completedAt: null,
      triggerMode: null,
    };

    try {
      await updatePath(`tasks/${nextId}`, newTask);
      pushToast("New routine added.");
    } catch (error) {
      console.error(error);
      pushToast("Failed to add routine.");
    }
  };

  const handleBell = () => {
    pushToast("No new notifications.");
  };

  const handleSendEmergency = async () => {
    setShowEmergencyModal(false);
    try {
      // Trigger both path triggers for kiosk speaker integration and logging
      await updatePath("emergency", {
        is_triggered: true,
        triggeredAt: Date.now(),
        message: "Ngoại ơi, con đang gọi. Xin hãy nhìn vào màn hình.",
      });

      await updatePath("emergency_request", {
        is_active: true,
        triggeredAt: Date.now(),
        source: "caregiver_web",
      });

      pushToast("Emergency services contacted.");
    } catch (error) {
      console.error(error);
      pushToast("Failed to contact emergency services.");
    }
  };

  const pushToast = (message: string) => {
    setToast({
      id: Date.now(),
      message,
    });
  };

  return (
    <div className="min-h-screen bg-shell text-slate-900">
      <div className="mx-auto w-full max-w-[1720px] px-4 pb-32 pt-4 sm:px-6 lg:px-8 lg:pt-6">
        <Header onBellClick={handleBell} />

        <main className="space-y-8">
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
                onClick={handleAddNew}
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
                  onModeChange={handleModeChange}
                  onFieldChange={handleFieldChange}
                  onTrigger={handleTrigger}
                  onSave={handleSave}
                  completedCount={completedCount}
                />
              ))}
            </div>
          </section>

          <TrackerAlertsCard trackerAlert={trackerAlert} />

          <EmergencySection onOpenModal={() => setShowEmergencyModal(true)} />
        </main>
      </div>

      <BottomNavigation />

      {toast ? <Toast message={toast.message} onDismiss={() => setToast(null)} /> : null}

      {showEmergencyModal ? (
        <ConfirmationModal
          title="Send emergency alert?"
          body="This will notify emergency services and local responders immediately."
          confirmLabel="Send Alert"
          onCancel={() => setShowEmergencyModal(false)}
          onConfirm={handleSendEmergency}
        />
      ) : null}
    </div>
  );
}

function Header({ onBellClick }: { onBellClick: () => void }) {
  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 sm:gap-5">
        <img
          src={caregiverAvatar}
          alt="Caregiver avatar"
          className="h-12 w-12 rounded-full border-[3px] border-brand object-cover sm:h-16 sm:w-16"
        />
        <div className="text-[34px] font-black tracking-tight text-brand sm:text-[52px] lg:text-[68px]">
          Remember.For.Me
        </div>
      </div>

      <button
        type="button"
        onClick={onBellClick}
        className="rounded-full p-3 text-brand transition hover:bg-white/70"
        aria-label="Notifications"
      >
        <Bell className="h-7 w-7 stroke-[2.2]" />
      </button>
    </header>
  );
}

function StatusCard({ elder, kiosk }: { elder: any; kiosk: any }) {
  const recentHeartbeat = kiosk.lastHeartbeatAt && Date.now() - kiosk.lastHeartbeatAt < 30000;
  const isKioskOnline = kiosk.online && recentHeartbeat;

  const locationLabel = elder.locationLabel || (elder.status === "in_home" ? "In Home" : "Out of Home");
  const relativeTime = elder.lastSeenAt ? formatRelativeTime(elder.lastSeenAt) : "No recent data";
  const heartRate = elder.vitals?.heartRateBpm || 72;
  const vitalsStatus = elder.vitals?.status || "Normal";

  return (
    <section className="card-shell p-6 sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-center gap-5">
          <img
            src={elderAvatar}
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

        <div className={`pill-button gap-2 text-[15px] font-extrabold uppercase tracking-wide ${
          isKioskOnline 
            ? "bg-[#97f3a8] text-[#106228]" 
            : "bg-slate-200 text-slate-600"
        }`}>
          <span className={`h-3 w-3 rounded-full ${isKioskOnline ? "bg-[#106228]" : "bg-slate-600"}`} />
          {isKioskOnline ? "LIVE" : "OFFLINE"}
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <InfoBox
          icon={<House className="h-9 w-9 text-action" />}
          label="Current Location"
          value={
            <span className="inline-flex items-center gap-3 text-action">
              <span className={`h-6 w-6 rounded-full bg-gradient-to-b ${
                elder.status === "in_home" 
                  ? "from-[#39d435] to-[#179420] shadow-[0_2px_8px_rgba(43,160,47,0.45)]" 
                  : "from-red-400 to-red-600 shadow-[0_2px_8px_rgba(220,38,38,0.45)]"
              }`} />
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
          Vitals: {vitalsStatus} ({heartRate} bpm)
        </div>
        <button type="button" className="text-xl font-extrabold text-brand transition hover:text-blue-700">
          View Map &gt;
        </button>
      </div>
    </section>
  );
}

function InfoBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <article className="info-box min-h-[140px] sm:min-h-[160px]">
      {icon ? <div className="mb-3">{icon}</div> : null}
      <div className="space-y-1">
        <p className="text-xl font-medium text-slate-600 sm:text-[18px]">{label}</p>
        <div className="text-2xl font-extrabold text-slate-900 sm:text-[22px]">{value}</div>
      </div>
    </article>
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
  completedCount: number;
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
              <span className="h-5 w-5 inline-flex items-center justify-center font-bold">◔</span>
            ) : (
              <Clock3 className="h-5 w-5" />
            )}
            {routine.status}
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <span className="text-base font-medium text-slate-600 sm:text-[18px]">
            {routine.note}
          </span>
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

function FieldGroup({ label, input }: { label: string; input: React.ReactNode }) {
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
    <div className="inline-flex rounded-full bg-[#eef0ff] p-1 shadow-sm opacity-100 disabled:opacity-60">
      {(["view", "edit"] as const).map((item) => {
        const active = item === mode;
        return (
          <button
            key={item}
            type="button"
            disabled={disabled}
            onClick={() => onChange(item)}
            className={`rounded-full px-5 py-2 text-lg font-bold transition disabled:cursor-not-allowed ${
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
      className={`inline-flex min-h-[72px] items-center justify-center gap-3 rounded-[20px] bg-action px-6 text-2xl font-semibold text-white transition hover:bg-[#0f622b] disabled:opacity-50 disabled:cursor-not-allowed ${
        fullWidth ? "w-full" : "w-full"
      }`}
    >
      <Icon className="h-7 w-7" />
      {label}
    </button>
  );
}

function TrackerAlertsCard({ trackerAlert }: { trackerAlert: any }) {
  const active = trackerAlert.is_active === true || trackerAlert.is_active === "true" || trackerAlert.is_active === "True";
  
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
        {active ? (trackerAlert.message || "Tracker has detected an issue.") : "No active tracker alert."}
      </p>
    </section>
  );
}

function EmergencySection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="card-shell border-[#f4b5b5] bg-[#ffd6d6] p-5 shadow-card sm:p-6 lg:p-8">
      <h2 className="text-3xl font-extrabold text-[#a50f0f] sm:text-4xl">
        Need Immediate Attention?
      </h2>
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

function BottomNavigation() {
  const tabs = [
    { label: "Home", icon: Home, active: true },
    { label: "History", icon: History, active: false },
    { label: "Settings", icon: Settings, active: false },
  ];

  return (
    <>
      <nav className="fixed inset-x-3 bottom-0 z-40 rounded-t-[28px] border border-white/80 bg-white/95 px-4 pb-5 pt-4 shadow-[0_-10px_30px_rgba(28,39,72,0.08)] backdrop-blur sm:inset-x-8">
        <div className="mx-auto grid max-w-[1720px] grid-cols-3 gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              className={`flex flex-col items-center justify-center gap-1 rounded-full px-4 py-3 text-lg font-semibold ${
                tab.active ? "text-[#351898]" : "text-slate-600"
              }`}
            >
              <span
                className={`inline-flex h-14 min-w-[110px] items-center justify-center gap-2 rounded-full px-6 ${
                  tab.active ? "bg-active/85 text-[#351898]" : "bg-transparent"
                }`}
              >
                <tab.icon className="h-7 w-7" />
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      <button
        type="button"
        aria-label="Help"
        className="fixed bottom-4 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#2a2a2a] text-3xl font-medium text-white shadow-xl"
      >
        ?
      </button>
    </>
  );
}

function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div className="fixed bottom-28 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 rounded-2xl bg-slate-900 px-5 py-4 text-base font-medium text-white shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <span>{message}</span>
        <button type="button" onClick={onDismiss} className="text-white/70 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function ConfirmationModal({
  title,
  body,
  confirmLabel,
  onCancel,
  onConfirm,
}: {
  title: string;
  body: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4">
      <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl sm:p-8">
        <h3 className="text-3xl font-extrabold text-slate-900">{title}</h3>
        <p className="mt-3 text-lg text-slate-600">{body}</p>
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-200 px-6 py-3 text-lg font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-[#c91818] px-6 py-3 text-lg font-semibold text-white transition hover:bg-[#b11212]"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function createAvatarSvg(stroke: string, fillA: string, fillB: string) {
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

function formatTimestamp(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatRelativeTime(timestamp: number) {
  if (!timestamp) return "No recent data";
  const diffMinutes = Math.max(1, Math.round((Date.now() - timestamp) / 60000));
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  }
  const diffHours = Math.round(diffMinutes / 60);
  return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
}

function formatClock(timeValue: string) {
  if (!timeValue) return "--:--";
  const [hourText = "0", minuteText = "0"] = timeValue.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${String(displayHour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${period}`;
}

function formatTaskNote(task: any) {
  if (task.status === "Running" && task.lastTriggeredAt) {
    return `Started at ${formatTimestamp(new Date(task.lastTriggeredAt))}`;
  }
  if (task.status === "Completed" && task.completedAt) {
    return `Completed at ${formatTimestamp(new Date(task.completedAt))}`;
  }
  return task.is_auto ? "Auto mode enabled" : "Manual mode only";
}

