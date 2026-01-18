"use client";

import { Anchor, Rail } from "@/lib/types";
import { minutesToTime } from "@/lib/time";

export type TimelineItem = (Anchor | Rail) & {
  startMin: number;
  endMin: number;
};

type TimelineProps = {
  items: TimelineItem[];
  rangeStart: number;
  rangeEnd: number;
  onSelect: (item: TimelineItem) => void;
};

const MIN_HEIGHT_PERCENT = 4;

export const Timeline = ({
  items,
  rangeStart,
  rangeEnd,
  onSelect,
}: TimelineProps) => {
  const range = Math.max(rangeEnd - rangeStart, 60);
  const ticks: number[] = [];
  const firstTick = Math.floor(rangeStart / 60) * 60;
  for (let minute = firstTick; minute <= rangeEnd; minute += 60) {
    ticks.push(minute);
  }

  return (
    <div className="flex gap-4">
      <div className="flex w-16 flex-col justify-between text-xs text-slate-400">
        {ticks.map((tick) => (
          <span key={tick}>{minutesToTime(tick)}</span>
        ))}
      </div>
      <div className="relative h-[640px] flex-1 rounded-2xl border border-slate-200 bg-white shadow-sm">
        {ticks.map((tick) => {
          const top = ((tick - rangeStart) / range) * 100;
          return (
            <div
              key={`tick-${tick}`}
              className="absolute left-0 right-0 border-t border-slate-100"
              style={{ top: `${top}%` }}
            />
          );
        })}
        {items.map((item) => {
          const top = ((item.startMin - rangeStart) / range) * 100;
          const height = Math.max(
            ((item.endMin - item.startMin) / range) * 100,
            MIN_HEIGHT_PERCENT
          );

          const isAnchor = item.type === "anchor";
          const baseClasses = isAnchor
            ? "bg-slate-900 text-white"
            : "border border-slate-300 text-slate-900";
          const extraClasses =
            item.type === "rail" && item.isUnplaced
              ? "border-rose-400 text-rose-600"
              : "";

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => onSelect(item)}
              className={`absolute left-4 right-4 flex flex-col gap-1 rounded-xl px-4 py-3 text-left text-xs shadow-sm transition hover:shadow-md ${baseClasses} ${extraClasses}`}
              style={{ top: `${top}%`, height: `${height}%` }}
            >
              <span className="text-sm font-semibold">{item.name}</span>
              <span className="text-[11px] opacity-80">
                {item.startTime} • {item.durationMin} min
              </span>
              {item.type === "rail" && (
                <span className="text-[11px] opacity-80">
                  Priority {item.priorityRank} • Min {item.minDurationMin} min
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
