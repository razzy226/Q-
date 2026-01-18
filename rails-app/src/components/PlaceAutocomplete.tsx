"use client";

import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "@/lib/googleMaps";
import { LocationValue } from "@/lib/types";

type PlaceResult = {
  id?: string;
  formattedAddress?: string;
  displayName?: string;
  location?: { lat: () => number; lng: () => number } | { lat: number; lng: number };
  fetchFields?: (options: { fields: string[] }) => Promise<void>;
};

type PlaceSelectEvent = {
  place: PlaceResult;
};

type PlaceAutocompleteProps = {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  onPlaceSelected: (location: LocationValue) => void;
};

export const PlaceAutocomplete = ({
  label = "Search for a place",
  placeholder = "Search for a place",
  defaultValue,
  onPlaceSelected,
}: PlaceAutocompleteProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasBrowserKey = Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY);
  const hasServerKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_SERVER_KEY_PRESENT === "true";
  const [useFallback, setUseFallback] = useState(
    !hasBrowserKey || !hasServerKey
  );

  useEffect(() => {
    if (useFallback) {
      return;
    }
    let isMounted = true;
    let element: HTMLElement | null = null;
    const container = containerRef.current;

    const init = async () => {
      try {
        const googleRef = await loadGoogleMaps();
        const placesLibrary = (await googleRef.maps.importLibrary("places")) as {
          PlaceAutocompleteElement?: new () => HTMLElement;
        };
        const PlaceAutocompleteElement =
          placesLibrary?.PlaceAutocompleteElement ??
          googleRef.maps.places?.PlaceAutocompleteElement;
        if (!PlaceAutocompleteElement || !container || !isMounted) {
          return;
        }

        container.innerHTML = "";
        const autocomplete = new PlaceAutocompleteElement();
        autocomplete.setAttribute("placeholder", placeholder);
        autocomplete.style.width = "100%";
        autocomplete.addEventListener("gmp-placeselect", async (event: Event) => {
          const place = (event as unknown as PlaceSelectEvent)?.place;
          if (!place) {
            return;
          }
          if (place.fetchFields) {
            await place.fetchFields({
              fields: ["formattedAddress", "displayName", "location", "id"],
            });
          }
          const address =
            place.formattedAddress || place.displayName || "Selected place";
          const location = place.location;
          const lat =
            typeof location?.lat === "function" ? location.lat() : location?.lat;
          const lng =
            typeof location?.lng === "function" ? location.lng() : location?.lng;

          onPlaceSelected({
            address,
            placeId: place.id,
            lat: typeof lat === "number" ? lat : undefined,
            lng: typeof lng === "number" ? lng : undefined,
          });
        });

        container.appendChild(autocomplete);
        element = autocomplete;
      } catch (err) {
        if (!isMounted) {
          return;
        }
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load Google Places."
        );
        setUseFallback(true);
      }
    };

    init();

    return () => {
      isMounted = false;
      if (container && element) {
        container.innerHTML = "";
      }
    };
  }, [onPlaceSelected, placeholder, useFallback]);

  if (useFallback) {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {label}
        </span>
        <input
          value={defaultValue ?? ""}
          onChange={(event) => onPlaceSelected({ address: event.target.value })}
          placeholder={placeholder}
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm"
        />
        <p className="text-[11px] text-slate-400">
          Places autocomplete unavailable{error ? `: ${error}` : ""}.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <div
        ref={containerRef}
        className="min-h-[48px] rounded-md border border-slate-200 bg-white px-2 py-1 shadow-sm"
      />
    </div>
  );
};
