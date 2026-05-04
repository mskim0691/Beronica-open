import { useTranslations } from 'next-intl'
import type { Feature } from '@/lib/features-data'
import DemoChat from '@/components/demo/DemoChat'
import DemoFolder from '@/components/demo/DemoFolder'
import DemoTable from '@/components/demo/DemoTable'
import DemoDiagram from '@/components/demo/DemoDiagram'

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
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white">
              {feature.demoType === 'chat' && <DemoChat featureId={feature.id as 'aiMemory' | 'gtdInbox'} />}
              {feature.demoType === 'folder' && <DemoFolder />}
              {feature.demoType === 'table' && <DemoTable featureId={feature.id as 'dailyReview' | 'weeklyReview'} />}
              {feature.demoType === 'diagram' && <DemoDiagram featureId={feature.id as 'contactMgmt' | 'localPrivacy'} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
