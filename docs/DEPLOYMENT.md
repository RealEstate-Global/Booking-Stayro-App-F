# Stayro — Deployment

The production frontend is the Next.js app in `frontend/`, deployed anywhere Next.js runs (Vercel recommended for zero-config).

## Local production check

```bash
cd frontend
pnpm install
pnpm build      # optimized build (Turbopack, static prerender)
pnpm start      # http://localhost:3000
```

## Vercel (recommended)

1. Import the repository into Vercel.
2. Set **Root Directory** to `frontend`.
3. Build command `pnpm build` (Vercel auto-detects Next.js), output is managed by `next start` on the server.
4. Node.js version ≥ 20.9 (`engines` is enforced).

The app needs **no environment variables** — everything (brand, catalog, contacts) is static/config data. When the backend lands, add its URL as `NEXT_PUBLIC_API_URL`.

## Docker / self-hosted

```dockerfile
FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY frontend ./
RUN pnpm build

FROM base AS run
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

> `output: "standalone"` must be enabled in `next.config.ts` for the standalone copy above.

## Static assets

All imagery is self-hosted under `frontend/public/images/` (city skylines + hotel/room photos) — no third-party image CDN in the runtime path.

## CI/CD

GitHub Actions (`.github/workflows/`):
- `code-quality.yml` — install (pnpm, `--frozen-lockfile`), lint, typecheck, build on every PR to `main`.
- `security.yml` — CodeQL analysis + `pnpm audit`.
- `labeler.yml` — automatic PR labels by path.
