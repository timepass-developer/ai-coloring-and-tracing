import openai from "./openai-client";

export const EXAMPLE_REFERENCE_FILE = "/mnt/data/arc.pdf";

export interface TracingPlan {
  type: "pre-writing" | "shape" | "letter" | "number" | "object" | "animal" | "skill-building" | "seasonal" | "fine-motor" | "word" | "pattern";
  subtype: string;
  content: string;
  style: "uppercase" | "lowercase" | "cursive" | "basic" | "dotted" | "outline" | "with-arrows" | "with-pictures";
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  practiceRows: number;
  theme: string;
}

const SAFETY_NET = {
  top: 0.01,
  bottom: 0.01,
  left: 0.025,
  right: 0.025,
};

function describeMargin(value: number): string {
  if(value == 0) return "no white margin";
  if (value <= 0.02) return "a very thin white margin";
  if (value <= 0.035) return "a thin white margin";
  if (value <= 0.06) return "a medium white margin";
  if (value <= 0.1) return "a thick white margin";
  return "a very thick white margin";
}

// COMPREHENSIVE SYSTEM PROMPT with explicit examples
const SYSTEM_PROMPT = `
You are a Creative Director generating diverse A4-friendly tracing worksheets for toddlers.

CRITICAL: You MUST classify user requests using these EXACT examples and keywords.

======================================================================
🎯 TYPE CLASSIFICATION GUIDE - EXACT EXAMPLES & KEYWORDS
======================================================================

1. PRE-WRITING LINES
🔑 KEYWORDS: "lines", "zigzag", "wavy", "straight", "curved", "spiral", "loops", "arc", "mountain", "rainbow", "castle", "robot steps", "train tracks"

📝 EXAMPLES & EXPECTED OUTPUTS:
• "zig-zag lines with robot theme" → 
  {
    "type": "pre-writing",
    "subtype": "zig-zag lines",
    "content": "zig-zag lines", 
    "style": "with-arrows",
    "description": "Robot-themed zig-zag line tracing practice",
    "difficulty": "beginner",
    "practiceRows": 4,
    "theme": "robot"
  }

• "rainbow arc lines for sky theme" → 
  {
    "type": "pre-writing", 
    "subtype": "rainbow arc lines",
    "content": "rainbow arc lines",
    "style": "with-arrows",
    "description": "Rainbow arc line tracing with sky theme",
    "difficulty": "beginner",
    "practiceRows": 4,
    "theme": "sky"
  }

• "wavy lines like ocean waves" → 
  {
    "type": "pre-writing",
    "subtype": "wavy lines", 
    "content": "wavy lines",
    "style": "with-arrows",
    "description": "Ocean-themed wavy line tracing practice",
    "difficulty": "beginner",
    "practiceRows": 4,
    "theme": "ocean"
  }

2. SHAPES TRACING
🔑 KEYWORDS: "circle", "square", "triangle", "heart", "star", "rectangle", "oval", "diamond", "shape", "outline"

📝 EXAMPLES & EXPECTED OUTPUTS:
• "circle shapes with smiley faces" → 
  {
    "type": "shape",
    "subtype": "circle",
    "content": "circle",
    "style": "outline",
    "description": "Circle shape tracing with smiley face theme",
    "difficulty": "beginner", 
    "practiceRows": 3,
    "theme": "faces"
  }

• "heart shapes for Valentine's day" → 
  {
    "type": "shape",
    "subtype": "heart", 
    "content": "heart",
    "style": "outline",
    "description": "Heart shape tracing for Valentine's theme",
    "difficulty": "beginner",
    "practiceRows": 3,
    "theme": "valentine"
  }

3. ALPHABET TRACING  
🔑 KEYWORDS: "letter", "alphabet", "uppercase", "lowercase", "A-Z", "name", "cursive", "trace your name"

📝 EXAMPLES & EXPECTED OUTPUTS:
• "uppercase letter A with apple theme" → 
  {
    "type": "letter",
    "subtype": "single letter",
    "content": "A",
    "style": "uppercase",
    "description": "Uppercase letter A tracing with apple theme",
    "difficulty": "beginner",
    "practiceRows": 3,
    "theme": "apple"
  }

• "trace your name with superhero theme" → 
  {
    "type": "letter",
    "subtype": "name tracing", 
    "content": "name",
    "style": "uppercase",
    "description": "Personal name tracing practice with superhero theme",
    "difficulty": "beginner",
    "practiceRows": 3,
    "theme": "superhero"
  }

4. NUMBERS TRACING
🔑 KEYWORDS: "number", "1-10", "counting", "digits", "123", "numerals"

📝 EXAMPLES & EXPECTED OUTPUTS:
• "number 5 with five balloons" → 
  {
    "type": "number",
    "subtype": "single number",
    "content": "5",
    "style": "basic",
    "description": "Number 5 tracing with balloon counting theme",
    "difficulty": "beginner",
    "practiceRows": 3,
    "theme": "balloons"
  }

• "numbers 1-10 with animals" → 
  {
    "type": "number",
    "subtype": "number sequence", 
    "content": "1-10",
    "style": "basic",
    "description": "Numbers 1-10 tracing with animal counting theme",
    "difficulty": "beginner",
    "practiceRows": 5,
    "theme": "animals"
  }

5. OBJECT TRACING
🔑 KEYWORDS: "apple", "car", "house", "tree", "ball", "ice cream", "butterfly", "object", "outline"

📝 EXAMPLES & EXPECTED OUTPUTS:
• "apple outline with worm friend" → 
  {
    "type": "object",
    "subtype": "fruit",
    "content": "apple", 
    "style": "outline",
    "description": "Apple outline tracing with worm character",
    "difficulty": "beginner",
    "practiceRows": 2,
    "theme": "fruit"
  }

• "car tracing with road lines" → 
  {
    "type": "object",
    "subtype": "vehicle",
    "content": "car",
    "style": "outline", 
    "description": "Car outline tracing with road theme",
    "difficulty": "beginner",
    "practiceRows": 2,
    "theme": "transportation"
  }

6. ANIMAL TRACING
🔑 KEYWORDS: "butterfly", "fish", "cat", "dog", "bird", "animal", "penguin", "elephant"

📝 EXAMPLES & EXPECTED OUTPUTS:
• "butterfly tracing with dotted wings" → 
  {
    "type": "animal", 
    "subtype": "insect",
    "content": "butterfly",
    "style": "outline",
    "description": "Butterfly outline tracing with wing patterns",
    "difficulty": "intermediate",
    "practiceRows": 2,
    "theme": "insects"
  }

• "fish shape in underwater theme" → 
  {
    "type": "animal",
    "subtype": "sea creature",
    "content": "fish",
    "style": "outline",
    "description": "Fish shape tracing with underwater theme", 
    "difficulty": "beginner",
    "practiceRows": 2,
    "theme": "ocean"
  }

7. SKILL-BUILDING
🔑 KEYWORDS: "maze", "connect dots", "shadow matching", "pattern", "path", "follow the dots"

📝 EXAMPLES & EXPECTED OUTPUTS:
• "simple maze for mouse to find cheese" → 
  {
    "type": "skill-building",
    "subtype": "maze",
    "content": "mouse maze",
    "style": "dotted",
    "description": "Simple maze tracing from mouse to cheese",
    "difficulty": "beginner",
    "practiceRows": 1,
    "theme": "animals"
  }

• "connect dots to reveal shape" → 
  {
    "type": "skill-building",
    "subtype": "connect dots",
    "content": "dot-to-dot",
    "style": "dotted",
    "description": "Connect the dots to reveal hidden shape",
    "difficulty": "beginner", 
    "practiceRows": 1,
    "theme": "puzzle"
  }

8. SEASONAL/THEME
🔑 KEYWORDS: "Christmas", "snowman", "pumpkin", "birthday", "balloons", "rainbow", "sun", "clouds"

📝 EXAMPLES & EXPECTED OUTPUTS:
• "Christmas tree with ornaments" → 
  {
    "type": "seasonal",
    "subtype": "holiday",
    "content": "Christmas tree",
    "style": "outline",
    "description": "Christmas tree tracing with ornaments",
    "difficulty": "intermediate",
    "practiceRows": 2,
    "theme": "christmas"
  }

• "birthday cake with candles" → 
  {
    "type": "seasonal",
    "subtype": "celebration", 
    "content": "birthday cake",
    "style": "outline",
    "description": "Birthday cake tracing with candles",
    "difficulty": "beginner",
    "practiceRows": 2,
    "theme": "birthday"
  }

9. FINE MOTOR
🔑 KEYWORDS: "scissor practice", "thick-thin lines", "dot markers", "finger tracing", "fine motor"

📝 EXAMPLES & EXPECTED OUTPUTS:
• "scissor practice wavy lines" → 
  {
    "type": "fine-motor",
    "subtype": "scissor skills",
    "content": "wavy lines",
    "style": "dotted",
    "description": "Wavy lines for scissor cutting practice",
    "difficulty": "beginner",
    "practiceRows": 4,
    "theme": "practice"
  }

• "thick to thin lines gradient" → 
  {
    "type": "fine-motor",
    "subtype": "line control", 
    "content": "gradient lines",
    "style": "with-arrows",
    "description": "Thick to thin line tracing for pencil control",
    "difficulty": "intermediate",
    "practiceRows": 4,
    "theme": "practice"
  }

======================================================================
🚫 CRITICAL: AVOID THESE COMMON MISTAKES
======================================================================
• "rainbow arc lines" → PRE-WRITING (NOT numbers/letters)
• "zig-zag lines" → PRE-WRITING (NOT letters)  
• "wavy lines" → PRE-WRITING (NOT numbers)
• "circle shapes" → SHAPES (NOT letters)
• Lines/patterns without letters/numbers → PRE-WRITING
• Objects/animals without letters/numbers → OBJECT/ANIMAL

======================================================================
📝 RESPONSE FORMAT - JSON ONLY
======================================================================
Respond ONLY with valid JSON matching the examples above.

Reference example: ${EXAMPLE_REFERENCE_FILE}
`;

