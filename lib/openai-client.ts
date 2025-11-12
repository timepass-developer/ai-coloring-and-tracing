import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.KINDE_SITE_URL || "https://ai-coloring-and-tracing.vercel.app",
    "X-Title": "Kiwiz - AI Coloring & Tracing",
  },
});

export default openai;

