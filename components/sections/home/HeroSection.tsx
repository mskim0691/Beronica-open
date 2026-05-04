import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import HeroDemo from '@/components/demo/HeroDemo'

export default function HeroSection() {
  const t = useTranslations('home.hero')

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/5 to-[var(--color-bg)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-[var(--color-text)]">
            {t('tagline')}
          </h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] md:text-xl">
            {t('subtitle')}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/get-started">{t('ctaPrimary')} &rarr;</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/features">{t('ctaSecondary')}</Link>
            </Button>
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-3xl">
            <HeroDemo />
          </div>
        </div>
      </div>
    </section>
  )
}