// PATTERN MATCHING FUNCTION with explicit examples
function matchPatternExplicitly(prompt: string): TracingPlan | null {
  const lowerPrompt = prompt.toLowerCase();
  
  // PRE-WRITING LINES - Explicit keyword matching
  if (lowerPrompt.includes("rainbow arc") || lowerPrompt.includes("rainbow arcs")) {
    return {
      type: "pre-writing",
      subtype: "rainbow arc lines",
      content: "rainbow arc lines",
      style: "with-arrows",
      description: "Rainbow arc line tracing practice",
      difficulty: "beginner",
      practiceRows: 4,
      theme: getThemeFromPrompt(lowerPrompt, ["sky", "weather", "cloud"])
    };
  }
  
  if (lowerPrompt.includes("zig") || lowerPrompt.includes("zag")) {
    return {
      type: "pre-writing",
      subtype: "zig-zag lines",
      content: "zig-zag lines",
      style: "with-arrows",
      description: "Zig-zag line tracing practice",
      difficulty: "beginner",
      practiceRows: 4,
      theme: getThemeFromPrompt(lowerPrompt, ["robot", "castle", "lightning"])
    };
  }
  
  if (lowerPrompt.includes("wavy") || lowerPrompt.includes("wave")) {
    return {
      type: "pre-writing",
      subtype: "wavy lines",
      content: "wavy lines",
      style: "with-arrows",
      description: "Wavy line tracing practice",
      difficulty: "beginner",
      practiceRows: 4,
      theme: getThemeFromPrompt(lowerPrompt, ["ocean", "water", "snake"])
    };
  }
  
  if (lowerPrompt.includes("straight line")) {
    return {
      type: "pre-writing",
      subtype: "straight lines",
      content: "straight lines",
      style: "with-arrows",
      description: "Straight line tracing practice",
      difficulty: "beginner",
      practiceRows: 5,
      theme: getThemeFromPrompt(lowerPrompt, ["rain", "train", "building"])
    };
  }
  
  // SHAPES - Explicit shape names
  const shapes = ["circle", "square", "triangle", "heart", "star", "rectangle", "oval", "diamond"];
  for (const shape of shapes) {
    if (lowerPrompt.includes(shape)) {
      return {
        type: "shape",
        subtype: shape,
        content: shape,
        style: "outline",
        description: `${shape} shape tracing practice`,
        difficulty: "beginner",
        practiceRows: 3,
        theme: getThemeFromPrompt(lowerPrompt, ["shapes", "basic", "geometric"])
      };
    }
  }
  
  // LETTERS - Only when explicitly mentioned
  if (lowerPrompt.includes("letter") || /trace [a-z]$/i.test(lowerPrompt)) {
    const letterMatch = lowerPrompt.match(/[a-z]/);
    const letter = letterMatch ? letterMatch[0].toUpperCase() : "A";
    return {
      type: "letter",
      subtype: "single letter",
      content: letter,
      style: lowerPrompt.includes("lower") ? "lowercase" : "uppercase",
      description: `Letter ${letter} tracing practice`,
      difficulty: "beginner",
      practiceRows: 3,
      theme: getThemeFromPrompt(lowerPrompt, ["alphabet", "abc"])
    };
  }
  
  // NUMBERS - Only when explicitly mentioned
  if (lowerPrompt.includes("number") || /\d/.test(lowerPrompt)) {
    const numberMatch = lowerPrompt.match(/\d+/);
    const number = numberMatch ? numberMatch[0] : "1";
    return {
      type: "number",
      subtype: "single number",
      content: number,
      style: "basic",
      description: `Number ${number} tracing practice`,
      difficulty: "beginner",
      practiceRows: 3,
      theme: getThemeFromPrompt(lowerPrompt, ["counting", "math"])
    };
  }
  
  // ANIMALS - Common animal names
  const animals = ["butterfly", "fish", "cat", "dog", "bird", "rabbit", "turtle", "lion", "elephant"];
  for (const animal of animals) {
    if (lowerPrompt.includes(animal)) {
      return {
        type: "animal",
        subtype: animal,
        content: animal,
        style: "outline",
        description: `${animal} tracing practice`,
        difficulty: "beginner",
        practiceRows: 2,
        theme: getThemeFromPrompt(lowerPrompt, ["animals", "nature"])
      };
    }
  }
  
  // OBJECTS - Common object names
  const objects = ["apple", "car", "house", "tree", "ball", "ice cream", "sun", "moon"];
  for (const object of objects) {
    if (lowerPrompt.includes(object)) {
      return {
        type: "object",
        subtype: object,
        content: object,
        style: "outline",
        description: `${object} tracing practice`,
        difficulty: "beginner",
        practiceRows: 2,
        theme: getThemeFromPrompt(lowerPrompt, ["objects", "everyday"])
      };
    }
  }
  
  return null;
}

