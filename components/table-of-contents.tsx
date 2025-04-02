"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function TableOfContents() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3"))
    const headingData = elements.map((element) => ({
      id: element.id || element.textContent?.toLowerCase().replace(/\s+/g, "-") || "",
      text: element.textContent || "",
      level: Number(element.tagName.charAt(1)),
    }))

    // Add IDs to elements that don't have them
    elements.forEach((element, index) => {
      if (!element.id) {
        element.id = headingData[index].id
      }
    })

    setHeadings(headingData)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className="space-y-2 mb-8">
      <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
      <div className="space-y-2">
        {headings.map((heading) => (
          <motion.a
            key={heading.id}
            href={`#${heading.id}`}
            className={`block text-sm transition-colors duration-200 ${
              activeId === heading.id ? "text-blue-400" : "text-gray-400 hover:text-gray-300"
            }`}
            style={{
              paddingLeft: `${(heading.level - 2) * 1}rem`,
            }}
            whileHover={{ x: 4 }}
          >
            {heading.text}
          </motion.a>
        ))}
      </div>
    </nav>
  )
}

