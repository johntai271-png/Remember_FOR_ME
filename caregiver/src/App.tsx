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
  Sparkles,
} from "lucide-react";
import type { User } from "firebase/auth";

import { BottomNavigation, ConfirmationModal, Header, Toast } from "./components/common";
import {
  demoFamilyId,
  getUserProfile,
  linkKioskByPin,
  signInCaregiver,
  signOutCaregiver,
  signUpCaregiver,
  subscribeToAuth,
  subscribeToFamilyPath,
  subscribeToUserProfile,
  transactFamilyTask,
  updateFamilyPath,
  updateUserProfile,
  pushFamilyEvent,
} from "./firebase";
import { HomeScreen, ManagementScreen } from "./screens/HomeScreen";
import {
  DEFAULT_HOME,
  normalizeHome,
  type HomeZone,
} from "./components/LiveSafetyMap";
import type {
  AppTab,
  AlertFeedItem,
  BleTag,
  CaregiverProfile,
  DemoSettingsState,
  Routine,
  RoutinePeriod,
  SettingsPage,
  ToastState,
} from "./types";
import { createAvatarSvg, formatClock, formatRelativeTime } from "./utils";

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

function playAlertSound() {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    let time = audioCtx.currentTime;
    // Play 4 alternating tone beeps (emergency buzzer)
    for (let i = 0; i < 4; i++) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(i % 2 === 0 ? 880 : 660, time); // A5 and E5 alternating tones
      
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.4, time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(time);
      osc.stop(time + 0.25);
      
      time += 0.3;
    }
  } catch (err) {
    console.error("Failed to play synthesized alert sound:", err);
  }
}

// Thông báo hệ thống trên điện thoại/máy người chăm sóc (khi dashboard đang mở
// hoặc đã "Thêm vào màn hình chính" dạng PWA). Bổ sung cho chuông báo.
function showSystemNotification(title: string, body: string) {
  try {
    if (typeof Notification === "undefined") return;
    if (Notification.permission === "granted") {
      new Notification(title, { body, tag: "rfm-tracker", icon: "/vite.svg" });
    }
  } catch (err) {
    console.error("Notification failed:", err);
  }
}

