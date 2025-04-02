"use client"

import { motion } from "framer-motion"
import { Globe } from "lucide-react"
import { useLanguage } from "./language-context"
import { useEffect, useState } from "react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en")
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isClient ? (language === "en" ? "Switch to French" : "Passer à l'anglais") : "Switch language"}
    >
      <Globe className="h-5 w-5" />
      <span className="ml-1 text-sm font-medium">{isClient ? (language === "en" ? "FR" : "EN") : "EN"}</span>
    </motion.button>
  )
}

