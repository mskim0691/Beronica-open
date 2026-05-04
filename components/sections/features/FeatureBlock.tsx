import { useTranslations } from 'next-intl'
import type { Feature } from '@/lib/features-data'

interface FeatureBlockProps {
  feature: Feature
  index: number
}

export default function FeatureBlock({ feature, index }: FeatureBlockProps) {
  const t = useTranslations('features.detail')
  const Icon = feature.icon
  const isReversed = index % 2 !== 0

  return (
    <section
      id={feature.anchorId}
      className="py-16 md:py-24 scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className={`grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16 ${isReversed ? 'md:[direction:rtl]' : ''}`}>
          <div className={isReversed ? 'md:[direction:ltr]' : ''}>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10">
              <Icon className="h-7 w-7 text-[var(--color-primary)]" />
            </div>
            <h2 className="mt-6 text-2xl font-bold md:text-3xl">
              {t(feature.titleKey)}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {t(feature.descKey)}
            </p>
          </div>

          <div className={isReversed ? 'md:[direction:ltr]' : ''}>
            <div className="flex aspect-[4/3] items-center justify-center rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)]">
              <div className="text-center text-sm text-[var(--color-text-muted)]">
                <Icon className="mx-auto mb-2 h-10 w-10 opacity-30" />
                <span>{feature.demoType} demo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
