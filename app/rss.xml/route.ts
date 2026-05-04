import RSS from 'rss'
import { getAllPosts } from '@/lib/mdx'
import { SITE_META } from '@/lib/site-config'

export async function GET() {
  const posts = await getAllPosts('ko')

  const feed = new RSS({
    title: `${SITE_META.name} Blog`,
    description: SITE_META.tagline,
    site_url: SITE_META.url,
    feed_url: `${SITE_META.url}/rss.xml`,
    language: 'ko',
    pubDate: posts[0]?.date ? new Date(posts[0].date) : new Date(),
  })

  for (const post of posts) {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${SITE_META.url}/blog/${post.slug}`,
      date: new Date(post.date),
      categories: [post.category, ...post.tags],
      author: post.author,
    })
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
