"use client"

import { useState, useEffect } from "react"
import SplashScreen from "@/components/splash-screen"
import HomePage from "@/components/home-page"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('kiwiz-has-visited')
    
    if (hasVisited) {
      // User has visited before, skip splash screen
      setShowSplash(false)
      setIsLoading(false)
    } else {
      // First time visitor, show splash screen
      const timer = setTimeout(() => {
        setShowSplash(false)
        setIsLoading(false)
        // Mark that user has visited
        localStorage.setItem('kiwiz-has-visited', 'true')
      }, 3000) // Show splash for 3 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  if (isLoading) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <main className="min-h-screen">
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <HomePage />
      )}
    </main>
  )
}
