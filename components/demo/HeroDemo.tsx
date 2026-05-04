'use client'

import { useLocale } from 'next-intl'

const sidebarData = {
  ko: [
    { icon: '📥', label: 'Inbox (3)', active: true },
    { icon: '📋', label: '오늘 할 일', active: false },
    { icon: '📁', label: '프로젝트', active: false },
    { icon: '🔍', label: '검색', active: false },
  ],
  en: [
    { icon: '📥', label: 'Inbox (3)', active: true },
    { icon: '📋', label: 'Today', active: false },
    { icon: '📁', label: 'Projects', active: false },
    { icon: '🔍', label: 'Search', active: false },
  ],
}

const chatAreaData = {
  ko: {
    aiGreeting: '좋은 아침이에요! 오늘 3건의 할 일이 있어요.',
    userMsg: '어제 미팅 내용 정리해줘',
    aiReplyIntro: '📋 어제 팀 미팅 요약:',
    aiReplyItems: ['1. Q2 런칭 → 6/15 확정', '2. 디자인 리뷰 → 매주 화'],
    aiReplyFooter: '할 일 2건을 자동 생성했어요 ✨',
    inputPlaceholder: '메시지를 입력하세요...',
  },
  en: {
    aiGreeting: 'Good morning! You have 3 tasks today.',
    userMsg: "Summarize yesterday's meeting",
    aiReplyIntro: "📋 Yesterday's team meeting:",
    aiReplyItems: ['1. Q2 launch → 6/15 confirmed', '2. Design review → every Tue'],
    aiReplyFooter: 'Auto-created 2 tasks ✨',
    inputPlaceholder: 'Type a message...',
  },
}

function WindowChrome() {
  return (
    <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5">
      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#FFBD2E' }} />
      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#27C93F' }} />
      <span className="flex-1 text-center text-xs font-medium text-[var(--color-text-muted)]">
        Beronica
      </span>
      {/* Spacer to balance the dots */}
      <div className="w-[42px]" />
    </div>
  )
}

function AiAvatar() {
  return (
    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-[8px] font-bold text-white">
      B
    </div>
  )
}

function Sidebar({ lang }: { lang: 'ko' | 'en' }) {
  const items = sidebarData[lang]

  return (
    <div className="flex flex-col gap-0.5 border-r border-[var(--color-border)] bg-[var(--color-surface)] p-2">
      {items.map((item) => (
        <div
          key={item.label}
          className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[10px] ${
            item.active
              ? 'bg-[var(--color-primary)]/10 font-medium text-[var(--color-text)]'
              : 'text-[var(--color-text-secondary)]'
          }`}
        >
          <span>{item.icon}</span>
          <span className="truncate">{item.label}</span>
          {item.active && (
            <span className="ml-auto flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-[var(--color-primary)] px-1 text-[8px] font-medium text-white">
              3
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function ChatArea({ lang }: { lang: 'ko' | 'en' }) {
  const d = chatAreaData[lang]

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-2.5 p-3">
        {/* AI greeting */}
        <div className="flex items-start gap-1.5">
          <AiAvatar />
          <div className="rounded-xl bg-[var(--color-surface)] px-2.5 py-1.5 text-[11px] text-[var(--color-text)]">
            {d.aiGreeting}
          </div>
        </div>

        {/* User message */}
        <div className="flex justify-end">
          <div className="rounded-xl bg-[var(--color-primary)]/10 px-2.5 py-1.5 text-[11px] text-[var(--color-text)]">
            {d.userMsg}
          </div>
        </div>

        {/* AI reply with list */}
        <div className="flex items-start gap-1.5">
          <AiAvatar />
          <div className="rounded-xl bg-[var(--color-surface)] px-2.5 py-1.5 text-[11px] text-[var(--color-text)]">
            <p>{d.aiReplyIntro}</p>
            <ol className="mt-1 space-y-0.5 pl-3 text-[var(--color-text-secondary)]">
              {d.aiReplyItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p className="mt-1.5 text-[var(--color-primary)]">
              {d.aiReplyFooter}
            </p>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="border-t border-[var(--color-border)] p-2">
        <div className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-2.5 py-1.5">
          <span className="flex-1 text-[10px] text-[var(--color-text-muted)]">
            {d.inputPlaceholder}
          </span>
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)]">
            <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HeroDemo() {
  const locale = useLocale()
  const lang = locale === 'en' ? 'en' : 'ko'

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-lg">
      <WindowChrome />
      <div className="grid grid-cols-[30%_1fr]" style={{ minHeight: '280px' }}>
        <Sidebar lang={lang} />
        <ChatArea lang={lang} />
      </div>
    </div>
  )
}
