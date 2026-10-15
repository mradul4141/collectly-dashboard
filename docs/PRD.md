# Collectly 2.0 — Product Requirements Document (PRD)

## 1. Product Overview
- **Product Name:** Collectly 2.0
- **Tagline:** Turn scattered information into organized work and actionable results with AI.
- **Category:** AI-powered productivity, knowledge management, and workflow automation SaaS.

## 2. Problem Statement
Knowledge workers, freelancers, agency owners, creators, and students manage scattered information across emails, WhatsApp, meeting notes, PDFs, and scratchpads. They struggle to bridge the gap between capturing raw thoughts and executing structured tasks, leading to missed deadlines, chaotic project tracking, and manual busywork.

## 3. Target Users
1. **Freelancers & Solo Professionals:** Managing multi-client deliverables, tasks, and billing.
2. **Founders & Agency Teams:** Tracking projects, client review queues, and milestone deadlines.
3. **Creators & Students:** Organizing content calendars, study notes, assignments, and daily priorities.

## 4. The Core Workflow
```
CAPTURE ───> UNDERSTAND ───> ORGANIZE ───> PREPARE ───> APPROVE ───> EXECUTE ───> TRACK
```
- **Capture:** Dump raw notes, emails, transcripts, or ideas.
- **Understand:** AI parses intent, verbs, due dates, priorities, and project association.
- **Organize & Prepare:** Structured tasks, notes, and milestones are formatted.
- **Approve (Human-in-the-Loop):** User reviews, adjusts, and approves before anything commits.
- **Execute & Track:** Manage in My Tasks, Kanban Board, and Document Hub.

## 5. MVP Feature Scope (Version 1)
- [x] **Universal AI Inbox & Capture:** Real-time text extraction (Gemini API with deterministic fallback).
- [x] **Human-in-the-Loop Review Modal:** Checkbox selection, priority tweaking, and deadline adjustment before commit.
- [x] **My Tasks Hub:** Complete task management with instant check-off, search, and priority filtering (`urgent`, `high`, `medium`, `low`).
- [ ] **Projects & Multi-Column Kanban:** Interactive board (`Todo`, `In Progress`, `Review`, `Done`) with drag-and-drop.
- [ ] **Knowledge & Documents Hub:** Rich markdown note repository with AI summarization.
- [ ] **Deterministic Automations:** Automatic deadline countdown, overdue escalation, and daily digest.
- [x] **Finance & Invoice Workspace (Preserved):** Receivable ledger, review queue, and MSME 43B compliance.

## 6. What is NOT in Version 1 (Scope Boundaries)
- Mobile native application (iOS/Android native binaries).
- Live real-money automated credit card debits (Stripe test mode only).
- Autonomous uncontrollable AI agents modifying production data without approval.
- Social feed and public community profiles.

## 7. Success Criteria & Acceptance Metrics
- Submitting raw text in `/dashboard/capture` extracts $\ge 1$ actionable task with deadline and priority.
- No AI output is written to the database without explicit user approval.
- Zero client-side API key leaks (all Gemini / Supabase service keys remain server-side).
- Application compiles with zero TypeScript errors and runs smoothly across mobile (375px), tablet (768px), and desktop (1440px).
