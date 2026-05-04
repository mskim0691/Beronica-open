import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { FEATURES } from '@/lib/features-data'
import { generateAlternates } from '@/lib/seo'
import AnchorNav from '@/components/sections/features/AnchorNav'
import FeatureBlock from '@/components/sections/features/FeatureBlock'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'ko' ? '기능' : 'Features',
    description: locale === 'ko'
      ? '베로니카의 7가지 핵심 기능 — AI Memory, GTD Inbox, Daily/Weekly Review, PARA Structure, Contact Management, Local Privacy'
      : '7 core features of Beronica — AI Memory, GTD Inbox, Daily/Weekly Review, PARA Structure, Contact Management, Local Privacy',
    alternates: generateAlternates('/features'),
  }
}

export default function FeaturesPage() {
  const t = useTranslations('features')

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <h1 className="text-3xl font-bold md:text-5xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <AnchorNav />

      {FEATURES.map((feature, index) => (
        <FeatureBlock key={feature.id} feature={feature} index={index} />
      ))}
    </>
  )
}
