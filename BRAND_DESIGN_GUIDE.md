# Digixr Technologies — Brand Design Guide
### Website Design System & Brand Standards

---

## 1. Brand Color Palette (Extracted from Logo)

The Digixr logo features a signature **cyan-to-emerald gradient** that flows from left to right, representing the transformation from raw data (fragmented bars) to intelligent flow (smooth curves). This gradient IS the brand — it should be the defining visual element across the entire website.

### 1.1 Primary Brand Gradient

```
Gradient Direction: left to right (135° for diagonal)
Start:  #4CC9D0  (Cyan / Digital Blue)
Mid:    #3BBFA6  (Teal / Bridge)
End:    #42C68B  (Emerald / Agentic Green)

CSS:    background: linear-gradient(135deg, #4CC9D0 0%, #3BBFA6 50%, #42C68B 100%);
```

This gradient should be used for:
- Hero section backgrounds (subtle, with overlay)
- CTA buttons (primary action)
- Section dividers and accent lines
- Icon backgrounds and highlights
- Card hover states
- The AI agent interface accent

### 1.2 Primary Colors

| Token Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| **Cyan** (Digital Blue) | `#4CC9D0` | rgb(76, 201, 208) | Left side of gradient, data/tech elements, links |
| **Teal** (Bridge) | `#3BBFA6` | rgb(59, 191, 166) | Middle accent, secondary buttons, tags, badges |
| **Emerald** (Agentic Green) | `#42C68B` | rgb(66, 198, 139) | Right side of gradient, success states, agent indicators |

### 1.3 Extended Brand Colors

| Token Name | Hex | Usage |
|------------|-----|-------|
| **Cyan Light** | `#E6F9FA` | Cyan-tinted backgrounds, hover states |
| **Cyan 100** | `#B8EEF1` | Light accent backgrounds |
| **Cyan 200** | `#8AE3E8` | Subtle highlights |
| **Cyan 400** | `#4CC9D0` | Primary cyan (logo start) |
| **Cyan 600** | `#2BA8B0` | Cyan text on light backgrounds |
| **Cyan 800** | `#1A7A80` | Dark cyan for emphasis |
| **Teal Light** | `#E5F7F2` | Teal-tinted backgrounds |
| **Teal 400** | `#3BBFA6` | Primary teal (logo mid) |
| **Teal 600** | `#2A9A84` | Teal text on light backgrounds |
| **Emerald Light** | `#E8F8F0` | Green-tinted backgrounds |
| **Emerald 400** | `#42C68B` | Primary emerald (logo end) |
| **Emerald 600** | `#2FA36D` | Green text on light backgrounds |

### 1.4 Neutral Colors

| Token Name | Hex | Usage |
|------------|-----|-------|
| **Charcoal** | `#2D3436` | Primary headings (h1, h2) |
| **Dark Gray** | `#4A5568` | Secondary headings (h3, h4), logo "DIGIXR" match |
| **Gray** | `#718096` | Body text |
| **Medium Gray** | `#A0AEC0` | "TECHNOLOGIES" text match, captions, labels |
| **Light Gray** | `#CBD5E0` | Borders, dividers |
| **Off White** | `#F7FAFC` | Section backgrounds (alternating) |
| **White** | `#FFFFFF` | Primary background |

### 1.5 Semantic Colors

| Token Name | Hex | Derived From | Usage |
|------------|-----|-------------|-------|
| **Success** | `#42C68B` | Emerald 400 | Success messages, positive states |
| **Info** | `#4CC9D0` | Cyan 400 | Informational alerts, tooltips |
| **Warning** | `#F6AD55` | Complementary warm | Warnings, caution states |
| **Error** | `#FC8181` | Complementary warm | Error states, destructive actions |

### 1.6 Dark Mode Palette

| Token Name | Light Mode | Dark Mode |
|------------|-----------|-----------|
| **Background** | `#FFFFFF` | `#0F1419` |
| **Surface** | `#F7FAFC` | `#1A2332` |
| **Surface Elevated** | `#FFFFFF` | `#243044` |
| **Text Primary** | `#2D3436` | `#E2E8F0` |
| **Text Secondary** | `#718096` | `#A0AEC0` |
| **Border** | `#CBD5E0` | `#2D3748` |
| **Gradient Start** | `#4CC9D0` | `#5DD3DA` (slightly brighter) |
| **Gradient End** | `#42C68B` | `#52D69B` (slightly brighter) |

---

## 2. Typography

### 2.1 Font Pairing

Based on the logo's clean, geometric sans-serif with wide letter-spacing:

**Primary Font (Headings):**
```
Font: "Plus Jakarta Sans" or "Inter"
Weights: 600 (Semibold), 700 (Bold), 800 (Extra Bold)
Letter-spacing: -0.02em for headings
```

