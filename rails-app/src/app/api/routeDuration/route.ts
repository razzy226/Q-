import { NextResponse } from "next/server";

type RouteRequestBody = {
  origin?: { lat?: number; lng?: number };
  destination?: { lat?: number; lng?: number };
};

type RouteResponse = {
  durationMin: number;
  distanceMeters: number;
  source: "google" | "heuristic";
};

type Coordinates = { lat: number; lng: number };

const CACHE_TTL_MS = 5 * 60 * 1000;
const CACHE_LIMIT = 200;
const cache = new Map<string, { value: RouteResponse; timestamp: number }>();

const roundCoord = (value: number) => Number(value.toFixed(4));

const cacheKey = (origin: Coordinates, destination: Coordinates) =>
  `${roundCoord(origin.lat)},${roundCoord(origin.lng)}:${roundCoord(
    destination.lat
  )},${roundCoord(destination.lng)}`;

const readCache = (key: string) => {
  const cached = cache.get(key);
  if (!cached) {
    return null;
  }
  if (Date.now() - cached.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  cache.delete(key);
  cache.set(key, cached);
  return cached.value;
};

const writeCache = (key: string, value: RouteResponse) => {
  if (cache.size >= CACHE_LIMIT) {
    const oldestKey = cache.keys().next().value as string | undefined;
    if (oldestKey) {
      cache.delete(oldestKey);
    }
  }
  cache.set(key, { value, timestamp: Date.now() });
};

const parseDurationSeconds = (duration: string | undefined) => {
  if (!duration) {
    return null;
  }
  if (/^\d+s$/.test(duration)) {
    const seconds = Number(duration.replace("s", ""));
    return Number.isFinite(seconds) ? seconds : null;
  }
  if (duration.startsWith("PT")) {
    const match = duration.match(
      /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/
    );
    if (!match) {
      return null;
    }
    const hours = Number(match[1] ?? 0);
    const minutes = Number(match[2] ?? 0);
    const seconds = Number(match[3] ?? 0);
    if ([hours, minutes, seconds].some((value) => Number.isNaN(value))) {
      return null;
    }
    return hours * 3600 + minutes * 60 + seconds;
  }
  return null;
};

const haversineDistanceMeters = (origin: Coordinates, destination: Coordinates) => {
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const earthRadiusMeters = 6371_000;
  const dLat = toRadians(destination.lat - origin.lat);
  const dLng = toRadians(destination.lng - origin.lng);
  const lat1 = toRadians(origin.lat);
  const lat2 = toRadians(destination.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusMeters * c;
};

const computeHeuristic = (
  origin: Coordinates,
  destination: Coordinates
): RouteResponse => {
  const distanceMeters = Math.max(
    0,
    Math.round(haversineDistanceMeters(origin, destination))
  );
  const speedMetersPerMinute = (25 * 1609.344) / 60;
  const rawMinutes = distanceMeters / speedMetersPerMinute;
  const durationMin = Math.max(3, Math.round(rawMinutes));
  return {
    durationMin,
    distanceMeters,
    source: "heuristic",
  };
};

const normalizeCoordinates = (value?: { lat?: number; lng?: number }) => {
  const lat = Number(value?.lat);
  const lng = Number(value?.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }
  return { lat, lng };
};

export async function POST(request: Request) {
  let body: RouteRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const origin = normalizeCoordinates(body.origin);
  const destination = normalizeCoordinates(body.destination);
  if (!origin || !destination) {
    return NextResponse.json(
      { error: "Valid origin and destination coordinates are required." },
      { status: 400 }
    );
  }

  const key = cacheKey(origin, destination);
  const cached = readCache(key);
  if (cached) {
    return NextResponse.json(cached);
  }

  const serverKey = process.env.GOOGLE_MAPS_SERVER_KEY;
  if (serverKey) {
    try {
      const response = await fetch(
        "https://routes.googleapis.com/directions/v2:computeRoutes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": serverKey,
            "X-Goog-FieldMask": "routes.duration,routes.distanceMeters",
          },
          body: JSON.stringify({
            origin: {
              location: {
                latLng: {
                  latitude: origin.lat,
                  longitude: origin.lng,
                },
              },
            },
            destination: {
              location: {
                latLng: {
                  latitude: destination.lat,
                  longitude: destination.lng,
                },
              },
            },
            travelMode: "DRIVE",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const route = data.routes?.[0];
        const durationSeconds = parseDurationSeconds(route?.duration);
        if (durationSeconds !== null) {
          const distanceMeters = Math.max(0, Number(route?.distanceMeters ?? 0));
          const result: RouteResponse = {
            durationMin: Math.max(1, Math.round(durationSeconds / 60)),
            distanceMeters: Number.isFinite(distanceMeters) ? distanceMeters : 0,
            source: "google",
          };
          writeCache(key, result);
          return NextResponse.json(result);
        }
      }
    } catch {
      // Fall back to heuristic below.
    }
  }

  const fallback = computeHeuristic(origin, destination);
  writeCache(key, fallback);
  return NextResponse.json(fallback);
}
