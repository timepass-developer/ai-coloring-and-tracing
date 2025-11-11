import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const dynamic = "force-dynamic";

async function getPrisma() {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not configured. Newsletter subscribe API unavailable.");
    return null;
  }
  const { prisma } = await import("@/lib/prisma");
  return prisma;
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const prisma = await getPrisma();
    if (!prisma) {
      return Response.json(
        { error: "Service unavailable. Please try again later." },
        { status: 503 }
      );
    }

    let userId: string | undefined;
    try {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (user) {
        const dbUser =
          (await prisma.user.findUnique({ where: { kindeId: user.id } })) ??
          (user.email
            ? await prisma.user.findUnique({ where: { email: user.email } })
            : null);

        if (dbUser) {
          userId = dbUser.id;
          await prisma.user.update({
            where: { id: dbUser.id },
            data: { newsletterSubscribed: true, email: dbUser.email ?? email },
          });
        }
      }
    } catch (authError) {
      console.warn("Newsletter subscription: unable to resolve Kinde user", authError);
    }

    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { userId },
      create: userId ? { email, userId } : { email },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return Response.json({ error: "Subscription failed" }, { status: 500 });
  }
}
