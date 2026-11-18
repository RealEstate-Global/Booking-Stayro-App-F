# Stayro — Style Guide

The visual language mirrors [stayro.com](https://stayro.com): warm charcoal surfaces, a single orange accent, generous rounded corners and soft shadows.

## Design tokens

Colors are defined as `R G B` triplets in `frontend/src/app/globals.css` (`:root` light, `.dark` dark) and consumed by Tailwind as `rgb(var(--token) / <alpha>)`, so every opacity utility works.

| Token | Light | Dark | Usage |
| ----- | ----- | ---- | ----- |
| `--background` | `250 246 245` (warm off-white) | `58 55 57` (charcoal) | Page background |
| `--foreground` | `38 34 34` | `250 246 245` | Primary text |
| `--primary` | `255 91 46` (`#FF5B2E`) | same | Brand accent: CTAs, badges, active states |
| `--card` / `--popover` | white-ish | raised charcoal | Surfaces |
| `--muted-foreground` | soft grey | soft cream | Secondary text |

- **Dark is the default** (like stayro.com); light is fully supported via `next-themes` (class strategy).
- Dark mode body carries the concrete-texture background (`stayro-hero.webp`, fixed, 50% overlay).

## Typography

- **Tajawal** via `next/font` — Arabic-first, weights 400–800.
- Scale: hero `clamp(2.75rem, 8vw, 7rem)` extrabold; section titles `text-3xl md:text-5xl` extrabold; body `text-base/relaxed`; micro-copy `text-[10px]`–`text-xs` muted.

## Layout & rhythm

- Max width `max-w-screen-xl` with `px-4 md:px-8` gutters.
- Section spacing `py-12 md:py-16`; cards `rounded-2xl/3xl` with `border-foreground/10` + `bg-card` + soft shadow.
- Radii scale: pills (`rounded-full`) for CTAs/badges, `rounded-2xl` for fields, `rounded-3xl` for panels/cards.

## Components & patterns

- **SectionBadge** — the orange eyebrow pill above every section heading.
- **HotelCard** — image with hover zoom, rating chip (top-end), amenity pills, price + "Book now" row.
- **StaySearchForm** — white/85 translucent pill bar; on mobile it stacks into a `grid-cols-2` card.
- **DatePickerField** — trigger row (icon + `d MMM` label) opening a locale-aware calendar popover.
- **Select** — rounded-xl items, no arrow buttons; the dropdown keeps the global slim scrollbar.
- **Buttons** — primary = orange pill with hover `bg-primary/90`; ghost = transparent with hover tint.

## Motion

- Entrance animations are SSR-safe CSS keyframes in `globals.css` (`animate-fade-rise`, `-late`, `-later`; float accents `animate-float-y/x`).
- The mobile menu sheet springs open via `motion/react` (stiffness 380 / damping 30) with staggered link slides.
- Hover language: card lift + image zoom, pill arrows nudging with direction-aware RTL classes.

## Iconography

`lucide-react` only, 4–5px strokes, sized `h-4 w-4` (inline) to `h-7 w-7` (feature tiles), orange or inherit.

## Direction rules

Never hardcode `left/right` in layouts — use `ps/pe`, `ms/me`, `start/end`, and `rtl:`/`ltr:` variants for directional glyphs (arrows, chevrons). This keeps one markup for both directions.
