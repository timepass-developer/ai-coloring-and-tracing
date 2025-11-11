"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Sparkles, BookOpen, User } from "lucide-react" // changed Compass → BookOpen
import { cn } from "@/lib/utils"

const navItems = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "create", label: "Create", icon: Sparkles, href: "/create" },
  // 🔽 Updated Discover tab to go directly to the Parenting Newsletter
  { id: "discover", label: "Discover", icon: BookOpen, href: "/parenting-newsletter" },
  { id: "profile", label: "Profile", icon: User, href: "/dashboard" },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/80 backdrop-blur-lg md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full py-1 transition-all duration-200",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "scale-110")} />
              <span className="text-[11px] font-medium mt-0.5">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
