import readingTime from 'reading-time'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export type BlogPostFrontmatter = {
  title: string
  date: string
  category: 'GTD' | 'PARA' | 'AI Memory' | 'Build Log' | 'Tutorial'
  tags: string[]
  description: string
  image?: string
  series?: { name: string; order: number }
  locale: 'ko' | 'en'
  author: string
  featured: boolean
}

export type BlogPost = BlogPostFrontmatter & {
  slug: string
  readingTime: number
  content: string
}

function rowToPost(row: Record<string, unknown>): BlogPost {
  return {
    title: row.title as string,
    date: row.date as string,
    category: row.category as BlogPost['category'],
    tags: row.tags as string[],
    description: row.description as string,
    image: (row.image as string) || undefined,
    series: row.series_name
      ? { name: row.series_name as string, order: row.series_order as number }
      : undefined,
    locale: row.locale as 'ko' | 'en',
    author: row.author as string,
    featured: row.featured as boolean,
    slug: row.slug as string,
    readingTime: Math.ceil(readingTime(row.content as string).minutes),
    content: row.content as string,
  }
}

export async function getAllPosts(locale: 'ko' | 'en' = 'ko'): Promise<BlogPost[]> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('locale', locale)
    .eq('published', true)
    .order('date', { ascending: false })

  return (data ?? []).map(rowToPost)
}

export async function getPostBySlug(slug: string, locale: 'ko' | 'en' = 'ko'): Promise<BlogPost | null> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('locale', locale)
    .eq('published', true)
    .single()

  return data ? rowToPost(data) : null
}

export async function getCategories(locale: 'ko' | 'en' = 'ko'): Promise<string[]> {
  const posts = await getAllPosts(locale)
  return [...new Set(posts.map(p => p.category))]
}

export async function getTags(locale: 'ko' | 'en' = 'ko'): Promise<string[]> {
  const posts = await getAllPosts(locale)
  return [...new Set(posts.flatMap(p => p.tags))]
}

export async function getPostsByCategory(category: string, locale: 'ko' | 'en' = 'ko'): Promise<BlogPost[]> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('locale', locale)
    .eq('category', category)
    .eq('published', true)
    .order('date', { ascending: false })

  return (data ?? []).map(rowToPost)
}

export async function getFeaturedPosts(locale: 'ko' | 'en' = 'ko'): Promise<BlogPost[]> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('locale', locale)
    .eq('featured', true)
    .eq('published', true)
    .order('date', { ascending: false })

  return (data ?? []).map(rowToPost)
}