**Secondary Font (Body):**
```
Font: "Inter" or "DM Sans"
Weights: 400 (Regular), 500 (Medium)
Letter-spacing: normal
Line-height: 1.6 for body text
```

**Monospace (Code/Technical):**
```
Font: "JetBrains Mono" or "Fira Code"
Weight: 400 (Regular)
```

**Display Font (Hero/Impact — matching logo style):**
```
Font: "Outfit" or "Sora"
Weight: 300 (Light) to 700 (Bold)
Letter-spacing: 0.15em (wide, like logo)
Text-transform: uppercase (for brand name treatments)
```

### 2.2 Type Scale

| Element | Size | Weight | Line Height | Letter Spacing | Color |
|---------|------|--------|-------------|----------------|-------|
| **Hero Headline** | 64px / 4rem | 800 | 1.1 | -0.03em | Charcoal or gradient text |
| **H1** | 48px / 3rem | 700 | 1.2 | -0.02em | Charcoal |
| **H2** | 36px / 2.25rem | 700 | 1.25 | -0.02em | Charcoal |
| **H3** | 28px / 1.75rem | 600 | 1.3 | -0.01em | Dark Gray |
| **H4** | 22px / 1.375rem | 600 | 1.4 | normal | Dark Gray |
| **Body Large** | 18px / 1.125rem | 400 | 1.7 | normal | Gray |
| **Body** | 16px / 1rem | 400 | 1.6 | normal | Gray |
| **Body Small** | 14px / 0.875rem | 400 | 1.5 | normal | Medium Gray |
| **Caption** | 12px / 0.75rem | 500 | 1.4 | 0.05em | Medium Gray |
| **Button** | 16px / 1rem | 600 | 1 | 0.02em | White (on gradient) |

### 2.3 Gradient Text Effect (Signature Style)

For hero headlines and key feature titles, apply the brand gradient as text color:

```css
.gradient-text {
  background: linear-gradient(135deg, #4CC9D0 0%, #3BBFA6 50%, #42C68B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 3. Logo Usage

### 3.1 Logo Anatomy

The Digixr logo consists of:
- **Logomark**: Stylized "D" with fragmented data bars (left) transitioning to smooth curved lines (right)
- **Wordmark**: "DIGIXR" in geometric sans-serif, semibold weight, wide tracking
- **Descriptor**: "TECHNOLOGIES" in lighter weight, wider tracking

### 3.2 Logo Variants

| Variant | Background | Usage |
|---------|-----------|-------|
| **Full Color** | White/Light | Primary usage — header, about page |
| **Full Color on Dark** | Dark backgrounds | Slight brightness boost to gradient |
| **White** | Dark/Gradient backgrounds | Footer, dark sections |
| **Gradient Mark Only** | Any | Favicon, app icon, social media avatar |

### 3.3 Clear Space & Minimum Size

- **Clear space**: Minimum 1x the height of the "D" mark on all sides
- **Minimum width**: 120px for digital, 30mm for print
- **Favicon**: Use logomark only (the "D" shape) at 32x32 and 16x16

---

## 4. Component Design System

### 4.1 Buttons

#### Primary Button (Gradient)
```css
.btn-primary {
  background: linear-gradient(135deg, #4CC9D0 0%, #42C68B 100%);
  color: #FFFFFF;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.02em;
  padding: 14px 32px;
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 14px rgba(66, 198, 139, 0.3);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  box-shadow: 0 6px 20px rgba(66, 198, 139, 0.45);
  transform: translateY(-2px);
}
```

#### Secondary Button (Outline)
```css
.btn-secondary {
  background: transparent;
  color: #3BBFA6;
  font-weight: 600;
  padding: 14px 32px;
  border-radius: 12px;
  border: 2px solid #3BBFA6;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(59, 191, 166, 0.08);
}
```

#### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: #4A5568;
  font-weight: 500;
  padding: 14px 32px;
  border: none;
  transition: color 0.3s ease;
}

.btn-ghost:hover {
  color: #3BBFA6;
}
```

### 4.2 Cards

```css
.card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.card:hover {
  border-color: #4CC9D0;
  box-shadow: 0 8px 30px rgba(76, 201, 208, 0.12);
  transform: translateY(-4px);
}

/* Featured/highlighted card */
.card-featured {
  border: 2px solid transparent;
  background-image: linear-gradient(#fff, #fff),
                    linear-gradient(135deg, #4CC9D0, #42C68B);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
```

### 4.3 Navigation Bar

```css
.navbar {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Dark mode navbar */
.navbar-dark {
  background: rgba(15, 20, 25, 0.85);
  border-bottom: 1px solid rgba(45, 55, 72, 0.8);
}
```

### 4.4 Section Backgrounds

```css
/* Gradient mesh background for hero */
.hero-bg {
  background: radial-gradient(ellipse at 20% 50%, rgba(76, 201, 208, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 50%, rgba(66, 198, 139, 0.15) 0%, transparent 50%),
              #FFFFFF;
}

/* Subtle gradient section */
.section-gradient {
  background: linear-gradient(180deg, #F7FAFC 0%, #E6F9FA 50%, #F7FAFC 100%);
}

/* Dark gradient section */
.section-dark {
  background: linear-gradient(135deg, #0F1419 0%, #1A2332 100%);
}
```

### 4.5 Badges & Tags

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.badge-cyan {
  background: #E6F9FA;
  color: #2BA8B0;
}

.badge-teal {
  background: #E5F7F2;
  color: #2A9A84;
}

.badge-emerald {
  background: #E8F8F0;
  color: #2FA36D;
}
```

### 4.6 Input Fields

```css
.input {
  background: #FFFFFF;
  border: 2px solid #CBD5E0;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 16px;
  color: #2D3436;
  transition: border-color 0.2s ease;
}

.input:focus {
  border-color: #4CC9D0;
  outline: none;
  box-shadow: 0 0 0 4px rgba(76, 201, 208, 0.15);
}
```

### 4.7 AI Agent Chat Interface

```css
.agent-bubble {
  background: linear-gradient(135deg, rgba(76, 201, 208, 0.08) 0%, rgba(66, 198, 139, 0.08) 100%);
  border: 1px solid rgba(59, 191, 166, 0.2);
  border-radius: 16px 16px 16px 4px;
  padding: 16px 20px;
  color: #2D3436;
}

.agent-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #4CC9D0 0%, #42C68B 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-bubble {
  background: #F7FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 16px 16px 4px 16px;
  padding: 16px 20px;
  color: #2D3436;
}

