import type { ReactNode } from "react";
import { Bell, History, Home, Settings, X } from "lucide-react";

import type { AppTab } from "../types";

export function Header({
  onBellClick,
  avatarSrc,
}: {
  onBellClick: () => void;
  avatarSrc: string;
}) {
  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 sm:gap-5">
        <img
          src={avatarSrc}
          alt="Caregiver avatar"
          className="h-11 w-11 rounded-full border-[3px] border-brand object-cover sm:h-14 sm:w-14"
        />
        <div className="text-[28px] font-black tracking-tight text-brand sm:text-[40px] lg:text-[52px]">
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

export function BottomNavigation({
  activeTab,
  onChange,
}: {
  activeTab: AppTab;
  onChange: (tab: AppTab) => void;
}) {
  const tabs = [
    { label: "Home", icon: Home, value: "home" as const },
    { label: "Manage", icon: History, value: "history" as const },
    { label: "Settings", icon: Settings, value: "settings" as const },
  ];

  return (
    <>
      <nav className="fixed inset-x-3 bottom-0 z-40 rounded-t-[28px] border border-white/80 bg-white/95 px-4 pb-4 pt-3 shadow-[0_-10px_30px_rgba(28,39,72,0.08)] backdrop-blur sm:inset-x-8">
        <div className="mx-auto grid max-w-[1720px] grid-cols-3 gap-4">
          {tabs.map((tab) => {
            const active = activeTab === tab.value;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => onChange(tab.value)}
                className={`flex flex-col items-center justify-center gap-1 rounded-full px-4 py-2 text-base font-semibold ${
                  active ? "text-[#351898]" : "text-slate-600"
                }`}
              >
                <span
                  className={`inline-flex h-12 min-w-[100px] items-center justify-center gap-2 rounded-full px-5 transition ${
                    active ? "bg-active/85 text-[#351898]" : "bg-transparent"
                  }`}
                >
                  <tab.icon className="h-6 w-6" />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <button
        type="button"
        aria-label="Help"
        onClick={() => onChange("settings")}
        className="fixed bottom-4 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2a2a2a] text-2xl font-medium text-white shadow-xl"
      >
        ?
      </button>
    </>
  );
}

export function Toast({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  return (
    <div className="fixed bottom-24 left-1/2 z-50 w-[min(92vw,400px)] -translate-x-1/2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <span>{message}</span>
        <button type="button" onClick={onDismiss} className="text-white/70 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export function ConfirmationModal({
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
      <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl sm:p-7">
        <h3 className="text-2xl font-extrabold text-slate-900">{title}</h3>
        <p className="mt-3 text-base text-slate-600">{body}</p>
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-200 px-5 py-2.5 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-[#c91818] px-5 py-2.5 text-base font-semibold text-white transition hover:bg-[#b11212]"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function InfoBox({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}) {
  return (
    <article className="info-box min-h-[116px] sm:min-h-[132px]">
      {icon ? <div className="mb-3">{icon}</div> : null}
      <div className="space-y-1">
        <p className="text-base font-medium text-slate-600 sm:text-[16px]">{label}</p>
        <div className="text-xl font-extrabold text-slate-900 sm:text-[20px]">{value}</div>
      </div>
    </article>
  );
}
