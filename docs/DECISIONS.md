# Collectly 2.0 — Architectural Decisions (DECISIONS.md)

## Decision 1: Next.js 16 Modular Monolith over Separate Backend Server
- **Date:** October 2026
- **Context:** Deciding whether to create a separate Express/FastAPI backend or use Next.js App Router API endpoints and Server Actions.
- **Decision:** Keep Next.js 16 as the unified full-stack engine.
- **Rationale:** Minimizes deployment complexity (single Netlify deployment), shares TypeScript types between client and server, eliminates CORS friction, and supports serverless scaling.

## Decision 2: Additive Database Schema instead of Replacing Existing Tables
- **Date:** October 2026
- **Context:** Evolving Collectly from invoice chasing to an all-in-one AI workspace.
- **Decision:** Keep `clients` and `invoices` intact in `supabase_schema.sql` and add `projects`, `tasks`, `documents`, and `ai_jobs` in `workspace_schema.sql`.
- **Rationale:** Prevents data loss, allows users to continue managing receivables under "Finance & Invoices", and honors the playbook rule of non-destructive iteration.

## Decision 3: Resilient AI Engine (Gemini + Local Fallback)
- **Date:** October 2026
- **Context:** How to guarantee the app remains functional even if an API key is missing or quota is exhausted.
- **Decision:** Dual-mode AI extraction in `/api/ai/extract`. If `GEMINI_API_KEY` is present, prompt Gemini with JSON mode. If absent, use deterministic regex/verb heuristic parsing.
- **Rationale:** Ensures zero downtime for testing, offline development, and live demos without failing or giving blank responses.

## Decision 4: Human-in-the-Loop Review Before Persistence
- **Date:** October 2026
- **Context:** Direct AI persistence vs. preview modal.
- **Decision:** AI extracted tasks must pass through `AIReviewModal` before creating tasks.
- **Rationale:** Prevents duplicate noisy tasks, allows humans to fix dates/priorities, and builds user trust.
