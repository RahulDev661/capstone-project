import { useRef, useState } from "react";
import "./App.css";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState("");

  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = async () => {
    const content = input.trim();

    if (!content || isStreaming) {
      return;
    }

    setError("");

    const userMessage: Message = {
      role: "user",
      content,
    };

    const conversation = [...messages, userMessage];

    setMessages([
      ...conversation,
      {
        role: "assistant",
        content: "",
      },
    ]);

    setInput("");
    setIsStreaming(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversation,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response stream received.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split("\n\n");

        buffer = events.pop() ?? "";

        for (const event of events) {
          if (!event.startsWith("data: ")) {
            continue;
          }

          const jsonString = event.slice(6);

          const data = JSON.parse(jsonString);

          if (data.type === "text") {
            setMessages((currentMessages) => {
              const updatedMessages = [...currentMessages];

              const lastMessage =
                updatedMessages[updatedMessages.length - 1];

              if (lastMessage?.role === "assistant") {
                updatedMessages[updatedMessages.length - 1] = {
                  ...lastMessage,
                  content: lastMessage.content + data.content,
                };
              }

              return updatedMessages;
            });
          }

          if (data.type === "error") {
            throw new Error(data.error);
          }

          if (data.type === "done") {
            console.log("Response complete");
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        console.log("Generation stopped.");
      } else {
        console.error("Chat error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const stopGeneration = () => {
    abortControllerRef.current?.abort();
  };

  const clearChat = () => {
    if (isStreaming) {
      stopGeneration();
    }

    setMessages([]);
    setInput("");
    setError("");
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="shell">
      {/* Header */}
      <header className="topbar">
        <div className="brand">
          <span
            className={`status-dot ${
              isStreaming ? "status-dot--busy" : ""
            }`}
          />

          <span className="brand-name">
            Personal Assistant
          </span>
        </div>

        <button
          type="button"
          className="clear-btn"
          onClick={clearChat}
          disabled={messages.length === 0 && !isStreaming}
        >
          Clear
        </button>
      </header>

      {/* Chat messages */}
      <main className="stream">
        {messages.length === 0 && !error && (
          <div className="row row--assistant">
            <div className="bubble bubble--assistant">
              Hello. I'm your personal AI assistant. How can I help you?
            </div>
          </div>
        )}

        {messages.map((message, index) => {
          const isLastMessage = index === messages.length - 1;

          return (
            <div
              key={index}
              className={`row ${
                message.role === "user"
                  ? "row--user"
                  : "row--assistant"
              }`}
            >
              {message.role === "assistant" ? (
                <div
                  className={`bubble bubble--assistant ${
                    isLastMessage &&
                    isStreaming &&
                    !message.content
                      ? "bubble--typing"
                      : ""
                  }`}
                >
                  {isLastMessage &&
                  isStreaming &&
                  !message.content ? (
                    <>
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                    </>
                  ) : (
                    message.content
                  )}
                </div>
              ) : (
                <div className="bubble bubble--user">
                  {message.content}
                </div>
              )}
            </div>
          );
        })}

        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}
      </main>

      {/* Input */}
      <form
        className="composer"
        onSubmit={(event) => {
          event.preventDefault();

          if (isStreaming) {
            stopGeneration();
          } else {
            sendMessage();
          }
        }}
      >
        <span className="prompt-mark">&gt;</span>

        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask your assistant..."
          rows={1}
          disabled={isStreaming}
        />

        <button
          type="submit"
          className="send-btn"
          disabled={!isStreaming && !input.trim()}
        >
          {isStreaming ? "Stop" : "Send"}
        </button>
      </form>
    </div>
  );
}

export default App;