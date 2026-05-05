import { useTranslations } from 'next-intl'
import { FEATURES } from '@/lib/features-data'

export default function AnchorNav() {
  const t = useTranslations('features.detail')

  return (
    <nav className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ul className="flex justify-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <li key={feature.id} className="flex-shrink-0">
                <a
                  href={`#${feature.anchorId}`}
                  className="inline-flex items-center gap-1.5 rounded-[var(--radius-btn)] px-3 py-1.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
                >
                  <Icon className="h-4 w-4" />
                  {t(feature.titleKey)}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
