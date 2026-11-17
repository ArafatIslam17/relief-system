# Offline-First Disaster Relief Distribution & Coordination System

Next.js 15 (App Router) · TypeScript · PostgreSQL · Prisma 6 · Dexie.js (offline IndexedDB PWA).

## Setup

```bash
cp .env.example .env          # then set DATABASE_URL and AUTH_JWT_SECRET
npm install
npm run db:migrate            # applies prisma/migrations (incl. append-only triggers)
npm run db:seed               # demo operation: Feni & Noakhali Flash Flood Response 2026
npm run dev
```

Demo accounts, design rules, architecture rules and the API map are in [`CLAUDE.md`](./CLAUDE.md).

## Coordination dashboard

Open `/` and sign in. Coordinators, operation administrators, system administrators and observers land on
`/dashboard/coverage`; the sidebar only shows what the role may use. With `NEXT_PUBLIC_SHOW_DEMO_ACCOUNTS=true`
(demo builds only) the login page lists one-click demo accounts.

## Field app

Open `/field` on a phone (or a 360 px wide browser window), sign in as a field volunteer
(e.g. `01711000011` / `Volunteer@2026`), set a PIN, download wards under **Sync**, and work offline.
The top bar has an **Offline simulator** switch for demonstrating offline behaviour.

## Testing the API

```bash
npm run build && npm start     # in one terminal
npm run test:api               # in another — re-seeds the database, then exercises every endpoint
npm run test:field             # field app in a 360×740 browser, incl. real offline reloads
npm run test:dashboard         # portal + dashboard for every role at 1366×900
```

## Seed contents

- 1 active operation, 6 areas (Feni Sadar, Parshuram); Chhagalnaiya Ward 05 has no households ("No Records")
- 5 relief items; 3 approved organisations + 1 pending
- 12 users covering all 5 roles and the Active / Locked / Deactivated / PendingApproval states
- 25 households with version history, 18 distributions (1 anonymous, 1 voided)
- 2 open same-field conflicts (+1 resolved), 2 duplicate pairs (0.88 Likely, 0.71 Possible),
  1 cross-organisation 24-hour distribution flag, notifications and an append-only audit trail

## Recording demo videos

```bash
APP_URL=https://your-app.vercel.app npm run demo:record
```

Records one walkthrough clip per role into `demo-videos/` (see the header of `scripts/record-demo.spec.ts` for
options). It signs in with the seeded demo accounts and changes data, so use a freshly seeded demo database only.

## Deploying (Vercel)

1. Provision PostgreSQL and set `DATABASE_URL` and `AUTH_JWT_SECRET` (≥ 32 random bytes) in the project's
   environment variables. Do **not** set `NEXT_PUBLIC_SHOW_DEMO_ACCOUNTS` on a real deployment.
2. Apply migrations once per release: `npx prisma migrate deploy` (the build does not migrate).
3. Build command: `npm run build` (runs `prisma generate` first). Seed only demo databases (`npm run db:seed`).
