import { notFound } from "next/navigation"
import Image from "next/image" // Make sure to import Image
import { supabase } from "@/lib/supabase"
import { ArticleContent } from "@/components/article-content"
import { TableOfContents } from "@/components/table-of-contents"
import { ShareButtons } from "@/components/share-buttons"
import { AuthorCard } from "@/components/author-card"
import { RelatedArticles } from "@/components/related-articles"

export async function generateStaticParams() {
  const { data: articles } = await supabase.from("articles").select("slug")

  return (
    articles?.map(({ slug }) => ({
      slug,
    })) || []
  )
}

async function getArticle(slug: string) {
  const { data: article, error } = await supabase
    .from("articles")
    .select(`
      *,
      author:authors(*),
      category:categories(*),
      tags:article_tags(tag:tags(*))
    `)
    .eq("slug", slug)
    .single()

  if (error || !article) {
    return null
  }

  return article
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
          {/* Replace img with Next.js Image component */}
          <div className="relative w-full h-full">
            <Image
              src={article.featured_image || "/placeholder.svg?height=800&width=1200"}
              alt={article.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <div className="relative z-20 h-full flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                  {article.category.name}
                </span>
                <span className="text-gray-400 text-sm">
                  {new Date(article.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{article.title}</h1>
              <p className="text-xl text-gray-300">{article.excerpt}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <ArticleContent content={article.content} />
            <div className="mt-12 border-t border-gray-800 pt-8">
              <AuthorCard author={article.author} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-24">
              <TableOfContents />
              <ShareButtons url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${article.slug}`} title={article.title} />
              <RelatedArticles categoryId={article.category_id} currentArticleId={article.id} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

