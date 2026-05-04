import { SITE_META } from './site-config'

export function generateAlternates(path: string) {
  return {
    languages: {
      ko: `${SITE_META.url}${path}`,
      en: `${SITE_META.url}/en${path}`,
      'x-default': `${SITE_META.url}${path}`,
    },
  }
}

export function generatePostMeta(post: {
  title: string
  description: string
  image?: string
  date: string
  author: string
}) {
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article' as const,
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: post.title,
      description: post.description,
      creator: SITE_META.twitterHandle,
    },
  }
}

export function generateArticleJsonLd(post: {
  title: string
  description: string
  date: string
  author: string
  image?: string
  slug: string
  locale: string
}) {
  const url = post.locale === 'ko'
    ? `${SITE_META.url}/blog/${post.slug}`
    : `${SITE_META.url}/en/blog/${post.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_META.name,
      url: SITE_META.url,
    },
    url,
    image: post.image || SITE_META.ogImage,
    inLanguage: post.locale,
  }
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_META.name,
    url: SITE_META.url,
    description: SITE_META.tagline,
    sameAs: [],
  }
}
