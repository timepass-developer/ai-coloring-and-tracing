"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { drawTracingTemplate } from "@/lib/tracing-renderer"

interface TracingCanvasProps {
  content: string
}

export default function TracingCanvas({ content }: TracingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 360, height: 280 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const determineDimensions = () => {
      const baseWidth = Math.min(window.innerWidth * 0.9, 480)
      const baseHeight = baseWidth * 0.75
      setCanvasDimensions({ width: baseWidth, height: baseHeight })
      redrawTemplate(canvas, content, baseWidth, baseHeight)
    }

    determineDimensions()
    window.addEventListener("resize", determineDimensions)
    return () => window.removeEventListener("resize", determineDimensions)
  }, [content])

  const redrawTemplate = (
    canvas: HTMLCanvasElement,
    text: string,
    width: number,
    height: number
  ) => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const scale = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1

    canvas.width = Math.round(width * scale)
    canvas.height = Math.round(height * scale)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(scale, scale)

    drawTracingTemplate(ctx, text, { width, height })
  }

  const getPosition = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect()
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
  }

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { x, y } = getPosition(e, canvas)
    setIsDrawing(true)

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.strokeStyle = "#4f46e5"
    ctx.lineWidth = 4
    ctx.lineCap = "round"
  }

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { x, y } = getPosition(e, canvas)
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => setIsDrawing(false)

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    setIsClearing(true)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    redrawTemplate(canvas, content, canvasDimensions.width, canvasDimensions.height)

    setTimeout(() => setIsClearing(false), 300)
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full">
      <div className="relative flex justify-center items-center w-full">
        <canvas
          ref={canvasRef}
          className="border-2 border-orange-300 rounded-lg bg-white cursor-crosshair touch-none shadow-md transition-transform duration-200 hover:scale-[1.02]"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <Button
        onClick={clearCanvas}
        variant="outline"
        size="sm"
        disabled={isClearing}
        className={`flex items-center justify-center text-muted-foreground hover:text-foreground bg-transparent border-orange-300 transition-all duration-200 ${
          isClearing ? "animate-pulse" : ""
        }`}
      >
        <RotateCcw className={`w-4 h-4 mr-2 ${isClearing ? "animate-spin" : ""}`} />
        {isClearing ? "Clearing..." : "Clear & Try Again"}
      </Button>
    </div>
  )
}
