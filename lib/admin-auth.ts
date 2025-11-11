import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import type { PrismaClient } from "@prisma/client";

export type AdminContext = {
  prisma: PrismaClient;
  adminUserId: string;
  kindeUserId: string;
};

export async function requireAdmin(): Promise<
  { context: AdminContext; response?: never } | { context?: never; response: NextResponse }
> {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if (!kindeUser) {
    return {
      response: NextResponse.json({ error: "Not authenticated" }, { status: 401 }),
    };
  }

  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not configured. Admin endpoint disabled.");
    return {
      response: NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      ),
    };
  }

  const { prisma } = await import("@/lib/prisma");

  const orConditions: Array<{ kindeId: string } | { email: string }> = [
    { kindeId: kindeUser.id },
  ];

  if (kindeUser.email) {
    orConditions.push({ email: kindeUser.email });
  }

  const dbUser = await prisma.user.findFirst({
    where: {
      OR: orConditions,
    },
    select: { id: true, isAdmin: true },
  });

  if (!dbUser?.isAdmin) {
    return {
      response: NextResponse.json(
        { error: "Forbidden: Admin access only" },
        { status: 403 }
      ),
    };
  }

  return {
    context: {
      prisma,
      adminUserId: dbUser.id,
      kindeUserId: kindeUser.id,
    },
  };
}
