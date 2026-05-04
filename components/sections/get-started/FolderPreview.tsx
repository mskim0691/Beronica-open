import { useTranslations } from 'next-intl'
import { Terminal } from 'lucide-react'

const FOLDER_TREE = `Beronica-Vault/
├── 00-Inbox/
├── 01-Projects/
├── 02-Areas/
├── 03-Resources/
├── 04-Archive/
├── _System/
│   ├── Templates/
│   ├── Daily-Review/
│   └── Weekly-Review/
└── README.md`

export default function FolderPreview() {
  const t = useTranslations('getStarted')

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t('folderPreviewTitle')}</h3>
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)]">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-text)]/5 px-4 py-2">
          <Terminal className="h-4 w-4 text-[var(--color-text-muted)]" />
          <span className="text-xs font-medium text-[var(--color-text-muted)]">vault-structure</span>
          <div className="ml-auto flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[var(--color-border)]" />
            <span className="h-3 w-3 rounded-full bg-[var(--color-border)]" />
            <span className="h-3 w-3 rounded-full bg-[var(--color-border)]" />
          </div>
        </div>
        <pre className="bg-[var(--color-text)]/[0.03] p-4 text-sm leading-relaxed font-[var(--font-mono)] text-[var(--color-text)]">
          {FOLDER_TREE}
        </pre>
      </div>
    </div>
  )
}
