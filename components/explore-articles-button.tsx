"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function ExploreArticlesButton() {
  return (
    <Link
      href="#articles"
      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20 flex items-center gap-2"
    >
      <span>Explore Articles</span>
      <ChevronRight size={18} />
    </Link>
  )
}

