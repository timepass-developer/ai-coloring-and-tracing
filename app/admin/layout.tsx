import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/admin/AdminSidebar";
import BottomNav from "@/components/ui/BottomNav";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) redirect("/api/auth/login");

  const dbUser = await prisma.user.findFirst({
    where: { OR: [{ email: user.email! }, { kindeId: user.id }] },
    select: { isAdmin: true },
  });

  if (!dbUser?.isAdmin) redirect("/");

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <div className="flex flex-1">
        {/* Sidebar (fixed on left) */}
        <AdminSidebar />

        {/* Main content area */}
        <main className="flex-1 ml-48 p-6 pb-24 overflow-y-auto">{children}</main>
      </div>

      {/* ✅ Fixed BottomNav covering background */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg">
        <div className="absolute inset-0 bg-background" /> {/* Solid background cover */}
        <div className="relative z-10">
          <BottomNav />
        </div>
      </footer>
    </div>
  );
}
