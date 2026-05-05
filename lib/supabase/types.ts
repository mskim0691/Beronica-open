export type BlogPostRow = {
  id: string
  slug: string
  locale: 'ko' | 'en'
  title: string
  date: string
  category: 'GTD' | 'PARA' | 'AI Memory' | 'Build Log' | 'Tutorial'
  tags: string[]
  description: string
  image: string | null
  series_name: string | null
  series_order: number | null
  author: string
  featured: boolean
  content: string
  published: boolean
  created_at: string
  updated_at: string
}

export type SiteContentRow = {
  id: string
  locale: 'ko' | 'en'
  section: string
  key: string
  value: string
  updated_at: string
}
