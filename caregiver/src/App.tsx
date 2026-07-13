import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Filter,
  HeartPulse,
  History,
  Home,
  House,
  Info,
  Play,
  Save,
  Settings,
  ShieldAlert,
  Siren,
  Sparkles,
  X,
} from "lucide-react";
import {
  createRoutine,
  isBackendConfigured,
  loadBackendSnapshot,
  resolveAlert,
  saveRoutine,
  triggerRoutine,
  type BackendAlert,
  type BackendRoutine,
  type BackendTimelineEvent,
} from "./backend";

type RoutineStatus = BackendRoutine["status"];
type ViewMode = "view" | "edit";
type EscalationAction = BackendRoutine["escalationPolicy"]["steps"][number]["action"];
type EscalationTemplate = "Gentle" | "Standard" | "High attention" | "Custom";

type EscalationStep = {
  delayMinutes: number;
  action: EscalationAction;
};

type EscalationPolicy = {
  enabled: boolean;
  template: EscalationTemplate;
  steps: EscalationStep[];
};

type Routine = {
  id: string;
  name: string;
  time: string;
  autoRun: boolean;
  status: RoutineStatus;
  note: string;
  updatedAt?: string;
  mode: ViewMode;
  caregiverInstructions?: string;
  category?: "Medication" | "Wellness" | "Check-in";
  escalationPolicy: EscalationPolicy;
};

type CaregiverAlert = BackendAlert;

type ToastState = {
  id: number;
  message: string;
};

type AppTab = "home" | "history" | "settings";

type TimelineEventType =
  | "TASK_CREATED"
  | "REMINDER_SCHEDULED"
  | "REMINDER_SHOWN"
  | "REMINDER_REPEATED"
  | "VOICE_REMINDER_PLAYED"
  | "TASK_SNOOZED"
  | "TASK_COMPLETED"
  | "TASK_ALREADY_COMPLETED"
  | "HELP_REQUESTED"
  | "ESCALATION_TRIGGERED"
  | "CAREGIVER_NOTIFIED"
  | "DEVICE_OFFLINE"
  | "NO_RESPONSE";

type TimelineStatus =
  | "Confirmed complete"
  | "Reported already complete"
  | "Explicitly postponed"
  | "Help requested"
  | "No interaction recorded"
  | "Reminder may not have been seen"
  | "Device offline"
  | "Unknown";

type TimelineEvent = BackendTimelineEvent;

type TimelineFilters = {
  taskId: string;
  category: string;
  eventType: string;
  status: string;
};

type ReminderEffectiveness = {
  channel: "VISUAL" | "VOICE" | "CAREGIVER_FOLLOW_UP";
  remindersDelivered: number;
  responsesRecorded: number;
  completedAfterReminder: number;
  completionRate: number;
  medianResponseMinutes: number | null;
  helpRequestRate: number;
  snoozeRate: number;
};

type SuggestionType =
  | "USE_VOICE_REMINDER"
  | "USE_VISUAL_REMINDER"
  | "ADD_FAMILY_VOICE_MESSAGE"
  | "SHORTEN_ESCALATION_DELAY"
  | "EXTEND_ESCALATION_DELAY"
  | "NO_SUGGESTION";

type InsightSuggestion = {
  type: SuggestionType;
  title: string;
  message: string;
  evidence: Record<string, number>;
  requiresCaregiverApproval: boolean;
};

const initialRoutines: Routine[] = [
  {
    id: "task_001",
    name: "Prepare morning medicine",
    time: "08:00 AM",
    autoRun: true,
    status: "Completed earlier",
    note: "Confirmed after reminder at Jul 12, 2026 08:12 AM",
    updatedAt: "Jul 12, 2026 08:12 AM",
    mode: "edit",
    caregiverInstructions: "Blue pill first, then water.",
    category: "Medication",
    escalationPolicy: createEscalationPolicy("Standard"),
  },
  {
    id: "task_002",
    name: "Lunch & Hydration",
    time: "01:00 PM",
    autoRun: false,
    status: "Snoozed",
    note: "Snoozed for 15 minutes at Jul 12, 2026 12:58 PM",
    updatedAt: "Jul 12, 2026 12:58 PM",
    mode: "view",
    caregiverInstructions: "Please bring the orange cup.",
    category: "Wellness",
    escalationPolicy: createEscalationPolicy("Gentle"),
  },
  {
    id: "task_003",
    name: "Check evening routine",
    time: "07:00 PM",
    autoRun: true,
    status: "Needs help",
    note: "Help requested at Jul 12, 2026 07:02 PM",
    updatedAt: "Jul 12, 2026 07:02 PM",
    mode: "view",
    caregiverInstructions: "Ask if the evening medication is already on the table.",
    category: "Check-in",
    escalationPolicy: createEscalationPolicy("High attention"),
  },
];

const initialAlerts: CaregiverAlert[] = [
  {
    id: "help-evening-001",
    resident: "Mom (Eleanor)",
    taskName: "Check evening routine",
    scheduledTime: "07:00 PM",
    requestedAt: "Jul 12, 2026 07:02 PM",
    instructions: "Ask if the evening medication is already on the table.",
  },
];

