interface DemoChatProps {
  featureId: 'aiMemory' | 'gtdInbox'
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
  return (
    <div className="flex h-full flex-col">
      <WindowChrome />
      <div className="flex flex-1 flex-col justify-center gap-3 p-4">
        {featureId === 'aiMemory' && (
          <>
            {/* User bubble */}
            <div className="flex justify-end">
              <div className="max-w-[75%] rounded-xl bg-[var(--color-primary)]/10 px-3 py-2 text-xs text-[var(--color-text)]">
                지난주 미팅에서 결정한 거 뭐였지?
              </div>
            </div>
            {/* AI bubble */}
            <div className="flex items-start gap-2">
              <AiAvatar />
              <div className="max-w-[75%] rounded-xl bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text)]">
                <p>3월 28일 팀 미팅 기록입니다:</p>
                <ul className="mt-1.5 space-y-1">
                  <li>✅ Q2 런칭: 6월 15일 확정</li>
                  <li>✅ 디자인 리뷰: 매주 화요일</li>
                </ul>
              </div>
            </div>
          </>
        )}

        {featureId === 'gtdInbox' && (
          <>
            {/* User bubble */}
            <div className="flex justify-end">
              <div className="max-w-[75%] rounded-xl bg-[var(--color-primary)]/10 px-3 py-2 text-xs text-[var(--color-text)]">
                김대리한테 다음주까지 제안서 요청해야 함
              </div>
            </div>
            {/* AI bubble */}
            <div className="flex items-start gap-2">
              <AiAvatar />
              <div className="max-w-[75%] rounded-xl bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text)]">
                <p>📥 Inbox에 캡처했습니다</p>
                <ul className="mt-1.5 space-y-1 text-[var(--color-text-secondary)]">
                  <li>→ 프로젝트: Q2 제안서</li>
                  <li>→ 다음 행동: 김대리에게 연락</li>
                  <li>→ 마감: 5월 13일(화)</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
