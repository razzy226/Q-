"use client";

import { DayKey } from "@/lib/types";

const dayOptions: { key: DayKey; label: string }[] = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
  { key: "sun", label: "Sun" },
];

type DaySelectorProps = {
  value: DayKey;
  onChange: (day: DayKey) => void;
};

export const DaySelector = ({ value, onChange }: DaySelectorProps) => (
  <div className="flex flex-wrap gap-2">
    {dayOptions.map((day) => (
      <button
        key={day.key}
        type="button"
        onClick={() => onChange(day.key)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          value === day.key
            ? "bg-slate-900 text-white"
            : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:text-slate-900"
        }`}
      >
        {day.label}
      </button>
    ))}
  </div>
);
