"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  velocity: { x: number; y: number }
}

interface Line {
  start: Star
  end: Star
  alpha: number
}

export function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const linesRef = useRef<Line[]>([])
  const blackHoleRef = useRef({ x: 0, y: 0, size: 50 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      starsRef.current = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
        },
      }))
      blackHoleRef.current = {
        x: canvas.width * 0.8,
        y: canvas.height * 0.2,
        size: 50,
      }
    }

    const updateStars = () => {
      const stars = starsRef.current
      const blackHole = blackHoleRef.current

      stars.forEach((star) => {
        // Black hole influence
        const dx = blackHole.x - star.x
        const dy = blackHole.y - star.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const force = 0.5 / (distance * distance)

        star.velocity.x += dx * force
        star.velocity.y += dy * force

        // Update position
        star.x += star.velocity.x
        star.y += star.velocity.y

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width
        if (star.x > canvas.width) star.x = 0
        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0
      })

      // Update lines
      linesRef.current = []
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const distance = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y)
          if (distance < 100) {
            linesRef.current.push({
              start: stars[i],
              end: stars[j],
              alpha: 1 - distance / 100,
            })
          }
        }
      }
    }

    const draw = () => {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      starsRef.current.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(135, 206, 235, 0.8)"
        ctx.fill()
      })

      // Draw lines
      linesRef.current.forEach((line) => {
        ctx.beginPath()
        ctx.moveTo(line.start.x, line.start.y)
        ctx.lineTo(line.end.x, line.end.y)
        ctx.strokeStyle = `rgba(135, 206, 235, ${line.alpha * 0.5})`
        ctx.stroke()
      })

      // Draw black hole
      const blackHole = blackHoleRef.current
      const gradient = ctx.createRadialGradient(blackHole.x, blackHole.y, 0, blackHole.x, blackHole.y, blackHole.size)
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(blackHole.x, blackHole.y, blackHole.size, 0, Math.PI * 2)
      ctx.fill()
    }

    const animate = () => {
      updateStars()
      draw()
      requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />
}

