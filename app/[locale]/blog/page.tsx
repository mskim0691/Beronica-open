import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getAllPosts, getCategories } from '@/lib/mdx'
import { generateAlternates } from '@/lib/seo'
import PostList from '@/components/sections/blog/PostList'
import CategoryFilter from '@/components/sections/blog/CategoryFilter'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'ko' ? '블로그' : 'Blog',
    description: locale === 'ko'
      ? 'GTD, PARA, AI Memory에 관한 깊은 인사이트'
      : 'Deep insights on GTD, PARA, and AI Memory',
    alternates: generateAlternates('/blog'),
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const typedLocale = (locale === 'en' ? 'en' : 'ko') as 'ko' | 'en'
  const [posts, categories] = await Promise.all([
    getAllPosts(typedLocale),
    getCategories(typedLocale),
  ])
  const t = useTranslations('blog')

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <h1 className="text-3xl font-bold md:text-5xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">{t('subtitle')}</p>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8">
            <CategoryFilter categories={categories} locale={typedLocale} />
          </div>
          <PostList posts={posts} locale={typedLocale} />
        </div>
      </section>
    </>
  )
}