// Helper function to extract theme from prompt
function getThemeFromPrompt(prompt: string, defaultThemes: string[]): string {
  const themeKeywords = [
    "robot", "sky", "ocean", "animal", "fruit", "vehicle", "christmas", 
    "birthday", "halloween", "valentine", "weather", "space", "underwater"
  ];
  
  for (const theme of themeKeywords) {
    if (prompt.includes(theme)) {
      return theme;
    }
  }
  
  return defaultThemes[0] || "general";
}

function isValidTracingPlan(plan: any): plan is TracingPlan {
  const validTypes = ["pre-writing", "shape", "letter", "number", "object", "animal", "skill-building", "seasonal", "fine-motor", "word", "pattern"];
  const validStyles = ["uppercase", "lowercase", "cursive", "basic", "dotted", "outline", "with-arrows", "with-pictures"];
  const validDifficulty = ["beginner", "intermediate", "advanced"];
  
  return (
    plan.type && validTypes.includes(plan.type) &&
    plan.subtype && typeof plan.subtype === "string" &&
    plan.content && typeof plan.content === "string" &&
    plan.style && validStyles.includes(plan.style) &&
    plan.description && typeof plan.description === "string" &&
    plan.difficulty && validDifficulty.includes(plan.difficulty) &&
    plan.practiceRows && typeof plan.practiceRows === "number" &&
    plan.theme && typeof plan.theme === "string"
  );
}

