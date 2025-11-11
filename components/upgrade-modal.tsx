"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Sparkles, Crown, X } from "lucide-react"
import { motion } from "framer-motion"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useTranslations } from "@/hooks/use-translations"

interface UpgradeModalProps {
  open: boolean
  onClose: () => void
}

export default function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  const router = useRouter()
  const { t, isLoading } = useTranslations()

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* Overlay — stays fixed, allows background scroll */}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
          style={{ pointerEvents: "none" }}
        />

        {/* Fixed Modal (centered, non-scrollable) */}
        <DialogContent
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          sm:max-w-md w-[90%] p-0 rounded-2xl border border-yellow-200 
          shadow-2xl backdrop-blur-xl bg-gradient-to-br from-white/90 to-yellow-50/80 
          z-[70] focus:outline-none"
          style={{
            position: "fixed",
            transform: "translate(-50%, -50%)",
            overflow: "visible",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full hover:bg-yellow-100 transition"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>

          <DialogHeader className="flex flex-col items-center p-6 pb-3">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-lg mb-4"
            >
              <Crown className="h-10 w-10 text-white" />
            </motion.div>

            <DialogTitle className="text-2xl font-bold text-yellow-600">
              {isLoading ? "Free Limit Reached" : t('upgradeModal.title')}
            </DialogTitle>

            <DialogDescription className="text-gray-700 text-sm mt-2 max-w-sm text-center">
              {isLoading ? "You've used your 5 free generations. Upgrade to Premium for unlimited coloring, tracing, and creative fun!" : t('upgradeModal.description')}
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-4">
            <div className="bg-yellow-100/70 rounded-xl p-4 text-left space-y-2 border border-yellow-200">
              {!isLoading && [
                t('upgradeModal.feature1'),
                t('upgradeModal.feature2'),
                t('upgradeModal.feature3'),
              ].map((text, i) => (
                <p key={i} className="flex items-center gap-2 text-sm text-gray-800">
                  <Sparkles className="h-4 w-4 text-yellow-500" /> {text}
                </p>
              ))}
              {isLoading && [
                "Unlimited AI generations",
                "Access to premium templates",
                "Priority generation speed",
              ].map((text, i) => (
                <p key={i} className="flex items-center gap-2 text-sm text-gray-800">
                  <Sparkles className="h-4 w-4 text-yellow-500" /> {text}
                </p>
              ))}
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row justify-center gap-3 px-6 pb-6">
            <Button
              onClick={() => router.push("/membership")}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 text-white font-semibold h-12 rounded-xl transition"
            >
              {isLoading ? "Upgrade Now" : t('upgradeModal.upgradeButton')}
            </Button>

            <Button
              variant="outline"
              onClick={onClose}
              className="w-full border-yellow-300 text-yellow-700 hover:bg-yellow-50 h-12 rounded-xl"
            >
              {isLoading ? "Maybe Later" : t('upgradeModal.laterButton')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPrimitive.Portal>
    </Dialog>
  )
}
