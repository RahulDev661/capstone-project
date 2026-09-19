import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  throw new Error(
    "Missing GROQ_API_KEY. Add it to your .env file (see .env.example)."
  );
}

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});