import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: path.join(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function insert() {
  const manualPath = path.join(process.cwd(), 'docs', 'Beronica 세팅 매뉴얼 (개인 사용자 세팅).md')
  const raw = fs.readFileSync(manualPath, 'utf-8')

  const frontmatterEnd = raw.indexOf('---', raw.indexOf('---') + 3)
  const content = raw.slice(frontmatterEnd + 3).trim()

  const { error } = await supabase.from('blog_posts').upsert(
    {
      slug: 'beronica-setup-manual',
      locale: 'ko',
      title: 'Beronica 세팅 매뉴얼 — 개인 사용자 세팅 가이드',
      date: '2026-05-05',
      category: 'Tutorial',
      tags: ['Beronica', 'Obsidian', 'GTD', 'PARA', 'Claudian', '세팅 가이드'],
      description: 'Obsidian + Claudian(AI) 설치부터 GTD/PARA 폴더 구조, 일상 사용 패턴까지 — 베로니카를 처음 시작하는 분을 위한 상세 매뉴얼입니다.',
      author: 'Minsu Kim',
      featured: true,
      content,
      published: true,
    },
    { onConflict: 'slug,locale' }
  )

  if (error) {
    console.error('ERROR:', error.message)
  } else {
    console.log('✓ beronica-setup-manual (ko) inserted')
  }
}

insert().catch(console.error)
