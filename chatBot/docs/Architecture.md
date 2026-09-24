# Architecture

## System overview
```
Browser (React/Vite)
    │  POST /api/chat  { messages: [...] }
    ▼
Express server (Node/TypeScript)
    │  groq.chat.completions.create(...)
    ▼
Groq API
    │  completion
    ▼
Express server  →  JSON { reply, usage }  →  Browser
```

## Backend
- **Runtime**: Node.js + TypeScript, Express
- `src/server.ts` — sets up middleware (`cors`, JSON body parsing), mounts
  `/api/chat`, starts the listener on `PORT`
- `src/config/ai.ts` — single source of truth for model name, system
  prompt, temperature, and max completion tokens
- `src/services/groqClient.ts` — instantiates the Groq SDK client from
  `GROQ_API_KEY`; throws on startup if the key is missing
- `src/routes/chat.ts` — validates the incoming `messages[]`, prepends the
  system prompt, calls `groq.chat.completions.create`, returns
  `{ reply, usage }`
- **Stateless**: no database, no session store. The client owns the
  conversation history and resends it in full on every request.

## Frontend
- **Stack**: Vite + React + TypeScript
- `src/types/chat.ts` — `ChatMessage` type (`{ id, role, content }`)
- `src/lib/api.ts` — `sendMessage()`, the only place that calls `fetch`
  against the backend; throws a readable error on non-2xx responses
- `src/App.tsx` — owns all UI state (`messages`, `input`, `isSending`,
  `error`); renders the message stream and composer
- `src/App.css` / `src/index.css` — design tokens and component styles
  (see `DESIGN.md`)
- `VITE_API_URL` env var points the frontend at the backend

## Data flow per turn
1. User types and sends a message.
2. A new `ChatMessage` (role: `user`) is appended to local React state.
3. The full history (minus the synthetic welcome message) is sent to the
   backend as `{ role, content }` pairs.
4. The backend prepends the system message, calls Groq, and gets back a
   completion.
5. The reply text is appended to local state as a new assistant message.

## Environment variables
| Var | Where | Required | Notes |
|---|---|---|---|
| `GROQ_API_KEY` | backend | yes | never sent to or stored in the frontend |
| `PORT` | backend | no | defaults to 5000 |
| `VITE_API_URL` | frontend | no | defaults to `http://localhost:5000` |

## Deployment (future)
- **Backend**: any Node host (Railway, Render, Fly.io) with
  `GROQ_API_KEY` set as an environment variable
- **Frontend**: any static host (Vercel, Netlify) with `VITE_API_URL`
  pointed at the deployed backend URL
- **CORS** is currently wide open (`cors()`); restrict to the deployed
  frontend's origin before making this public