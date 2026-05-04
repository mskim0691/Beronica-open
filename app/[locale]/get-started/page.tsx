import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { generateAlternates } from '@/lib/seo'
import CopyButton from '@/components/sections/get-started/CopyButton'
import StepGuide from '@/components/sections/get-started/StepGuide'
import FolderPreview from '@/components/sections/get-started/FolderPreview'
import VaultDownload from '@/components/sections/get-started/VaultDownload'

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
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold md:text-5xl">{t('title')}</h1>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
              {t('subtitle')}
            </p>
            <p className="mt-2 text-base text-[var(--color-text-secondary)]">
              {t('heroDesc')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <CopyButton />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <StepGuide />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FolderPreview />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <VaultDownload />
        </div>
      </section>
    </>
  )
}
