# Rails

Local-first weekly scheduling with anchors and compressible rails. Data stays in
`localStorage`, while Google Maps calls are proxied through server-side routes.

## Quick start

1. Install dependencies:
   - `npm install`
2. Create a `.env.local` file and add your keys:
   - `NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY=...`
   - `GOOGLE_MAPS_SERVER_KEY=...`
3. Run the dev server:
   - `npm run dev`

## Google Maps setup

Enable the following APIs in Google Cloud and make sure billing is enabled:

- Maps JavaScript API
- Places API
- Routes API
- Geocoding API

Environment variables:

- `NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY` (browser key; restrict by HTTP referrer)
- `GOOGLE_MAPS_SERVER_KEY` (server key; restrict by IP in production)

## API routes

- `POST /api/routeDuration` → Google Routes API `computeRoutes`
- `GET /api/geocode?address=...` → Google Geocoding API

## Notes

- Schedule data is stored as a single JSON blob in `localStorage`.
- A demo week (Monday) is seeded on first load.
