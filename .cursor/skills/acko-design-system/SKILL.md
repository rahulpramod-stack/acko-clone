---
name: acko-design-system
description: Design system, styles, colors, fonts, and component patterns for the ACKO app clone. Use when building new screens, components, or UI elements in this project. Apply when the user asks to "build", "create", "add", or "style" anything in the app, or when implementing Figma designs. Ensures visual consistency across all screens.
---

# ACKO App Clone — Design System

## Font

**Single font family throughout the entire app:**
```css
font-family: 'Euclid Circular B', ui-sans-serif, system-ui, sans-serif;
```
Configured in `tailwind.config.js` as the default sans. Use `fontFamily: "inherit"` on buttons and inputs so they pick it up automatically.

---

## Color Tokens

### Dark backgrounds (used on home, family, vehicle, explore screens)
| Token | Hex | Usage |
|-------|-----|-------|
| `bg-app-dark` | `#19191a` | Home tab, Family, VehicleDetail |
| `bg-app-black` | `#121212` | Bottom nav, primary CTA buttons |
| `bg-card-dark` | `#313131` | Entity cards, service cards |
| `bg-card-darker` | `#202020` | Vehicle asset cards |
| `bg-avatar-dark` | `#292929` | Avatar circles on dark |
| `bg-explore` | `#060606` | Explore tab root |

### Light backgrounds (used on forms, modals, profile, notifications)
| Token | Hex | Usage |
|-------|-----|-------|
| `bg-white` | `#ffffff` | Notifications, Questionnaire, ScoreAnalysis |
| `bg-surface` | `#fbfbfb` | Profile card, service cards |
| `bg-page-light` | `#ebebeb` | Profile screen |
| `bg-muted` | `#f5f5f5` | Action cards, healthcare rows |
| `bg-support` | `rgb(248, 247, 250)` | Support tab |
| `bg-purple-soft` | `#efe9fb` | Chatbot card, disclaimer |
| `bg-purple-alert` | `#f2eefc` | Highlighted alert cards |

### Text
| Hex | Usage |
|-----|-------|
| `#121212` | Primary headings, labels (light screens) |
| `#040222` | Profile name, score title |
| `#4b4b4b` | Muted labels, icon color |
| `#5b5675` | Secondary text, phone numbers |
| `#757575` | Placeholder, tertiary |
| `#a6a6a6` | Badge labels, inactive nav |
| `#ffffff` | All text on dark screens |
| `rgba(255,255,255,0.6)` | Muted text on dark cards |

### Brand & status
| Hex | Purpose |
|-----|---------|
| `#5920C5` | Primary purple (Suprathik avatar, icon accents) |
| `#D83D37` | Error/notification badge |
| `#0FA457` | Success / active status |
| `#FFAB00` | Warning (low balance) |
| `#F58700` | Service due |
| `#FBE67B` | Privileges gold text |
| `#6bcb79` | Active family member ring |

### Profile avatar colors
| Profile | Hex |
|---------|-----|
| Vishwanath | `#D97706` |
| Suprathik | `#5920C5` |
| Rahul | `#DC2626` |
| Appu | `#059669` |

---

## Typography Scale

```
10px / 14px  — captions, badges, clock labels        weight: 400–700
12px / 18px  — body small, nav labels, card subtitles weight: 400–500
14px / 20px  — body, settings rows, service cards     weight: 400–500
16px / 22px  — section headings (light screens)       weight: 600
18px / 24px  — sub-headings                           weight: 500–600
20px / 28px  — main headings (dark screens)           weight: 600, letter-spacing: -0.1px
24px / 32px  — page title (Notifications, Profile)    weight: 600, letter-spacing: -0.1px
28px / 36px  — large titles (Analysing)               weight: 600
52px / 64px  — score gauge number                     weight: 700, letter-spacing: -0.5px
```

---

## Spacing

### Common padding values (px)
`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40`

### Common gap values (Tailwind)
`gap-1 · gap-2 · gap-3 · gap-4 · gap-5 · gap-6 · gap-8`

### Bottom clearance
- Scrollable screens: `paddingBottom: 80–100px` to clear floating navs
- Profile screen scroll: `paddingBottom: 40px`

---

## Border Radius Reference

| px | Usage |
|----|-------|
| 2 | Sheet handle |
| 4 | Score/status pills |
| 8 | Primary CTA buttons |
| 10 | Action buttons, icon bubbles |
| 12 | Service cards, profile switcher tiles, suggestion bubbles |
| 16 | Main cards (profile card, entity cards) |
| 20 | Bottom sheet top corners |
| 24 | Notification icon bubble |
| 32 | Completion ring pill |
| 36 | Floating nav tab |
| 40 | Phone shell (`width: 375, height: 812`) |
| 49 | Badge pills (`rounded-[49px]`) |
| 72 | Floating nav container |
| 100 | Search / AskInput pill |

---

## Component Patterns

### Screen shell (App.tsx)
Every full-screen view is wrapped in this shell. **CRITICAL: `backgroundColor` on the shell wrapper MUST match the screen's outermost background — mismatches cause white/color bleed through the 40px corner radius.**
```tsx
<div style={{
  width: 375, height: 812,
  borderRadius: 40,
  boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
  backgroundColor: /* MUST match screen bg */,
  overflow: "hidden",
  position: "relative",
}}>
```

| Screen type | Shell `backgroundColor` |
|-------------|------------------------|
| Dark (home, family, vehicle) | `#19191a` |
| Pure black (explore) | `#060606` |
| White (notifications, questionnaire, analysing, score) | `#ffffff` |
| Grey (profile) | `#ebebeb` |

