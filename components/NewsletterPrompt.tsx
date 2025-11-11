"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Sparkles, Mail } from "lucide-react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslations } from "@/hooks/use-translations"
import { useToast } from "@/components/ui/use-toast"

export const LOCAL_STORAGE_SUBSCRIBED_KEY = "kiwiz-newsletter-subscribed"
export const LOCAL_STORAGE_DISMISSED_KEY = "kiwiz-newsletter-dismissed-until"
const DISMISS_DURATION_MS = 1000 * 60 * 60 * 6 // 6 hours
const PROMPT_DELAY_MS = 10_000

function markSubscribedLocally() {
  try {
    if (typeof window === "undefined") return
    window.localStorage.setItem(LOCAL_STORAGE_SUBSCRIBED_KEY, "true")
    window.localStorage.removeItem(LOCAL_STORAGE_DISMISSED_KEY)
    window.dispatchEvent(new Event("newsletterSubscribed"))
  } catch (error) {
    console.warn("Unable to persist newsletter subscription flag", error)
  }
}

function markDismissedTemporarily() {
  try {
    if (typeof window === "undefined") return
    const nextAllowed = Date.now() + DISMISS_DURATION_MS
    window.localStorage.setItem(LOCAL_STORAGE_DISMISSED_KEY, String(nextAllowed))
  } catch (error) {
    console.warn("Unable to persist newsletter dismissal", error)
  }
}

async function resolveRemoteSubscription(): Promise<boolean> {
  try {
    const response = await fetch("/api/user/me", {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return false
    }

    const data = await response.json()
    if (data?.newsletterSubscribed) {
      markSubscribedLocally()
      return true
    }
  } catch (error) {
    console.warn("Unable to determine remote newsletter subscription", error)
  }

  return false
}

export default function NewsletterPrompt() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isChecking, setIsChecking] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const closeIntentRef = useRef<"dismiss" | "subscribed">("dismiss")
  const { t, isLoading } = useTranslations()
  const { toast } = useToast()

  const placeholderText = useMemo(
    () => (isLoading ? "Enter your email" : t("newsletterPrompt.emailPlaceholder")),
    [isLoading, t]
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleExternalSubscription = () => {
      closeIntentRef.current = "subscribed"
      setOpen(false)
    }

    window.addEventListener("newsletterSubscribed", handleExternalSubscription)
    return () => {
      window.removeEventListener("newsletterSubscribed", handleExternalSubscription)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const alreadySubscribed = window.localStorage.getItem(LOCAL_STORAGE_SUBSCRIBED_KEY) === "true"
    const dismissedUntil = Number(window.localStorage.getItem(LOCAL_STORAGE_DISMISSED_KEY) ?? "0")

    if (alreadySubscribed || dismissedUntil > Date.now()) {
      setIsChecking(false)
      return
    }

    const timer = window.setTimeout(async () => {
      const resolved = await resolveRemoteSubscription()
      if (!resolved) {
        setOpen(true)
      }
      setIsChecking(false)
    }, PROMPT_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [])

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      if (closeIntentRef.current === "dismiss") {
        markDismissedTemporarily()
      }
      setOpen(false)
      return
    }

    closeIntentRef.current = "dismiss"
    setOpen(true)
  }

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email) {
      toast({
        title: isLoading ? "Email required" : t("newsletterPrompt.missingEmail"),
        description: isLoading ? "Please enter your email to subscribe." : t("newsletterPrompt.missingEmailDescription"),
        variant: "error",
      })
      return
    }

    try {
      setIsSubmitting(true)
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.error ?? "Subscription failed")
      }

      markSubscribedLocally()
      closeIntentRef.current = "subscribed"
      setOpen(false)
      setEmail("")

      toast({
        title: isLoading ? "Subscribed" : t("newsletterPrompt.successTitle"),
        description: isLoading ? "You now have extra image tokens!" : t("newsletterPrompt.successDescription"),
        variant: "success",
      })
    } catch (error: any) {
      toast({
        title: isLoading ? "Subscription failed" : t("newsletterPrompt.errorTitle"),
        description:
          error?.message ??
          (isLoading ? "Please try again." : t("newsletterPrompt.errorDescription")),
        variant: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isChecking) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md border-orange-200 bg-white/95" showCloseButton={false}>
        <DialogHeader className="items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <Sparkles className="h-6 w-6" />
          </div>
          <DialogTitle className="text-2xl font-bold text-orange-600">
            {isLoading ? "Unlock Bonus Tokens" : t("newsletterPrompt.title")}
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            {isLoading
              ? "Subscribe to our parenting newsletter and earn extra image generation credits."
              : t("newsletterPrompt.description")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubscribe} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="newsletter-email">
              {isLoading ? "Email address" : t("newsletterPrompt.emailLabel")}
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                id="newsletter-email"
                type="email"
                value={email}
                placeholder={placeholderText}
                onChange={(event) => setEmail(event.target.value)}
                disabled={isSubmitting}
                className="flex-1 border-orange-200 focus-visible:ring-orange-400"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 whitespace-nowrap rounded-full bg-orange-500 text-white hover:bg-orange-600 sm:flex-none"
              >
                {isSubmitting
                  ? isLoading
                    ? "Subscribing..."
                    : t("newsletterPrompt.subscribing")
                  : isLoading
                    ? "Subscribe"
                    : t("newsletterPrompt.subscribeButton")}
              </Button>
            </div>
          </div>
        </form>

        <div className="flex flex-col items-center gap-4 text-xs text-slate-500 sm:flex-row sm:justify-between sm:text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <Mail className="h-4 w-4 text-orange-500" />
            <span>
              {isLoading
                ? "Weekly tips. Unsubscribe anytime."
                : t("newsletterPrompt.privacy")}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              closeIntentRef.current = "dismiss"
              setOpen(false)
            }}
            className="font-medium text-orange-500 transition hover:text-orange-600"
          >
            {isLoading ? "Maybe later" : t("newsletterPrompt.maybeLater")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
