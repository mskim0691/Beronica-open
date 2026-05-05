import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { generateAlternates } from '@/lib/seo'
import CopyButton from '@/components/sections/get-started/CopyButton'
import StepGuide from '@/components/sections/get-started/StepGuide'
import FolderPreview from '@/components/sections/get-started/FolderPreview'
import VaultDownload from '@/components/sections/get-started/VaultDownload'
import SystemOverview from '@/components/sections/get-started/SystemOverview'
import InstallRequirements from '@/components/sections/get-started/InstallRequirements'
import UsagePattern from '@/components/sections/get-started/UsagePattern'
import VerificationTests from '@/components/sections/get-started/VerificationTests'
import FAQ from '@/components/sections/get-started/FAQ'

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
      {/* Section 1: Hero */}
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

      {/* Section 2: System Overview */}
      <section className="py-16 md:py-24 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SystemOverview />
        </div>
      </section>

      {/* Section 3: Requirements */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <InstallRequirements />
        </div>
      </section>

      {/* Section 4: Installation Steps */}
      <section className="py-16 md:py-24 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <StepGuide />
        </div>
      </section>

      {/* Section 5: Auto Setup Prompt */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold md:text-3xl">{t('autoSetup.sectionTitle')}</h2>
              <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
                {t('autoSetup.sectionDesc')}
              </p>
            </div>
            <CopyButton />
          </div>
        </div>
      </section>

      {/* Section 6: Folder Structure */}
      <section className="py-16 md:py-24 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FolderPreview />
        </div>
      </section>

      {/* Section 7: Daily Usage Pattern */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <UsagePattern />
        </div>
      </section>

      {/* Section 8: Verification Tests */}
      <section className="py-16 md:py-24 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <VerificationTests />
        </div>
      </section>

      {/* Section 9: FAQ */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FAQ />
        </div>
      </section>

      {/* Section 10: Vault Download */}
      <section className="py-16 md:py-24 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <VaultDownload />
        </div>
      </section>
    </>
  )
}
