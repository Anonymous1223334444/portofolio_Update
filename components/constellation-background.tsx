"use client"

import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
  vx: number
  vy: number
}

interface ConstellationBackgroundProps {
  opacity?: number
}

export function ConstellationBackground({ opacity = 0.8 }: ConstellationBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size based on container
    const resizeCanvas = () => {
      const scale = window.devicePixelRatio || 1
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width * scale
      canvas.height = rect.height * scale
      ctx.scale(scale, scale)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    resizeCanvas()
    const resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(container)
    window.addEventListener("resize", resizeCanvas)

    // Configuration
    const particleCount = 100
    const connectionDistance = 150
    const particleSize = 2
    const particleSpeed = 0.5
    const particles: Point[] = []

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const rect = container.getBoundingClientRect()
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * particleSpeed,
        vy: (Math.random() - 0.5) * particleSpeed,
      })
    }

    let animationFrameId: number

    // Animation function
    const animate = () => {
      const rect = container.getBoundingClientRect()
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > rect.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > rect.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(59, 130, 246, 0.5)"
        ctx.fill()

        // Connect nearby particles
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${((connectionDistance - distance) / connectionDistance) * 0.2})`
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      resizeObserver.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

