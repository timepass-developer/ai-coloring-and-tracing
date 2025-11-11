"use client"

import { useEffect, useState } from "react"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-muted to-background flex items-center justify-center overflow-hidden">
      {/* Floating decorative elements */}
      <div
        className="absolute top-20 left-10 w-16 h-16 bg-accent rounded-full animate-float opacity-60"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute top-32 right-16 w-12 h-12 bg-secondary rounded-full animate-float opacity-70"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-40 left-20 w-20 h-20 bg-primary/30 rounded-full animate-float opacity-50"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-20 right-10 w-14 h-14 bg-accent/60 rounded-full animate-float opacity-60"
        style={{ animationDelay: "0.5s" }}
      />

      {/* Letter decorations */}
      <div
        className="absolute top-16 right-32 text-6xl font-bold text-primary/40 animate-bounce-gentle"
        style={{ animationDelay: "1.5s" }}
      >
        A
      </div>
      <div
        className="absolute bottom-32 left-16 text-5xl font-bold text-secondary/50 animate-bounce-gentle"
        style={{ animationDelay: "2.5s" }}
      >
        Z
      </div>

      {/* Main content */}
      <div className="text-center z-10">
        <h1 className="text-8xl font-bold text-primary mb-8 animate-pulse-glow">Kiwiz</h1>

        <div className="w-64 h-2 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-lg text-muted-foreground font-medium">Loading magical activities...</p>
      </div>

      {/* Sparkle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full animate-ping opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
