"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DaySelector } from "@/components/DaySelector";
import { ItemModal } from "@/components/ItemModal";
import { Timeline, TimelineItem } from "@/components/Timeline";
import { useSchedule } from "@/components/ScheduleProvider";
import { DayKey } from "@/lib/types";
import { toMinutes } from "@/lib/time";

const dayLabels: Record<DayKey, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export default function DayTimeline() {
  const { schedule, hydrated } = useSchedule();
  const [selectedDay, setSelectedDay] = useState<DayKey>("mon");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const day = schedule.days[selectedDay];

  const timelineItems = useMemo<TimelineItem[]>(() => {
    const combined = [...day.anchors, ...day.rails].map((item) => {
      const startMin = toMinutes(item.startTime);
      return {
        ...item,
        startMin,
        endMin: startMin + item.durationMin,
      };
    });
    return combined.sort((a, b) => a.startMin - b.startMin);
  }, [day]);

  const range = useMemo(() => {
    if (!timelineItems.length) {
      return { start: 8 * 60, end: 18 * 60 };
    }
    const earliest = Math.min(...timelineItems.map((item) => item.startMin));
    const latest = Math.max(...timelineItems.map((item) => item.endMin));
    return {
      start: Math.max(0, earliest - 30),
      end: Math.min(23 * 60 + 59, latest + 30),
    };
  }, [timelineItems]);

  const selectedItem = timelineItems.find((item) => item.id === selectedItemId);

  useEffect(() => {
    if (selectedItemId && !selectedItem) {
      setSelectedItemId(null);
    }
  }, [selectedItem, selectedItemId]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
        Loading Rails...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Rails
            </p>
            <h1 className="text-2xl font-semibold text-slate-900">
              Day timeline
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              View time blocks for {dayLabels[selectedDay]}.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700 transition hover:text-slate-900"
          >
            Back to weekly setup
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8">
        <DaySelector value={selectedDay} onChange={setSelectedDay} />

        {timelineItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
            Add anchors and rails to see a timeline for this day.
          </div>
        ) : (
          <Timeline
            items={timelineItems}
            rangeStart={range.start}
            rangeEnd={range.end}
            onSelect={(item) => setSelectedItemId(item.id)}
          />
        )}
      </main>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          dayKey={selectedDay}
          daySchedule={day}
          onClose={() => setSelectedItemId(null)}
        />
      )}
    </div>
  );
}
