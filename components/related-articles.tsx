"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import type { Article } from "@/types/blog"

interface RelatedArticlesProps {
  categoryId: string
  currentArticleId: string
}

export function RelatedArticles({ categoryId, currentArticleId }: RelatedArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const router = useRouter()

  useEffect(() => {
    async function fetchRelatedArticles() {
      const { data } = await supabase
        .from("articles")
        .select("id, title, slug, featured_image, created_at")
        .eq("category_id", categoryId)
        .neq("id", currentArticleId)
        .limit(3)

      if (data) {
        setArticles(data as Article[])
      }
    }

    fetchRelatedArticles()
  }, [categoryId, currentArticleId])

  if (articles.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Related Articles</h3>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => router.push(`/blog/${article.slug}`)}
            className="cursor-pointer"
          >
            <div className="group block">
              <div className="relative h-32 mb-2 rounded-lg overflow-hidden">
                <Image
                  src={article.featured_image || "/placeholder.svg?height=128&width=256"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h4 className="font-medium group-hover:text-blue-400 transition-colors duration-200">{article.title}</h4>
              <p className="text-sm text-gray-400">{new Date(article.created_at).toLocaleDateString()}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

