'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/lib/analytics'

const AUTO_SETUP_PROMPT = `당신은 Obsidian Vault 구조를 자동으로 생성하는 AI 어시스턴트입니다.
아래 지시사항에 따라 사용자의 Obsidian Vault에 Beronica PARA 시스템을 설치해주세요.

## 설치할 폴더 구조

\`\`\`
Beronica-Vault/
├── 00-Inbox/
│   └── .gitkeep
├── 01-Projects/
│   └── .gitkeep
├── 02-Areas/
│   └── .gitkeep
├── 03-Resources/
│   └── .gitkeep
├── 04-Archive/
│   └── .gitkeep
├── _System/
│   ├── Templates/
│   │   ├── daily-review.md
│   │   ├── weekly-review.md
│   │   ├── project-note.md
│   │   └── contact.md
│   ├── Daily-Review/
│   │   └── .gitkeep
│   └── Weekly-Review/
│       └── .gitkeep
└── README.md
\`\`\`

## 각 템플릿 파일 내용

1. daily-review.md: 날짜, TOP3 할 일, 에너지 레벨, 회고 섹션 포함
2. weekly-review.md: 주간 완료/미완료 프로젝트, 다음 주 핵심 과제, 인사이트
3. project-note.md: 프로젝트명, 목표, 마감일, 관련 Area, 진행상황 필드
4. contact.md: 이름, 소속, 마지막 대화일, 관계 맥락, 메모 필드

## 실행 방법

사용자에게 Vault 경로를 확인한 후, 위 구조를 생성하고 각 템플릿의 내용을 채워주세요.
모든 파일은 마크다운(.md) 형식이며 YAML frontmatter를 포함합니다.`

export default function CopyButton() {
  const t = useTranslations('getStarted')
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(AUTO_SETUP_PROMPT)
    trackEvent('copy_prompt')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
        {t('promptLabel')}
      </label>
      <div className="relative rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)]">
        <pre className="max-h-80 overflow-auto p-4 text-sm leading-relaxed text-[var(--color-text)] font-[var(--font-mono)]">
          {AUTO_SETUP_PROMPT}
        </pre>
      </div>
      <Button
        onClick={handleCopy}
        size="lg"
        className="w-full sm:w-auto"
      >
        {copied ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            {t('copied')}
          </>
        ) : (
          <>
            <Copy className="mr-2 h-4 w-4" />
            {t('copyPrompt')}
          </>
        )}
      </Button>
    </div>
  )
}
