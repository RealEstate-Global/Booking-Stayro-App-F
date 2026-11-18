# Stayro — Performance Notes

## Rendering strategy
- Every route is statically prerendered at build time (`○ Static`) — including all 12 hotel detail pages via `generateStaticParams`.
- Only `/hotels/[slug]` hydrates dynamic search-param state (client booking card); `/hotels` streams through `Suspense` with a skeleton fallback.
- Server Components render pages/metadata; client islands are leaf components (search form, pickers, cards).

## Assets
- **Self-hosted imagery** under `public/images/` — no external CDN in the critical path.
- `next/image` everywhere with explicit `sizes`, `priority` only for the hero, and AVIF/WebP negotiation (`images.formats` in `next.config.ts`).
- Concrete texture body background is a single fixed WebP with a 50% overlay — no runtime cost.

## Fonts
- Tajawal via `next/font` (self-hosted at build): zero layout shift, no render-blocking Google Fonts request, `display: swap`.

## JavaScript budget
- Pruned dependency tree: only 9 UI primitives + Radix pieces actually in use — no dialog/dropdown/chart/carousel baggage.
- framer-compatible animation is CSS-only (`globals.css` keyframes) except the mobile menu sheet (`motion/react`, code-split with the header).
- `poweredByHeader: false`, React strict mode on, `outputFileTracingRoot` pinned to the frontend.

## Measured
| Check | Result |
| ----- | ------ |
| `pnpm build` | ✓ 21 pages, TypeScript clean |
| `pnpm lint` / `pnpm typecheck` | ✓ 0 problems / ✓ exit 0 |
| Static pages | 21/21 prerendered |

## Future wins (with backend)
- ISR/`revalidate` for the hotel catalog instead of build-time generation.
- Route prefetch is already automatic via `next/link`; streaming metadata already on.
