# Project Rules

Conventions to keep the codebase consistent as it grows — for future you,
or any AI tool working on this repo.

## Code style
- TypeScript everywhere, strict mode on (see `tsconfig.json`)
- Avoid `any`; prefer explicit interfaces (see `types/chat.ts`)
- One responsibility per file — config, client, routes, and UI stay
  separate

## Backend rules
- All Groq-specific logic stays inside `src/services/` — routes never
  call the SDK directly
- System prompt and model settings live only in `src/config/ai.ts` —
  never hardcode a model string or prompt string anywhere else
- Every route validates its input shape and returns a clear 400 before
  doing any real work
- Never log or return the API key in any response or error message
- `.env` is never committed; `.env.example` stays in sync with every
  required variable

## Frontend rules
- All network calls go through `src/lib/api.ts` — components never call
  `fetch` directly
- State stays in `App.tsx` until a second component genuinely needs it —
  don't introduce a state library prematurely
- Design tokens (colors, fonts) live only in `index.css :root` —
  components reference `var(--...)`, never a hardcoded hex value

## API contract rules
- The request/response shape of `/api/chat` is the contract between
  frontend and backend — any change to it must update both sides (and
  `ARCHITECTURE.md`) in the same change
- Roles sent from the client are only `"user"` | `"assistant"` —
  `"system"` is injected server-side only, never accepted from the client

## Workflow
- Small, single-purpose commits — backend change, frontend change, and
  docs change stay separate
- A new required env var gets added to the relevant `.env.example` in
  the same commit that introduces it

## Security
- Do not deploy this publicly without adding: rate limiting, a CORS
  allow-list, and some form of authentication
- Treat `GROQ_API_KEY` like a password — regenerate immediately if it's
  ever exposed (committed, logged, or leaked to the client)