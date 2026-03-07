# Digixr Technologies — Website Build Plan
### Agentic AI Native Platform | Step-by-Step Implementation

---

## Tech Stack (Final)

```
Framework:       Next.js 15 (App Router, Server Components, Server Actions)
Runtime:         React 19
Language:        TypeScript 5.x
Styling:         Tailwind CSS v4 + CSS Modules (for complex animations)
Animation:       Framer Motion 11 + GSAP (ScrollTrigger) + Lenis (smooth scroll)
3D/WebGL:        Three.js / React Three Fiber (hero section)
AI SDK:          Vercel AI SDK 4.x
AI Model:        Anthropic Claude API (conversational agent)
CMS:             Sanity v3 (headless, for blog/case studies)
Database:        PostgreSQL (Neon) + Drizzle ORM
Vector DB:       Pinecone (for RAG / agent memory)
Auth:            NextAuth.js v5
Email:           Resend
Analytics:       PostHog
Deployment:      Vercel
Package Manager: pnpm
```

---

## Phase 0: Foundation & Design System
> *Interview: Brand identity, style preferences, content strategy*

### Step 0.1 — Project Scaffolding
- [ ] Initialize Next.js 15 project with TypeScript
- [ ] Configure Tailwind v4 with brand tokens (from `tailwind.brand.config.ts`)
- [ ] Set up Framer Motion + GSAP + Lenis
- [ ] Configure ESLint, Prettier, path aliases
- [ ] Set up folder structure (feature-based)

### Step 0.2 — Design System & Style Guide
- [ ] Create `style-guide.tsx` — living style guide page (`/style-guide`)
- [ ] Build atomic design tokens (colors, typography, spacing, shadows)
- [ ] Build base components:
  - Button (primary gradient, secondary outline, ghost)
  - Card (default, featured with gradient border, glass)
  - Badge / Tag
  - Input / Textarea
  - Section wrapper (with animation triggers)
  - Typography components (GradientHeading, etc.)
- [ ] Build animation primitives:
  - FadeUp, FadeIn, StaggerChildren
  - DataStreamEffect (horizontal lines flowing L→R, mirroring logo)
  - GradientPulse (subtle background animation)
  - ParallaxSection
  - MagneticButton (cursor-aware hover)
  - TextReveal (character-by-character with gradient)
- [ ] Dark mode implementation (system preference + toggle)

### Step 0.3 — Layout Components
- [ ] Navbar (glassmorphism, scroll-aware, mobile hamburger)
- [ ] Footer (gradient accent, newsletter CTA)
- [ ] Page transition wrapper (smooth route transitions)
- [ ] Smooth scroll setup (Lenis)
- [ ] Cursor follower (subtle gradient glow that follows mouse)

---

## Phase 1: Homepage — The First Impression
> *Interview: Hero messaging, services overview, social proof content*

### Step 1.1 — Hero Section (THE differentiator)
- [ ] **Option A**: 3D Particle Agent Network
  - Three.js particle system forming a neural network
  - Particles respond to mouse movement
  - Gradient colors (cyan → emerald) on particles and connections
  - Text overlay: Bold headline + subtext + CTA
  - Embedded mini agent chat that visitors can interact with
- [ ] **Option B**: Data-to-Intelligence Animation
  - Full-width animation: Raw data streams (left) → processing → intelligent output (right)
  - Mirrors the logo's visual story
  - Code/data fragments animate into structured insights
  - Text overlay with typewriter effect revealing the positioning statement
- [ ] **Option C**: Conversational Hero
  - Hero IS a conversation — visitor sees a live agent interaction
  - Split screen: left = brand message, right = live agent demo
  - Agent demonstrates capabilities in real-time

### Step 1.2 — Trusted By / Social Proof Bar
- [ ] Client logo carousel (infinite scroll, grayscale → color on hover)
- [ ] Or: "Powering X+ agent decisions daily" counter

### Step 1.3 — Services Overview
- [ ] Interactive service cards (4-6 services)
- [ ] Each card has: icon, title, short description, hover animation
- [ ] Hover: card expands slightly, shows a micro-demo or animation
- [ ] Staggered reveal on scroll

