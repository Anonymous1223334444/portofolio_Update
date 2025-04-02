"use client"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

interface ArticleLinkProps {
  slug: string
  children: ReactNode
  className?: string
}

export function ArticleLink({ slug, children, className = "" }: ArticleLinkProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/blog/${slug}`)
  }

  return (
    <div onClick={handleClick} className={`cursor-pointer ${className}`}>
      {children}
    </div>
  )
}

