import { prisma } from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

export default async function NewsletterAdminPage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) redirect("/api/auth/login")

  const dbUser = await prisma.user.findUnique({ where: { kindeId: user.id } })
  if (!dbUser?.isAdmin) redirect("/")

  const subs = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Newsletter Subscribers</h1>
      <ul className="space-y-2">
        {subs.map((s) => (
          <li key={s.id} className="p-3 border rounded-lg bg-card">
            {s.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
