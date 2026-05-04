interface DemoTableProps {
  featureId: 'dailyReview' | 'weeklyReview'
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

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <div
      className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border ${
        checked
          ? 'border-[var(--color-success)] bg-[var(--color-success)] text-white'
          : 'border-[var(--color-border)] bg-white'
      }`}
    >
      {checked && (
        <svg className="h-2.5 w-2.5" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  )
}

function Badge({ label, variant }: { label: string; variant: 'success' | 'primary' }) {
  const styles =
    variant === 'success'
      ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
      : 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
  return (
    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${styles}`}>
      {label}
    </span>
  )
}

function DailyReview() {
  return (
    <div className="flex flex-1 flex-col justify-center p-4">
      <p className="mb-3 text-xs text-[var(--color-text-muted)]">오늘의 리뷰 — 5월 4일</p>

      <div className="space-y-1">
        {/* Checked items */}
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs">
          <Checkbox checked />
          <span className="line-through text-[var(--color-text-muted)]">제안서 초안 작성</span>
          <Badge label="완료" variant="success" />
        </div>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs">
          <Checkbox checked />
          <span className="line-through text-[var(--color-text-muted)]">디자인 피드백</span>
          <Badge label="완료" variant="success" />
        </div>
        {/* Active item */}
        <div className="flex items-center gap-2 rounded-md bg-[var(--color-primary)]/5 px-2 py-1.5 text-xs">
          <Checkbox checked={false} />
          <span className="text-[var(--color-text)]">API 문서 업데이트</span>
          <Badge label="진행중" variant="primary" />
        </div>
        {/* Unchecked item */}
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs">
          <Checkbox checked={false} />
          <span className="text-[var(--color-text)]">주간 보고서</span>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="mt-4 flex items-center gap-3 border-t border-[var(--color-border)] pt-3">
        <div className="flex-1">
          <p className="text-[10px] text-[var(--color-text-muted)]">진행률 50%</p>
          <div className="mt-1 h-1.5 w-full rounded-full bg-[var(--color-border)]">
            <div className="h-1.5 w-1/2 rounded-full bg-[var(--color-primary)]" />
          </div>
        </div>
        <p className="text-[10px] text-[var(--color-text-muted)]">집중 시간: 3.5h</p>
      </div>
    </div>
  )
}

function WeeklyReview() {
  return (
    <div className="flex flex-1 flex-col justify-center p-4">
      <p className="mb-3 text-xs text-[var(--color-text-muted)]">이번 주 요약</p>

      {/* Big number */}
      <div className="mb-3 text-center">
        <span className="text-lg font-bold text-[var(--color-primary)]">12/18</span>
        <span className="ml-1 text-xs text-[var(--color-text-muted)]">완료</span>
      </div>

      {/* Progress bar */}
      <div className="mb-4 h-2 w-full rounded-full bg-[var(--color-border)]">
        <div className="h-2 rounded-full bg-[var(--color-primary)]" style={{ width: '67%' }} />
      </div>

      {/* Stats row */}
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-[var(--color-surface)] p-2">
          <p className="text-[10px] text-[var(--color-text-muted)]">집중 시간</p>
          <p className="text-xs font-medium text-[var(--color-text)]">
            22h <span className="text-[10px] text-[var(--color-success)]">(+3h ↑)</span>
          </p>
        </div>
        <div className="rounded-lg bg-[var(--color-surface)] p-2">
          <p className="text-[10px] text-[var(--color-text-muted)]">주요 성과</p>
          <p className="text-xs font-medium text-[var(--color-text)]">Q2 기획안 확정</p>
        </div>
      </div>

      {/* Next week */}
      <div className="rounded-lg border border-[var(--color-border)] px-3 py-2">
        <p className="text-[10px] text-[var(--color-text-muted)]">다음 주</p>
        <p className="text-xs text-[var(--color-text)]">디자인 리뷰 3건</p>
      </div>
    </div>
  )
}

export default function DemoTable({ featureId }: DemoTableProps) {
  return (
    <div className="flex h-full flex-col">
      <WindowChrome />
      {featureId === 'dailyReview' ? <DailyReview /> : <WeeklyReview />}
    </div>
  )
}
