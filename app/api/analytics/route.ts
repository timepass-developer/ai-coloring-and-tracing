import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL is not configured. Analytics API returning mock values.");
      return Response.json(
        {
          coloringCount: 0,
          tracingCount: 0,
          totalHours: 0,
          recentActivities: [],
          plan: "FREE",
          remainingGenerations: 5,
        },
        { status: 200 }
      );
    }

    const { prisma } = await import("@/lib/prisma");

    const dbUser = await prisma.user.findUnique({
      where: { kindeId: user.id },
      include: {
        activities: {
          orderBy: { createdAt: "desc" },
          take: 4, // last 4 activities
        },
      },
    });

    if (!dbUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Get actual session hours from database
    const activeHours = dbUser.totalSessionHours ?? 0;

    // Calculate remaining generations for Free users
    const remainingGenerations =
      dbUser.plan === "FREE"
        ? Math.max(0, 5 - (dbUser.generationCount ?? 0))
        : Infinity;

    const analytics = {
      coloringCount: dbUser.coloringCount ?? 0,
      tracingCount: dbUser.tracingCount ?? 0,
      totalHours: Number(activeHours.toFixed(1)),
      recentActivities: dbUser.activities.map((a) => ({
        type: a.type,
        prompt: a.prompt,
        imageUrl: a.imageUrl,
        createdAt: a.createdAt,
      })),
      plan: dbUser.plan,
      remainingGenerations,
    };

    return Response.json(analytics, { status: 200 });
  } catch (error) {
    console.error("Analytics fetch error:", error);
    return Response.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
