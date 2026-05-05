import { createSupabaseServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const prefix = locale === 'ko' ? '' : `/${locale}`
  const supabase = await createSupabaseServerClient()

  const { count: koCount } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true })
    .eq('locale', 'ko')

  const { count: enCount } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true })
    .eq('locale', 'en')

  const { data: recentPosts } = await supabase
    .from('blog_posts')
    .select('id, title, locale, date, published')
    .order('updated_at', { ascending: false })
    .limit(5)

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-[var(--color-text)]">Dashboard</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
          <p className="text-sm text-[var(--color-text-muted)]">Korean Posts</p>
          <p className="mt-1 text-3xl font-bold text-[var(--color-text)]">{koCount ?? 0}</p>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
          <p className="text-sm text-[var(--color-text-muted)]">English Posts</p>
          <p className="mt-1 text-3xl font-bold text-[var(--color-text)]">{enCount ?? 0}</p>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
          <p className="text-sm text-[var(--color-text-muted)]">Total</p>
          <p className="mt-1 text-3xl font-bold text-[var(--color-text)]">{(koCount ?? 0) + (enCount ?? 0)}</p>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--color-text)]">Recent Posts</h2>
          <Link
            href={`${prefix}/admin/posts/new`}
            className="rounded-md bg-[var(--color-primary)] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
          >
            + New Post
          </Link>
        </div>
        <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-white overflow-hidden">
          {recentPosts && recentPosts.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-[var(--color-text-secondary)]">Title</th>
                  <th className="px-4 py-2 text-left font-medium text-[var(--color-text-secondary)]">Locale</th>
                  <th className="px-4 py-2 text-left font-medium text-[var(--color-text-secondary)]">Date</th>
                  <th className="px-4 py-2 text-left font-medium text-[var(--color-text-secondary)]">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post) => (
                  <tr key={post.id} className="border-b border-[var(--color-border)] last:border-0">
                    <td className="px-4 py-2">
                      <Link href={`${prefix}/admin/posts/${post.id}`} className="text-[var(--color-primary)] hover:underline">
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-[var(--color-text-muted)]">{post.locale.toUpperCase()}</td>
                    <td className="px-4 py-2 text-[var(--color-text-muted)]">{post.date}</td>
                    <td className="px-4 py-2">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs ${post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="px-4 py-8 text-center text-[var(--color-text-muted)]">No posts yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
