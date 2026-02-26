# Masar Platform (Monorepo)

Professional MVP-ready workspace for a training centers platform.

## Stack

- **Web:** Next.js + TypeScript (`apps/web`)
- **API:** Express + TypeScript + Prisma (`apps/api`)
- **DB:** PostgreSQL via Docker Compose
- **Shared:** common types package (`packages/shared`)

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start Postgres:
   ```bash
   docker compose up -d
   ```
3. Create env files:
   - copy `apps/api/.env.example` to `apps/api/.env`
   - copy `apps/web/.env.example` to `apps/web/.env.local`
4. Generate Prisma client:
   ```bash
   npm run prisma:generate -w @masar/api
   ```
5. Run dev servers:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - run web + api concurrently
- `npm run build` - build all workspace packages
- `npm run typecheck` - typecheck all packages
- `npm run lint` - lint all packages
- `npm run format` - format repository

## URLs

- Web: `http://localhost:3000`
- API Health: `http://localhost:4000/api/health`

## Notes

- This is a production-oriented scaffold with clean separation of concerns.
- Next step: migrate current single-file UI into modular components under `apps/web` and connect API endpoints.

## Deploy to Render

1. Ensure this repo/branch is pushed to GitHub.
2. In Render dashboard, open your project and click **New +** → **Blueprint**.
3. Select this repository and branch that contains `render.yaml`.
4. Render will create:
   - `masar-api` (Node web service)
   - `masar-web` (Next.js web service)
   - `masar-postgres` (managed PostgreSQL)
5. After first deploy, update env values if needed:
   - `CORS_ORIGIN` on API to your web URL.
   - `NEXT_PUBLIC_API_BASE_URL` on Web to your API URL + `/api/v1`.
