import schema from "../../docs/firebase_schema.json";

export type BackendRoutineStatus =
  | "Completed"
  | "Completed earlier"
  | "Snoozed"
  | "Needs help"
  | "No response"
  | "Pending";

export type BackendEscalationAction =
  | "REPEAT_VISUAL_REMINDER"
  | "PLAY_VOICE_REMINDER"
  | "SHOW_DETAILED_INSTRUCTION"
  | "SEND_FAMILY_VOICE_MESSAGE"
  | "NOTIFY_CAREGIVER";

export type BackendRoutine = {
  id: string;
  name: string;
  time: string;
  autoRun: boolean;
  status: BackendRoutineStatus;
  note: string;
  updatedAt?: string;
  mode: "view" | "edit";
  caregiverInstructions?: string;
  category?: "Medication" | "Wellness" | "Check-in";
  escalationPolicy: {
    enabled: boolean;
    template: "Gentle" | "Standard" | "High attention" | "Custom";
    steps: Array<{ delayMinutes: number; action: BackendEscalationAction }>;
  };
};

export type BackendAlert = {
  id: string;
  resident: string;
  taskName: string;
  scheduledTime: string;
  requestedAt: string;
  instructions?: string;
};

export type BackendTimelineEvent = {
  id: string;
  timestamp: string;
  taskId: string;
  taskName: string;
  taskCategory: "Medication" | "Wellness" | "Check-in";
  careRecipient: string;
  eventType:
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
  status:
    | "Confirmed complete"
    | "Reported already complete"
    | "Explicitly postponed"
    | "Help requested"
    | "No interaction recorded"
    | "Reminder may not have been seen"
    | "Device offline"
    | "Unknown";
  source: "caregiver" | "care recipient" | "scheduler" | "system";
  description: string;
  channel?: "VISUAL" | "VOICE" | "CAREGIVER_FOLLOW_UP";
  metadata?: Record<string, string | number>;
};

export type BackendSnapshot = {
  routines: BackendRoutine[];
  alerts: BackendAlert[];
  timeline: BackendTimelineEvent[];
  backendConnected: boolean;
};

type FamilyData = {
  elder?: { name?: string };
  kiosk?: { lastHeartbeatAt?: number | null };
  tasks?: Record<string, any>;
  taskOccurrences?: Record<string, any>;
  taskInteractions?: Record<string, any>;
  caregiverAlerts?: Record<string, any>;
};

const databaseUrl = import.meta.env.VITE_FIREBASE_DATABASE_URL?.replace(/\/$/, "") ?? "";
const authToken = import.meta.env.VITE_FIREBASE_AUTH_TOKEN ?? "";
const familyId = import.meta.env.VITE_FAMILY_ID ?? "family_001";

