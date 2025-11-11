import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function NewsletterAdminPage() {
  const result = await requireAdmin();

  if ("context" in result && result.context) {
    const { prisma } = result.context;

    const subs = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
    });

    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Newsletter Subscribers</h1>
        <ul className="space-y-2">
          {subs.map((subscriber) => (
            <li key={subscriber.id} className="p-3 border rounded-lg bg-card">
              {subscriber.email}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (result.response.status === 401) {
    redirect("/api/auth/login");
  }

  redirect("/");
}