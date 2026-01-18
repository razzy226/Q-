"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { PlaceAutocomplete } from "@/components/PlaceAutocomplete";
import { useSchedule } from "@/components/ScheduleProvider";
import { DayKey, DaySchedule, LocationValue, Rail } from "@/lib/types";
import {
  addMinutes,
  clampMinutes,
  formatClock,
  formatRelative,
  getNowMinutes,
  minutesToTime,
  toMinutes,
} from "@/lib/time";

type ItemModalProps = {
  item: DaySchedule["anchors"][number] | Rail;
  dayKey: DayKey;
  daySchedule: DaySchedule;
  onClose: () => void;
};

const BUFFER_EARLY_ARRIVAL = 5;
const DAY_END = 23 * 60 + 59;

type RouteResult = {
  durationMin: number;
  distanceMeters?: number;
};

export const ItemModal = ({ item, dayKey, daySchedule, onClose }: ItemModalProps) => {
  const { updateItem, runRescheduler } = useSchedule();
  const [origin, setOrigin] = useState<LocationValue | null>(null);
  const [originError, setOriginError] = useState<string | null>(null);
  const [originStatus, setOriginStatus] = useState<"idle" | "loading" | "ready">(
    "idle"
  );
  const [showOriginSearch, setShowOriginSearch] = useState(false);
  const [travelInfo, setTravelInfo] = useState<RouteResult | null>(null);
  const [travelLoading, setTravelLoading] = useState(false);
  const [travelError, setTravelError] = useState<string | null>(null);
  const [nextTravel, setNextTravel] = useState<RouteResult | null>(null);

  useEffect(() => {
    setOrigin(null);
    setOriginError(null);
    setOriginStatus("idle");
    setShowOriginSearch(false);
    setTravelInfo(null);
    setTravelLoading(false);
    setTravelError(null);
    setNextTravel(null);
  }, [item.id]);

  const sortedItems = useMemo(() => {
    const combined = [...daySchedule.anchors, ...daySchedule.rails];
    return combined.sort(
      (a, b) => toMinutes(a.startTime) - toMinutes(b.startTime)
    );
  }, [daySchedule.anchors, daySchedule.rails]);

  const nextItem = useMemo(() => {
    const currentIndex = sortedItems.findIndex((entry) => entry.id === item.id);
    if (currentIndex === -1) {
      return null;
    }
    return sortedItems[currentIndex + 1] ?? null;
  }, [sortedItems, item.id]);

  const fetchRouteDuration = useCallback(
    async (
      originValue: { lat: number; lng: number },
      destinationValue: { lat: number; lng: number }
    ): Promise<RouteResult> => {
      const response = await fetch("/api/routeDuration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: originValue,
          destination: destinationValue,
        }),
      });
      if (!response.ok) {
        throw new Error("Unable to calculate routes right now.");
      }
      return response.json();
    },
    []
  );

  const ensureLatLng = useCallback(
    async (target: ItemModalProps["item"]) => {
      if (
        typeof target.location.lat === "number" &&
        typeof target.location.lng === "number"
      ) {
        return { lat: target.location.lat, lng: target.location.lng };
      }
      if (!target.location.address) {
        return null;
      }
      const response = await fetch(
        `/api/geocode?address=${encodeURIComponent(target.location.address)}`
      );
      if (!response.ok) {
        throw new Error("Unable to geocode the destination.");
      }
      const data = await response.json();
      updateItem(dayKey, target.type, target.id, {
        location: {
          ...target.location,
          lat: data.lat,
          lng: data.lng,
          placeId: target.location.placeId ?? data.placeId,
          address: target.location.address || data.formattedAddress,
        },
      });
      return { lat: data.lat, lng: data.lng };
    },
    [dayKey, updateItem]
  );

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      if (!origin || typeof origin.lat !== "number" || typeof origin.lng !== "number") {
        return;
      }
      try {
        setTravelLoading(true);
        setTravelError(null);
        const destination = await ensureLatLng(item);
        if (!destination || !isMounted) {
          return;
        }
        const result = await fetchRouteDuration(origin, destination);
        if (!isMounted) {
          return;
        }
        setTravelInfo(result);
      } catch (err) {
        if (!isMounted) {
          return;
        }
        setTravelError(
          err instanceof Error ? err.message : "Route lookup failed."
        );
      } finally {
        if (isMounted) {
          setTravelLoading(false);
        }
      }
    };
    run();
    return () => {
      isMounted = false;
    };
  }, [origin?.lat, origin?.lng, item, ensureLatLng, fetchRouteDuration]);

  useEffect(() => {
    let isMounted = true;
    const runNext = async () => {
      if (!nextItem || item.type !== "rail") {
        setNextTravel(null);
        return;
      }
      try {
        const originLocation = await ensureLatLng(item);
        const destinationLocation = await ensureLatLng(nextItem);
        if (!originLocation || !destinationLocation || !isMounted) {
          return;
        }
        const result = await fetchRouteDuration(originLocation, destinationLocation);
        if (!isMounted) {
          return;
        }
        setNextTravel(result);
      } catch (err) {
        if (!isMounted) {
          return;
        }
        setNextTravel(null);
      }
    };
    runNext();
    return () => {
      isMounted = false;
    };
  }, [item, nextItem, ensureLatLng, fetchRouteDuration]);

  const handleUpdateLocation = () => {
    if (!navigator.geolocation) {
      setOriginError("Geolocation is not supported in this browser.");
      setShowOriginSearch(true);
      return;
    }
    setOriginStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setOrigin({
          address: "Current location",
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setOriginStatus("ready");
        setOriginError(null);
      },
      (error) => {
        setOriginStatus("idle");
        setOriginError(
          error.code === error.PERMISSION_DENIED
            ? "Location permission denied. Use search instead."
            : "Unable to retrieve your location."
        );
        setShowOriginSearch(true);
      }
    );
  };

  const nowMinutes = getNowMinutes();
  const scheduledStartMin = toMinutes(item.startTime);
  const travelToItemMin = travelInfo?.durationMin ?? null;
  const leaveScheduled =
    travelToItemMin !== null
      ? clampMinutes(scheduledStartMin - travelToItemMin - BUFFER_EARLY_ARRIVAL)
      : null;

  const leaveNowEta =
    travelToItemMin !== null ? addMinutes(nowMinutes, travelToItemMin) : null;

  let compressedLeave: number | null = null;
  if (item.type === "rail" && travelToItemMin !== null) {
    const nextStart = nextItem ? toMinutes(nextItem.startTime) : DAY_END;
    const travelToNext = nextTravel?.durationMin ?? 0;
    const latestStartAtRail =
      nextStart - travelToNext - item.minDurationMin - BUFFER_EARLY_ARRIVAL;
    compressedLeave = clampMinutes(latestStartAtRail - travelToItemMin);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 px-4 pb-8">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              {item.type === "anchor" ? "Anchor" : "Rail"}
            </p>
            <h3 className="text-xl font-semibold text-slate-900">{item.name}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {item.startTime} • {item.durationMin} min
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Destination
            </p>
            <p className="mt-2 text-sm text-slate-700">
              {item.location.address || "No destination selected"}
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Place ID: {item.location.placeId || "Not set"}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Origin
            </p>
            <p className="mt-2 text-sm text-slate-700">
              {origin?.address || "Tap update location to set your origin."}
            </p>
            {originError && (
              <p className="mt-2 text-xs text-rose-500">{originError}</p>
            )}
            <button
              type="button"
              onClick={handleUpdateLocation}
              className="mt-3 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:text-slate-900"
            >
              {originStatus === "loading" ? "Locating..." : "Update location"}
            </button>
          </div>
        </div>

        {showOriginSearch && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Search origin instead
            </p>
            <div className="mt-3">
              <PlaceAutocomplete
                label="Origin"
                placeholder="Search origin address"
                onPlaceSelected={(location) => {
                  setOrigin(location);
                  setOriginError(null);
                }}
              />
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Travel time
            </p>
            {travelLoading && (
              <p className="mt-2 text-sm text-slate-500">Calculating...</p>
            )}
            {!travelLoading && travelInfo && (
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {travelInfo.durationMin} min
              </p>
            )}
            {travelError && (
              <p className="mt-2 text-xs text-rose-500">{travelError}</p>
            )}
            {!travelLoading && !travelInfo && !travelError && (
              <p className="mt-2 text-sm text-slate-500">
                Set origin + destination to calculate.
              </p>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Leave scheduled
            </p>
            {leaveScheduled === null ? (
              <p className="mt-2 text-sm text-slate-500">Pending route.</p>
            ) : (
              <div className="mt-2">
                <p className="text-lg font-semibold text-slate-900">
                  {formatClock(leaveScheduled)}
                </p>
                <p className="text-xs text-slate-500">
                  {formatRelative(leaveScheduled, nowMinutes)}
                </p>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              ETA if leave now
            </p>
            {leaveNowEta === null ? (
              <p className="mt-2 text-sm text-slate-500">Pending route.</p>
            ) : (
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {minutesToTime(leaveNowEta)}
              </p>
            )}
          </div>
        </div>

        {item.type === "rail" && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Compressed leave time
                </p>
                {compressedLeave === null ? (
                  <p className="mt-2 text-sm text-slate-500">
                    Set origin + destination to calculate.
                  </p>
                ) : (
                  <div className="mt-2">
                    <p className="text-lg font-semibold text-slate-900">
                      {formatClock(compressedLeave)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatRelative(compressedLeave, nowMinutes)}
                    </p>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => runRescheduler(dayKey, item.id, nowMinutes)}
                className="rounded-full bg-rose-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-rose-600"
              >
                I missed
              </button>
            </div>
            {nextItem && (
              <p className="mt-3 text-xs text-slate-500">
                Next up: {nextItem.name} at {nextItem.startTime}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
