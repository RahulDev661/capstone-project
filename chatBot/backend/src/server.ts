import "dotenv/config";

import express from "express";
import cors from "cors";
import chatRouter from "./routes/chat";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    message: "Personal AI assistant backend is running.",
  });
});

app.use("/api/chat", chatRouter);

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});