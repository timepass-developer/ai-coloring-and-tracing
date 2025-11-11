import { generateTracingContent } from "@/lib/image-generation";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

/**
 * POST /api/generate-tracing
 * Supports:
 *  - Guest users: 3 generations/day
 *  - Free users: 5 generations/day
 *  - Premium users: Unlimited
 *  - Logs analytics (tracingCount + Activity)
 *  - Retains placeholder-based tracing logic
 */
export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    // ✅ Parse tracing prompt (keep your original logic intact)
    const tracingData = parseTracingPrompt(prompt);
    const uniqueId =
      Date.now() + Math.random().toString(36).substring(2, 9);
    const placeholderUrl = `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(
      tracingData.content
    )}&type=tracing&id=${uniqueId}`;

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // -------------------------------
    // 🧍 Guest User (No Login)
    // -------------------------------
    if (!user) {
      const ip =
        req.headers.get("x-forwarded-for") ||
        req.headers.get("cf-connecting-ip") ||
        "guest";
      const key = `guest_${ip}`;
      const now = Date.now();

      if (!globalThis.__guestCache) globalThis.__guestCache = {};
      const guestData = globalThis.__guestCache[key] || {
        count: 0,
        lastReset: now,
      };

      // Reset after 24h
      if (now - guestData.lastReset > 24 * 60 * 60 * 1000) {
        guestData.count = 0;
        guestData.lastReset = now;
      }

      if (guestData.count >= 3) {
        return Response.json(
          {
            error: "guest_limit_reached",
            message:
              "You’ve reached your free limit (3 traces/day). Please log in to continue.",
          },
          { status: 403 }
        );
      }

      guestData.count += 1;
      globalThis.__guestCache[key] = guestData;

      return Response.json({
        success: true,
        ...tracingData,
        imageUrl: placeholderUrl,
        uniqueId,
        guestRemaining: 3 - guestData.count,
      });
    }

    // -------------------------------
    // 👤 Logged-in user logic
    // -------------------------------
    const kindeId = user.id;

    // Ensure user exists in DB
    let dbUser = await prisma.user.upsert({
      where: { kindeId },
      update: {
        email: user.email ?? "",
        name: user.given_name ?? user.family_name ?? "User",
      },
      create: {
        kindeId,
        email: user.email ?? "",
        name: user.given_name ?? user.family_name ?? "User",
      },
    });

    // Reset daily generation count if a new day
    const today = new Date().toDateString();
    const lastUpdate = dbUser.updatedAt
      ? new Date(dbUser.updatedAt).toDateString()
      : null;

    if (today !== lastUpdate) {
      dbUser = await prisma.user.update({
        where: { id: dbUser.id },
        data: { generationCount: 0 },
      });
    }

    // Enforce Free Plan Limit
    if (dbUser.plan === "FREE" && dbUser.generationCount >= 5) {
      return Response.json(
        {
          error: "daily_limit_reached",
          message:
            "You’ve reached your daily limit of 5 free traces. Upgrade to Premium for unlimited tracing.",
        },
        { status: 403 }
      );
    }

    // -------------------------------
    // ✏️ Generate Tracing Image (if needed)
    // -------------------------------
    const result = await generateTracingContent(prompt);
    const imageUrl = result?.imageUrl || placeholderUrl;

    // -------------------------------
    // 📊 Update analytics and activity
    // -------------------------------
    await prisma.$transaction([
      prisma.user.update({
        where: { kindeId },
        data: {
          generationCount:
            dbUser.plan === "FREE" ? { increment: 1 } : undefined,
          tracingCount: { increment: 1 },
          updatedAt: new Date(),
        },
      }),
      prisma.activity.create({
        data: {
          type: "TRACING",
          prompt,
          imageUrl,
          userId: dbUser.id,
        },
      }),
    ]);

    // -------------------------------
    // ✅ Success Response
    // -------------------------------
    return Response.json({
      success: true,
      ...tracingData,
      originalPrompt: prompt,
      imageUrl,
      uniqueId,
    });
  } catch (error) {
    console.error("Error generating tracing content:", error);
    return Response.json(
      { error: "Failed to generate tracing content" },
      { status: 500 }
    );
  }
}

// --------------------------------------------------------------------
// 🧩 Your Original Parsing Logic — fully preserved below
// --------------------------------------------------------------------
function parseTracingPrompt(prompt: string) {
  const lowerPrompt = prompt.toLowerCase();

  const letterMatch = prompt.match(/(?:letter|alphabet)\s+([A-Za-z])/i);
  if (letterMatch) {
    const letter = letterMatch[1];
    const isLowercase =
      lowerPrompt.includes("lowercase") || letter === letter.toLowerCase();
    const isCursive = lowerPrompt.includes("cursive");

    let style = "uppercase";
    if (isCursive) {
      style = "cursive";
    } else if (isLowercase) {
      style = "lowercase";
    }

    return {
      type: "letter",
      content: letter,
      style: style,
      description: `Trace the letter ${letter}${
        isCursive ? " in cursive" : isLowercase ? " in lowercase" : ""
      }`,
    };
  }

  const numberMatch = prompt.match(/number\s+(\d+)/i);
  if (numberMatch) {
    const number = numberMatch[1];
    return {
      type: "number",
      content: number,
      style: "uppercase",
      description: `Trace the number ${number}`,
    };
  }

  const wordMatch = prompt.match(/(?:spelling|word)\s+of\s+([A-Za-z]+)/i);
  if (wordMatch) {
    const word = wordMatch[1];
    return {
      type: "word",
      content: word,
      style: "uppercase",
      description: `Trace the word ${word}`,
    };
  }

  const cursiveMatch = prompt.match(/(?:letter|alphabet)\s+([A-Za-z]).*cursive/i);
  if (cursiveMatch) {
    const letter = cursiveMatch[1];
    return {
      type: "letter",
      content: letter,
      style: "cursive",
      description: `Trace the letter ${letter} in cursive`,
    };
  }

  const singleLetterMatch = prompt.match(/\b([A-Za-z])\b/);
  if (singleLetterMatch) {
    const letter = singleLetterMatch[1];
    const isLowercase = letter === letter.toLowerCase();
    return {
      type: "letter",
      content: letter,
      style: isLowercase ? "lowercase" : "uppercase",
      description: `Trace the letter ${letter}`,
    };
  }

  const singleNumberMatch = prompt.match(/\b(\d+)\b/);
  if (singleNumberMatch) {
    const number = singleNumberMatch[1];
    return {
      type: "number",
      content: number,
      style: "uppercase",
      description: `Trace the number ${number}`,
    };
  }

  const words = prompt.split(" ");
  const firstWord = words[0];
  if (firstWord && firstWord.length === 1 && /[A-Za-z]/.test(firstWord)) {
    return {
      type: "letter",
      content: firstWord,
      style: "uppercase",
      description: `Trace the letter ${firstWord}`,
    };
  }

  return {
    type: "letter",
    content: "A",
    style: "uppercase",
    description: "Trace the letter A",
  };
}
