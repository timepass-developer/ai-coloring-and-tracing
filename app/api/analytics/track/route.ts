import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getPrisma() {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not configured. Analytics tracking disabled.");
    return null;
  }
  const { prisma } = await import("@/lib/prisma");
  return prisma;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { type, duration, prompt, imageUrl } = data;
    
    console.log('Analytics data received:', data);

    // Try to get authenticated user (optional for public tracking)
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (user) {
      const prisma = await getPrisma();
      if (!prisma) {
        return NextResponse.json(
          { success: true, warning: "Database not configured" },
          { status: 200 }
        );
      }

      const dbUser = await prisma.user.findUnique({
        where: { kindeId: user.id },
      });

      if (dbUser) {
        // Update session time if tracking session
        if (type === 'SESSION' && duration) {
          await prisma.user.update({
            where: { id: dbUser.id },
            data: {
              totalSessionHours: {
                increment: duration,
              },
            },
          });
        }

        // Track activity (coloring/tracing)
        if (type === 'COLORING' || type === 'TRACING') {
          // Create activity record
          await prisma.activity.create({
            data: {
              type: type as any,
              prompt: prompt || 'Untitled',
              imageUrl: imageUrl || null,
              userId: dbUser.id,
            },
          });

          // Increment counter
          if (type === 'COLORING') {
            await prisma.user.update({
              where: { id: dbUser.id },
              data: { coloringCount: { increment: 1 } },
            });
          } else if (type === 'TRACING') {
            await prisma.user.update({
              where: { id: dbUser.id },
              data: { tracingCount: { increment: 1 } },
            });
          }
        }
      }
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to process analytics' }, { status: 500 });
  }
}
