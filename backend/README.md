# Stayro — Backend

> Placeholder, reserved for the Stayro API service. **Not scaffolded yet — the frontend is the focus right now.**

## Planned stack (proposed)

- Node.js + TypeScript
- Express (or NestJS) REST API
- PostgreSQL + Prisma
- pnpm for package management

## What will live here

- `src/` — API source (routes, services, repositories, middleware, validators)
- Flight / hotel / car search and booking endpoints (powering the frontend `BookingTabs` widget)
- Auth (login/signup for the frontend `/login` page)
- Support ticket endpoint (powering `/support`)
- Health check at `GET /api/v1/health`

## Conventions (when scaffolded)

- Standalone pnpm project (no monorepo workspace), install with `pnpm install`
- `pnpm dev` / `pnpm build` / `pnpm start` / `pnpm lint` / `pnpm typecheck`
- `.env` for secrets, never committed (`.env.example` committed instead)

Until then, the frontend is fully static and all booking actions are client-side stubs that intentionally show a "coming soon" notice.
