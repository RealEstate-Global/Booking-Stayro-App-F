# Stayro — Feature Set

A comprehensive Saudi stays booking experience, bilingual (Arabic RTL default / English LTR), officially licensed by the Ministry of Tourism (73104535).

---

## 🎬 Brand Entrance & Animations
- **Authentic Splash Screen (`InitialSplashLoader`)**: Cloned directly from `stayro.com` featuring the vector stroke-drawing animation of the Stayro house-S mark (`viewBox="0 0 1920 1920"`), glowing radial gradient, brand typography, and smooth unmount.
- **Cinematic Hero Reveal**: Hero background skyline transitions from `grayscale(60%) brightness(0.2) blur(8px)` to direct clarity with natural illumination.
- **Micro-Interactions**: Spring-physics character transitions on theme and translation switches via `motion/react`.
- **Fast Header Transitions**: 150ms hardware-accelerated collapse from full-width to floating glass pill.
- **Left-Side Scroll-To-Top**: Floating action button anchored to bottom-left with scroll threshold activation and spring entrance.

---

## 🔎 Search & Discovery
- **Stay Search Form (`StaySearchForm`)**: Destination selector across 6 Saudi destinations, check-in and check-out reusable calendar popovers (`DatePickerField` using `react-day-picker` v10), and guest/room counts.
- **Search Results (`/hotels`)**: Dynamic summary bar, property counter, and sorting by Recommended, Price (Ascending/Descending), and Guest Rating.
- **Curated City Strips**: Authentic skyline imagery and destination cards for Riyadh, Makkah, Madinah, Jeddah, Dammam, and AlUla.

---

## 🏨 Stays Catalog & Details (`/hotels/[slug]`)
- **Rich Hotel Profiles**: 12 verified listings representing Saudi hotel hospitality.
- **Interactive Details**: Multi-angle image galleries, categorized amenity icons, verified guest stories.
- **Sticky Reservation Card**: Dynamic stay duration calculation, base price × nights breakdown, **15% Saudi VAT**, and instant demo reservation confirmation with `STY-XXXXXX` reference.

---

## 🎨 Design System & Scrollbar
- **Design Tokens**: Warm charcoal `#3A3739`, Stayro orange `#FF5B2E`, off-white `#FAF6F5`, and Tajawal font.
- **Arrow-Free Scrollbar**: Custom 7px scrollbar with all top and bottom stepper arrows (`::-webkit-scrollbar-button`) completely removed.
- **Smooth Theme Transitions**: Buttery smooth background and text transitions on dark/light switch.
- **Accessibility**: ARIA labels, semantic landmark elements, keyboard navigation, and logical CSS properties (`start`, `end`, `ms`, `me`).

---

## 🌐 Localization & Cultural Alignment
- **Native Arabic-First**: Arabic RTL default with instant one-click toggle to English LTR.
- **Culturally Resonant Microcopy**: Authentic Saudi hospitality phrasing and official Ministry licensing notices.
- **Saudi Riyal Component (`<SaudiRiyalSymbol />`)**: Mask-based scalable Saudi Riyal currency symbol.
