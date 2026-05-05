import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getPostsByCategory, getCategories } from '@/lib/mdx'
import { generateAlternates } from '@/lib/seo'
import PostList from '@/components/sections/blog/PostList'
import CategoryFilter from '@/components/sections/blog/CategoryFilter'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale, category } = await params
  const decoded = decodeURIComponent(category)
  return {
    title: `${decoded} | ${locale === 'ko' ? '블로그' : 'Blog'}`,
    alternates: generateAlternates(`/blog/category/${category}`),
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale, category } = await params
  const typedLocale = (locale === 'en' ? 'en' : 'ko') as 'ko' | 'en'
  const decoded = decodeURIComponent(category)
  const [posts, categories] = await Promise.all([
    getPostsByCategory(decoded, typedLocale),
    getCategories(typedLocale),
  ])
  const t = await getTranslations('blog')

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <h1 className="text-3xl font-bold md:text-5xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">{decoded}</p>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8">
            <CategoryFilter categories={categories} activeCategory={decoded} locale={typedLocale} />
          </div>
          <PostList posts={posts} locale={typedLocale} />
        </div>
      </section>
    </>
  )
}
