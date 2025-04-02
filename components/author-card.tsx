"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { Author } from "@/types/blog"

interface AuthorCardProps {
  author: Author
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex items-start gap-6"
    >
      <div className="relative w-16 h-16 rounded-full overflow-hidden">
        <Image
          src={author.avatar_url || "/placeholder.svg?height=64&width=64"}
          alt={author.name}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{author.name}</h3>
        <p className="text-gray-400">{author.bio}</p>
      </div>
    </motion.div>
  )
}

