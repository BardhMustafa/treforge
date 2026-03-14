# "Brief Together" Modal Wizard — Design Doc

**Date:** 2026-03-14

## Overview

Replace the flat `ContactSection` at the bottom of the homepage with a guided multi-step "brief" modal wizard. The goal is a more conversational, lower-friction way for visitors to start a project — triggered from multiple points on the site rather than requiring the user to scroll to the bottom.

## Trigger Points

The modal opens from:
1. **Navbar "Let's Talk" button** — replaces the current scroll-to-`#contact` behavior
2. **Hero CTA button** — primary above-the-fold trigger
3. **Service cards** — each service card gets a CTA that opens the brief pre-filled or generic

## Architecture

- **`BriefModalContext`** — React context providing `openBrief()` and `closeBrief()` functions, plus modal open state. Wraps the app so any component can trigger the modal.
- **`BriefModal`** component — self-contained modal with its own step state and form data.
- **`TalkBtn`** updated — calls `openBrief()` instead of linking to `/#contact`.
- **`ContactSection`** removed — replaced with a simple centered CTA section that also calls `openBrief()`.
- **Convex `sendContactEmail` action** — unchanged, called at the end of step 5.

## Modal Structure

### Container
- Full-viewport dark overlay: `rgba(0,0,0,0.85)`
- Centered card: max-width 560px, dark background matching site palette
- Sharp edges consistent with existing `ClipBtn` aesthetic
- Dismissible via ESC key or clicking outside the card

### Progress
- Step counter: "STEP 2 / 5" in Space Mono
- `#00ffb4` progress bar filling left to right across the top of the card

### Steps

| # | Title | Type | Options |
|---|-------|------|---------|
| 1 | What are you building? | Select cards (grid) | Website, Mobile App, Automation, AI Tool, Other |
| 2 | Tell us more | Textarea | Free text, 2–4 sentences |
| 3 | Budget range | Select cards | < $5k, $5k–$15k, $15k–$50k, $50k+ |
| 4 | Timeline | Select cards | ASAP, 1–3 months, 3–6 months, Flexible |
| 5 | Your contact | Two inputs | Name + Email |

### Navigation
- **Back** button (ghost style) — goes to previous step, hidden on step 1
- **Next →** button (`ClipBtn` style) — advances step
- On step 5, Next becomes **"Send Brief →"** which submits to Convex
- Loading state: "SENDING…" while request is in flight

### Success State
- Replaces modal content with confirmation (reuses existing "MESSAGE RECEIVED" style)
- Auto-closes after 3 seconds or user clicks close

### Error State
- Inline error below the inputs in Space Mono red (`#ff4d6d`)

## Styling Notes
- Select cards: dark bg, `rgba(255,255,255,0.07)` border, `#00ffb4` border + background tint on selected
- Consistent with existing input focus style (`rgba(0,255,180,0.5)` border on focus)
- Fonts: Orbitron for headings, Space Mono for body/labels

## Files to Change

- `src/context/BriefModalContext.jsx` — new file
- `src/components/brief/BriefModal.jsx` — new file
- `src/components/brief/BriefStep.jsx` — new file (step renderer)
- `src/components/layout/TalkBtn.jsx` — use `openBrief()` instead of link
- `src/components/home/Hero.jsx` — wire CTA to `openBrief()`
- `src/components/home/ServicesSection.jsx` — add CTA to service cards
- `src/components/home/ContactSection.jsx` — replace with simple CTA section
- `src/pages/HomePage.jsx` — remove hash scroll logic (no longer needed)
- `src/main.jsx` or `App.jsx` — wrap with `BriefModalContext`
