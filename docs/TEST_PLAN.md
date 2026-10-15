# Collectly 2.0 — Quality Assurance & Test Plan (TEST_PLAN.md)

## 1. Definition of "Working"
A feature in Collectly 2.0 is only deemed complete when:
1. **Compilation:** `npm run build` succeeds with zero TypeScript and Next.js errors.
2. **Data Isolation:** A user cannot view, edit, or delete another user's tasks or notes.
3. **Responsive Visual Integrity:** Verified across 375px (Mobile), 768px (Tablet), and 1440px (Desktop).
4. **Resilient AI Extraction:** Works in both Live Gemini mode and Local Heuristic Fallback mode without crashing.
5. **Human Approval Guardrail:** No task is created silently upon AI request; tasks are only created when the user hits "Approve".

## 2. Manual Verification Checklist
| Test Case | Steps | Expected Result | Status |
| :--- | :--- | :--- | :--- |
| **TC-01: Quick AI Capture** | Enter: "Prepare revised proposal for Acme by Friday. Update pricing." Click "Extract Action Items" | Modal pops up with 2 extracted tasks, Due Date "This Friday", Priority set. | ✅ Verified |
| **TC-02: Review & Approval** | Edit title in modal, deselect 1 task, click "Approve" | Only selected task is added to Recent Tasks feed with success banner. | ✅ Verified |
| **TC-03: My Tasks Check-off** | Click circle button on task | Task status toggles with line-through and completed count increments. | ✅ Verified |
| **TC-04: Tasks Search & Filter** | Type "Acme" in search, select "High Priority" | Table dynamically filters to matching items with zero reload. | ✅ Verified |
| **TC-05: 3D Wave Grid Interaction** | Move mouse across hero section on landing page | Mesh points ripple dynamically with cursor tracking. | ✅ Verified |
| **TC-06: Production Delivery** | Visit `https://collectly-app.netlify.app/dashboard/capture` | Loads directly with 200 OK and no infinite redirect loops. | ✅ Verified |
