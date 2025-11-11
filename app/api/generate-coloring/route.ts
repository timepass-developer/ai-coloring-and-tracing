import { generateColoringImage } from "@/lib/image-generation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const dynamic = "force-dynamic";

async function getPrisma() {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not configured. Generate coloring API limited to guest mode.");
    return null;
  }
  const { prisma } = await import("@/lib/prisma");
  return prisma;
}

/**
 * POST /api/generate-coloring
 * Supports:
 *  - Guest users: 3 generations/day
 *  - Free users: 5 generations/day
 *  - Premium users: Unlimited
 *  - Analytics tracking (coloringCount + Activity log)
 */
export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // -------------------------------
    // 🧍 Handle Guest (no login)
    // -------------------------------
    if (!user) {
      const ip =
        req.headers.get("x-forwarded-for") ||
        req.headers.get("cf-connecting-ip") ||
        "guest";
      const key = `guest_${ip}`;
      const now = Date.now();

      // Use global memory store for tracking guest generations (resets every 24h)
      if (!globalThis.__guestCache) globalThis.__guestCache = {};
      const guestData = globalThis.__guestCache[key] || {
        count: 0,
        lastReset: now,
      };

      if (now - guestData.lastReset > 24 * 60 * 60 * 1000) {
        guestData.count = 0;
        guestData.lastReset = now;
      }

      if (guestData.count >= 3) {
        return Response.json(
          {
            error: "guest_limit_reached",
            message:
              "You have reached your free limit (3 images/day). Please log in to continue.",
          },
          { status: 403 }
        );
      }

      guestData.count += 1;
      globalThis.__guestCache[key] = guestData;

      const result = await generateColoringImage(prompt);

      if (!result.success) {
        return Response.json(
          { error: result.error || "Failed to generate coloring page" },
          { status: 500 }
        );
      }

      return Response.json({
        success: true,
        imageUrl: result.imageUrl,
        prompt: result.prompt,
        originalPrompt: prompt,
        guestRemaining: 3 - guestData.count,
      });
    }

    // -------------------------------
    // 👤 Logged-in user logic
    // -------------------------------
    const prisma = await getPrisma();
    if (!prisma) {
      return Response.json(
        {
          error: "service_unavailable",
          message: "Database is not configured. Please try again later.",
        },
        { status: 503 }
      );
    }

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

    // -------------------------------
    // 📆 Reset daily generation count if day changed
    // -------------------------------
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

    // -------------------------------
    // 🔒 Enforce Plan Limit
    // -------------------------------
    if (dbUser.plan === "FREE" && dbUser.generationCount >= 5) {
      return Response.json(
        {
          error: "daily_limit_reached",
          message:
            "You’ve reached your daily limit of 5 free generations. Upgrade to Premium for unlimited access.",
        },
        { status: 403 }
      );
    }

    // -------------------------------
    // 🎨 Generate the image
    // -------------------------------
    const result = await generateColoringImage(prompt);

    if (!result.success) {
      return Response.json(
        { error: result.error || "Failed to generate coloring page" },
        { status: 500 }
      );
    }

    // -------------------------------
    // 📊 Update analytics + count + log activity
    // -------------------------------
    await prisma.$transaction([
      prisma.user.update({
        where: { kindeId },
        data: {
          generationCount:
            dbUser.plan === "FREE"
              ? { increment: 1 }
              : undefined,
          coloringCount: { increment: 1 },
          updatedAt: new Date(),
        },
      }),
      prisma.activity.create({
        data: {
          type: "COLORING",
          prompt,
          imageUrl: result.imageUrl,
          userId: dbUser.id,
        },
      }),
    ]);

    // -------------------------------
    // ✅ Response
    // -------------------------------
    return Response.json({
      success: true,
      imageUrl: result.imageUrl,
      prompt: result.prompt,
      originalPrompt: prompt,
    });
  } catch (error) {
    console.error("❌ Error generating coloring page:", error);
    return Response.json(
      { error: "Failed to generate coloring page" },
      { status: 500 }
    );
  }
}
