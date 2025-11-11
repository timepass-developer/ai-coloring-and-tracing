"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, User, X, Shield } from "lucide-react"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslations } from "@/hooks/use-translations"

interface MobileHeaderProps {
  onMenuToggle: () => void
  isMenuOpen: boolean
}

interface CurrentUser {
  id: string
  email: string
  name?: string
  isAdmin?: boolean
}

export default function MobileHeader({ onMenuToggle, isMenuOpen }: MobileHeaderProps) {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient()
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const { t, isLoading: isLoadingTranslations } = useTranslations()

  // ✅ Fetch user info from backend (to check admin)
  useEffect(() => {
    if (!isAuthenticated) return

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/me")
        if (!res.ok) return
        const data = await res.json()
        console.log("Fetched user:", data)

        const formattedUser = data.user ? data.user : data
        setCurrentUser(formattedUser)
      } catch (err) {
        console.error("Failed to fetch current user:", err)
      } finally {
        setLoadingUser(false)
      }
    }

    fetchUser()
  }, [isAuthenticated])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="relative flex items-center justify-between px-4 md:px-6 py-3 h-16">
        {/* Left: Sidebar Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="text-foreground hover:bg-muted/50 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Center: Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform hover:scale-[1.03]"
          >
            <span className="text-xl font-extrabold text-primary group-hover:text-primary/80 tracking-wide">
              Kiwiz
            </span>
          </Link>
        </div>

        {/* Right: Language Switcher & User / Admin Controls */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : isAuthenticated ? (
            <>
              {/* ✅ Admin Panel Button - Highlighted */}
              {!loadingUser && currentUser?.isAdmin && (
                <Link href="/admin">
                  <Button
                    variant="default"
                    size="sm"
                    className="text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1 transition-all"
                  >
                    <Shield className="w-4 h-4" />
                    {isLoadingTranslations ? "Admin" : t('admin.title')}
                  </Button>
                </Link>
              )}

              {/* ✅ Simple clean User icon */}
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-0 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                </Button>
              </Link>
            </>
          ) : (
            // Not logged in → Show Login
            <LoginLink postLoginRedirectURL="/dashboard">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-muted/50 transition-colors"
              >
                <User className="h-6 w-6" />
              </Button>
            </LoginLink>
          )}
        </div>
      </div>
    </header>
  )
}
