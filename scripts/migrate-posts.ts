/**
 * One-time migration: Move existing MDX posts to Supabase
 *
 * Usage:
 *   npx tsx scripts/migrate-posts.ts
 *
 * Requires .env.local with valid Supabase credentials
 */
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

async function migrate() {
  for (const locale of ['ko', 'en'] as const) {
    const dir = path.join(POSTS_DIR, locale)
    if (!fs.existsSync(dir)) {
      console.log(`No posts directory for ${locale}, skipping`)
      continue
    }

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
    console.log(`Found ${files.length} posts for ${locale}`)

    for (const file of files) {
      const filePath = path.join(dir, file)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(raw)
      const slug = path.basename(file, '.mdx')

      const { error } = await supabase.from('blog_posts').upsert(
        {
          slug,
          locale,
          title: data.title,
          date: data.date,
          category: data.category,
          tags: data.tags || [],
          description: data.description || '',
          image: data.image || null,
          series_name: data.series?.name || null,
          series_order: data.series?.order || null,
          author: data.author || 'Minsu Kim',
          featured: data.featured || false,
          content,
          published: true,
        },
        { onConflict: 'slug,locale' }
      )

      if (error) {
        console.error(`  ERROR ${slug}:`, error.message)
      } else {
        console.log(`  ✓ ${slug}`)
      }
    }
  }

  console.log('\nMigration complete!')
}

migrate().catch(console.error)
