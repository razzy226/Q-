import { ScheduleData } from "./types";

const STORAGE_KEY = "rails.schedule.v1";

export const seedSchedule = (): ScheduleData => ({
  days: {
    mon: {
      anchors: [
        {
          id: "anchor-1",
          type: "anchor",
          name: "Team standup",
          startTime: "09:30",
          durationMin: 30,
          location: {
            address: "1600 Amphitheatre Parkway, Mountain View, CA",
          },
        },
        {
          id: "anchor-2",
          type: "anchor",
          name: "Client review",
          startTime: "14:00",
          durationMin: 60,
          location: {
            address: "1 Market St, San Francisco, CA",
          },
        },
      ],
      rails: [
        {
          id: "rail-1",
          type: "rail",
          name: "Deep work sprint",
          startTime: "11:00",
          durationMin: 90,
          baselineDurationMin: 90,
          minDurationMin: 45,
          priorityRank: 1,
          location: {
            address: "685 Market St, San Francisco, CA",
          },
        },
        {
          id: "rail-2",
          type: "rail",
          name: "Design planning",
          startTime: "16:30",
          durationMin: 60,
          baselineDurationMin: 60,
          minDurationMin: 30,
          priorityRank: 2,
          location: {
            address: "Pier 39, San Francisco, CA",
          },
        },
      ],
    },
    tue: { anchors: [], rails: [] },
    wed: { anchors: [], rails: [] },
    thu: { anchors: [], rails: [] },
    fri: { anchors: [], rails: [] },
    sat: { anchors: [], rails: [] },
    sun: { anchors: [], rails: [] },
  },
});

export const loadSchedule = (): ScheduleData | null => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as ScheduleData;
  } catch {
    return null;
  }
};

export const saveSchedule = (schedule: ScheduleData) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
};

export const clearSchedule = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(STORAGE_KEY);
};
