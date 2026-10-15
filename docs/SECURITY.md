# Collectly 2.0 — Security & Privacy Architecture (SECURITY.md)

## 1. Authentication & Session Security
- User identity is managed through Supabase Auth (cryptographically salted bcrypt password hashes, JWT access tokens).
- Session cookies are HTTP-only and secured with TLS in production.

## 2. Server-Side Data Isolation (Row Level Security)
- Every table (`projects`, `tasks`, `documents`, `ai_jobs`, `invoices`, `clients`) contains a `user_id uuid references auth.users not null`.
- PostgreSQL Row Level Security (RLS) is activated on every table:
  ```sql
  create policy "Users can only access their own data"
    on public.tasks for all
    using (auth.uid() = user_id);
  ```
- No user can read, query, update, or delete records belonging to another account, even if an API endpoint is called directly.

## 3. Secret Management & Environment Invariants
- `GEMINI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `STRIPE_SECRET_KEY` are strictly server-only environment variables.
- Client bundles never receive secret keys. Only `NEXT_PUBLIC_` prefixed keys (public anon keys) are allowed in the browser.
- `.env.local` is listed in `.gitignore`. Only `.env.example` with empty template values is committed to Git.

## 4. AI Input Sanitation & Untrusted Content Handling
- AI prompts wrap user input in distinct delimiter blocks (`"""input"""`) to mitigate prompt injection.
- AI output is treated as untrusted draft suggestions requiring human review before entering database records.
- Raw API errors from Gemini/Supabase are caught and sanitized before returning JSON to the browser to prevent leaking stack traces or internal environment variables.
