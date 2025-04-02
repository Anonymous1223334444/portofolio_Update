"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TypewriterProps {
  words: string[]
  className?: string
  speed?: number
  delay?: number
}

export function TypewriterEffect({ words, className = "", speed = 100, delay = 1500 }: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [glitchActive, setGlitchActive] = useState(false)

  // Ref to track if component is mounted
  const isMounted = useRef(true)

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      if (isMounted.current) {
        setCursorVisible((prev) => !prev)
      }
    }, 500)

    return () => {
      clearInterval(cursorInterval)
      isMounted.current = false
    }
  }, [])

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.85 && isMounted.current) {
        setGlitchActive(true)
        setTimeout(() => {
          if (isMounted.current) {
            setGlitchActive(false)
          }
        }, 150)
      }
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [])

  // Typing effect
  useEffect(() => {
    const currentWord = words[currentWordIndex]

    const timeout = setTimeout(
      () => {
        if (!isMounted.current) return

        if (!isDeleting) {
          // Typing - add a slight randomness to typing speed for more natural effect
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.substring(0, currentText.length + 1))
          } else {
            // Pause at end of word
            setTimeout(() => {
              if (isMounted.current) {
                setIsDeleting(true)
              }
            }, delay)
          }
        } else {
          // Deleting - slightly faster than typing
          if (currentText.length > 0) {
            setCurrentText(currentWord.substring(0, currentText.length - 1))
          } else {
            setIsDeleting(false)
            setCurrentWordIndex((currentWordIndex + 1) % words.length)
          }
        }
      },
      isDeleting ? speed / 1.5 : speed + (Math.random() * 40 - 20), // Add slight randomness to typing speed
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentWordIndex, isDeleting, words, speed, delay])

  return (
    <div className={`inline-flex items-center ${className}`}>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentText}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <motion.span
              className={`text-4xl md:text-5xl lg:text-6xl font-bold ${
                glitchActive ? "text-red-500" : "text-transparent"
              } bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400`}
              animate={
                glitchActive
                  ? {
                      x: [0, -2, 3, -1, 0],
                      opacity: [1, 0.8, 1],
                    }
                  : {}
              }
            >
              {currentText}
            </motion.span>

            {/* Text shadow/glow effect */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
              <div className="absolute inset-0 blur-sm bg-blue-500/20 rounded-lg opacity-70"></div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Cursor */}
        <motion.span
          className={`absolute top-0 right-[-12px] h-full w-[4px] bg-blue-500 rounded-sm ${
            cursorVisible ? "opacity-100" : "opacity-0"
          }`}
          initial={{ height: "0%" }}
          animate={{ height: "100%" }}
          transition={{
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Particle effects */}
        {glitchActive && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-500 rounded-full"
                initial={{
                  x: "50%",
                  y: "50%",
                  opacity: 1,
                }}
                animate={{
                  x: `${50 + (Math.random() * 100 - 50)}%`,
                  y: `${50 + (Math.random() * 100 - 50)}%`,
                  opacity: 0,
                }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

