'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/lib/analytics'

const AUTO_SETUP_PROMPT_KO = `당신은 Obsidian Vault 자동 설치 AI 어시스턴트입니다.
사용자의 Obsidian Vault에 Beronica GTD/PARA 시스템을 자동으로 설치해주세요.

## 1. 폴더 구조 생성

\`\`\`
Beronica-Vault/
├── 00-Inbox/
│   └── .gitkeep
├── 01-Projects/
│   └── .gitkeep
├── 02-Areas/
│   ├── .gitkeep
│   └── 건강-관리.md
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

## 2. 템플릿 파일 내용

### daily-review.md
\`\`\`markdown
---
date: "{{date:YYYY-MM-DD}}"
type: daily-review
energy:
mood:
tags: [daily-review]
---

# 🌅 Daily Review — {{date:YYYY-MM-DD}}

## 🎯 오늘의 TOP 3
1. [ ]
2. [ ]
3. [ ]

## 📥 Inbox 처리
> 오늘 들어온 것 중 처리할 항목을 여기에 정리

## ⚡ 에너지 & 컨디션
- 에너지 레벨: /10
- 컨디션 메모:

## 📝 오늘의 회고
- 잘한 점:
- 개선할 점:
- 내일 가장 먼저 할 일:
\`\`\`

### weekly-review.md
\`\`\`markdown
---
date: "{{date:YYYY-MM-DD}}"
type: weekly-review
week:
tags: [weekly-review]
---

# 📊 Weekly Review — {{date:YYYY-MM-DD}}

## ✅ 이번 주 완료
-

## ❌ 미완료 → 다음 주 이월
-

## 📁 프로젝트별 진행상황
| 프로젝트 | 상태 | 다음 단계 |
|----------|------|-----------|
|          |      |           |

## 🔑 이번 주 인사이트
>

## 🎯 다음 주 핵심 과제 (TOP 3)
1.
2.
3.

## 📈 주간 통계
- 완료 태스크: /
- 집중 시간: h
- 에너지 평균: /10
\`\`\`

### project-note.md
\`\`\`markdown
---
type: project
status: "active"
priority:
area:
deadline:
tags: [project]
created: "{{date:YYYY-MM-DD}}"
---

# 🚀 {{title}}

## 목표
> 이 프로젝트가 완료되면 어떤 상태인가?

## 핵심 결과물
- [ ]
- [ ]

## 마일스톤
| 단계 | 마감 | 상태 |
|------|------|------|
|      |      |      |

## 관련 Area
- [[]]

## 참고 자료
-

## 진행 로그
- {{date:YYYY-MM-DD}}: 프로젝트 시작
\`\`\`

### contact.md
\`\`\`markdown
---
type: contact
name:
organization:
role:
lastContact:
relationship:
tags: [contact]
---

# 👤 {{name}}

## 기본 정보
- 소속:
- 직책/역할:
- 연락처:

## 관계 맥락
> 어떻게 알게 되었고, 어떤 맥락에서 중요한 사람인가?

## 대화 기록
- {{date:YYYY-MM-DD}}:

## 메모
-
\`\`\`

## 3. README.md 내용

\`\`\`markdown
# 🧠 Beronica Vault

AI가 일하고, 당신은 성장한다.

## 구조
- **00-Inbox**: 모든 생각과 정보의 진입점
- **01-Projects**: 명확한 목표와 마감이 있는 작업
- **02-Areas**: 지속적으로 관리하는 책임 영역
- **03-Resources**: 관심 주제별 참고 자료
- **04-Archive**: 완료/비활성 항목 보관
- **_System**: 템플릿, 일간/주간 리뷰 보관

## 시작하기
1. 매일 아침 Daily Review 템플릿으로 TOP3를 정하세요
2. 생각나는 것은 00-Inbox에 바로 캡처하세요
3. 주 1회 Weekly Review로 전체를 점검하세요

더 알아보기: https://beronica.vercel.app
\`\`\`

## 4. 실행 지침

1. 사용자에게 Vault 경로를 확인하세요.
2. 위의 폴더 구조를 생성하세요.
3. 각 템플릿 파일에 위 내용을 정확히 채우세요.
4. README.md를 생성하세요.
5. 완료 후 구조를 요약해서 보여주세요.
6. Obsidian 커뮤니티 플러그인 추천: Templater, Calendar, Dataview

모든 파일은 UTF-8 인코딩 마크다운(.md)이며 YAML frontmatter를 포함합니다.`

