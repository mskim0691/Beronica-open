import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/mdx'
import { SITE_META } from '@/lib/site-config'

function withAlternates(koPath: string, enPath: string) {
  return {
    alternates: {
      languages: {
        ko: `${SITE_META.url}${koPath}`,
        en: `${SITE_META.url}${enPath}`,
      },
    },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const koPosts = await getAllPosts('ko')
  const enPosts = await getAllPosts('en')

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_META.url}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0, ...withAlternates('/', '/en') },
    { url: `${SITE_META.url}/features`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8, ...withAlternates('/features', '/en/features') },
    { url: `${SITE_META.url}/en/features`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8, ...withAlternates('/features', '/en/features') },
    { url: `${SITE_META.url}/get-started`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8, ...withAlternates('/get-started', '/en/get-started') },
    { url: `${SITE_META.url}/en/get-started`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8, ...withAlternates('/get-started', '/en/get-started') },
    { url: `${SITE_META.url}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8, ...withAlternates('/blog', '/en/blog') },
    { url: `${SITE_META.url}/en/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8, ...withAlternates('/blog', '/en/blog') },
    { url: `${SITE_META.url}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5, ...withAlternates('/about', '/en/about') },
    { url: `${SITE_META.url}/en/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5, ...withAlternates('/about', '/en/about') },
  ]

  const blogPages: MetadataRoute.Sitemap = [
    ...koPosts.map(post => ({
      url: `${SITE_META.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      ...withAlternates(`/blog/${post.slug}`, `/en/blog/${post.slug}`),
    })),
    ...enPosts.map(post => ({
      url: `${SITE_META.url}/en/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      ...withAlternates(`/blog/${post.slug}`, `/en/blog/${post.slug}`),
    })),
  ]

  return [...staticPages, ...blogPages]
}
