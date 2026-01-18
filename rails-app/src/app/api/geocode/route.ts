import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const key = process.env.GOOGLE_MAPS_SERVER_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Missing GOOGLE_MAPS_SERVER_KEY." },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address")?.trim();
  if (!address) {
    return NextResponse.json(
      { error: "Address query parameter is required." },
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${key}`
  );

  if (!response.ok) {
    const details = await response.text();
    return NextResponse.json(
      { error: "Geocoding API error.", details },
      { status: 502 }
    );
  }

  const data = await response.json();
  const result = data.results?.[0];
  if (!result) {
    return NextResponse.json(
      { error: "No geocoding results found." },
      { status: 404 }
    );
  }

  const location = result.geometry?.location;
  if (
    typeof location?.lat !== "number" ||
    typeof location?.lng !== "number"
  ) {
    return NextResponse.json(
      { error: "No coordinates available for this address." },
      { status: 404 }
    );
  }
  return NextResponse.json({
    lat: location.lat,
    lng: location.lng,
    formattedAddress: result.formatted_address,
    placeId: result.place_id,
  });
}
