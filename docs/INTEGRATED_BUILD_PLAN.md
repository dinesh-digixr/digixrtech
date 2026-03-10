# Integrated Build + Claude Code Learning Plan

## Overview

This plan merges `PLATFORM_BUILD_PLAN.md` (what to build) with `CLAUDE_CODE_LEARNING_PLAN.md` (how to learn Claude Code) into a single actionable reference. Each step pairs a build deliverable with Claude Code skills to practice.

## Current State (as of 2026-03-09)

### Completed
- [x] Step 0: CLAUDE.md, Next.js 15 scaffold, folder structure, dependencies
- [x] Step 1: Layout shell — Navbar, Footer, globals.css, fonts, `.claude/rules/components.md`
- [x] Step 2: Hero Section + Agent Network Canvas (desktop verified, mobile responsiveness deferred to Step 8)
- [x] Step 3: Services Section (lifecycle bar, service panels, offerings accordion, 4 canvas viz, river dividers)
- [x] Step 4: Clients + Blueprints Section (logo grid, tabbed blueprints, canvas viz, pipeline steps)
- [ ] Step 5: Purpose Section + Ripple Field Canvas
- [ ] Step 6: Insights Teaser + Discovery Section
- [ ] Step 7: Chat Widget
- [ ] Step 8: Scroll Transitions + Polish
- [ ] Step 9: Secondary Pages
- [ ] Step 10: Deploy

---

## Session Workflow (repeat for every step)

```
1. /plan          → Claude reads mockup section, proposes approach
2. Review plan    → Refine with specific feedback
3. Build          → Claude implements, you verify in browser
4. /commit        → Checkpoint progress
5. /clear         → Fresh context for next step
```

---

## Step 1: Complete Layout Shell

**Status:** Complete
**Sessions:** ~1

**Build:**
- Finish Navbar scroll behavior to match mockup pixel-for-pixel
- Finish Footer to match mockup
- Verify layout.tsx wraps pages correctly

**Claude Code skills:**
- `/plan` mode — read mockup, design approach, then implement
- `/commit` after verification

**Setup tasks:**
- Create `.claude/rules/components.md` with component conventions
- Update `.claude/settings.json` with auto-approve for safe commands

**Verify:** `pnpm dev` → Navbar renders, Footer renders, scroll behavior works

---

## Step 2: Hero Section + Agent Network Canvas

**Status:** Complete
**Sessions:** ~1-2

**Build:**
- `src/components/sections/HeroSection.tsx` — headline, subtext, CTAs, light background
- `src/lib/canvas/agent-network.ts` — extract canvas animation as pure JS module
- Mount canvas via `useRef` + `useEffect`, cleanup on unmount

**Note:** Mobile responsive sizing needs review — hero content is too large relative to canvas nodes on small screens. Fix in mockup first, then sync code. Deferred to Step 8.

**Claude Code skills:**
- **Explore subagents** — launch 2 in parallel:
  - Agent 1: Find Hero HTML/CSS in mockup
  - Agent 2: Find canvas JS behavior in mockup
- **`@` file references** — reference mockup sections directly

**Setup tasks:**
- Create `.claude/agents/mockup-checker.md` — custom agent to verify component vs mockup

**Verify:** Animation runs, scroll transition works, CTAs scroll to sections

---

## Step 3: Services Section

**Status:** Complete
**Sessions:** ~1-2

**Build:**
- `src/components/sections/ServicesSection.tsx` — lifecycle bar, service cards
- Service cards with expand/collapse behavior
- Intersection Observer scroll triggers

**Claude Code skills:**
- `/clear` between Hero and Services (fresh context)
- `/simplify` after building — review for unnecessary complexity

**Setup tasks:**
- Create `.claude/skills/brand-audit.md` — skill to verify brand consistency

**Verify:** Scroll-triggered reveals, lifecycle bar follows scroll, cards expand/collapse

---

## Step 4: Clients + Blueprints Section

**Status:** Complete
**Sessions:** ~1

**Build:**
- `src/components/sections/ClientsSection.tsx` — client logos row
- `src/components/sections/BlueprintsSection.tsx` — tabs, blueprint cards, demo links
- `src/lib/canvas/viz-blueprint.ts` — blueprint network visualization canvas

**Claude Code skills:**
- `/rewind` — practice recovery if something breaks
- **Parallel agents** for independent sub-tasks (tabs logic vs card content)

**Verify:** Tab switching works, content renders, demo links navigate correctly

---

## Step 5: Purpose Section + Ripple Field Canvas

**Status:** Not started
**Sessions:** ~1-2

**Build:**
- `src/components/sections/PurposeSection.tsx` — belief blocks (Vision/Mission/Intent)
- `src/lib/canvas/ripple-field.ts` — second canvas animation
- "Digixr. Digital Elixir." title with seed bloom animation

**Claude Code skills:**
- Create `.claude/rules/canvas.md` — canvas animation conventions

