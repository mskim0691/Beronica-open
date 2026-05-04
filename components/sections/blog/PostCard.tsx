import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { BlogPost } from '@/lib/mdx'

interface PostCardProps {
  post: BlogPost
  locale: 'ko' | 'en'
  featured?: boolean
}

export default function PostCard({ post, locale, featured = false }: PostCardProps) {
  const href = locale === 'ko' ? `/blog/${post.slug}` : `/en/blog/${post.slug}`
  const dateStr = new Date(post.date).toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <article className={cn('group rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-bg)] overflow-hidden transition-shadow hover:shadow-md', featured && 'lg:col-span-2')}>
      <Link href={href} className="block p-6">
        <span className="inline-block rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-medium text-white">
          {post.category}
        </span>
        <h3 className={cn('mt-3 font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors', featured ? 'text-2xl' : 'text-lg')}>
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)] line-clamp-2">
          {post.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} className="rounded-full bg-[var(--color-surface)] px-2 py-0.5 text-xs text-[var(--color-text-muted)]">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
          <time dateTime={post.date}>{dateStr}</time>
          <span>·</span>
          <span>{post.readingTime}min</span>
        </div>
      </Link>
    </article>
  )
}
