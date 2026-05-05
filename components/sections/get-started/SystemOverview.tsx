import { useTranslations } from 'next-intl'
import { ListChecks, FolderTree, Bot } from 'lucide-react'

export default function SystemOverview() {
  const t = useTranslations('getStarted.systemOverview')

  const cards = [
    {
      icon: ListChecks,
      titleKey: 'gtdTitle' as const,
      descKey: 'gtdDesc' as const,
      detailKey: 'gtdDetail' as const,
    },
    {
      icon: FolderTree,
      titleKey: 'paraTitle' as const,
      descKey: 'paraDesc' as const,
      detailKey: 'paraDetail' as const,
    },
    {
      icon: Bot,
      titleKey: 'aiTitle' as const,
      descKey: 'aiDesc' as const,
      detailKey: 'aiDetail' as const,
    },
  ]

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold md:text-3xl">{t('sectionTitle')}</h2>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          {t('sectionSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.titleKey}
              className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10">
                <Icon className="h-6 w-6 text-[var(--color-primary)]" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{t(card.titleKey)}</h3>
              <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)]">
                {t(card.descKey)}
              </p>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                {t(card.detailKey)}
              </p>
            </div>
          )
        })}
      </div>

      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h3 className="text-base font-semibold">{t('usageTitle')}</h3>
        <ul className="mt-4 space-y-3">
          <li className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-primary)]">1</span>
            {t('usage1')}
          </li>
          <li className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-primary)]">2</span>
            {t('usage2')}
          </li>
          <li className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-primary)]">3</span>
            {t('usage3')}
          </li>
        </ul>
      </div>
    </div>
  )
}
