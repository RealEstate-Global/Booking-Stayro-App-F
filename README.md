<div align="center">

# ستيرو | Stayro — Saudi Stays Booking Platform

### لكل إقامة هناك قصة · Every Stay Has a Story

[![License: Ministry of Tourism](https://img.shields.io/badge/License-Ministry%20of%20Tourism%2073104535-FF5B2E?style=for-the-badge)](https://stayro.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![pnpm](https://img.shields.io/badge/pnpm-12-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io)

**[Official Reference: stayro.com](https://stayro.com)**

</div>

---

## 🇸🇦 Overview

**Stayro (ستيرو)** is a bilingual **Arabic (RTL default) / English (LTR)** luxury stays and accommodation booking platform tailored for the Kingdom of Saudi Arabia. Officially licensed by the **Ministry of Tourism (License No. 73104535)**, Stayro empowers travelers to discover, filter, and book premium hotels, serviced apartments, desert escapes, and chalets across Saudi destinations with transparent SAR pricing, authentic Saudi hospitality, and live simulated instant booking confirmations.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript 6**, and **Tailwind CSS**, the application delivers exceptional performance, fluid motion design, and cultural alignment.

---

## 🏛️ Architecture & Workspace Structure

```text
.
├── frontend/                     # Next.js 16 Application (App Router, Turbopack, pnpm)
│   ├── public/
│   │   ├── images/
│   │   │   ├── cities/           # High-resolution skyline photography (Riyadh, Makkah, Madinah, etc.)
│   │   │   ├── hotels/           # Curated hotel and suite imagery
│   │   │   └── stayro-hero.webp  # Ambient brand background texture
│   │   └── icon.svg              # Stayro vector favicon
│   └── src/
│       ├── app/                  # App Router: /, /hotels, /hotels/[slug], /about, /support, /privacy, /terms
│       ├── components/
│       │   ├── home/             # Hero, destinations, featured stays, why stayro, testimonials, CTA
│       │   ├── hotels/           # HotelCard with rating, amenities, and pricing breakdown
│       │   ├── layout/           # SiteHeader with fast 150ms transitions, SiteFooter with app badges
│       │   ├── pages/            # View components (HomeView, HotelsView, HotelDetailView, SupportView, etc.)
│       │   ├── shared/           # InitialSplashLoader, ScrollToTop, StaySearchForm, DatePickerField, StayroLogo
│       │   └── ui/               # shadcn/ui primitives customized for RTL and brand design tokens
│       ├── config/               # site.ts — brand constants, contacts, social links, license data
│       ├── data/                 # Catalog: cities.ts, hotels.ts (real Saudi hotel brands)
│       ├── i18n/                 # LanguageProvider, dictionaries (ar.ts source of truth, en.ts)
│       └── lib/                  # booking.ts (VAT 15%, night calculations, STY- references), utils.ts
├── backend/                      # Backend API specification & placeholder service
├── docs/                         # Architecture, security, performance, style, and changelog guides
├── vercel.json                   # Monorepo deployment routing and immutable caching headers
└── README.md                     # Project documentation
```

---

## ✨ Key Features & Capabilities

| Capability | Description |
| :--- | :--- |
| **Authentic First Splash** | Cloned stroke-drawing vector animation of the Stayro house-S mark from `stayro.com`, with radial glow, brand typography, and smooth unmount. |
| **Arrow-Free Sleek Scrollbar** | Custom 7px scrollbar with all stepper arrow buttons (`::-webkit-scrollbar-button`) completely hidden, seamless dark/light theme transitions. |
| **Bilingual RTL / LTR** | Native Arabic-first (RTL) experience with instantaneous toggle to English (LTR), persistent locale storage, and Tajawal typography. |
| **Spring Micro-Interactions** | Tactile tactile micro-interactions on theme and translation switches with spring physics via `motion/react`. |
| **Fast Responsive Header** | Hardware-accelerated header with 150ms collapse/expand transition from full-width to floating glass pill. |
| **Left-Side Scroll-To-Top** | Floating action button anchored to bottom-left with scroll threshold activation and spring entrance. |
| **Search & Discovery** | Reusable popover calendar date pickers, destination selection, guest counts, and dynamic sorting by price, rating, and recommendations. |
| **Hotel Detail & Booking** | Gallery views, amenity checklists, sticky reservation card with 15% VAT calculation and instant demo confirmation (`STY-XXXXXX`). |
| **Official Compliance** | Verified Ministry of Tourism License badge (**73104535**), real support phones, emails, and verified social links (`@StayroApp`). |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** `>= 20.9.0`
- **pnpm** `12.x` (`npm install -g pnpm`)

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/RealEstate-Global/Booking-Stayro-App-F.git
cd Booking-Stayro-App-F

# Navigate to frontend and install dependencies
cd frontend
pnpm install

# Start local development server with Turbopack
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ CLI Commands

| Command | Working Directory | Description |
| :--- | :--- | :--- |
| `pnpm dev` | `frontend/` | Launches Next.js dev server with Turbopack |
| `pnpm build` | `frontend/` | Builds production bundle and prerenders 23 static pages |
| `pnpm start` | `frontend/` | Runs production server on port 3000 |
| `pnpm lint` | `frontend/` | Executes ESLint 9 checks |
| `pnpm typecheck` | `frontend/` | Validates TypeScript types (`tsc --noEmit`) |

---

## 🌐 Official Contacts & Social Channels

* **Licensing:** Ministry of Tourism License No. `73104535`
* **Phones:** [+966 55 123 4471](tel:+966551234471) · [+966 546 546 480](tel:+966546546480)
* **Emails:** [Rakan@stayro.com](mailto:Rakan@stayro.com) · [Abdulrahman@stayro.com](mailto:Abdulrahman@stayro.com)
* **Instagram:** [@StayroApp](https://www.instagram.com/stayroapp/)
* **TikTok:** [@StayroApp](https://www.tiktok.com/@StayroApp)
* **X (Twitter):** [@StayroApp](https://x.com/StayroApp)
* **App Store:** [Stayro Business on App Store](https://apps.apple.com/sa/app/stayro-business/id6740650889)

---

## 📄 License & Intellectual Property

© 2026 **Stayro (ستيرو)**. All rights reserved. Platform licensed under the Ministry of Tourism, Kingdom of Saudi Arabia.
