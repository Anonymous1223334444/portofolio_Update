"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X, BookOpen, Sparkles } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { LanguageToggle } from "./language-toggle"
import { useLanguage } from "./language-context"
import Link from "next/link"

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isHovering, setIsHovering] = useState(false)
  const { t } = useLanguage()
  // Add state to track if we're on the client side
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const menuItems = [
    { href: "#about", label: "nav.about" },
    { href: "#projects", label: "nav.projects" },
    { href: "#skills", label: "nav.skills" },
    { href: "#certifications", label: "nav.certifications" },
    { href: "#contact", label: "nav.contact" },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) => item.href.replace("#", ""))
      const currentSection = sections.find((section) => {
        if (section === "resume") return false
        const element = document.getElementById(section)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })
      setActiveSection(currentSection || "")
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 w-full z-[9998] bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="#" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                AS
              </div>
              <span className="text-xl font-bold">Andre Sarr</span>
            </Link>
          </motion.div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                    ${
                      activeSection === item.href.replace("#", "")
                        ? "text-blue-600 dark:text-blue-400"
                        : "hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault()
                      document.querySelector(item.href)?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  }}
                >
                  {/* Only use t() on the client side */}
                  {isClient
                    ? t(item.label)
                    : item.label === "nav.about"
                      ? "About"
                      : item.label === "nav.projects"
                        ? "Projects"
                        : item.label === "nav.skills"
                          ? "Skills"
                          : item.label === "nav.certifications"
                            ? "Certifications"
                            : item.label === "nav.contact"
                              ? "Contact"
                              : item.label}
                  {activeSection === item.href.replace("#", "") && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                      initial={false}
                    />
                  )}
                </Link>
              ))}

              {/* Language Toggle */}
              <LanguageToggle />

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Blog Button for desktop */}
              <motion.div
                className="relative"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Link href="/blog" target="_blank">
                  <motion.div
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span>{isClient ? t("nav.blog") : "Blog"}</span>
                    {isHovering && (
                      <motion.div
                        className="absolute -top-1 -right-1"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                      >
                        <Sparkles className="w-3 h-3 text-yellow-300" />
                      </motion.div>
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            {/* Language Toggle for mobile */}
            <LanguageToggle />

            {/* Blog Button for mobile - always visible */}
            <Link href="/blog" target="_blank">
              <motion.div
                className="flex items-center space-x-1 px-2 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="w-4 h-4" />
                <span className="sr-only md:not-sr-only">{isClient ? t("nav.blog") : "Blog"}</span>
              </motion.div>
            </Link>
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                    ${
                      activeSection === item.href.replace("#", "")
                        ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault()
                      document.querySelector(item.href)?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                    toggleMenu()
                  }}
                >
                  {isClient
                    ? t(item.label)
                    : item.label === "nav.about"
                      ? "About"
                      : item.label === "nav.projects"
                        ? "Projects"
                        : item.label === "nav.skills"
                          ? "Skills"
                          : item.label === "nav.certifications"
                            ? "Certifications"
                            : item.label === "nav.contact"
                              ? "Contact"
                              : item.label}
                </Link>
              ))}

              {/* Blog item in mobile menu */}
              <Link
                href="/blog"
                target="_blank"
                className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white transition-colors duration-200"
                onClick={toggleMenu}
              >
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  <span>{isClient ? t("nav.blog") : "Blog"}</span>
                  <motion.div
                    className="ml-2"
                    animate={{
                      rotate: [0, 10, -10, 10, 0],
                      scale: [1, 1.1, 1, 1.1, 1],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      duration: 2,
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                  </motion.div>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