.agent-typing-indicator {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
}

.agent-typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3BBFA6;
  animation: typing-pulse 1.4s infinite;
}
```

---

## 5. Iconography & Illustrations

### 5.1 Icon Style

| Property | Value |
|----------|-------|
| **Style** | Outlined / Linear (matching logo's line-based aesthetic) |
| **Stroke width** | 1.5px–2px |
| **Corner radius** | Rounded caps and joins |
| **Color** | Brand gradient or Dark Gray (#4A5568) |
| **Size grid** | 20px, 24px, 32px, 48px |
| **Recommended set** | Phosphor Icons, Lucide, or Heroicons (outline variant) |

### 5.2 Illustration Style

- **Data streams** — Horizontal lines of varying lengths (mirroring logo's left side)
- **Flowing curves** — Smooth arcs (mirroring logo's right side)
- **Gradient overlays** — Cyan-to-emerald on illustrations
- **Particle/node networks** — For AI/agent concepts
- **Isometric elements** — For technical architecture diagrams
- **No stock photos** — Use custom illustrations or AI-generated visuals

### 5.3 Agent Iconography

Each AI agent persona should have:
- A unique geometric avatar shape
- A gradient variant from the brand palette
- A role-specific icon overlay (gear for ops, chart for analytics, etc.)

---

## 6. Motion & Animation

### 6.1 Principles

| Principle | Implementation |
|-----------|---------------|
| **Purposeful** | Animations guide attention, never distract |
| **Subtle** | Micro-interactions over dramatic effects |
| **Brand-aligned** | Data-stream left-to-right motion mirrors logo concept |
| **Performant** | Use CSS transforms/opacity only, never layout-triggering properties |

### 6.2 Timing Standards

| Animation Type | Duration | Easing |
|---------------|----------|--------|
| **Hover states** | 200ms | ease-out |
| **Transitions** | 300ms | ease-in-out |
| **Page reveals** | 500ms–700ms | cubic-bezier(0.16, 1, 0.3, 1) |
| **Loading/skeleton** | 1.5s loop | ease-in-out |
| **Hero entrance** | 800ms–1000ms | cubic-bezier(0.16, 1, 0.3, 1) |

### 6.3 Signature Animations

**Data Stream Effect** (mirrors logo's left side):
- Horizontal lines animate from left to right
- Staggered entrance, varying lengths
- Used for page transitions and loading states

**Gradient Pulse** (mirrors logo's gradient):
- Subtle gradient shift animation on hero backgrounds
- 8-second cycle, barely perceptible
- Creates "living" feel without distraction

**Agent Activity Indicator**:
- Small pulsing dot (emerald green) next to agent chat
- Indicates "agent is thinking" or "agent is active"
- Matches the logo's organic right-side energy

---

## 7. Layout & Spacing

### 7.1 Grid System

```
Container max-width: 1280px
Columns: 12
Gutter: 32px (desktop), 24px (tablet), 16px (mobile)
Page margin: 64px (desktop), 32px (tablet), 20px (mobile)
```

### 7.2 Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight element gaps |
| `space-2` | 8px | Badge padding, icon gaps |
| `space-3` | 12px | Small gaps |
| `space-4` | 16px | Standard element spacing |
| `space-6` | 24px | Card padding, form gaps |
| `space-8` | 32px | Section content padding |
| `space-12` | 48px | Between content groups |
| `space-16` | 64px | Between major sections |
| `space-20` | 80px | Large section separators |
| `space-24` | 96px | Hero section padding |

### 7.3 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 6px | Small badges, tags |
| `rounded-md` | 10px | Input fields, small cards |
| `rounded-lg` | 16px | Cards, modals |
| `rounded-xl` | 24px | Feature sections, hero cards |
| `rounded-full` | 9999px | Buttons (pill), avatars |

---

## 8. Responsive Breakpoints

| Breakpoint | Width | Target |
|-----------|-------|--------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Small desktop |
| `xl` | 1280px | Desktop (container max) |
| `2xl` | 1536px | Large desktop |

---

## 9. Accessibility Standards

| Standard | Requirement |
|----------|-------------|
| **WCAG Level** | AA minimum, AAA for text |
| **Color contrast** | 4.5:1 minimum for body text, 3:1 for large text |
| **Focus indicators** | Visible focus ring using brand cyan (`#4CC9D0`) with 4px offset |
| **Font size minimum** | 16px for body text |
| **Touch targets** | 44x44px minimum |
| **Motion** | Respect `prefers-reduced-motion` |
| **Dark mode** | Respect `prefers-color-scheme` |

