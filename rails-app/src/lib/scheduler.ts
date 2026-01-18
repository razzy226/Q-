import { DaySchedule, Rail } from "./types";
import { minutesToTime, roundToNearestFive, toMinutes } from "./time";

type Frame = {
  start: number;
  end: number;
  cursor: number;
};

const DAY_END = 23 * 60 + 59;

const buildFrames = (day: DaySchedule): Frame[] => {
  const anchors = [...day.anchors].sort(
    (a, b) => toMinutes(a.startTime) - toMinutes(b.startTime)
  );
  const frames: Frame[] = [];
  let cursor = 0;

  anchors.forEach((anchor) => {
    const start = toMinutes(anchor.startTime);
    if (start > cursor) {
      frames.push({ start: cursor, end: start, cursor });
    }
    cursor = Math.max(cursor, start + anchor.durationMin);
  });

  if (cursor < DAY_END) {
    frames.push({ start: cursor, end: DAY_END, cursor });
  }

  return frames.filter((frame) => frame.end > frame.start);
};

const findFrameIndex = (frames: Frame[], startMin: number) => {
  const index = frames.findIndex(
    (frame) => startMin >= frame.start && startMin < frame.end
  );
  return index === -1 ? Math.max(frames.length - 1, 0) : index;
};

const tryPlace = (
  rail: Rail,
  frame: Frame,
  desiredStart: number,
  durationMin: number
) => {
  const start = Math.max(frame.cursor, desiredStart, frame.start);
  if (start + durationMin <= frame.end) {
    return { start, durationMin };
  }
  return null;
};

export const rescheduleDay = (
  day: DaySchedule,
  missedRailId: string,
  nowMinutes: number
): DaySchedule => {
  if (!day.rails.length) {
    return day;
  }

  const adjustedRails = day.rails.map((rail) => {
    if (rail.id === missedRailId) {
      const rounded = roundToNearestFive(nowMinutes);
      return {
        ...rail,
        startTime: minutesToTime(rounded),
        isUnplaced: false,
      };
    }
    return { ...rail, isUnplaced: false };
  });

  const frames = buildFrames({ ...day, rails: adjustedRails });
  if (!frames.length) {
    return { ...day, rails: adjustedRails };
  }

  const sortedRails = [...adjustedRails].sort((a, b) => {
    if (a.priorityRank !== b.priorityRank) {
      return a.priorityRank - b.priorityRank;
    }
    return toMinutes(a.startTime) - toMinutes(b.startTime);
  });

  const placements = new Map<
    string,
    { start: number; durationMin: number; preferredIndex: number }
  >();
  const unplaced: Rail[] = [];

  sortedRails.forEach((rail) => {
    const preferredIndex = findFrameIndex(frames, toMinutes(rail.startTime));
    const frame = frames[preferredIndex];
    const desiredStart = toMinutes(rail.startTime);
    const baselineAttempt = tryPlace(
      rail,
      frame,
      desiredStart,
      rail.baselineDurationMin
    );
    if (baselineAttempt) {
      frame.cursor = baselineAttempt.start + baselineAttempt.durationMin;
      placements.set(rail.id, {
        ...baselineAttempt,
        preferredIndex,
      });
      return;
    }

    const minAttempt = tryPlace(
      rail,
      frame,
      desiredStart,
      rail.minDurationMin
    );
    if (minAttempt) {
      frame.cursor = minAttempt.start + minAttempt.durationMin;
      placements.set(rail.id, {
        ...minAttempt,
        preferredIndex,
      });
      return;
    }

    unplaced.push(rail);
  });

  unplaced.forEach((rail) => {
    const preferredIndex = findFrameIndex(frames, toMinutes(rail.startTime));
    for (let index = preferredIndex + 1; index < frames.length; index += 1) {
      const frame = frames[index];
      const desiredStart = toMinutes(rail.startTime);
      const baselineAttempt = tryPlace(
        rail,
        frame,
        desiredStart,
        rail.baselineDurationMin
      );
      if (baselineAttempt) {
        frame.cursor = baselineAttempt.start + baselineAttempt.durationMin;
        placements.set(rail.id, {
          ...baselineAttempt,
          preferredIndex,
        });
        return;
      }

      const minAttempt = tryPlace(
        rail,
        frame,
        desiredStart,
        rail.minDurationMin
      );
      if (minAttempt) {
        frame.cursor = minAttempt.start + minAttempt.durationMin;
        placements.set(rail.id, {
          ...minAttempt,
          preferredIndex,
        });
        return;
      }
    }
  });

  const updatedRails = adjustedRails.map((rail) => {
    const placement = placements.get(rail.id);
    if (!placement) {
      return { ...rail, isUnplaced: true };
    }
    return {
      ...rail,
      startTime: minutesToTime(placement.start),
      durationMin: placement.durationMin,
      isUnplaced: false,
    };
  });

  return {
    ...day,
    rails: updatedRails,
  };
};
