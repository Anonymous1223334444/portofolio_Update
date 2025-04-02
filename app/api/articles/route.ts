import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // Fetch articles with relationships
    const { data: articles, error } = await supabase
      .from("articles")
      .select(`
        *,
        author:authors(*),
        category:categories(*),
        tags:article_tags(tag:tags(*))
      `)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: "Failed to fetch articles", details: error });
    }

    return NextResponse.json({
      success: true,
      count: articles?.length || 0,
      articles,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ 
      error: "Internal server error", 
      details: error instanceof Error ? error.message : String(error) 
    });
  }
}