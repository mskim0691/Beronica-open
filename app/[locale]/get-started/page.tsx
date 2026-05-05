import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { generateAlternates } from '@/lib/seo'
import { BookOpen } from 'lucide-react'
import CopyButton from '@/components/sections/get-started/CopyButton'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'ko' ? '시작하기' : 'Get Started',
    description: locale === 'ko'
      ? '5분이면 베로니카를 시작할 수 있습니다. 자동 설치 프롬프트를 복사해서 AI에 붙여넣으세요.'
      : 'Start Beronica in just 5 minutes. Copy the Auto Setup Prompt and paste it into your AI.',
    alternates: generateAlternates('/get-started'),
  }
}

export default function GetStartedPage() {
  const t = useTranslations('getStarted')

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold md:text-5xl">{t('title')}</h1>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
              {t('subtitle')}
            </p>
          </div>

          <div className="mt-12 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10">
                <BookOpen className="h-6 w-6 text-[var(--color-primary)]" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{t('manualTitle')}</h2>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {t('manualDesc')}
                </p>
                <a
                  href={t('manualLink')}
                  className="mt-4 inline-flex items-center gap-1 rounded-[var(--radius-btn)] bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                >
                  {t('manualCta')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold md:text-3xl">{t('promptTitle')}</h2>
            <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
              {t('promptDesc')}
            </p>
          </div>
          <CopyButton />
        </div>
      </section>
    </>
  )
}
