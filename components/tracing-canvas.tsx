"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface TracingCanvasProps {
  content: string
  imageUrl?: string
}

export default function TracingCanvas({ content, imageUrl }: TracingCanvasProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [displayUrl, setDisplayUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!imageUrl || imageUrl.includes("/placeholder.svg")) {
      setImageLoaded(false)
      setImageError(false)
      setDisplayUrl(null)
      return
    }

    // Validate and set image URL
    setImageError(false)
    setImageLoaded(false)
    setDisplayUrl(imageUrl)
  }, [imageUrl])

  const handleImageLoad = () => {
    setImageLoaded(true)
    setImageError(false)
  }

  const handleImageError = () => {
    console.error("Failed to load image:", displayUrl)
    setImageError(true)
    setImageLoaded(false)
  }

  // If no image URL or it's a placeholder, show nothing or a placeholder message
  if (!displayUrl || displayUrl.includes("/placeholder.svg")) {
    return (
      <div className="flex items-center justify-center w-full min-h-[280px] bg-gray-100 rounded-lg border-2 border-orange-300">
        <p className="text-gray-500 text-center px-4">
          {content ? `Tracing content: ${content}` : "No image available"}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative flex justify-center items-center w-full max-w-full">
        {imageError ? (
          <div className="flex items-center justify-center w-full min-h-[280px] bg-gray-100 rounded-lg border-2 border-orange-300">
            <p className="text-gray-500 text-center px-4">
              Failed to load image. Please try again.
            </p>
          </div>
        ) : (
          <img
            src={displayUrl}
            alt={content || "Tracing worksheet"}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`max-w-full h-auto object-contain rounded-lg border-2 border-orange-300 shadow-md transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              maxHeight: "600px",
              width: "auto",
            }}
          />
        )}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg border-2 border-orange-300">
            <div className="text-gray-500">Loading image...</div>
          </div>
        )}
      </div>
    </div>
  )
}
