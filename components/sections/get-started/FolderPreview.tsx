import { useTranslations, useLocale } from 'next-intl'
import { Terminal } from 'lucide-react'

const FOLDER_TREE_KO = `볼트 루트/
├── CLAUDE.md                    ★ AI 지시 파일
├── _me/                         ★ AI 컨텍스트 (개인 메모리)
│   ├── 1_identity/
│   │   ├── profile.md
│   │   ├── communication-pref.md
│   │   ├── work-style.md
│   │   └── my-job.md
│   ├── 2_context/
│   │   ├── current-focus.md
│   │   ├── routine-system.md
│   │   └── tools-stack.md
│   ├── 3_knowledge/
│   │   ├── decisions-log.md
│   │   ├── lessons-learned.md
│   │   └── preferences.md
│   └── 4_interaction/
│       ├── feedback-log.md
│       └── useful-prompts.md
├── 00_데일리/
├── 01_인박스/
├── 10_단발 프로젝트/
├── 20_지속 관리 업무/
├── 30_참고자료/
│   ├── 업무매뉴얼/
│   ├── 서류양식/
│   └── 템플릿/
├── 40_완료 프로젝트 및 업무/
└── 첨부파일/`

const FOLDER_TREE_EN = `Vault Root/
├── CLAUDE.md                    ★ AI instruction file
├── _me/                         ★ AI context (personal memory)
│   ├── 1_identity/
│   │   ├── profile.md
│   │   ├── communication-pref.md
│   │   ├── work-style.md
│   │   └── my-job.md
│   ├── 2_context/
│   │   ├── current-focus.md
│   │   ├── routine-system.md
│   │   └── tools-stack.md
│   ├── 3_knowledge/
│   │   ├── decisions-log.md
│   │   ├── lessons-learned.md
│   │   └── preferences.md
│   └── 4_interaction/
│       ├── feedback-log.md
│       └── useful-prompts.md
├── 00_Daily/
├── 01_Inbox/
├── 10_Short-term Projects/
├── 20_Ongoing Areas/
├── 30_Resources/
│   ├── Work Manuals/
│   ├── Document Forms/
│   └── Templates/
├── 40_Completed/
└── Attachments/`

export default function FolderPreview() {
  const t = useTranslations('getStarted.folderStructure')
  const locale = useLocale()

  const tree = locale === 'ko' ? FOLDER_TREE_KO : FOLDER_TREE_EN

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold md:text-3xl">{t('sectionTitle')}</h2>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          {t('sectionSubtitle')}
        </p>
      </div>

      <div className="mx-auto max-w-3xl overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)]">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-text)]/5 px-4 py-2">
          <Terminal className="h-4 w-4 text-[var(--color-text-muted)]" />
          <span className="text-xs font-medium text-[var(--color-text-muted)]">vault-structure</span>
          <div className="ml-auto flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[var(--color-border)]" />
            <span className="h-3 w-3 rounded-full bg-[var(--color-border)]" />
            <span className="h-3 w-3 rounded-full bg-[var(--color-border)]" />
          </div>
        </div>
        <pre className="bg-[var(--color-text)]/[0.03] p-4 text-xs leading-relaxed font-mono text-[var(--color-text)] overflow-x-auto">
          {tree}
        </pre>
      </div>
    </div>
  )
}
