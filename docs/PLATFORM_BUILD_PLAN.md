# Platform Build + Claude Code Engineering Mastery

## Context

Converting the finalized HTML mockups into a production Next.js platform, while using this as a hands-on learning journey for Claude Code best practices. The user (Digixr co-founder) wants to learn the right way to harness AI-assisted engineering — not just get code written, but understand the craft.

A detailed `WEBSITE_BUILD_PLAN.md` and `tailwind.brand.config.ts` already exist in the repo. This plan focuses on Phase 1 (static conversion) with Claude Code learning woven into each step.

---

## The Claude Code Engineering Playbook

### Principle 1: CLAUDE.md is your project's brain

**What:** Create a `CLAUDE.md` at the project root. This is the single most impactful thing you can do with Claude Code. It persists across every conversation and tells Claude your project's rules, patterns, and preferences.

**What goes in it:**
- Tech stack and versions
- Project structure conventions
- Code style rules (naming, file organization)
- Build/test/lint commands
- Things Claude should NEVER do (e.g., "never use `any` type", "never add comments unless logic is non-obvious")
- Domain-specific context (Digixr's 4-pillar model, brand colors)

**Why it matters:** Without CLAUDE.md, every new conversation starts from zero. With it, Claude already knows your project.

**First action:** We create CLAUDE.md before writing any code.

### Principle 2: Plan before you build

**What:** Use `/plan` mode for any non-trivial task. Think of it as a design review before implementation.

**How to use it well:**
- Enter plan mode, describe what you want
- Claude explores the codebase, asks clarifying questions, proposes an approach
- You refine the plan through dialogue
- Only then approve and let Claude execute

**Anti-pattern:** Jumping straight to "build me X" without planning. You get code faster but spend more time fixing it.

### Principle 3: CLAUDE.md evolves with the project

**What:** After each significant milestone, update CLAUDE.md with new patterns, conventions, or learnings that emerged during implementation.

**Example:** After building the first component, you might add: "All section components follow the pattern: `SectionName.tsx` + `SectionName.module.css`. Client components use `'use client'` directive. Canvas animations go in `lib/canvas/`."

### Principle 4: Small, verifiable steps

**What:** Break work into steps you can verify in the browser before moving on. Don't build 5 components then check — build 1, verify, iterate, move on.

**Why:** Claude Code is excellent at fixing issues when you give it immediate, specific feedback ("the gradient is too bright", "the animation stutters on mobile"). It's worse at fixing 10 issues at once from a vague description.

### Principle 5: Use subagents for parallel work

**What:** When tasks are independent, Claude can launch multiple agents to work in parallel (e.g., one builds a component, another writes tests). Learn to recognize opportunities for parallelism.

### Principle 6: Commit early, commit often

**What:** Use `/commit` after each working milestone. Claude generates meaningful commit messages from the diff. This creates checkpoints you can roll back to.

**Why:** If a later step goes wrong, you have a clean state to return to. Without commits, you're flying without a net.

### Principle 7: Feedback is your superpower

**What:** The quality of Claude's output is directly proportional to the specificity of your feedback.

- Bad: "This doesn't look right"
- Good: "The section title font size is too large on mobile — should be 28px max. Also the gradient on the subtitle doesn't match the brand cyan #4CC9D0"

### Principle 8: Let Claude explore, then direct

**What:** For research/exploration tasks, use the Explore subagent. For targeted edits, be specific. Know when to let Claude roam vs. when to point it at a specific file and line.

---

## Implementation Plan

### Step 0: Foundation (CLAUDE.md + Project Scaffold)

**Learning focus:** Setting up CLAUDE.md, project initialization

**Actions:**
1. Create `CLAUDE.md` with:
   - Tech stack (from WEBSITE_BUILD_PLAN.md)
   - Project structure conventions
   - Code style rules
   - Build/test/lint commands
   - Brand context (colors, terminology)
   - Do's and don'ts

2. Scaffold Next.js 15 project:
   ```
   pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir
   ```

3. Configure Tailwind with brand tokens from `tailwind.brand.config.ts`

4. Set up folder structure:
   ```
   src/
     app/
       layout.tsx
       page.tsx
       globals.css
     components/
       layout/          # Navbar, Footer
       sections/        # Homepage sections
       ui/              # Reusable primitives
     lib/
       canvas/          # Canvas animation scripts
       utils.ts         # Shared utilities
   public/
     images/logo/       # Logo assets (move from image/)
   ```

5. Git commit: "Initialize Next.js 15 with brand design system"

**Your learning moment:** After this step, start a new Claude Code conversation. Notice how CLAUDE.md automatically gives Claude context about your project without you having to explain anything.

---

### Step 1: Layout Shell (Navbar + Footer)

**Learning focus:** Component extraction from mockup, server vs. client components

**Actions:**
1. Enter plan mode: describe "Extract navbar and footer from mockup into Next.js components"
2. Claude reads the mockup, identifies the HTML/CSS/JS for navbar and footer
3. Create `src/components/layout/Navbar.tsx` — client component (scroll-aware color interpolation)
4. Create `src/components/layout/Footer.tsx` — server component (static content)
5. Create `src/app/layout.tsx` — wraps all pages with navbar + footer
6. Wire up fonts (Plus Jakarta Sans, Inter, Outfit) via `next/font`
7. Verify in browser: navbar renders, footer renders, scroll behavior works
8. Git commit

**Your learning moment:** Understand when to use `'use client'` vs server components. Navbar needs client-side JS (scroll listener) so it's a client component. Footer is pure HTML — server component.

---

### Step 2: Hero Section (Canvas Animation)

**Learning focus:** Client components, canvas integration, ref handling in React

**Actions:**
1. Plan mode: "Convert hero section with agent network canvas animation"
2. Extract hero HTML → `src/components/sections/HeroSection.tsx` (client component)
3. Move canvas JS → `src/lib/canvas/agent-network.ts` (pure JS module)
4. Use `useRef` + `useEffect` for canvas lifecycle
5. Verify: animation runs, scroll transition works, CTAs scroll to sections
6. Git commit

**Your learning moment:** Canvas animations are vanilla JS — they don't need React. Extract them as pure functions that take a canvas element. React just mounts/unmounts them.

---

### Step 3: Services Section (Scroll-driven interactions)

**Learning focus:** CSS Modules for complex styles, intersection observer patterns

**Actions:**
1. Plan mode: "Convert services section with lifecycle bar and service cards"
2. `src/components/sections/ServicesSection.tsx`
3. Lifecycle bar as sub-component (scroll-activated)
4. Service cards with expand/collapse behavior
5. Verify: scroll-triggered reveals, lifecycle bar follows scroll, cards expand
6. Git commit

---

### Step 4: Blueprints Section (Tabs + Demo links)

**Learning focus:** State management, dynamic content rendering

**Actions:**
1. `src/components/sections/BlueprintsSection.tsx`
2. Tab switching logic
3. Blueprint card content (from mockup data)
4. Links to demo pages
5. Verify: tab switching, content renders, demo links work
6. Git commit

---

### Step 5: Purpose Section (Ripple Field Canvas)

**Learning focus:** Second canvas integration, animation isolation

**Actions:**
1. `src/components/sections/PurposeSection.tsx`
2. Ripple field canvas → `src/lib/canvas/ripple-field.ts`
3. Belief blocks (Vision/Mission/Intent) as sub-components
4. Verify: ripple animation, seed bloom, brand text renders
5. Git commit

---

### Step 6: Insights Teaser + Discovery/CTA Section

**Learning focus:** Complex interactive components, form handling

**Actions:**
1. `src/components/sections/InsightsTeaser.tsx`
2. `src/components/sections/DiscoverySection.tsx` — the guided discovery agent
3. Discovery flow logic → `src/lib/discovery-flow.ts`
4. Architecture templates data → `src/lib/data/architecture-templates.ts`
5. Verify: full discovery flow works (industry → challenge → proposal → lead form)
6. Git commit

---

### Step 7: Chat Widget

**Learning focus:** Portal rendering, fixed positioning in React

**Actions:**
1. `src/components/ChatWidget.tsx` (client component)
2. Portal mount for fixed positioning
3. Quick action responses (simulated)
4. Verify: toggle open/close, messages render, quick actions work
5. Git commit

---

### Step 8: Scroll Transitions + Polish

**Learning focus:** Performance optimization, scroll-driven background color

**Actions:**
1. Implement scroll-driven bg color interpolation (light hero → dark sections)
2. Section reveal animations (intersection observer)
3. Navbar color interpolation on scroll
4. Test on mobile viewport sizes
5. Performance audit (Lighthouse)
6. Git commit

---

### Step 9: Secondary Pages

**Learning focus:** Next.js routing, page composition

**Actions:**
1. `src/app/insights/page.tsx` — insights listing
2. `src/app/blueprint-demo/healthcare/page.tsx`
3. `src/app/blueprint-demo/education/page.tsx`
4. Verify: navigation between pages, shared layout works
5. Git commit

---

### Step 10: Deploy to Vercel

**Learning focus:** Deployment, environment setup

**Actions:**
1. Push to GitHub
2. Connect repo to Vercel
3. Configure domain
4. Verify: production build, all pages work, animations smooth
5. Git commit + tag: `v1.0.0-static`

---

## After Phase 1 (future phases, not in this plan)

- **Phase 2:** Wire discovery agent to Claude API via Vercel AI SDK
- **Phase 3:** Add Supabase + Prisma for lead storage
- **Phase 4:** Add Resend for email proposals
- **Phase 5:** Blueprint demos with real LLM agents

---

## Files to Create/Modify

**New files (Phase 1):**
- `CLAUDE.md` — project brain
- `src/app/layout.tsx`, `page.tsx`, `globals.css`
- `src/components/layout/Navbar.tsx`, `Footer.tsx`
- `src/components/sections/HeroSection.tsx`, `ServicesSection.tsx`, `BlueprintsSection.tsx`, `PurposeSection.tsx`, `InsightsTeaser.tsx`, `DiscoverySection.tsx`
- `src/components/ChatWidget.tsx`
- `src/lib/canvas/agent-network.ts`, `ripple-field.ts`
- `src/lib/discovery-flow.ts`
- `src/lib/data/architecture-templates.ts`
- `src/app/insights/page.tsx`
- `src/app/blueprint-demo/healthcare/page.tsx`, `education/page.tsx`

**Existing files referenced:**
- `mockups/services-section-mockup.html` — primary source for all components
- `mockups/insights.html` — insights page source
- `mockups/blueprint-demo-healthcare.html`, `blueprint-demo-education.html`
- `tailwind.brand.config.ts` — brand tokens
- `WEBSITE_BUILD_PLAN.md` — tech stack reference
- `BRAND_DESIGN_GUIDE.md` — design system reference
- `image/logo/` — logo assets (move to `public/images/logo/`)

---

## Verification

After each step:
1. `pnpm dev` — development server runs without errors
2. Browser check — visual parity with mockup
3. Console — no JS errors
4. Mobile — responsive behavior matches mockup

After Step 10:
1. `pnpm build` — production build succeeds
2. Lighthouse audit — 90+ performance
3. All pages accessible and functional
4. Vercel deployment live and accessible

---

## How to Work Through This Plan

For each step:
1. **Start a conversation** (or continue current one)
2. **Enter plan mode** (`/plan`) — describe the step
3. **Review the plan** Claude proposes — give feedback
4. **Approve and watch Claude implement** — intervene with specific feedback
5. **Verify in browser** — test the result
6. **Commit** (`/commit`) — checkpoint your progress
7. **Update CLAUDE.md** if new patterns emerged

This loop is the core of effective Claude Code engineering. The learning is in the loop, not in any single step.