const initialTimelineEvents: TimelineEvent[] = [
  {
    id: "evt-001",
    timestamp: "2026-07-12T08:00:00.000Z",
    taskId: "task_001",
    taskName: "Prepare morning medicine",
    taskCategory: "Medication",
    careRecipient: "Mom (Eleanor)",
    eventType: "REMINDER_SHOWN",
    status: "Unknown",
    source: "scheduler",
    description: "Morning medication reminder shown.",
    channel: "VISUAL",
  },
  {
    id: "evt-002",
    timestamp: "2026-07-12T08:10:00.000Z",
    taskId: "task_001",
    taskName: "Prepare morning medicine",
    taskCategory: "Medication",
    careRecipient: "Mom (Eleanor)",
    eventType: "REMINDER_REPEATED",
    status: "Unknown",
    source: "system",
    description: "Reminder repeated after no recorded response.",
    channel: "VISUAL",
    metadata: { delayMinutes: 10 },
  },
  {
    id: "evt-003",
    timestamp: "2026-07-12T08:12:00.000Z",
    taskId: "task_001",
    taskName: "Prepare morning medicine",
    taskCategory: "Medication",
    careRecipient: "Mom (Eleanor)",
    eventType: "TASK_ALREADY_COMPLETED",
    status: "Reported already complete",
    source: "care recipient",
    description: "Task marked already completed.",
    channel: "VISUAL",
    metadata: { responseDelayMinutes: 12 },
  },
  {
    id: "evt-004",
    timestamp: "2026-07-12T12:00:00.000Z",
    taskId: "task_002",
    taskName: "Lunch & Hydration",
    taskCategory: "Wellness",
    careRecipient: "Mom (Eleanor)",
    eventType: "REMINDER_SHOWN",
    status: "Unknown",
    source: "scheduler",
    description: "Lunch reminder shown.",
    channel: "VISUAL",
  },
  {
    id: "evt-005",
    timestamp: "2026-07-12T12:15:00.000Z",
    taskId: "task_002",
    taskName: "Lunch & Hydration",
    taskCategory: "Wellness",
    careRecipient: "Mom (Eleanor)",
    eventType: "TASK_SNOOZED",
    status: "Explicitly postponed",
    source: "care recipient",
    description: "Reminder postponed for 15 minutes.",
    channel: "VISUAL",
    metadata: { responseDelayMinutes: 15 },
  },
  {
    id: "evt-006",
    timestamp: "2026-07-12T19:00:00.000Z",
    taskId: "task_003",
    taskName: "Check evening routine",
    taskCategory: "Check-in",
    careRecipient: "Mom (Eleanor)",
    eventType: "REMINDER_SHOWN",
    status: "Unknown",
    source: "scheduler",
    description: "Evening routine reminder shown.",
    channel: "VISUAL",
  },
  {
    id: "evt-007",
    timestamp: "2026-07-12T19:20:00.000Z",
    taskId: "task_003",
    taskName: "Check evening routine",
    taskCategory: "Check-in",
    careRecipient: "Mom (Eleanor)",
    eventType: "VOICE_REMINDER_PLAYED",
    status: "Unknown",
    source: "system",
    description: "Voice reminder played after no response.",
    channel: "VOICE",
  },
  {
    id: "evt-008",
    timestamp: "2026-07-12T19:40:00.000Z",
    taskId: "task_003",
    taskName: "Check evening routine",
    taskCategory: "Check-in",
    careRecipient: "Mom (Eleanor)",
    eventType: "CAREGIVER_NOTIFIED",
    status: "No interaction recorded",
    source: "system",
    description: "Caregiver notified after repeated unanswered reminders.",
    channel: "CAREGIVER_FOLLOW_UP",
  },
  {
    id: "evt-009",
    timestamp: "2026-07-12T19:42:00.000Z",
    taskId: "task_003",
    taskName: "Check evening routine",
    taskCategory: "Check-in",
    careRecipient: "Mom (Eleanor)",
    eventType: "HELP_REQUESTED",
    status: "Help requested",
    source: "care recipient",
    description: "Help requested from the reminder screen.",
    channel: "CAREGIVER_FOLLOW_UP",
    metadata: { responseDelayMinutes: 42 },
  },
  {
    id: "evt-010",
    timestamp: "2026-07-11T18:10:00.000Z",
    taskId: "task_003",
    taskName: "Check evening routine",
    taskCategory: "Check-in",
    careRecipient: "Mom (Eleanor)",
    eventType: "DEVICE_OFFLINE",
    status: "Device offline",
    source: "system",
    description: "Kiosk was offline during part of the reminder window.",
  },
  {
    id: "evt-011",
    timestamp: "2026-07-11T18:20:00.000Z",
    taskId: "task_003",
    taskName: "Check evening routine",
    taskCategory: "Check-in",
    careRecipient: "Mom (Eleanor)",
    eventType: "NO_RESPONSE",
    status: "Reminder may not have been seen",
    source: "system",
    description: "No completion was recorded. The kiosk was offline during part of the reminder window.",
  },
];

const caregiverAvatar = createAvatarSvg("#1d5bd8", "#f0d1c3", "#5ca2ff");
const elderAvatar = createAvatarSvg("#8b6cff", "#d9e8d2", "#eef2ff");

