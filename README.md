# Architecode - Institutional Website

[![CI](https://github.com/gamtcode/architecode/actions/workflows/ci.yml/badge.svg)](https://github.com/gamtcode/architecode/actions/workflows/ci.yml)

> **Institutional landing page focused on performance, SEO, and maintainability — without overengineering.**

A production-grade static website built with Next.js, demonstrating clean architecture principles, physics-based animations, and content-driven design.

---

## Design Philosophy

### Why Static Site Generation (SSG)?

This project deliberately uses **static export** instead of SSR or SPA:

| Approach | Trade-off                       | This Project                  |
| -------- | ------------------------------- | ----------------------------- |
| **SPA**  | Client-side rendering hurts SEO | ❌ Not suitable                |
| **SSR**  | Requires Node.js runtime        | ❌ Overkill for static content |
| **SSG**  | Pre-rendered HTML, zero runtime | ✅ Perfect fit                 |

**Rationale:**

- Institutional website = content rarely changes
- Shared hosting (no Node.js) = static files only
- SEO critical = pre-rendered HTML wins
- Performance = no hydration overhead for static content

### No Overengineering

Intentionally avoided:

- Redux/Zustand (no global state needed)
- Heavy animation libraries (raw `requestAnimationFrame` is enough)
- Complex build tooling (Next.js defaults work fine)
- Unnecessary abstractions (props drilling is fine for this scale)

---

## Technical Highlights

### 🎯 Physics-Based Carousel Engine

The `TechCarousel` component implements a **4-phase inertial scrolling system**:

```
AUTO-SCROLL → DRAG → MOMENTUM → RESUME
     ↑                            |
     └────────────────────────────┘
```

**Key features:**

- `requestAnimationFrame` loop for 60fps smoothness
- Velocity tracking with friction decay
- Touch + mouse input handling
- Atomic state cleanup (Strict Mode safe)

This is **not CSS animation** — it's a physics simulation that React doesn't provide out of the box.

### 🔄 Hook/Component Separation Pattern

Animation logic is strictly separated from rendering:

```
useHeroRotatingText (state machine)
        ↓ tokens, isGlobalVisible
RotatingText (pure renderer)
```

**Benefits:**

- Testable logic without DOM
- Reusable animation timing
- Clean component responsibility
- Strict Mode resilient (cleanup in hook, not component)

### 📦 Content-Driven Architecture

All copy is centralized in `src/content/home.ts`:

```
content/home.ts → types/content.ts → components/*
      (data)         (contracts)        (UI)
```

**Benefits:**

- Edit copy without touching components
- Type-safe content structure
- Future-ready for CMS or i18n

---

## Technology Stack

### Frontend

- **Next.js 16 (App Router)** — Static export mode
- **React 19** — Functional components with hooks
- **TypeScript** — Strong typing across all layers
- **Tailwind CSS 3.4** — Utility-first responsive styling

### External Libraries (CDN)

- **Feather Icons** — Vector icon system
- **tsParticles** — Background particle effects

Loaded via CDN to reduce bundle size and avoid NPM bloat.

---

## Project Architecture

```text
src/
├── app/          # App Router (layout, page, globals.css)
├── components/   # UI components (sections, primitives, widgets)
├── content/      # Static content data
├── hooks/        # Custom React hooks (animation, detection)
└── types/        # TypeScript interfaces
```

### Component Categories

| Category        | Examples                 | Responsibility              |
| --------------- | ------------------------ | --------------------------- |
| **Layout**      | Navbar, Footer           | App shell                   |
| **Sections**    | Hero, About, Services    | Page content blocks         |
| **Interactive** | TechCarousel, ChatWidget | Stateful UI                 |
| **Primitives**  | FadeUp, RotatingText     | Reusable animation wrappers |

---

## Custom Hooks

| Hook                  | Purpose                                           | Cleanup                                  |
| --------------------- | ------------------------------------------------- | ---------------------------------------- |
| `useHeroRotatingText` | 4-phase text rotation state machine               | Clears all timeouts                      |
| `useScrollActive`     | IntersectionObserver for mobile card highlighting | Disconnects observer                     |
| `useIsMobile`         | MediaQuery-based breakpoint detection             | Removes listener                         |
| `useClientEffects`    | Initializes Feather Icons + tsParticles           | Removes load listener + MutationObserver |

All hooks are **Strict Mode safe** with deterministic cleanup.

---

## Animation Strategy

| Element                | Technique                         | Why                       |
| ---------------------- | --------------------------------- | ------------------------- |
| Hero rotating text     | Opacity transitions only          | Avoid layout shifts       |
| Section reveals        | IntersectionObserver + translate  | Performance-friendly      |
| Tech carousel          | `requestAnimationFrame` + physics | Smooth inertial scrolling |
| Chat widget visibility | Scroll position detection         | Context-aware UX          |

---

## SEO & Accessibility

### Semantic HTML

- Single `<h1>` (sr-only) for document hierarchy
- Proper heading levels: `<h2>` sections, `<h3>` cards
- Native elements: `<nav>`, `<section>`, `<blockquote>`, `<footer>`

### Metadata

- Next.js Metadata API for title, description, Open Graph
- JSON-LD structured data (Organization schema)
- Explicit `lang="pt-BR"` for i18n

---

## Build & Deployment

### Static Export

```js
// next.config.js
module.exports = {
  output: 'export',
  images: { unoptimized: true },
};
```

Generates pure static files in `/out` — no Node.js runtime required.

### CI/CD Pipeline

1. **CI**: Lint + Build (blocks deploy on failure)
2. **Deploy**: FTP to shared hosting (only `/out` directory)

No source code reaches production.

---

## Scope

### Included

- Complete institutional landing page
- Technical SEO foundations
- Physics-based animations
- Automated deployment pipeline

### Intentionally Out of Scope

- CMS, blog, authentication, i18n

### Architecture Supports (Future)

- MDX/CMS blog integration
- Internationalization
- Analytics integration

---

## License

Private / Proprietary — All rights reserved.

---

## Contact

**Architecode**  
[https://architecode.com](https://architecode.com)