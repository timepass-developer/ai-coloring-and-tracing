"use client"

import React from "react"
import BottomNav from "@/components/ui/BottomNav"
import NewsletterPrompt from "@/components/NewsletterPrompt"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NewsletterPrompt />
      <BottomNav />
    </>
  )
}
