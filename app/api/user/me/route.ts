// app/api/user/me/route.ts
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    // Try finding the user by Kinde ID first
    let dbUser = await prisma.user.findUnique({
      where: { kindeId: user.id },
    });

    // If not found, try by email
    if (!dbUser && user.email) {
      dbUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      // If found by email, link the Kinde ID
      if (dbUser && !dbUser.kindeId) {
        await prisma.user.update({
          where: { id: dbUser.id },
          data: { kindeId: user.id },
        });
      }
    }

    // If still not found, create a new user with a default FREE plan
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          kindeId: user.id,
          email: user.email!,
          name: user.given_name || user.family_name || "Guest",
          image: user.picture || null,
          plan: "FREE", // ✅ default plan
          isAdmin: false,
        },
      });
    } else {
      // Update user info if needed, but don’t overwrite plan/isAdmin
      dbUser = await prisma.user.update({
        where: { id: dbUser.id },
        data: {
          name: user.given_name || user.family_name || dbUser.name,
          image: user.picture || dbUser.image,
          email: user.email || dbUser.email,
        },
      });
    }

    // ✅ Fetch final user data including the plan
    const FINAL_FREE_LIMIT = 5;

    const finalUser = await prisma.user.findUnique({
      where: { id: dbUser.id },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        isAdmin: true,
        plan: true, // ✅ added this
        generationCount: true,
        newsletterSubscribed: true,
      },
    });

    if (!finalUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const generationLimit =
      finalUser.plan === "FREE" ? FINAL_FREE_LIMIT : null;
    const generationCredits =
      finalUser.plan === "FREE"
        ? Math.max(
            0,
            (generationLimit ?? FINAL_FREE_LIMIT) -
              (finalUser.generationCount ?? 0)
          )
        : null;

    return new Response(
      JSON.stringify({
        ...finalUser,
        generationLimit,
        generationCredits,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in /api/user/me:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
