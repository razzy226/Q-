"use client";

import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "@/lib/googleMaps";
import { LocationValue } from "@/lib/types";

type PlaceAutocompleteProps = {
  label?: string;
  placeholder?: string;
  onPlaceSelected: (location: LocationValue) => void;
};

export const PlaceAutocomplete = ({
  label = "Search for a place",
  placeholder = "Search for a place",
  onPlaceSelected,
}: PlaceAutocompleteProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let element: HTMLElement | null = null;

    const init = async () => {
      try {
        const googleRef = await loadGoogleMaps();
        const placesLibrary = (await googleRef.maps.importLibrary(
          "places"
        )) as any;
        const PlaceAutocompleteElement =
          placesLibrary?.PlaceAutocompleteElement ??
          googleRef.maps.places?.PlaceAutocompleteElement;
        if (!PlaceAutocompleteElement || !containerRef.current || !isMounted) {
          return;
        }

        containerRef.current.innerHTML = "";
        const autocomplete = new PlaceAutocompleteElement();
        autocomplete.setAttribute("placeholder", placeholder);
        autocomplete.style.width = "100%";
        autocomplete.addEventListener("gmp-placeselect", async (event: any) => {
          const place = event?.place;
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

        containerRef.current.appendChild(autocomplete);
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
      }
    };

    init();

    return () => {
      isMounted = false;
      if (containerRef.current && element) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [onPlaceSelected, placeholder]);

  if (error) {
    return (
      <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
        {error}
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
