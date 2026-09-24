Product Requirement Document(prd)
# Personal AI Assistant — Product Requirements Document

## 1. Overview
A personal AI assistant powered by Groq's LLM API, for programming help,
debugging, college assignments, project planning, and general questions.
Single-user tool — not a multi-tenant product.

## 2. Problem
Off-the-shelf chat assistants (ChatGPT, Claude web app) don't give full
control over the system prompt, model choice, latency, or UI. This project
is a self-owned alternative: same core capability, but configured and
skinned exactly as needed.

## 3. Goals
- Fast, low-latency responses using Groq's inference
- Consistent personality/behavior via a single, editable system prompt
- Simple to run locally, simple to deploy later
- Clean, distraction-free chat interface

## 4. Non-goals (for now)
- Multi-user accounts / authentication
- Persisted chat history across browser sessions
- Streaming token-by-token responses
- Plugins, tool use, or retrieval over external documents

## 5. Users
Single user (the builder). No public signup flow, no onboarding.

## 6. Core features (built)
- `POST /api/chat` backend endpoint, Groq-backed
- Model, system prompt, temperature, and max tokens configured in one file
- React chat UI: message stream, composer, clear-conversation button,
  typing indicator, inline error handling

## 7. Planned features (not built yet)
- Streaming responses (SSE or fetch streaming)
- Server-side conversation persistence (per session, then per user)
- Multiple named conversations with a switcher
- Markdown/code-block rendering in assistant replies
- Deployment (backend on Railway/Render/Fly, frontend on Vercel/Netlify)
- Voice input / text-to-speech
- File upload or notes ingestion for context-aware answers

## 8. Constraints
- Groq free-tier rate limits apply
- No auth yet — must not be deployed publicly without adding one
- Model is `openai/gpt-oss-20b` by default, swappable in config

## 9. Success criteria
- Holds a coherent multi-turn conversation with retained context
- Typical responses return in well under a few seconds
- Assistant consistently follows the defined system-prompt personality