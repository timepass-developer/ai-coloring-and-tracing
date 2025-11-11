import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🔹 Find user in your DB using kindeId
    const dbUser = await prisma.user.findUnique({
      where: { kindeId: user.id },
    });

    if (!dbUser) {
      return Response.json({ error: "User not found in database" }, { status: 404 });
    }

    // ✅ Use internal user ID for relations
    const userId = dbUser.id;

    // ✅ Upsert newsletter subscriber
    await prisma.newsletterSubscriber.upsert({
      where: { userId },
      update: { email },
      create: { userId, email },
    });


    // ✅ Mark user as subscribed
    await prisma.user.update({
      where: { id: userId },
      data: { newsletterSubscribed: true },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return Response.json({ error: "Subscription failed" }, { status: 500 });
  }
}