function buildUrl(path: string) {
  const tokenPart = authToken ? `${path.includes("?") ? "&" : "?"}auth=${authToken}` : "";
  return `${databaseUrl}/${path}.json${tokenPart}`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(buildUrl(path), {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!response.ok) {
    throw new Error(`Firebase request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

function familyFromSchema(): FamilyData {
  return (schema as any).families[familyId] as FamilyData;
}

function formatDate(value: number | string | null | undefined) {
  if (!value) return "Unknown";
  const date = typeof value === "number" ? new Date(value) : new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function inferTemplate(steps: Array<{ delayMinutes: number; action: BackendEscalationAction }>) {
  const signature = steps.map((step) => `${step.delayMinutes}:${step.action}`).join("|");
  if (signature === "10:REPEAT_VISUAL_REMINDER|30:SHOW_DETAILED_INSTRUCTION") return "Gentle";
  if (signature === "10:REPEAT_VISUAL_REMINDER|20:PLAY_VOICE_REMINDER|40:NOTIFY_CAREGIVER") return "Standard";
  if (
    signature ===
    "10:REPEAT_VISUAL_REMINDER|20:PLAY_VOICE_REMINDER|30:SHOW_DETAILED_INSTRUCTION|40:NOTIFY_CAREGIVER"
  ) {
    return "High attention";
  }
  return "Custom";
}

function mapFamilyToSnapshot(family: FamilyData, backendConnected: boolean): BackendSnapshot {
  const elderName = family.elder?.name ? `${family.elder.name}` : "Mom (Eleanor)";
  const tasks = family.tasks ?? {};
  const occurrences = family.taskOccurrences ?? {};
  const alerts = family.caregiverAlerts ?? {};
  const interactions = family.taskInteractions ?? {};

  const routines: BackendRoutine[] = Object.entries(tasks).map(([taskId, task]) => {
    const latestOccurrence = Object.values(occurrences)
      .filter((occurrence: any) => occurrence?.taskId === taskId)
      .sort(
        (left: any, right: any) =>
          new Date(right?.updatedAt ?? right?.scheduledFor ?? 0).getTime() -
          new Date(left?.updatedAt ?? left?.scheduledFor ?? 0).getTime(),
      )[0] as any;
    const latestStatus = (latestOccurrence?.status ?? task.status ?? "Pending") as BackendRoutineStatus;
    const updateTime = latestOccurrence?.updatedAt ?? task.completedAt ?? task.lastTriggeredAt ?? null;
    const steps = Array.isArray(task.escalationPolicy?.steps) ? task.escalationPolicy.steps : [];

    return {
      id: taskId,
      name: task.name ?? taskId,
      time: task.scheduled_time ?? "--:--",
      autoRun: task.is_auto === true,
      status: latestStatus,
      note:
        latestStatus === "Pending"
          ? "Awaiting next reminder"
          : `${latestStatus} at ${formatDate(updateTime)}`,
      updatedAt: updateTime ? formatDate(updateTime) : undefined,
      mode: "view",
      caregiverInstructions: task.caregiverInstructions ?? "",
      category: (task.category ?? "Wellness") as BackendRoutine["category"],
      escalationPolicy: {
        enabled: task.escalationPolicy?.enabled === true,
        template: inferTemplate(steps),
        steps,
      },
    };
  });

  const timeline: BackendTimelineEvent[] = Object.entries(interactions).map(([eventId, interaction]: [string, any]) => {
    const task = tasks[interaction.taskId] ?? {};
    const metadata = interaction.metadata ?? {};
    const eventType = mapInteractionToTimelineType(interaction.interactionType, metadata);
    const status = mapInteractionToStatus(eventType, metadata);
    return {
      id: eventId,
      timestamp: new Date(interaction.createdAt ?? Date.now()).toISOString(),
      taskId: interaction.taskId,
      taskName: task.name ?? interaction.taskId,
      taskCategory: (task.category ?? "Wellness") as BackendTimelineEvent["taskCategory"],
      careRecipient: elderName,
      eventType,
      status,
      source: mapInteractionToSource(interaction.interactionType, metadata),
      description: describeEvent(eventType, task.name ?? interaction.taskId, metadata),
      channel: mapInteractionToChannel(interaction.interactionType, metadata),
      metadata,
    };
  });

  const lastHeartbeatAt = family.kiosk?.lastHeartbeatAt ?? null;
  if (lastHeartbeatAt && Date.now() - lastHeartbeatAt > 30_000) {
    timeline.push({
      id: "device-offline",
      timestamp: new Date(lastHeartbeatAt).toISOString(),
      taskId: "system",
      taskName: "Kiosk device",
      taskCategory: "Check-in",
      careRecipient: elderName,
      eventType: "DEVICE_OFFLINE",
      status: "Device offline",
      source: "system",
      description: "Kiosk heartbeat is stale. Some reminders may not have been seen.",
    });
  }

  const caregiverAlerts: BackendAlert[] = Object.entries(alerts)
    .filter(([, alert]: [string, any]) => alert?.status === "open")
    .map(([alertId, alert]: [string, any]) => ({
      id: alertId,
      resident: elderName,
      taskName: alert.taskName ?? tasks[alert.taskId]?.name ?? alert.taskId,
      scheduledTime: alert.scheduledTime ?? "--:--",
      requestedAt: formatDate(alert.requestedAt),
      instructions: alert.instructions ?? "",
    }));

  return {
    routines: routines.sort((left, right) => left.time.localeCompare(right.time)),
    alerts: caregiverAlerts,
    timeline: timeline.sort((left, right) => +new Date(right.timestamp) - +new Date(left.timestamp)),
    backendConnected,
  };
}

function mapInteractionToTimelineType(
  interactionType: string | undefined,
  metadata: Record<string, string | number>,
): BackendTimelineEvent["eventType"] {
  if (metadata.eventType === "ESCALATION_TRIGGERED") {
    if (metadata.action === "PLAY_VOICE_REMINDER") return "VOICE_REMINDER_PLAYED";
    return "ESCALATION_TRIGGERED";
  }
  if (metadata.eventType === "CAREGIVER_ALERTED") return "CAREGIVER_NOTIFIED";
  switch (interactionType) {
    case "REMINDER_SHOWN":
      return "REMINDER_SHOWN";
    case "DONE":
      return "TASK_COMPLETED";
    case "ALREADY_COMPLETED":
      return "TASK_ALREADY_COMPLETED";
    case "SNOOZED":
      return "TASK_SNOOZED";
    case "HELP_REQUESTED":
      return "HELP_REQUESTED";
    case "REMINDER_REPEATED":
      return "REMINDER_REPEATED";
    case "NO_RESPONSE":
      return "NO_RESPONSE";
    default:
      return "REMINDER_SCHEDULED";
  }
}

function mapInteractionToStatus(
  eventType: BackendTimelineEvent["eventType"],
  metadata: Record<string, string | number>,
): BackendTimelineEvent["status"] {
  switch (eventType) {
    case "TASK_COMPLETED":
      return "Confirmed complete";
    case "TASK_ALREADY_COMPLETED":
      return "Reported already complete";
    case "TASK_SNOOZED":
      return "Explicitly postponed";
    case "HELP_REQUESTED":
      return "Help requested";
    case "DEVICE_OFFLINE":
      return "Device offline";
    case "NO_RESPONSE":
      return metadata.reason === "offline" ? "Reminder may not have been seen" : "No interaction recorded";
    default:
      return "Unknown";
  }
}

function mapInteractionToSource(
  interactionType: string | undefined,
  metadata: Record<string, string | number>,
): BackendTimelineEvent["source"] {
  if (metadata.eventType === "ESCALATION_TRIGGERED" || metadata.eventType === "CAREGIVER_ALERTED") return "system";
  switch (interactionType) {
    case "DONE":
    case "ALREADY_COMPLETED":
    case "SNOOZED":
    case "HELP_REQUESTED":
      return "care recipient";
    case "REMINDER_SHOWN":
      return "scheduler";
    default:
      return "system";
  }
}

function mapInteractionToChannel(
  interactionType: string | undefined,
  metadata: Record<string, string | number>,
): BackendTimelineEvent["channel"] | undefined {
  if (metadata.action === "PLAY_VOICE_REMINDER") return "VOICE";
  if (metadata.action === "NOTIFY_CAREGIVER") return "CAREGIVER_FOLLOW_UP";
  if (
    ["DONE", "ALREADY_COMPLETED", "SNOOZED", "REMINDER_SHOWN", "REMINDER_REPEATED", "HELP_REQUESTED"].includes(
      interactionType ?? "",
    )
  ) {
    return "VISUAL";
  }
  return undefined;
}

function describeEvent(
  eventType: BackendTimelineEvent["eventType"],
  taskName: string,
  metadata: Record<string, string | number>,
) {
  switch (eventType) {
    case "REMINDER_SHOWN":
      return `${taskName} reminder shown.`;
    case "TASK_COMPLETED":
      return `${taskName} marked completed.`;
    case "TASK_ALREADY_COMPLETED":
      return `${taskName} reported already completed.`;
    case "TASK_SNOOZED":
      return `${taskName} postponed for ${metadata.snoozeDurationMinutes ?? "a later time"}.`;
    case "HELP_REQUESTED":
      return `Help requested for ${taskName}.`;
    case "REMINDER_REPEATED":
      return `${taskName} reminder repeated.`;
    case "VOICE_REMINDER_PLAYED":
      return `Voice reminder played for ${taskName}.`;
    case "ESCALATION_TRIGGERED":
      return `Escalation triggered for ${taskName}.`;
    case "CAREGIVER_NOTIFIED":
      return `Caregiver notified about ${taskName}.`;
    case "NO_RESPONSE":
      return `No response was recorded for ${taskName}.`;
    default:
      return `${taskName} event recorded.`;
  }
}

export async function loadBackendSnapshot(): Promise<BackendSnapshot> {
  if (!databaseUrl) {
    return mapFamilyToSnapshot(familyFromSchema(), false);
  }

  try {
    const family = await request<FamilyData>(`families/${familyId}`);
    return mapFamilyToSnapshot(family, true);
  } catch {
    return mapFamilyToSnapshot(familyFromSchema(), false);
  }
}

export async function saveRoutine(routine: BackendRoutine) {
  if (!databaseUrl) return;
  await request(`families/${familyId}/tasks/${routine.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      name: routine.name,
      scheduled_time: routine.time,
      is_auto: routine.autoRun,
      caregiverInstructions: routine.caregiverInstructions ?? "",
      category: routine.category ?? "Wellness",
      escalationPolicy: {
        enabled: routine.escalationPolicy.enabled,
        steps: routine.escalationPolicy.steps,
      },
    }),
  });
}

