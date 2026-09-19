We'll build a Personal AI Assistant using React + TypeScript + Groq API, with real streaming.

What the app will do
┌──────────────────────────────────────────┐
│          Personal AI Assistant           │
├──────────────────────────────────────────┤
│                                          │
│ You                                      │
│ ┌──────────────────────────────────────┐ │
│ │ Explain Java interfaces             │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ Assistant                                │
│ ┌──────────────────────────────────────┐ │
│ │ A Java interface defines...         │ │
│ │ It is commonly used to...           │ │
│ │                              ← streams│ │
│ └──────────────────────────────────────┘ │
│                                          │
│                    [ Stop generating ]   │
│                                          │
├──────────────────────────────────────────┤
│ Ask your assistant...            [Send] │
└──────────────────────────────────────────┘
Features we'll implement
⚡ Token-by-token streaming
🛑 Stop generation
💬 Multi-turn conversation
🧠 Thinking indicator
📜 Smart auto-scroll
📱 Mobile-friendly
🔐 Groq API key only on backend
📝 Centralized system prompt + model config
🧩 Proper TypeScript message types