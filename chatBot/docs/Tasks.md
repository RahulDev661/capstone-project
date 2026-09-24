# Task Board

## Done
- [x] Express backend scaffold (`server.ts`, CORS, JSON body parsing)
- [x] Groq client wrapper (`services/groqClient.ts`)
- [x] `/api/chat` route with validation and system-prompt injection
- [x] AI config (model, system prompt, temperature, max tokens)
- [x] React chat UI (`App.tsx`) with message stream and composer
- [x] Design system applied (`App.css`, `index.css`)
- [x] Frontend API layer (`lib/api.ts`)
- [x] `.env.example` for both backend and frontend

## Next up
- [ ] Streaming responses (SSE from backend, incremental render on the
      frontend)
- [ ] Persist conversation history server-side (start simple — a JSON
      file or SQLite — before anything heavier)
- [ ] Support multiple named conversations with a switcher
- [ ] Markdown rendering for assistant replies (code blocks, lists)
- [ ] Copy-to-clipboard button on code blocks / messages
- [ ] Health-check ping to the backend on initial app mount
- [ ] Restrict CORS to the real frontend origin before any public
      deployment
- [ ] Basic rate limiting on `/api/chat`

## Later / nice-to-have
- [ ] Auth (even a simple single-user password gate) before deploying
      publicly
- [ ] Deploy backend (Railway/Render/Fly) and frontend (Vercel/Netlify)
- [ ] Voice input (Web Speech API) and/or text-to-speech for replies
- [ ] File upload / notes ingestion for context-aware answers
- [ ] Usage/cost tracking dashboard (Groq's `usage` field is already
      returned per response, just not displayed yet)