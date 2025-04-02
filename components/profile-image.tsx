"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Shield, Lock, Code, Terminal, Eye, EyeOff, Binary, KeyRound, AlertTriangle } from "lucide-react"
import { toast } from "sonner"

export function ProfileImage() {
  // ... previous state declarations remain the same ...
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [showEnigma, setShowEnigma] = useState(false)
  const [enigmaSolved, setEnigmaSolved] = useState(false)
  const [answer, setAnswer] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [accessDenied, setAccessDenied] = useState(false)
  const maxAttempts = 3

  // Binary message that needs to be decoded (ASCII)
  const binaryMessage = "01010000 01110010 01101111 01100110 01101001 01101100 01100101"

  useEffect(() => {
    const glitchInterval = setInterval(
      () => {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      },
      Math.random() * 5000 + 3000,
    )

    return () => clearInterval(glitchInterval)
  }, [])

  // Matrix rain effect remains the same
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      const scale = window.devicePixelRatio || 1
      canvas.width = 200 * scale
      canvas.height = 200 * scale
      canvas.style.width = "200px"
      canvas.style.height = "200px"
      ctx.scale(scale, scale)
    }

    setCanvasSize()

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    const fontSize = 10
    const columns = canvas.width / fontSize
    const drops: number[] = []
    const colors = ["#3b82f6", "#60a5fa", "#2563eb", "#1d4ed8"]

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * 10) - 10
    }

    const matrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.07)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        const colorIndex = Math.floor(Math.random() * colors.length)
        const opacity = Math.random() * 0.5 + 0.5
        ctx.fillStyle =
          colors[colorIndex] +
          Math.floor(opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.font = `${fontSize}px monospace`
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += Math.random() * 0.5 + 0.5
      }
    }

    const interval = setInterval(matrix, 50)

    return () => clearInterval(interval)
  }, [])

  const simulateHackerEffect = async () => {
    setIsProcessing(true)
    const steps = [
      "Initializing security protocol...",
      "Analyzing binary signature...",
      "Verifying cryptographic hash...",
      "Checking access credentials...",
    ]

    for (const step of steps) {
      toast(step, {
        duration: 1000,
        className: "bg-black/90 border border-blue-500/50 text-blue-400 font-mono text-sm",
      })
      await new Promise((resolve) => setTimeout(resolve, 800))
    }
  }

  const handleEnigmaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await simulateHackerEffect()

    const correctAnswer = "Profile"

    if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      toast.success("ACCESS GRANTED: Identity verification complete", {
        duration: 3000,
        className: "bg-green-900/90 border border-green-500/50 text-green-400 font-mono text-sm",
        icon: <Lock className="w-4 h-4" />,
      })
      setEnigmaSolved(true)
      setAccessDenied(false)
    } else {
      setAttempts((prev) => prev + 1)
      setAccessDenied(true)

      if (attempts + 1 >= maxAttempts) {
        toast.error("SECURITY BREACH DETECTED: Maximum attempts exceeded", {
          duration: 3000,
          className: "bg-red-900/90 border border-red-500/50 text-red-400 font-mono text-sm",
          icon: <AlertTriangle className="w-4 h-4" />,
        })
        setShowEnigma(false)
        setAttempts(0)
      } else {
        toast.error(`ACCESS DENIED: ${maxAttempts - (attempts + 1)} attempts remaining`, {
          duration: 3000,
          className: "bg-red-900/90 border border-red-500/50 text-red-400 font-mono text-sm",
          icon: <AlertTriangle className="w-4 h-4" />,
        })
      }
    }

    setIsProcessing(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-[200px] h-[200px] mx-auto mb-40"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Enhanced Outer Glow */}
      <motion.div
        className="absolute -inset-8 rounded-full bg-blue-500/20 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Rotating Rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute -inset-6 opacity-30"
          style={{
            border: `${1 + i * 0.5}px dashed rgba(59, 130, 246, ${0.3 - i * 0.1})`,
            borderRadius: "50%",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 20 + i * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}

      {/* Security Icons with enhanced animation */}
      <motion.div
        className="absolute -inset-6 opacity-70"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        {[Shield, Lock, Code, Terminal].map((Icon, index) => (
          <motion.div
            key={index}
            className={`absolute ${
              index === 0
                ? "top-0 left-1/2 -translate-x-1/2"
                : index === 1
                  ? "bottom-0 left-1/2 -translate-x-1/2"
                  : index === 2
                    ? "left-0 top-1/2 -translate-y-1/2"
                    : "right-0 top-1/2 -translate-y-1/2"
            }`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.5,
            }}
          >
            <Icon className="w-5 h-5 text-blue-500" />
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Hexagonal Frame */}
      <div ref={frameRef} className="absolute inset-0">
        <div className="w-full h-full relative">
          {/* Outer Hexagon */}
          <motion.div
            className="absolute -inset-2 bg-blue-500"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: glitchActive ? [1, 1.02, 0.98, 1] : 1,
            }}
            transition={{
              opacity: { duration: 2, repeat: Number.POSITIVE_INFINITY },
              scale: { duration: 0.2 },
            }}
          />

          {/* Inner Hexagon */}
          <motion.div
            className="absolute inset-1 bg-black"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            animate={{
              scale: isHovering ? [1, 1.02, 1] : 1,
            }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* Hexagon Border Effect */}
          <motion.div
            className="absolute inset-0 border-2 border-blue-500/50"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        </div>
      </div>

      {/* Profile Image Container */}
      <div
        className="absolute inset-4 overflow-hidden"
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
      >
        <AnimatePresence mode="wait">
          {enigmaSolved ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <Image src="/images/profile-picture.png" alt="Andre Sarr" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10" />
              <Image
                src="/images/profile-picture.png"
                alt="Andre Sarr"
                fill
                className="object-cover grayscale contrast-125 brightness-75 blur-sm"
                priority
              />
              <div className="absolute inset-0 scanlines pointer-events-none opacity-40" />
              <motion.div
                className="absolute inset-0 glitch-effect"
                animate={{
                  x: glitchActive ? [0, -5, 5, -2, 0] : 0,
                  opacity: glitchActive ? [1, 0.8, 1] : 1,
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Matrix Rain Effect */}
      <canvas
        ref={canvasRef}
        className="absolute inset-4 mix-blend-overlay pointer-events-none"
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
      />

      {/* Enigma Interface - Repositioned and Restyled */}
      {/* Enigma Interface - Enhanced with hacker aesthetic */}
      <AnimatePresence>
        {showEnigma && !enigmaSolved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute -bottom-44 left-1/2 transform -translate-x-1/2 w-[300px]"
          >
            <div className="bg-black/90 backdrop-blur-md border border-blue-500/70 p-4 rounded-md shadow-lg shadow-blue-500/20">
              <form onSubmit={handleEnigmaSubmit} className="space-y-4">
                <div className="text-blue-400 font-mono text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Binary className="w-4 h-4" />
                    <span className="flex-1">Decode the binary message:</span>
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="text-xs border border-blue-500/50 px-1.5 py-0.5 rounded"
                    >
                      {attempts}/{maxAttempts}
                    </motion.div>
                  </div>
                  <motion.div
                    className="bg-black/50 p-2 rounded text-xs break-all select-all relative overflow-hidden"
                    animate={
                      accessDenied
                        ? {
                            x: [-2, 2, -2, 0],
                            transition: { duration: 0.3 },
                          }
                        : {}
                    }
                  >
                    {binaryMessage}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                      animate={{
                        x: [-300, 300],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                </div>
                <div className="relative">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) => {
                          setAnswer(e.target.value)
                          setAccessDenied(false)
                        }}
                        placeholder="Enter decoded message"
                        className={`w-full px-3 py-1.5 bg-gray-900 border text-blue-400 rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 font-mono ${
                          accessDenied
                            ? "border-red-500/50 focus:ring-red-500/20"
                            : "border-blue-500/30 focus:ring-blue-500/50"
                        }`}
                        disabled={isProcessing}
                      />
                      <AnimatePresence>
                        {isProcessing && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                            style={{
                              animation: "scanning 1.5s linear infinite",
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={`px-3 py-1.5 border rounded-md transition-colors duration-200 relative overflow-hidden ${
                        isProcessing
                          ? "border-yellow-500/50 text-yellow-400"
                          : accessDenied
                            ? "border-red-500/50 text-red-400 hover:bg-red-500/10"
                            : "border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {isProcessing ? (
                          <motion.div
                            key="processing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <Terminal className="w-4 h-4" />
                            </motion.div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="submit"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <KeyRound className="w-4 h-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                  {accessDenied && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-6 left-0 right-0 text-center text-red-400 text-xs font-mono"
                    >
                      Invalid decryption key
                    </motion.div>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reveal/Hide Button - Adjusted Position */}
      {!enigmaSolved ? (
        <motion.button
          onClick={() => setShowEnigma(true)}
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 rounded-md text-blue-400 text-sm transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Eye className="w-4 h-4" />
          <span>Reveal Identity</span>
        </motion.button>
      ) : (
        <motion.button
          onClick={() => {
            setEnigmaSolved(false)
            setShowEnigma(false)
            setAnswer("")
            setAttempts(0)
          }}
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 rounded-md text-blue-400 text-sm transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <EyeOff className="w-4 h-4" />
          <span>Hide Identity</span>
        </motion.button>
      )}
    </motion.div>
  )
}
