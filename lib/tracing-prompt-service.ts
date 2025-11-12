import openai from "./openai-client";

export interface TracingPlan {
  type: "letter" | "number" | "word";
  content: string;
  style: "uppercase" | "lowercase" | "cursive";
  description: string;
}

const SYSTEM_PROMPT = `You are an educational content designer who creates handwriting tracing worksheets for children aged 2-6.
- Age restriction: every activity MUST be safe, age-appropriate, and friendly for children aged 2-6. Reject or gently adjust any request that is not suitable for this age group.
- Output JSON only with the following keys: type ("letter" | "number" | "word"), content (the exact letter/number/word to trace), style ("uppercase" | "lowercase" | "cursive"), description (short kid-friendly instructions in sentence case).
- Preserve a single letter or number when requested. When users ask for names or words, keep the word short (max 10 characters) and classroom friendly.
- Always default to uppercase style for single capital letters unless the user explicitly requests lowercase or cursive.`;

export async function generateTracingPlanFromPrompt(userPrompt: string): Promise<TracingPlan | null> {
  const trimmedPrompt = userPrompt.trim();
  if (!trimmedPrompt) return null;

  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Create a handwriting tracing plan for the following user request. Respond with JSON only.\n\nUser request: "${trimmedPrompt}"`,
        },
      ],
      max_tokens: 400,
      temperature: 0.3,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) return null;

    const parsed = safeJsonParse(response);
    if (!parsed) return null;

    if (
      parsed.type &&
      parsed.content &&
      parsed.style &&
      parsed.description &&
      ["letter", "number", "word"].includes(parsed.type) &&
      ["uppercase", "lowercase", "cursive"].includes(parsed.style)
    ) {
      return parsed as TracingPlan;
    }

    return null;
  } catch (error) {
    console.warn("Failed to generate tracing plan via AI:", error);
    return null;
  }
}

function safeJsonParse(payload: string): any | null {
  try {
    const cleaned = payload
      .trim()
      .replace(/^[^[{]*/, "")
      .replace(/[^}\]]*$/, "");
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

export function buildTracingImagePrompt(plan: TracingPlan, userPrompt: string): string {
  const theme = userPrompt.trim();

  let subjectDescription = "";
  let practiceHint = "";

  switch (plan.type) {
    case "letter": {
      const styleLabel =
        plan.style === "lowercase"
          ? "lowercase letter"
          : plan.style === "cursive"
            ? "cursive letter"
            : "uppercase letter";
      subjectDescription = `Create the ${styleLabel} "${plan.content}" with bold, dotted tracing strokes and friendly directional arrows.`;
      practiceHint = `Include three handwriting practice lines underneath with dotted versions of "${plan.content}".`;
      break;
    }
    case "number": {
      subjectDescription = `Create the number "${plan.content}" with bold, dotted tracing strokes and playful directional arrows.`;
      practiceHint = `Provide three handwriting lines with dotted number "${plan.content}" for extra practice.`;
      break;
    }
    case "word": {
      subjectDescription = `Create the word "${plan.content}" in large bubble lettering with dotted tracing guides and arrow cues for each letter.`;
      practiceHint = `Add three handwriting lines containing the word "${plan.content}" in dotted lettering for repetition.`;
      break;
    }
  }

  return `Generate a children’s handwriting tracing worksheet for toddlers aged 2-6. ${subjectDescription}
Use bright primary colors, thick rounded outlines, and a joyful cartoon visual style with smiling characters or simple icons. Keep the background white and printer-friendly with generous safety margins and rounded corners. ${practiceHint}
Add small kid-friendly decorations (stars, hearts, cute animals) that match the theme, while keeping the layout uncluttered. The worksheet must follow all age-appropriate guidelines.
Original user request/context: "${theme}".`;
}

