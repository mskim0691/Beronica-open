import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getPostBySlug, getAllPosts, getPostsByCategory } from '@/lib/mdx'
import { generatePostMeta, generateArticleJsonLd, generateAlternates } from '@/lib/seo'
import BlogMDX from '@/components/sections/blog/BlogMDX'
import ShareButton from '@/components/sections/blog/ShareButton'
import PostCard from '@/components/sections/blog/PostCard'

export async function generateStaticParams() {
  const koPosts = await getAllPosts('ko')
  const enPosts = await getAllPosts('en')
  return [
    ...koPosts.map(p => ({ locale: 'ko', slug: p.slug })),
    ...enPosts.map(p => ({ locale: 'en', slug: p.slug })),
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, locale as 'ko' | 'en')
  if (!post) return { title: 'Not Found' }
  return {
    ...generatePostMeta(post),
    alternates: generateAlternates(`/blog/${slug}`),
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const typedLocale = (locale === 'en' ? 'en' : 'ko') as 'ko' | 'en'
  const post = await getPostBySlug(slug, typedLocale)
  if (!post) notFound()

  const t = await getTranslations('blog')
  const prefix = typedLocale === 'ko' ? '' : '/en'

  const relatedPosts = (await getPostsByCategory(post.category, typedLocale))
    .filter(p => p.slug !== post.slug)
    .slice(0, 3)

  const dateStr = new Date(post.date).toLocaleDateString(
    typedLocale === 'ko' ? 'ko-KR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  const jsonLd = generateArticleJsonLd({ ...post, locale: typedLocale })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="py-16 md:py-24">
        <div className="mx-auto max-w-prose px-4 sm:px-6">
          <Link
            href={`${prefix}/blog`}
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            {t('backToBlog')}
          </Link>

          <header className="mt-8">
            <span className="inline-block rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-medium text-white">
              {post.category}
            </span>
            <h1 className="mt-4 text-3xl font-bold md:text-4xl">{post.title}</h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
              <span>{post.author}</span>
              <span>·</span>
              <time dateTime={post.date}>{dateStr}</time>
              <span>·</span>
              <span>{t('readingTime', { minutes: post.readingTime })}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.map(tag => (
                <span key={tag} className="rounded-full bg-[var(--color-surface)] px-2.5 py-1 text-xs text-[var(--color-text-muted)]">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="mt-12">
            <BlogMDX source={post.content} />
          </div>

          <div className="mt-12 border-t border-[var(--color-border)] pt-6">
            <ShareButton slug={post.slug} />
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="border-t border-[var(--color-border)] py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-8 text-2xl font-bold">{t('relatedPosts')}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map(p => (
                <PostCard key={p.slug} post={p} locale={typedLocale} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
