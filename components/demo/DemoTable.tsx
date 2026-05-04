'use client'

import { useLocale } from 'next-intl'

interface DemoTableProps {
  featureId: 'dailyReview' | 'weeklyReview'
}

const dailyData = {
  ko: {
    title: '오늘의 리뷰 — 5월 4일',
    items: ['제안서 초안 작성', '디자인 피드백', 'API 문서 업데이트', '주간 보고서'],
    badgeDone: '완료',
    badgeInProgress: '진행중',
    progress: '진행률 50%',
    focus: '집중 시간: 3.5h',
  },
  en: {
    title: "Today's Review — May 4",
    items: ['Draft proposal', 'Design feedback', 'Update API docs', 'Weekly report'],
    badgeDone: 'Done',
    badgeInProgress: 'In progress',
    progress: 'Progress 50%',
    focus: 'Focus: 3.5h',
  },
}

const weeklyData = {
  ko: {
    title: '이번 주 요약',
    done: '완료',
    focusLabel: '집중 시간',
    keyWinLabel: '주요 성과',
    keyWinValue: 'Q2 기획안 확정',
    nextWeekLabel: '다음 주',
    nextWeekValue: '디자인 리뷰 3건',
  },
  en: {
    title: 'This Week Summary',
    done: 'done',
    focusLabel: 'Focus time',
    keyWinLabel: 'Key win',
    keyWinValue: 'Q2 plan finalized',
    nextWeekLabel: 'Next week',
    nextWeekValue: '3 design reviews',
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

function DailyReview({ lang }: { lang: 'ko' | 'en' }) {
  const d = dailyData[lang]
  return (
    <div className="flex flex-1 flex-col justify-center p-4">
      <p className="mb-3 text-xs text-[var(--color-text-muted)]">{d.title}</p>

      <div className="space-y-1">
        {/* Checked items */}
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs">
          <Checkbox checked />
          <span className="line-through text-[var(--color-text-muted)]">{d.items[0]}</span>
          <Badge label={d.badgeDone} variant="success" />
        </div>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs">
          <Checkbox checked />
          <span className="line-through text-[var(--color-text-muted)]">{d.items[1]}</span>
          <Badge label={d.badgeDone} variant="success" />
        </div>
        {/* Active item */}
        <div className="flex items-center gap-2 rounded-md bg-[var(--color-primary)]/5 px-2 py-1.5 text-xs">
          <Checkbox checked={false} />
          <span className="text-[var(--color-text)]">{d.items[2]}</span>
          <Badge label={d.badgeInProgress} variant="primary" />
        </div>
        {/* Unchecked item */}
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs">
          <Checkbox checked={false} />
          <span className="text-[var(--color-text)]">{d.items[3]}</span>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="mt-4 flex items-center gap-3 border-t border-[var(--color-border)] pt-3">
        <div className="flex-1">
          <p className="text-[10px] text-[var(--color-text-muted)]">{d.progress}</p>
          <div className="mt-1 h-1.5 w-full rounded-full bg-[var(--color-border)]">
            <div className="h-1.5 w-1/2 rounded-full bg-[var(--color-primary)]" />
          </div>
        </div>
        <p className="text-[10px] text-[var(--color-text-muted)]">{d.focus}</p>
      </div>
    </div>
  )
}

function WeeklyReview({ lang }: { lang: 'ko' | 'en' }) {
  const w = weeklyData[lang]
  return (
    <div className="flex flex-1 flex-col justify-center p-4">
      <p className="mb-3 text-xs text-[var(--color-text-muted)]">{w.title}</p>

      {/* Big number */}
      <div className="mb-3 text-center">
        <span className="text-lg font-bold text-[var(--color-primary)]">12/18</span>
        <span className="ml-1 text-xs text-[var(--color-text-muted)]">{w.done}</span>
      </div>

      {/* Progress bar */}
      <div className="mb-4 h-2 w-full rounded-full bg-[var(--color-border)]">
        <div className="h-2 rounded-full bg-[var(--color-primary)]" style={{ width: '67%' }} />
      </div>

      {/* Stats row */}
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-[var(--color-surface)] p-2">
          <p className="text-[10px] text-[var(--color-text-muted)]">{w.focusLabel}</p>
          <p className="text-xs font-medium text-[var(--color-text)]">
            22h <span className="text-[10px] text-[var(--color-success)]">(+3h ↑)</span>
          </p>
        </div>
        <div className="rounded-lg bg-[var(--color-surface)] p-2">
          <p className="text-[10px] text-[var(--color-text-muted)]">{w.keyWinLabel}</p>
          <p className="text-xs font-medium text-[var(--color-text)]">{w.keyWinValue}</p>
        </div>
      </div>

      {/* Next week */}
      <div className="rounded-lg border border-[var(--color-border)] px-3 py-2">
        <p className="text-[10px] text-[var(--color-text-muted)]">{w.nextWeekLabel}</p>
        <p className="text-xs text-[var(--color-text)]">{w.nextWeekValue}</p>
      </div>
    </div>
  )
}

export default function DemoTable({ featureId }: DemoTableProps) {
  const locale = useLocale()
  const lang = locale === 'en' ? 'en' : 'ko'

  return (
    <div className="flex h-full flex-col">
      <WindowChrome />
      {featureId === 'dailyReview' ? <DailyReview lang={lang} /> : <WeeklyReview lang={lang} />}
    </div>
  )
}
