export type RoutineStatus = "Completed" | "Pending" | "Running";
export type ViewMode = "view" | "edit";
export type AppTab = "home" | "history" | "settings";
export type RoutinePeriod = "morning" | "afternoon" | "evening";

export type SettingsPage =
  | "root"
  | "profile"
  | "login"
  | "linked-family"
  | "kiosk-connection"
  | "elderly-profile"
  | "emergency-contacts"
  | "reminder-defaults"
  | "tracker-settings"
  | "geofence-settings"
  | "language"
  | "appearance"
  | "notifications"
  | "time-format"
  | "help-centre"
  | "contact-support"
  | "about"
  | "privacy"
  | "terms";

export type NotificationPreferences = {
  medicationReminders: boolean;
  routineReminders: boolean;
  trackerAlerts: boolean;
  emergencyAlerts: boolean;
  weeklySummary: boolean;
};

export type CaregiverPreferences = {
  language: "English" | "Vietnamese" | "Chinese";
  appearance: "Light" | "Dark" | "System";
  timeFormat: "12-hour" | "24-hour";
  notifications: NotificationPreferences;
};

export type DemoSettingsState = CaregiverPreferences;

export type CaregiverProfile = {
  name: string;
  email: string | null;
  role: string;
  familyId: string;
  linkedFamilyMembers?: string[];
  preferences?: Partial<CaregiverPreferences>;
  createdAt?: number;
};

export type Routine = {
  id: string;
  name: string;
  time: string;
  autoRun: boolean;
  period: RoutinePeriod;
  voiceEnabled: boolean;
  status: RoutineStatus;
  note: string;
  updatedAt?: string | number;
  mode: ViewMode;
};

export type BleTagStatus = "safe" | "away";
export type BleTagConnectionStatus = "connected" | "disconnected" | "pairing";

export type BleTag = {
  id: string;
  name: string;
  location: string;
  hardwareId: string;
  status: BleTagStatus;
  connectionStatus: BleTagConnectionStatus;
  lastConnectedAt?: number | null;
};

export type AlertFeedItem = {
  id: string;
  level: "info" | "success" | "warning" | "danger";
  title: string;
  message: string;
  timestampLabel: string;
};

export type ToastState = {
  id: number;
  message: string;
};