### Cards — Dark (entity cards, vehicle cards)
```tsx
style={{
  background: "#313131",
  borderRadius: 16,
  boxShadow: "0px 4px 10px -2px rgba(54,53,76,0.08)",
}}
```

### Cards — Light (service cards, profile cards)
```tsx
style={{
  background: "#fbfbfb",
  border: "1px solid #fff",
  borderRadius: 16,
  boxShadow: "0 2px 4px rgba(0,0,0,0.04), inset 0 1px 4px #fff",
}}
```

### Primary CTA button
```tsx
style={{
  background: "#121212",
  border: "0.9px solid #5b5675",
  borderRadius: 8,
  color: "#fff",
  fontSize: 14, fontWeight: 500,
  padding: "8px 24px",
  fontFamily: "inherit",
}}
```

### Bottom sheet / modal
```tsx
{/* Backdrop */}
<div style={{
  position: "absolute", inset: 0,
  background: "rgba(0,0,0,0.5)",
  borderRadius: 40, zIndex: 50,
}} />
{/* Sheet */}
<div style={{
  position: "absolute", bottom: 0, left: 0, right: 0,
  background: "#fff",
  borderRadius: "20px 20px 0 0",
  padding: "12px 20px 32px",
  boxShadow: "0 -4px 24px rgba(0,0,0,0.12)",
  zIndex: 51,
}}>
  {/* Handle */}
  <div style={{ width: 36, height: 4, background: "#d1d1d6", borderRadius: 2, margin: "0 auto 20px" }} />
```

### Back button (nav bar pattern)
```tsx
<div style={{ padding: "16px 20px 13px" }}>
  <button onClick={onBack} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
    <img src="./assets/icons/chevron-left.svg" style={{ width: 10, height: 20 }} alt="Back" />
  </button>
</div>
```
Always use `./assets/icons/chevron-left.svg` for back navigation. Never use `back-icon.svg`.

---

## Elevation / Shadows

| Use | Value |
|-----|-------|
| Phone shell | `0 24px 48px rgba(0,0,0,0.5)` |
| Bottom sheet | `0 -4px 24px rgba(0,0,0,0.12)` |
| Entity card | `0px 4px 10px -2px rgba(54,53,76,0.08)` |
| Light card | `0 2px 4px rgba(0,0,0,0.04)` |
| Profile card | `0 2px 4px rgba(0,0,0,0.04), inset 0 1px 4px #fff` |
| Active/glow | `0 2px 12px 2px rgba(107,203,121,0.3)` |
| Sticky footer | `0px -4px 8px rgba(54,53,76,0.06)` |

---

## Animations

### chatbot-enter (index.css)
```css
@keyframes chatbot-enter {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* Apply with: animation: chatbot-enter 400ms ease-out forwards */
/* Staggered delays: 0, 80, 180, 280, 370ms */
```

### analysingPulse (AnalysingScreen)
```css
@keyframes analysingPulse {
  0%   { transform: scale(1) rotate(-15deg); opacity: 0.85; }
  50%  { transform: scale(1.12) rotate(0deg); opacity: 1; }
  100% { transform: scale(1) rotate(-15deg); opacity: 0.85; }
}
/* 2s ease-in-out infinite */
```

### tickIn (ScoreAnalysisScreen gauge)
```css
@keyframes tickIn {
  0%   { opacity: 0; }
  60%  { opacity: 1; }
  80%  { opacity: 0.7; }
  100% { opacity: 1; }
}
/* Per-tick delay: 320 + i × 34 ms */
```

### badgePop (ScoreAnalysisScreen badge)
```css
@keyframes badgePop {
  from { opacity: 0; transform: translateY(6px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
/* 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) */
```

### Completion ring (ProfileScreen)
```tsx
// SVG circle, r=36, circ=226.2
strokeDasharray={`${(pct / 100) * 226.2} ${226.2}`}
strokeDashoffset={226.2 / 4}  // start from top
style={{ transition: "stroke-dasharray 1s ease" }}
```

---

## Screen Background Reference

| Screen | bg color |
|--------|----------|
| Home tab | `#19191a` |
| Explore tab | `#060606` |
| Support tab | `rgb(248, 247, 250)` |
| Family | `#19191a` |
| Vehicle Detail | `#19191a` |
| Profile | `#ebebeb` |
| Notifications | `#ffffff` |
| Questionnaire | `#ffffff` |
| Analysing | `#ffffff` |
| ScoreAnalysis | `#ffffff` |

---

## Rules

1. **Anti-bleed rule**: Shell `backgroundColor` must always equal the screen's outermost wrapper `backgroundColor`. If they differ, colors bleed through the 40px rounded corners.
2. **No Tailwind install required**: Tailwind is already configured via `tailwind.config.js`. All utilities are available.
3. **Font**: Never hardcode `fontFamily` on text — it inherits `Euclid Circular B` from the root. Only set it on `button`/`input` elements where inheritance breaks.
4. **Back icon**: Always use `./assets/icons/chevron-left.svg` (10×20px), never `back-icon.svg` or other variants.
5. **Scrollable screens**: Always add `paddingBottom: 80–100px` on scrollable content that has a floating nav bar so the last item isn't obscured.
6. **ProfileContext**: All user-facing names, initials, and avatar colors must come from `useProfile()` — never hardcode "Vishwanath" or other names.
7. **New screens**: Register the shell `backgroundColor` in `App.tsx`'s `shell()` call and add to the View union type.
