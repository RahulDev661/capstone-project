import { Router, Request, Response } from "express";
import { AI_CONFIG } from "../config/ai";
import { groq } from "../services/groqClient";

const router = Router();

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

router.post("/", async (req: Request, res: Response) => {
  try {
    const { messages } = req.body as {
      messages?: ChatMessage[];
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: "messages must be a non-empty array",
      });
    }

    for (const message of messages) {
      if (
        !message ||
        typeof message.content !== "string" ||
        !["user", "assistant"].includes(message.role)
      ) {
        return res.status(400).json({
          error: "Invalid message format",
        });
      }
    }

    const fullMessages = [
      {
        role: "system" as const,
        content: AI_CONFIG.systemPrompt,
      },
      ...messages,
    ];

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await groq.chat.completions.create({
      model: AI_CONFIG.model,
      messages: fullMessages,
      temperature: AI_CONFIG.temperature,
      max_completion_tokens: AI_CONFIG.maxCompletionTokens,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;

      if (content) {
        res.write(
          `data: ${JSON.stringify({
            type: "text",
            content,
          })}\n\n`
        );
      }
    }

    res.write(
      `data: ${JSON.stringify({
        type: "done",
      })}\n\n`
    );

    res.end();
  } catch (error: unknown) {
    console.error("Chat route error:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        error: "Something went wrong while generating a response.",
      });
    }

    res.write(
      `data: ${JSON.stringify({
        type: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      })}\n\n`
    );

    res.end();
  }
});

export default router;