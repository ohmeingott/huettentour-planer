# Website-Rahmen Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a professional website shell around the existing Hüttentour-Planer tool: persistent header with logo, landing page with hero/features/FAQ, and footer.

**Architecture:** New Header component in root layout (visible on all pages). Home page (`/`) rebuilt as scrollable landing page with Hero → "So funktioniert's" → embedded Map → FAQ → Footer sections. Tour pages unchanged except they inherit the header.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 4, existing design tokens (alpine-*, stone-*, etc.)

---

### Task 1: Move logo to public directory

**Files:**
- Move: `huttentour-planer-logo.png` → `public/logo.png`

**Step 1: Move the logo file**

```bash
cp huttentour-planer-logo.png public/logo.png
```

**Step 2: Verify**

```bash
ls -la public/logo.png
```

**Step 3: Commit**

```bash
git add public/logo.png
git commit -m "chore: add logo to public directory"
```

---

### Task 2: Create Header component

**Files:**
- Create: `components/layout/header.tsx`

**Step 1: Create the Header component**

Create `components/layout/header.tsx` — a sticky, translucent header with:
- Left: Logo image (from `/logo.png`) + "Hüttentour Planer" text as link to `/`
- Right: Anchor links "So funktioniert's" (`#how-it-works`), "FAQ" (`#faq`), and a CTA button "Tour planen" linking to `#map`
- On scroll: add bg opacity/shadow transition
- Mobile: hamburger menu button that toggles a dropdown
- Use `'use client'` since it needs scroll state and mobile menu toggle
- Use existing design tokens: `alpine-600`, `stone-*`, backdrop-blur
- Height: ~64px, sticky top-0, z-50

**Step 2: Commit**

```bash
git add components/layout/header.tsx
git commit -m "feat: add Header component with logo and navigation"
```

---

### Task 3: Create Footer component

**Files:**
- Create: `components/layout/footer.tsx`

**Step 1: Create the Footer component**

