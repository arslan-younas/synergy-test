# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

This is a **Next.js App Router** marketing/landing page site built with TypeScript, Tailwind CSS, and Three.js.

### Routing & Layout

- `app/layout.tsx` — Root layout (fonts, global metadata)
- `app/page.tsx` — Single home page that composes all landing sections
- `app/globals.css` — Global Tailwind base styles

### Component Structure

All UI lives under `components/landing/`. The page is a vertical stack of section components, each self-contained:

- **`HeroSection`** — Top of page, primary CTA
- **`BuyerTourSection`** — The most complex component (~34KB). It has its own sub-components (`BuyerTourChat`, `BuyerTourHUD`, `BuyerTourRedesign`), constants (`buyerTour.constants.ts`), types (`buyerTour.types.ts`), and a CSS module (`BuyerTourSection.module.css`). This is the primary interactive feature.
- **`BackgroundCanvas`** — Three.js 3D scene used as an animated background; loaded lazily.
- Other sections: `NavBar`, `WedgeSection`, `ProblemSection`, `ProblemComparisonSection`, `HowItWorksSection`, `AILayerSection`, `BentoSection`, `MatrixSection`, `ShowcaseSection`, `TestimonialsSection`, `StatsStrip`, `PricingSection`, `FounderSection`, `CTASection`, `Marquee`, `ScrollProgress`

### Custom Hooks

- `hooks/useCountUp.ts` — Animates a number from 0 to a target value (used in stats/counters)
- `hooks/useScrollSpy.ts` — Tracks which section is in the viewport (used for nav highlighting and scroll-triggered animations)

### Styling

Tailwind CSS with utility classes. `components/landing/tw.ts` contains shared Tailwind class helpers. One CSS Module (`BuyerTourSection.module.css`) exists for complex animation sequences that are hard to express in Tailwind.

**Arbitrary values** — only use `[value]` syntax (e.g. `w-[347px]`, `text-[13px]`) when Tailwind has no built-in class that covers the need. Always check for the closest built-in class first (e.g. prefer `text-sm` over `text-[14px]`, `p-4` over `p-[16px]`). Arbitrary values are a last resort, not a default.

### Three.js

`BackgroundCanvas.tsx` integrates Three.js directly. It should be dynamically imported (`next/dynamic`) to avoid SSR issues, as Three.js requires browser globals.

### Path Aliases

`@/*` maps to the repo root — use `@/components/...`, `@/hooks/...` throughout.

### Image Domains

`next.config.ts` allows remote images from `images.unsplash.com` only.
