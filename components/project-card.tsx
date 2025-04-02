"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"

interface Technology {
  name: string
  color: string
}

interface ProjectCardProps {
  title: string
  description: string
  imageSrc: string
  caseStudyLink: string
  githubLink: string
  technologies: Technology[]
}

export function ProjectCard({
  title,
  description,
  imageSrc, // Updated prop name
  caseStudyLink,
  githubLink,
  technologies,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const maxLength = 150

  const shouldTruncate = description.length > maxLength
  const truncatedDescription = shouldTruncate && !isExpanded ? `${description.slice(0, maxLength)}...` : description

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col h-full"
    >
      <div className="relative h-48 bg-gray-100 dark:bg-gray-700">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-mono font-semibold mb-2">{title}</h3>

        <div className="flex-grow">
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {truncatedDescription}
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech.name}
                className="px-2 py-1 text-xs font-mono rounded-full"
                style={{
                  backgroundColor: `${tech.color}20`,
                  color: tech.color,
                  border: `1px solid ${tech.color}40`,
                }}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <a
            href={caseStudyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            View Case Study
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

