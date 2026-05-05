'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type PostFormState = {
  error?: string
  success?: boolean
}

export async function createPost(prevState: PostFormState, formData: FormData): Promise<PostFormState> {
  const supabase = await createSupabaseServerClient()

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const locale = formData.get('locale') as string
  const category = formData.get('category') as string
  const tags = (formData.get('tags') as string).split(',').map(t => t.trim()).filter(Boolean)
  const description = formData.get('description') as string
  const image = formData.get('image') as string || null
  const author = formData.get('author') as string || 'Minsu Kim'
  const featured = formData.get('featured') === 'on'
  const published = formData.get('published') === 'on'
  const content = formData.get('content') as string
  const date = formData.get('date') as string

  if (!title || !slug || !content || !date || !category) {
    return { error: 'Required fields missing' }
  }

  const { error } = await supabase.from('blog_posts').insert({
    title, slug, locale, category, tags, description,
    image, author, featured, published, content, date,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/blog')
  revalidatePath('/admin/posts')
  return { success: true }
}

export async function updatePost(id: string, prevState: PostFormState, formData: FormData): Promise<PostFormState> {
  const supabase = await createSupabaseServerClient()

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const locale = formData.get('locale') as string
  const category = formData.get('category') as string
  const tags = (formData.get('tags') as string).split(',').map(t => t.trim()).filter(Boolean)
  const description = formData.get('description') as string
  const image = formData.get('image') as string || null
  const author = formData.get('author') as string || 'Minsu Kim'
  const featured = formData.get('featured') === 'on'
  const published = formData.get('published') === 'on'
  const content = formData.get('content') as string
  const date = formData.get('date') as string

  if (!title || !slug || !content || !date || !category) {
    return { error: 'Required fields missing' }
  }

  const { error } = await supabase
    .from('blog_posts')
    .update({
      title, slug, locale, category, tags, description,
      image, author, featured, published, content, date,
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/blog')
  revalidatePath('/admin/posts')
  return { success: true }
}

export async function deletePost(id: string): Promise<void> {
  const supabase = await createSupabaseServerClient()
  await supabase.from('blog_posts').delete().eq('id', id)
  revalidatePath('/blog')
  revalidatePath('/admin/posts')
}
