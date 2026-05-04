// Design Ref: §8 i18n routing
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Playfair_Display, JetBrains_Mono } from 'next/font/google'
import { isValidLocale } from '@/lib/i18n'
import { SITE_META } from '@/lib/site-config'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import '../globals.css'

// Playfair Display — 영문 H1~H3 (Design §3.3)
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '700'],
})

// JetBrains Mono — 코드 블록 (Design §3.3)
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
})

// Pretendard는 Google Fonts 미지원 — globals.css --font-sans 시스템 폰트 fallback 사용
// M2에서 self-hosted woff2로 교체 예정

export const metadata: Metadata = {
  title: {
    default: SITE_META.name,
    template: `%s | ${SITE_META.name}`,
  },
  description: SITE_META.tagline,
  metadataBase: new URL(SITE_META.url),
  openGraph: {
    type: 'website',
    siteName: SITE_META.name,
    images: [{ url: SITE_META.ogImage }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: SITE_META.twitterHandle,
  },
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  // Next.js 15+: params는 Promise
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={[playfairDisplay.variable, jetbrainsMono.variable].join(' ')}
    >
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-nav">
            본문 바로가기
          </a>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
