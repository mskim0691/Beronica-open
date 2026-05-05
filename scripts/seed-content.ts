/**
 * Seed site_content table from messages/*.json
 *
 * Usage:
 *   npx tsx scripts/seed-content.ts
 */
import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: path.join(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function flatten(obj: Record<string, unknown>, prefix = ''): { section: string; key: string; value: string }[] {
  const results: { section: string; key: string; value: string }[] = []

  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k

    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      results.push(...flatten(v as Record<string, unknown>, path))
    } else {
      const parts = path.split('.')
      const key = parts.pop()!
      const section = parts.join('.')
      results.push({ section, key, value: String(v) })
    }
  }

  return results
}

async function seed() {
  for (const locale of ['ko', 'en'] as const) {
    const filePath = path.join(process.cwd(), 'messages', `${locale}.json`)
    const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const rows = flatten(json).map(r => ({ ...r, locale }))

    console.log(`Seeding ${rows.length} entries for ${locale}...`)

    const { error } = await supabase
      .from('site_content')
      .upsert(rows, { onConflict: 'locale,section,key' })

    if (error) {
      console.error(`  ERROR:`, error.message)
    } else {
      console.log(`  ✓ ${rows.length} entries inserted`)
    }
  }

  console.log('\nSeed complete!')
}

seed().catch(console.error)
