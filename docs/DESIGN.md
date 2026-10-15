# Collectly 2.0 — Design System & UI/UX Guidelines

## 1. Aesthetic Direction
- **Theme:** Obsidian Dark with Ember / Amber / Indigo Accents.
- **Philosophy:** High-contrast, clean, futuristic, but strictly functional. Never sacrifice usability for visual novelty.

## 2. Color Palette
| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| **Canvas Background** | `#060606` / `#0a0a0c` | Deep obsidian page body |
| **Card / Container BG** | `#111114` / `#16161a` | Elevated content boxes and boards |
| **Borders** | `#1f1f24` / `gray-800` | Subtle, crisp structural dividers |
| **Primary Brand (Action)** | `#4f46e5` / `#6366f1` | Indigo buttons, active navigation, focus rings |
| **Secondary Brand (Ember)** | `#f97316` | Orange ambient hero glow, invoice highlights |
| **Priority: Urgent** | `#f43f5e` (Rose) | Immediate attention tags |
| **Priority: High** | `#f59e0b` (Amber) | High priority indicators |
| **Priority: Medium** | `#3b82f6` (Blue) | Standard priority badges |
| **Status: Completed** | `#10b981` (Emerald) | Success banners, done checkboxes |

## 3. Typography
- **Headings:** Serif (`font-serif`, Georgia / Playfair display) for high-end SaaS elegance.
- **Body & UI Elements:** Sans-serif (`font-sans`, Inter / system-ui), high legibility at 12px–14px.

## 4. UI Component Invariants
1. **Interactive Controls:** All clickable cards and buttons must feature `:hover`, `:active`, and focus states.
2. **Empty States:** When no tasks or projects exist, provide an actionable empty state (e.g., "+ Add your first task or try an AI example").
3. **Loading States:** Async operations (e.g., AI extraction) display an active spinner and disabled buttons to prevent double-clicks.
4. **Responsive Breakpoints:**
   - Mobile: 375px–640px (single column, full-width modal, collapsible drawer).
   - Tablet: 768px–1024px (2-column grids, compact sidebar).
   - Desktop: 1280px–1440px+ (full multi-column Kanban board, comfortable padding).