const defaultBleTags: BleTag[] = [
  {
    id: "wallet",
    name: "Leather Wallet Tag",
    location: "Hallway Key Box",
    hardwareId: "BLE-WALLET-001",
    status: "safe",
    connectionStatus: "connected",
    lastConnectedAt: Date.now() - 5 * 60 * 1000,
  },
  {
    id: "keys",
    name: "Front Door Keys Tag",
    location: "Kitchen Hook",
    hardwareId: "BLE-KEYS-002",
    status: "safe",
    connectionStatus: "connected",
    lastConnectedAt: Date.now() - 9 * 60 * 1000,
  },
  {
    id: "pillbox",
    name: "Pillbox Smart Tag",
    location: "Dining Table Drawer",
    hardwareId: "BLE-PILL-003",
    status: "safe",
    connectionStatus: "disconnected",
    lastConnectedAt: null,
  },
];

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
  const [home, setHome] = useState<HomeZone>(DEFAULT_HOME);
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
  const [dataLoading, setDataLoading] = useState(true);
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
  const [bleTags, setBleTags] = useState<BleTag[]>(defaultBleTags);
  const [feedItems, setFeedItems] = useState<AlertFeedItem[]>([]);
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);

  const lastPersistedSettingsRef = useRef(JSON.stringify(initialDemoSettings));

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  // Xin quyền thông báo hệ thống để "báo vô điện thoại người con" khi cụ ra khỏi nhà.
  useEffect(() => {
    try {
      if (typeof Notification !== "undefined" && Notification.permission === "default") {
        void Notification.requestPermission();
      }
    } catch {
      /* trình duyệt không hỗ trợ Notification — bỏ qua, vẫn còn chuông + banner */
    }
  }, []);

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
        setOnboardingCompleted(true);
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
    let isFirstElder = true;
    let lastVitalsStatus = "Normal";
    const unsubElder = subscribeToFamilyPath(familyId, "elder", (snapshot) => {
      const value = snapshot.val();
      if (value) {
        setElder(value);
        const vitalsStatus = value.vitals?.status || "Normal";
        if (vitalsStatus !== "Normal" && vitalsStatus !== lastVitalsStatus && !isFirstElder) {
          playAlertSound();
          // Chỉ bật thông báo cho mức nguy hiểm rõ ràng (Cao/Thấp), bỏ qua
          // "Elevated" do kiosk mô phỏng ngẫu nhiên để tránh báo giả khi demo.
          const isDanger = /danger|high|low|cao|thấp/i.test(vitalsStatus);
          if (isDanger) {
            const bpm = value.vitals?.heartRateBpm;
            const isHigh = /high|cao/i.test(vitalsStatus);
            showSystemNotification(
              `❤️ Nhịp tim ${isHigh ? "cao" : "thấp"} bất thường`,
              `${bpm ? `${bpm} bpm` : vitalsStatus} — cần kiểm tra ngay.`,
            );
          }
        }
        lastVitalsStatus = vitalsStatus;
      }
      isFirstElder = false;
    });

    const unsubKiosk = subscribeToFamilyPath(familyId, "kiosk", (snapshot) => {
      const value = snapshot.val();
      if (value) setKiosk((current: any) => ({ ...current, ...value }));
    });

    // Vùng an toàn (geofence): toạ độ nhà + bán kính. Chưa cấu hình → dùng mặc định.
    const unsubHome = subscribeToFamilyPath(familyId, "home", (snapshot) => {
      setHome(normalizeHome(snapshot.val()));
    });

    let isFirstTracker = true;
    let lastTrackerActive = false;
    const unsubTracker = subscribeToFamilyPath(familyId, "tracker_alert", (snapshot) => {
      const value = snapshot.val();
      if (value) {
        setTrackerAlert(value);
        const active =
          value.is_active === true || value.is_active === "true" || value.is_active === "True";
        // Chỉ báo khi CHUYỂN sang active (tránh lặp), và không kêu ở lần load đầu.
        if (active && !lastTrackerActive && !isFirstTracker) {
          playAlertSound();
          showSystemNotification(
            "🚨 Người thân đã ra khỏi nhà",
            value.message || "GPS phát hiện ra khỏi vùng an toàn.",
          );
        }
        lastTrackerActive = active;
      }
      isFirstTracker = false;
    });

    const unsubBleTags = subscribeToFamilyPath(familyId, "ble_tags", (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setBleTags(familyId === demoFamilyId ? defaultBleTags : []);
        return;
      }

      const list = Object.entries(data).map(([id, value]: [string, any]) => ({
        id,
        name: value.name || "Untitled tag",
        location: value.location || "No location set",
        hardwareId: value.hardwareId || "",
        status: value.status === "away" ? "away" : "safe",
        connectionStatus:
          value.connectionStatus === "connected" ||
          value.connectionStatus === "pairing" ||
          value.connectionStatus === "disconnected"
            ? value.connectionStatus
            : "disconnected",
        lastConnectedAt: value.lastConnectedAt || null,
      })) as BleTag[];

      setBleTags(list);
    });

    const unsubTasks = subscribeToFamilyPath(familyId, "tasks", (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.entries(data).map(([id, value]: [string, any]) => ({
        id,
        name: value.name || "Untitled task",
        time: value.scheduled_time || "09:00",
        autoRun: !!value.is_auto,
        period: normalizeRoutinePeriod(value.period, value.scheduled_time),
        voiceEnabled: !!(value.voiceEnabled ?? value.voice ?? false),
        voiceClip: typeof value.voiceClip === "string" && value.voiceClip ? value.voiceClip : null,
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
      setDataLoading(false);
    });

    const unsubEvents = subscribeToFamilyPath(familyId, "events", (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setFeedItems([]);
        return;
      }
      const list = Object.entries(data).map(([id, val]: [string, any]) => ({
        id,
        level:
          val.type === "emergency"
            ? "danger"
            : val.type === "complete"
              ? "success"
              : val.type === "tracker_alert"
                ? "warning"
                : "info",
        title: val.title || "Activity Log",
        message: val.message || "",
        timestampLabel: formatRelativeTime(val.timestamp || Date.now()),
        timestamp: val.timestamp || 0,
      }));
      // Sort descending by timestamp
      list.sort((a, b) => b.timestamp - a.timestamp);
      // Keep only last 10 events
      setFeedItems(list.slice(0, 10));
    });

    const unsubOnboarding = subscribeToFamilyPath(familyId, "onboarding_completed", (snapshot) => {
      setOnboardingCompleted(!!snapshot.val());
    });

    return () => {
      unsubElder();
      unsubKiosk();
      unsubHome();
      unsubTracker();
      unsubBleTags();
      unsubTasks();
      unsubEvents();
      unsubOnboarding();
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

  const completedRoutines = useMemo(
    () => historyItems.filter((routine) => routine.status === "Completed").slice(0, 4),
    [historyItems],
  );

  const upcomingRoutine = useMemo(() => {
    const pending = routines.filter((routine) => routine.status !== "Completed");
    if (pending.length === 0) return null;

    const sorted = [...pending].sort((a, b) => a.time.localeCompare(b.time));
    const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
    const nextToday = sorted.find((routine) => {
      const [hourText = "0", minuteText = "0"] = routine.time.split(":");
      const minutes = Number(hourText) * 60 + Number(minuteText);
      return minutes >= nowMinutes;
    });

    return nextToday || sorted[0] || null;
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

  async function pushFeedItem(item: Omit<AlertFeedItem, "id" | "timestampLabel">) {
    try {
      let type: "trigger" | "complete" | "emergency" | "tracker_alert" = "trigger";
      if (item.level === "danger") type = "emergency";
      else if (item.level === "success") type = "complete";
      else if (item.level === "warning") type = "tracker_alert";

      await pushFamilyEvent(familyId, {
        type,
        title: item.title,
        message: item.message,
        by: caregiverProfile?.name || authUser?.displayName || "Caregiver",
      });
    } catch (error) {
      console.error("Failed to push event:", error);
    }
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
      pushFeedItem({
        level: "info",
        title: "Reminder sent to kiosk",
        message: `${routine.name} was pushed for ${formatClock(routine.time)}.`,
      });
    } catch (error) {
      console.error(error);
      pushToast(`Failed to trigger ${routine.name}.`);
    }
  }

  async function handleRecordVoice(id: string, clip: string | null) {
    // Optimistic local update so the recorder reflects instantly.
    setRoutines((current) =>
      current.map((routine) => (routine.id === id ? { ...routine, voiceClip: clip } : routine)),
    );
    try {
      await updateFamilyPath(familyId, `tasks/${id}`, {
        voiceClip: clip,
        voiceClipUpdatedAt: clip ? Date.now() : null,
      });
      pushToast(clip ? "Đã lưu giọng gia đình cho lời nhắc." : "Đã xoá giọng gia đình.");
    } catch (error) {
      console.error(error);
      pushToast("Không lưu được giọng gia đình.");
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
        period: routine.period,
        voiceEnabled: routine.voiceEnabled,
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
        period: "morning",
        voiceEnabled: true,
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
      pushFeedItem({
        level: "success",
        title: "Routine created",
        message: `New routine ${routines.length + 1} was added to the caregiver plan.`,
      });
    } catch (error) {
      console.error(error);
      pushToast("Failed to add routine.");
    }
  }

  async function handleReset(id: string) {
    const routine = routines.find((item) => item.id === id);
    if (!routine) return;
    try {
      await updateFamilyPath(familyId, `tasks/${id}`, {
        status: "Pending",
        is_triggered: false,
        triggeredAt: null,
        spokenAt: null,
        completedAt: null,
        triggerMode: null,
        updatedAt: Date.now(),
      });
      pushToast(`"${routine.name}" reset to Pending.`);
    } catch (error) {
      console.error(error);
      pushToast("Failed to reset routine.");
    }
  }

  async function handleClearCompleted() {
    const completed = routines.filter((item) => item.status === "Completed");
    if (completed.length === 0) return;
    const confirm = window.confirm(`Are you sure you want to permanently delete all ${completed.length} completed routines?`);
    if (!confirm) return;
    try {
      const updates: Record<string, any> = {};
      completed.forEach((routine) => {
        updates[`tasks/${routine.id}`] = null;
      });
      await updateFamilyPath(familyId, "", updates);
      pushToast(`Deleted ${completed.length} completed routines.`);
    } catch (error) {
      console.error(error);
      pushToast("Failed to clear completed routines.");
    }
  }

  async function handleResetTimeline() {
    if (feedItems.length === 0) {
      pushToast("Timeline is already empty.");
      return;
    }
    const confirm = window.confirm(
      "Xóa toàn bộ dòng thời gian cảnh báo (Alerts Timeline)?",
    );
    if (!confirm) return;
    try {
      await updateFamilyPath(familyId, "", { events: null });
      pushToast("Alerts timeline reset.");
    } catch (error) {
      console.error(error);
      pushToast("Failed to reset timeline.");
    }
  }

  // Reset toàn bộ về trạng thái sạch cho một lượt demo mới:
  // mọi lời nhắc -> Pending (giữ nguyên tên/giờ/GIỌNG đã ghi) + xoá Alerts Timeline.
  async function handleResetDemo() {
    const ok = window.confirm(
      "Reset demo?\n\n• Đưa tất cả lời nhắc về Pending\n• Xoá sạch Alerts Timeline\n\n(Giữ nguyên tên, giờ và giọng gia đình đã ghi.)",
    );
    if (!ok) return;
    try {
      const updates: Record<string, any> = { events: null };
      routines.forEach((routine) => {
        updates[`tasks/${routine.id}/status`] = "Pending";
        updates[`tasks/${routine.id}/is_triggered`] = false;
        updates[`tasks/${routine.id}/triggeredAt`] = null;
        updates[`tasks/${routine.id}/spokenAt`] = null;
        updates[`tasks/${routine.id}/completedAt`] = null;
        updates[`tasks/${routine.id}/triggerMode`] = null;
        updates[`tasks/${routine.id}/updatedAt`] = Date.now();
      });
      await updateFamilyPath(familyId, "", updates);
      pushToast("Đã reset demo — mọi lời nhắc về Pending, timeline đã xoá.");
    } catch (error) {
      console.error(error);
      pushToast("Reset demo thất bại.");
    }
  }

  async function handleSendEmergency() {
    setShowEmergencyModal(false);

    try {
      await updateFamilyPath(familyId, "emergency", {
        is_triggered: true,
        triggeredAt: Date.now(),
        message: "Emergency! Your caregiver is calling. Please look at the screen.",
      });
      pushToast("Emergency services contacted.");
      pushFeedItem({
        level: "danger",
        title: "Emergency workflow started",
        message: "The caregiver requested immediate assistance from the home workflow.",
      });
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

  async function handleToggleTag(id: string) {
    const target = bleTags.find((item) => item.id === id);
    if (!target) return;

    const nextStatus = target.status === "safe" ? "away" : "safe";
    setBleTags((current) =>
      current.map((tag) =>
        tag.id === id
          ? {
              ...tag,
              status: nextStatus,
            }
          : tag,
      ),
    );

    try {
      await updateFamilyPath(familyId, `ble_tags/${id}`, {
        status: nextStatus,
        updatedAt: Date.now(),
      });
    } catch (error) {
      console.error(error);
      pushToast("Failed to update tag status.");
    }

    pushFeedItem({
      level: target.status === "safe" ? "warning" : "success",
      title: target.status === "safe" ? "Tag moved out of range" : "Tag returned to home zone",
      message:
        target.status === "safe"
          ? `${target.name} is no longer near ${target.location}.`
          : `${target.name} is back near ${target.location}.`,
    });
  }

  async function handleAddTag(name: string, location: string, hardwareId: string) {
    const trimmedName = name.trim();
    const trimmedLocation = location.trim();
    const trimmedHardwareId = hardwareId.trim();

    if (!trimmedName || !trimmedLocation || !trimmedHardwareId) {
      pushToast("Tag name, location, and device ID are required.");
      return false;
    }

    const nextTag: BleTag = {
      id: `tag_${Date.now()}`,
      name: trimmedName,
      location: trimmedLocation,
      hardwareId: trimmedHardwareId,
      status: "safe",
      connectionStatus: "disconnected",
      lastConnectedAt: null,
    };

    try {
      await updateFamilyPath(familyId, `ble_tags/${nextTag.id}`, {
        name: nextTag.name,
        location: nextTag.location,
        hardwareId: nextTag.hardwareId,
        status: nextTag.status,
        connectionStatus: nextTag.connectionStatus,
        lastConnectedAt: nextTag.lastConnectedAt,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      pushFeedItem({
        level: "success",
        title: "New BLE tag added",
        message: `${trimmedName} was added for ${trimmedLocation}.`,
      });
      pushToast("Tag added.");
      return true;
    } catch (error) {
      console.error(error);
      pushToast("Failed to add tag.");
      return false;
    }
  }

  async function handleUpdateTag(
    id: string,
    patch: Partial<Pick<BleTag, "name" | "location" | "hardwareId">>,
  ) {
    const target = bleTags.find((item) => item.id === id);
    if (!target) return;

    const nextName = patch.name?.trim() ?? target.name;
    const nextLocation = patch.location?.trim() ?? target.location;
    const nextHardwareId = patch.hardwareId?.trim() ?? target.hardwareId;

    if (!nextName || !nextLocation || !nextHardwareId) {
      pushToast("Tag name, location, and device ID cannot be empty.");
      return;
    }

    try {
      await updateFamilyPath(familyId, `ble_tags/${id}`, {
        name: nextName,
        location: nextLocation,
        hardwareId: nextHardwareId,
        updatedAt: Date.now(),
      });
    } catch (error) {
      console.error(error);
      pushToast("Failed to update tag.");
      return;
    }

    pushFeedItem({
      level: "info",
      title: "BLE tag updated",
      message: `${nextName} is now assigned to ${nextLocation}.`,
    });
    pushToast("Tag updated.");
  }

  async function handleDeleteTag(id: string) {
    const target = bleTags.find((item) => item.id === id);
    if (!target) return;

    try {
      await updateFamilyPath(familyId, "ble_tags", {
        [id]: null,
      });
    } catch (error) {
      console.error(error);
      pushToast("Failed to delete tag.");
      return;
    }

    pushFeedItem({
      level: "warning",
      title: "BLE tag removed",
      message: `${target.name} was removed from the caregiver dashboard.`,
    });
    pushToast("Tag deleted.");
  }

  async function handleConnectTag(id: string) {
    const target = bleTags.find((item) => item.id === id);
    if (!target) return;
    if (!target.hardwareId.trim()) {
      pushToast("Add a device ID before connecting this tag.");
      return;
    }

    try {
      await updateFamilyPath(familyId, `ble_tags/${id}`, {
        connectionStatus: "connected",
        lastConnectedAt: Date.now(),
        updatedAt: Date.now(),
      });
      pushFeedItem({
        level: "success",
        title: "BLE tag connected",
        message: `${target.name} is now paired with device ID ${target.hardwareId}.`,
      });
      pushToast("Tag marked as connected.");
    } catch (error) {
      console.error(error);
      pushToast("Failed to connect tag.");
    }
  }

  async function handleDisconnectTag(id: string) {
    const target = bleTags.find((item) => item.id === id);
    if (!target) return;

    try {
      await updateFamilyPath(familyId, `ble_tags/${id}`, {
        connectionStatus: "disconnected",
        updatedAt: Date.now(),
      });
      pushFeedItem({
        level: "warning",
        title: "BLE tag disconnected",
        message: `${target.name} is no longer paired to the active caregiver session.`,
      });
      pushToast("Tag disconnected.");
    } catch (error) {
      console.error(error);
      pushToast("Failed to disconnect tag.");
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

  async function handleSimulateLocation(status: "in_home" | "out_of_home") {
    try {
      const isOutside = status === "out_of_home";
      // Model BLE: chỉ đổi trạng thái trong/ngoài nhà (kiosk quét tag). Không có
      // toạ độ GPS — giống hệt khi kiosk mất tín hiệu tag ở nhà.
      await updateFamilyPath(familyId, "elder", {
        status: status,
        locationLabel: isOutside ? "Outside Safe Zone" : "In Home",
        lastSeenAt: Date.now(),
        updatedAt: Date.now(),
      });

      await updateFamilyPath(familyId, "tracker_alert", {
        is_active: isOutside,
        type: isOutside ? "out_of_safe_zone" : null,
        message: isOutside
          ? "Wearable tracker detected elder outside the geofence!"
          : "Elder is safe inside the home zone.",
        severity: isOutside ? "danger" : "normal",
        safeZoneStatus: isOutside ? "outside" : "inside",
        source: "BLE tracker",
        updatedAt: Date.now(),
      });

      await pushFeedItem({
        level: isOutside ? "danger" : "success",
        title: isOutside ? "Geofence Breach" : "Elder Returned Home",
        message: isOutside
          ? "Warning: Wearable tracker detected elder crossed the geofence zone!"
          : "Elder is safe inside the home zone.",
      });

      pushToast(`Simulated location set to: ${isOutside ? "Away" : "Home"}`);
    } catch (err) {
      console.error(err);
      pushToast("Failed to simulate location.");
    }
  }

  async function handleSimulateHeartRate(bpm: number, label: "Normal" | "High" | "Low") {
    try {
      const isNormal = label === "Normal";
      const status = isNormal ? "Normal" : label === "High" ? "Dangerously High" : "Dangerously Low";

      await updateFamilyPath(familyId, "elder/vitals", {
        heartRateBpm: bpm,
        status: status,
        isOverride: true,
        updatedAt: Date.now(),
      });

      await pushFeedItem({
        level: isNormal ? "success" : "danger",
        title: isNormal ? "Vitals Normal" : "Vitals Warning",
        message: isNormal
          ? `Heart rate normalized at ${bpm} bpm.`
          : `Alert: Heart rate detected at ${bpm} bpm (${status})!`,
      });

      pushToast(`Simulated heart rate: ${bpm} BPM (${label})`);
    } catch (err) {
      console.error(err);
      pushToast("Failed to simulate heart rate.");
    }
  }

  async function handleResetSimulation() {
    try {
      await updateFamilyPath(familyId, "elder/vitals", {
        isOverride: false,
        updatedAt: Date.now(),
      });
      await handleSimulateLocation("in_home");
      pushToast("Simulation reset to automatic Kiosk mode.");
    } catch (err) {
      console.error(err);
      pushToast("Failed to reset simulation.");
    }
  }

  async function handleUpdateCaregiverProfileName(newName: string) {
    setProfileName(newName);
    if (authUser) {
      try {
        const { ref: dbRef, update: dbUpdate } = await import("firebase/database");
        const userProfileRef = dbRef(database, `users/${authUser.uid}`);
        await dbUpdate(userProfileRef, {
          name: newName,
        });
      } catch (err) {
        console.error("Failed to update user profile name in DB:", err);
      }
    }
  }

  async function handleRerunOnboarding() {
    try {
      setOnboardingCompleted(false);
      await updateFamilyPath(familyId, "onboarding_completed", {
        onboarding_completed: false,
      });
      await updateFamilyPath(familyId, "kiosk", {
        online: false,
        updatedAt: Date.now(),
      });
      pushToast("Onboarding setup wizard activated. Kiosk will reset to pairing screen.");
    } catch (err) {
      console.error(err);
      pushToast("Setup wizard activated.");
    }
  }

  function renderMainContent() {
    const showOnboarding = authUser !== null && onboardingCompleted === false;

    if (showOnboarding) {
      return (
        <div className="mx-auto w-full max-w-[600px] py-6">
          <OnboardingWizard
            familyId={familyId}
            pushToast={pushToast}
            caregiverName={profileName}
            onComplete={() => {}}
          />
        </div>
      );
    }

    if (activeTab === "history") {
      return (
        <ManagementScreen
          routines={routines}
          bleTags={bleTags}
          feedItems={feedItems}
          dataLoading={dataLoading}
          onAddNew={() => void handleAddNew()}
          onModeChange={handleModeChange}
          onFieldChange={handleFieldChange}
          onTrigger={(id) => void handleTrigger(id)}
          onReset={(id) => void handleReset(id)}
          onSave={(id) => void handleSave(id)}
          onRecordVoice={(id, clip) => void handleRecordVoice(id, clip)}
          onOpenEmergency={() => setShowEmergencyModal(true)}
          onToggleTag={(id) => void handleToggleTag(id)}
          onAddTag={(name, location, hardwareId) => handleAddTag(name, location, hardwareId)}
          onUpdateTag={(id, patch) => void handleUpdateTag(id, patch)}
          onDeleteTag={(id) => void handleDeleteTag(id)}
          onConnectTag={(id) => void handleConnectTag(id)}
          onDisconnectTag={(id) => void handleDisconnectTag(id)}
          onClearCompleted={() => void handleClearCompleted()}
          onResetTimeline={() => void handleResetTimeline()}
          onResetDemo={() => void handleResetDemo()}
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
          familyId={familyId}
          onOpenPage={setSettingsPage}
          onBack={() => setSettingsPage("root")}
          onUpdateSettings={setDemoSettings}
          onRequestLogout={handleLogoutRequest}
          onUpdateCaregiverName={handleUpdateCaregiverProfileName}
          onRerunOnboarding={handleRerunOnboarding}
          pushToast={pushToast}
        />
      );
    }

    return (
      <HomeScreen
        elder={elder}
        kiosk={kiosk}
        home={home}
        trackerAlert={trackerAlert}
        completedRoutines={completedRoutines}
        upcomingRoutine={upcomingRoutine}
        dataLoading={dataLoading}
        onSimulateLocation={handleSimulateLocation}
        onSimulateHeartRate={handleSimulateHeartRate}
        onResetSimulation={handleResetSimulation}
      />
    );
  }

  const showOnboarding = authUser !== null && onboardingCompleted === false;

  return (
    <div className="min-h-screen bg-shell text-slate-900">
      <div className="mx-auto w-full max-w-[1720px] px-4 pb-32 pt-4 sm:px-6 lg:px-8 lg:pt-6">
        <Header avatarSrc={caregiverAvatar} onBellClick={() => pushToast("No new notifications.")} />
        <main className="space-y-8">{renderMainContent()}</main>
      </div>

      {!showOnboarding ? <BottomNavigation activeTab={activeTab} onChange={handleBottomNav} /> : null}

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
  familyId,
  onOpenPage,
  onBack,
  onUpdateSettings,
  onRequestLogout,
  onUpdateCaregiverName,
  onRerunOnboarding,
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
  familyId: string;
  onOpenPage: (page: SettingsPage) => void;
  onBack: () => void;
  onUpdateSettings: Dispatch<SetStateAction<DemoSettingsState>>;
  onRequestLogout: () => void;
  onUpdateCaregiverName: (name: string) => Promise<void>;
  onRerunOnboarding: () => Promise<void>;
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
        familyId={familyId}
        onBack={onBack}
        onUpdateSettings={onUpdateSettings}
        onUpdateCaregiverName={onUpdateCaregiverName}
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
              onClick={() => pushToast("Kiosk renaming coming soon.")}
            />
            <SettingsTile
              icon={MonitorSmartphone}
              title="Pair new kiosk"
              subtitle="Enter the 6-digit code shown on the TV/tablet"
              onClick={() => onOpenPage("kiosk-pairing")}
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
              subtitle="Edit elder and caregiver names"
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
              subtitle="Home safe zone configuration"
              onClick={() => onOpenPage("geofence-settings")}
            />
          </SettingsSection>

          <SettingsSection title="Demo controls">
            <SettingsTile
              icon={Sparkles}
              title="Re-run Setup Wizard"
              subtitle="Show the 3-step kiosk & profile onboarding guide"
              onClick={onRerunOnboarding}
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
              subtitle="Get help with the app"
              onClick={() => onOpenPage("contact-support")}
            />
            <SettingsTile
              icon={Info}
              title="About Remember.For.Me"
              subtitle="Version 1.0.0"
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
  familyId,
  onBack,
  onUpdateSettings,
  onUpdateCaregiverName,
  pushToast,
}: {
  page: SettingsPage;
  settings: DemoSettingsState;
  authUser: User | null;
  profileName: string;
  profileRole: string;
  profileEmail: string;
  linkedFamilyMembers: string[];
  familyId: string;
  onBack: () => void;
  onUpdateSettings: Dispatch<SetStateAction<DemoSettingsState>>;
  onUpdateCaregiverName: (name: string) => Promise<void>;
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
          The Kiosk app is linked to this caregiver account via a 6-digit PIN.
          Use <strong>Pair new kiosk</strong> in the Kiosk section above to connect
          a new TV or tablet screen.
        </p>
      ),
    },
    "elderly-profile": {
      title: "Elderly profile",
      subtitle: "Names synced live to the Kiosk screen",
      body: (
        <ElderlyProfileCard
          familyId={familyId}
          pushToast={pushToast}
          onUpdateCaregiverName={onUpdateCaregiverName}
        />
      ),
    },
    "emergency-contacts": {
      title: "Emergency contacts",
      subtitle: "Family emergency contact list",
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
      subtitle: "Medication and routine preferences",
      body: (
        <p className="text-lg font-medium leading-8 text-slate-700">
          Default reminder timing, follow-up intervals, and voice prompt behavior
          will be configured here for both caregiver and kiosk surfaces.
        </p>
      ),
    },
    "tracker-settings": {
      title: "Tracker settings",
      subtitle: "Wearable and movement alerts",
      body: (
        <p className="text-lg font-medium leading-8 text-slate-700">
          Tracker settings control wearable syncing, inactivity thresholds,
          and safety alerts. Real hardware integration is required for live tracking.
        </p>
      ),
    },
    "geofence-settings": {
      title: "Geofence settings",
      subtitle: "Home safe zone configuration",
      body: (
        <p className="text-lg font-medium leading-8 text-slate-700">
          Safe zone boundaries and exit alerts will be powered by GPS in a future update.
          Use the BLE tags in Manage as a proximity alternative.
        </p>
      ),
    },
    "help-centre": {
      title: "Help Centre",
      subtitle: "Setup guidance and FAQs",
      body: (
        <p className="text-lg font-medium leading-8 text-slate-700">
          For setup help, kiosk pairing instructions, and troubleshooting,
          contact the Remember.For.Me support team.
        </p>
      ),
    },
    "contact-support": {
      title: "Contact support",
      subtitle: "Get help with the app",
      body: (
        <p className="text-lg font-medium leading-8 text-slate-700">
          Reach the support team via email at <strong>support@rememberforme.app</strong>.
          We aim to respond within 24 hours.
        </p>
      ),
    },
    about: {
      title: "About Remember.For.Me",
      subtitle: "Version 1.0.0",
      body: (
        <p className="text-lg font-medium leading-8 text-slate-700">
          Remember.For.Me is an ambient care ecosystem connecting caregivers to
          in-home kiosk screens, helping elderly family members stay on track
          with daily routines through gentle voice reminders.
        </p>
      ),
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "How your data is protected",
      body: (
        <p className="text-lg font-medium leading-8 text-slate-700">
          All caregiver and care recipient data is stored securely in Firebase
          and is only accessible to authenticated caregiver accounts linked to
          the same family group.
        </p>
      ),
    },
    terms: {
      title: "Terms of Service",
      subtitle: "Usage agreement",
      body: (
        <p className="text-lg font-medium leading-8 text-slate-700">
          By using Remember.For.Me you agree to use the platform solely for
          lawful eldercare purposes. No medical or emergency services are
          guaranteed by this application.
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

  if (page === "kiosk-pairing") {
    return (
      <SettingsDetailLayout
        title="Pair New Kiosk"
        subtitle="Enter the 6-digit code displayed on the TV or tablet screen"
        onBack={onBack}
      >
        <KioskPairingCard familyId={familyId} pushToast={pushToast} />
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

function normalizeRoutinePeriod(periodValue?: string, timeValue?: string): RoutinePeriod {
  if (periodValue === "morning" || periodValue === "afternoon" || periodValue === "evening") {
    return periodValue;
  }

  const [hourText = "9"] = (timeValue || "09:00").split(":");
  const hour = Number(hourText);
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

function buildInitialFeed(): AlertFeedItem[] {
  return [
    {
      id: "feed_boot_1",
      level: "success",
      title: "Caregiver dashboard online",
      message: "Home station and caregiver workspace are ready for routine monitoring.",
      timestampLabel: "Just now",
    },
    {
      id: "feed_boot_2",
      level: "info",
      title: "Tracker sync healthy",
      message: "Wearable stream is available for vitals, geofence, and safety alerts.",
      timestampLabel: "Just now",
    },
  ];
}



// ---------------------------------------------------------------------------
// KioskPairingCard — caregiver enters the 6-digit PIN shown on the Kiosk
// ---------------------------------------------------------------------------
function KioskPairingCard({
  familyId,
  pushToast,
}: {
  familyId: string;
  pushToast: (msg: string) => void;
}) {
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLink() {
    const cleaned = pin.replace(/\s/g, "");
    if (cleaned.length !== 6 || !/^\d{6}$/.test(cleaned)) {
      setErrorMsg("Please enter a valid 6-digit PIN.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const result = await linkKioskByPin(cleaned, familyId);
      if (result === "ok") {
        setStatus("success");
        pushToast("Kiosk linked successfully! The TV screen will update automatically.");
      } else if (result === "not_found") {
        setErrorMsg("PIN not found. Make sure the Kiosk is showing this code and try again.");
        setStatus("error");
      } else {
        setErrorMsg("This PIN has already been claimed by another session.");
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Connection error. Check your internet and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-6 rounded-[24px] bg-emerald-50 px-6 py-10 text-center">
        <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-10 w-10" />
        </span>
        <h3 className="text-2xl font-extrabold text-slate-900">Kiosk Linked!</h3>
        <p className="max-w-sm text-base font-medium leading-7 text-slate-600">
          The TV/tablet kiosk has been connected to this caregiver account. It will
          now receive reminders and routine updates in real time.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Instruction card */}
      <div className="rounded-[20px] bg-active/8 border border-active/20 px-5 py-5">
        <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-active">How to pair</p>
        <ol className="mt-3 space-y-2 text-base font-medium leading-7 text-slate-700">
          <li>1. Open the <strong>Remember.For.Me</strong> app on the TV or tablet.</li>
          <li>2. Wait for the <strong>6-digit PIN</strong> to appear on screen.</li>
          <li>3. Type that PIN below and tap <strong>Link Kiosk</strong>.</li>
        </ol>
      </div>

      {/* PIN input */}
      <div className="space-y-2">
        <label className="block text-sm font-extrabold uppercase tracking-[0.18em] text-slate-500">
          Kiosk PIN
        </label>
        <input
          id="kiosk-pin-input"
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={(e) => {
            setPin(e.target.value.replace(/\D/g, "").slice(0, 6));
            setStatus("idle");
            setErrorMsg("");
          }}
          placeholder="e.g. 482 917"
          className="h-16 w-full rounded-[18px] bg-lavender px-5 text-center text-2xl font-extrabold tracking-[0.3em] text-slate-800 outline-none placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 focus:ring-2 focus:ring-active/40"
        />
        {errorMsg ? (
          <p className="text-sm font-semibold text-red-500">{errorMsg}</p>
        ) : null}
      </div>

      {/* Action button */}
      <button
        type="button"
        id="link-kiosk-btn"
        onClick={() => void handleLink()}
        disabled={status === "loading" || pin.length < 6}
        className="inline-flex min-h-[64px] w-full items-center justify-center gap-3 rounded-[20px] bg-active px-6 text-xl font-bold text-white transition hover:bg-[#7a5df0] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? (
          "Linking..."
        ) : (
          <>
            <Link2 className="h-5 w-5" />
            Link Kiosk
          </>
        )}
      </button>

      <p className="text-center text-xs font-semibold text-slate-400">
        Each PIN can only be used once. The kiosk will update automatically once linked.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ElderlyProfileCard — live form: writes elder name + caregiver name to Firebase
// The Kiosk listens to families/{familyId}/elder and updates immediately.
// ---------------------------------------------------------------------------
function ElderlyProfileCard({
  familyId,
  pushToast,
  onUpdateCaregiverName,
}: {
  familyId: string;
  pushToast: (msg: string) => void;
  onUpdateCaregiverName: (name: string) => Promise<void>;
}) {
  const [elderName, setElderName] = useState("");
  const [caregiverName, setCaregiverName] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load current values from Firebase on mount
  useEffect(() => {
    const unsubscribe = subscribeToFamilyPath(familyId, "elder", (snapshot) => {
      if (!loaded) {
        const data = snapshot.val() ?? {};
        setElderName(data.name ?? "");
        setCaregiverName(data.caregiverName ?? "");
        setLoaded(true);
      }
    });
    return unsubscribe;
  }, [familyId, loaded]);

  async function handleSave() {
    const trimmedElder = elderName.trim();
    const trimmedCaregiver = caregiverName.trim();
    if (!trimmedElder) {
      pushToast("Please enter the elder's name.");
      return;
    }
    setSaving(true);
    try {
      await updateFamilyPath(familyId, "elder", {
        name: trimmedElder,
        caregiverName: trimmedCaregiver,
        updatedAt: Date.now(),
      });
      if (trimmedCaregiver) {
        await onUpdateCaregiverName(trimmedCaregiver);
      }
      pushToast("Profile saved — Kiosk will update shortly.");
    } catch (err) {
      console.error(err);
      pushToast("Failed to save. Check your connection.");
    } finally {
      setSaving(false);
    }
  }

  if (!loaded) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-[18px] bg-lavender" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-[20px] bg-active/8 border border-active/20 px-5 py-4">
        <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-active">Live sync</p>
        <p className="mt-1 text-sm font-medium text-slate-600">
          Changes below are written to Firebase and the Kiosk screen updates automatically.
        </p>
      </div>

      {/* Elder name */}
      <div className="space-y-2">
        <label className="block text-sm font-extrabold uppercase tracking-[0.18em] text-slate-500">
          Elder's name (shown on Kiosk)
        </label>
        <input
          id="elder-name-input"
          type="text"
          value={elderName}
          onChange={(e) => setElderName(e.target.value)}
          placeholder="e.g. Grandma Lan"
          className="h-16 w-full rounded-[18px] bg-lavender px-5 text-lg font-medium text-slate-800 outline-none focus:ring-2 focus:ring-active/40"
        />
      </div>

      {/* Caregiver name */}
      <div className="space-y-2">
        <label className="block text-sm font-extrabold uppercase tracking-[0.18em] text-slate-500">
          Caregiver's name (shown in Kiosk messages)
        </label>
        <input
          id="caregiver-name-input"
          type="text"
          value={caregiverName}
          onChange={(e) => setCaregiverName(e.target.value)}
          placeholder="e.g. Minh"
          className="h-16 w-full rounded-[18px] bg-lavender px-5 text-lg font-medium text-slate-800 outline-none focus:ring-2 focus:ring-active/40"
        />
        <p className="text-xs font-semibold text-slate-400">
          The Kiosk will say "Your child, [name], is at work and will be home soon."
        </p>
      </div>

      <button
        type="button"
        id="save-elderly-profile-btn"
        onClick={() => void handleSave()}
        disabled={saving}
        className="inline-flex min-h-[64px] w-full items-center justify-center gap-3 rounded-[20px] bg-active px-6 text-xl font-bold text-white transition hover:bg-[#7a5df0] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save & Sync to Kiosk"}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// OnboardingWizard — 3-step setup flow for newly registered accounts
// ---------------------------------------------------------------------------
function OnboardingWizard({
  familyId,
  pushToast,
  caregiverName,
  onComplete,
}: {
  familyId: string;
  pushToast: (msg: string) => void;
  caregiverName: string;
  onComplete: () => void;
}) {
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState("");
  const [linking, setLinking] = useState(false);
  const [linkSuccess, setLinkSuccess] = useState(false);

  // Step 2 profile
  const [elderName, setElderName] = useState("");
  const [profileCaregiverName, setProfileCaregiverName] = useState(caregiverName);

  // Step 3 routine
  const [routineName, setRoutineName] = useState("Morning Medicine");
  const [routineTime, setRoutineTime] = useState("08:00");
  const [routinePeriod, setRoutinePeriod] = useState<"morning" | "afternoon" | "evening">("morning");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autoRun, setAutoRun] = useState(true);
  const [creating, setCreating] = useState(false);

  async function handleLinkKiosk() {
    const cleaned = pin.replace(/\s/g, "");
    if (cleaned.length !== 6 || !/^\d{6}$/.test(cleaned)) {
      pushToast("Please enter a valid 6-digit PIN.");
      return;
    }
    setLinking(true);
    try {
      const result = await linkKioskByPin(cleaned, familyId);
      if (result === "ok") {
        setLinkSuccess(true);
        pushToast("Kiosk paired! The TV screen will refresh now.");
        setTimeout(() => setStep(2), 1200);
      } else if (result === "not_found") {
        pushToast("PIN not found. Check the Kiosk display and try again.");
      } else {
        pushToast("This PIN has already been claimed.");
      }
    } catch (err) {
      console.error(err);
      pushToast("Connection error. Try again.");
    } finally {
      setLinking(false);
    }
  }

  async function handleSaveProfile() {
    const trimmedElder = elderName.trim();
    const trimmedCaregiver = profileCaregiverName.trim();
    if (!trimmedElder) {
      pushToast("Elder name is required.");
      return;
    }
    try {
      await updateFamilyPath(familyId, "elder", {
        name: trimmedElder,
        caregiverName: trimmedCaregiver,
        status: "in_home",
        lastSeenAt: Date.now(),
        updatedAt: Date.now(),
      });
      setStep(3);
    } catch (err) {
      console.error(err);
      pushToast("Failed to save profile.");
    }
  }

  async function handleCreateFirstRoutine() {
    const trimmedRoutine = routineName.trim();
    if (!trimmedRoutine) {
      pushToast("Routine name is required.");
      return;
    }
    setCreating(true);
    try {
      // 1. Create first routine task
      await updateFamilyPath(familyId, `tasks/task_init`, {
        name: trimmedRoutine,
        scheduled_time: routineTime,
        is_auto: autoRun,
        period: routinePeriod,
        voiceEnabled: voiceEnabled,
        status: "Pending",
        text: `${elderName} ơi, đến giờ ${trimmedRoutine} rồi.`,
        is_triggered: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        triggeredAt: null,
        spokenAt: null,
        completedAt: null,
        triggerMode: null,
      });

      // 2. Initialize default kiosk details
      await updateFamilyPath(familyId, "kiosk", {
        online: true,
        name: "Home Kiosk Screen",
        lastHeartbeatAt: Date.now(),
        volumeForced: false,
        updatedAt: Date.now(),
      });

      // 3. Mark onboarding completed
      await updateFamilyPath(familyId, "onboarding_completed", {
        onboarding_completed: true,
      });

      pushToast("Setup completed! Welcome to your dashboard.");
      onComplete();
    } catch (err) {
      console.error(err);
      pushToast("Failed to complete setup.");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="card-shell p-6 sm:p-8 space-y-6">
      {/* Progress bar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Setup Wizard</h2>
          <p className="text-sm font-semibold text-slate-500">Step {step} of 3</p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <span
              key={s}
              className={`h-3 w-8 rounded-full transition ${
                s <= step ? "bg-active" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <div className="text-center space-y-2">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-active/10 text-active">
              <Link2 className="h-8 w-8" />
            </span>
            <h3 className="text-2xl font-black text-slate-900">Link your Kiosk Screen</h3>
            <p className="text-base font-semibold text-slate-600">
              Open the <strong>Remember.For.Me</strong> app on your TV or tablet and enter the 6-digit PIN code displayed.
            </p>
          </div>

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="e.g. 123456"
            className="h-16 w-full rounded-[18px] bg-lavender px-5 text-center text-2xl font-extrabold tracking-[0.3em] text-slate-800 outline-none placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 focus:ring-2 focus:ring-active/40"
          />

          {linkSuccess ? (
            <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold">
              <CheckCircle2 className="h-5 w-5 animate-bounce" />
              Connected! Proceeding...
            </div>
          ) : (
            <button
              type="button"
              onClick={() => void handleLinkKiosk()}
              disabled={linking || pin.length < 6}
              className="inline-flex min-h-[64px] w-full items-center justify-center gap-3 rounded-[20px] bg-active px-6 text-xl font-bold text-white transition hover:bg-[#7a5df0] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {linking ? "Pairing..." : "Link Kiosk & Continue"}
            </button>
          )}

          <button
            type="button"
            onClick={() => setStep(2)}
            className="text-sm font-bold text-slate-400 block text-center w-full hover:underline"
          >
            Skip for now (configure later)
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <div className="text-center space-y-2">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-active/10 text-active">
              <UserRound className="h-8 w-8" />
            </span>
            <h3 className="text-2xl font-black text-slate-900">Family Information</h3>
            <p className="text-base font-semibold text-slate-600">
              Enter names so Kiosk messages can be personalized.
            </p>
          </div>

          <div className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                Elder's name (shown on Kiosk)
              </span>
              <input
                type="text"
                value={elderName}
                onChange={(e) => setElderName(e.target.value)}
                placeholder="e.g. Grandma Lan"
                className="h-16 w-full rounded-[18px] bg-lavender px-5 text-lg font-medium text-slate-800 outline-none focus:ring-2 focus:ring-active/40"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                Your name (Caregiver)
              </span>
              <input
                type="text"
                value={profileCaregiverName}
                onChange={(e) => setProfileCaregiverName(e.target.value)}
                placeholder="e.g. Minh"
                className="h-16 w-full rounded-[18px] bg-lavender px-5 text-lg font-medium text-slate-800 outline-none focus:ring-2 focus:ring-active/40"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={() => void handleSaveProfile()}
            className="inline-flex min-h-[64px] w-full items-center justify-center gap-3 rounded-[20px] bg-active px-6 text-xl font-bold text-white transition hover:bg-[#7a5df0]"
          >
            Save &amp; Continue
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div className="text-center space-y-2">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-active/10 text-active">
              <Clock3 className="h-8 w-8" />
            </span>
            <h3 className="text-2xl font-black text-slate-900">First Daily Routine</h3>
            <p className="text-base font-semibold text-slate-600">
              Create the first daily alert for {elderName || "your elder"}.
            </p>
          </div>

          <div className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                Routine name
              </span>
              <input
                type="text"
                value={routineName}
                onChange={(e) => setRoutineName(e.target.value)}
                placeholder="e.g. Morning Medicine"
                className="h-16 w-full rounded-[18px] bg-lavender px-5 text-lg font-medium text-slate-800 outline-none focus:ring-2 focus:ring-active/40"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                  Scheduled time
                </span>
                <input
                  type="time"
                  value={routineTime}
                  onChange={(e) => setRoutineTime(e.target.value)}
                  className="h-16 w-full rounded-[18px] bg-lavender px-5 text-lg font-medium text-slate-800 outline-none focus:ring-2 focus:ring-active/40"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                  Routine Period
                </span>
                <select
                  value={routinePeriod}
                  onChange={(e) => setRoutinePeriod(e.target.value as any)}
                  className="h-16 w-full rounded-[18px] bg-lavender px-5 text-lg font-medium text-slate-800 outline-none focus:ring-2 focus:ring-active/40"
                >
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-lavender rounded-[16px]">
              <div>
                <p className="text-base font-extrabold text-slate-800">Voice Announce</p>
                <p className="text-xs font-semibold text-slate-500">Speak out loud on Kiosk</p>
              </div>
              <input
                type="checkbox"
                checked={voiceEnabled}
                onChange={(e) => setVoiceEnabled(e.target.checked)}
                className="h-6 w-6 text-active rounded animate-none"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-lavender rounded-[16px]">
              <div>
                <p className="text-base font-extrabold text-slate-800">Auto Run</p>
                <p className="text-xs font-semibold text-slate-500">Trigger automatically at time</p>
              </div>
              <input
                type="checkbox"
                checked={autoRun}
                onChange={(e) => setAutoRun(e.target.checked)}
                className="h-6 w-6 text-active rounded animate-none"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => void handleCreateFirstRoutine()}
            disabled={creating}
            className="inline-flex min-h-[64px] w-full items-center justify-center gap-3 rounded-[20px] bg-active px-6 text-xl font-bold text-white transition hover:bg-[#7a5df0] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {creating ? "Finishing..." : "Create Routine & Finish Setup"}
          </button>
        </div>
      )}
    </div>
  );
}
