# Stayro — Feature Set

A complete stays-booking experience, bilingual (Arabic RTL default / English LTR), licensed by the Ministry of Tourism (73104535).

## 🔎 Search & Discovery
- **Stay search bar** (`StaySearchForm`) — destination (5 real Saudi cities), check-in/check-out with **reusable calendar pickers** (`DatePickerField`, locale-aware react-day-picker), guests & rooms selects. Navigates to `/hotels?city=…&checkIn=…&checkOut=…&guests=…&rooms=…`.
- **Results page** — live summary bar (city, dates, party size, count) and sorting: Recommended, Price ↑ / ↓, Rating.
- **City strip** on the home page — real skyline photography with per-city property counts.

## 🏨 Stays Catalog (demo data)
- 12 properties of **real Saudi hotel brands** across Makkah, Madinah, Riyadh, Jeddah and Dammam.
- Stars, Booking-style rating (/10), review counts, SAR nightly pricing, amenity lists.
- Typed data layer (`src/data/hotels.ts`, `src/data/cities.ts`) — adding a stay requires no route changes.

## 🛏 Hotel Detail & Booking (`/hotels/[slug]`)
- Statically generated per hotel (`generateStaticParams`) with per-hotel metadata + Open Graph image.
- 1-up/2-thumbnail gallery, amenity grid with icons, guest stories.
- **Sticky booking card**: date pickers with min/max logic, guests/rooms, live breakdown — nights × rate, **15% VAT**, total in SAR — and instant demo confirmation with a `STY-XXXXXX` reference. No payment is collected (demo).

## 🌐 Bilingual & RTL
- Arabic (default, RTL) + English (LTR) with a typed dictionary (`ar.ts` is the source of truth, `en.ts` mirrors it).
- Persistent locale (localStorage `stayro-locale`), `<html lang/dir>` sync, logical CSS properties throughout.
- Arabic calendar/weekday formatting via date-fns locales.

## 🎨 Design System
- stayro.com tokens: charcoal `#3A3739`, Stayro orange `#FF5B2E`, warm off-white `#FAF6F5`; Tajawal font.
- Dark theme default (concrete-texture body), full light theme.
- Full-viewport home hero under a fixed glassy header; animated rounded mobile menu sheet.
- **One centralized slim scrollbar** (globals.css) — also restored inside Radix select dropdowns; no arrow buttons anywhere.

## 📄 Pages
| Route | Purpose |
| ----- | ------- |
| `/` | Full-height hero + search, cities, featured stays, why-Stayro, how-it-works, guest stories, CTA |
| `/about` | Story, license, values, CTA |
| `/hotels` | Search results with sorting |
| `/hotels/[slug]` | Hotel detail + demo booking |
| `/support` | Contact cards, message form, FAQ accordion |

## 🔍 SEO & Accessibility
- Metadata API per route + per hotel, JSON-LD `TravelAgency`, sitemap incl. hotel slugs, robots.
- Logical CSS properties, aria labels on all controls, keyboard-operable menus, pickers and accordion.
