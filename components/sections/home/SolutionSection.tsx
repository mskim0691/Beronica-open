import { useTranslations } from 'next-intl'

export default function SolutionSection() {
  const t = useTranslations('home.solution')

  return (
    <section className="bg-[var(--color-surface)] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-card border border-[var(--color-border)] bg-[var(--color-bg)] p-8">
            <p className="text-sm font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
              {t('before')}
            </p>
            <p className="mt-2 text-[var(--color-text-secondary)]">{t('beforeDesc')}</p>
          </div>
          <div className="rounded-card border-2 border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 p-8">
            <p className="text-sm font-medium uppercase tracking-wider text-[var(--color-primary)]">
              {t('after')}
            </p>
            <p className="mt-2 text-[var(--color-text)]">{t('afterDesc')}</p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-lg rounded-card border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
          <div className="space-y-4">
            <ChatBubble align="right" text={t('chatUser1')} />
            <ChatBubble align="left" text={t('chatBot1')} />
            <ChatBubble align="right" text={t('chatUser2')} />
            <ChatBubble align="left" text={t('chatBot2')} />
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-2xl font-bold text-[var(--color-text)] md:text-3xl">
            {t('killer')}
          </p>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            {t('killerSub')}
          </p>
        </div>
      </div>
    </section>
  )
}

function ChatBubble({ align, text }: { align: 'left' | 'right'; text: string }) {
  const isUser = align === 'right'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
          isUser
            ? 'bg-[var(--color-primary)] text-white'
            : 'bg-[var(--color-surface)] text-[var(--color-text)]'
        }`}
      >
        {text}
      </div>
    </div>
  )
}
