'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateContent(items: { id: string; value: string }[]): Promise<{ error?: string }> {
  const supabase = await createSupabaseServerClient()

  for (const item of items) {
    const { error } = await supabase
      .from('site_content')
      .update({ value: item.value })
      .eq('id', item.id)

    if (error) {
      return { error: error.message }
    }
  }

  revalidatePath('/')
  return {}
}
