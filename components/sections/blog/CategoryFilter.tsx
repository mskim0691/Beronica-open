import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface CategoryFilterProps {
  categories: string[]
  activeCategory?: string
  locale: 'ko' | 'en'
}

export default function CategoryFilter({ categories, activeCategory, locale }: CategoryFilterProps) {
  const t = useTranslations('blog')
  const prefix = locale === 'ko' ? '' : '/en'

  return (
    <nav className="flex flex-wrap gap-2" aria-label="Blog categories">
      <Link
        href={`${prefix}/blog`}
        className={cn(
          'rounded-full px-4 py-2 text-sm font-medium transition-colors',
          !activeCategory
            ? 'bg-[var(--color-primary)] text-white'
            : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
        )}
      >
        {t('allPosts')}
      </Link>
      {categories.map(cat => (
        <Link
          key={cat}
          href={`${prefix}/blog/category/${encodeURIComponent(cat)}`}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            activeCategory === cat
              ? 'bg-[var(--color-primary)] text-white'
              : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
          )}
        >
          {t(`categories.${cat}` as any)}
        </Link>
      ))}
    </nav>
  )
}
