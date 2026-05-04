import { useTranslations } from 'next-intl'
import { Download, Copy, Play } from 'lucide-react'

export default function StepGuide() {
  const t = useTranslations('getStarted')

  const steps = [
    {
      titleKey: 'step1Title' as const,
      descKey: 'step1Desc' as const,
      icon: Download,
      link: { href: 'https://obsidian.md', label: t('step1Link') },
    },
    {
      titleKey: 'step2Title' as const,
      descKey: 'step2Desc' as const,
      icon: Copy,
      link: null,
    },
    {
      titleKey: 'step3Title' as const,
      descKey: 'step3Desc' as const,
      icon: Play,
      link: null,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {steps.map((step) => {
        const Icon = step.icon
        return (
          <div
            key={step.titleKey}
            className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
              <Icon className="h-5 w-5 text-[var(--color-primary)]" />
            </div>
            <h3 className="mt-4 text-base font-semibold">{t(step.titleKey)}</h3>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              {t(step.descKey)}
            </p>
            {step.link && (
              <a
                href={step.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
              >
                {step.link.label} &rarr;
              </a>
            )}
          </div>
        )
      })}
    </div>
  )
}
