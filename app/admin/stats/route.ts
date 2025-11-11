// app/admin/stats/route.ts
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Authenticate the user via Kinde
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Check if user exists in DB and is admin
    const dbUser = await prisma.user.findUnique({
      where: { kindeId: kindeUser.id },
    });

    if (!dbUser || !dbUser.isAdmin) {
      return NextResponse.json(
        { error: "Forbidden: Admin access only" },
        { status: 403 }
      );
    }

    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL is not configured. Admin stats unavailable.");
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    const { prisma } = await import("@/lib/prisma");

    // Fetch all stats concurrently
    const [totalUsers, totalSubscribers, premiumUsers, activeUsers, newUsersToday] =
      await Promise.all([
        prisma.user.count(),
        prisma.newsletterSubscriber.count(), // ✅ Correct model name
        prisma.user.count({ where: { plan: "PREMIUM" } }),
        prisma.user.count({
          where: {
            updatedAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // last 7 days
            },
          },
        }),
        prisma.user.count({
          where: {
            createdAt: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)), // since midnight today
            },
          },
        }),
      ]);

    // Return the stats
    return NextResponse.json({
      totalUsers,
      totalSubscribers,
      premiumUsers,
      activeUsers,
      newUsersToday,
    });
  } catch (error: any) {
    console.error("❌ Error fetching admin stats:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
