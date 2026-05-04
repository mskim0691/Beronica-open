import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { z } from 'zod'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export const BlogPostFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.enum(['GTD', 'PARA', 'AI Memory', 'Build Log', 'Tutorial']),
  tags: z.array(z.string()),
  description: z.string(),
  image: z.string().optional(),
  series: z.object({ name: z.string(), order: z.number() }).optional(),
  locale: z.enum(['ko', 'en']),
  author: z.string().default('Minsu Kim'),
  featured: z.boolean().default(false),
})

export type BlogPostFrontmatter = z.infer<typeof BlogPostFrontmatterSchema>

export type BlogPost = BlogPostFrontmatter & {
  slug: string
  readingTime: number
  content: string
}

function getPostsDir(locale: string): string {
  return path.join(POSTS_DIR, locale)
}

function parsePost(filePath: string): BlogPost | null {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const parsed = BlogPostFrontmatterSchema.safeParse(data)
  if (!parsed.success) {
    console.warn(`Invalid frontmatter in ${filePath}:`, parsed.error)
    return null
  }
  const slug = path.basename(filePath, '.mdx')
  const { minutes } = readingTime(content)
  return {
    ...parsed.data,
    slug,
    readingTime: Math.ceil(minutes),
    content,
  }
}

export async function getAllPosts(locale: 'ko' | 'en' = 'ko'): Promise<BlogPost[]> {
  const dir = getPostsDir(locale)
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
  const posts = files.map(f => parsePost(path.join(dir, f))).filter((p): p is BlogPost => p !== null)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string, locale: 'ko' | 'en' = 'ko'): Promise<BlogPost | null> {
  const filePath = path.join(getPostsDir(locale), `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return parsePost(filePath)
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
  const posts = await getAllPosts(locale)
  return posts.filter(p => p.category === category)
}

export async function getFeaturedPosts(locale: 'ko' | 'en' = 'ko'): Promise<BlogPost[]> {
  const posts = await getAllPosts(locale)
  return posts.filter(p => p.featured)
}
