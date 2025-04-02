"use client"

import { supabase } from "@/lib/supabase"
import Link from "next/link"
import Image from "next/image"
import { Clock, User, Tag, ChevronRight, Shield, Terminal, Code, Binary } from "lucide-react"
import type { Article } from "@/types/blog"

async function getArticles() {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select(`
        *,
        author:authors(*),
        category:categories(*)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching articles:", error)
      return { articles: [], error: error.message }
    }

    return { articles: data as Article[], error: null }
  } catch (err) {
    console.error("Unexpected error fetching articles:", err)
    return { articles: [], error: err instanceof Error ? err.message : "Unknown error" }
  }
}

export default async function Page() {
  const { articles } = await getArticles()
  const featuredArticle = articles.find((article) => article.is_featured)
  const regularArticles = articles.filter((article) => !article.is_featured)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black/80 to-black z-0">
          {/* Binary Rain Effect (CSS-based for better performance) */}
          <div className="binary-rain"></div>

          {/* Circuit Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(59,130,246,0.15)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>

          {/* Glowing Orbs */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-block mb-6">
            <div className="px-4 py-1 border border-blue-500/30 rounded-full bg-blue-500/10 text-blue-400 text-sm font-mono">
              <span className="blink-text">&#62;</span> CYBERSECURITY INSIGHTS
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 glitch-text" data-text="TECH BLOG">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
              TECH BLOG
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-gray-300 mb-8 cyber-text">
            Explore the latest in cybersecurity, development, and technology innovations
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="#articles"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20 flex items-center gap-2"
            >
              <span>Explore Articles</span>
              <ChevronRight size={18} />
            </Link>

            <Link
              href="/"
              className="px-6 py-3 bg-transparent hover:bg-blue-900/20 border border-blue-500/50 text-blue-400 rounded-md transition-all duration-300"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>

        {/* Floating Tech Icons */}
        <div className="absolute left-10 top-1/4 text-blue-500/20 animate-float-slow">
          <Shield size={40} />
        </div>
        <div className="absolute right-10 top-1/3 text-blue-500/20 animate-float">
          <Terminal size={36} />
        </div>
        <div className="absolute left-1/4 bottom-1/4 text-blue-500/20 animate-float-reverse">
          <Code size={32} />
        </div>
        <div className="absolute right-1/4 bottom-1/3 text-blue-500/20 animate-float-slow">
          <Binary size={28} />
        </div>
      </section>

      {/* Featured Article Section */}
      {featuredArticle && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-1 bg-blue-500 rounded-full"></div>
              <h2 className="text-2xl font-bold">Featured Article</h2>
            </div>

            <div className="group relative">
              {/* Animated Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-300 animate-pulse-slow"></div>

              <Link
                href={`/blog/${featuredArticle.slug}`}
                className="relative block bg-gray-900 rounded-xl overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                  <div className="relative h-72 lg:h-auto lg:col-span-2">
                    <Image
                      src={featuredArticle.featured_image || "/placeholder.svg?height=600&width=800"}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>

                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Featured
                    </div>
                  </div>

                  <div className="p-8 lg:p-10 lg:col-span-3">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium">
                        {featuredArticle.category?.name || "Technology"}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {new Date(featuredArticle.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">
                      {featuredArticle.title}
                    </h3>

                    <p className="text-gray-300 mb-6 line-clamp-3">{featuredArticle.excerpt}</p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>{featuredArticle.author?.name || "Anonymous"}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{featuredArticle.reading_time} min read</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Tag size={16} />
                        <span>Cybersecurity</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 text-blue-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
                      Read Full Article
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Regular Articles Section */}
      <section id="articles" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900/30">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-1 bg-blue-500 rounded-full"></div>
            <h2 className="text-2xl font-bold">Latest Articles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <div key={article.id} className="article-card group" style={{ animationDelay: `${index * 0.1}s` }}>
                <Link href={`/blog/${article.slug}`} className="block h-full">
                  <div className="bg-gray-800 rounded-xl overflow-hidden h-full hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 border border-gray-700 hover:border-blue-500/50">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={article.featured_image || `/placeholder.svg?height=400&width=600`}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                        {article.category?.name || "Technology"}
                      </div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-800/50 to-transparent"></div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">{article.excerpt}</p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock size={14} />
                          <span>{article.reading_time} min read</span>
                        </div>

                        <div className="flex items-center gap-1 text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                          Read more
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* More Articles Button */}
          <div className="mt-16 text-center">
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-transparent hover:bg-blue-900/20 border border-blue-500/50 text-blue-400 rounded-md transition-all duration-300"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            >
              <span>Back to Top</span>
              <ChevronRight size={16} className="rotate-[-90deg]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_70%)]"></div>

        {/* Circuit Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-8">
              Subscribe to our newsletter to receive the latest articles and updates on cybersecurity and technology.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 focus:border-blue-500 rounded-md text-white outline-none"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20"
              >
                Subscribe
              </button>
            </form>

            <p className="text-gray-500 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

