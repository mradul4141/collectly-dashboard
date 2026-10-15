# Collectly 2.0 — Implementation Tasks (TASKS.md)

## Phase 1: Foundation & Playbook Setup
- [x] Run comprehensive codebase audit
- [x] Create documentation structure (`docs/PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `RULES.md`, `TASKS.md`, `DECISIONS.md`, `MEMORY.md`, `SECURITY.md`, `TEST_PLAN.md`)
- [x] Verify Git cleanliness and branch status

## Phase 2: Database Schema & Core Models
- [x] Define `workspace_schema.sql` (additive tables: `projects`, `tasks`, `documents`, `ai_jobs`)
- [x] Establish Row Level Security (RLS) policies for user data isolation
- [x] Define TypeScript interfaces in `src/lib/workspace-types.ts`

## Phase 3: Core Workspace Navigation
- [x] Reorganize `src/components/sidebar.tsx` with Workspace 2.0 sections
- [x] Add collapsible Finance & Invoicing submenu preserving existing tools
- [x] Connect landing page hero buttons to direct workspace launch

## Phase 4: AI Capture & Task Execution Loop
- [x] Implement `/api/ai/extract` route with Gemini 1.5/2.0 and local fallback
- [x] Build `src/components/ai-review-modal.tsx` with task selection, priority, and date editing
- [x] Build `src/app/dashboard/capture/page.tsx` with sample templates and live review flow
- [x] Build `src/app/dashboard/tasks/page.tsx` with priority filters, search, and check-offs

## Phase 5: Projects & Kanban Experience
- [ ] Connect `src/app/dashboard/projects/page.tsx` to dynamic project cards and tasks
- [ ] Implement drag-and-drop / column status switcher (`Todo`, `In Progress`, `Review`, `Done`)
- [ ] Calculate project completion percentage based on active tasks

## Phase 6: Knowledge Hub & Documents
- [ ] Create `src/app/dashboard/documents/page.tsx` for saving notes and project specs
- [ ] Add "One-Click Extract to Tasks" button inside notes

## Phase 7: Automations & Rules Engine
- [ ] Create `src/app/dashboard/automations/page.tsx` with pre-built deterministic rules
- [ ] Add 24-hour overdue escalation and task priority alerts

## Phase 8: Verification & Deployment
- [x] Run `npm run build` with zero errors
- [x] Deploy to Netlify production (`https://collectly-app.netlify.app`)
- [ ] Update `docs/MEMORY.md` with every iteration
