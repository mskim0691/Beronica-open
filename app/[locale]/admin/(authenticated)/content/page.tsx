import { createSupabaseServerClient } from '@/lib/supabase/server'
import ContentEditor from '@/components/admin/ContentEditor'

export default async function AdminContentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createSupabaseServerClient()

  const { data: content } = await supabase
    .from('site_content')
    .select('*')
    .order('section')
    .order('key')

  // Group by locale and section
  const grouped: Record<string, Record<string, { key: string; value: string; id: string }[]>> = {}
  for (const row of content ?? []) {
    if (!grouped[row.locale]) grouped[row.locale] = {}
    if (!grouped[row.locale][row.section]) grouped[row.locale][row.section] = []
    grouped[row.locale][row.section].push({ key: row.key, value: row.value, id: row.id })
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-6">Site Content</h1>
      <ContentEditor grouped={grouped} />
    </div>
  )
}
