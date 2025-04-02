"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Tag, Clock, ChevronRight, Binary, Shield, Terminal, Code } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Article } from "@/types/blog"

interface BlogPageProps {
  initialArticles: Article[]
}

export default function BlogPage({ initialArticles }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredArticles, setFilteredArticles] = useState(initialArticles)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isMounted, setIsMounted] = useState(false)

  // Handle window dimensions
  useEffect(() => {
    setIsMounted(true)
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Use useMemo to calculate categories
  const categories = useMemo(() => {
    const categorySet = new Set(initialArticles.map((article) => article.category?.name ?? "Uncategorized"))
    return ["All", ...Array.from(categorySet)]
  }, [initialArticles])

  useEffect(() => {
    const filtered = initialArticles.filter((article) => {
      const matchesCategory = selectedCategory === "All" || article.category?.name === selectedCategory
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    setFilteredArticles(filtered)
  }, [selectedCategory, searchQuery, initialArticles])

  const featuredArticle = initialArticles.find((article) => article.is_featured)

  if (!isMounted) return null // Prevent hydration issues

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black" />

        {/* Animated Background Elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-500/20 font-mono text-lg"
            initial={{
              y: -20,
              x: Math.random() * (dimensions.width || 1000), // Fallback width
            }}
            animate={{
              y: (dimensions.height || 800) + 20, // Fallback height
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          >
            {Math.random() > 0.5 ? "0" : "1"}
          </motion.div>
        ))}

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                Tech Insights & Security
              </span>
              <span className="block mt-2">Knowledge Base</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
              Explore the latest in cybersecurity, development, and technology innovations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                    selectedCategory === category
                      ? "border-blue-500 bg-blue-500/10 text-blue-400"
                      : "border-gray-700 hover:border-blue-500/50 hover:bg-blue-500/5"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-72">
              <motion.div
                className={`absolute inset-0 bg-blue-500/20 rounded-lg transition-all duration-300 ${
                  isSearchFocused ? "blur-xl" : "blur-none opacity-0"
                }`}
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article Section */}
      {featuredArticle && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300" />
              <Link
                href={`/blog/${featuredArticle.slug}`}
                className="relative block bg-gray-900 rounded-lg overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="relative h-64 lg:h-full">
                    <Image
                      src={featuredArticle.featured_image || "/placeholder.svg"}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">Featured</span>
                      <span className="text-gray-400 text-sm">{featuredArticle.category?.name}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-gray-400 mb-6">{featuredArticle.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <Clock size={16} />
                        {featuredArticle.reading_time} min read
                      </span>
                      <span className="flex items-center gap-2">
                        <Tag size={16} />
                        {featuredArticle.tags?.[0]?.tag?.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredArticles
                .filter((article) => !article.is_featured)
                .map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${article.slug}`} className="group block">
                      <div className="relative overflow-hidden rounded-lg bg-gray-900 h-full">
                        <div className="relative h-48">
                          <Image
                            src={article.featured_image || "/placeholder.svg"}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                              {article.category?.name}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                            {article.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span className="flex items-center gap-2">
                              <Clock size={16} />
                              {article.reading_time} min read
                            </span>
                            <motion.span className="flex items-center gap-1 text-blue-400" whileHover={{ x: 5 }}>
                              Read more
                              <ChevronRight size={16} />
                            </motion.span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Floating Icons */}
      {[Shield, Terminal, Code, Binary].map((Icon, index) => (
        <motion.div
          key={index}
          className="fixed text-blue-500/20"
          style={{
            top: `${20 + index * 25}%`,
            left: `${5 + index * 2}%`,
            zIndex: 0,
          }}
          animate={{
            y: [0, 20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon size={30 + index * 10} />
        </motion.div>
      ))}
    </div>
  )
}

