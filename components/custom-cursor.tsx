"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState<"default" | "link" | "button">("default")
  const [isGlitching, setIsGlitching] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show cursor after a small delay to prevent initial position jump
    const timer = setTimeout(() => setIsVisible(true), 100)

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "A") {
        setCursorVariant("link")
      } else if (target.tagName === "BUTTON" || target.closest("button")) {
        setCursorVariant("button")
      } else {
        setCursorVariant("default")
      }
    }

    // Trigger random glitch effects
    const glitchInterval = setInterval(
      () => {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 150)
      },
      Math.random() * 5000 + 3000,
    )

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mouseover", handleMouseOver)
    document.body.style.cursor = "none"

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseover", handleMouseOver)
      document.body.style.cursor = "auto"
      clearInterval(glitchInterval)
      clearTimeout(timer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 24, // Increased size, so adjusted position
          y: mousePosition.y - 24,
          scale: cursorVariant !== "default" ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.6,
          stiffness: 200,
          damping: 20,
        }}
      >
        {/* Outer glow for better visibility */}
        <motion.div
          className="absolute inset-0 rounded-full blur-md"
          style={{
            background: isGlitching
              ? "radial-gradient(circle, rgba(34,211,238,0.3) 0%, rgba(34,211,238,0) 70%)"
              : "radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(59,130,246,0) 70%)",
            width: "64px",
            height: "64px",
            transform: "translate(-8px, -8px)",
          }}
          animate={{
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Outer ring */}
        <motion.div
          className="relative w-12 h-12" // Increased from w-8 h-8
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className={`w-full h-full ${
              isGlitching ? "text-cyan-400" : "text-blue-400"
            } transition-colors duration-150 drop-shadow-[0_0_3px_rgba(59,130,246,0.8)]`}
          >
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="3" // Increased from 2
              strokeDasharray="0 283"
              animate={{
                strokeDasharray: cursorVariant !== "default" ? "283 283" : "80 283", // Increased from 40
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Additional decorative elements */}
            <motion.circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.5"
              strokeDasharray="30 30"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </svg>
        </motion.div>

        {/* Inner cursor */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5" // Increased from w-2 h-2
          animate={{
            scale: cursorVariant !== "default" ? [1, 1.5, 1] : [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className={`w-full h-full rounded-full ${
              isGlitching ? "bg-cyan-400" : "bg-blue-400"
            } transition-colors duration-150 shadow-[0_0_10px_rgba(59,130,246,0.8)]`}
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Text indicator for links/buttons */}
        <AnimatePresence>
          {cursorVariant !== "default" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs font-medium"
            >
              <span
                className={`px-2 py-0.5 rounded-full ${
                  isGlitching ? "bg-cyan-500/20 text-cyan-400" : "bg-blue-500/20 text-blue-400"
                } border border-current`}
              >
                {cursorVariant === "link" ? "Link" : "Button"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced trailing effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: "spring",
          mass: 0.6,
          stiffness: 100,
          damping: 15,
          restDelta: 0.001,
        }}
      >
        <motion.div
          className={`w-10 h-10 rounded-full ${
            isGlitching ? "bg-cyan-400" : "bg-blue-400"
          } transition-colors duration-150 opacity-30 blur-md`}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Secondary trail for more visibility */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring",
          mass: 0.5,
          stiffness: 80,
          damping: 15,
          restDelta: 0.001,
        }}
      >
        <motion.div
          className={`w-8 h-8 rounded-full ${
            isGlitching ? "bg-cyan-500" : "bg-blue-500"
          } transition-colors duration-150 opacity-20 blur-md`}
          animate={{
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.div>

      {/* Enhanced glitch effects */}
      <AnimatePresence>
        {isGlitching && (
          <>
            {[...Array(5)].map(
              (
                _,
                i, // Increased from 3 to 5 elements
              ) => (
                <motion.div
                  key={i}
                  className="fixed top-0 left-0 pointer-events-none z-[9997]"
                  initial={{ opacity: 0 }}
                  animate={{
                    x: mousePosition.x - 20 + (Math.random() * 20 - 10), // Increased range
                    y: mousePosition.y - 20 + (Math.random() * 20 - 10),
                    opacity: [0, 0.7, 0], // Increased from 0.5
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.15,
                    delay: i * 0.05,
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-cyan-400 opacity-40 blur-md shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                </motion.div>
              ),
            )}

            {/* Add digital glitch lines */}
            <motion.div
              className="fixed top-0 left-0 pointer-events-none z-[9996] w-20 h-1 bg-cyan-400"
              initial={{ opacity: 0 }}
              animate={{
                x: mousePosition.x - 10,
                y: mousePosition.y,
                opacity: [0, 0.8, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            />
            <motion.div
              className="fixed top-0 left-0 pointer-events-none z-[9996] w-1 h-20 bg-cyan-400"
              initial={{ opacity: 0 }}
              animate={{
                x: mousePosition.x,
                y: mousePosition.y - 10,
                opacity: [0, 0.8, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1, delay: 0.05 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Particle effects for more visibility */}
      {cursorVariant !== "default" && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="fixed top-0 left-0 pointer-events-none z-[9995]"
              animate={{
                x: mousePosition.x + Math.cos(i * 60 * (Math.PI / 180)) * 20,
                y: mousePosition.y + Math.sin(i * 60 * (Math.PI / 180)) * 20,
                opacity: [0.2, 0.5, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            >
              <div
                className={`w-1 h-1 rounded-full ${
                  isGlitching ? "bg-cyan-400" : "bg-blue-400"
                } shadow-[0_0_5px_currentColor]`}
              />
            </motion.div>
          ))}
        </>
      )}
    </>
  )
}