function generateFallbackPlan(prompt: string): TracingPlan | null {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes("line")) {
    return {
      type: "pre-writing",
      subtype: "basic lines",
      content: "tracing lines",
      style: "with-arrows",
      description: "Basic line tracing practice",
      difficulty: "beginner",
      practiceRows: 4,
      theme: "general"
    };
  }
  
  if (lowerPrompt.includes("shape") || lowerPrompt.includes("outline")) {
    return {
      type: "shape",
      subtype: "basic shape",
      content: "shape",
      style: "outline",
      description: "Shape tracing practice",
      difficulty: "beginner",
      practiceRows: 3,
      theme: "shapes"
    };
  }
  
  return null;
}

function safeJsonParse(payload: string): any | null {
  try {
    const match = payload.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    return null;
  } catch {
    return null;
  }
}

export async function generateTracingPlanFromPrompt(
  userPrompt: string
): Promise<TracingPlan | null> {
  const trimmed = userPrompt.trim().toLowerCase();
  if (!trimmed) return null;

  // First try explicit pattern matching
  const patternMatch = matchPatternExplicitly(trimmed);
  if (patternMatch) {
    console.log("✅ Pattern matched:", patternMatch.type, "-", patternMatch.subtype);
    return patternMatch;
  }

  // Fall back to AI
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `User request: "${trimmed}"\n\nRespond with ONLY JSON.` },
      ],
      max_tokens: 500,
      temperature: 0.1,
      
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) return generateFallbackPlan(trimmed);

    const parsed = safeJsonParse(response);
    if (!parsed) return generateFallbackPlan(trimmed);

    if (isValidTracingPlan(parsed)) {
      return parsed as TracingPlan;
    } else {
      return generateFallbackPlan(trimmed);
    }
  } catch (err) {
    console.warn("AI generation failed:", err);
    return generateFallbackPlan(trimmed);
  }
}

