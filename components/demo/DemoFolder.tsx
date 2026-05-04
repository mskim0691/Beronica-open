'use client'

import { useLocale } from 'next-intl'

const folderData = {
  ko: {
    projects: ['Q2 런칭', '블로그 리뉴얼'],
    areas: ['건강 관리', '팀 매니지먼트'],
  },
  en: {
    projects: ['Q2 Launch', 'Blog Redesign'],
    areas: ['Health', 'Team Management'],
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

function FolderRow({
  label,
  dotColor,
  expanded,
  children,
}: {
  label: string
  dotColor: string
  expanded: boolean
  children?: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center gap-2 rounded-md px-2 py-1 text-xs text-[var(--color-text)]">
        <span className="text-[10px]">{expanded ? '▼' : '▶'}</span>
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dotColor }} />
        <span className="font-medium">📁 {label}</span>
      </div>
      {expanded && children && <div className="pl-4">{children}</div>}
    </div>
  )
}

function FileRow({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-md px-2 py-1 text-xs ${
        active
          ? 'bg-[var(--color-primary)]/10 text-[var(--color-text)]'
          : 'text-[var(--color-text-secondary)]'
      }`}
    >
      <span className="pl-3">📄 {label}</span>
    </div>
  )
}

export default function DemoFolder() {
  const locale = useLocale()
  const lang = locale === 'en' ? 'en' : 'ko'
  const data = folderData[lang]

  return (
    <div className="flex h-full flex-col">
      <WindowChrome />
      <div className="flex flex-1 flex-col justify-center p-4">
        <div className="space-y-0.5">
          <FolderRow label="Projects" dotColor="var(--color-primary)" expanded>
            <FileRow label={data.projects[0]} active />
            <FileRow label={data.projects[1]} />
          </FolderRow>

          <FolderRow label="Areas" dotColor="var(--color-success)" expanded>
            <FileRow label={data.areas[0]} />
            <FileRow label={data.areas[1]} />
          </FolderRow>

          <FolderRow label="Resources" dotColor="var(--color-accent)" expanded={false} />
          <FolderRow label="Archive" dotColor="var(--color-text-muted)" expanded={false} />
        </div>
      </div>
    </div>
  )
}
