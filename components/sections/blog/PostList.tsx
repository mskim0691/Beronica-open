import { useTranslations } from 'next-intl'
import type { BlogPost } from '@/lib/mdx'
import PostCard from './PostCard'

interface PostListProps {
  posts: BlogPost[]
  locale: 'ko' | 'en'
}

export default function PostList({ posts, locale }: PostListProps) {
  const t = useTranslations('blog')

  if (posts.length === 0) {
    return (
      <p className="py-16 text-center text-[var(--color-text-muted)]">{t('noPosts')}</p>
    )
  }

  const featured = posts.find(p => p.featured)
  const rest = posts.filter(p => p !== featured)

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featured && <PostCard post={featured} locale={locale} featured />}
      {rest.map(post => (
        <PostCard key={post.slug} post={post} locale={locale} />
      ))}
    </div>
  )
}
