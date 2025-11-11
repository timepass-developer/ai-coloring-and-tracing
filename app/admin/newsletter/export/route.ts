import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await requireAdmin();

  if ("context" in result && result.context) {
    const { prisma } = result.context;

    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
    });

    const csvRows = ["email,createdAt,userId"];

    for (const subscriber of subscribers) {
      const email = subscriber.email.replace(/"/g, '""');
      const createdAt = subscriber.createdAt.toISOString();
      const userId = subscriber.userId ?? "";
      csvRows.push(`"${email}","${createdAt}","${userId}"`);
    }

    const csvContent = csvRows.join("\r\n");
    const filename = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csvContent, {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="${filename}"`,
      },
    });
  }

  return result.response;
}
