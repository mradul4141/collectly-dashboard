# Collectly 2.0 — Coding Rules & Guidelines (RULES.md)

## 1. Core Engineering Principles
1. **TypeScript Everywhere:** Always define explicit types for state, props, and API payloads. Never use `any` unless absolutely unavoidable.
2. **Small, Testable Loops:** Build one feature flow at a time (e.g., Capture -> Review -> Save -> Render).
3. **Preserve Existing Code:** Do not overwrite or delete working payment-chasing features (`/dashboard/invoices`, `/dashboard/taxes`, etc.). Re-group them into the finance section.
4. **Human-in-the-Loop AI:** The AI suggests; the user approves. Never automatically insert or delete user tasks without confirmation.
5. **Security First:**
   - Real API keys (`GEMINI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`) strictly live in `.env.local` and Netlify environment variables.
   - Never commit `.env.local` to Git. Commit only `.env.example`.
   - Never expose server secrets in client-side bundles (`NEXT_PUBLIC_` prefixes are only for safe public keys).

## 2. Code Quality & Formatting
- **Component Size:** Keep UI components modular. Separate modals and complex boards into dedicated files in `src/components/`.
- **Imports:** Use the `@/` path alias pointing to `src/`.
- **Linting & Build Verification:** Before any commit or deployment, run `npm run build` to confirm zero TypeScript compilation errors.
- **Commit Messages:** Use conventional commit syntax:
  - `feat(...)`: New user-facing capabilities
  - `fix(...)`: Bug fixes
  - `chore(...)`: Config, docs, and build updates
  - `docs(...)`: Documentation updates
