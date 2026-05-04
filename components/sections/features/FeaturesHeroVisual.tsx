import { FEATURES } from '@/lib/features-data'
import { useTranslations } from 'next-intl'

export default function FeaturesHeroVisual() {
  const t = useTranslations('features.detail')

  return (
    <div className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
      {FEATURES.map((feature) => {
        const Icon = feature.icon
        return (
          <a
            key={feature.id}
            href={`#${feature.anchorId}`}
            className="group flex flex-col items-center gap-2 rounded-xl p-3 transition-colors hover:bg-[var(--color-surface)]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 transition-colors group-hover:bg-[var(--color-primary)]/20">
              <Icon className="h-5 w-5 text-[var(--color-primary)]" />
            </div>
            <span className="text-center text-[10px] font-medium leading-tight text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)]">
              {t(feature.titleKey)}
            </span>
          </a>
        )
      })}
    </div>
  )
}
