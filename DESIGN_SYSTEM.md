# Design System Specification
## Apurva Kumar — Systems Engineering & Architecture Identity

---

## 1. Brand & Design Philosophy

The design system embodies **Deterministic Engineering at the Edge**. It reflects the precision of register-level microcontroller firmware, cycle-accurate gem5 computer architecture simulations, and safety-critical automotive ADAS algorithms.

### 1.1 Core Principles
- **Atmospheric Depth:** Deep obsidian slate (`#070708`) canvas with subtle red atmospheric lighting (`rgba(200, 43, 32, 0.45)`), evoking high-tech command centers and aerospace telemetry.
- **High-Legibility Contrast:** Warm ivory-cream typography (`#f0ece1`) and high-contrast muted text (`rgba(240, 236, 225, 0.65)`) ensuring effortless readability across lighting conditions.
- **Physical Precision:** Monospaced accent fonts (`IBM Plex Mono`) for telemetry, register addresses, and timings; geometric grotesk (`Space Grotesk`) for clean body hierarchy; high-elegance editorial serif (`DM Serif Display`) for primary thematic headings.
- **Purposeful Motion:** Micro-interactions that give tactile feedback without decorative excess or distracting parallax lag.

---

## 2. Color Palette & Semantic Tokens

```css
:root {
  /* Surface Layers */
  --bg-canvas: #070708;        /* Deep Obsidian Void */
  --bg-surface: #121214;       /* Primary Card Surface */
  --bg-surface-elevated: #18181c; /* Elevated / Active Card Surface */
  --bg-surface-glass: rgba(20, 20, 22, 0.88); /* Frosted Navigation Glass */

  /* Text & Ink Tokens */
  --ink-primary: #f0ece1;      /* Warm Ivory Cream - 95% Contrast */
  --ink-secondary: rgba(240, 236, 225, 0.72); /* Muted Secondary */
  --ink-tertiary: rgba(240, 236, 225, 0.45);  /* De-emphasized Metadata */

  /* Brand Accents */
  --crimson-core: #c82b20;     /* Core Automotive Amber-Red */
  --crimson-glow: rgba(200, 43, 32, 0.45); /* Atmospheric Rim Light */
  --crimson-dark: #350302;     /* Hero Card Depth Gradient */
  --crimson-plate: #240303;    /* Closing CTA Card Base */

  /* System Semantics */
  --accent-cyan: #4ecdc4;      /* Telemetry / Signal Status */
  --accent-gold: #f4d06f;      /* Academic Honors / Verification */
  --accent-green: #2ecc71;     /* Validated Systems / Live Clock */
  --border-subtle: rgba(255, 255, 255, 0.09); /* Precision Hairline */
  --border-focus: #c82b20;     /* Accessibility Focus Ring */
}
```

---

## 3. Typography Scale & Hierarchy

| Role | Font Family | Size | Weight | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | DM Serif Display | $48\text{px}$ – $76\text{px}$ | 400 | 1.1 | -0.03em |
| **Section Title** | DM Serif Display | $32\text{px}$ – $48\text{px}$ | 400 | 1.2 | -0.02em |
| **Card Title** | DM Serif Display | $20\text{px}$ – $24\text{px}$ | 400 | 1.3 | -0.01em |
| **Section Label** | IBM Plex Mono | $12\text{px}$ – $14\text{px}$ | 500 | 1.4 | +0.05em (caps) |
| **Body Primary** | Space Grotesk | $15\text{px}$ – $17\text{px}$ | 400 | 1.6 | normal |
| **Body Muted** | Space Grotesk | $13\text{px}$ – $14.5\text{px}$ | 400 | 1.55 | normal |
| **Code / Specs** | IBM Plex Mono | $12\text{px}$ – $13\text{px}$ | 400 | 1.5 | normal |
| **Badges / Tags** | Space Grotesk | $11.5\text{px}$ – $12.5\text{px}$ | 500 | 1.2 | +0.02em |

---

## 4. Spacing, Grid & Layout System

- **Base Unit:** $4\text{px}$ / $8\text{px}$ grid (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`, `128px`).
- **Container Max-Widths:**
  - Content Stage: `1200px` centered with fluid horizontal margins.
  - Hero Card: `calc(100% - 64px)` on desktop, `calc(100% - 32px)` on mobile.
  - Floating Navigation Pill: `min(880px, calc(100% - 32px))`.
- **Responsive Breakpoints:**
  - `sm`: $640\text{px}$ (Large phones & phablets)
  - `md`: $768\text{px}$ (Tablets portrait)
  - `lg`: $1024\text{px}$ (Laptops & tablets landscape)
  - `xl`: $1280\text{px}$ (Desktop displays)
  - `2xl`: $1536\text{px}$ (Wide workstation monitors)

---

## 5. Component Patterns

### 5.1 Floating Navigation Pill (`.cr-nav.cr-pill`)
- **Visuals:** Translucent dark obsidian glass (`rgba(20, 20, 22, 0.88)`), $14\text{px}$ blur, $1\text{px}$ hairline border (`rgba(255,255,255,0.12)`).
- **Desktop:** Brand logo, centered navigation jump links (`Focus`, `Capabilities`, `Projects`, `Experience`, `Contact`), and right-aligned "Get In Touch" action button.
- **Mobile ($\le 860\text{px}$):** Brand logo, touch-friendly hamburger trigger ($44\times 44\text{px}$), and smooth slide-out glass drawer.

### 5.2 Project Architecture Cards (`.cr-work`)
- **Container:** $14\text{px}$ border radius, `$141418` surface with `$05070a` deep backdrop for diagrams.
- **Image Frame:** `aspect-ratio: 16/11` with `object-fit: contain` ensuring zero diagram or title truncation.
- **Metadata Badges:** Subdued frosted capsules (`rgba(255,255,255,0.07)`), monospaced tag typography.
- **Interactive Inspection Modal:** Clickable deep-dive trigger opening detailed architecture specifications, system blocks, and repo links.

### 5.3 Buttons & Actions
- **Primary Action (`.cr-btn`):** Ivory pill (`#f0ece1`), deep dark text (`#0a0a0c`), subtle bottom bevel shadow, smooth hover elevation.
- **Secondary Action:** Translucent frosted dark button (`rgba(255,255,255,0.08)`), $1\text{px}$ border, hover brightness increase.
- **Icon / Arrow Action (`.cr-arrow`):** $44\times 44\text{px}$ circle, centered SVG arrow, accessible touch target.

---

## 6. Accessibility & Motion Guidelines

- **Focus States:** High-visibility double outline (`2px solid #c82b20`, `2px offset`) on all keyboard-focused interactive elements.
- **Touch Targets:** All interactive triggers maintain $\ge 44\times 44\text{px}$ tap area on touch screens.
- **Reduced Motion:** When `prefers-reduced-motion: reduce` is detected, 3D card flips, RAF scroll physics, and text word-stagger animations are gracefully bypassed into instantaneous static layouts.