export async function createRoutine(routine: BackendRoutine) {
  if (!databaseUrl) return;
  await request(`families/${familyId}/tasks/${routine.id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: routine.name,
      scheduled_time: routine.time,
      is_auto: routine.autoRun,
      status: "Pending",
      lastTriggeredAt: null,
      completedAt: null,
      triggerMode: null,
      caregiverInstructions: routine.caregiverInstructions ?? "",
      category: routine.category ?? "Wellness",
      escalationPolicy: {
        enabled: routine.escalationPolicy.enabled,
        steps: routine.escalationPolicy.steps,
      },
    }),
  });
}

export async function triggerRoutine(routine: BackendRoutine) {
  if (!databaseUrl) return;
  const reminderKey = routine.id === "task_001" ? "morning" : routine.id === "task_002" ? "noon" : "evening";
  await request(`families/${familyId}/reminders/${reminderKey}`, {
    method: "PATCH",
    body: JSON.stringify({
      is_triggered: true,
      triggeredAt: Date.now(),
      time: routine.time,
      text: routine.name,
      taskId: routine.id,
    }),
  });
}

export async function resolveAlert(alertId: string) {
  if (!databaseUrl) return;
  await request(`families/${familyId}/caregiverAlerts/${alertId}`, {
    method: "PATCH",
    body: JSON.stringify({
      status: "handled",
      acknowledgedAt: Date.now(),
    }),
  });
}

export function isBackendConfigured() {
  return Boolean(databaseUrl);
}
