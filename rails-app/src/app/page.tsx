"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DaySelector } from "@/components/DaySelector";
import { PlaceAutocomplete } from "@/components/PlaceAutocomplete";
import { useSchedule } from "@/components/ScheduleProvider";
import { DayKey } from "@/lib/types";

const dayLabels: Record<DayKey, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

const clampNumber = (value: string, fallback: number, min = 0) => {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return fallback;
  }
  return Math.max(min, parsed);
};

export default function Home() {
  const { schedule, hydrated, updateItem, addItem, removeItem, resetAll } =
    useSchedule();
  const [selectedDay, setSelectedDay] = useState<DayKey>("mon");

  const day = schedule.days[selectedDay];

  const sortedAnchors = useMemo(
    () => [...day.anchors].sort((a, b) => a.startTime.localeCompare(b.startTime)),
    [day.anchors]
  );
  const sortedRails = useMemo(
    () => [...day.rails].sort((a, b) => a.startTime.localeCompare(b.startTime)),
    [day.rails]
  );

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
              Weekly setup
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Plan anchors and compressible rails for {dayLabels[selectedDay]}.
            </p>
          </div>
          <Link
            href="/day"
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
          >
            View day timeline
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8">
        <DaySelector value={selectedDay} onChange={setSelectedDay} />

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Anchors
                </h2>
                <p className="text-sm text-slate-500">
                  Up to 4 immovable blocks.
                </p>
              </div>
              <button
                type="button"
                onClick={() => addItem(selectedDay, "anchor")}
                disabled={day.anchors.length >= 4}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add anchor
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-4">
              {sortedAnchors.length === 0 && (
                <p className="text-sm text-slate-500">
                  No anchors yet. Add one to lock in fixed commitments.
                </p>
              )}
              {sortedAnchors.map((anchor) => (
                <div
                  key={anchor.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-4"
                >
                  <div className="grid gap-4 md:grid-cols-4">
                    <label className="flex flex-col gap-1 text-xs font-medium text-slate-500">
                      Name
                      <input
                        value={anchor.name}
                        onChange={(event) =>
                          updateItem(selectedDay, "anchor", anchor.id, {
                            name: event.target.value,
                          })
                        }
                        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm"
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-xs font-medium text-slate-500">
                      Start time
                      <input
                        type="time"
                        step={300}
                        value={anchor.startTime}
                        onChange={(event) =>
                          updateItem(selectedDay, "anchor", anchor.id, {
                            startTime: event.target.value || "00:00",
                          })
                        }
                        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm"
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-xs font-medium text-slate-500">
                      Duration (min)
                      <input
                        type="number"
                        min={5}
                        step={5}
                        value={anchor.durationMin}
                        onChange={(event) =>
                          updateItem(selectedDay, "anchor", anchor.id, {
                            durationMin: clampNumber(event.target.value, 30, 5),
                          })
                        }
                        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm"
                      />
                    </label>
                    <div className="flex items-end justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          removeItem(selectedDay, "anchor", anchor.id)
                        }
                        className="text-xs font-semibold uppercase tracking-wide text-slate-400 hover:text-rose-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {anchor.location.address ? (
                      <p className="text-xs text-slate-500">
                        Current: {anchor.location.address}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400">
                        No destination selected yet.
                      </p>
                    )}
                    <PlaceAutocomplete
                      label="Destination"
                      placeholder="Search for destination"
                      onPlaceSelected={(location) =>
                        updateItem(selectedDay, "anchor", anchor.id, {
                          location,
                        })
                      }
                    />
                  </div>
                </div>
              ))}
              {day.anchors.length >= 4 && (
                <p className="text-xs text-amber-600">
                  Maximum of 4 anchors reached.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Rails</h2>
                <p className="text-sm text-slate-500">
                  Up to 4 compressible work blocks.
                </p>
              </div>
              <button
                type="button"
                onClick={() => addItem(selectedDay, "rail")}
                disabled={day.rails.length >= 4}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add rail
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-4">
              {sortedRails.length === 0 && (
                <p className="text-sm text-slate-500">
                  No rails yet. Add one to capture flexible work.
                </p>
              )}
              {sortedRails.map((rail) => (
                <div
                  key={rail.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="grid gap-4 lg:grid-cols-6">
                    <label className="flex flex-col gap-1 text-xs font-medium text-slate-500 lg:col-span-2">
                      Name
                      <input
                        value={rail.name}
                        onChange={(event) =>
                          updateItem(selectedDay, "rail", rail.id, {
                            name: event.target.value,
                          })
                        }
                        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm"
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-xs font-medium text-slate-500">
                      Start time
                      <input
                        type="time"
                        step={300}
                        value={rail.startTime}
                        onChange={(event) =>
                          updateItem(selectedDay, "rail", rail.id, {
                            startTime: event.target.value || "00:00",
                          })
                        }
                        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm"
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-xs font-medium text-slate-500">
                      Baseline (min)
                      <input
                        type="number"
                        min={5}
                        step={5}
                        value={rail.baselineDurationMin}
                        onChange={(event) => {
                          const nextBaseline = clampNumber(
                            event.target.value,
                            rail.baselineDurationMin,
                            5
                          );
                          updateItem(selectedDay, "rail", rail.id, {
                            baselineDurationMin: nextBaseline,
                            durationMin: nextBaseline,
                            minDurationMin: Math.min(
                              rail.minDurationMin,
                              nextBaseline
                            ),
                          });
                        }}
                        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm"
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-xs font-medium text-slate-500">
                      Min (min)
                      <input
                        type="number"
                        min={5}
                        step={5}
                        value={rail.minDurationMin}
                        onChange={(event) => {
                          const nextMin = clampNumber(
                            event.target.value,
                            rail.minDurationMin,
                            5
                          );
                          const clamped = Math.min(nextMin, rail.baselineDurationMin);
                          updateItem(selectedDay, "rail", rail.id, {
                            minDurationMin: clamped,
                            durationMin: Math.max(rail.durationMin, clamped),
                          });
                        }}
                        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm"
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-xs font-medium text-slate-500">
                      Priority
                      <select
                        value={rail.priorityRank}
                        onChange={(event) =>
                          updateItem(selectedDay, "rail", rail.id, {
                            priorityRank: clampNumber(
                              event.target.value,
                              rail.priorityRank,
                              1
                            ),
                          })
                        }
                        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm"
                      >
                        {[1, 2, 3, 4].map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </label>
                    <div className="flex items-end justify-end">
                      <button
                        type="button"
                        onClick={() => removeItem(selectedDay, "rail", rail.id)}
                        className="text-xs font-semibold uppercase tracking-wide text-slate-400 hover:text-rose-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  {rail.durationMin !== rail.baselineDurationMin && (
                    <p className="mt-2 text-xs text-amber-600">
                      Compressed to {rail.durationMin} minutes after reschedule.
                    </p>
                  )}
                  {rail.isUnplaced && (
                    <p className="mt-1 text-xs text-rose-600">
                      Unplaced in current schedule.
                    </p>
                  )}
                  <div className="mt-4 grid gap-3">
                    {rail.location.address ? (
                      <p className="text-xs text-slate-500">
                        Current: {rail.location.address}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400">
                        No destination selected yet.
                      </p>
                    )}
                    <PlaceAutocomplete
                      label="Destination"
                      placeholder="Search for destination"
                      onPlaceSelected={(location) =>
                        updateItem(selectedDay, "rail", rail.id, {
                          location,
                        })
                      }
                    />
                  </div>
                </div>
              ))}
              {day.rails.length >= 4 && (
                <p className="text-xs text-amber-600">
                  Maximum of 4 rails reached.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
          <div>
            <p className="text-sm font-medium text-slate-900">Data controls</p>
            <p className="text-xs text-slate-500">
              Schedule data lives in localStorage only.
            </p>
          </div>
          <button
            type="button"
            onClick={resetAll}
            className="rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-rose-500 transition hover:border-rose-300 hover:text-rose-600"
          >
            Reset all data
          </button>
        </section>
      </main>
    </div>
  );
}