Create `components/layout/footer.tsx`:
- Background: `stone-900` with alpine accent
- Left: Logo small + "Hüttentour Planer" + copyright "© 2026"
- Right: Links to sections (#how-it-works, #faq)
- Simple, minimal design
- Server component (no interactivity needed)

**Step 2: Commit**

```bash
git add components/layout/footer.tsx
git commit -m "feat: add Footer component"
```

---

### Task 4: Integrate Header into Root Layout

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Add Header to the root layout**

In `app/layout.tsx`:
- Import the Header component
- Add `<Header />` inside `<body>` before `{children}`
- Wrap children in a `<div className="min-h-screen">` so pages fill screen below header

Note: Do NOT add Footer here — it will be part of the landing page only, not every page (tour pages have their own layout).

**Step 2: Test**

```bash
npm run dev
```

Visit `http://localhost:3000` — verify header shows. Visit `/tour/configure?region=stubai` — verify header shows there too.

**Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: integrate Header into root layout"
```

---

### Task 5: Create FAQ Accordion component

**Files:**
- Create: `components/landing/faq-section.tsx`

**Step 1: Create the FAQ section component**

Create `components/landing/faq-section.tsx`:
- `'use client'` component (needs toggle state)
- Section with `id="faq"` for anchor linking
- Title: "Häufig gestellte Fragen"
- Array of FAQ items with question/answer pairs
- Each item is an accordion: click to expand/collapse with smooth animation
- Use Chevron icon that rotates on open
- FAQ content (German):
  1. "Was ist eine Hüttentour?" → Multi-day hiking tour connecting Alpine huts...
  2. "Wie funktioniert die Verfügbarkeitsprüfung?" → We check real-time availability across all huts...
  3. "Welche Regionen sind verfügbar?" → Currently 5 regions: Stubai, Zillertal, Ötztal, Dolomiten, Berner Oberland
  4. "Muss ich alle Hütten selbst buchen?" → Yes, we show availability but booking happens on hut websites
  5. "Für wie viele Tage kann ich planen?" → 2-14 day tours, configurable
  6. "Was kostet die Nutzung?" → Free / kostenlos
- Style: `max-w-3xl mx-auto`, stone-colored borders, alpine accent on open

**Step 2: Commit**

```bash
git add components/landing/faq-section.tsx
git commit -m "feat: add FAQ accordion component"
```

---

### Task 6: Create "So funktioniert's" component

**Files:**
- Create: `components/landing/how-it-works-section.tsx`

**Step 1: Create the how-it-works section**

Create `components/landing/how-it-works-section.tsx`:
- Server component (no interactivity)
- Section with `id="how-it-works"` for anchor linking
- Title: "So funktioniert's"
- 3 cards in a row (responsive: stack on mobile):
  1. **Region wählen** — Map icon, "Wähle eine der 5 Alpenregionen auf der interaktiven Karte"
  2. **Tour konfigurieren** — Settings/sliders icon, "Passe Gruppengröße, Dauer und Etappen-Kriterien an"
  3. **Verfügbarkeit prüfen** — Calendar/check icon, "Prüfe die Live-Verfügbarkeit aller Hütten deiner Tour"
- Each card: numbered step (1, 2, 3) in alpine-600 circle, icon, title, description
- Style: bg-white cards with subtle shadow, rounded-xl

**Step 2: Commit**

```bash
git add components/landing/how-it-works-section.tsx
git commit -m "feat: add 'So funktioniert's' section component"
```

---

### Task 7: Rebuild Home Page as Landing Page

**Files:**
- Modify: `app/page.tsx`

**Step 1: Rebuild the home page**

Rewrite `app/page.tsx` to be a scrollable landing page:

```
'use client' (needed for AlpineMap dynamic import and store)

Structure:
1. Hero Section
   - Full-width, min-h-[80vh], bg-topo pattern + gradient overlay
   - Large logo image centered (max-w-xs)
   - font-display headline: "Plane deine Mehrtages-Hüttentour in den Alpen"
   - Subtext paragraph
   - CTA button "Jetzt Tour planen →" that scrolls to #map
   - Stats bar: "5 Regionen • 100+ Hütten • Live-Verfügbarkeit"
   - Subtle fade-in-up animation

2. <HowItWorksSection />

3. Map Section (id="map")
   - Heading: "Wähle deine Region"
   - Subtext: "Klicke auf eine Region um deine Hüttentour zu planen"
   - AlpineMap in a container with height ~70vh, rounded-xl, shadow
   - Same onRegionSelect handler as before

4. <FAQSection />

5. <Footer />
```

Keep existing imports (dynamic AlpineMap, useRouter, useAppStore, MapRegion).
Add imports for HowItWorksSection, FAQSection, Footer.

**Step 2: Test**

```bash
npm run dev
```

Visit `http://localhost:3000`:
- Hero section visible with logo, title, CTA
- Scroll down to see "So funktioniert's" cards
- Map section is interactive, clicking regions navigates to /tour/configure
- FAQ accordion works
- Footer at bottom
- Header links scroll to correct sections

**Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: rebuild home page as landing page with hero, features, map, FAQ"
```

---

### Task 8: Adjust Tour Pages for Header

**Files:**
- Modify: `app/tour/configure/page.tsx`
- Modify: `app/tour/results/page.tsx`
- Modify: `app/tour/availability/page.tsx`

**Step 1: Adjust tour pages**

The persistent header adds ~64px at the top. Each tour page needs minor adjustments:

- **configure/page.tsx**: Change `min-h-screen` to account for header height (`pt-0` since header is fixed and pages already have their own padding). The main change: the existing back button might overlap with header. Ensure adequate top padding.
- **results/page.tsx**: Uses `h-screen` for the map layout. Change to `h-[calc(100vh-64px)]` or similar to account for header.
- **availability/page.tsx**: Similar adjustment — ensure content doesn't hide behind header.

The header is sticky (fixed position), so pages need `pt-16` (64px) at their outermost container to prevent content hiding behind it.

**Step 2: Test all tour pages**

```bash
npm run dev
```

Navigate through the full flow:
- Home → click region → /tour/configure (header visible, no overlap)
- Submit form → /tour/results (header visible, map fills remaining space)
- Select tour → /tour/availability (header visible, content not hidden)

**Step 3: Commit**

```bash
git add app/tour/configure/page.tsx app/tour/results/page.tsx app/tour/availability/page.tsx
git commit -m "fix: adjust tour pages for persistent header height"
```

---

### Task 9: Add smooth scroll CSS and polish

**Files:**
- Modify: `app/globals.css`

**Step 1: Add smooth scroll behavior**

In `globals.css`, add:
```css
html {
  scroll-behavior: smooth;
}
```

Also add any new animation keyframes needed for the landing page sections (e.g., fade-in on scroll via intersection observer, or simple CSS animations).

**Step 2: Final visual review**

```bash
npm run dev
```

Full walkthrough:
- Landing page looks polished
- Header navigation scrolls smoothly to sections
- Mobile responsive (check at 375px width)
- Tour flow still works end-to-end

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: add smooth scroll and landing page polish"
```

---

### Task 10: Build verification

**Step 1: Run build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 2: Run tests**

```bash
npm run test
```

Expected: All existing tests pass.

**Step 3: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "fix: resolve build issues"
```
