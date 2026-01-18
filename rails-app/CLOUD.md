# Rails Cloud Guide

## Prereqs

- Node.js 18+ and npm
- `npm install`
- Optional `.env.local` with Google Maps keys

## Running without keys (fallback mode)

1. Ensure `.env.local` does **not** include Google Maps keys.
2. Run `npm run dev`.
3. Expect:
   - Address inputs render as plain text fields.
   - Route durations use the heuristic fallback.
   - If a destination lacks coordinates, the modal prompts you to add keys or
     enter lat/lng manually.

## Running with keys

Create `.env.local`:

- `NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY=...`
- `GOOGLE_MAPS_SERVER_KEY=...`

Enable in Google Cloud (billing required):

- Maps JavaScript API
- Places API
- Routes API
- Geocoding API

## Manual test checklist

1. Create/edit anchors and rails, refresh, verify persistence.
2. Confirm timeline block positions match times.
3. Update location (allow GPS), verify leave times render.
4. Deny GPS, use origin fallback input.
5. Run without keys, verify heuristic routing + ETA source label.
6. Rails show scheduled and compressed leave times.
7. Click “I missed”, confirm reschedule, see toast + timeline update.
8. Unscheduled rails appear in the “Unscheduled” section.

## Troubleshooting

- CORS errors: ensure you are calling the local API routes, not Maps APIs directly.
- Invalid key restrictions: browser key must allow your localhost origin.
- Quota errors: confirm billing is enabled and quotas are available.