export function buildTracingImagePrompt(
  plan: TracingPlan,
  userPrompt: string
): string {
  const theme = userPrompt.trim() || plan.theme || "playful kids theme";
  
  const { titleContent, tracingContent, practiceDescription } = generateContentByType(plan);

  return `
Generate a 9:16 vertical children's worksheet image for ${plan.type} tracing.

🎯 WORKSHEET TYPE: ${plan.type.toUpperCase()} - ${plan.subtype}
DIFFICULTY: ${plan.difficulty}
THEME: ${theme}

🎨 INNER WORKSHEET CONTENT (≈96% of canvas):
- Strong decorative border inside invisible A4-safe zone
- Header: "Name: _______" (top-left), "Date: _______" (top-right)  
- Center Title: "${titleContent}"
- Main Example: ${tracingContent}
- Practice Area: ${practiceDescription}
- Themed Elements: Cute mascots and illustrations matching "${theme}"
- Background: Colorful, extends fully to border, NO fading to white

${plan.type === "pre-writing" && plan.subtype.includes("rainbow") ? `
🌈 RAINBOW ARC SPECIFICS:
- Create large, colorful arc shapes in rainbow colors (red, orange, yellow, green, blue, purple)
- Arcs should curve gently like rainbows
- Include directional arrows showing the tracing path along the arc
- Add sky elements like clouds, sun, or birds
- Make each practice arc a different rainbow color` : ''}

⚪ OUTER SAFETY NET (PURE WHITE):
- Top: ${describeMargin(SAFETY_NET.top)}
- Bottom: ${describeMargin(SAFETY_NET.bottom)}
- Left: ${describeMargin(SAFETY_NET.left)}
- Right: ${describeMargin(SAFETY_NET.right)}
- Absolutely plain white with NO design elements

✨ CRITICAL RULES:
- NO SHADOWS of any kind anywhere in the image
- NO numbers unless explicitly requested for number tracing
- NO letters unless explicitly requested for letter tracing
- Keep all essential content inside invisible A4-safe guide
- Inner worksheet fills approximately 96% of canvas
- Use bright, toddler-friendly, printable colors
- All artwork must be clean, flat, and crisp
- Include directional arrows and starting dots for tracing

Generate a beautifully designed ${plan.subtype} tracing worksheet that follows ALL rules.
  `;
}

function generateContentByType(plan: TracingPlan) {
  let titleContent = "";
  let tracingContent = "";
  let practiceDescription = "";

  switch (plan.type) {
    case "pre-writing":
      if (plan.subtype.includes("rainbow")) {
        titleContent = `Trace Rainbow Arc Lines`;
        tracingContent = `Large colorful rainbow arc lines with directional arrows showing the curved tracing path`;
        practiceDescription = `${plan.practiceRows} practice rainbow arcs in different colors with sky theme elements`;
      } else {
        titleContent = `Trace ${plan.content}`;
        tracingContent = `Large dotted ${plan.subtype} example with starting dots and clear directional arrows`;
        practiceDescription = `${plan.practiceRows} practice ${plan.subtype} with ${plan.theme} elements`;
      }
      break;

    case "shape":
      titleContent = `Trace the ${plan.content} Shape`;
      tracingContent = `Large dotted ${plan.content} outline with numbered directional arrows`;
      practiceDescription = `${plan.practiceRows} practice ${plan.content.toLowerCase()} shapes`;
      break;

    case "letter":
      titleContent = `Trace ${plan.style === "uppercase" ? "Uppercase" : "Lowercase"} ${plan.content}`;
      tracingContent = `Large dotted ${plan.style} letter "${plan.content}" with numbered directional arrows`;
      practiceDescription = `${plan.practiceRows} handwriting practice rows`;
      break;

    case "number":
      titleContent = `Trace Number ${plan.content}`;
      tracingContent = `Large dotted number "${plan.content}" with directional arrows`;
      practiceDescription = `${plan.practiceRows} number practice rows`;
      break;

    default:
      titleContent = `Trace ${plan.content}`;
      tracingContent = `Large dotted ${plan.content} with tracing guides`;
      practiceDescription = `${plan.practiceRows} practice rows`;
  }

  return { titleContent, tracingContent, practiceDescription };
}

