import { useTranslations } from 'next-intl'
import { CheckCircle2 } from 'lucide-react'

export default function VerificationTests() {
  const t = useTranslations('getStarted.verification')

  const tests = [
    { inputKey: 'test1Input' as const, expectedKey: 'test1Expected' as const },
    { inputKey: 'test2Input' as const, expectedKey: 'test2Expected' as const },
    { inputKey: 'test3Input' as const, expectedKey: 'test3Expected' as const },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold md:text-3xl">{t('sectionTitle')}</h2>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          {t('sectionSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {tests.map((test, idx) => (
          <div
            key={test.inputKey}
            className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-5"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white">
                {idx + 1}
              </span>
              <span className="text-xs font-medium uppercase text-[var(--color-text-muted)]">
                {t('inputLabel')}
              </span>
            </div>
            <p className="mt-3 rounded-lg bg-[var(--color-surface)] px-3 py-2 text-sm font-mono">
              {t(test.inputKey)}
            </p>
            <div className="mt-4 flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              <div>
                <span className="text-xs font-medium text-[var(--color-text-muted)]">
                  {t('expectedLabel')}
                </span>
                <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">
                  {t(test.expectedKey)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
