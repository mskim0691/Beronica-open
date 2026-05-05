'use client'

import { useTranslations } from 'next-intl'
import { Download, Server, Terminal, Puzzle, Package, Settings } from 'lucide-react'

export default function StepGuide() {
  const t = useTranslations('getStarted.installation')

  const steps = [
    {
      icon: Download,
      titleKey: 'step1Title' as const,
      descKey: 'step1Desc' as const,
      content: (
        <a
          href="https://obsidian.md"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-medium text-[var(--color-primary)] hover:underline"
        >
          obsidian.md &rarr;
        </a>
      ),
    },
    {
      icon: Server,
      titleKey: 'step2Title' as const,
      descKey: 'step2Desc' as const,
      content: (
        <div className="space-y-2">
          <a
            href="https://nodejs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium text-[var(--color-primary)] hover:underline"
          >
            nodejs.org &rarr;
          </a>
          <code className="block rounded bg-[var(--color-text)]/5 px-3 py-1.5 text-xs font-mono">
            node -v
          </code>
        </div>
      ),
    },
    {
      icon: Terminal,
      titleKey: 'step3Title' as const,
      descKey: 'step3Desc' as const,
      content: (
        <div className="space-y-2">
          <code className="block rounded bg-[var(--color-text)]/5 px-3 py-1.5 text-xs font-mono">
            npm install -g @anthropic-ai/claude-code
          </code>
          <code className="block rounded bg-[var(--color-text)]/5 px-3 py-1.5 text-xs font-mono">
            claude --version
          </code>
        </div>
      ),
    },
    {
      icon: Puzzle,
      titleKey: 'step4Title' as const,
      descKey: 'step4Desc' as const,
      content: (
        <code className="block rounded bg-[var(--color-text)]/5 px-3 py-1.5 text-xs font-mono">
          GitHub: YishenTu/claudian
        </code>
      ),
    },
    {
      icon: Package,
      titleKey: 'step5Title' as const,
      descKey: 'step5Desc' as const,
      content: (
        <ul className="space-y-1 text-xs text-[var(--color-text-secondary)]">
          <li>{t('step5Templater')}</li>
          <li>{t('step5Calendar')}</li>
          <li>{t('step5Dataview')}</li>
          <li>{t('step5Tasks')}</li>
        </ul>
      ),
    },
    {
      icon: Settings,
      titleKey: 'step6Title' as const,
      descKey: 'step6Desc' as const,
      content: (
        <ul className="space-y-1 text-xs text-[var(--color-text-secondary)]">
          <li>{t('step6Daily')}</li>
          <li>{t('step6DateFormat')}</li>
          <li>{t('step6NewNote')}</li>
        </ul>
      ),
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

      <div className="mx-auto max-w-3xl space-y-3">
        {steps.map((step, idx) => {
          const Icon = step.icon
          return (
            <details
              key={step.titleKey}
              className="group rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white"
              {...(idx === 0 ? { open: true } : {})}
            >
              <summary className="flex cursor-pointer items-center gap-3 px-5 py-4 transition-colors hover:bg-[var(--color-surface)]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                  <Icon className="h-4 w-4 text-[var(--color-primary)]" />
                </span>
                <span className="flex-1 text-sm font-semibold">{t(step.titleKey)}</span>
                <span className="shrink-0 text-[var(--color-text-muted)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="border-t border-[var(--color-border)] px-5 py-4 pl-16">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {t(step.descKey)}
                </p>
                <div className="mt-3">{step.content}</div>
              </div>
            </details>
          )
        })}
      </div>
    </div>
  )
}
