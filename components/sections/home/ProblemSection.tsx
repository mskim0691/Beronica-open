import { useTranslations } from 'next-intl'
import { Puzzle, ListX, RotateCcw, Search, Flame } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const PAIN_POINTS = [
  { key: 'fragmentation', icon: Puzzle },
  { key: 'gtdFailure', icon: ListX },
  { key: 'contextReset', icon: RotateCcw },
  { key: 'searchCost', icon: Search },
  { key: 'burnout', icon: Flame },
] as const

export default function ProblemSection() {
  const t = useTranslations('home.problem')

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <blockquote className="mx-auto max-w-2xl text-center text-2xl font-semibold italic text-[var(--color-text)] md:text-3xl">
          &ldquo;{t('quote')}&rdquo;
        </blockquote>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PAIN_POINTS.map(({ key, icon: Icon }) => (
            <Card key={key} className="text-center">
              <CardContent className="p-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
                  <Icon className="h-6 w-6 text-[var(--color-primary)]" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{t(key)}</h3>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {t(`${key}Desc`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded-card bg-[var(--color-surface)] p-6 text-center">
          <p className="text-sm text-[var(--color-text-secondary)]">{t('stat1')}</p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{t('stat2')}</p>
        </div>

        <p className="mt-10 mx-auto max-w-2xl text-center text-lg font-semibold">
          <span className="text-[var(--color-accent)]">{t('insight')}</span>
        </p>
      </div>
    </section>
  )
}
