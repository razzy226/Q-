export type DayKey =
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat"
  | "sun";

export type LocationValue = {
  address: string;
  placeId?: string;
  lat?: number;
  lng?: number;
};

export type BaseScheduleItem = {
  id: string;
  name: string;
  startTime: string;
  durationMin: number;
  location: LocationValue;
};

export type Anchor = BaseScheduleItem & {
  type: "anchor";
};

export type Rail = BaseScheduleItem & {
  type: "rail";
  priorityRank: number;
  baselineDurationMin: number;
  minDurationMin: number;
  isUnplaced?: boolean;
};

export type DaySchedule = {
  anchors: Anchor[];
  rails: Rail[];
};

export type ScheduleData = {
  days: Record<DayKey, DaySchedule>;
};
