# Project Structure

Architecture and organization of the Stayro (ستيرو) platform — a **Next.js 16 (App Router)** bilingual stays-booking frontend with a full search → listing → detail → demo-booking flow.

## Repository layout

```text
.
├── .github/                        # CI/CD (pnpm-based), labeler, dependabot
├── backend/                        # Placeholder for the future Stayro API (not scaffolded yet)
├── docs/                           # This documentation
├── frontend/                       # The Next.js application (standalone pnpm project)
│   ├── public/
│   │   ├── images/cities/          # Real skyline photos: makkah, madinah, riyadh, jeddah, dammam
│   │   ├── images/hotels/          # Hotel/room photography used by the demo catalog
│   │   └── images/                 # Brand assets (stayro-hero.webp texture, og image)
│   ├── src/
│   │   ├── app/                    # App Router — routes & app-wide files
│   │   │   ├── layout.tsx          # Root layout: Tajawal font, theme + language providers, header/footer, JSON-LD
│   │   │   ├── page.tsx            # / home (full-height hero + search, cities, featured stays, why/how, testimonials, CTA)
│   │   │   ├── about/page.tsx      # /about — story, license, values, CTA
│   │   │   ├── hotels/page.tsx     # /hotels — search results (Suspense + skeleton)
│   │   │   ├── hotels/[slug]/page.tsx  # Hotel detail + demo booking (generateStaticParams + per-hotel metadata)
│   │   │   ├── support/page.tsx    # /support — contacts, FAQ accordion, message form
│   │   │   ├── loading.tsx         # Global loading fallback
│   │   │   ├── not-found.tsx       # Global 404
│   │   │   ├── error.tsx           # Global error boundary
│   │   │   ├── sitemap.ts          # /sitemap.xml (static routes + all hotel slugs)
│   │   │   ├── robots.ts           # /robots.txt
│   │   │   ├── icon.svg            # Stayro favicon
│   │   │   └── globals.css         # Design tokens (R G B triplets), dark body texture, centralized slim scrollbar
│   │   ├── components/
│   │   │   ├── layout/             # SiteHeader (license line, animated mobile sheet), SiteFooter
│   │   │   ├── home/               # StayHeroSection, CitiesSection, FeaturedStaysSection,
│   │   │   │                       #   WhyStayroSection, HowItWorksSection, TestimonialsSection, CtaBannerSection
│   │   │   ├── hotels/             # HotelCard
│   │   │   ├── pages/              # Route-level client views (HomeView, HotelsView, HotelDetailView, AboutView, SupportView)
│   │   │   ├── shared/             # StaySearchForm, DatePickerField (reusable calendar), Logo, SectionBadge, amenity-icons
│   │   │   └── ui/                 # shadcn/ui primitives (select/scroll-area are arrow-free)
│   │   ├── config/                 # site.ts — brand, license 73104535, contacts, socials, appStore (single source of truth)
│   │   ├── data/                   # Demo catalog: cities.ts (5 real cities), hotels.ts (12 real Saudi hotel brands)
│   │   ├── hooks/                  # use-mobile.tsx
│   │   ├── i18n/                   # language-provider.tsx, config.ts, dictionaries/{ar,en}.ts
│   │   └── lib/                    # booking.ts (nights, VAT 15%, SAR formatting, STY- references), utils.ts
│   ├── tailwind.config.ts          # Tokens mapped to CSS variables; rtl-aware content globs
│   ├── next.config.ts              # outputFileTracingRoot, image formats (AVIF/WebP)
│   └── package.json                # pnpm; scripts: dev/build/start/lint/typecheck
├── screenshots/                    # Product screenshots
├── .gitignore
└── README.md
```

## Design decisions

1. **Two plain folders, no workspace** — `frontend/` and `backend/` are independent pnpm projects (the team asked against a monorepo workspace).
2. **App Router with server pages + client views** — `app/**/page.tsx` are server components (export `metadata`) that render `components/pages/*View` client components, which consume the language context. `/hotels` wraps its view in `Suspense` (it reads search params); `/hotels/[slug]` is statically generated per hotel via `generateStaticParams`.
3. **Single responsibility, no duplication**
   - `StaySearchForm` is the only search bar — used by the home hero and the /hotels page.
   - `DatePickerField` is the only date control — a reusable, locale-aware calendar popover (no native `type=date` anywhere).
   - `HotelCard` renders listings on both the home (featured) and /hotels grids.
   - `SectionBadge` replaces the eyebrow pill pattern across sections.
   - Layout chrome (header/footer) lives only in `components/layout`.
   - Contact details, license number and socials live only in `config/site.ts`.
4. **Bilingual Arabic (RTL) / English (LTR)** — `i18n/language-provider.tsx` is a client context that swaps a typed dictionary, persists the choice to `localStorage` (`stayro-locale`), and keeps `<html lang>`/`<html dir>` in sync. Components use **logical CSS properties** (`start/end`, `ms/me`, `ps/pe`) instead of physical left/right so the same markup works in both directions.
5. **Design tokens** — colors are `R G B` triplets in `globals.css` (`:root` light, `.dark` dark) consumed by Tailwind as `rgb(var(--token) / <alpha-value>)`. Dark is the default theme (stayro.com look) with the concrete-texture body; light is fully supported.
6. **Centralized scrollbar** — one slim, rounded, theme-aware scrollbar defined once in `globals.css` `@layer base` (`*` + `[data-radix-select-viewport]` override so dropdowns keep it too). No arrow buttons, no per-component duplicates.
7. **Stayro branding** — Tajawal (Arabic-first font), Stayro house-S mark (`components/shared/logo.tsx`, `app/icon.svg`), Ministry of Tourism license **73104535** in the header and footer, real contact channels (Rakan@stayro.com, Abdulrahman@stayro.com, +966 55 123 4471, +966 546 546 480) and socials (@StayroApp on Instagram/TikTok/X).
8. **SEO** — Next.js Metadata API (per-route + per-hotel `generateMetadata`), Open Graph, JSON-LD `TravelAgency` in the root layout, `app/sitemap.ts` (static routes + every hotel), `app/robots.ts`.
9. **Demo data & booking** — `src/data/` holds real Saudi cities and real hotel brands, but ratings, review counts, prices and testimonials are clearly **demo values**. The booking card computes nights + 15% VAT client-side and issues a `STY-XXXXXX` demo reference — no payment until `backend/` is built (see `backend/README.md`).

## Naming conventions

- Files: `kebab-case.tsx` / `kebab-case.ts`
- Components & exports: `PascalCase`
- Hooks: `use-camelCase`
- Directories: `kebab-case`

## Adding a new page

1. Add route: `src/app/my-page/page.tsx` (server component, exports `metadata`).
2. Add view: `src/components/pages/my-page-view.tsx` ("use client").
3. Add all strings to **both** `src/i18n/dictionaries/ar.ts` and `en.ts` (the `Dictionary` type enforces key parity).
4. Add the nav entry in `src/data/navigation.ts` if it belongs in the main nav.

## Adding a new stay

Append to `src/data/hotels.ts` (slug, city id from `cities.ts`, district, stars, rating, price, amenities, images, bilingual description). The detail route, metadata and sitemap pick it up automatically — no other file changes needed.

## Adding a new locale

1. Create `src/i18n/dictionaries/<locale>.ts` implementing `Dictionary` from `ar.ts`.
2. Register it in `src/i18n/config.ts` and the `dictionaries` map in `language-provider.tsx`.