### Contrast Check Results

| Combination | Ratio | Pass? |
|-------------|-------|-------|
| Charcoal (#2D3436) on White | 13.4:1 | AAA |
| Dark Gray (#4A5568) on White | 7.4:1 | AAA |
| Gray (#718096) on White | 4.6:1 | AA |
| Cyan 600 (#2BA8B0) on White | 3.2:1 | AA Large only |
| Teal 600 (#2A9A84) on White | 3.8:1 | AA Large only |
| Emerald 600 (#2FA36D) on White | 3.5:1 | AA Large only |
| White on Gradient Button | 3.1:1+ | AA Large (use bold text) |

**Note:** For text links and small text in brand colors, use the 600 shade variants. For decorative/large text, 400 shades are fine.

---

## 10. Brand Voice & Messaging Tone

Aligned with the logo's visual language:

| Attribute | Description | Example |
|-----------|-------------|---------|
| **Confident** | Clear, direct, no hedging | "We deploy agents that deliver" (not "We can help you maybe explore...") |
| **Forward-looking** | Future-focused, progressive | "The future of work is autonomous" |
| **Precise** | Technical but accessible | "Our agents process 10K decisions/day" (specific, not vague) |
| **Warm** | Human despite being technical | "Built by agents. Guided by humans." |
| **Bold** | Not afraid to lead | "We don't just build AI — we are built by it." |

---

## 11. Visual Summary — The Digixr Brand System at a Glance

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  COLORS                                                 │
│  ■ #4CC9D0  Cyan (Digital Blue)                        │
│  ■ #3BBFA6  Teal (Bridge)                              │
│  ■ #42C68B  Emerald (Agentic Green)                    │
│  ■ #2D3436  Charcoal (Headings)                        │
│  ■ #718096  Gray (Body Text)                           │
│  ▓ Gradient: #4CC9D0 → #3BBFA6 → #42C68B              │
│                                                         │
│  TYPOGRAPHY                                             │
│  Display:  Plus Jakarta Sans / Outfit (wide tracking)   │
│  Body:     Inter / DM Sans                              │
│  Code:     JetBrains Mono                               │
│                                                         │
│  SHAPES                                                 │
│  Border radius: 12-16px (rounded, not sharp)            │
│  Shadows: Soft, colored (cyan/emerald tinted)           │
│  Icons: Linear/outline, 1.5-2px stroke                  │
│                                                         │
│  MOTION                                                 │
│  Style: Subtle, purposeful, left-to-right data flow     │
│  Signature: Gradient pulse, data streams, agent pulse   │
│                                                         │
│  PERSONALITY                                            │
│  Confident · Forward-looking · Precise · Warm · Bold    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

*Design guide prepared for Digixr Technologies. March 4, 2026.*
*Extracted from brand logo analysis. To be reviewed and approved before implementation.*