const AUTO_SETUP_PROMPT_EN = `You are an AI assistant that automatically sets up an Obsidian Vault.
Install the Beronica GTD/PARA system in the user's Obsidian Vault.

## 1. Create Folder Structure

\`\`\`
Beronica-Vault/
├── 00-Inbox/
│   └── .gitkeep
├── 01-Projects/
│   └── .gitkeep
├── 02-Areas/
│   ├── .gitkeep
│   └── health-management.md
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

## 2. Template File Contents

### daily-review.md
\`\`\`markdown
---
date: "{{date:YYYY-MM-DD}}"
type: daily-review
energy:
mood:
tags: [daily-review]
---

# 🌅 Daily Review — {{date:YYYY-MM-DD}}

## 🎯 Today's TOP 3
1. [ ]
2. [ ]
3. [ ]

## 📥 Inbox Processing
> Review and process today's captured items

## ⚡ Energy & Condition
- Energy level: /10
- Notes:

## 📝 Daily Reflection
- What went well:
- What to improve:
- First thing tomorrow:
\`\`\`

### weekly-review.md
\`\`\`markdown
---
date: "{{date:YYYY-MM-DD}}"
type: weekly-review
week:
tags: [weekly-review]
---

# 📊 Weekly Review — {{date:YYYY-MM-DD}}

## ✅ Completed This Week
-

## ❌ Incomplete → Carry Forward
-

## 📁 Project Progress
| Project | Status | Next Step |
|---------|--------|-----------|
|         |        |           |

## 🔑 Key Insights
>

## 🎯 Next Week's TOP 3
1.
2.
3.

## 📈 Weekly Stats
- Tasks completed: /
- Focus time: h
- Avg energy: /10
\`\`\`

### project-note.md
\`\`\`markdown
---
type: project
status: "active"
priority:
area:
deadline:
tags: [project]
created: "{{date:YYYY-MM-DD}}"
---

# 🚀 {{title}}

## Goal
> What does "done" look like?

## Key Deliverables
- [ ]
- [ ]

## Milestones
| Phase | Due | Status |
|-------|-----|--------|
|       |     |        |

## Related Area
- [[]]

## References
-

## Progress Log
- {{date:YYYY-MM-DD}}: Project started
\`\`\`

### contact.md
\`\`\`markdown
---
type: contact
name:
organization:
role:
lastContact:
relationship:
tags: [contact]
---

# 👤 {{name}}

## Basic Info
- Organization:
- Role:
- Contact:

## Context
> How did you meet? Why is this person important?

## Conversation Log
- {{date:YYYY-MM-DD}}:

## Notes
-
\`\`\`

## 3. README.md Content

\`\`\`markdown
# 🧠 Beronica Vault

AI works. You grow.

## Structure
- **00-Inbox**: Entry point for all thoughts and information
- **01-Projects**: Tasks with clear goals and deadlines
- **02-Areas**: Ongoing responsibilities you manage
- **03-Resources**: Reference materials by topic
- **04-Archive**: Completed or inactive items
- **_System**: Templates, daily/weekly review storage

## Getting Started
1. Start each morning with a Daily Review template to set your TOP 3
2. Capture everything into 00-Inbox immediately
3. Run a Weekly Review once a week to stay on track

Learn more: https://beronica.vercel.app
\`\`\`

## 4. Execution Instructions

1. Ask the user for their Vault path.
2. Create the folder structure above.
3. Fill each template file with the exact content above.
4. Create README.md.
5. Show a summary of the structure when done.
6. Recommend Obsidian community plugins: Templater, Calendar, Dataview

All files are UTF-8 markdown (.md) with YAML frontmatter.`

export default function CopyButton() {
  const t = useTranslations('getStarted')
  const locale = useLocale()
  const [copied, setCopied] = useState(false)

  const prompt = locale === 'en' ? AUTO_SETUP_PROMPT_EN : AUTO_SETUP_PROMPT_KO

  async function handleCopy() {
    await navigator.clipboard.writeText(prompt)
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
          {prompt}
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
