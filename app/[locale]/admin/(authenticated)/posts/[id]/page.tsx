import { notFound } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import PostForm from '@/components/admin/PostForm'
import { updatePost, deletePost } from '../actions'
import DeleteButton from './DeleteButton'

export default async function EditPostPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params
  const prefix = locale === 'ko' ? '' : `/${locale}`
  const supabase = await createSupabaseServerClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (!post) notFound()

  const boundUpdate = updatePost.bind(null, id)

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Edit Post</h1>
        <DeleteButton id={id} />
      </div>
      <PostForm
        action={boundUpdate}
        initialData={{
          title: post.title,
          slug: post.slug,
          locale: post.locale,
          category: post.category,
          tags: post.tags,
          description: post.description,
          image: post.image,
          author: post.author,
          featured: post.featured,
          published: post.published,
          content: post.content,
          date: post.date,
        }}
        submitLabel="Update Post"
      />
    </div>
  )
}
