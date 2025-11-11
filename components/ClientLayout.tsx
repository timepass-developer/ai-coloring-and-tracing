"use client"

import React from "react"
import BottomNav from "@/components/ui/BottomNav"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  )
}
