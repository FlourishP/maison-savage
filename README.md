# MAISON SAVAGE — The Savage Haute Couture

A dark, opulent luxury fashion e-commerce web app. Hand-rendered animal-print textures, glassmorphism navigation, a live shopping bag and a concierge signup — built as a single-page experience with Next.js App Router.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS v4 (custom `@theme` tokens + `@utility` classes)
- **Motion:** Framer Motion (`motion` + `AnimatePresence`)
- **Icons:** Lucide React
- **Fonts:** Cormorant Garamond (serif) + Jost (sans) via `next/font`
- **Imagery:** Unsplash (remote, via `next/image`) + local deterministic SVG macro close-ups (`/public/textures`, rendered via plain `<img>`)
- **State:** React Context with `localStorage` persistence
- **Testing:** Playwright (Chromium, desktop + mobile) + Chrome DevTools MCP / Lighthouse

## Prerequisites

- Node.js 20+ (developed against v24.13.1)
- npm

## Installation

```bash
npm install
npx playwright install chromium   # only needed to run the E2E suite
```

## Environment Variables

No environment variables are required. Image origin (`images.unsplash.com`) is allow-listed in `next.config.ts`.

## Usage

```bash
npm run dev        # development server on http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
npx playwright test  # E2E suite (desktop + mobile, 13 tests)
```

The production build is fully static for the `/` route.

## Features

- Glassmorphism fixed header with scroll-state transitions, live cart badge and category nav
- Full-screen hero carousel — autoplay, keyboard arrows, manual controls, progress bars, pause/play
- Typed product catalog (22 objects) with category filter tabs and animated grid reordering
- Quick View modal — gallery thumbnails, size selection, material notes, wishlist, add to bag
- Slide-over shopping bag — quantity controls, live subtotal, line-item removal, empty state
- Full-screen search overlay with live result filtering
- Concierge newsletter with client-side email validation and success/error states
- The Atelier section with brand statistics and craft copy
- Multi-column luxury footer
- Signature animal-print SVG textures (cheetah rosette, leopard spot, python scale, zebra stripe, jaguar) rendered tone-on-tone via Tailwind v4 `@utility` classes, with `border-[#D4AF37]/30` etched-gold borders on product cards and section dividers
- Hover a product to reveal a macro close-up of its exact animal print, matched per product (`hoverImage`) and captioned `{print} · Macro`
- Centered glassmorphism brand lock-up via a 3-column `grid-cols-3` header (nav left, brand center, actions right) that stays centered at every breakpoint
- Fully responsive: 1-col (mobile) → 2-col (tablet) → 3/4-col (desktop); accessible focus/keyboard handling and ≥24px touch targets (a11y 100, desktop + mobile)

## API Reference

No public API endpoints. All data is bundled in `src/data/products.ts`.

## Testing

- `tests/e2e/desktop.spec.ts` — section render, hero navigation, category filtering, quick view, cart merge/quantity/remove, wishlist, search, concierge validation
- `tests/e2e/mobile.spec.ts` — no horizontal overflow, mobile menu navigation, hero, quick view add-to-bag, concierge

Lighthouse: Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100 on both desktop and mobile — 0 failing audits.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Run `npm run lint` and `npm run build` before opening a PR.
4. Add or update Playwright specs for behavior changes.

## License

Private — © 2026 MAISON SAVAGE. All rights reserved.