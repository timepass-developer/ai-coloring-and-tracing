"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { X, CheckCircle, AlertTriangle, Info, AlertOctagon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Toast {
  id: number
  title: string
  description?: string
  variant?: "default" | "success" | "error" | "info" | "destructive"
}

interface ToastContextType {
  toast: (toast: Omit<Toast, "id">) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProviderWrapper")
  }
  return context
}

// ✅ Main Provider Wrapper — wrap app in layout.tsx
export function ToastProviderWrapper({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (newToast: Omit<Toast, "id">) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, ...newToast }])

    // Auto-remove after 4s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* ✅ Toast container */}
      <div className="fixed bottom-4 right-4 z-[1000] flex flex-col gap-3">
        {toasts.map((t) => {
          let bg = "bg-background border-border text-foreground"
          let Icon = Info

          switch (t.variant) {
            case "success":
              bg = "bg-green-100 border-green-300 text-green-800"
              Icon = CheckCircle
              break
            case "error":
              bg = "bg-red-100 border-red-300 text-red-800"
              Icon = AlertOctagon
              break
            case "info":
              bg = "bg-blue-100 border-blue-300 text-blue-800"
              Icon = Info
              break
            case "destructive":
              bg = "bg-orange-100 border-orange-300 text-orange-800"
              Icon = AlertTriangle
              break
          }

          return (
            <div
              key={t.id}
              className={cn(
                "rounded-lg border shadow-lg p-4 w-80 flex items-start gap-3 transition-all animate-in fade-in slide-in-from-bottom-2",
                bg
              )}
            >
              <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold">{t.title}</h4>
                {t.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
