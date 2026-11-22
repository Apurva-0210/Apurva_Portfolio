# Component Inventory & Interface Specification

**System**: Apurva Kumar Engineering Portfolio Component Architecture  
**Design Tokens Engine**: CSS Variables (`--bg: #070708`, `--ink: #f0ece1`, `--card: #121214`, `--red: #c82b20`)  
**Typography**: Serif (`DM Serif Display`), Sans (`Space Grotesk`), Monospace (`IBM Plex Mono`)  

---

## 1. Atoms & Primitives

### 1.1 `Roll` (Interactive Animated Text Pill)
- **Role**: Micro-interaction wrapper that duplicates text children into dual stacked inline spans. On container hover or keyboard focus, triggers a smooth 3D upward roll animation.
- **Props**: `children: React.ReactNode`
- **Classes**: `.cr-roll`
- **Accessibility**: Preserves original string semantics in DOM, non-disruptive to screen readers.

### 1.2 `Laurel` (Academic & Verification Iconography)
- **Role**: SVG wreath graphic reinforcing peer recognition, institutional affiliations, and publication credibility.
- **Accessibility**: Explicit `aria-hidden="true"` with accompanying descriptive text.

### 1.3 `Live Telemetry Heartbeat Pill`
- **Role**: Live network status indicator reflecting real-time communication with the GitHub GraphQL / REST API.
- **Classes**: `.cr-git-pill`, `.cr-git-dot`
- **Visuals**: Animated emerald beacon (`#2ecc71`, `box-shadow: 0 0 6px #2ecc71`).

### 1.4 `Filter Pill Button`
- **Role**: Domain category selector filtering technical works in the carousel.
- **Props**: `category: string`, `active: boolean`, `onClick: () => void`
- **Classes**: `.cr-filter-btn`, `.cr-filter-active`
- **Accessibility**: Focus-visible ring, keyboard-operable, dynamic styling.

---

## 2. Molecules

### 2.1 Navigation Bar (`.cr-nav`)
- **Role**: Persistent sticky header providing high-level orientation, brand logo, direct section links, and quick resume download action.
- **Props**: `brand: string`, `resumeUrl?: string`
- **States**:
  - Desktop (`> 860px`): Full horizontal link array with live GitHub telemetry badge.
  - Mobile (`<= 860px`): Collapsed with animated 3-bar hamburger trigger (`.cr-burger`).
- **Z-Index Layer**: `60` inside `.cr-navwrap`.

### 2.2 Mobile Glass Drawer (`.cr-mob-drawer`)
- **Role**: Fullscreen glassmorphic navigation modal for compact mobile screens.
- **Props**: `menuOpen: boolean`, `setMenuOpen: (open: boolean) => void`, `links: NavLink[]`
- **Accessibility**: `role="dialog"`, `aria-modal="true"`, `aria-label="Mobile Navigation"`, focus-visible close button (`.cr-modal-close`, `aria-label="Close mobile navigation"`).
- **Z-Index Layer**: `90` (firmly above `.cr-navwrap` to eliminate pointer collision).

### 2.3 Project Card (`.cr-work`)
- **Role**: 3D perspective-transformed project display card with active center focus, depth scaling, image presentation, title, tags, and deep-dive button.
- **Props**: `work: Work`, `depth: 'l' | 'c' | 'r'`, `onInspect: () => void`
- **States**:
  - `data-d="c"`: Active focus, scale 1.0, full opacity, interactive deep-dive button.
  - `data-d="l"` / `data-d="r"`: Peripheral preview cards, scaled to 0.88, muted opacity 0.65, decorative offset.

### 2.4 Deep-Dive Architecture Modal (`.cr-modal`)
- **Role**: High-fidelity technical modal presenting system architecture diagrams, key hardware/firmware specifications, and repository access.
- **Props**: `selectedWork: Work | null`, `onClose: () => void`
- **Accessibility**: Traps dismissals via backdrop click or ESC key; includes explicit focusable close button.

### 2.5 Experience Quote Card (`.cr-quote`)
- **Role**: Two-column layout presenting institutional role, tenure, technical accomplishments, and architecture badge for Tata Technologies, IIT Guwahati, MIT-WPU, and iACE.
- **Classes**: `.cr-quote`, `.cr-quote img`, `.cr-quote blockquote`, `.cr-quote figcaption`

---

## 3. Organisms & Section Modules

| Section Component | Selector / ID | Purpose & Content |
| :--- | :--- | :--- |
| **Hero Section** | `.cr-hero` (`#top`) | Staged dual-hand industrial plate, animated headline typography, real-time clock, Pune coordinates. |
| **Manifesto Section** | `.cr-manifesto` | Animated word-by-word reveal articulating core engineering philosophy, paired with institutional trust badge. |
| **Focus Architecture** | `.cr-journey` (`#focus`) | 4-column matrix: Embedded Systems, Computer Architecture, Autonomous Systems, and Applied Deep Learning. |
| **Engineering Capabilities** | `.cr-services` (`#capabilities`) | Detailed technical domain listings: RTL/FPGA synthesis, Linux Kernel & Device Drivers, ROS2/CARLA, PyTorch/TensorRT. |
| **Featured Projects (12)** | `.cr-feat` (`#projects`) | 3D Perspective interactive carousel with category filtering, specifications modal, and GitHub links. |
| **Field Experience** | `.cr-quotes` (`#experience`) | Paginated carousel highlighting Tata Technologies InnoVent, IIT Guwahati Lab, and iACE automotive training. |
| **Affiliations & Labs** | `.cr-wall` (`#affiliations`) | Infinite marquee presenting research institutions, validation frameworks, and open-source ecosystems. |
| **Contact & Telemetry** | `.cr-contact` (`#contact`) | Live engineering metrics odometer (8.62 CGPA, 12 projects, 3 core domains) and direct contact channels. |
| **Footer & Colophon** | `.cr-foot` | Copyright, system credits, and repository links. |

---

## 4. State Management & Lifecycle

- `index`: Tracks currently centered project card in the featured works carousel.
- `catFilter`: Tracks active category filter (`All` or domain specific).
- `qIndex`: Tracks currently focused institutional experience slide.
- `selectedWork`: Tracks currently opened deep-dive modal (or `null` when closed).
- `menuOpen`: Controls open/closed state of the accessible mobile glass drawer.
- `ghStatus`: Stores real-time verification of GitHub profile telemetry.
- `clock`: Displays live Indian Standard Time (IST) updated every minute.
