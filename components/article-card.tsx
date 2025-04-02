"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Clock, ChevronRight, Shield, Terminal } from "lucide-react"
import type { Article } from "@/types/blog"
import { ArticleLink } from "./article-link"

interface ArticleCardProps {
  article: Article
  index: number
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Animated Border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-50 blur transition duration-300"></div>

      <ArticleLink slug={article.slug} className="block h-full relative z-10">
        <div className="relative bg-gray-800 rounded-xl overflow-hidden h-full border border-gray-700 group-hover:border-blue-500/30 transition-all duration-300">
          <div className="relative h-56 overflow-hidden">
            <Image
              src={article.featured_image || `/placeholder.svg?height=400&width=600`}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Cybersecurity overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-800/50 to-transparent">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_70%)]"></div>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50"></div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-sm font-medium rounded-full flex items-center gap-1.5">
              {article.category?.name === "Security" ? (
                <Shield className="w-3.5 h-3.5" />
              ) : article.category?.name === "Development" ? (
                <Terminal className="w-3.5 h-3.5" />
              ) : (
                <Shield className="w-3.5 h-3.5" />
              )}
              <span>{article.category?.name || "Technology"}</span>
            </div>

            {/* Binary rain effect (CSS-based) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
              <div className="binary-rain"></div>
            </div>
          </div>

          <div className="p-6 relative">
            {/* Glitch effect on hover */}
            <motion.h3
              className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2"
              whileHover={{ x: [0, -2, 3, -1, 0], transition: { duration: 0.3 } }}
            >
              {article.title}
            </motion.h3>

            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{article.excerpt}</p>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={14} />
                <span>{article.reading_time} min read</span>
              </div>

              <motion.div
                className="flex items-center gap-1 text-blue-400 text-sm font-medium"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Read more
                <ChevronRight size={16} />
              </motion.div>
            </div>

            {/* Animated scanner line */}
            <motion.div
              className="absolute left-0 right-0 h-px bg-blue-500/30"
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: ["0%", "100%"],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "linear",
              }}
            />
          </div>
        </div>
      </ArticleLink>
    </motion.div>
  )
}

