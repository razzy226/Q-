import { NextResponse } from "next/server";

type RouteRequestBody = {
  origin?: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
};

const parseDurationMinutes = (duration: string | undefined) => {
  if (!duration) {
    return null;
  }
  const seconds = Number(duration.replace("s", ""));
  if (Number.isNaN(seconds)) {
    return null;
  }
  return Math.max(0, Math.round(seconds / 60));
};

export async function POST(request: Request) {
  const key = process.env.GOOGLE_MAPS_SERVER_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Missing GOOGLE_MAPS_SERVER_KEY." },
      { status: 500 }
    );
  }

  let body: RouteRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { origin, destination } = body;
  if (!origin || !destination) {
    return NextResponse.json(
      { error: "Origin and destination are required." },
      { status: 400 }
    );
  }

  const response = await fetch(
    "https://routes.googleapis.com/directions/v2:computeRoutes",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
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

  if (!response.ok) {
    const details = await response.text();
    return NextResponse.json(
      { error: "Routes API error.", details },
      { status: 502 }
    );
  }

  const data = await response.json();
  const route = data.routes?.[0];
  const durationMin = parseDurationMinutes(route?.duration);
  if (durationMin === null) {
    return NextResponse.json(
      { error: "No route duration available." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    durationMin,
    distanceMeters: route?.distanceMeters ?? null,
  });
}
