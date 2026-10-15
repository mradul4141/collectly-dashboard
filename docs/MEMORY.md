# Collectly 2.0 — Current State & Memory (MEMORY.md)

## Current Status: Milestone 1 Deployed & Live
- **Production URL:** `https://collectly-app.netlify.app`
- **Active Git Branch:** `main` (synced with `origin/main`)
- **Build Status:** Passing (Next.js 16.3.8, 28 static & dynamic routes, 0 errors).

## What Is Done
1. **Playbook Documentation Suite:** `docs/` created with `PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `RULES.md`, `TASKS.md`, `DECISIONS.md`, `MEMORY.md`, `SECURITY.md`, and `TEST_PLAN.md`.
2. **AI Inbox & Capture (`/dashboard/capture`):**
   - Text input supporting meeting notes, emails, and multi-line dumps.
   - Built-in prompt examples (Client Deliverables, Content Creation, Study Plan).
   - `/api/ai/extract` supporting Google Gemini 1.5/2.0 API with local fallback.
   - Interactive `AIReviewModal` for editing tasks, priorities, and dates prior to commit.
3. **My Tasks Hub (`/dashboard/tasks`):**
   - Task list with instant completion toggles, quick-add input, search bar, and priority filters.
4. **Navigation & Theming:**
   - Sidebar updated with Workspace 2.0 links.
   - Finance suite grouped into collapsible accordion.
   - 3D interactive Three.js hero page buttons route directly into `/dashboard/capture`.
   - Temporary login bypass enabled in `src/utils/supabase/middleware.ts` for preview.

## Known Issues & Next Immediate Focus
- **Known Issue:** `src/app/dashboard/projects/page.tsx` still renders the Section 6 Receivables Kanban. We need to upgrade it into a workspace Project & Task Kanban.
- **Next Step:** Implement **Phase 5: Projects & Kanban Experience** (`src/app/dashboard/projects/page.tsx`) and **Phase 6: Knowledge Hub** (`src/app/dashboard/documents/page.tsx`).
