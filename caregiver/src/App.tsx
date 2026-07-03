import { useEffect, useMemo, useRef, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import {
  Bell,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Globe,
  HeartPulse,
  Home,
  Info,
  Link2,
  LogIn,
  LogOut,
  MapPinned,
  MonitorSmartphone,
  Palette,
  ShieldAlert,
  UserRound,
  Users,
} from "lucide-react";
import type { User } from "firebase/auth";

import { BottomNavigation, ConfirmationModal, Header, Toast } from "./components/common";
import {
  demoFamilyId,
  getUserProfile,
  signInCaregiver,
  signOutCaregiver,
  signUpCaregiver,
  subscribeToAuth,
  subscribeToFamilyPath,
  subscribeToUserProfile,
  transactFamilyTask,
  updateFamilyPath,
  updateUserProfile,
} from "./firebase";
import { HomeScreen } from "./screens/HomeScreen";
import type {
  AppTab,
  CaregiverProfile,
  DemoSettingsState,
  Routine,
  SettingsPage,
  ToastState,
} from "./types";
import { createAvatarSvg, formatClock } from "./utils";

const caregiverAvatar = createAvatarSvg("#1d5bd8", "#f0d1c3", "#5ca2ff");

const initialDemoSettings: DemoSettingsState = {
  language: "English",
  appearance: "Light",
  timeFormat: "24-hour",
  notifications: {
    medicationReminders: true,
    routineReminders: true,
    trackerAlerts: true,
    emergencyAlerts: true,
    weeklySummary: false,
  },
};

const defaultProfile = {
  name: "Hy Nguyen",
  role: "Family caregiver",
  email: "hy@example.com",
};

function mergeSettings(
  remoteSettings?: Partial<DemoSettingsState> | null,
): DemoSettingsState {
  return {
    ...initialDemoSettings,
    ...remoteSettings,
    notifications: {
      ...initialDemoSettings.notifications,
      ...remoteSettings?.notifications,
    },
  };
}

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>("home");
  const [settingsPage, setSettingsPage] = useState<SettingsPage>("root");
  const [familyId, setFamilyId] = useState(demoFamilyId);
  const [elder, setElder] = useState<any>({
    name: "Ngoai",
    displayName: "Mom (Eleanor)",
    caregiverGreeting: "Good morning, Sarah",
    status: "in_home",
    locationLabel: "In Home",
    lastSeenAt: Date.now() - 2 * 60 * 1000,
    vitals: {
      status: "No data",
      heartRateBpm: null,
    },
  });
  const [kiosk, setKiosk] = useState<any>({
    online: false,
    name: "Living Room Kiosk",
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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [demoSettings, setDemoSettings] = useState<DemoSettingsState>(
    initialDemoSettings,
  );
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [settingsReady, setSettingsReady] = useState(false);
  const [caregiverProfile, setCaregiverProfile] = useState<CaregiverProfile | null>(null);
  const [profileName, setProfileName] = useState(defaultProfile.name);
  const [profileRole, setProfileRole] = useState(defaultProfile.role);
  const [profileEmail, setProfileEmail] = useState(defaultProfile.email);

  const lastPersistedSettingsRef = useRef(JSON.stringify(initialDemoSettings));

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    let unsubscribeProfile = () => {};

    const unsubscribeAuth = subscribeToAuth(async (user) => {
      unsubscribeProfile();
      setAuthUser(user);
      setAuthLoading(true);

      if (!user) {
        setCaregiverProfile(null);
        setFamilyId(demoFamilyId);
        setProfileName(defaultProfile.name);
        setProfileRole(defaultProfile.role);
        setProfileEmail(defaultProfile.email);
        setDemoSettings(initialDemoSettings);
        lastPersistedSettingsRef.current = JSON.stringify(initialDemoSettings);
        setSettingsReady(true);
        setAuthLoading(false);
        return;
      }

      const initialProfile = await getUserProfile(user.uid).catch(() => null);
      if (initialProfile) {
        const merged = mergeSettings(initialProfile.preferences);
        setDemoSettings(merged);
        lastPersistedSettingsRef.current = JSON.stringify(merged);
      }

      unsubscribeProfile = subscribeToUserProfile(user.uid, (profile) => {
        const resolvedProfile = profile ?? initialProfile;
        const mergedSettings = mergeSettings(resolvedProfile?.preferences);

        setCaregiverProfile(resolvedProfile);
        setFamilyId(resolvedProfile?.familyId || demoFamilyId);
        setProfileName(
          resolvedProfile?.name || user.displayName || user.email?.split("@")[0] || "Caregiver",
        );
        setProfileRole(resolvedProfile?.role || "Family caregiver");
        setProfileEmail(resolvedProfile?.email || user.email || "No email");
        setDemoSettings(mergedSettings);
        lastPersistedSettingsRef.current = JSON.stringify(mergedSettings);
        setSettingsReady(true);
        setAuthLoading(false);
      });
    });

    return () => {
      unsubscribeProfile();
      unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    const unsubElder = subscribeToFamilyPath(familyId, "elder", (snapshot) => {
      const value = snapshot.val();
      if (value) setElder(value);
    });

    const unsubKiosk = subscribeToFamilyPath(familyId, "kiosk", (snapshot) => {
      const value = snapshot.val();
      if (value) setKiosk((current: any) => ({ ...current, ...value }));
    });

    const unsubTracker = subscribeToFamilyPath(familyId, "tracker_alert", (snapshot) => {
      const value = snapshot.val();
      if (value) setTrackerAlert(value);
    });

    const unsubTasks = subscribeToFamilyPath(familyId, "tasks", (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.entries(data).map(([id, value]: [string, any]) => ({
        id,
        name: value.name || "Untitled task",
        time: value.scheduled_time || "09:00",
        autoRun: !!value.is_auto,
        status: value.status || "Pending",
        note: buildTaskNote(value),
        updatedAt:
          value.updatedAt ||
          value.completedAt ||
          value.triggeredAt ||
          value.lastTriggeredAt ||
          undefined,
        mode: "view",
      })) as Routine[];

      list.sort((a, b) => a.time.localeCompare(b.time));

      setRoutines((current) =>
        list.map((item) => {
          const existing = current.find((routine) => routine.id === item.id);
          return existing ? { ...item, mode: existing.mode } : item;
        }),
      );
    });

    return () => {
      unsubElder();
      unsubKiosk();
      unsubTracker();
      unsubTasks();
    };
  }, [familyId]);

  useEffect(() => {
    if (!authUser || !settingsReady) return;

    const serialized = JSON.stringify(demoSettings);
    if (serialized === lastPersistedSettingsRef.current) return;

    const timer = window.setTimeout(() => {
      void updateUserProfile(authUser.uid, {
        preferences: demoSettings,
        updatedAt: Date.now(),
      })
        .then(() => {
          lastPersistedSettingsRef.current = serialized;
        })
        .catch((error) => {
          console.error(error);
          pushToast("Could not sync preferences right now.");
        });
    }, 500);

    return () => window.clearTimeout(timer);
  }, [authUser, demoSettings, settingsReady]);

  const historyItems = useMemo(() => {
    return [...routines]
      .filter((routine) => routine.updatedAt)
      .sort((a, b) => Number(b.updatedAt || 0) - Number(a.updatedAt || 0));
  }, [routines]);

  const linkedFamilyMembers = caregiverProfile?.linkedFamilyMembers || [
    "Hy Nguyen",
    "Minh Nguyen",
    "Lan Tran",
  ];

  function pushToast(message: string) {
    setToast({
      id: Date.now(),
      message,
    });
  }

  async function handleTrigger(id: string) {
    const routine = routines.find((item) => item.id === id);
    if (!routine) return;

    try {
      const { committed } = await transactFamilyTask(familyId, id, (currentTask) => {
        if (!currentTask || currentTask.status === "Running") return currentTask;

        return {
          ...currentTask,
          status: "Running",
          text: routine.name,
          is_triggered: true,
          triggeredAt: Date.now(),
          spokenAt: null,
          completedAt: null,
          updatedAt: Date.now(),
          triggerMode: "manual",
        };
      });

      if (!committed) {
        pushToast(`Routine ${routine.name} is already running.`);
        return;
      }

      pushToast(`Sent "${routine.name}" to the kiosk.`);
    } catch (error) {
      console.error(error);
      pushToast(`Failed to trigger ${routine.name}.`);
    }
  }

  function handleFieldChange<K extends keyof Routine>(
    id: string,
    key: K,
    value: Routine[K],
  ) {
    setRoutines((current) =>
      current.map((routine) =>
        routine.id === id ? { ...routine, [key]: value } : routine,
      ),
    );
  }

  async function handleSave(id: string) {
    const routine = routines.find((item) => item.id === id);
    if (!routine) return;

    if (!routine.name.trim() || !routine.time) {
      pushToast("Task name and time are required.");
      return;
    }

    try {
      await updateFamilyPath(familyId, `tasks/${id}`, {
        name: routine.name.trim(),
        text: routine.name.trim(),
        scheduled_time: routine.time,
        is_auto: routine.autoRun,
        updatedAt: Date.now(),
      });

      setRoutines((current) =>
        current.map((item) => (item.id === id ? { ...item, mode: "view" } : item)),
      );
      pushToast("Routine saved.");
    } catch (error) {
      console.error(error);
      pushToast("Failed to save routine.");
    }
  }

  function handleModeChange(id: string, mode: Routine["mode"]) {
    setRoutines((current) =>
      current.map((routine) => (routine.id === id ? { ...routine, mode } : routine)),
    );
  }

  async function handleAddNew() {
    const nextId = `task_${String(Date.now()).slice(-6)}`;

    try {
      await updateFamilyPath(familyId, `tasks/${nextId}`, {
        name: `New routine ${routines.length + 1}`,
        scheduled_time: "09:00",
        is_auto: false,
        status: "Pending",
        text: "",
        is_triggered: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        triggeredAt: null,
        spokenAt: null,
        completedAt: null,
        triggerMode: null,
      });
      pushToast("New routine added.");
    } catch (error) {
      console.error(error);
      pushToast("Failed to add routine.");
    }
  }

  async function handleSendEmergency() {
    setShowEmergencyModal(false);

    try {
      await updateFamilyPath(familyId, "emergency", {
        is_triggered: true,
        triggeredAt: Date.now(),
        message: "Ngoại ơi, con đang gọi. Xin hãy nhìn vào màn hình.",
      });
      pushToast("Emergency services contacted.");
    } catch (error) {
      console.error(error);
      pushToast("Failed to contact emergency services.");
    }
  }

  function handleBottomNav(tab: AppTab) {
    setActiveTab(tab);
    if (tab === "settings") {
      setSettingsPage("root");
    }
  }

  function handleLogoutRequest() {
    if (!authUser) {
      pushToast("There is no active caregiver session.");
      return;
    }
    setShowLogoutModal(true);
  }

  function handleLogoutConfirmed() {
    setShowLogoutModal(false);
    void signOutCaregiver()
      .then(() => {
        setSettingsPage("root");
        pushToast("Logged out successfully.");
      })
      .catch((error) => {
        console.error(error);
        pushToast("Failed to log out. Please try again.");
      });
  }

  function renderMainContent() {
    if (activeTab === "history") {
      return (
        <HistoryScreen
          historyItems={historyItems}
          trackerAlert={trackerAlert}
          pushToast={pushToast}
        />
      );
    }

    if (activeTab === "settings") {
      return (
        <SettingsScreen
          page={settingsPage}
          settings={demoSettings}
          authUser={authUser}
          authLoading={authLoading}
          profileName={profileName}
          profileRole={profileRole}
          profileEmail={profileEmail}
          linkedFamilyMembers={linkedFamilyMembers}
          kioskName={kiosk.name || "Living Room Kiosk"}
          kioskStatus={kiosk.online ? "Demo connected" : "Offline in demo"}
          onOpenPage={setSettingsPage}
          onBack={() => setSettingsPage("root")}
          onUpdateSettings={setDemoSettings}
          onRequestLogout={handleLogoutRequest}
          pushToast={pushToast}
        />
      );
    }

    return (
      <HomeScreen
        elder={elder}
        kiosk={kiosk}
        routines={routines}
        trackerAlert={trackerAlert}
        onAddNew={() => void handleAddNew()}
        onModeChange={handleModeChange}
        onFieldChange={handleFieldChange}
        onTrigger={(id) => void handleTrigger(id)}
        onSave={(id) => void handleSave(id)}
        onOpenEmergency={() => setShowEmergencyModal(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-shell text-slate-900">
      <div className="mx-auto w-full max-w-[1720px] px-4 pb-32 pt-4 sm:px-6 lg:px-8 lg:pt-6">
        <Header avatarSrc={caregiverAvatar} onBellClick={() => pushToast("No new notifications.")} />
        <main className="space-y-8">{renderMainContent()}</main>
      </div>

      <BottomNavigation activeTab={activeTab} onChange={handleBottomNav} />

      {toast ? <Toast message={toast.message} onDismiss={() => setToast(null)} /> : null}

      {showEmergencyModal ? (
        <ConfirmationModal
          title="Send emergency alert?"
          body="This will notify emergency services and local responders immediately."
          confirmLabel="Send Alert"
          onCancel={() => setShowEmergencyModal(false)}
          onConfirm={() => void handleSendEmergency()}
        />
      ) : null}

      {showLogoutModal ? (
        <ConfirmationModal
          title="Log out of caregiver account?"
          body="This signs the caregiver out of Firebase Authentication and returns the app to guest demo mode."
          confirmLabel="Log Out"
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogoutConfirmed}
        />
      ) : null}
    </div>
  );
}

function HistoryScreen({
  historyItems,
  trackerAlert,
  pushToast,
}: {
  historyItems: Routine[];
  trackerAlert: any;
  pushToast: (message: string) => void;
}) {
  return (
    <section className="space-y-6">
      <div className="card-shell p-6 sm:p-8">
        <p className="text-lg font-semibold text-slate-600">History</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Review activity and care events
        </h1>
        <p className="mt-4 max-w-3xl text-lg font-medium leading-8 text-slate-600">
          This timeline gives caregivers a quick read of recent reminders, tracker changes,
          and kiosk-related events in the prototype.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="card-shell p-5 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Recent routines
            </h2>
            <button
              type="button"
              onClick={() => pushToast("Export is not available in demo mode.")}
              className="text-lg font-bold text-brand transition hover:text-blue-700"
            >
              Export
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {historyItems.length === 0 ? (
              <div className="info-box">
                <p className="text-xl font-semibold text-slate-600">No routine history yet.</p>
              </div>
            ) : (
              historyItems.slice(0, 8).map((item) => (
                <div
                  key={item.id}
                  className="rounded-[22px] border border-slate-200/80 bg-lavender px-5 py-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-900">{item.name}</h3>
                      <p className="mt-1 text-base font-semibold text-slate-600">{item.note}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="pill-button bg-white text-slate-700">{item.status}</span>
                      <span className="text-lg font-bold text-brand">
                        {formatClock(item.time)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div className="card-shell p-5 sm:p-6">
            <h2 className="text-3xl font-extrabold text-slate-900">Tracker summary</h2>
            <p className="mt-3 text-lg font-medium text-slate-600">
              Latest tracker alert status is shown here for quick review.
            </p>
            <div className="mt-5 rounded-[22px] bg-lavender p-5">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">
                Current state
              </p>
              <p className="mt-3 text-2xl font-extrabold text-slate-900">
                {trackerAlert.is_active ? "Alert active" : "No active alert"}
              </p>
              <p className="mt-2 text-base font-semibold text-slate-600">
                {trackerAlert.message || "The tracker has not reported a new issue."}
              </p>
            </div>
          </div>

          <div className="card-shell p-5 sm:p-6">
            <h2 className="text-3xl font-extrabold text-slate-900">Kiosk notes</h2>
            <div className="mt-5 space-y-4">
              {[
                "Living Room Kiosk connected in demo mode",
                "Tracker stream synced recently",
                "Voice reminder support is active on the kiosk prototype",
              ].map((note) => (
                <div key={note} className="flex items-start gap-3 rounded-[20px] bg-lavender p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-active" />
                  <p className="text-base font-semibold text-slate-700">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

function SettingsScreen({
  page,
  settings,
  authUser,
  authLoading,
  profileName,
  profileRole,
  profileEmail,
  linkedFamilyMembers,
  kioskName,
  kioskStatus,
  onOpenPage,
  onBack,
  onUpdateSettings,
  onRequestLogout,
  pushToast,
}: {
  page: SettingsPage;
  settings: DemoSettingsState;
  authUser: User | null;
  authLoading: boolean;
  profileName: string;
  profileRole: string;
  profileEmail: string;
  linkedFamilyMembers: string[];
  kioskName: string;
  kioskStatus: string;
  onOpenPage: (page: SettingsPage) => void;
  onBack: () => void;
  onUpdateSettings: Dispatch<SetStateAction<DemoSettingsState>>;
  onRequestLogout: () => void;
  pushToast: (message: string) => void;
}) {
  if (page !== "root") {
    return (
      <SettingsDetailPage
        page={page}
        settings={settings}
        authUser={authUser}
        profileName={profileName}
        profileRole={profileRole}
        profileEmail={profileEmail}
        linkedFamilyMembers={linkedFamilyMembers}
        onBack={onBack}
        onUpdateSettings={onUpdateSettings}
        pushToast={pushToast}
      />
    );
  }

  const enabledNotificationCount = Object.values(settings.notifications).filter(Boolean).length;

  return (
    <section className="space-y-6">
      <div className="card-shell overflow-hidden p-0">
        <div className="bg-[radial-gradient(circle_at_top_left,_rgba(139,108,255,0.16),_transparent_34%),linear-gradient(135deg,#ffffff_0%,#f4efff_100%)] px-6 py-7 sm:px-8 sm:py-8">
          <div className="inline-flex rounded-full bg-active/10 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.22em] text-[#5a34cf]">
            Settings
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Settings
          </h1>
          <p className="mt-3 max-w-3xl text-lg font-medium leading-8 text-slate-600">
            Manage your account, kiosk, alerts, and app preferences.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.08fr_1fr]">
        <div className="space-y-6">
          <ProfileCard
            onViewProfile={() => onOpenPage("profile")}
            isLoggedIn={!!authUser}
            name={profileName}
            role={profileRole}
            email={profileEmail}
          />
          {authLoading ? (
            <div className="rounded-[20px] bg-lavender px-5 py-4 text-base font-semibold text-slate-600">
              Checking caregiver session...
            </div>
          ) : null}

          <SettingsSection title="Account">
            <SettingsTile
              icon={UserRound}
              title="Profile"
              subtitle="View caregiver details"
              onClick={() => onOpenPage("profile")}
            />
            <SettingsTile
              icon={LogIn}
              title="Login / Sign up"
              subtitle={authUser ? `Signed in as ${profileEmail}` : "Open caregiver authentication"}
              onClick={() => onOpenPage("login")}
            />
            <SettingsTile
              icon={Users}
              title="Linked family members"
              subtitle={`${linkedFamilyMembers.length} connected in this household`}
              onClick={() => onOpenPage("linked-family")}
            />
            <SettingsTile
              icon={LogOut}
              title="Log out"
              subtitle={authUser ? "Sign out of the current caregiver account" : "No active session"}
              onClick={onRequestLogout}
            />
          </SettingsSection>

          <SettingsSection title="Kiosk">
            <SettingsTile
              icon={Link2}
              title="Home kiosk connection"
              subtitle={`Connected to ${kioskName}`}
              onClick={() => onOpenPage("kiosk-connection")}
            />
            <SettingsTile
              icon={MonitorSmartphone}
              title="Kiosk display name"
              subtitle={kioskName}
              onClick={() => pushToast("Renaming the kiosk is not available in demo mode.")}
            />
            <SettingsTile
              icon={MonitorSmartphone}
              title="Pair new kiosk"
              subtitle="Connect another in-home screen"
              onClick={() => pushToast("Kiosk pairing is not available in demo mode.")}
            />
            <SettingsTile
              icon={CheckCircle2}
              title="Kiosk status"
              subtitle={kioskStatus}
              onClick={() => pushToast(`Kiosk status: ${kioskStatus}.`)}
            />
          </SettingsSection>

          <SettingsSection title="Care settings">
            <SettingsTile
              icon={UserRound}
              title="Elderly profile"
              subtitle="Demo care recipient profile"
              onClick={() => onOpenPage("elderly-profile")}
            />
            <SettingsTile
              icon={Users}
              title="Emergency contacts"
              subtitle="2 emergency contacts saved"
              onClick={() => onOpenPage("emergency-contacts")}
            />
            <SettingsTile
              icon={Clock3}
              title="Reminder defaults"
              subtitle="Medication and routine preferences"
              onClick={() => onOpenPage("reminder-defaults")}
            />
            <SettingsTile
              icon={HeartPulse}
              title="Tracker settings"
              subtitle="Wearable and movement alerts"
              onClick={() => onOpenPage("tracker-settings")}
            />
            <SettingsTile
              icon={MapPinned}
              title="Geofence settings"
              subtitle="Home safe zone demo controls"
              onClick={() => onOpenPage("geofence-settings")}
            />
          </SettingsSection>
        </div>

        <div className="space-y-6">
          <SettingsSection title="Preferences">
            <SettingsTile
              icon={Globe}
              title="Language"
              subtitle={settings.language}
              onClick={() => onOpenPage("language")}
            />
            <SettingsTile
              icon={Palette}
              title="Appearance"
              subtitle={settings.appearance}
              onClick={() => onOpenPage("appearance")}
            />
            <SettingsTile
              icon={Bell}
              title="Notifications"
              subtitle={`${enabledNotificationCount} enabled`}
              onClick={() => onOpenPage("notifications")}
            />
            <SettingsTile
              icon={Clock3}
              title="Time format"
              subtitle={settings.timeFormat}
              onClick={() => onOpenPage("time-format")}
            />
          </SettingsSection>

          <SettingsSection title="Support">
            <SettingsTile
              icon={Info}
              title="Help Centre"
              subtitle="FAQs and setup guidance"
              onClick={() => onOpenPage("help-centre")}
            />
            <SettingsTile
              icon={Bell}
              title="Contact support"
              subtitle="Demo support page"
              onClick={() => onOpenPage("contact-support")}
            />
            <SettingsTile
              icon={Info}
              title="About Remember.For.Me"
              subtitle="Version 1.0.0-demo"
              onClick={() => onOpenPage("about")}
            />
            <SettingsTile
              icon={ShieldAlert}
              title="Privacy Policy"
              subtitle="Demo placeholder"
              onClick={() => onOpenPage("privacy")}
            />
            <SettingsTile
              icon={Info}
              title="Terms of Service"
              subtitle="Demo placeholder"
              onClick={() => onOpenPage("terms")}
            />
          </SettingsSection>
        </div>
      </div>
    </section>
  );
}

function SettingsDetailPage({
  page,
  settings,
  authUser,
  profileName,
  profileRole,
  profileEmail,
  linkedFamilyMembers,
  onBack,
  onUpdateSettings,
  pushToast,
}: {
  page: SettingsPage;
  settings: DemoSettingsState;
  authUser: User | null;
  profileName: string;
  profileRole: string;
  profileEmail: string;
  linkedFamilyMembers: string[];
  onBack: () => void;
  onUpdateSettings: Dispatch<SetStateAction<DemoSettingsState>>;
  pushToast: (message: string) => void;
}) {
  const simplePages: Record<
    Exclude<
      SettingsPage,
      "root" | "language" | "appearance" | "notifications" | "time-format" | "login"
    >,
    { title: string; subtitle: string; body: ReactNode }
  > = {
    profile: {
      title: "Profile",
      subtitle: authUser ? "Authenticated caregiver profile" : "Guest caregiver profile",
      body: (
        <div className="space-y-4">
          <div className="rounded-[22px] bg-lavender p-5">
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#5a34cf]">
              Caregiver
            </p>
            <h3 className="mt-3 text-3xl font-extrabold text-slate-900">{profileName}</h3>
            <p className="mt-2 text-lg font-semibold text-slate-600">{profileRole}</p>
            <p className="mt-1 text-base font-semibold text-slate-500">{profileEmail}</p>
          </div>
          <div className="rounded-[22px] border border-slate-200/80 bg-white p-5">
            <p className="text-base leading-8 text-slate-700">
              {authUser
                ? "This caregiver profile is being read from Firebase Realtime Database and can be extended later with editable fields, avatar upload, and permissions."
                : "You are viewing guest demo data. Sign in to bind the caregiver profile to a real Firebase Auth account."}
            </p>
          </div>
        </div>
      ),
    },
    "linked-family": {
      title: "Linked family members",
      subtitle: "Care circle for this demo household",
      body: (
        <div className="space-y-3">
          {linkedFamilyMembers.map((member) => (
            <div key={member} className="rounded-[20px] bg-lavender px-5 py-4">
              <p className="text-lg font-extrabold text-slate-900">{member}</p>
            </div>
          ))}
        </div>
      ),
    },
    "kiosk-connection": {
      title: "Home kiosk connection",
      subtitle: "Living Room Kiosk",
      body: (
        <p className="text-lg font-medium leading-8 text-slate-700">
          The caregiver app is linked to a demo kiosk stream. Real kiosk pairing,
          presence verification, and device reassignment can plug in here later.
        </p>
      ),
    },
    "elderly-profile": {
      title: "Elderly profile",
      subtitle: "Demo care recipient details",
      body: (
        <p className="text-lg font-medium leading-8 text-slate-700">
          This page will later show personal care preferences, mobility notes,
          reminder tone preferences, and daily routines shared with the kiosk.
        </p>
      ),
    },
    "emergency-contacts": {
      title: "Emergency contacts",
      subtitle: "Demo contact list",
      body: (
        <div className="space-y-3">
          {["Anna Nguyen - Daughter", "Mr. Minh Tran - Neighbor"].map((contact) => (
            <div key={contact} className="rounded-[20px] bg-lavender px-5 py-4">
              <p className="text-lg font-extrabold text-slate-900">{contact}</p>
            </div>
          ))}
        </div>
      ),
    },
    "reminder-defaults": {
      title: "Reminder defaults",
      subtitle: "Demo reminder preferences",
      body: (
        <p className="text-lg font-medium leading-8 text-slate-700">
          Default reminder timing, follow-up intervals, and voice prompt behavior
          will eventually be configured here for both caregiver and kiosk surfaces.
        </p>
      ),
    },
    "tracker-settings": {
      title: "Tracker settings",
      subtitle: "Demo wearable preferences",
      body: (
        <p className="text-lg font-medium leading-8 text-slate-700">
          Tracker settings will later control wearable syncing, inactivity thresholds,
          and care alerts. No real hardware configuration is active in this demo.
        </p>
      ),
    },
    "geofence-settings": {
      title: "Geofence settings",
      subtitle: "Demo safe zone preferences",
      body: (
        <p className="text-lg font-medium leading-8 text-slate-700">
          Safe zone boundaries and exit alerts are mocked in this prototype.
          Location rules and maps will be powered by real services later.
        </p>
      ),
    },
    "help-centre": {
      title: "Help Centre",
      subtitle: "Demo support content",
      body: (
        <p className="text-lg font-medium leading-8 text-slate-700">
          This placeholder page can later contain onboarding help, caregiver FAQs,
          device setup instructions, and kiosk troubleshooting guidance.
        </p>
      ),
    },
    "contact-support": {
      title: "Contact support",
      subtitle: "Demo contact page",
      body: (
        <p className="text-lg font-medium leading-8 text-slate-700">
          Support messaging is not connected in demo mode. In production, this page
          would offer live chat, email, and issue reporting for caregivers.
        </p>
      ),
    },
    about: {
      title: "About Remember.For.Me",
      subtitle: "Version 1.0.0-demo",
      body: (
        <p className="text-lg font-medium leading-8 text-slate-700">
          Remember.For.Me is a caregiver plus home kiosk concept for elderly care.
          This build is a demo prototype with real Firebase authentication and
          family-scoped demo data wiring.
        </p>
      ),
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "Demo placeholder",
      body: (
        <p className="text-lg font-medium leading-8 text-slate-700">
          This is demo legal content only. A full privacy policy would explain how
          caregiver, kiosk, and elderly care data are stored and protected.
        </p>
      ),
    },
    terms: {
      title: "Terms of Service",
      subtitle: "Demo placeholder",
      body: (
        <p className="text-lg font-medium leading-8 text-slate-700">
          This prototype page stands in for the final service terms. No real user
          contract, payment flow, or backend agreement is active yet.
        </p>
      ),
    },
  };

  if (page === "login") {
    return (
      <SettingsDetailLayout
        title="Login / Sign up"
        subtitle="Authenticate caregivers with Firebase email and password"
        onBack={onBack}
      >
        <AuthCard
          authUser={authUser}
          profileName={profileName}
          profileEmail={profileEmail}
          pushToast={pushToast}
        />
      </SettingsDetailLayout>
    );
  }

  if (page === "language") {
    return (
      <SettingsDetailLayout
        title="Language"
        subtitle="Choose a display language for the caregiver app"
        onBack={onBack}
      >
        <SelectableList
          items={["English", "Vietnamese", "Chinese"]}
          selected={settings.language}
          onSelect={(value) =>
            onUpdateSettings((current) => ({
              ...current,
              language: value as DemoSettingsState["language"],
            }))
          }
        />
      </SettingsDetailLayout>
    );
  }

  if (page === "appearance") {
    return (
      <SettingsDetailLayout
        title="Appearance"
        subtitle="Choose how the app should look"
        onBack={onBack}
      >
        <SelectableList
          items={["Light", "Dark", "System"]}
          selected={settings.appearance}
          onSelect={(value) =>
            onUpdateSettings((current) => ({
              ...current,
              appearance: value as DemoSettingsState["appearance"],
            }))
          }
        />
      </SettingsDetailLayout>
    );
  }

  if (page === "time-format") {
    return (
      <SettingsDetailLayout
        title="Time format"
        subtitle="Choose how time is displayed"
        onBack={onBack}
      >
        <SelectableList
          items={["12-hour", "24-hour"]}
          selected={settings.timeFormat}
          onSelect={(value) =>
            onUpdateSettings((current) => ({
              ...current,
              timeFormat: value as DemoSettingsState["timeFormat"],
            }))
          }
        />
      </SettingsDetailLayout>
    );
  }

  if (page === "notifications") {
    const entries = [
      ["medicationReminders", "Medication reminders"],
      ["routineReminders", "Routine reminders"],
      ["trackerAlerts", "Tracker alerts"],
      ["emergencyAlerts", "Emergency alerts"],
      ["weeklySummary", "Weekly summary"],
    ] as const;

    return (
      <SettingsDetailLayout
        title="Notifications"
        subtitle="Control which caregiver alerts stay enabled"
        onBack={onBack}
      >
        <div className="card-shell p-4 sm:p-5">
          <div className="divide-y divide-slate-200/80">
            {entries.map(([key, label]) => (
              <div
                key={key}
                className="flex items-center justify-between gap-4 px-2 py-4 sm:px-3"
              >
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">{label}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {settings.notifications[key] ? "Enabled" : "Disabled"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSettings((current) => ({
                      ...current,
                      notifications: {
                        ...current.notifications,
                        [key]: !current.notifications[key],
                      },
                    }))
                  }
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition ${
                    settings.notifications[key] ? "bg-active" : "bg-slate-300"
                  }`}
                  aria-label={label}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      settings.notifications[key] ? "translate-x-9" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </SettingsDetailLayout>
    );
  }

  const content = simplePages[page as keyof typeof simplePages];

  return (
    <SettingsDetailLayout title={content.title} subtitle={content.subtitle} onBack={onBack}>
      <div className="card-shell p-6 sm:p-8">{content.body}</div>
    </SettingsDetailLayout>
  );
}

function SettingsDetailLayout({
  title,
  subtitle,
  onBack,
  children,
}: {
  title: string;
  subtitle: string;
  onBack: () => void;
  children: ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="card-shell p-6 sm:p-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full bg-lavender px-4 py-2 text-sm font-extrabold uppercase tracking-[0.22em] text-[#5a34cf] transition hover:bg-[#e4ddff]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-lg font-medium leading-8 text-slate-600">
          {subtitle}
        </p>
      </div>

      {children}
    </section>
  );
}

function ProfileCard({
  onViewProfile,
  isLoggedIn,
  name,
  role,
  email,
}: {
  onViewProfile: () => void;
  isLoggedIn: boolean;
  name: string;
  role: string;
  email: string;
}) {
  return (
    <section className="card-shell p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-active/10">
            <UserRound className="h-10 w-10 text-active" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">{name}</h2>
            <p className="mt-1 text-lg font-semibold text-slate-600">{role}</p>
            <p className="mt-1 text-base font-semibold text-slate-500">{email}</p>
          </div>
        </div>

        <div className="space-y-3 sm:text-right">
          <div
            className={`inline-flex rounded-full px-4 py-2 text-sm font-extrabold uppercase tracking-[0.22em] ${
              isLoggedIn ? "bg-[#e9f6eb] text-action" : "bg-[#f3ecff] text-[#5a34cf]"
            }`}
          >
            {isLoggedIn ? "Signed in" : "Guest mode"}
          </div>
          <div>
            <button
              type="button"
              onClick={onViewProfile}
              className="inline-flex items-center gap-2 rounded-full bg-active px-5 py-3 text-lg font-bold text-white transition hover:bg-[#7a5df0]"
            >
              View profile
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AuthCard({
  authUser,
  profileName,
  profileEmail,
  pushToast,
}: {
  authUser: User | null;
  profileName: string;
  profileEmail: string;
  pushToast: (message: string) => void;
}) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [displayName, setDisplayName] = useState(profileName === defaultProfile.name ? "" : profileName);
  const [email, setEmail] = useState(authUser?.email || profileEmail || "");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setEmail(authUser?.email || profileEmail || "");
    if (authUser && profileName !== defaultProfile.name) {
      setDisplayName(profileName);
    }
  }, [authUser, profileEmail, profileName]);

  async function handleSubmit() {
    if (!email.trim() || !password.trim()) {
      pushToast("Email and password are required.");
      return;
    }

    if (mode === "signup" && !displayName.trim()) {
      pushToast("Display name is required for sign up.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "login") {
        await signInCaregiver(email.trim(), password);
        pushToast("Signed in successfully.");
      } else {
        await signUpCaregiver(email.trim(), password, displayName.trim());
        pushToast("Account created and signed in.");
      }
      setPassword("");
    } catch (error: any) {
      console.error(error);
      pushToast(error?.message || "Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (authUser) {
    return (
      <div className="card-shell p-6 sm:p-8">
        <div className="rounded-[22px] bg-lavender p-5">
          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#5a34cf]">
            Active session
          </p>
          <h3 className="mt-3 text-3xl font-extrabold text-slate-900">{profileName}</h3>
          <p className="mt-2 text-lg font-semibold text-slate-600">{profileEmail}</p>
          <p className="mt-2 text-base font-medium leading-7 text-slate-600">
            This caregiver is authenticated with Firebase. Use the Log out row in Settings
            to end the current session.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-shell p-6 sm:p-8">
      <div className="inline-flex rounded-full bg-lavender p-1">
        {(["login", "signup"] as const).map((item) => {
          const active = mode === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`rounded-full px-5 py-2 text-sm font-extrabold uppercase tracking-[0.16em] transition ${
                active ? "bg-white text-brand shadow-sm" : "text-slate-500"
              }`}
            >
              {item === "login" ? "Login" : "Sign up"}
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-4">
        {mode === "signup" ? (
          <label className="block space-y-2">
            <span className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
              Display name
            </span>
            <input
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className="h-16 w-full rounded-[18px] bg-lavender px-5 text-lg font-medium text-slate-800 outline-none"
              placeholder="Hy Nguyen"
            />
          </label>
        ) : null}

        <label className="block space-y-2">
          <span className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
            Email
          </span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-16 w-full rounded-[18px] bg-lavender px-5 text-lg font-medium text-slate-800 outline-none"
            placeholder="hy@example.com"
            type="email"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
            Password
          </span>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-16 w-full rounded-[18px] bg-lavender px-5 text-lg font-medium text-slate-800 outline-none"
            placeholder="At least 6 characters"
            type="password"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={() => void handleSubmit()}
        disabled={isSubmitting}
        className="mt-6 inline-flex min-h-[68px] w-full items-center justify-center rounded-[20px] bg-active px-6 text-xl font-bold text-white transition hover:bg-[#7a5df0] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
      </button>
    </div>
  );
}

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="card-shell p-5 sm:p-6">
      <h2 className="text-3xl font-extrabold text-slate-900">{title}</h2>
      <div className="mt-4 divide-y divide-slate-200/80">{children}</div>
    </section>
  );
}

function SettingsTile({
  icon: Icon,
  title,
  subtitle,
  onClick,
}: {
  icon: typeof Home;
  title: string;
  subtitle?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 px-1 py-4 text-left transition hover:opacity-90"
    >
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-active/10 text-active">
        <Icon className="h-6 w-6" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-extrabold text-slate-900">{title}</span>
        {subtitle ? (
          <span className="mt-1 block text-sm font-semibold leading-6 text-slate-500">
            {subtitle}
          </span>
        ) : null}
      </span>
      <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
    </button>
  );
}

function SelectableList({
  items,
  selected,
  onSelect,
}: {
  items: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="card-shell p-4 sm:p-5">
      <div className="divide-y divide-slate-200/80">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            className="flex w-full items-center justify-between gap-4 px-2 py-4 text-left"
          >
            <span className="text-xl font-extrabold text-slate-900">{item}</span>
            {item === selected ? (
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-active text-white">
                <Check className="h-5 w-5" />
              </span>
            ) : (
              <ChevronRight className="h-5 w-5 text-slate-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function buildTaskNote(task: any) {
  const startedAt = task.triggeredAt || task.lastTriggeredAt;
  if (task.status === "Running" && startedAt) {
    return `Started at ${new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(startedAt))}`;
  }

  if (task.status === "Completed" && task.completedAt) {
    return `Completed at ${new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(task.completedAt))}`;
  }

  return task.is_auto ? "Auto mode enabled" : "Manual mode only";
}
