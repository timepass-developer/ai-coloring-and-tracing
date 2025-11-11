import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SuccessPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  // ✅ Update plan to PREMIUM
  await prisma.user.update({
    where: { kindeId: user.id },
    data: { plan: "PREMIUM" },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-orange-100 to-yellow-100">
      <h1 className="text-4xl font-bold text-orange-700 mb-4">
        ✅ Payment Successful!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Your plan has been upgraded to <b>Premium</b>.
      </p>
      <Link
        href="/"
        className="text-blue-600 underline hover:text-blue-800 transition-all"
      >
        Go to Home
      </Link>
    </div>
  );
}
