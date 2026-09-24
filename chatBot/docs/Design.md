# Design System — Chat UI

## Concept
A quiet, correspondence-style interface for a personal dev/study
assistant — not a generic SaaS chatbot. Assistant replies read like a
written note (serif), your own input feels like typing at a terminal
(monospace), and the surrounding UI chrome is a clean geometric sans.

## Color tokens (`index.css :root`)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#14151A` | page background |
| `--surface` | `#1B1D24` | user message fill |
| `--surface-raised` | `#23252E` | reserved for raised elements |
| `--border` | `#2E313C` | hairline borders and dividers |
| `--text` | `#EDEBE6` | primary text |
| `--text-dim` | `#8B8D97` | secondary text, placeholders |
| `--accent` | `#E3A857` | status dot, prompt mark, send button, focus ring |
| `--danger` | `#D9695F` | error banner |

Accent is deliberately scarce — only the status indicator, the input's
prompt mark, and the send button use it.

## Typography
- `--font-ui`: Space Grotesk — header, buttons, user message text
- `--font-body`: Newsreader (serif) — assistant message text only
- `--font-mono`: IBM Plex Mono — composer input, error text

Three families, three distinct roles — never mixed within one element.

## Layout
- Single centered column, `max-width: 720px`, hairline left/right borders
- **Header**: status dot + wordmark on the left, "clear" button on the
  right
- **Stream**: vertical list; assistant messages sit flush left with a
  2px left rule instead of a bubble; user messages are right-aligned in
  a flat bordered box (3px radius, no shadow)
- **Composer**: fixed footer with a `>` prompt mark, an auto-growing
  textarea (caps at 160px), and a send button

## States
- **Idle**: placeholder text "ask something..."
- **Sending**: status dot pulses amber; a three-dot typing indicator
  appears in the stream
- **Error**: inline banner in the danger color; doesn't block further
  input
- **First load**: a single welcome message from the assistant

## Accessibility
- Enter sends; Shift+Enter inserts a newline
- Visible focus rings (2px accent outline) on buttons and the textarea
- `prefers-reduced-motion` is respected — pulse/bounce animations are
  disabled
- Text/background pairs meet WCAG AA contrast for body text

## Responsive behavior
- Below 640px: side borders drop, horizontal padding tightens, message
  bubbles widen to 90% max-width