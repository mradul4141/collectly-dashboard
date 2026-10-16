# Collectly 2.0 — Quality Assurance & Test Plan (TEST_PLAN.md)

## 1. Definition of "Working"
A feature in Collectly 2.0 is only deemed complete when:
1. **Compilation:** `npm run build` succeeds with zero TypeScript and Next.js errors across all 30 routes.
2. **Data Isolation:** A user cannot view, edit, or delete another user's tasks or notes.
3. **Responsive Visual Integrity:** Verified across 375px (Mobile), 768px (Tablet), and 1440px (Desktop).
4. **Resilient AI Extraction:** Works in both Live Gemini mode and Local Heuristic Fallback mode without crashing.
5. **Human Approval Guardrail:** No task is created silently upon AI request; tasks are only created when the user hits "Approve".
6. **Art Direction Adherence:** "Retro Space Zine" theme strictly adheres to monochrome `#DEDEC8` / `#0A0A0A` / `#FFFFFF` tokens, 3D offset sticker shadows, and vintage hand-drawn engraving illustrations.

## 2. Verification Checklist
| Test Case | Steps | Expected Result | Status |
| :--- | :--- | :--- | :--- |
| **TC-01: Quick AI Capture** | Enter: "Prepare revised proposal for Acme by Friday. Update pricing." Click "Extract Action Items" | Vintage transmission modal pops up with 2 extracted tasks, Due Date "This Friday", Priority set. | ✅ Verified |
| **TC-02: Review & Approval** | Edit title in modal, deselect 1 task, click "Approve" | Only selected task is added to Recent Tasks feed with success banner. | ✅ Verified |
| **TC-03: My Tasks Check-off** | Click circle button on task | Task status toggles with line-through and completed count increments. | ✅ Verified |
| **TC-04: Tasks Search & Filter** | Type "Acme" in search, select "High Priority" | Table dynamically filters to matching items with zero reload. | ✅ Verified |
| **TC-05: Retro Zine Landing Page** | Visit `/` | Renders `Rubik Mono One` 3D headline ("CAPTURE. PLAN. EXECUTE."), floating astronaut & UFO SVGs, and retro device container. | ✅ Verified |
| **TC-06: Production Build** | Run `npm run build` | 30/30 static and dynamic routes compile cleanly with 0 TypeScript errors. | ✅ Verified |
| **TC-07: Retro Space Illustrations** | Inspect `src/components/illustrations/retro-space.tsx` | All 5 custom vector SVGs render seamlessly without external asset latency. | ✅ Verified |
| **TC-08: Lost Astronaut 404** | Visit an invalid URL route | Lost astronaut engraving floats with playful copy and return buttons. | ✅ Verified |
| **TC-09: Orbital Telemetry Dashboard** | Visit `/dashboard` | Vintage index cards, monochrome revenue dispatch chart, and quick action buttons load in retro device container. | ✅ Verified |
