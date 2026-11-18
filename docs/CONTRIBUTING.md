# Contributing to Stayro

First off, thank you for considering a contribution — لكل إقامة هناك قصة, and every PR helps build it.

## About the project

Stayro (ستيرو) is a bilingual **Arabic (RTL) / English** stays-booking platform for Saudi Arabia. The frontend is a **Next.js 16 (App Router)** application living in `frontend/`, managed with **pnpm**.

## Getting started

**Requirements:** Node.js ≥ 20.9, pnpm 12 (`npm i -g pnpm` or `corepack enable`).

```bash
git clone https://github.com/RealEstate-Global/Booking-TUXIMO-Travel-F.git
cd Booking-TUXIMO-Travel-F/frontend
pnpm install
pnpm dev            # http://localhost:3000
```

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `pnpm dev`       | Dev server (Turbopack)             |
| `pnpm build`     | Production build                   |
| `pnpm start`     | Serve the production build         |
| `pnpm lint`      | ESLint (must pass with 0 problems) |
| `pnpm typecheck` | `tsc --noEmit` (must be clean)     |

## Ground rules

1. **pnpm only** — never commit `package-lock.json` or `bun.lock`.
2. **Bilingual by contract** — every user-facing string lives in `src/i18n/dictionaries/ar.ts` (source of truth) **and** `en.ts`. The `Dictionary` type enforces key parity; a build failure here is intentional.
3. **RTL-safe styling** — use logical properties (`ps/pe`, `ms/me`, `start/end`) and `rtl:`/`ltr:` variants, never physical `left/right`.
4. **Single responsibility** — one search bar, one date picker, one hotel card; keep components in their layer (`layout/`, `home/`, `hotels/`, `pages/`, `shared/`, `ui/`).
5. **Brand facts are sacred** — license 73104535, contact channels and socials live only in `src/config/site.ts`. Do not invent features or data (the stays catalog is explicitly demo data).
6. **TypeScript strict** — no `any` leaks; prefer data-driven additions (e.g. a new hotel needs only a `hotels.ts` entry).
7. **Demo honesty** — ratings/prices/testimonials are demo values; keep the demo note in the booking card intact until the backend exists.

## Commit style

Conventional Commits, e.g. `feat(hotels): add Madinah inventory`, `fix(i18n): missing plural key`, `chore: prune unused ui primitives`.

## Pull requests

- Keep PRs focused; run `pnpm lint && pnpm typecheck && pnpm build` before pushing.
- The PR template covers what to describe; screenshots (AR + EN, dark + light) are appreciated for UI changes.
- CI runs lint, typecheck and build on every PR — green required for merge.

## Reporting bugs

Open a GitHub issue with steps to reproduce, expected vs actual, and the route + language + theme you were on.
