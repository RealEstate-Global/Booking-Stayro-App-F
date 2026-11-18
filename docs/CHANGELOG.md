# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.2.0] - 2026-11-18

### Added
- **Authentic stayro.com First Loading Splash (`InitialSplashLoader`)**: Vector stroke-drawing animation of the Stayro house-S mark (`viewBox="0 0 1920 1920"`), radiant brand glow, typography, and progress indicator.
- **Left-Side Floating Scroll-To-Top**: Spring-animated button anchored to `bottom-6 left-5`, automatically revealing after 400px of scrolling.
- **Tactile Toggle Micro-Interactions**: Spring physics animations for `ThemeToggle` (sun/moon rotate & scale) and `LanguageToggle` (character-flip transitions) via `motion/react`.
- **Root `vercel.json`**: Explicitly configured `rootDirectory: "frontend"` and `framework: "nextjs"` with security and immutable asset cache headers.

### Changed
- **Scrollbar Overhaul**: Completely removed top and bottom arrow stepper buttons (`::-webkit-scrollbar-button`) across WebKit/Blink browsers; adjusted track and thumb width to 7px with smooth theme transition.
- **Header Scroll Animation**: Transition duration accelerated from 300ms to 150ms with `transform-gpu` and `will-change-transform` for instant responsiveness when scrolling back to top.
- **Dependency Upgrades**:
  - `typescript` bumped from 5.9.3 to 6.0.3
  - `motion` bumped to 14.14.0
  - `next-themes` bumped to 0.4.6
  - `sonner` bumped to 2.0.8
  - `tailwind-merge` bumped to 3.7.0
  - `date-fns` bumped to 4.4.0
  - `react-day-picker` upgraded to 10.0.2 with complete `Calendar` component refactoring
  - GitHub Actions updated: `actions/checkout@v7`, `actions/labeler@v7`, `pnpm/action-setup@v6`, `actions/setup-node@v7`

### Removed
- **"Coming Soon" References**: Deleted `coming-soon-card.tsx` and all obsolete "قريباً" notices across the app.
- **Obsolete Dependabot Branches**: Cleaned up 6 stale PRs that targeted non-existent root lockfiles.

---

## [2.0.0] - 2026-11-18

### Changed
- **Converted legacy React + Vite SPA to Next.js 16 (App Router) + React 19 + TypeScript** in `frontend/`.
- **Rebranded to Stayro (ستيرو)** with Ministry of Tourism license (**73104535**), real contact channels, and socials (@StayroApp).
- **Full Stays Booking Experience**: Real Saudi cities, 12-property hotel catalog, search form with calendar date pickers, hotel detail with 15% VAT and `STY-XXXXXX` references.
