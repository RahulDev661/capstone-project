# Project Memory

A running log of context and decisions, so this can be picked back up
without re-explaining the whole project.

## Current state
- **Backend**: Express + TypeScript, Groq SDK, fully stateless — the
  client resends the full message history on every turn
- **Model**: `openai/gpt-oss-20b` via Groq, configured in
  `src/config/ai.ts`
- **Frontend**: Vite + React + TypeScript, single-page chat UI, no
  routing yet
- **Persistence**: none — refreshing the frontend loses the conversation
- **Auth**: none — not intended to be deployed publicly in its current
  form

## Key decisions
- System prompt lives only in `config/ai.ts` and is injected
  server-side — the client never sends or sees it directly
- Chose a flat, hairline-border design language over a bubble-and-card
  SaaS look; the three-typeface system (Space Grotesk / Newsreader /
  IBM Plex Mono) is intentional, not incidental
- The client owns conversation state and the server stays stateless for
  now — simplest path to a working assistant; persistence is a
  deliberate next step, not an oversight

## Open questions
- Streaming vs. full-response completion — not yet decided (tracked in
  `TASKS.md`)
- Where persisted history will eventually live if added — flat file,
  SQLite, or a hosted DB — undecided
- Deployment target for backend and frontend — undecided

## How to pick this back up
Read `PRD.md` for scope, `ARCHITECTURE.md` for how the two halves talk
to each other, `RULES.md` before changing any conventions, `DESIGN.md`
before touching the UI, and `TASKS.md` for what's next.