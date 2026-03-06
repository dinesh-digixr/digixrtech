/**
 * Digixr Technologies — Brand Tailwind CSS Configuration
 *
 * Extracted from the Digixr logo's cyan-to-emerald gradient.
 * Import this into your main tailwind.config.ts:
 *
 *   import { digixrTheme } from './tailwind.brand.config'
 *   export default { theme: { extend: digixrTheme } }
 */

export const digixrTheme = {
  colors: {
    // ──────────────────────────────────────
    // Primary Brand Gradient Colors
    // Logo flows: Cyan → Teal → Emerald
    // ──────────────────────────────────────
    brand: {
      cyan: {
        50: '#E6F9FA',
        100: '#B8EEF1',
        200: '#8AE3E8',
        300: '#5CD8DF',
        400: '#4CC9D0', // ← Logo start (Digital Blue)
        500: '#3AB5BC',
        600: '#2BA8B0',
        700: '#1E8E96',
        800: '#1A7A80',
        900: '#0F5C61',
      },
      teal: {
        50: '#E5F7F2',
        100: '#B8ECDE',
        200: '#8AE0C9',
        300: '#5DD4B5',
        400: '#3BBFA6', // ← Logo middle (Bridge)
        500: '#2EAB93',
        600: '#2A9A84',
        700: '#1F8270',
        800: '#186B5C',
        900: '#0F4D42',
      },
      emerald: {
        50: '#E8F8F0',
        100: '#BCEDD8',
        200: '#90E2C0',
        300: '#64D7A8',
        400: '#42C68B', // ← Logo end (Agentic Green)
        500: '#35B37B',
        600: '#2FA36D',
        700: '#248A5B',
        800: '#1B714A',
        900: '#125237',
      },
    },

    // ──────────────────────────────────────
    // Neutral Colors (from logo typography)
    // ──────────────────────────────────────
    neutral: {
      charcoal: '#2D3436',  // Primary headings
      dark: '#4A5568',       // Secondary headings (logo "DIGIXR" match)
      gray: '#718096',       // Body text
      medium: '#A0AEC0',     // Captions, labels (logo "TECHNOLOGIES" match)
      light: '#CBD5E0',      // Borders, dividers
      offwhite: '#F7FAFC',   // Section backgrounds
      white: '#FFFFFF',      // Primary background
    },

    // ──────────────────────────────────────
    // Semantic Colors
    // ──────────────────────────────────────
    semantic: {
      success: '#42C68B',   // Emerald 400
      info: '#4CC9D0',      // Cyan 400
      warning: '#F6AD55',
      error: '#FC8181',
    },

    // ──────────────────────────────────────
    // Dark Mode Surface Colors
    // ──────────────────────────────────────
    dark: {
      bg: '#0F1419',
      surface: '#1A2332',
      elevated: '#243044',
      border: '#2D3748',
    },
  },

  // ──────────────────────────────────────
  // Typography
  // ──────────────────────────────────────
  fontFamily: {
    display: ['"Plus Jakarta Sans"', '"Outfit"', 'system-ui', 'sans-serif'],
    body: ['"Inter"', '"DM Sans"', 'system-ui', 'sans-serif'],
    mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
  },

  fontSize: {
    'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '800' }],
    'h1': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
    'h2': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.02em', fontWeight: '700' }],
    'h3': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
    'h4': ['1.375rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
    'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
    'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
    'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
    'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '500' }],
    'button': ['1rem', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '600' }],
  },

  // ──────────────────────────────────────
  // Border Radius (rounded, not sharp — matching logo curves)
  // ──────────────────────────────────────
  borderRadius: {
    'sm': '6px',
    'md': '10px',
    'lg': '16px',
    'xl': '24px',
    'full': '9999px',
  },

  // ──────────────────────────────────────
  // Shadows (brand-tinted)
  // ──────────────────────────────────────
  boxShadow: {
    'card': '0 1px 3px rgba(0, 0, 0, 0.04)',
    'card-hover': '0 8px 30px rgba(76, 201, 208, 0.12)',
    'button': '0 4px 14px rgba(66, 198, 139, 0.3)',
    'button-hover': '0 6px 20px rgba(66, 198, 139, 0.45)',
    'input-focus': '0 0 0 4px rgba(76, 201, 208, 0.15)',
    'elevated': '0 12px 40px rgba(0, 0, 0, 0.08)',
  },

  // ──────────────────────────────────────
  // Background Images (gradients)
  // ──────────────────────────────────────
  backgroundImage: {
    'brand-gradient': 'linear-gradient(135deg, #4CC9D0 0%, #3BBFA6 50%, #42C68B 100%)',
    'brand-gradient-subtle': 'linear-gradient(135deg, rgba(76, 201, 208, 0.08) 0%, rgba(66, 198, 139, 0.08) 100%)',
    'hero-mesh': 'radial-gradient(ellipse at 20% 50%, rgba(76, 201, 208, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(66, 198, 139, 0.15) 0%, transparent 50%)',
    'section-gradient': 'linear-gradient(180deg, #F7FAFC 0%, #E6F9FA 50%, #F7FAFC 100%)',
    'dark-gradient': 'linear-gradient(135deg, #0F1419 0%, #1A2332 100%)',
  },

  // ──────────────────────────────────────
  // Spacing (consistent scale)
  // ──────────────────────────────────────
  spacing: {
    '18': '4.5rem',   // 72px
    '22': '5.5rem',   // 88px
    '26': '6.5rem',   // 104px
    '30': '7.5rem',   // 120px
  },

  // ──────────────────────────────────────
  // Animation (subtle, purposeful)
  // ──────────────────────────────────────
  transitionDuration: {
    'fast': '200ms',
    'normal': '300ms',
    'slow': '500ms',
    'reveal': '700ms',
  },

  transitionTimingFunction: {
    'brand': 'cubic-bezier(0.16, 1, 0.3, 1)',
  },

  keyframes: {
    'gradient-pulse': {
      '0%, 100%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
    },
    'typing-pulse': {
      '0%, 60%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
      '30%': { opacity: '1', transform: 'scale(1)' },
    },
    'data-stream': {
      '0%': { transform: 'translateX(-100%)', opacity: '0' },
      '50%': { opacity: '1' },
      '100%': { transform: 'translateX(100%)', opacity: '0' },
    },
    'fade-up': {
      '0%': { opacity: '0', transform: 'translateY(20px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
  },

  animation: {
    'gradient-pulse': 'gradient-pulse 8s ease-in-out infinite',
    'typing-pulse': 'typing-pulse 1.4s infinite',
    'data-stream': 'data-stream 3s ease-in-out infinite',
    'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

/**
 * CSS Custom Properties (for use outside Tailwind)
 * Add to your global CSS:
 *
 * :root {
 *   --color-brand-cyan: #4CC9D0;
 *   --color-brand-teal: #3BBFA6;
 *   --color-brand-emerald: #42C68B;
 *   --color-brand-gradient: linear-gradient(135deg, #4CC9D0 0%, #3BBFA6 50%, #42C68B 100%);
 *   --color-charcoal: #2D3436;
 *   --color-dark-gray: #4A5568;
 *   --color-gray: #718096;
 *   --font-display: "Plus Jakarta Sans", "Outfit", system-ui, sans-serif;
 *   --font-body: "Inter", "DM Sans", system-ui, sans-serif;
 *   --font-mono: "JetBrains Mono", "Fira Code", monospace;
 *   --radius-card: 16px;
 *   --radius-button: 12px;
 *   --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.04);
 * }
 */