export default function App() {
  const [routines, setRoutines] = useState<Routine[]>(initialRoutines);
  const [alerts, setAlerts] = useState<CaregiverAlert[]>(initialAlerts);
  const [allTimelineEvents, setAllTimelineEvents] = useState<TimelineEvent[]>(initialTimelineEvents);
  const [backendConnected, setBackendConnected] = useState(isBackendConfigured());
  const [activeTab, setActiveTab] = useState<AppTab>("home");
  const [timelineFilters, setTimelineFilters] = useState<TimelineFilters>({
    taskId: "all",
    category: "all",
    eventType: "all",
    status: "all",
  });
  const [toast, setToast] = useState<ToastState | null>(null);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    let active = true;
    loadBackendSnapshot().then((snapshot) => {
      if (!active) return;
      setRoutines(snapshot.routines);
      setAlerts(snapshot.alerts);
      setAllTimelineEvents(snapshot.timeline.length ? snapshot.timeline : initialTimelineEvents);
      setBackendConnected(snapshot.backendConnected);
    });
    return () => {
      active = false;
    };
  }, []);

  const completedCount = useMemo(
    () =>
      routines.filter(
        (routine) => routine.status === "Completed" || routine.status === "Completed earlier",
      ).length,
    [routines],
  );
  const timelineEvents = useMemo(
    () =>
      [...allTimelineEvents]
        .sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp))
        .filter((event) => (timelineFilters.taskId === "all" ? true : event.taskId === timelineFilters.taskId))
        .filter((event) =>
          timelineFilters.category === "all" ? true : event.taskCategory === timelineFilters.category,
        )
        .filter((event) =>
          timelineFilters.eventType === "all" ? true : event.eventType === timelineFilters.eventType,
        )
        .filter((event) => (timelineFilters.status === "all" ? true : event.status === timelineFilters.status)),
    [allTimelineEvents, timelineFilters],
  );
  const effectiveness = useMemo(() => calculateReminderEffectiveness(allTimelineEvents), [allTimelineEvents]);
  const suggestion = useMemo(() => buildInsightSuggestion(effectiveness), [effectiveness]);

  const handleTrigger = async (id: string) => {
    const stamp = formatTimestamp(new Date());
    const target = routines.find((routine) => routine.id === id);
    if (!target) return;
    const nextRoutine = { ...target, status: "Pending" as RoutineStatus, updatedAt: stamp, note: `Reminder sent at ${stamp}` };
    setRoutines((current) => current.map((routine) => (routine.id === id ? nextRoutine : routine)));
    await triggerRoutine(nextRoutine);
    pushToast("Reminder sent to the kiosk.");
  };

  const handleFieldChange = <K extends keyof Routine>(id: string, key: K, value: Routine[K]) => {
    setRoutines((current) =>
      current.map((routine) => (routine.id === id ? { ...routine, [key]: value } : routine)),
    );
  };

  const handleSave = async (id: string) => {
    const stamp = formatTimestamp(new Date());
    const target = routines.find((routine) => routine.id === id);
    if (!target) return;
    const nextRoutine = { ...target, mode: "view" as ViewMode, updatedAt: stamp, note: `Routine updated at ${stamp}` };
    setRoutines((current) => current.map((routine) => (routine.id === id ? nextRoutine : routine)));
    await saveRoutine(nextRoutine);
    pushToast("Routine saved.");
  };

  const handleModeChange = (id: string, mode: ViewMode) => {
    setRoutines((current) =>
      current.map((routine) => (routine.id === id ? { ...routine, mode } : routine)),
    );
  };

  const handleAddNew = async () => {
    const nextIndex = routines.length + 1;
    const nextRoutine: Routine = {
        id: `task_custom_${nextIndex.toString().padStart(3, "0")}`,
        name: `New routine ${nextIndex}`,
        time: "09:30 AM",
        autoRun: false,
        status: "Pending",
        note: "Awaiting first reminder",
        mode: "edit",
        caregiverInstructions: "",
        category: "Wellness",
        escalationPolicy: createEscalationPolicy("Gentle"),
      };
    setRoutines((current) => [...current, nextRoutine]);
    await createRoutine(nextRoutine);
    pushToast("New routine added.");
  };

  const handleBell = () => {
    pushToast(alerts.length ? `${alerts.length} help alert${alerts.length > 1 ? "s" : ""} waiting.` : "No new notifications.");
  };

  const handleSendEmergency = () => {
    setShowEmergencyModal(false);
    pushToast("Emergency services contacted.");
  };

  const handleResolveAlert = async (alertId: string) => {
    setAlerts((current) => current.filter((alert) => alert.id !== alertId));
    await resolveAlert(alertId);
    pushToast("Help alert marked as handled.");
  };

  const pushToast = (message: string) => {
    setToast({
      id: Date.now(),
      message,
    });
  };

  return (
    <div className="min-h-screen bg-shell text-slate-900">
      <div className="mx-auto w-full max-w-screen-2xl px-3 pb-28 pt-3 max-[420px]:px-2.5 max-[420px]:pb-24 sm:px-6 lg:px-8 lg:pb-36 lg:pt-6">
        <Header onBellClick={handleBell} alertCount={alerts.length} />

        <main className="space-y-5 sm:space-y-8">
          <BackendStatusCard backendConnected={backendConnected} />

          {activeTab === "home" ? (
            <>
              <section className="space-y-3">
                <p className="text-sm font-semibold text-slate-600 sm:text-lg">Welcome back,</p>
                <h1 className="text-[clamp(1.9rem,7vw,3.625rem)] font-extrabold tracking-tight text-slate-900 max-[420px]:text-[1.8rem]">
                  Good morning, Sarah
                </h1>
              </section>

              <StatusCard />

              <HelpAlertsCard alerts={alerts} onResolve={handleResolveAlert} />

              <ReminderEffectivenessCard effectiveness={effectiveness} suggestion={suggestion} />

              <section className="space-y-4 sm:space-y-5">
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end sm:gap-4">
                  <h2 className="text-[clamp(1.5rem,5.5vw,2.5rem)] font-extrabold tracking-tight text-slate-900 max-[420px]:text-[1.4rem]">
                    Task Occurrences
                  </h2>
                  <button
                    type="button"
                    onClick={handleAddNew}
                    className="text-base font-bold text-brand transition hover:text-blue-700 sm:text-lg"
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

              <TrackerAlertsCard />

              <EmergencySection onOpenModal={() => setShowEmergencyModal(true)} />
            </>
          ) : null}

          {activeTab === "history" ? (
            <>
              <section className="space-y-3">
                <p className="text-sm font-semibold text-slate-600 sm:text-lg">Recorded events</p>
                <h1 className="text-[clamp(1.9rem,7vw,3.625rem)] font-extrabold tracking-tight text-slate-900 max-[420px]:text-[1.8rem]">
                  Care History
                </h1>
              </section>
              <ReminderEffectivenessCard effectiveness={effectiveness} suggestion={suggestion} />
              <CareTimelineCard
                routines={routines}
                events={timelineEvents}
                filters={timelineFilters}
                onFiltersChange={setTimelineFilters}
              />
            </>
          ) : null}

          {activeTab === "settings" ? (
            <SettingsPanel
              backendConnected={backendConnected}
              routines={routines}
              alertCount={alerts.length}
              eventCount={allTimelineEvents.length}
            />
          ) : null}
        </main>
      </div>

      <BottomNavigation activeTab={activeTab} onChange={setActiveTab} />

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

function Header({
  onBellClick,
  alertCount,
}: {
  onBellClick: () => void;
  alertCount: number;
}) {
  return (
    <header className="mb-5 flex items-center justify-between gap-2 sm:mb-8 sm:gap-4">
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-5">
        <img
          src={caregiverAvatar}
          alt="Caregiver avatar"
          className="h-9 w-9 shrink-0 rounded-full border-[3px] border-brand object-cover max-[420px]:h-8 max-[420px]:w-8 sm:h-16 sm:w-16"
        />
        <div className="min-w-0 text-[clamp(1.25rem,7vw,4.25rem)] font-black leading-none tracking-tight text-brand max-[420px]:text-[1.15rem]">
          Remember.For.Me
        </div>
      </div>

      <button
        type="button"
        onClick={onBellClick}
        className="relative shrink-0 rounded-full p-2 text-brand transition hover:bg-white/70 sm:p-3"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5 stroke-[2.2] sm:h-7 sm:w-7" />
        {alertCount > 0 ? (
          <span className="absolute right-1 top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#c91818] px-1 text-[11px] font-bold text-white sm:right-2 sm:top-2">
            {alertCount}
          </span>
        ) : null}
      </button>
    </header>
  );
}

function BackendStatusCard({ backendConnected }: { backendConnected: boolean }) {
  return (
    <section
      className={`card-shell p-4 sm:p-5 ${backendConnected ? "border-[#c9ebd0] bg-[#f3fff5]" : "border-[#f0d9a8] bg-[#fffaf0]"}`}
    >
      <p className={`text-sm font-bold sm:text-base ${backendConnected ? "text-[#1d6a34]" : "text-[#8a6400]"}`}>
        {backendConnected
          ? "Connected to Firebase backend."
          : "Running with local verified demo data. Add VITE_FIREBASE_DATABASE_URL to connect the live backend."}
      </p>
    </section>
  );
}

function StatusCard() {
  return (
    <section className="card-shell p-4 max-[420px]:p-3.5 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <img
            src={elderAvatar}
            alt="Mom Eleanor"
            className="h-14 w-14 shrink-0 rounded-full border-[3px] border-active object-cover max-[420px]:h-12 max-[420px]:w-12 sm:h-24 sm:w-24 sm:border-4"
          />
          <div className="min-w-0">
            <h2 className="text-[clamp(1.25rem,5vw,2.625rem)] font-extrabold leading-tight text-slate-900 max-[420px]:text-[1.15rem]">
              Mom (Eleanor)
            </h2>
            <p className="mt-1 text-[clamp(0.95rem,3.5vw,1.5rem)] font-medium text-slate-600 max-[420px]:text-[0.85rem]">
              Home Monitoring Active
            </p>
          </div>
        </div>

        <div className="pill-button w-fit gap-2 bg-[#97f3a8] text-[11px] font-extrabold uppercase tracking-wide text-[#106228] sm:text-[15px]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#106228]" />
          LIVE
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-2">
        <InfoBox
          icon={<House className="h-7 w-7 text-action sm:h-9 sm:w-9" />}
          label="Current Location"
          value={
            <span className="inline-flex items-center gap-3 text-action">
              <span className="h-5 w-5 rounded-full bg-gradient-to-b from-[#39d435] to-[#179420] shadow-[0_2px_8px_rgba(43,160,47,0.45)] sm:h-6 sm:w-6" />
              In Home
            </span>
          }
        />
        <InfoBox
          icon={<Clock3 className="h-7 w-7 text-brand sm:h-9 sm:w-9" />}
          label="Latest check-in"
          value="Help requested 2 minutes ago"
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-4 md:flex-row md:items-center md:justify-between">
        <div className="inline-flex min-w-0 items-center gap-2.5 text-sm font-semibold text-slate-700 sm:text-lg">
          <HeartPulse className="h-5 w-5 shrink-0 text-active sm:h-6 sm:w-6" />
          Vitals: Normal (72 bpm)
        </div>
        <button type="button" className="w-fit text-base font-extrabold text-brand transition hover:text-blue-700 sm:text-xl">
          View Map &gt;
        </button>
      </div>
    </section>
  );
}

function HelpAlertsCard({
  alerts,
  onResolve,
}: {
  alerts: CaregiverAlert[];
  onResolve: (id: string) => void;
}) {
  return (
    <section className="card-shell border-[#f4b5b5] bg-[#fff1f1] p-4 max-[420px]:p-3.5 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-[clamp(1.5rem,5vw,2.25rem)] font-extrabold text-[#8f1414] max-[420px]:text-[1.35rem]">
            Help Requests
          </h2>
          <p className="mt-2 text-sm font-medium text-[#a64646] sm:text-lg">
            Requests from the older adult appear here for caregiver follow-up.
          </p>
        </div>
        <span className="pill-button bg-[#ffd6d6] text-[#8f1414]">
          {alerts.length ? `${alerts.length} open` : "No open requests"}
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {alerts.length ? (
          alerts.map((alert) => (
            <article
              key={alert.id}
              className="rounded-[20px] border border-[#efb0b0] bg-white p-4 shadow-sm sm:p-5"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#ffe2e2] px-3 py-1.5 text-sm font-bold text-[#8f1414]">
                    <Siren className="h-4 w-4" />
                    Needs help
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">{alert.taskName}</h3>
                  <p className="text-sm font-medium text-slate-600 sm:text-base">
                    {alert.resident} • Scheduled {alert.scheduledTime}
                  </p>
                  <p className="text-sm font-medium text-slate-700 sm:text-base">
                    Requested at {alert.requestedAt}
                  </p>
                  {alert.instructions ? (
                    <p className="rounded-2xl bg-[#fff7de] px-3 py-2 text-sm font-medium text-[#7a5c00] sm:text-base">
                      Caregiver note: {alert.instructions}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => onResolve(alert.id)}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#8f1414] px-5 text-sm font-bold text-white transition hover:bg-[#771010] sm:text-base"
                >
                  Mark handled
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-[20px] border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-sm font-medium text-slate-600 sm:text-base">
            No active help requests.
          </div>
        )}
      </div>
    </section>
  );
}

function ReminderEffectivenessCard({
  effectiveness,
  suggestion,
}: {
  effectiveness: ReminderEffectiveness[];
  suggestion: InsightSuggestion | null;
}) {
  const bestChannel = effectiveness
    .filter((item) => item.remindersDelivered >= 5)
    .sort((left, right) => right.completionRate - left.completionRate)[0];

  return (
    <section className="card-shell p-4 max-[420px]:p-3.5 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-[clamp(1.5rem,5vw,2.25rem)] font-extrabold text-slate-900 max-[420px]:text-[1.35rem]">
            Reminder Effectiveness
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-600 sm:text-lg">
            Calculated from recorded reminder and response events only.
          </p>
        </div>
        <span className="pill-button bg-[#eef2ff] text-[#3558c8]">
          {bestChannel ? `Best recent: ${formatChannel(bestChannel.channel)}` : "Not enough data"}
        </span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {effectiveness.map((item) => (
          <article key={item.channel} className="info-box">
            <p className="text-sm font-bold text-slate-600">{formatChannel(item.channel)}</p>
            <p className="mt-2 text-2xl font-extrabold text-slate-900">
              {item.remindersDelivered >= 5 ? `${Math.round(item.completionRate * 100)}%` : "Not enough data"}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-600">
              {item.remindersDelivered} observations
            </p>
            <p className="mt-3 text-sm font-medium text-slate-700">
              Median response: {item.medianResponseMinutes == null ? "n/a" : `${item.medianResponseMinutes} min`}
            </p>
          </article>
        ))}
      </div>

      {suggestion ? (
        <div className="mt-5 rounded-[20px] border border-[#d7e3ff] bg-[#f6f9ff] p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#3558c8]" />
            <div>
              <p className="text-sm font-bold text-[#3558c8]">{suggestion.title}</p>
              <p className="mt-1 text-sm font-medium text-slate-700">{suggestion.message}</p>
              <p className="mt-2 text-xs font-medium text-slate-500">
                Requires caregiver approval. Based on recorded interactions only.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-[20px] border border-dashed border-slate-300 bg-slate-50 p-4 text-sm font-medium text-slate-600">
          Not enough data yet to compare reminder methods.
        </div>
      )}
    </section>
  );
}

function CareTimelineCard({
  routines,
  events,
  filters,
  onFiltersChange,
}: {
  routines: Routine[];
  events: TimelineEvent[];
  filters: TimelineFilters;
  onFiltersChange: React.Dispatch<React.SetStateAction<TimelineFilters>>;
}) {
  return (
    <section className="card-shell p-4 max-[420px]:p-3.5 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-[clamp(1.5rem,5vw,2.25rem)] font-extrabold text-slate-900 max-[420px]:text-[1.35rem]">
            Care Timeline
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-600 sm:text-lg">
            Chronological event history with uncertainty shown explicitly.
          </p>
        </div>
        <div className="pill-button gap-2 bg-[#eef2ff] text-[#3558c8]">
          <Filter className="h-4 w-4" />
          {events.length} events
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <FilterSelect
          label="Task"
          value={filters.taskId}
          onChange={(value) => onFiltersChange((current) => ({ ...current, taskId: value }))}
          options={[
            { value: "all", label: "All tasks" },
            ...routines.map((routine) => ({ value: routine.id, label: routine.name })),
          ]}
        />
        <FilterSelect
          label="Category"
          value={filters.category}
          onChange={(value) => onFiltersChange((current) => ({ ...current, category: value }))}
          options={[
            { value: "all", label: "All categories" },
            { value: "Medication", label: "Medication" },
            { value: "Wellness", label: "Wellness" },
            { value: "Check-in", label: "Check-in" },
          ]}
        />
        <FilterSelect
          label="Event"
          value={filters.eventType}
          onChange={(value) => onFiltersChange((current) => ({ ...current, eventType: value }))}
          options={[
            { value: "all", label: "All events" },
            { value: "REMINDER_SHOWN", label: "Reminder shown" },
            { value: "TASK_SNOOZED", label: "Snoozed" },
            { value: "TASK_COMPLETED", label: "Completed" },
            { value: "TASK_ALREADY_COMPLETED", label: "Completed earlier" },
            { value: "HELP_REQUESTED", label: "Help requested" },
            { value: "DEVICE_OFFLINE", label: "Device offline" },
          ]}
        />
        <FilterSelect
          label="Status"
          value={filters.status}
          onChange={(value) => onFiltersChange((current) => ({ ...current, status: value }))}
          options={[
            { value: "all", label: "All statuses" },
            { value: "Confirmed complete", label: "Confirmed complete" },
            { value: "Reported already complete", label: "Reported already complete" },
            { value: "Explicitly postponed", label: "Explicitly postponed" },
            { value: "Help requested", label: "Help requested" },
            { value: "Reminder may not have been seen", label: "Reminder may not have been seen" },
            { value: "Device offline", label: "Device offline" },
          ]}
        />
      </div>

      <div className="mt-5 space-y-4">
        {events.length ? (
          events.map((event) => (
            <article key={event.id} className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="pill-button bg-slate-100 text-slate-700">{formatEventType(event.eventType)}</span>
                    <span className={`pill-button ${getTimelineStatusClasses(event.status)}`}>{event.status}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">{event.taskName}</h3>
                  <p className="text-sm font-medium text-slate-700">{event.description}</p>
                  <p className="text-sm font-medium text-slate-500">
                    {event.careRecipient} • {event.source}
                  </p>
                  {event.status === "Reminder may not have been seen" || event.status === "Device offline" ? (
                    <div className="inline-flex items-start gap-2 rounded-2xl bg-[#fff7de] px-3 py-2 text-sm font-medium text-[#7a5c00]">
                      <Info className="mt-0.5 h-4 w-4 shrink-0" />
                      No completion was recorded. The kiosk was offline during part of the reminder window.
                    </div>
                  ) : null}
                </div>
                <div className="text-left text-sm font-semibold text-slate-600 md:text-right">
                  {formatTimelineTimestamp(event.timestamp)}
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-[20px] border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm font-medium text-slate-600">
            No events match these filters yet.
          </div>
        )}
      </div>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="space-y-2">
      <span className="block text-sm font-bold text-slate-600">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-[14px] border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
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
    <article className="info-box min-h-[112px] px-4 py-3 max-[420px]:min-h-[100px] max-[420px]:px-3.5 max-[420px]:py-3 sm:min-h-[150px] sm:px-5 sm:py-4">
      {icon ? <div className="mb-3">{icon}</div> : null}
      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-600 sm:text-lg">{label}</p>
        <div className="text-[clamp(1rem,3.8vw,1.5rem)] font-extrabold text-slate-900 max-[420px]:text-[0.98rem]">{value}</div>
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
  const badge = getStatusBadge(routine.status);

  return (
    <article className="card-shell p-4 max-[420px]:p-3.5 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`pill-button gap-2 ${badge.classes}`}>
            <badge.icon className="h-5 w-5" />
            {routine.status}
          </span>
        </div>

        <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:justify-end">
          <span className="text-xs font-medium text-slate-600 sm:text-base md:text-right">
            {routine.note}
          </span>
          <SegmentedControl mode={routine.mode} onChange={(mode) => onModeChange(routine.id, mode)} />
        </div>
      </div>

      {routine.mode === "edit" ? (
        <div className="mt-5 space-y-4 sm:space-y-6">
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_120px]">
            <FieldGroup
              label="Name"
              input={
                <input
                  value={routine.name}
                  onChange={(event) => onFieldChange(routine.id, "name", event.target.value)}
                  className="h-14 w-full rounded-[16px] bg-lavender px-3.5 text-sm font-medium text-slate-800 outline-none ring-0 placeholder:text-slate-400 max-[420px]:h-12 max-[420px]:rounded-[14px] sm:h-20 sm:rounded-[20px] sm:px-6 sm:text-xl"
                />
              }
            />
            <FieldGroup
              label="Scheduled time"
              input={
                <input
                  value={routine.time}
                  onChange={(event) => onFieldChange(routine.id, "time", event.target.value)}
                  className="h-14 w-full rounded-[16px] bg-lavender px-3.5 text-sm font-medium text-slate-800 outline-none ring-0 placeholder:text-slate-400 max-[420px]:h-12 max-[420px]:rounded-[14px] sm:h-20 sm:rounded-[20px] sm:px-6 sm:text-xl"
                />
              }
            />
            <FieldGroup
              label="Auto run"
              input={
                <div className="flex h-14 items-center justify-start rounded-[16px] bg-lavender px-3.5 max-[420px]:h-12 max-[420px]:rounded-[14px] sm:h-20 sm:justify-center sm:rounded-[20px] sm:px-0">
                  <input
                    type="checkbox"
                    checked={routine.autoRun}
                    onChange={(event) => onFieldChange(routine.id, "autoRun", event.target.checked)}
                    className="h-7 w-7 rounded-md border-0 sm:h-9 sm:w-9"
                  />
                </div>
              }
            />
          </div>

          <FieldGroup
            label="Caregiver instructions"
            input={
              <input
                value={routine.caregiverInstructions ?? ""}
                onChange={(event) =>
                  onFieldChange(routine.id, "caregiverInstructions", event.target.value)
                }
                className="h-14 w-full rounded-[16px] bg-lavender px-3.5 text-sm font-medium text-slate-800 outline-none ring-0 placeholder:text-slate-400 max-[420px]:h-12 max-[420px]:rounded-[14px] sm:h-20 sm:rounded-[20px] sm:px-6 sm:text-xl"
              />
            }
          />

          <EscalationEditor routine={routine} onFieldChange={onFieldChange} />

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            <ActionButton icon={Play} label="Trigger" onClick={() => onTrigger(routine.id)} />
            <ActionButton icon={Save} label="Save" onClick={() => onSave(routine.id)} />
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-4 sm:space-y-6">
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div className="space-y-2">
              <h3 className="text-[clamp(1.05rem,4.5vw,1.5rem)] font-extrabold text-slate-900 max-[420px]:text-[1rem]">
                {routine.name}
              </h3>
              {routine.caregiverInstructions ? (
                <p className="text-sm font-medium text-slate-600 sm:text-base">
                  Caregiver note: {routine.caregiverInstructions}
                </p>
              ) : null}
              <p className="text-sm font-medium text-slate-600 sm:text-base">
                Escalation: {routine.escalationPolicy.enabled ? routine.escalationPolicy.template : "Off"}
              </p>
            </div>
            <div className="text-left text-base font-semibold text-slate-600 md:text-right">
              {routine.time}
            </div>
          </div>

          <ActionButton icon={Play} label="Trigger" onClick={() => onTrigger(routine.id)} fullWidth />
        </div>
      )}
    </article>
  );
}

function FieldGroup({ label, input }: { label: string; input: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-slate-600 sm:text-lg">{label}</label>
      {input}
    </div>
  );
}

function EscalationEditor({
  routine,
  onFieldChange,
}: {
  routine: Routine;
  onFieldChange: <K extends keyof Routine>(id: string, key: K, value: Routine[K]) => void;
}) {
  const isMedication = routine.category === "Medication";
  const policy = routine.escalationPolicy;

  const handleTemplateChange = (template: EscalationTemplate) => {
    const nextPolicy = template === "Custom" ? { ...policy, template } : createEscalationPolicy(template, isMedication);
    onFieldChange(routine.id, "escalationPolicy", nextPolicy);
  };

  const updateStep = (index: number, next: EscalationStep) => {
    const nextSteps = policy.steps.map((step, stepIndex) => (stepIndex === index ? next : step));
    onFieldChange(routine.id, "escalationPolicy", { ...policy, template: "Custom", steps: nextSteps });
  };

  return (
    <div className="space-y-3 rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-slate-700 sm:text-lg">Escalation</p>
          <p className="text-xs font-medium text-slate-500 sm:text-sm">
            Stops when the task is completed, snoozed, cancelled, or caregiver-acknowledged.
          </p>
        </div>
        <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 sm:text-base">
          <input
            type="checkbox"
            checked={policy.enabled}
            onChange={(event) =>
              onFieldChange(routine.id, "escalationPolicy", { ...policy, enabled: event.target.checked })
            }
            className="h-5 w-5 rounded-md"
          />
          Enabled
        </label>
      </div>

      <FieldGroup
        label="Template"
        input={
          <select
            value={policy.template}
            onChange={(event) => handleTemplateChange(event.target.value as EscalationTemplate)}
            className="h-14 w-full rounded-[16px] bg-white px-3.5 text-sm font-medium text-slate-800 outline-none max-[420px]:h-12 sm:h-16 sm:text-lg"
          >
            {(["Gentle", "Standard", "High attention", "Custom"] as const).map((template) => (
              <option key={template} value={template}>
                {template}
              </option>
            ))}
          </select>
        }
      />

      <div className="space-y-3">
        {policy.steps.map((step, index) => (
          <div key={`${routine.id}-${index}`} className="grid gap-3 rounded-[16px] bg-white p-3 sm:grid-cols-[160px_1fr]">
            <FieldGroup
              label={`After ${step.delayMinutes} min`}
              input={
                <input
                  type="number"
                  min={5}
                  step={5}
                  value={step.delayMinutes}
                  onChange={(event) =>
                    updateStep(index, { ...step, delayMinutes: Number(event.target.value) || step.delayMinutes })
                  }
                  className="h-12 w-full rounded-[14px] bg-lavender px-3 text-sm font-medium text-slate-800 outline-none sm:text-base"
                />
              }
            />
            <FieldGroup
              label="Action"
              input={
                <select
                  value={step.action}
                  onChange={(event) =>
                    updateStep(index, {
                      ...step,
                      action: event.target.value as EscalationAction,
                    })
                  }
                  className="h-12 w-full rounded-[14px] bg-lavender px-3 text-sm font-medium text-slate-800 outline-none sm:text-base"
                >
                  {getAllowedEscalationActions(isMedication).map((action) => (
                    <option key={action} value={action}>
                      {formatEscalationAction(action)}
                    </option>
                  ))}
                </select>
              }
            />
          </div>
        ))}
      </div>

      {isMedication ? (
        <p className="rounded-2xl bg-[#fff7de] px-3 py-2 text-sm font-medium text-[#7a5c00] sm:text-base">
          Medication safeguard: escalation may repeat reminders, show caregiver wording, or notify family. It never changes dosage or marks medication complete automatically.
        </p>
      ) : null}
    </div>
  );
}

function SegmentedControl({
  mode,
  onChange,
}: {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}) {
  return (
    <div className="inline-flex w-fit rounded-full bg-[#eef0ff] p-0.5 shadow-sm sm:p-1">
      {(["view", "edit"] as const).map((item) => {
        const active = item === mode;
        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`rounded-full px-3 py-1.5 text-sm font-bold transition sm:px-5 sm:py-2 sm:text-lg ${
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
}: {
  icon: typeof Play;
  label: string;
  onClick: () => void;
  fullWidth?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[16px] bg-action px-4 text-base font-semibold text-white transition hover:bg-[#0f622b] max-[420px]:min-h-[48px] max-[420px]:rounded-[14px] sm:min-h-[72px] sm:gap-3 sm:rounded-[20px] sm:px-6 sm:text-2xl"
    >
      <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
      {label}
    </button>
  );
}

function TrackerAlertsCard() {
  return (
    <section className="card-shell p-4 max-[420px]:p-3.5 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-[clamp(1.5rem,5vw,2.25rem)] font-extrabold text-slate-900 max-[420px]:text-[1.35rem]">
            Tracker Alerts
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-600 sm:text-lg">
            Wrist tracker pushes alerts for abnormal heart rate or inactivity.
          </p>
        </div>
        <span className="pill-button bg-[#e9f6eb] text-action">Normal</span>
      </div>

      <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4 md:grid-cols-2">
        <InfoBox label="Latest event" value="No alert" icon={null} />
        <InfoBox label="Source" value="Tracker" icon={null} />
        <div className="info-box md:col-span-2">
          <p className="text-sm font-medium text-slate-600 sm:text-lg">Updated</p>
          <p className="mt-1 text-[clamp(1rem,3.8vw,1.5rem)] font-extrabold text-slate-900">
            No events yet
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm font-medium text-slate-700 sm:text-lg">No active tracker alert.</p>
    </section>
  );
}

function EmergencySection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="card-shell border-[#f4b5b5] bg-[#ffd6d6] p-4 shadow-card max-[420px]:p-3.5 sm:p-6 lg:p-8">
      <h2 className="text-[clamp(1.5rem,5vw,2.25rem)] font-extrabold text-[#a50f0f] max-[420px]:text-[1.35rem]">
        Need Immediate Attention?
      </h2>
      <p className="mt-2.5 text-sm font-medium text-[#bf4f4f] sm:text-lg">
        Connecting you directly with emergency services and local responders.
      </p>
      <button
        type="button"
        onClick={onOpenModal}
        className="mt-5 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#c91818] px-4 text-base font-semibold text-white transition hover:bg-[#b11212] max-[420px]:min-h-[50px] sm:mt-8 sm:min-h-[88px] sm:gap-3 sm:px-8 sm:text-2xl"
      >
        <ShieldAlert className="h-5 w-5 sm:h-7 sm:w-7" />
        Send Emergency Alert
      </button>
    </section>
  );
}

function SettingsPanel({
  backendConnected,
  routines,
  alertCount,
  eventCount,
}: {
  backendConnected: boolean;
  routines: Routine[];
  alertCount: number;
  eventCount: number;
}) {
  return (
    <>
      <section className="space-y-3">
        <p className="text-sm font-semibold text-slate-600 sm:text-lg">Workspace settings</p>
        <h1 className="text-[clamp(1.9rem,7vw,3.625rem)] font-extrabold tracking-tight text-slate-900 max-[420px]:text-[1.8rem]">
          Settings
        </h1>
      </section>

      <section className="card-shell p-4 max-[420px]:p-3.5 sm:p-6 lg:p-8">
        <div className="grid gap-3 md:grid-cols-3">
          <InfoBox label="Backend" value={backendConnected ? "Connected" : "Demo mode"} icon={<Settings className="h-7 w-7 text-brand sm:h-9 sm:w-9" />} />
          <InfoBox label="Tracked routines" value={`${routines.length}`} icon={<Home className="h-7 w-7 text-brand sm:h-9 sm:w-9" />} />
          <InfoBox label="Timeline events" value={`${eventCount}`} icon={<History className="h-7 w-7 text-brand sm:h-9 sm:w-9" />} />
        </div>
        <p className="mt-5 text-sm font-medium text-slate-600 sm:text-lg">
          Open alerts: {alertCount}. Use the Home tab to edit routines and the History tab to review reminder outcomes.
        </p>
      </section>
    </>
  );
}

function BottomNavigation({
  activeTab,
  onChange,
}: {
  activeTab: AppTab;
  onChange: (tab: AppTab) => void;
}) {
  const tabs = [
    { label: "Home", icon: Home, value: "home" as const },
    { label: "History", icon: History, value: "history" as const },
    { label: "Settings", icon: Settings, value: "settings" as const },
  ];

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-40 border border-white/80 bg-white/95 px-1.5 pb-2.5 pt-2.5 shadow-[0_-10px_30px_rgba(28,39,72,0.08)] backdrop-blur sm:inset-x-8 sm:rounded-t-[28px] sm:px-4 sm:pb-5 sm:pt-4">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-3 gap-1 sm:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => onChange(tab.value)}
              className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-full px-1 py-1.5 text-[11px] font-semibold sm:px-4 sm:py-3 sm:text-lg ${
                activeTab === tab.value ? "text-[#351898]" : "text-slate-600"
              }`}
            >
              <span
                className={`inline-flex h-10 w-full max-w-[112px] items-center justify-center gap-1 rounded-full px-2 sm:h-14 sm:max-w-[128px] sm:gap-2 sm:px-6 ${
                  activeTab === tab.value ? "bg-active/85 text-[#351898]" : "bg-transparent"
                }`}
              >
                <tab.icon className="h-4 w-4 shrink-0 sm:h-7 sm:w-7" />
                <span className="truncate">{tab.label}</span>
              </span>
            </button>
          ))}
        </div>
      </nav>

      <button
        type="button"
        aria-label="Help"
        className="fixed bottom-20 right-3 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2a2a] text-xl font-medium text-white shadow-xl sm:bottom-4 sm:right-4 sm:h-14 sm:w-14 sm:text-3xl"
      >
        ?
      </button>
    </>
  );
}

function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div className="fixed bottom-24 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-2xl sm:bottom-28 sm:px-5 sm:py-4 sm:text-base">
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
      <div className="w-full max-w-lg rounded-[28px] bg-white p-5 shadow-2xl sm:p-8">
        <h3 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{title}</h3>
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

function getStatusBadge(status: RoutineStatus) {
  switch (status) {
    case "Completed":
      return { icon: CheckCircle2, classes: "bg-[#e9f6eb] text-action" };
    case "Completed earlier":
      return { icon: History, classes: "bg-[#eef2ff] text-[#3558c8]" };
    case "Snoozed":
      return { icon: Clock3, classes: "bg-[#fff5d7] text-[#9b6b00]" };
    case "Needs help":
      return { icon: Siren, classes: "bg-[#ffe2e2] text-[#8f1414]" };
    case "No response":
      return { icon: CircleAlert, classes: "bg-[#f1f5f9] text-slate-600" };
    case "Pending":
    default:
      return { icon: Clock3, classes: "bg-[#dfe8ff] text-slate-600" };
  }
}

function createEscalationPolicy(
  template: EscalationTemplate,
  medication = false,
): EscalationPolicy {
  const allowed = getAllowedEscalationActions(medication);
  const baseSteps: Record<Exclude<EscalationTemplate, "Custom">, EscalationStep[]> = {
    Gentle: [
      { delayMinutes: 10, action: "REPEAT_VISUAL_REMINDER" },
      { delayMinutes: 30, action: "SHOW_DETAILED_INSTRUCTION" },
    ],
    Standard: [
      { delayMinutes: 10, action: "REPEAT_VISUAL_REMINDER" },
      { delayMinutes: 20, action: "PLAY_VOICE_REMINDER" },
      { delayMinutes: 40, action: "NOTIFY_CAREGIVER" },
    ],
    "High attention": [
      { delayMinutes: 10, action: "REPEAT_VISUAL_REMINDER" },
      { delayMinutes: 20, action: "PLAY_VOICE_REMINDER" },
      { delayMinutes: 30, action: "SHOW_DETAILED_INSTRUCTION" },
      { delayMinutes: 40, action: "NOTIFY_CAREGIVER" },
    ],
  };

  const templateSteps =
    template === "Custom"
      ? baseSteps.Standard
      : baseSteps[template].filter((step) => allowed.includes(step.action));

  return {
    enabled: true,
    template,
    steps: templateSteps,
  };
}

function getAllowedEscalationActions(medication: boolean): EscalationAction[] {
  if (medication) {
    return [
      "REPEAT_VISUAL_REMINDER",
      "SHOW_DETAILED_INSTRUCTION",
      "SEND_FAMILY_VOICE_MESSAGE",
      "NOTIFY_CAREGIVER",
    ];
  }

  return [
    "REPEAT_VISUAL_REMINDER",
    "PLAY_VOICE_REMINDER",
    "SHOW_DETAILED_INSTRUCTION",
    "SEND_FAMILY_VOICE_MESSAGE",
    "NOTIFY_CAREGIVER",
  ];
}

function formatEscalationAction(action: EscalationAction) {
  return action
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function calculateReminderEffectiveness(events: TimelineEvent[]): ReminderEffectiveness[] {
  const channels: ReminderEffectiveness["channel"][] = ["VISUAL", "VOICE", "CAREGIVER_FOLLOW_UP"];
  return channels.map((channel) => {
    const delivered = events.filter(
      (event) =>
        event.channel === channel &&
        ["REMINDER_SHOWN", "REMINDER_REPEATED", "VOICE_REMINDER_PLAYED", "CAREGIVER_NOTIFIED"].includes(
          event.eventType,
        ),
    );
    const responses = events.filter(
      (event) =>
        event.channel === channel &&
        ["TASK_COMPLETED", "TASK_ALREADY_COMPLETED", "TASK_SNOOZED", "HELP_REQUESTED"].includes(event.eventType),
    );
    const completed = events.filter(
      (event) =>
        event.channel === channel &&
        ["TASK_COMPLETED", "TASK_ALREADY_COMPLETED"].includes(event.eventType),
    );
    const responseMinutes = responses
      .map((event) => Number(event.metadata?.responseDelayMinutes))
      .filter((value) => Number.isFinite(value));
    const helpRequests = responses.filter((event) => event.eventType === "HELP_REQUESTED").length;
    const snoozes = responses.filter((event) => event.eventType === "TASK_SNOOZED").length;

    return {
      channel,
      remindersDelivered: delivered.length,
      responsesRecorded: responses.length,
      completedAfterReminder: completed.length,
      completionRate: delivered.length ? completed.length / delivered.length : 0,
      medianResponseMinutes: responseMinutes.length ? median(responseMinutes) : null,
      helpRequestRate: delivered.length ? helpRequests / delivered.length : 0,
      snoozeRate: delivered.length ? snoozes / delivered.length : 0,
    };
  });
}

function buildInsightSuggestion(effectiveness: ReminderEffectiveness[]): InsightSuggestion | null {
  const visual = effectiveness.find((item) => item.channel === "VISUAL");
  const voice = effectiveness.find((item) => item.channel === "VOICE");
  if (!visual || !voice) return null;
  if (visual.remindersDelivered < 5 || voice.remindersDelivered < 5) return null;
  if (voice.completionRate <= visual.completionRate) return null;

  return {
    type: "USE_VOICE_REMINDER",
    title: "Use voice reminders for this routine?",
    message: `Recorded completions followed ${voice.completedAfterReminder} of ${voice.remindersDelivered} voice reminders, compared with ${visual.completedAfterReminder} of ${visual.remindersDelivered} visual reminders.`,
    evidence: {
      voiceObservations: voice.remindersDelivered,
      voiceCompletionRate: Number(voice.completionRate.toFixed(2)),
      visualObservations: visual.remindersDelivered,
      visualCompletionRate: Number(visual.completionRate.toFixed(2)),
    },
    requiresCaregiverApproval: true,
  };
}

function median(values: number[]) {
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
}

function formatChannel(channel: ReminderEffectiveness["channel"]) {
  return channel.split("_").join(" ");
}

function formatEventType(eventType: TimelineEventType) {
  return eventType
    .split("_")
    .join(" ")
    .toLowerCase()
    .replace(/\b\w/g, (char: string) => char.toUpperCase());
}

function getTimelineStatusClasses(status: TimelineStatus) {
  switch (status) {
    case "Confirmed complete":
      return "bg-[#e9f6eb] text-action";
    case "Reported already complete":
      return "bg-[#eef2ff] text-[#3558c8]";
    case "Explicitly postponed":
      return "bg-[#fff5d7] text-[#9b6b00]";
    case "Help requested":
      return "bg-[#ffe2e2] text-[#8f1414]";
    case "Reminder may not have been seen":
    case "Device offline":
      return "bg-[#fff7de] text-[#7a5c00]";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function formatTimelineTimestamp(timestamp: string) {
  return new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatTimestamp(date: Date) {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function createAvatarSvg(hair: string, skin: string, shirt: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img" aria-label="avatar">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#f2f5ff"/>
        </linearGradient>
      </defs>
      <rect width="160" height="160" rx="36" fill="url(#bg)" />
      <circle cx="80" cy="58" r="30" fill="${skin}" />
      <path d="M44 54c4-26 25-38 43-38 21 0 37 13 40 35-13-11-29-14-45-14-13 0-27 4-38 17z" fill="${hair}" />
      <path d="M38 146c5-27 25-46 42-46 23 0 42 19 44 46z" fill="${shirt}" />
      <circle cx="68" cy="58" r="4.5" fill="#25324a" />
      <circle cx="93" cy="58" r="4.5" fill="#25324a" />
      <path d="M68 78c5 5 16 5 22 0" fill="none" stroke="#9a5b4f" stroke-width="5" stroke-linecap="round" />
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