### Step 1.4 — "How We Work" / Agent Process
- [ ] Visual flow showing: Problem → Agent Design → Deployment → Outcomes
- [ ] Each step animates on scroll (GSAP ScrollTrigger)
- [ ] Interactive: clicking a step shows more detail
- [ ] Data stream animation connecting the steps

### Step 1.5 — Featured Case Studies
- [ ] 2-3 featured case studies in large cards
- [ ] Each shows: industry, challenge, outcome metric, tech stack badges
- [ ] Hover reveals brief summary
- [ ] CTA to full case study page

### Step 1.6 — AI Native Proof Section
- [ ] "We Don't Just Build Agents — We Are Built By Them"
- [ ] Live dashboard showing Digixr's own agent activity:
  - Tasks completed today
  - Lines of code reviewed
  - Meetings scheduled
  - Content pieces drafted
- [ ] Numbers animate counting up on scroll
- [ ] Subtle real-time pulse effect

### Step 1.7 — Thought Leadership Preview
- [ ] Latest 3 blog posts / insights
- [ ] AI-generated summary for each
- [ ] Category badges (Agentic AI, Strategy, Technical)

### Step 1.8 — CTA Section
- [ ] Full-width gradient background
- [ ] "Ready to go Agentic?" or similar
- [ ] Two CTAs: "Talk to Our Agent" + "Book a Consultation"

---

## Phase 2: Core Pages
> *Interview: Service details, company story, team info, career plans*

### Step 2.1 — About Page
- [ ] Company origin story with scroll-triggered timeline
- [ ] Mission/vision with animated typography
- [ ] Team section (if applicable)
- [ ] "Our Agent Philosophy" section
- [ ] Values/culture with icon animations

### Step 2.2 — Services Pages
- [ ] Service landing page (overview of all services)
- [ ] Individual service pages:
  - AI Agent Strategy & Consulting
  - Custom Agent Development
  - Agent Integration & Deployment
  - AgentOps & Monitoring
  - AI Training & Enablement
  - (others TBD in interview)
- [ ] Each page: hero + problem statement + solution approach + tech stack + case study + CTA
- [ ] Service-specific micro-animation on each page

### Step 2.3 — Case Studies Hub
- [ ] Filterable grid (industry, technology, outcome type)
- [ ] Card design: thumbnail + metrics + tags
- [ ] Individual case study template:
  - Challenge → Solution → Architecture Diagram → Results → Testimonial
  - Before/after visualizations
  - Tech stack badges

### Step 2.4 — Contact Page
- [ ] AI-powered form (adapts questions based on inquiry type)
- [ ] Calendar integration for booking
- [ ] Office location with map (if applicable)
- [ ] Response time indicator

---

## Phase 3: AI-Native Features (The Differentiators)
> *Interview: AI capabilities to showcase, agent personas, demo scope*

### Step 3.1 — Digixr AI Agent (Homepage & Global)
- [ ] Persistent chat widget (bottom-right, expandable)
- [ ] NOT a basic chatbot — a true agent that can:
  - Answer questions about Digixr services
  - Qualify leads through conversation
  - Book meetings (calendar integration)
  - Recommend relevant case studies/content
  - Navigate visitor to relevant pages
  - Remember returning visitors (cookie-based)
- [ ] Powered by Claude API + RAG (Pinecone for company knowledge)
- [ ] Agent has a name and personality (TBD in interview)
- [ ] Typing indicator with brand animation
- [ ] Graceful fallback if API is down

### Step 3.2 — Agent Playground
- [ ] Dedicated page: `/playground`
- [ ] 3-5 interactive demos visitors can try:
  - **Text Agent**: Summarize, analyze sentiment, generate content
  - **Code Agent**: Explain code, find bugs, suggest improvements
  - **Data Agent**: Upload CSV → get AI-generated insights
  - **Document Agent**: Upload PDF → ask questions (RAG demo)
  - **Strategy Agent**: Describe your business → get AI readiness assessment
