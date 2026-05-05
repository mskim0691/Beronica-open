import { useTranslations } from 'next-intl'
import { FileText, Server, Terminal, Puzzle, CreditCard } from 'lucide-react'

export default function InstallRequirements() {
  const t = useTranslations('getStarted.requirements')

  const rows = [
    {
      icon: FileText,
      nameKey: 'obsidian' as const,
      purposeKey: 'obsidianPurpose' as const,
      requiredKey: 'required' as const,
      costKey: 'free' as const,
    },
    {
      icon: Server,
      nameKey: 'nodejs' as const,
      purposeKey: 'nodejsPurpose' as const,
      requiredKey: 'required' as const,
      costKey: 'free' as const,
    },
    {
      icon: Terminal,
      nameKey: 'claudeCode' as const,
      purposeKey: 'claudeCodePurpose' as const,
      requiredKey: 'required' as const,
      costKey: 'freeInstall' as const,
    },
    {
      icon: Puzzle,
      nameKey: 'claudian' as const,
      purposeKey: 'claudianPurpose' as const,
      requiredKey: 'required' as const,
      costKey: 'freePlugin' as const,
    },
    {
      icon: CreditCard,
      nameKey: 'subscription' as const,
      purposeKey: 'subscriptionPurpose' as const,
      requiredKey: 'required' as const,
      costKey: 'fromPrice' as const,
    },
  ]

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
              <th className="px-4 py-3 text-left font-semibold">{t('headerSoftware')}</th>
              <th className="px-4 py-3 text-left font-semibold">{t('headerPurpose')}</th>
              <th className="px-4 py-3 text-center font-semibold">{t('headerRequired')}</th>
              <th className="px-4 py-3 text-right font-semibold">{t('headerCost')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const Icon = row.icon
              return (
                <tr
                  key={row.nameKey}
                  className={idx < rows.length - 1 ? 'border-b border-[var(--color-border)]' : ''}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-[var(--color-primary)]" />
                      <span className="font-medium">{t(row.nameKey)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-secondary)]">
                    {t(row.purposeKey)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      {t(row.requiredKey)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-[var(--color-text-secondary)]">
                    {t(row.costKey)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