**Setup tasks:**
- Create `.claude/agents/perf-reviewer.md` — custom agent for performance review

**Verify:** Ripple animation runs, seed bloom works, brand text renders correctly

---

## Step 6: Insights Teaser + Discovery Section

**Status:** Not started
**Sessions:** ~2

**Build:**
- `src/components/sections/InsightsTeaser.tsx` — article cards
- `src/components/sections/DiscoverySection.tsx` — guided discovery agent flow
- `src/lib/discovery-flow.ts` — conversation logic
- `src/lib/data/architecture-templates.ts` — template data

**Claude Code skills:**
- `/compact` — long session, compact with focus directive
- `/rename` — name session for `/resume` later

**Setup tasks:**
- Create `.claude/agents/a11y-checker.md` — accessibility checker agent

**Verify:** Full discovery flow works (industry → challenge → proposal → lead form)

---

## Step 7: Chat Widget

**Status:** Not started
**Sessions:** ~1

**Build:**
- `src/components/ChatWidget.tsx` — floating chat, portal rendering, quick actions
- Toggle open/close, message rendering

**Claude Code skills:**
- Set up **hooks** — auto-format with Prettier after edits (PostToolUse hook)

**Setup tasks:**
- Create `.claude/rules/api.md` — API/security conventions for later phases

**Verify:** Toggle open/close, messages render, quick actions work

---

## Step 8: Scroll Transitions + Polish

**Status:** Not started
**Sessions:** ~1-2

**Build:**
- Scroll-driven background color interpolation (light #FAFCFD → dark #0a0a12)
- Section reveal animations via Intersection Observer
- Navbar color interpolation on scroll
- Mobile responsiveness pass

**Claude Code skills:**
- `/batch` for multi-file polish edits
- **Worktrees** — experiment with animation variants in isolation

**Setup tasks:**
- Add **Playwright MCP** server for visual testing

**Verify:** Smooth transitions, mobile responsive, Lighthouse 90+ performance

---

## Step 9: Secondary Pages

**Status:** Not started
**Sessions:** ~1

**Build:**
- `src/app/insights/page.tsx` — insights listing
- `src/app/blueprint-demo/healthcare/page.tsx`
- `src/app/blueprint-demo/education/page.tsx`

**Claude Code skills:**
- `/resume` — continue from previous session
- PR review workflow

**Verify:** Navigation between pages, shared layout works, content matches mockups

---

## Step 10: Deploy

**Status:** Not started
**Sessions:** ~1

**Build:**
- Push to GitHub
- Connect repo to Vercel
- Configure domain
- Tag `v1.0.0-static`

**Claude Code skills:**
- PR creation via Claude (`gh pr create`)
- Git integration workflow

**Setup tasks:**
- Add **Vercel MCP** server

**Verify:** Production build succeeds, all pages work, animations smooth, Lighthouse 90+

---

## Claude Code Setup Checklist

### Rules (create during build)
- [x] `.claude/rules/components.md` — component conventions (Step 1)
- [ ] `.claude/rules/canvas.md` — canvas animation conventions (Step 5)
- [ ] `.claude/rules/api.md` — API/security conventions (Step 7)

### Custom Agents (create during build)
- [ ] `.claude/agents/mockup-checker.md` — verify component vs mockup (Step 2)
- [ ] `.claude/agents/perf-reviewer.md` — performance review (Step 5)
- [ ] `.claude/agents/a11y-checker.md` — accessibility checker (Step 6)

### Custom Skills (create during build)
- [ ] `.claude/skills/check-mockup.md` — mockup fidelity check (Step 2)
- [ ] `.claude/skills/brand-audit.md` — brand consistency audit (Step 3)

### Hooks (set up during build)
- [ ] PostToolUse: Auto-format with Prettier after Edit/Write (Step 7)
- [ ] PreToolUse: Block force push (Step 7)
- [ ] Notification: Desktop notify when task completes (Step 7)

### MCP Servers (connect during build)
- [ ] Playwright — visual testing (Step 8)
- [ ] Vercel — deployment (Step 10)
- [ ] Supabase — database (Phase 2, future)
- [ ] Sentry — error tracking (Phase 3, future)

---

## Quick Reference

| Command | When |
|---------|------|
| `/plan` | Before each component |
| `/commit` | After each working milestone |
| `/clear` | Between unrelated tasks |
| `/rewind` | When something goes wrong |
| `/memory` | When Claude seems confused |
| `/compact "focus on [X]"` | When conversation gets long |
| `/rename "step-N-name"` | Name important sessions |
| `/resume` | Continue previous work |
| `/simplify` | After building components |

---

## Source Documents
- `docs/PLATFORM_BUILD_PLAN.md` — detailed build plan with code patterns
- `docs/CLAUDE_CODE_LEARNING_PLAN.md` — full Claude Code feature learning guide
- `CLAUDE.md` — project brain (auto-loaded every session)