- [ ] Rate-limited for anonymous users
- [ ] Each demo has clear CTA: "Want this for your business?"

### Step 3.3 — AI Maturity Assessment
- [ ] Interactive 10-15 question assessment
- [ ] Dynamic questions (next question depends on answers)
- [ ] AI-analyzed results with visual score
- [ ] Personalized recommendations
- [ ] Downloadable PDF report
- [ ] Auto-CTA to book consultation

### Step 3.4 — "Build Your Agent" Configurator
- [ ] Step-by-step wizard:
  1. Select use case (customer support, sales, ops, custom)
  2. Define requirements through conversation
  3. See AI-generated solution architecture (visual diagram)
  4. Get instant rough estimate
  5. Book consultation to refine
- [ ] Uses Claude API to generate architecture suggestions
- [ ] Visual output (not just text)

---

## Phase 4: Content & Blog Platform
> *Interview: Content pillars, publishing cadence, author profiles*

### Step 4.1 — Blog / Insights Hub
- [ ] Sanity CMS integration
- [ ] Category filtering (Agentic AI, Strategy, Technical, Industry)
- [ ] AI-generated summaries on each post
- [ ] Reading time + difficulty level
- [ ] Related content recommendations
- [ ] Newsletter signup

### Step 4.2 — Resource Library
- [ ] Whitepapers, guides, templates
- [ ] Gated content (email capture)
- [ ] AI-searchable: "Find resources about..."

---

## Phase 5: Animation & Experience Polish
> *Interview: Animation intensity preference, performance priorities*

### Step 5.1 — Signature Animations
- [ ] **Page transitions**: Smooth cross-fade with data stream overlay
- [ ] **Scroll reveals**: Staggered fade-up for content sections
- [ ] **Data stream background**: Subtle horizontal lines flowing across sections (logo motif)
- [ ] **Gradient mesh**: Animated background gradients on hero/CTA sections
- [ ] **Magnetic buttons**: CTAs that subtly pull toward cursor
- [ ] **Text reveal**: Headlines that reveal character by character with gradient color
- [ ] **Counter animations**: Numbers count up when scrolled into view
- [ ] **Card interactions**: 3D tilt on hover with light reflection
- [ ] **Cursor glow**: Subtle gradient glow follows cursor on dark sections
- [ ] **Loading experience**: Brand-animated skeleton screens (not boring gray)

### Step 5.2 — Micro-interactions
- [ ] Button hover: gradient shift + shadow expansion
- [ ] Link hover: underline grows from left with gradient color
- [ ] Nav item: subtle scale + color transition
- [ ] Form focus: input border animates to brand gradient
- [ ] Toast notifications: slide in with spring physics
- [ ] Agent chat: message bubbles animate in with spring

### Step 5.3 — Performance Optimization
- [ ] `prefers-reduced-motion` support
- [ ] Lazy load all heavy animations (Three.js, GSAP)
- [ ] Image optimization (Next.js Image + blur placeholders)
- [ ] Code splitting per route
- [ ] Target: Lighthouse 90+ on all metrics

---

## Phase 6: SEO, Analytics & Launch
> *Interview: Target keywords, analytics requirements, launch timeline*

### Step 6.1 — SEO Foundation
- [ ] Meta tags, Open Graph, Twitter cards per page
- [ ] Structured data (Organization, Service, Article schemas)
- [ ] Dynamic sitemap generation
- [ ] robots.txt configuration

### Step 6.2 — Analytics
- [ ] PostHog integration
- [ ] Custom events: agent interactions, playground usage, form submissions
- [ ] Conversion funnel tracking

### Step 6.3 — Launch Checklist
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness audit
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance audit (Core Web Vitals)
- [ ] Security review (rate limiting, CORS, CSP headers)
- [ ] Domain & DNS configuration
- [ ] SSL certificate
- [ ] Error monitoring (Sentry)

---

## Folder Structure (Proposed)

