'use client'

import { useLocale } from 'next-intl'

interface DemoChatProps {
  featureId: 'aiMemory' | 'gtdInbox'
}

const chatData = {
  aiMemory: {
    ko: {
      user: '지난주 미팅에서 결정한 거 뭐였지?',
      aiIntro: '3월 28일 팀 미팅 기록입니다:',
      items: ['✅ Q2 런칭: 6월 15일 확정', '✅ 디자인 리뷰: 매주 화요일'],
    },
    en: {
      user: "What did we decide in last week's meeting?",
      aiIntro: 'Found your Mar 28 team meeting notes:',
      items: ['✅ Q2 launch: confirmed Jun 15', '✅ Design review: every Tuesday'],
    },
  },
  gtdInbox: {
    ko: {
      user: '김대리한테 다음주까지 제안서 요청해야 함',
      aiIntro: '📥 Inbox에 캡처했습니다',
      items: ['→ 프로젝트: Q2 제안서', '→ 다음 행동: 김대리에게 연락', '→ 마감: 5월 13일(화)'],
    },
    en: {
      user: 'Ask Kim for the proposal by next week',
      aiIntro: '📥 Captured to Inbox',
      items: ['→ Project: Q2 Proposal', '→ Next action: Contact Kim', '→ Due: May 13 (Tue)'],
    },
  },
}

function WindowChrome() {
  return (
    <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2">
      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#FFBD2E' }} />
      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#27C93F' }} />
    </div>
  )
}

function AiAvatar() {
  return (
    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-white">
      B
    </div>
  )
}

export default function DemoChat({ featureId }: DemoChatProps) {
  const locale = useLocale()
  const lang = locale === 'en' ? 'en' : 'ko'
  const data = chatData[featureId][lang]

  return (
    <div className="flex h-full flex-col">
      <WindowChrome />
      <div className="flex flex-1 flex-col justify-center gap-3 p-4">
        {/* User bubble */}
        <div className="flex justify-end">
          <div className="max-w-[75%] rounded-xl bg-[var(--color-primary)]/10 px-3 py-2 text-xs text-[var(--color-text)]">
            {data.user}
          </div>
        </div>
        {/* AI bubble */}
        <div className="flex items-start gap-2">
          <AiAvatar />
          <div className="max-w-[75%] rounded-xl bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text)]">
            <p>{data.aiIntro}</p>
            <ul className="mt-1.5 space-y-1 text-[var(--color-text-secondary)]">
              {data.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
