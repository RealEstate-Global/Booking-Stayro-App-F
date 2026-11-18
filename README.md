<div align="center">

# ستيرو | Stayro — Stays Booking Platform

### لكل إقامة هناك قصة · Every stay has a story

![License](https://img.shields.io/badge/License-Ministry%20of%20Tourism%2073104535-FF5B2E)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)
![pnpm](https://img.shields.io/badge/pnpm-12-F69220?logo=pnpm)

[stayro.com](https://stayro.com)

</div>

---

## About

Stayro (ستيرو) is a bilingual **Arabic (RTL, default) / English** stays-booking platform for Saudi Arabia, licensed by the **Ministry of Tourism, License No. 73104535**. Travelers search, compare and book **hotels, apartments, chalets and resorts** across Makkah, Madinah, Riyadh, Jeddah and Dammam — with clear SAR pricing, a reusable calendar picker and an instant demo booking flow.

This repository contains the web frontend (and a placeholder for the future backend API), built as a **production-grade Next.js App Router application** with a clean, single-responsibility folder structure.

## Repository layout

```text
.
├── frontend/          # Next.js 16 app (App Router, React 19, TypeScript, Tailwind 3.4, pnpm)
│   ├── public/        # Static assets (images, icon)
│   │   └── images/    # City skylines (makkah/madinah/riyadh/jeddah/dammam) + hotel & room photos
│   └── src/
│       ├── app/           # Routes: /, /about, /hotels, /hotels/[slug], /support
│       │                  # + loading/not-found/error, sitemap.ts, robots.ts, icon.svg
│       ├── components/
│       │   ├── layout/    # SiteHeader (animated mobile sheet), SiteFooter
│       │   ├── home/      # Full-height hero, cities, featured stays, why/how, testimonials, CTA
│       │   ├── hotels/    # HotelCard
│       │   ├── pages/     # Per-route views (HomeView, HotelsView, HotelDetailView, …)
│       │   ├── shared/    # StaySearchForm, DatePickerField, Logo, SectionBadge, …
│       │   └── ui/        # shadcn/ui design-system primitives
│       ├── config/        # site.ts — brand, license, contacts, socials (single source of truth)
│       ├── data/          # Demo catalog: cities.ts, hotels.ts (real Saudi cities & hotel brands)
│       ├── i18n/          # LanguageProvider + typed ar/en dictionaries (RTL/LTR aware)
│       └── lib/           # booking.ts (pricing/VAT/nights/reference), utils
├── backend/           # Placeholder for the future API (not scaffolded yet)
├── docs/              # Documentation
└── screenshots/       # Product screenshots
```

## Getting started (frontend)

```bash
cd frontend
pnpm install
pnpm dev        # http://localhost:3000
```

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `pnpm dev`       | Start dev server (Turbopack)   |
| `pnpm build`     | Production build               |
| `pnpm start`     | Serve the production build     |
| `pnpm lint`      | ESLint (eslint-config-next)    |
| `pnpm typecheck` | `tsc --noEmit`                 |

Requirements: **Node.js ≥ 20.9** and **pnpm 12** (`npm i -g pnpm`).

## Features

- 🌐 **Bilingual العربية/English** — full RTL layout switching with persistent preference, typed dictionaries (`src/i18n`)
- 🎨 **Stayro brand system** — stayro.com design tokens (`#3A3739` charcoal, `#FF5B2E` orange, `#FAF6F5` warm off-white), Tajawal font, light/dark themes (dark default), slim centralized scrollbar
- 🏙️ **Real destinations** — five Saudi cities with genuine imagery and per-city property counts
- 🏨 **Stays catalog** — 12 demo listings of real Saudi hotel brands with stars, Booking-style ratings, SAR pricing and amenities
- 🔎 **Full search flow** — destination + reusable calendar date pickers + guests/rooms → results with sorting (recommended/price/rating)
- 🛏️ **Hotel detail + demo booking** — gallery, amenities, guest reviews, sticky booking card with nights/VAT(15%)/total breakdown and instant confirmation reference (`STY-XXXXXX`)
- 📞 Real Stayro contact channels (phones, emails, Instagram/TikTok/X) and Ministry of Tourism license badge
- 🔍 SEO — Next.js Metadata API, Open Graph, JSON-LD (`TravelAgency`), per-hotel metadata, sitemap & robots, static prerendering
- ♿ Accessibility — RTL-correct logical properties, aria labels, keyboard-focusable controls
- ⚡ Performance — static prerender, `next/font`, `next/image` with AVIF/WebP

## Notes

- The demo catalog (`src/data/`) is **demo data**: cities are real, hotel brands are real, but ratings, review counts, prices and guest testimonials are sample values for the preview build. Bookings are **client-side demos** (`STY-` references) until `backend/` is built — no payment is collected.
- The old Vite app was fully replaced; there is no `package-lock.json`/`bun.lock` — **pnpm only**.
