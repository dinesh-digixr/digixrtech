# Digixr Technologies Platform

## Project Overview
Company website for Digixr Technologies — an AI services company specializing in Agentic AI, ERP, and Next-gen App Services. Based in Coimbatore, India.

## Tech Stack
- **Framework:** Next.js 15 (App Router, Server Components)
- **Runtime:** React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + CSS Modules (for complex animations)
- **Package Manager:** pnpm
- **Deployment:** Vercel

## Brand Identity
- **Name:** Always "Digixr" or "DIGIXR" — never "DIGI×R" or "DigixR"
- **Meaning:** Digixr = Digital Elixir
- **Tagline:** "Empowering Businesses with AI Powered Innovation"
- **4-pillar lifecycle:** Context → Build → Secure → Assure
- For colors, gradients, and typography → see `BRAND_DESIGN_GUIDE.md`

## Commands
```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # ESLint check
```

## Code Conventions
- Canvas animations: extract as pure TS modules in `lib/canvas/`, init returns cleanup function, mount via `useRef` + `useEffect`
- No console.log in production code (except discovery flow lead capture placeholder)
- For component rules (naming, `'use client'`, file locations) and **section build process** → see `.claude/rules/components.md`

## Design Rules
- Light hero (#FAFCFD) → dark sections (#0a0a12) via scroll-driven bg interpolation
- No overlays — body bg-color driven directly by JS
- Glassmorphism cards with backdrop-filter blur
- Section headers: label (uppercase, teal) + title (gradient accent) + subtitle
- Navbar: color interpolated with scroll (dark text on light, light text on dark)
- Footer: symbol logo + "DIGIXR" / "TECHNOLOGIES" text (not full logo PNG)
- Mobile-first responsive design

## Source of Truth
- `mockups/services-section-mockup.html` — homepage mockup (all sections)
- `mockups/insights.html` — insights listing page
- `mockups/blueprint-demo-healthcare.html` — healthcare demo
- `mockups/blueprint-demo-education.html` — education demo
- `BRAND_DESIGN_GUIDE.md` — complete brand design system
- `tailwind.brand.config.ts` — Tailwind brand tokens
- `.claude/rules/components.md` — component coding rules

## Important
- The mockups are the visual source of truth. Match pixel-for-pixel.
- Do not add features, animations, or UI elements that aren't in the mockups.
- When in doubt, read the mockup HTML/CSS.
