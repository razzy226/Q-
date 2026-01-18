"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { clearSchedule, loadSchedule, saveSchedule, seedSchedule } from "@/lib/storage";
import { DayKey, DaySchedule, Rail, ScheduleData } from "@/lib/types";
import { rescheduleDay } from "@/lib/scheduler";

type ItemType = "anchor" | "rail";

type ScheduleContextValue = {
  schedule: ScheduleData;
  hydrated: boolean;
  updateDay: (day: DayKey, updater: (day: DaySchedule) => DaySchedule) => void;
  updateItem: (
    day: DayKey,
    itemType: ItemType,
    itemId: string,
    updates: Partial<Rail & { durationMin: number }>
  ) => void;
  addItem: (day: DayKey, itemType: ItemType) => void;
  removeItem: (day: DayKey, itemType: ItemType, itemId: string) => void;
  resetAll: () => void;
  runRescheduler: (day: DayKey, railId: string, nowMinutes: number) => void;
};

const ScheduleContext = createContext<ScheduleContextValue | null>(null);

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Math.random().toString(36).slice(2, 10)}`;
};

export const ScheduleProvider = ({ children }: { children: React.ReactNode }) => {
  const [schedule, setSchedule] = useState<ScheduleData>(seedSchedule());
  const [hydrated, setHydrated] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    const stored = loadSchedule();
    if (stored) {
      setSchedule(stored);
    } else {
      const seeded = seedSchedule();
      setSchedule(seeded);
      saveSchedule(seeded);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    saveSchedule(schedule);
  }, [hydrated, schedule]);

  const updateDay = (day: DayKey, updater: (day: DaySchedule) => DaySchedule) => {
    setSchedule((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: updater(prev.days[day]),
      },
    }));
  };

  const updateItem: ScheduleContextValue["updateItem"] = (
    day,
    itemType,
    itemId,
    updates
  ) => {
    updateDay(day, (current) => {
      const list = itemType === "anchor" ? current.anchors : current.rails;
      const updatedList = list.map((item) => {
        if (item.id !== itemId) {
          return item;
        }
        const next = { ...item, ...updates, isUnplaced: false };
        if (next.type === "rail") {
          const rail = next as Rail;
          const baseline = Math.max(1, rail.baselineDurationMin);
          const min = Math.min(rail.minDurationMin, baseline);
          return {
            ...rail,
            baselineDurationMin: baseline,
            minDurationMin: Math.max(1, min),
            durationMin: Math.min(rail.durationMin, baseline),
          };
        }
        return next;
      });
      return {
        ...current,
        anchors: itemType === "anchor" ? updatedList : current.anchors,
        rails: itemType === "rail" ? (updatedList as Rail[]) : current.rails,
      };
    });
  };

  const addItem: ScheduleContextValue["addItem"] = (day, itemType) => {
    updateDay(day, (current) => {
      if (itemType === "anchor" && current.anchors.length >= 4) {
        return current;
      }
      if (itemType === "rail" && current.rails.length >= 4) {
        return current;
      }

      if (itemType === "anchor") {
        return {
          ...current,
          anchors: [
            ...current.anchors,
            {
              id: createId(),
              type: "anchor",
              name: "New anchor",
              startTime: "09:00",
              durationMin: 30,
              location: { address: "" },
            },
          ],
        };
      }

      return {
        ...current,
        rails: [
          ...current.rails,
          {
            id: createId(),
            type: "rail",
            name: "New rail",
            startTime: "10:00",
            durationMin: 45,
            baselineDurationMin: 45,
            minDurationMin: 30,
            priorityRank: 2,
            location: { address: "" },
          },
        ],
      };
    });
  };

  const removeItem: ScheduleContextValue["removeItem"] = (
    day,
    itemType,
    itemId
  ) => {
    updateDay(day, (current) => ({
      ...current,
      anchors:
        itemType === "anchor"
          ? current.anchors.filter((item) => item.id !== itemId)
          : current.anchors,
      rails:
        itemType === "rail"
          ? current.rails.filter((item) => item.id !== itemId)
          : current.rails,
    }));
  };

  const resetAll = () => {
    clearSchedule();
    const seeded = seedSchedule();
    setSchedule(seeded);
    saveSchedule(seeded);
  };

  const runRescheduler = (day: DayKey, railId: string, nowMinutes: number) => {
    updateDay(day, (current) => rescheduleDay(current, railId, nowMinutes));
  };

  const value = {
    schedule,
    hydrated,
    updateDay,
    updateItem,
    addItem,
    removeItem,
    resetAll,
    runRescheduler,
  };

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useSchedule must be used within ScheduleProvider");
  }
  return context;
};
