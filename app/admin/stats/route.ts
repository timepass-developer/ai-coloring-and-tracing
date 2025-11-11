// app/admin/stats/route.ts
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await requireAdmin();
    if ("response" in result) {
      return result.response;
    }

    const { prisma } = result.context;

    // Fetch all stats concurrently
    const [totalUsers, totalSubscribers, premiumUsers, activeUsers, newUsersToday] =
      await Promise.all([
        prisma.user.count(),
        prisma.newsletterSubscriber.count(),
        prisma.user.count({ where: { plan: "PREMIUM" } }),
        prisma.user.count({
          where: {
            updatedAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
          },
        }),
        prisma.user.count({
          where: {
            createdAt: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
            },
          },
        }),
      ]);

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
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
