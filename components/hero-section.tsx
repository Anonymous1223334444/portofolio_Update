"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { Circle, Square, Mail, Github, Linkedin, Shield, Lock, Code, Terminal, Binary } from "lucide-react"
import { toast } from "sonner"
import { useLanguage } from "./language-context"

// Import the Globe component dynamically to avoid SSR issues with Three.js
const Globe = dynamic(() => import("@/components/Globe"), { ssr: false })

export function HeroSection({
  name = "Andre Sarr",
  title,
  profileImage = "/images/profile-picture.jpg",
  socialLinks = [
    { icon: Mail, href: "mailto:sarrandremichel@gmail.com" },
    { icon: Github, href: "https://github.com/Anonymous1223334444" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/andré-sarr-8b87a1202" },
  ],
}) {
  const { t } = useLanguage()
  const [isClient, setIsClient] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [glitchActive, setGlitchActive] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [securityLevel, setSecurityLevel] = useState(0)
  const [showBinaryMessage, setShowBinaryMessage] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const globeContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Binary messages that represent cybersecurity terms
  const binaryMessages = [
    "01000101 01101110 01100011 01110010 01111001 01110000 01110100 01101001 01101111 01101110", // Encryption
    "01000110 01101001 01110010 01100101 01110111 01100001 01101100 01101100", // Firewall
    "01010011 01100101 01100011 01110101 01110010 01101001 01110100 01111001", // Security
  ]

  // Random glitch effect
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

  // Mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Matrix rain effect for canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      const scale = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * scale
      canvas.height = rect.height * scale
      ctx.scale(scale, scale)
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

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

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [])

  const increaseSecurity = async () => {
    if (securityLevel >= 3) return

    const newLevel = securityLevel + 1
    setSecurityLevel(newLevel)

    const securityMessages = [
      isClient ? t("hero.securityMessages.1") : "Initializing basic security protocols...",
      isClient ? t("hero.securityMessages.2") : "Enabling advanced encryption layers...",
      isClient ? t("hero.securityMessages.3") : "Activating maximum security shield...",
    ]

    toast(securityMessages[securityLevel], {
      duration: 2000,
      className: "bg-black/90 border border-blue-500/50 text-blue-400 font-mono text-sm",
      icon: <Shield className="w-4 h-4" />,
    })

    if (newLevel === 3) {
      setTimeout(() => {
        toast.success(isClient ? t("hero.securityMaximum") : "SECURITY LEVEL MAXIMUM: All systems protected", {
          duration: 3000,
          className: "bg-green-900/90 border border-green-500/50 text-green-400 font-mono text-sm",
          icon: <Lock className="w-4 h-4" />,
        })
        setShowBinaryMessage(true)
      }, 2000)
    }
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-full text-[20vw] font-bold text-gray-100 dark:text-gray-800 opacity-30 pointer-events-none">
        {isClient ? t("hero.welcome") : "Welcome"}
      </div>

      {/* Matrix canvas overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen" />

      {/* Decorative elements with enhanced animations - hidden on small screens */}
      <motion.div
        className="absolute top-[20%] left-[40%] transform -translate-x-1/2 -translate-y-1/2 hidden sm:block"
        style={{
          transform: `translate(${mousePosition.x * 20 - 10}px, ${mousePosition.y * 20 - 10}px)`,
        }}
        animate={{
          scale: glitchActive ? [1, 1.1, 0.9, 1] : [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          scale: glitchActive ? { duration: 0.2 } : { duration: 3, repeat: Number.POSITIVE_INFINITY },
          opacity: { duration: 3, repeat: Number.POSITIVE_INFINITY },
        }}
      >
        <Circle className="text-blue-500 dark:text-blue-400 w-24 h-24" />
      </motion.div>

      <motion.div
        className="absolute top-[60%] right-[30%] transform -translate-x-1/2 -translate-y-1/2 hidden sm:block"
        style={{
          transform: `translate(${-mousePosition.x * 30 + 15}px, ${-mousePosition.y * 30 + 15}px)`,
        }}
        animate={{
          rotate: 360,
          scale: glitchActive ? [1, 1.1, 0.9, 1] : 1,
        }}
        transition={{
          rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: glitchActive ? { duration: 0.2 } : {},
        }}
      >
        <Square className="text-blue-500 dark:text-blue-400 opacity-60 w-24 h-24" />
      </motion.div>

      <motion.div
        className="absolute top-[30%] right-[20%] transform -translate-x-1/2 -translate-y-1/2 hidden sm:block"
        style={{
          transform: `translate(${mousePosition.x * 15 - 7.5}px, ${mousePosition.y * 15 - 7.5}px)`,
        }}
        animate={{
          rotate: -360,
          scale: glitchActive ? [1, 1.1, 0.9, 1] : 1,
        }}
        transition={{
          rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: glitchActive ? { duration: 0.2 } : {},
        }}
      >
        <Square className="text-blue-500 dark:text-blue-400 opacity-60 w-12 h-12" />
      </motion.div>

      {/* Security icons that rotate around - reduced size on small screens */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] -translate-x-1/2 -translate-y-1/2 opacity-10 sm:opacity-20 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        {[Shield, Lock, Code, Terminal].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              top: `${50 - 40 * Math.cos((index * Math.PI) / 2)}%`,
              left: `${50 + 40 * Math.sin((index * Math.PI) / 2)}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: securityLevel > index ? [0.7, 1, 0.7] : 0.3,
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.5,
            }}
          >
            <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${securityLevel > index ? "text-blue-500" : "text-gray-500"}`} />
          </motion.div>
        ))}
      </motion.div>

      {/* Header/Navigation */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-8 z-10">
        <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
          <div className="w-8 h-8">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <motion.path
                d="M4 5L12 5M12 5L20 5M12 5L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              />
              <motion.path
                d="M4 12H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              />
              <motion.path
                d="M4 19H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </svg>
          </div>
        </motion.div>
        <nav className="flex gap-8">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="#about"
              className="text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {isClient ? t("nav.about").toLowerCase() : "about"}
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="#contact"
              className="text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {isClient ? t("nav.contact").toLowerCase() : "contact"}
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="#projects"
              className="text-base font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center border border-current">
                <span className="sr-only">{isClient ? t("nav.projects").toLowerCase() : "projects"}</span>
              </div>
            </Link>
          </motion.div>
        </nav>
      </header>

      {/* Main content */}
      <div className="relative h-full flex flex-col md:flex-row items-center">
        {/* Vertical text */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:block">
          <motion.div
            className="flex flex-col items-center gap-4 -rotate-90 origin-center whitespace-nowrap"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          ></motion.div>
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-16 md:pt-0 z-20">
          <motion.div
            className="mb-2 text-sm font-light text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isClient ? t("hero.hello") : "HELLO, I'M"}
          </motion.div>
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {name}
          </motion.h1>
          <motion.div
            className="w-16 h-1 bg-blue-600 dark:bg-blue-500 mb-8"
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.p
            className="text-gray-600 dark:text-gray-300 max-w-md mb-10 text-lg relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {isClient
              ? t("hero.title")
              : "An AI developer/mobile and app developer and cybersecurity anthousiast, based in Dakar, Senegal"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <motion.button
              onClick={increaseSecurity}
              className={`inline-flex items-center text-base font-medium px-4 py-2 rounded-md transition-all duration-300 ${
                securityLevel === 3
                  ? "bg-blue-600 text-white"
                  : "bg-blue-600/10 text-blue-600 dark:text-blue-400 hover:bg-blue-600/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={securityLevel === 3}
            >
              <Shield className="mr-2 h-5 w-5" />
              <span>
                {isClient ? t("hero.securityLevel") : "Security Level"}: {securityLevel}/3
              </span>
            </motion.button>

            <Link
              href="#projects"
              className="inline-flex items-center text-base font-medium group text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <span className="mr-3">{isClient ? t("hero.findOutMore") : "find out more"}</span>
              <motion.div
                className="w-16 h-1 bg-blue-600 dark:bg-blue-500"
                whileHover={{ width: "6rem" }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Binary message that appears when security is maxed */}
          <AnimatePresence>
            {showBinaryMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 max-w-md"
              >
                <div className="bg-black/20 backdrop-blur-sm border border-blue-500/30 p-3 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Binary className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-blue-500 dark:text-blue-400 font-mono">
                      {isClient ? t("hero.encryptedMessage") : "Encrypted Message:"}
                    </span>
                  </div>
                  <motion.div
                    className="text-xs text-blue-600 dark:text-blue-400 font-mono break-all select-all relative overflow-hidden"
                    animate={
                      glitchActive
                        ? {
                            x: [-2, 2, -2, 0],
                            transition: { duration: 0.3 },
                          }
                        : {}
                    }
                  >
                    {binaryMessages[Math.floor(Math.random() * binaryMessages.length)]}
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social links - repositioned for small screens */}
          <div className="flex gap-4 mt-4 sm:hidden">
            {socialLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  target="_blank"
                  href={link.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 block"
                >
                  <link.icon size={20} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Social links for larger screens */}
          <div className="absolute bottom-8 left-8 flex-col gap-4 hidden sm:flex z-30">
            {socialLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                <Link
                  target="_blank"
                  href={link.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 block"
                >
                  <link.icon size={20} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Globe (replacing the Image) */}
        <div
          ref={globeContainerRef}
          className="w-full md:w-1/2 h-full relative overflow-hidden flex items-center justify-center"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent dark:from-gray-900 dark:to-transparent z-10 md:hidden"></div>

          {/* Globe container with effects */}
          <motion.div
            className="relative w-full h-full"
            animate={{
              scale: glitchActive ? [1, 1.01, 0.99, 1] : isHovering ? 1.05 : 1,
            }}
            transition={{
              scale: glitchActive ? { duration: 0.2 } : { duration: 0.5 },
            }}
          >
            {/* Replace Image with Globe - ensure pointer-events-auto for interaction */}
            <div className="w-full h-full pointer-events-auto">
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                }
              >
                <Globe embedded={true} />
              </Suspense>
            </div>

            {/* Scanlines effect - make sure it doesn't block interaction */}
            <div
              className={`absolute inset-0 scanlines pointer-events-none ${securityLevel < 3 ? "opacity-40" : "opacity-10"}`}
            />

            {/* Glitch effect - make sure it doesn't block interaction */}
            <motion.div
              className="absolute inset-0 mix-blend-screen pointer-events-none"
              animate={{
                x: glitchActive ? [0, -5, 5, -2, 0] : 0,
                opacity: glitchActive ? [1, 0.8, 1] : 0,
              }}
              transition={{ duration: 0.2 }}
            />

            {/* Security level overlay - make sure it doesn't block interaction */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent pointer-events-none"
              animate={{
                opacity: securityLevel / 3,
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Hexagonal security grid that appears as security increases - make sure it doesn't block interaction */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-20"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v34.64L30 60 0 51.96V17.32L30 0zm0 5.77L5.77 17.32v25.36L30 54.23l24.23-11.55V17.32L30 5.77z' fill='%233b82f6' fillOpacity='0.4' fillRule='evenodd'/%3E%3C/svg%3E\")",
                }}
                animate={{
                  opacity: securityLevel * 0.1,
                  backgroundSize: [60, 65, 60],
                }}
                transition={{
                  opacity: { duration: 0.5 },
                  backgroundSize: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Pagination dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          <motion.div
            className="text-xs mb-2 text-gray-600 dark:text-gray-400"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {isClient ? t("hero.welcome") : "Welcome"}
          </motion.div>
          <motion.div
            className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>

      {/* Add the scanlines CSS */}
      <style jsx global>{`
        .scanlines {
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.2) 50%
          );
          background-size: 100% 4px;
          z-index: 2;
        }
      `}</style>
    </section>
  )
}