```
digixr-platform/
├── public/
│   ├── fonts/
│   ├── images/
│   ├── icons/
│   └── og/                          # Open Graph images
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (marketing)/             # Route group: public pages
│   │   │   ├── page.tsx             # Homepage
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   │   ├── page.tsx         # Services overview
│   │   │   │   └── [slug]/          # Individual service pages
│   │   │   ├── case-studies/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   ├── insights/            # Blog
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   ├── contact/
│   │   │   └── playground/          # AI demo playground
│   │   ├── (tools)/                 # Route group: AI tools
│   │   │   ├── assessment/          # AI maturity assessment
│   │   │   └── configurator/        # Build your agent wizard
│   │   ├── api/                     # API routes
│   │   │   ├── chat/                # Agent chat endpoint
│   │   │   ├── playground/          # Playground API
│   │   │   └── assessment/          # Assessment API
│   │   ├── style-guide/             # Living style guide
│   │   ├── layout.tsx               # Root layout
│   │   └── globals.css              # Global styles + Tailwind
│   ├── components/
│   │   ├── ui/                      # Base UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── layout/                  # Layout components
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── section.tsx
│   │   │   └── page-transition.tsx
│   │   ├── animations/              # Animation components
│   │   │   ├── fade-up.tsx
│   │   │   ├── text-reveal.tsx
│   │   │   ├── data-stream.tsx
│   │   │   ├── gradient-pulse.tsx
│   │   │   ├── magnetic-button.tsx
│   │   │   ├── counter.tsx
│   │   │   ├── cursor-glow.tsx
│   │   │   └── parallax.tsx
│   │   ├── sections/                # Homepage sections
│   │   │   ├── hero.tsx
│   │   │   ├── services-overview.tsx
│   │   │   ├── case-studies.tsx
│   │   │   ├── agent-proof.tsx
│   │   │   ├── how-we-work.tsx
│   │   │   └── cta-section.tsx
│   │   ├── agent/                   # AI Agent components
│   │   │   ├── agent-chat.tsx
│   │   │   ├── agent-bubble.tsx
│   │   │   ├── agent-avatar.tsx
│   │   │   └── agent-widget.tsx
│   │   └── three/                   # Three.js components
│   │       ├── particle-network.tsx
│   │       └── hero-scene.tsx
│   ├── lib/                         # Utilities & config
│   │   ├── ai/                      # AI integration
│   │   │   ├── agent.ts
│   │   │   ├── rag.ts
│   │   │   └── prompts.ts
│   │   ├── sanity/                  # CMS client
│   │   ├── db/                      # Database (Drizzle)
│   │   ├── utils.ts
│   │   └── constants.ts
│   ├── hooks/                       # Custom React hooks
│   │   ├── use-scroll-animation.ts
│   │   ├── use-smooth-scroll.ts
│   │   └── use-media-query.ts
│   ├── styles/                      # Additional styles
│   │   ├── animations.css
│   │   └── three-scene.css
│   └── types/                       # TypeScript types
├── sanity/                          # Sanity CMS schemas
├── tailwind.brand.config.ts         # Brand tokens (already created)
├── tailwind.config.ts               # Main Tailwind config
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Interview Checkpoints

The build will proceed through interviews at each phase:

| # | Interview Topic | Decisions Needed |
|---|----------------|-----------------|
| 1 | **Brand & Identity** | Tagline, positioning statement, brand adjectives, tone of voice |
| 2 | **Hero Section** | Which hero concept (A/B/C), headline copy, primary CTA |
| 3 | **Services** | Service list, naming, descriptions, unique value per service |
| 4 | **Content & Social Proof** | Client logos, testimonials, case studies (even internal ones) |
| 5 | **AI Agent Persona** | Agent name, personality, capabilities, conversation style |
| 6 | **Playground Scope** | Which demos to include, rate limits, CTA strategy |
| 7 | **Pages & Navigation** | Final page list, navigation structure, priority order |
| 8 | **Animation Preferences** | Intensity level, must-have vs nice-to-have animations |
| 9 | **Content Strategy** | Blog topics, publishing cadence, authors |
| 10 | **Launch & Growth** | Domain, timeline, analytics goals, post-launch priorities |

---

*Plan created March 2026. To be refined through step-by-step interviews.*
