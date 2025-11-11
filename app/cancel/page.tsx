"use client"

import Link from "next/link"
import { XCircle } from "lucide-react"

export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-gray-800 px-4">
      <XCircle className="h-16 w-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold text-red-600 mb-2">
        Payment Cancelled
      </h1>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Your payment was not completed. You can try again anytime.
      </p>
      <Link
        href="/"
        className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  )
}
