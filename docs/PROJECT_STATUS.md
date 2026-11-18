# Stayro — Project Status Report

**Date:** November 2026
**Version:** 2.0.0
**Status:** ✅ Preview Ready (frontend) · ⏳ Backend pending

---

## 🎯 Project Overview

**Stayro (ستيرو)** is a bilingual (Arabic RTL / English LTR) stays-booking platform for Saudi Arabia, licensed by the Ministry of Tourism (License No. **73104535**). The frontend is a production-grade **Next.js 16 (App Router)** application with a complete search → listing → detail → demo-booking flow; the backend is a placeholder until the API is scaffolded.

- **Tagline:** لكل إقامة هناك قصة · Every stay has a story
- **Reference brand:** [stayro.com](https://stayro.com)
- **Tech Stack:** Next.js 16 (Turbopack), React 19, TypeScript 5.9, Tailwind CSS 3.4, pnpm 12, Radix primitives, Tajawal font

---

## ✅ Completed

### Platform
- ✅ Legacy Vite SPA fully replaced by the Next.js App Router app in `frontend/` (pnpm only — no npm/bun lockfiles)
- ✅ Routes: `/` (home), `/about`, `/hotels` (results), `/hotels/[slug]` (detail + demo booking), `/support` — all statically prerendered except the dynamic hotel detail search-param layer
- ✅ Bilingual `LanguageProvider` (typed ar/en dictionaries, persistent locale, `<html lang/dir>` sync)
- ✅ Dark (default, stayro.com look) + light themes; full-height hero; one centralized slim scrollbar
- ✅ Design tokens from stayro.com: charcoal `#3A3739`, Stayro orange `#FF5B2E`, off-white `#FAF6F5`

### Booking experience
- ✅ Real Saudi cities (Makkah, Madinah, Riyadh, Jeddah, Dammam) with genuine imagery
- ✅ 12-property demo catalog of real Saudi hotel brands (stars, ratings, SAR pricing, amenities)
- ✅ Search form: destination + reusable calendar date pickers + guests/rooms → `/hotels` with sorting
- ✅ Hotel detail: gallery, amenities, guest stories, sticky booking card with nights + 15% VAT breakdown and instant `STY-XXXXXX` demo reference

### Brand & compliance
- ✅ Ministry of Tourism license 73104535 in header/footer/FAQ
- ✅ Real contact channels: +966 55 123 4471, +966 546 546 480, Rakan@stayro.com, Abdulrahman@stayro.com
- ✅ Socials @StayroApp (Instagram / TikTok / X) + App Store badge

### Quality & CI
- ✅ `pnpm build` — 21 static pages, zero type errors
- ✅ `pnpm lint` (ESLint 9 flat config) — zero problems
- ✅ `pnpm typecheck` — clean
- ✅ CI rewritten for pnpm (`frontend/`, `--frozen-lockfile`); CodeQL + pnpm audit security workflow; dependabot targets `/frontend`
- ✅ SEO: per-route + per-hotel metadata, JSON-LD `TravelAgency`, `sitemap.xml` (static routes + all hotel slugs), `robots.txt`, Open Graph

---

## ⏳ Next Up

- **Backend API** (`backend/`) — inventory, availability, real bookings; `lib/booking.ts` defines the demo contract to swap
- Payments (mada / Visa / Mastercard / Apple Pay) in SAR
- Accounts, booking management, wishlist
- Host onboarding (Stayro Business)

---

## 📊 Metrics

| Metric | Value |
| ------ | ----- |
| Static routes | 21 pages |
| Hotels in demo catalog | 12 |
| Cities | 5 |
| i18n dictionaries | ar (source of truth) + en |
| UI primitives kept | 9 (only what the app uses) |
| Bundle strategy | AVIF/WebP images, static prerender, next/font |
