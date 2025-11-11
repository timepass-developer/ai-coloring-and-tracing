// app/admin/users/api/route.ts
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  try {
    const result = await requireAdmin();
    if ("response" in result) {
      return result.response;
    }

    const { prisma } = result.context;

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("GET /api/admin/users error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const result = await requireAdmin();
    if ("response" in result) {
      return result.response;
    }

    const { prisma } = result.context;

    const body = await req.json();
    const { kindeId, email, name, image, plan, isAdmin } = body;

    if (!email || !kindeId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        kindeId,
        email,
        name,
        image,
        plan: plan || "FREE",
        isAdmin: isAdmin ?? false,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/users error:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
