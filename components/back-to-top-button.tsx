"use client"

import { ChevronUp } from "lucide-react"

export function BackToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      className="inline-flex items-center gap-2 px-6 py-3 bg-transparent hover:bg-blue-900/20 border border-blue-500/50 text-blue-400 rounded-md transition-all duration-300"
    >
      <span>Back to Top</span>
      <ChevronUp size={16} />
    </button>
  )
}

