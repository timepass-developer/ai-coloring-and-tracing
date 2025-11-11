import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ unwrap the params
  try {
    const result = await requireAdmin();
    if ("response" in result) {
      return result.response;
    }

    const { prisma } = result.context;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    console.error("GET /api/admin/users/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ fix here too
  try {
    const result = await requireAdmin();
    if ("response" in result) {
      return result.response;
    }

    const { prisma } = result.context;

    const body = await req.json();
    const { name, email, plan, isAdmin } = body;

    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: name ?? existingUser.name,
        email: email ?? existingUser.email,
        plan: plan ?? existingUser.plan,
        isAdmin: typeof isAdmin === "boolean" ? isAdmin : existingUser.isAdmin,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("PUT /api/admin/users/[id] error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ also fix here
  try {
    const result = await requireAdmin();
    if ("response" in result) {
      return result.response;
    }

    const { prisma } = result.context;

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/admin/users/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
