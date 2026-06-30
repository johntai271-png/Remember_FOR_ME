export type RoutineStatus = "Completed" | "Pending" | "Running";
export type ViewMode = "view" | "edit";
export type AppTab = "home" | "history" | "settings";

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
  status: RoutineStatus;
  note: string;
  updatedAt?: string | number;
  mode: ViewMode;
};

export type ToastState = {
  id: number;
  message: string;
};
