export function createAvatarSvg(stroke: string, fillA: string, fillB: string) {
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

export function formatTimestamp(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatRelativeTime(timestamp: number) {
  if (!timestamp) return "No recent data";
  const diffMinutes = Math.max(1, Math.round((Date.now() - timestamp) / 60000));
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
}

export function formatClock(timeValue: string) {
  if (!timeValue) return "--:--";
  const [hourText = "0", minuteText = "0"] = timeValue.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${String(displayHour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${period}`;
}

export function formatTaskNote(task: any) {
  const startedAt = task.triggeredAt || task.lastTriggeredAt;
  if (task.status === "Running" && startedAt) {
    return `Started at ${formatTimestamp(new Date(startedAt))}`;
  }
  if (task.status === "Completed" && task.completedAt) {
    return `Completed at ${formatTimestamp(new Date(task.completedAt))}`;
  }
  return task.is_auto ? "Auto mode enabled" : "Manual mode only";
}
