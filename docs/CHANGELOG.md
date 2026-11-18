# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-11-17

### Changed
- **Converted the legacy React + Vite SPA to Next.js 16 (App Router) + React 19 + TypeScript**, now living in `frontend/` as a standalone pnpm project. `backend/` placeholder added for the future API.
- **Rebranded to Stayro (ستيرو)** after verifying the real stayro.com — stayro.com design tokens (charcoal `#3A3739`, Stayro orange `#FF5B2E`, warm off-white `#FAF6F5`), Tajawal font, house-S logo, Ministry of Tourism license badge (**73104535**), real contact channels (Rakan@stayro.com, Abdulrahman@stayro.com, +966 55 123 4471, +966 546 546 480) and socials (@StayroApp on Instagram/TikTok/X).
- **Full stays-booking experience (demo data)** — five real Saudi cities (Makkah, Madinah, Riyadh, Jeddah, Dammam) with real skyline imagery, and a 12-property catalog of real Saudi hotel brands with stars, Booking-style ratings, SAR pricing and amenities in `src/data/`.
- **Search flow** — `StaySearchForm` (destination + guests + rooms + two reusable calendar date pickers) drives `/hotels` results with sorting (recommended / price asc-desc / rating); the form is prefillable from URL params on `/hotels`.
- **Hotel detail + demo booking** — `/hotels/[slug]` statically generated per hotel: gallery, amenities with icons, guest stories, and a sticky booking card computing nights + **15% VAT** with an instant `STY-XXXXXX` confirmation reference.
- **Bilingual Arabic (RTL, default) / English (LTR)** via a typed-dictionary `LanguageProvider` with persistent locale choice. All layout uses logical CSS properties.
- **Theme** — dark default (stayro.com) with concrete-texture body, fully-supported light theme; **one centralized slim scrollbar** in `globals.css` (including Radix select dropdowns — no arrow buttons anywhere).
- **Home page** — full-height hero (Riyadh skyline from the top of the body, under the fixed header), cities strip, featured stays, why-Stayro, how-it-works, guest stories and a closing CTA.
- Routing moved to App Router; per-route + per-hotel metadata via the Metadata API; JSON-LD `TravelAgency`, `sitemap.ts` (static routes + all hotel slugs), `robots.ts`, `app/icon.svg`.
- Pages split into server `page.tsx` (metadata) + client `*View` components; shared `StaySearchForm`, `DatePickerField`, `HotelCard`, `SectionBadge` eliminate copy-pasted markup.
- CI/CD rewritten for **pnpm** (`frontend/`, `--frozen-lockfile`, Node 20); dependabot targets `/frontend`; CodeQL retained; npm-audit replaced by `pnpm audit`.

### Removed
- All fabricated legacy features: flights/cars booking widget, fake destination explorer & pricing, placeholder "coming soon" pages, cars/login routes, video background, and every Lovable-generated reference.
- Vite, `react-router`, `react-helmet-async`, vitest, `@tanstack/react-query`, `hls.js`, `recharts`, Radix toast/toaster (sonner is the single toast system).
- **bun.lock / bun.lockb / package-lock.json** — pnpm only.

## [Unreleased]

### Planned
- `backend/` API: real inventory, availability and bookings (the frontend demo contract in `lib/booking.ts` is ready to swap).
- Payments (mada / Visa / Mastercard / Apple Pay) in SAR.
- Accounts, wishlist and booking management.
- Host/stays onboarding (Stayro Business).

---

## Links

- [Documentation](../README.md)
- [Project structure](./STRUCTURE.md)
