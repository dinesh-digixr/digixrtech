---
globs: src/components/**/*.tsx
---

# Component Rules

- Every component must match the mockup pixel-for-pixel. Read the corresponding section in `mockups/services-section-mockup.html` before writing any component.
- Use `'use client'` only when the component needs browser APIs (event listeners, canvas, refs, state). Server components by default.
- Component files use PascalCase: `HeroSection.tsx`, `ServicesSection.tsx`.
- Section components go in `src/components/sections/`. Layout components go in `src/components/layout/`. Reusable primitives go in `src/components/ui/`.
- No `any` type. No unnecessary comments. No console.log in production code.
- Do not add features, animations, or UI elements that aren't in the mockups.
- Do not refactor or "improve" mockup code — reproduce it faithfully in React/Next.js.

## Section Build Process
Before building any section component, systematically extract ALL behavior from the mockup HTML. Do not start writing JSX until all 7 categories have been identified:

1. **CSS** — Every class, property, media query, pseudo-element for the section
2. **Content** — All text, labels, data attributes, aria attributes
3. **Structure** — Full HTML hierarchy (element types, nesting, class names)
4. **Animations** — Canvas code, CSS transitions/keyframes, requestAnimationFrame loops
5. **Interactions** — Click handlers, hover effects, scroll observers, intersection observers
6. **Scroll effects** — Any scroll-driven behavior (background transitions, parallax, sticky elements, reveal animations)
7. **Cross-section effects** — Behavior that spans multiple sections (e.g., body background interpolation during hero scroll)

Missing any category leads to incomplete implementations that require rework.
