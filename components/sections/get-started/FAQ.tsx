'use client'

import { useTranslations } from 'next-intl'

export default function FAQ() {
  const t = useTranslations('getStarted.faq')

  const items = [
    { q: 'q1' as const, a: 'a1' as const },
    { q: 'q2' as const, a: 'a2' as const },
    { q: 'q3' as const, a: 'a3' as const },
    { q: 'q4' as const, a: 'a4' as const },
    { q: 'q5' as const, a: 'a5' as const },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold md:text-3xl">{t('sectionTitle')}</h2>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {items.map((item) => (
          <details
            key={item.q}
            className="group rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white"
          >
            <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold transition-colors hover:bg-[var(--color-surface)]">
              <span>{t(item.q)}</span>
              <span className="ml-4 shrink-0 text-[var(--color-text-muted)] transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="border-t border-[var(--color-border)] px-5 py-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {t(item.a)}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
