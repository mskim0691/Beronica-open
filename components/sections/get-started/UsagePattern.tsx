import { useTranslations } from 'next-intl'

export default function UsagePattern() {
  const t = useTranslations('getStarted.usagePattern')

  const rows = [
    { when: 'morning', action: 'morningAction', ai: 'morningAI' },
    { when: 'duringWork', action: 'captureAction', ai: 'captureAI' },
    { when: 'duringWork', action: 'contactAction', ai: 'contactAI' },
    { when: 'classify', action: 'classifyAction', ai: 'classifyAI' },
    { when: 'monday', action: 'mondayAction', ai: 'mondayAI' },
    { when: 'weekend', action: 'weekendAction', ai: 'weekendAI' },
  ] as const

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold md:text-3xl">{t('sectionTitle')}</h2>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          {t('sectionSubtitle')}
        </p>
      </div>

      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--color-border)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
              <th className="px-4 py-3 text-left font-semibold">{t('headerWhen')}</th>
              <th className="px-4 py-3 text-left font-semibold">{t('headerAction')}</th>
              <th className="px-4 py-3 text-left font-semibold">{t('headerAI')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={`${row.when}-${row.action}`}
                className={idx < rows.length - 1 ? 'border-b border-[var(--color-border)]' : ''}
              >
                <td className="px-4 py-3 font-medium">{t(row.when)}</td>
                <td className="px-4 py-3 text-[var(--color-text-secondary)]">{t(row.action)}</td>
                <td className="px-4 py-3 text-[var(--color-text-secondary)]">{t(row.ai)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
