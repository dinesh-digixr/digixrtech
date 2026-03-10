// Scroll-driven light-to-dark background transition
// Extracted from mockup lines 3801-3882
// Single unified RAF loop — no overlays, no seams

import { lerp } from './canvas/utils';

const LIGHT = { r: 250, g: 252, b: 253 };
const DARK = { r: 10, g: 10, b: 18 };

export function initScrollTransition(): () => void {
  let rafId: number;

  // Cache DOM elements once they're available
  let heroSection: HTMLElement | null = null;
  let heroSub: HTMLElement | null = null;
  let heroContent: HTMLElement | null = null;
  let transZone: Element | null = null;
  let lcBar: HTMLElement | null = null;
  let navbar: HTMLElement | null = null;
  let navLinks: HTMLAnchorElement[] = [];
  let badge: HTMLElement | null = null;
  let cached = false;

  function cacheElements() {
    heroSection = document.getElementById('heroSection');
    if (!heroSection) return false;
    heroSub = heroSection.querySelector<HTMLElement>('.hero-sub');
    heroContent = heroSection.querySelector<HTMLElement>('.hero-content');
    transZone = document.querySelector('.transition-zone');
    lcBar = document.getElementById('lifecycleBar');
    navbar = document.getElementById('navbar');
    navLinks = navbar ? Array.from(navbar.querySelectorAll<HTMLAnchorElement>('.nav-links a:not(.nav-cta)')) : [];
    badge = heroSection.querySelector<HTMLElement>('.hero-badge');
    cached = true;
    return true;
  }

  function update() {
    if (!cached && !cacheElements()) {
      rafId = requestAnimationFrame(update);
      return;
    }

    const heroRect = heroSection!.getBoundingClientRect();
    const heroH = heroRect.height;
    const scrolled = Math.max(0, -heroRect.top);

    const rawProgress = Math.min(1, scrolled / heroH);
    const eased = rawProgress * rawProgress;

    // Unified background color — body and hero
    const bgR = lerp(LIGHT.r, DARK.r, eased);
    const bgG = lerp(LIGHT.g, DARK.g, eased);
    const bgB = lerp(LIGHT.b, DARK.b, eased);
    const bgColor = `rgb(${bgR},${bgG},${bgB})`;
    document.body.style.backgroundColor = bgColor;
    heroSection!.style.backgroundColor = bgColor;

    // Hero text color: dark → light as bg darkens
    const textBrightness = lerp(45, 255, eased);
    const textAlpha = 1 - Math.max(0, (rawProgress - 0.5) / 0.5) * 0.5;
    heroSection!.style.color = `rgba(${textBrightness},${textBrightness},${textBrightness},${textAlpha})`;

    // Hero subtext
    if (heroSub) {
      const subR = lerp(113, 180, eased);
      const subG = lerp(128, 180, eased);
      const subB = lerp(150, 180, eased);
      heroSub.style.color = `rgba(${subR},${subG},${subB},${textAlpha})`;
    }

    // Hero content: gentle lift after 40% scroll
    if (heroContent) {
      const contentFade = Math.max(0, (rawProgress - 0.4) / 0.6);
      heroContent.style.opacity = String(1 - contentFade * 0.5);
      heroContent.style.transform = `translateY(${contentFade * -15}px)`;
    }

    // Transition zone glow
    if (transZone) {
      transZone.classList.toggle('glow-visible', eased > 0.6 && eased < 0.95);
    }

    // Lifecycle bar border
    if (lcBar && lcBar.classList.contains('visible')) {
      lcBar.style.borderBottomColor = `rgba(255,255,255,${Math.min(0.04, eased * 0.05)})`;
    }

    // Navbar
    if (navbar) {
      const na = 0.88 + eased * 0.04;
      navbar.style.background = `rgba(${bgR},${bgG},${bgB},${na})`;

      if (eased < 0.33) {
        navbar.style.borderBottomColor = `rgba(226,232,240,${Math.max(0, 0.6 * (1 - eased * 3))})`;
      } else {
        navbar.style.borderBottomColor = `rgba(255,255,255,${Math.min(0.06, (eased - 0.3) * 0.09)})`;
      }

      for (const link of navLinks) {
        link.style.color = `rgba(${lerp(74, 255, eased)},${lerp(85, 255, eased)},${lerp(104, 255, eased)},${eased > 0.5 ? 0.6 : 0.55 + eased * 0.1})`;
      }
    }

    // Hero badge
    if (badge) {
      badge.style.background = `rgba(${lerp(255, 30, eased)},${lerp(255, 30, eased)},${lerp(255, 40, eased)},${eased > 0.5 ? 0.12 : 0.85 - eased * 1.2})`;
      badge.style.borderColor = `rgba(76,201,208,${0.2 + eased * 0.1})`;
      badge.style.color = `rgb(${lerp(43, 120, eased)},${lerp(168, 210, eased)},${lerp(176, 220, eased)})`;
    }

    rafId = requestAnimationFrame(update);
  }

  rafId = requestAnimationFrame(update);

  return () => cancelAnimationFrame(rafId);
}
