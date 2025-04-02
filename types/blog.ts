export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string
  author_id: string
  category_id: string
  created_at: string
  updated_at: string
  reading_time: number
  is_featured: boolean
  author?: Author
  category?: Category
  tags?: ArticleTag[]
}

// Keep the rest of the interfaces as they are
export interface Author {
  id: string
  name: string
  avatar_url?: string
  bio?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface ArticleTag {
  article_id: string
  tag_id: string
  tag?: Tag
}

export interface Tag {
  id: string
  name: string
  slug: string
  created_at: string
  updated_at: string
}

