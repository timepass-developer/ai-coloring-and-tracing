"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface TracingCanvasProps {
  content: string
}

export default function TracingCanvas({ content }: TracingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isClearing, setIsClearing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Make the canvas responsive
    const resizeCanvas = () => {
      const width = Math.min(window.innerWidth * 0.8, 400)
      const height = width * 0.8
      canvas.width = width
      canvas.height = height
      drawTemplate(ctx, content)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [content])

  const drawTemplate = (ctx: CanvasRenderingContext2D, text: string) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.font = `${ctx.canvas.width / 2.5}px Arial`
    ctx.strokeStyle = "#e0e0e0"
    ctx.lineWidth = 3
    ctx.setLineDash([8, 8])
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.strokeText(text, ctx.canvas.width / 2, ctx.canvas.height / 2)
    ctx.setLineDash([])
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

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
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

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
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
    drawTemplate(ctx, content)

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
