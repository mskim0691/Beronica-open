import { createSupabaseServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminPostsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const prefix = locale === 'ko' ? '' : `/${locale}`
  const supabase = await createSupabaseServerClient()

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, locale, date, category, published, featured')
    .order('date', { ascending: false })

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Posts</h1>
        <Link
          href={`${prefix}/admin/posts/new`}
          className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          + New Post
        </Link>
      </div>

      <div className="mt-6 rounded-lg border border-[var(--color-border)] bg-white overflow-hidden">
        {posts && posts.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-[var(--color-text-secondary)]">Title</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--color-text-secondary)]">Category</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--color-text-secondary)]">Locale</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--color-text-secondary)]">Date</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--color-text-secondary)]">Status</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface)]/50">
                  <td className="px-4 py-3">
                    <Link href={`${prefix}/admin/posts/${post.id}`} className="text-[var(--color-primary)] hover:underline font-medium">
                      {post.title}
                    </Link>
                    {post.featured && <span className="ml-2 text-xs text-amber-600">★</span>}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{post.category}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{post.locale.toUpperCase()}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{post.date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs ${post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="px-4 py-12 text-center text-[var(--color-text-muted)]">No posts yet. Create your first post!</p>
        )}
      </div>
    </div>
  )
}
