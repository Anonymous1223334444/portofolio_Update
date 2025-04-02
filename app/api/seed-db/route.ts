import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    // Check if we already have data
    const { data: articles, error: articlesError } = await supabase.from("articles").select("id")

    if (articlesError) {
      return NextResponse.json({ error: "Failed to check articles", details: articlesError })
    }

    const articlesCount = articles?.length || 0

    if (articlesCount > 0) {
      return NextResponse.json({
        message: "Database already has articles",
        count: articlesCount,
        action: "none",
      })
    }

    // Insert sample author if none exists
    const { data: existingAuthors, error: authorsError } = await supabase.from("authors").select("id")

    if (authorsError) {
      return NextResponse.json({ error: "Failed to check authors", details: authorsError })
    }

    if ((existingAuthors?.length || 0) === 0) {
      const { error: insertAuthorError } = await supabase.from("authors").insert({
        id: "4f62d14a-456d-4946-9c25-7581259e37d1",
        name: "Andre Sarr",
        avatar_url: "/images/profile-picture.png",
        bio: "Full Stack Developer & Security Enthusiast. Passionate about cybersecurity, web development, and innovative technologies.",
      })

      if (insertAuthorError) {
        return NextResponse.json({ error: "Failed to insert author", details: insertAuthorError })
      }
    }

    // Insert sample categories if none exist
    const { data: existingCategories, error: categoriesError } = await supabase.from("categories").select("id")

    if (categoriesError) {
      return NextResponse.json({ error: "Failed to check categories", details: categoriesError })
    }

    if ((existingCategories?.length || 0) === 0) {
      const { error: insertCategoriesError } = await supabase.from("categories").insert([
        { id: "d5b42c5a-7f62-4229-8c79-05cecbde9584", name: "Security", slug: "security" },
        { id: "a93c121d-2d7c-4012-9d3e-c90c39616103", name: "Development", slug: "development" },
        { id: "f76e3dd5-553f-4f0b-a0c5-56b563128bf9", name: "AI & Security", slug: "ai-security" },
      ])

      if (insertCategoriesError) {
        return NextResponse.json({ error: "Failed to insert categories", details: insertCategoriesError })
      }
    }

    // Insert sample tags if none exist
    const { data: existingTags, error: tagsError } = await supabase.from("tags").select("id")

    if (tagsError) {
      return NextResponse.json({ error: "Failed to check tags", details: tagsError })
    }

    if ((existingTags?.length || 0) === 0) {
      const { error: insertTagsError } = await supabase.from("tags").insert([
        { id: "7d32f2c8-2d71-4d1e-bc8e-93061a10a2b5", name: "Cybersecurity", slug: "cybersecurity" },
        { id: "c9e52d4a-e381-4fca-a136-0d15b9bf5120", name: "Network Security", slug: "network-security" },
        { id: "b4f62a78-9c30-4f05-b36e-d22af4a79691", name: "Web Development", slug: "web-development" },
        { id: "e2c7d4b1-3f8a-4b02-9a5d-156789c04328", name: "AI", slug: "ai" },
        { id: "a1d3e5f7-9b2c-4d0e-8f6a-123456789abc", name: "Machine Learning", slug: "machine-learning" },
        { id: "f9e8d7c6-b5a4-3210-9876-543210fedcba", name: "Next.js", slug: "nextjs" },
      ])

      if (insertTagsError) {
        return NextResponse.json({ error: "Failed to insert tags", details: insertTagsError })
      }
    }

    // Insert sample article
    const { error: insertArticleError } = await supabase.from("articles").insert({
      id: "81c4d9e6-72f3-49b0-a5e1-123456789012",
      title: "Advanced Network Security: Protecting Against Modern Threats",
      slug: "advanced-network-security",
      content: `# Advanced Network Security: Protecting Against Modern Threats

## Introduction

In today's interconnected world, network security has become more critical than ever. As cyber threats continue to evolve and become more sophisticated, organizations must adapt their security measures to protect against these modern challenges.

## Understanding Modern Threats

### 1. Advanced Persistent Threats (APTs)

APTs are long-term targeted attacks where hackers maintain unauthorized access to a network for extended periods. These attacks are particularly dangerous because:

- They're difficult to detect
- They can cause significant damage over time
- They often target sensitive data

### 2. Zero-Day Exploits

Zero-day vulnerabilities are particularly dangerous because:

\`\`\`python
# Example of a vulnerability scanner
def scan_for_vulnerabilities(network):
  vulnerabilities = []
  for node in network.nodes:
      if node.patch_level < latest_patch:
          vulnerabilities.append({
              "node": node,
              "risk_level": "high",
              "recommendation": "update_immediately"
          })
  return vulnerabilities
\`\`\``,
      excerpt:
        "A comprehensive guide to protecting your network against modern security threats including APTs and zero-day exploits.",
      featured_image: "/images/network-security.jpeg",
      author_id: "4f62d14a-456d-4946-9c25-7581259e37d1",
      category_id: "d5b42c5a-7f62-4229-8c79-05cecbde9584",
      reading_time: 8,
      is_featured: true,
    })

    if (insertArticleError) {
      return NextResponse.json({ error: "Failed to insert article", details: insertArticleError })
    }

    // Link article to tags
    const { error: insertArticleTagsError } = await supabase.from("article_tags").insert([
      { article_id: "81c4d9e6-72f3-49b0-a5e1-123456789012", tag_id: "7d32f2c8-2d71-4d1e-bc8e-93061a10a2b5" },
      { article_id: "81c4d9e6-72f3-49b0-a5e1-123456789012", tag_id: "c9e52d4a-e381-4fca-a136-0d15b9bf5120" },
    ])

    if (insertArticleTagsError) {
      return NextResponse.json({ error: "Failed to insert article tags", details: insertArticleTagsError })
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
    })
  } catch (error: any) {
    console.error("Seed DB error:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message })
  }
}

