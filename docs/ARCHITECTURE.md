# Collectly 2.0 — System Architecture

## 1. Technology Stack
| Layer | Choice | Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 16 (App Router) + React 19 | Hybrid SSR and Client-side reactivity, Server Actions, file-system routing. |
| **Language** | TypeScript 5 | Strict static typing for all workspace models, API payloads, and database records. |
| **Styling & Design System** | Tailwind CSS v4 + Framer Motion + Lucide | Utility-based responsive design, fluid micro-animations, standard icons. |
| **3D Graphic Shader** | Three.js | High-performance interactive WebGL wave grid for the hero landing page. |
| **Database & Auth** | Supabase (PostgreSQL + Supabase Auth) | Managed relational database with Row Level Security (RLS) and JWT cookie sessions. |
| **AI Intelligence Engine** | Google Gemini API (1.5 Flash / 2.0) | Structured JSON output parsing with local deterministic fallback. |
| **Hosting & CI/CD** | Netlify + GitHub | Automated git-push CI/CD pipeline, edge middleware proxying, fast CDN. |

## 2. Request & Data Flow
```
User (Browser)
   │
   ├─► [1] /dashboard/capture ──(POST raw text)──► /api/ai/extract
   │                                                    │
   │                                           [Gemini API / Local Parser]
   │                                                    │
   │   ◄──(Structured JSON: tasks, dates, priority)─────┘
   │
   ├─► [2] Review Modal (Human-in-the-Loop)
   │        User checks, edits, approves items
   │
   ├─► [3] Commit Approved Data ──(Server Action / Supabase Client)──► PostgreSQL
   │                                                                      │
   │                                                            [RLS: auth.uid()]
   │
   └─► [4] Real-time UI Revalidation (My Tasks, Kanban Board, Projects)
```

## 3. Directory Layout
```text
content-saas-dashboard/
├── docs/                      <-- Project Knowledge & Architecture Playbook
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN.md
│   ├── RULES.md
│   ├── TASKS.md
│   ├── DECISIONS.md
│   ├── MEMORY.md
│   ├── SECURITY.md
│   └── TEST_PLAN.md
├── src/
│   ├── app/
│   │   ├── api/ai/extract/    <-- AI processing endpoint
│   │   ├── dashboard/
│   │   │   ├── capture/       <-- AI Inbox & Capture page
│   │   │   ├── tasks/         <-- My Tasks management
│   │   │   ├── projects/      <-- Kanban Board & Projects
│   │   │   ├── documents/     <-- Knowledge Base & Notes
│   │   │   ├── automations/   <-- Rules Engine & Deadline Tracking
│   │   │   └── invoices/      <-- Preserved Finance Suite
│   │   └── page.tsx           <-- 3D Hero Landing Page
│   ├── components/            <-- Modular UI building blocks
│   ├── lib/                   <-- Shared types and utilities
│   └── utils/supabase/        <-- Server & Client Supabase connectors
├── supabase_schema.sql        <-- Base database schema (Invoices, Clients)
└── workspace_schema.sql       <-- Additive Collectly 2.0 schema (Tasks, Projects, Docs, AI Jobs)
```

## 4. Architectural Invariants
1. **No direct database queries in presentation components:** Data operations pass through typed server utilities or client handlers.
2. **Server-Side Authorization Boundary:** Security is never handled solely in frontend state; Supabase Row Level Security (RLS) policies enforce `auth.uid() = user_id`.
3. **Resilient AI Interface:** AI failures never crash the UI; deterministic local heuristics provide seamless fallback.
