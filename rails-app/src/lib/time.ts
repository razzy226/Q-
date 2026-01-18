const MINUTES_IN_DAY = 24 * 60;

export const dayMinuteBounds = {
  min: 0,
  max: MINUTES_IN_DAY - 1,
};

export const clampMinutes = (minutes: number) =>
  Math.min(dayMinuteBounds.max, Math.max(dayMinuteBounds.min, minutes));

export const toMinutes = (timeValue: string) => {
  const [hours, minutes] = timeValue.split(":").map((value) => Number(value));
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return 0;
  }
  return clampMinutes(hours * 60 + minutes);
};

export const minutesToTime = (minutes: number) => {
  const safe = clampMinutes(minutes);
  const hours = Math.floor(safe / 60)
    .toString()
    .padStart(2, "0");
  const mins = Math.floor(safe % 60)
    .toString()
    .padStart(2, "0");
  return `${hours}:${mins}`;
};

export const roundToNearestFive = (minutes: number) => {
  return Math.round(minutes / 5) * 5;
};

export const getNowMinutes = () => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

export const formatRelative = (minutes: number, nowMinutes: number) => {
  const diff = minutes - nowMinutes;
  if (diff < 0) {
    return "Already late";
  }
  if (diff === 0) {
    return "Now";
  }
  return `in ${diff} min`;
};

export const formatClock = (minutes: number) => minutesToTime(minutes);

export const addMinutes = (minutes: number, delta: number) =>
  clampMinutes(minutes + delta);
