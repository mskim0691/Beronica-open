'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/lib/analytics'

const AUTO_SETUP_PROMPT_KO = `아래 지시사항을 따라 내 Obsidian 볼트에 GTD + PARA + AI 어시스턴트 업무 시스템을 세팅해줘.
전체 과정을 순서대로 실행하고, 필요한 곳에서 나에게 질문해줘.

---

## 사전 단계: 설치 모드 감지

> **이 단계를 가장 먼저 실행하세요. 아래 결과에 따라 전체 프로세스의 동작 방식이 달라집니다.**

\`_me/\` 폴더가 볼트에 이미 존재하는지 확인해줘.

### 존재하지 않으면 → 🆕 신규 설치 모드
- 아래 모든 단계를 **처음부터 순서대로** 실행
- 모든 폴더와 파일을 새로 생성

### 존재하면 → 🔄 업데이트 모드
- 사용자에게 "기존 베로니카 시스템이 감지되었습니다. 업데이트 모드로 진행합니다." 안내
- 아래 **업데이트 원칙**을 모든 단계에 적용:

#### 업데이트 원칙
1. **사용자 데이터 보존 (절대 규칙)**
   - 사용자가 내용을 입력한 파일은 **절대 덮어쓰지 않음**
   - 대상: \`profile.md\`, \`my-job.md\`, \`communication-pref.md\`, \`work-style.md\`, \`current-focus.md\`, \`decisions-log.md\`, \`lessons-learned.md\`, \`preferences.md\`, \`feedback-log.md\`, \`useful-prompts.md\`
2. **새 항목만 추가**
   - 이번 버전에서 새로 추가된 폴더/파일 → 생성
   - 기존 파일에 새 섹션이 추가된 경우 → 해당 섹션만 추가 (기존 내용 유지)
3. **시스템 로직 업데이트**
   - \`_me/0_system/\` 시스템 파일들 (루틴, GTD 규칙, 기록 규칙 등) → 최신 버전으로 교체
   - \`CLAUDE.md\` 허브 구조 → 최신 버전으로 교체 (사용자 정보, 커스텀 섹션은 보존)
4. **3단계 (질문) 건너뜀**
   - 이미 채워진 프로필 질문은 다시 묻지 않음
5. **변경 리포트**
   - 마지막에 "이번 업데이트에서 변경된 항목" 리포트 출력:
     - ✅ 새로 추가된 파일/폴더
     - ✅ 업데이트된 시스템 섹션
     - ⏭️ 보존된 사용자 데이터 파일
     - ⚠️ 수동 확인이 필요한 항목 (있는 경우)

---

## 0단계: 권장 플러그인 확인 & 설치

아래 플러그인들이 설치되어 있는지 확인하고, 없으면 설치 방법을 안내해줘.
(Obsidian 설정 → 커뮤니티 플러그인 → 설치된 플러그인 목록에서 확인)

| 플러그인 | 용도 | 우선순위 |
|---------|------|---------|
| **Templater** | 노트 템플릿 자동 삽입 (인박스, 데일리 등 양식 자동화) | 높음 |
| **Calendar** | 데일리 노트를 달력 형태로 관리 | 중간 |
| **Dataview** | 노트 데이터를 테이블 리스트로 쿼리·필터 | 중간 |
| **Tasks** | 체크박스 기반 할일 관리, 마감일 추적 | 선택 |

### 확인 & 안내 방법
> ⚙️ 플러그인 설치는 Obsidian 앱에서만 가능합니다. AI는 설치 여부를 확인하고 안내만 할 수 있습니다.

1. 볼트의 \`.obsidian/community-plugins.json\` 파일을 열어서 설치 여부 확인
2. **모두 설치됨** → "권장 플러그인이 모두 설치되어 있습니다 ✅" 안내 후 1단계로 진행
3. **미설치 플러그인이 있으면** 사용자에게 아래처럼 안내:
   - "다음 플러그인이 아직 설치되어 있지 않습니다: {목록}"
   - "설치 방법: 설정(⚙️) → 커뮤니티 플러그인 → 찾아보기 → '{플러그인명}' 검색 → 설치 → 활성화"
   - 우선순위가 '높음'인 Templater는 "강력히 권장합니다", 나머지는 "선택 사항입니다"로 안내
4. 사용자가 설치를 완료했다고 하면 (또는 건너뛰겠다고 하면) 1단계로 진행

---

## 1단계: GTD + PARA 폴더 구조 생성

아래 7개 폴더를 볼트 루트에 생성해줘:

- 00_데일리/
- 01_인박스/
- 10_단발 프로젝트/
- 20_지속 관리 업무/
- 30_참고자료/
- 40_완료 프로젝트 및 업무/
- 첨부파일/

그리고 30_참고자료/ 하위에:
- 30_참고자료/업무매뉴얼/
- 30_참고자료/서류양식/
- 30_참고자료/템플릿/
- 30_참고자료/인맥관리/

20_지속 관리 업무/ 하위 폴더는 나에게 물어봐:
"어떤 업무 영역을 지속적으로 관리하시나요? (예: 재무회계, 인사노무, 마케팅, 개발 등 2~4개 알려주세요)"

그리고 \`30_참고자료/템플릿/Daily Note Template.md\`를 아래 내용으로 생성해줘:

\`\`\`
---
type: daily
date: {{date}}
mood:
energy:
tags: [daily]
---

# {{date}} {{요일}}

---

## 아침 리뷰

### 오늘의 집중 (TOP 3)
1.
2.
3.

### 약속 & 회의
-

### 컨디션 체크
- [ ] 충분한 수면
- [ ] 아침 루틴 완료

---

## 할일

### 오늘 반드시 (긴급/높음)
-

### 하면 좋은 일 (보통)
-

### 여유 있으면 (낮음)
-

### 대기 중
-

---

## 인박스 (빠른 캡처)
> 하루 중 떠오르는 생각, 아이디어, 할 일을 여기에 빠르게 기록.
> 저녁 리뷰 시 \`01_인박스/\`로 이동 또는 적절한 곳으로 분류.

-

---

## 메모 & 기록
> 회의 메모, 작업 로그, 참고사항


---

## 저녁 리뷰

### 오늘 완료한 것
-

### 잘된 점


### 개선할 점


### 내일 우선순위
1.
2.

---

## 바로가기
- [[01_인박스|인박스]]
- [[10_단발 프로젝트|프로젝트]]
\`\`\`

---

## 2단계: _me/ AI 컨텍스트 폴더 생성

아래 구조로 폴더와 파일을 **정확히** 생성해줘:

### _me/1_identity/profile.md
\`\`\`
# 프로필

## 기본 정보
- 이름:
- 이메일:

## 직업 정보
- 회사/조직:
- 직책:
- 역할:

## 성격 & 가치관
- 의사결정 스타일:
- 중요하게 생각하는 것:
- 스트레스 받는 상황:
- 에너지를 얻는 활동:

## 강점
-

## 보완이 필요한 점
-

## 목표
### 단기 (3개월)
-

### 장기 (1년)
-
\`\`\`

### _me/1_identity/communication-pref.md
\`\`\`
# 소통 선호도

## AI에게 원하는 대화 방식
- 답변 길이:
- 톤:
- 언어:

## 선호하는 출력 형태
- 의사결정 시:
- 정보 정리 시:
- 코드 관련:

## 하지 말아야 할 것
-

## 잘했을 때의 예시
-
\`\`\`

### _me/1_identity/work-style.md
\`\`\`
# 업무 스타일

## 업무 패턴
- 집중 시간대:
- 회의 선호 방식:
- 의사소통 채널 선호:

## 일하는 방식
- 멀티태스킹 vs 싱글태스크:
- 계획형 vs 즉흥형:
- 혼자 vs 협업:
- 큰 그림 vs 디테일:

## 생산성 도구
-

## 일하기 싫은 패턴
-
\`\`\`

### _me/2_context/current-focus.md
\`\`\`
# 현재 집중

> 최종 업데이트: {오늘 날짜}
> 매 1주 업데이트를 권장합니다. AI에게 "이번 주 포커스 업데이트해줘"라고 말하면 됩니다.

## 이번 주 핵심 과제
1. [ ]
2. [ ]
3. [ ]

## 진행 중인 프로젝트
| 프로젝트 | 상태 | 마감 | 의존 사항 | 비고 |
|---------|------|------|----------|------|
|         |      |      |          |      |

## 다가오는 일정
| 날짜 | 일정 | 준비사항 |
|------|------|---------|
|      |      |         |

## 최근 고민거리
-

## 이번 주 목표
-
\`\`\`

### _me/1_identity/my-job.md
\`\`\`
# 내 직무

## 소속
- 회사명:
- 사업 분야:
- 조직 유형:
- 팀 규모:
- 대표:

## 조직 내 나의 역할
- 직책:
- 담당:
- 보고 라인:

## 외부 서비스 현황
| 서비스 | 업체 | 담당자 | 용도 | 비고 |
|--------|------|--------|------|------|
|        |      |        |      |      |
\`\`\`

### _me/2_context/tools-stack.md
\`\`\`
# 도구 & 기술 스택

## 업무 도구
| 카테고리 | 도구 | 용도 | 숙련도 |
|----------|------|------|--------|
| 프로젝트 관리 |  |  |  |
| 커뮤니케이션 |  |  |  |
| 업무 생산성 |  |  |  |
| AI 어시스턴트 | Claude (Claudian) | 업무 자동화 | |
| 노트/지식관리 | Obsidian | 개인 지식 관리 | |

## 배우고 싶은 도구/기술
-

## 도구 사용 원칙
-
\`\`\`

### _me/2_context/routine-system.md
\`\`\`
# 루틴 체크 시스템
> 생성일: {오늘 날짜}

## 시스템 개요
매일/매주/매월 반복되는 루틴 업무를 관리하는 시스템.

### 일간 루틴 (매일 아침 리뷰)
- **트리거**: 매일 첫 세션 시작 시 자동 / "오늘 할일", "TOP3", "모닝 리뷰" 키워드
- **내용**: 데일리 노트 생성 → 5개 소스 스캔 → TOP3 제안 → 사용자 확인
- **저녁 리뷰**: 세션 종료 전 완료 항목 정리 + 내일 우선순위 작성
- **상세 로직**: \`_me/0_system/morning-routine.md\` 참조

### 주간 루틴 (월요일 루틴 체크)
- **트리거**: 월요일 세션 시작 시 자동 / "루틴 체크" 키워드
- AI가 매주 월요일에 월간루틴체크리스트를 참조하여 이번 주 할일을 안내한다.

## 마스터 파일
- 위치: \`30_참고자료/업무매뉴얼/월간루틴체크리스트.md\`
- 역할: 모든 루틴 업무의 원본 리스트
- 관리: 본인이 직접 항목 추가/수정/삭제

## 사용 예
- "오늘 할일 뭐야?" / "TOP3" → 오늘 데일리 노트 + TOP3 제안
- "이번 주 루틴 알려줘" → 이번 주 해당 업무 안내
- "이번 달 루틴 전체 보여줘" → 월간 전체 업무 안내
- "루틴 추가해줘: OOO" → 마스터 파일에 항목 추가
- "오늘 마무리" / "이브닝 리뷰" → 저녁 리뷰 실행
\`\`\`

### _me/3_knowledge/decisions-log.md
\`\`\`
# 결정 기록

> 중요한 의사결정을 기록합니다.
> 나중에 비슷한 상황이 오면 AI가 과거 결정을 참고하여 더 좋은 조언을 합니다.

## 기록 방법
대화 중 "이 결정 기록해줘"라고 말하면 AI가 아래 양식으로 추가합니다.

---
\`\`\`

### _me/3_knowledge/lessons-learned.md
\`\`\`
# 배운 교훈

> 경험에서 배운 교훈을 기록합니다.
> AI가 조언할 때 과거 경험을 참고하여 더 맞춤화된 답변을 합니다.

## 업무 관련
-

## 기술 관련
-

## 조직/협업 관련
-

## 개인 성장
-
\`\`\`

### _me/3_knowledge/preferences.md
\`\`\`
# 선호도

> 업무와 기술에 대한 선호도를 기록합니다.
> AI가 추천이나 제안을 할 때 취향을 반영합니다.

## 기술 선호
-

## 업무 방식 선호
-

## 콘텐츠 선호
-

## 싫어하는 것
-
\`\`\`

### _me/4_interaction/feedback-log.md
\`\`\`
# Claude 피드백 기록

> AI와의 대화에서 좋았던 점, 개선이 필요한 점을 기록합니다.
> 이 기록을 통해 AI가 점점 더 맞춤화된 응답을 합니다.

## 좋았던 점
-

## 개선 필요
-

## 특별히 유용했던 순간
-
\`\`\`

### _me/4_interaction/useful-prompts.md
\`\`\`
# 유용한 프롬프트

> 효과적이었던 Claude 프롬프트를 모아둡니다.
> 비슷한 상황에서 재사용하거나 발전시킬 수 있습니다.

## 업무 자동화
-

## 문서 작성
-

## 의사결정
-

## 코드/기술
-

## 기타
-
\`\`\`

### _me/0_system/memory-sync.md
\`\`\`
# Memory Sync 규칙

> MEMORY.md는 Claude의 **임시 버퍼(인박스)**다. \`_me/\`가 유일한 영구 저장소(Single Source of Truth)이다.
> Claude Code가 세션 중 자동으로 MEMORY.md에 기록한 내용을, 다음 세션 시작 시 \`_me/\`로 분류·이관한다.

## 원칙
- **MEMORY.md** = 임시 버퍼 (세션 간 워킹 메모). 최소한만 유지
- **\`_me/\`** = 영구 저장소. 모든 구조화된 지식의 원본
- 중복 금지: 이미 \`_me/\`에 있는 정보는 MEMORY.md에 남기지 않음

## 프로세스 (매 세션 시작 시 1회, 다른 루틴보다 먼저 실행)
1. MEMORY.md 읽기
2. 각 항목을 분류:
   | 내용 유형 | 대상 파일 |
   |-----------|-----------|
   | 사용자 선호/싫어하는 것 | \`_me/3_knowledge/preferences.md\` |
   | 도구/서비스 변경 | \`_me/2_context/tools-stack.md\` |
   | 프로젝트 상태 변화 | \`_me/2_context/current-focus.md\` |
   | 중요 결정 | \`_me/3_knowledge/decisions-log.md\` |
   | 교훈/인사이트 | \`_me/3_knowledge/lessons-learned.md\` |
   | 인물/프로필 변경 | \`_me/1_identity/profile.md\` |
   | 작업 방식 변화 | \`_me/1_identity/work-style.md\` |
   | 커뮤니케이션 선호 변화 | \`_me/1_identity/communication-pref.md\` |
   | Claude 피드백 | \`_me/4_interaction/feedback-log.md\` |
   | 행동 규칙 (AI용) | CLAUDE.md 자체에 반영 제안 |
3. 이미 \`_me/\`에 반영된 항목 → skip
4. 신규 항목 → 대상 파일에 반영 (사용자 확인 후 저장)
5. MEMORY.md 정리: 반영 완료 항목 제거, 직전 세션의 워킹 상태만 남김

## 트리거
- **매 세션 시작 시 자동** (다른 모든 루틴보다 먼저 실행)
- 사용자 키워드: "메모리 정리", "memory sync", "메모리 동기화", "sync"
\`\`\`

### _me/0_system/morning-routine.md
\`\`\`
# 매일 아침 루틴 (Daily Morning Review)

> **매일** 세션 시작 시, 아래 로직을 자동 실행하세요.
> 사용자가 "오늘 할일", "TOP3", "모닝 리뷰", "데일리 리뷰" 등을 말해도 실행.

## 트리거
- **매일 첫 세션** 시작 시 자동 실행
- 사용자 키워드: "오늘 할일", "TOP3", "모닝 리뷰", "데일리", "아침 루틴", "할일 확인"

## 실행 로직

### 1단계: 오늘 데일리 노트 확인/생성
- \`00_데일리/{오늘날짜}.md\` 존재 여부 확인
- 없으면 \`30_참고자료/템플릿/Daily Note Template.md\` 기반으로 자동 생성

### 2단계: 오늘 할일 후보 수집 (5개 소스 스캔)
1. **어제 데일리 노트** → \`내일 우선순위\` 섹션 확인 (이어서 할 일)
2. **\`current-focus.md\`** → 미완료(\`[ ]\`) 항목 중 오늘 처리 가능한 것
3. **\`01_인박스/\`** → \`status: inbox\` 항목 중 마감 임박 or 빠른 처리 가능한 것
4. **\`10_단발 프로젝트/\`** → 마감 임박 프로젝트의 다음 행동
5. **\`30_참고자료/업무매뉴얼/월간루틴체크리스트.md\`** → 오늘 해당하는 루틴 (파일이 있는 경우)

### 3단계: TOP3 제안
- 수집된 후보를 우선순위로 정렬하여 **TOP3 제안**:
  - 🔴 **마감 임박** (오늘~내일 마감) → 최우선
  - 🟡 **이번 주 내 처리 필요** → 중요
  - 🟢 **진행하면 좋은 것** → 여유 시
- 사용자 확인/수정 후 데일리 노트의 \`오늘의 집중\` 섹션에 기록

### 4단계: 오늘의 약속/회의 안내
- 데일리 노트의 \`약속 & 회의\`에 기록된 일정 리마인드
- \`current-focus.md\`의 \`다가오는 일정\`에서 오늘 해당 항목 확인

## 저녁 리뷰 (세션 종료 전)
> 세션이 길어졌거나, 사용자가 "오늘 마무리", "이브닝 리뷰", "정리해줘" 요청 시 실행

1. 오늘 데일리 노트의 \`오늘 완료한 것\` 섹션 업데이트
2. 미완료 항목 확인 → 내일로 이관 여부 제안
3. \`내일 우선순위\` 작성 (내일 TOP3 시드)
4. \`current-focus.md\` 업데이트 필요 여부 제안
\`\`\`

### _me/0_system/weekly-routine.md
\`\`\`
# 주간 루틴 & 리뷰

---

## 월요일 루틴 체크 (자동)
> **매주 월요일** 세션 시작 시, 아래 로직을 자동 실행하세요.

1. \`30_참고자료/업무매뉴얼/월간루틴체크리스트.md\`를 읽는다 (파일이 없으면 생략)
2. 오늘 날짜 기준으로 **이번 주(월~금)**에 해당하는 업무를 추출한다:
   - "매주 반복" → 항상 포함
   - "매월 반복" → 해당 날짜 범위에 걸치면 포함
   - "분기별/반기별/연간" → 해당 월이면 포함
   - "수시 체크" → 월초(1~5일) 주간에만 포함
3. 추출된 항목을 **우선순위** 순으로 정리해서 안내한다:
   - 🔴 마감 임박 (이번 주 내 마감)
   - 🟡 이번 주 진행 필요
   - 🟢 확인/준비 사항
4. 월요일이 아닌 날에도 사용자가 "이번 주 루틴", "루틴 체크", "할일 확인" 등을 요청하면 동일하게 실행

---

## 주간 리뷰 (Weekly Review)
> GTD 주간 리뷰. 한 주를 돌아보고 시스템 전체를 점검한다.

### 자동 트리거
- **토요일·일요일** 세션 시작 시 → "주간 리뷰를 진행할까요?" 제안
- **월요일** 세션 시작 시 → 지난 주말에 주간 리뷰를 진행하지 않았다면 "지난 주말에 주간 리뷰를 진행하지 않았네요. 먼저 주간 리뷰를 할까요?" 제안
- 사용자가 "주간 리뷰", "GTD 리뷰" 요청 시 즉시 실행

### 주간 리뷰 진행 (지난주 주간 리뷰 기록이 없으면 진행 필요)
> 리뷰 기록은 \`00_데일리/\` 에 \`{날짜}_주간리뷰.md\`로 저장한다.

#### 1단계: 인박스 정리
- \`01_인박스/\` 전체 스캔 → 미처리 항목(\`status: inbox\`) 분류 제안

#### 2단계: 프로젝트 점검
- \`current-focus.md\` 확인 → 완료 항목 체크, 새 항목 추가, 마감일 갱신
- \`10_단발 프로젝트/\` 스캔 → 마감 지난 항목, 멈춘 항목 확인

#### 3단계: _me 컨텍스트 점검
- \`profile.md\` — 이번 주 대화에서 발견된 강점/성향 반영할 것 있는지
- \`work-style.md\` — 업무 패턴 변화 있었는지
- \`my-job.md\` — 새로 알게 된 거래처/서비스 정보 있는지
- \`preferences.md\` — 새 도구/방식 선호 생겼는지
- \`decisions-log.md\` — 이번 주 중요 결정 기록 누락 없는지

#### 4단계: 다음 주 준비
- 다음 주 루틴 체크리스트 미리 확인
- 다가오는 마감 경고
\`\`\`

### _me/0_system/gtd-rules.md
\`\`\`
# GTD 인박스 처리 규칙

> **사용자가 새로운 업무/할일/아이디어를 채팅에 던지면 반드시 아래 프로세스를 실행한다.**

## 1단계: 캡처
- 새 업무가 들어오면 **즉시** \`01_인박스/\`에 노트를 생성한다
- 파일명: \`{날짜}_{업무제목}.md\`
- 프론트매터에 \`status: inbox\`, \`created: {날짜}\`, \`gtd_type: pending\` 포함

## 2단계: 명확화 & 분류
사용자에게 아래 GTD 판단 기준을 적용하여 **분류 결과를 제안**한다:

| 판단 기준 | 분류 | 처리 |
|-----------|------|------|
| 2분 이내 완료 가능? | ⚡ 즉시 실행 | 바로 처리 후 \`40_완료 프로젝트 및 업무/\`로 이동 |
| 내가 할 일이 아닌가? | 👋 위임 | \`01_인박스/\`에 \`gtd_type: delegated\`, 위임 대상 기록 |
| 특정 마감이 있는 프로젝트? | 📋 프로젝트 | \`10_단발 프로젝트/\`로 이동 |
| 지속적으로 관리해야 하는 업무? | 🔄 지속 관리 | \`20_지속 관리 업무/\` 해당 하위 폴더로 이동 |
| 언젠가 하고 싶지만 지금은 아닌가? | 💭 나중에 | \`01_인박스/\`에 유지, \`gtd_type: someday\` 태그 |
| 참고자료일 뿐? | 📁 참고 | \`30_참고자료/\`로 이동 |

## 3단계: 실행
- 분류 제안 후 사용자 확인을 받으면 해당 폴더로 파일을 이동한다
- 이동 시 프론트매터의 \`status\`를 업데이트한다

## 트리거 키워드
- "~해야 해", "~좀 해줘", "~할 일", "할일 추가", "인박스", "새 업무" → GTD 프로세스 시작
- "인박스 정리", "GTD 리뷰", "주간 리뷰" → \`01_인박스/\` 전체 스캔

## 인박스 노트 템플릿
---
status: inbox
created: {날짜}
gtd_type: pending
due:
delegated_to:
tags: []
---
# {업무 제목}

## 내용
{업무 설명}

## 다음 행동
- [ ] {구체적인 다음 행동}
\`\`\`

### _me/0_system/record-rules.md
\`\`\`
# 기록 규칙

## 자동 트리거 (AI가 감지 → 업데이트 제안)
| 대화에서 감지 | 업데이트 대상 | 판단 근거 |
|-------------|-------------|----------|
| 제품명(고유명사) + 설명 | \`my-job.md\` | 고유명사 매칭 |
| "완료", "끝났어", "마감" + 프로젝트명 | \`current-focus.md\` 상태 변경 | 상태 키워드 |
| 도구/서비스 이름 + 긍정/부정 평가 | \`preferences.md\` | 평가 표현 매칭 |
| 중요 결정 발생 | \`decisions-log.md\` 기록 제안 | 결정 키워드 |
| 피드백 수신 | \`feedback-log.md\` 기록 | 피드백 표현 |

## 사용자 호출 트리거 (사용자가 직접 요청)
| 키워드 | 액션 |
|--------|------|
| "프로필 업데이트", "내 정보 수정" | \`profile.md\` 편집 |
| "회사 정보 업데이트" | \`my-job.md\` 편집 |
| "나 이런 스타일이야", "내 습관" | \`work-style.md\`에 기록 |
| "이번 주 포커스 업데이트" | \`current-focus.md\` 갱신 |
| "컨텍스트 리뷰", "메모리 점검" | \`_me/\` 전체 스캔 → 빈 항목/오래된 항목 리포트 |

## 업데이트 방식
- 업데이트할 내용 발견 시, 해당 업무 완료 후 "~~ 내용을 ○○.md에 반영할까요?" 제안
- 사용자 확인 후 업데이트 실행
- 사소한 것은 모아뒀다가 세션 종료 전에 한번에 제안
\`\`\`

---

## 3단계: 개인 정보 수집 & 프로필 생성

> 🔄 **업데이트 모드**: \`profile.md\` 등에 이미 내용이 채워져 있으면 이 단계를 건너뛰고 4단계로 진행. 단, 이번 버전에서 새로 추가된 필드가 있으면 해당 질문만 추가로 진행.

위 파일들을 모두 생성한 후, 나에게 아래 질문들을 **하나씩** 물어봐.
답변을 받으면 해당 파일에 바로 채워넣어줘.

### profile.md 작성을 위한 질문:
1. "이름과 이메일을 알려주세요"
2. "의사결정 스타일은 어떤가요? (데이터 기반 / 직감형 / 혼합형)"
3. "업무에서 중요하게 생각하는 것은요? (효율성 / 정확성 / 임팩트 등)"
4. "본인의 강점과 보완이 필요한 점을 각각 알려주세요"
5. "3개월 내 단기 목표와 1년 장기 목표는?"

### my-job.md 작성을 위한 질문:
6. "회사/조직명, 직책, 구체적인 역할을 알려주세요"
7. "보고 라인(상사)은 누구인가요?"
8. "정기적으로 이용하는 외부 서비스가 있나요? (세무사, 법무, 은행 등)"

### communication-pref.md 작성을 위한 질문:
9. "Claude 답변은 간결하게 / 상세하게 / 상황에 따라 중 어떤 것을 선호하나요?"
10. "대화 톤은 캐주얼 / 비즈니스 / 친근하면서도 전문적 중 어떤 게 좋나요?"
11. "AI가 하지 말아야 할 것이 있다면? (예: 과도한 이모지, 불필요한 아첨 등)"

### work-style.md 작성을 위한 질문:
12. "집중 잘 되는 시간대는? 의사소통 채널 선호 순서는?"
13. "멀티태스킹 vs 싱글태스크? 계획형 vs 즉흥형?"

질문이 다 끝나면 답변 내용으로 profile.md, my-job.md, communication-pref.md, work-style.md를 완성해줘.

---

## 4단계: CLAUDE.md 생성

> 🔄 **업데이트 모드**: CLAUDE.md가 이미 존재하면 **사용자 정보(이름/회사/역할)는 보존**하고, 시스템 섹션(루틴, GTD 규칙, 기록 규칙 등)만 아래 최신 내용으로 교체해줘. 사용자가 직접 추가한 커스텀 섹션이 있으면 그것도 보존.

볼트 루트에 CLAUDE.md를 생성해줘. 3단계에서 수집한 정보를 {중괄호} 자리에 넣어줘.

\`\`\`
# Claude 메모리 시스템

> 이 파일은 매 세션 시작 시 자동으로 로딩됩니다.
> 아래 파일들을 참조하여 사용자에 대한 맥락을 파악하세요.

## 사용자
- 이름: {이름}
- 회사: {회사명}
- 역할: {역할 요약}

## 필수 참조 (매 세션)
- \`_me/1_identity/profile.md\` — 기본 정보, 성격, 강점/약점
- \`_me/1_identity/my-job.md\` — 소속, 직책, 담당 업무, 거래처
- \`_me/2_context/current-focus.md\` — 지금 집중하는 일

## 상황별 참조
- 나의 직무/거래처 → \`_me/1_identity/my-job.md\`
- 도구/기술 관련 질문 → \`_me/2_context/tools-stack.md\`
- 의사결정 도움 필요 → \`_me/3_knowledge/decisions-log.md\`
- 조언/코칭 요청 → \`_me/3_knowledge/lessons-learned.md\`
- 선호도 확인 → \`_me/3_knowledge/preferences.md\`
- 대화 방식 조정 → \`_me/1_identity/communication-pref.md\`
- Claude 피드백 확인 → \`_me/4_interaction/feedback-log.md\`
- 루틴 업무 체크 → \`_me/2_context/routine-system.md\` + \`30_참고자료/업무매뉴얼/월간루틴체크리스트.md\`

## 🔄 메모리 동기화 (매 세션 시작 시)
> MEMORY.md는 Claude의 **임시 버퍼(인박스)**다. \`_me/\`가 유일한 영구 저장소(Single Source of Truth)이다.
> Claude Code가 세션 중 자동으로 MEMORY.md에 기록한 내용을, 다음 세션 시작 시 \`_me/\`로 분류·이관한다.

### 원칙
- **MEMORY.md** = 임시 버퍼 (세션 간 워킹 메모). 최소한만 유지
- **\`_me/\`** = 영구 저장소. 모든 구조화된 지식의 원본
- 중복 금지: 이미 \`_me/\`에 있는 정보는 MEMORY.md에 남기지 않음

### 프로세스 (매 세션 시작 시 1회, 다른 루틴보다 먼저 실행)
1. MEMORY.md 읽기
2. 각 항목을 분류:
   | 내용 유형 | 대상 파일 |
   |-----------|-----------|
   | 사용자 선호/싫어하는 것 | \`_me/3_knowledge/preferences.md\` |
   | 도구/서비스 변경 | \`_me/2_context/tools-stack.md\` |
   | 프로젝트 상태 변화 | \`_me/2_context/current-focus.md\` |
   | 중요 결정 | \`_me/3_knowledge/decisions-log.md\` |
   | 교훈/인사이트 | \`_me/3_knowledge/lessons-learned.md\` |
   | 인물/프로필 변경 | \`_me/1_identity/profile.md\` |
   | 작업 방식 변화 | \`_me/1_identity/work-style.md\` |
   | 커뮤니케이션 선호 변화 | \`_me/1_identity/communication-pref.md\` |
   | Claude 피드백 | \`_me/4_interaction/feedback-log.md\` |
   | 행동 규칙 (AI용) | CLAUDE.md 자체에 반영 제안 |
3. 이미 \`_me/\`에 반영된 항목 → skip
4. 신규 항목 → 대상 파일에 반영 (사용자 확인 후 저장)
5. MEMORY.md 정리: 반영 완료 항목 제거, 직전 세션의 워킹 상태만 남김

### 트리거
- **매 세션 시작 시 자동** (다른 모든 루틴보다 먼저 실행)
- 사용자 키워드: "메모리 정리", "메모리 동기화", "sync"

## 📅 매일 아침 루틴 — 매일 아침 리뷰 (자동)
> **매일** 세션 시작 시, 아래 로직을 자동 실행하세요.
> 사용자가 "오늘 할일", "TOP3", "모닝 리뷰", "데일리 리뷰" 등을 말해도 실행.

### 트리거
- **매일 첫 세션** 시작 시 자동 실행
- 사용자 키워드: "오늘 할일", "TOP3", "모닝 리뷰", "데일리", "아침 루틴", "할일 확인"

### 실행 로직

#### 1단계: 오늘 데일리 노트 확인/생성
- \`00_데일리/{오늘날짜}.md\` 존재 여부 확인
- 없으면 \`30_참고자료/템플릿/Daily Note Template.md\` 기반으로 자동 생성

#### 2단계: 오늘 할일 후보 수집 (5개 소스 스캔)
1. **어제 데일리 노트** → \`내일 우선순위\` 섹션 확인 (이어서 할 일)
2. **\`current-focus.md\`** → 미완료(\`[ ]\`) 항목 중 오늘 처리 가능한 것
3. **\`01_인박스/\`** → \`status: inbox\` 항목 중 마감 임박 or 빠른 처리 가능한 것
4. **\`10_단발 프로젝트/\`** → 마감 임박 프로젝트의 다음 행동
5. **\`30_참고자료/업무매뉴얼/월간루틴체크리스트.md\`** → 오늘 해당하는 루틴 (파일이 있는 경우)

#### 3단계: TOP3 제안
- 수집된 후보를 우선순위로 정렬하여 **TOP3 제안**:
  - 🔴 **마감 임박** (오늘~내일 마감) → 최우선
  - 🟡 **이번 주 내 처리 필요** → 중요
  - 🟢 **진행하면 좋은 것** → 여유 시
- 사용자 확인/수정 후 데일리 노트의 \`오늘의 집중\` 섹션에 기록

#### 4단계: 오늘의 약속/회의 안내
- 데일리 노트의 \`약속 & 회의\`에 기록된 일정 리마인드
- \`current-focus.md\`의 \`다가오는 일정\`에서 오늘 해당 항목 확인

### 저녁 리뷰 (세션 종료 전)
> 세션이 길어졌거나, 사용자가 "오늘 마무리", "이브닝 리뷰", "정리해줘" 요청 시 실행

1. 오늘 데일리 노트의 \`오늘 완료한 것\` 섹션 업데이트
2. 미완료 항목 확인 → 내일로 이관 여부 제안
3. \`내일 우선순위\` 작성 (내일 TOP3 시드)
4. \`current-focus.md\` 업데이트 필요 여부 제안

## 🔁 월요일 루틴 체크 (자동)
> **매주 월요일** 세션 시작 시, 아래 로직을 자동 실행하세요.

1. \`30_참고자료/업무매뉴얼/월간루틴체크리스트.md\`를 읽는다 (파일이 없으면 생략)
2. 오늘 날짜 기준으로 **이번 주(월~금)**에 해당하는 업무를 추출한다:
   - "매주 반복" → 항상 포함
   - "매월 반복" → 해당 날짜 범위에 걸치면 포함
   - "분기별/반기별/연간" → 해당 월이면 포함
   - "수시 체크" → 월초(1~5일) 주간에만 포함
3. 추출된 항목을 **우선순위** 순으로 정리해서 안내한다:
   - 🔴 마감 임박 (이번 주 내 마감)
   - 🟡 이번 주 진행 필요
   - 🟢 확인/준비 사항
4. 월요일이 아닌 날에도 사용자가 "이번 주 루틴", "루틴 체크", "할일 확인" 등을 요청하면 동일하게 실행

## 📥 GTD 인박스 처리 규칙 (절대 규칙)
> **사용자가 새로운 업무/할일/아이디어를 채팅에 던지면 반드시 아래 프로세스를 실행한다.**

### 1단계: 캡처
- 새 업무가 들어오면 **즉시** \`01_인박스/\`에 노트를 생성한다
- 파일명: \`{날짜}_{업무제목}.md\`
- 프론트매터에 \`status: inbox\`, \`created: {날짜}\`, \`gtd_type: pending\` 포함

### 2단계: 명확화 & 분류
사용자에게 아래 GTD 판단 기준을 적용하여 **분류 결과를 제안**한다:

| 판단 기준 | 분류 | 처리 |
|-----------|------|------|
| 2분 이내 완료 가능? | ⚡ 즉시 실행 | 바로 처리 후 \`40_완료 프로젝트 및 업무/\`로 이동 |
| 내가 할 일이 아닌가? | 👋 위임 | \`01_인박스/\`에 \`gtd_type: delegated\`, 위임 대상 기록 |
| 특정 마감이 있는 프로젝트? | 📋 프로젝트 | \`10_단발 프로젝트/\`로 이동 |
| 지속적으로 관리해야 하는 업무? | 🔄 지속 관리 | \`20_지속 관리 업무/\` 해당 하위 폴더로 이동 |
| 언젠가 하고 싶지만 지금은 아닌가? | 💭 나중에 | \`01_인박스/\`에 유지, \`gtd_type: someday\` 태그 |
| 참고자료일 뿐? | 📁 참고 | \`30_참고자료/\`로 이동 |

### 3단계: 실행
- 분류 제안 후 사용자 확인을 받으면 해당 폴더로 파일을 이동한다
- 이동 시 프론트매터의 \`status\`를 업데이트한다

### 트리거 키워드
- "~해야 해", "~좀 해줘", "~할 일", "할일 추가", "인박스", "새 업무" → GTD 프로세스 시작
- "인박스 정리", "GTD 리뷰", "주간 리뷰" → \`01_인박스/\` 전체 스캔

### 인박스 노트 템플릿
---
status: inbox
created: {날짜}
gtd_type: pending
due:
delegated_to:
tags: []
---
# {업무 제목}

## 내용
{업무 설명}

## 다음 행동
- [ ] {구체적인 다음 행동}



## 🔄 주간 리뷰
> GTD 주간 리뷰. 한 주를 돌아보고 시스템 전체를 점검한다.

### 자동 트리거
- **토요일·일요일** 세션 시작 시 → "주간 리뷰를 진행할까요?" 제안
- **월요일** 세션 시작 시 → 지난 주말에 주간 리뷰를 진행하지 않았다면 "지난 주말에 주간 리뷰를 진행하지 않았네요. 먼저 주간 리뷰를 할까요?" 제안
- 사용자가 "주간 리뷰", "GTD 리뷰" 요청 시 즉시 실행

### 주간 리뷰 진행 (지난주 주간 리뷰 기록이 없으면 진행 필요)
> 리뷰 기록은 \`00_데일리/\` 에 \`{날짜}_주간리뷰.md\`로 저장한다.

#### 1단계: 인박스 정리
- \`01_인박스/\` 전체 스캔 → 미처리 항목(\`status: inbox\`) 분류 제안

#### 2단계: 프로젝트 점검
- \`current-focus.md\` 확인 → 완료 항목 체크, 새 항목 추가, 마감일 갱신
- \`10_단발 프로젝트/\` 스캔 → 마감 지난 항목, 멈춘 항목 확인

#### 3단계: _me 컨텍스트 점검
- \`profile.md\` — 이번 주 대화에서 발견된 강점/성향 반영할 것 있는지
- \`work-style.md\` — 업무 패턴 변화 있었는지
- \`my-job.md\` — 새로 알게 된 거래처/서비스 정보 있는지
- \`preferences.md\` — 새 도구/방식 선호 생겼는지
- \`decisions-log.md\` — 이번 주 중요 결정 기록 누락 없는지

#### 4단계: 다음 주 준비
- 다음 주 루틴 체크리스트 미리 확인
- 다가오는 마감 경고

## 연락처·인맥 관리 규칙
> 업무 중 사람 이름 또는 법인·단체 이름이 언급될 때 자동 실행

### 트리거
- 대화에서 **사람 이름** 또는 **법인/단체명**이 언급되면 아래 프로세스 시작

### 프로세스
1. \`30_참고자료/인맥관리/\` 검색
2. 검색 결과를 사용자에게 보여주고 **업데이트 여부를 확인**
3. 사용자 확인 후 해당 파일 업데이트

### 업데이트 위치 기준
| 구분 | 저장 위치 | 기록 내용 |
|------|----------|----------|
| 개인 인맥 관리 | \`30_참고자료/인맥관리/이름.md\` | 연락처 + 소통 히스토리 + 성향 메모 |



## 기록 규칙

### 자동 트리거 (AI가 감지 → 업데이트 제안)
| 대화에서 감지 | 업데이트 대상 | 판단 근거 |
|-------------|-------------|----------|
| 제품명(고유명사) + 설명 | \`my-job.md\` | 고유명사 매칭 |
| "완료", "끝났어", "마감" + 프로젝트명 | \`current-focus.md\` 상태 변경 | 상태 키워드 |
| 도구/서비스 이름 + 긍정/부정 평가 | \`preferences.md\` | 평가 표현 매칭 |
| 중요 결정 발생 | \`decisions-log.md\` 기록 제안 | 결정 키워드 |
| 피드백 수신 | \`feedback-log.md\` 기록 | 피드백 표현 |

### 사용자 호출 트리거 (사용자가 직접 요청)
| 키워드 | 액션 |
|--------|------|
| "프로필 업데이트", "내 정보 수정" | \`profile.md\` 편집 |
| "회사 정보 업데이트" | \`my-job.md\` 편집 |
| "나 이런 스타일이야", "내 습관" | \`work-style.md\`에 기록 |
| "이번 주 포커스 업데이트" | \`current-focus.md\` 갱신 |
| "컨텍스트 리뷰", "메모리 점검" | \`_me/\` 전체 스캔 → 빈 항목/오래된 항목 리포트 |

### 업데이트 방식
- 업데이트할 내용 발견 시, 해당 업무 완료 후 "~~ 내용을 ○○.md에 반영할까요?" 제안
- 사용자 확인 후 업데이트 실행
- 사소한 것은 모아뒀다가 세션 종료 전에 한번에 제안

## 볼트 구조
00_데일리/                — 일간 노트
01_인박스/                — 미분류 메모, 빠른 캡처
10_단발 프로젝트/          — 마감 있는 단발 업무
20_지속 관리 업무/         — 지속 관리 영역
30_참고자료/              — 참고 지식
40_완료 프로젝트 및 업무/  — 완료/비활성 자료
첨부파일/                 — 이미지, 첨부 파일
_me/                  — Claude 메모리 시스템 (개인 컨텍스트)
\`\`\`

---

## 5단계: 검증
모든 파일 생성이 끝나면 아래를 실행해줘:

### 🆕 신규 설치일 경우:
1. 생성된 폴더/파일 목록을 보여줘
2. 아래 체크리스트를 표시해줘:
   - [ ] 볼트 루트에 7개 폴더 생성 확인
   - [ ] _me/ 폴더에 4개 하위 폴더 + 12개 파일 생성 확인
   - [ ] profile.md에 개인 정보 입력 확인
   - [ ] my-job.md에 소속/직책/거래처 입력 확인
   - [ ] communication-pref.md에 선호도 입력 확인
   - [ ] work-style.md에 업무 스타일 입력 확인
   - [ ] CLAUDE.md 생성 + 사용자 정보 반영 확인
   - [ ] 데일리 노트 템플릿 생성 확인 (\`30_참고자료/템플릿/Daily Note Template.md\`)
   - [ ] CLAUDE.md에 매일 아침 루틴 + 월요일 루틴 체크 섹션 포함 확인
3. "세팅이 완료되었습니다! 테스트해보세요: '다음 주까지 분기 보고서 작성해야 해'라고 말해보세요." 라고 안내해줘.
4. "매일 아침 루틴도 세팅되었습니다. 'TOP3' 또는 '오늘 할일'이라고 말하면 오늘 할일을 정리해줍니다." 라고 안내해줘.

### 🔄 업데이트일 경우:
1. 아래 형식으로 **변경 리포트**를 출력해줘:
\`\`\`
## 업데이트 완료 리포트

### ✅ 새로 추가됨
- (이번 버전에서 새로 생성된 파일/폴더/섹션 목록)

### ✅ 시스템 업데이트됨
- (CLAUDE.md 등에서 최신 로직으로 교체된 섹션 목록)

### ⏭️ 보존됨 (변경 없음)
- (사용자 데이터가 있어 건드리지 않은 파일 목록)

### ⚠️ 수동 확인 필요 (해당 시)
- (사용자가 직접 확인/조정이 필요한 항목)
\`\`\`
2. "업데이트가 완료되었습니다! 기존 데이터는 모두 보존되었습니다." 라고 안내해줘.

---

## 참고: 이 시스템에 대한 설명

### GTD (Getting Things Done) 워크플로우
모든 새 업무를 01_인박스에 먼저 캡처 → 분류(2분 이내 즉시실행 / 위임 / 프로젝트 / 지속관리 / 나중에 / 참고) → 해당 폴더로 이동

### PARA (Projects, Areas, Resources, Archive) 구조
- 10_단발 프로젝트/ = Projects (시작과 끝이 있는 업무)
- 20_지속 관리 업무/ = Areas (꾸준히 관리하는 영역)
- 30_참고자료/ = Resources (참고 지식)
- 40_완료 프로젝트 및 업무/ = Archive (완료/비활성)

### 프론트매터 형식
모든 업무 노트에 아래 YAML 프론트매터를 적용:
- status: inbox / active / delegated / someday / done
- created: 날짜
- gtd_type: pending / project / area / reference / someday / delegated
- due: 마감일
- delegated_to: 위임 대상
- tags: []

→ 모든 것을 순서대로 실행해줘. 1단계부터 시작!`

const AUTO_SETUP_PROMPT_EN = `Follow the instructions below to set up a GTD + PARA + AI Assistant productivity system in my Obsidian vault.
Execute the entire process step by step, and ask me questions where needed.

---

## Pre-Step: Detect Installation Mode

> **Run this step first. The result determines how the entire process behaves.**

Check whether the \`_me/\` folder already exists in the vault.

### If it does NOT exist → 🆕 Fresh Install Mode
- Execute all steps below **from the beginning, in order**
- Create all folders and files from scratch

### If it DOES exist → 🔄 Update Mode
- Inform the user: "An existing Beronica system has been detected. Proceeding in update mode."
- Apply the following **update principles** to all steps:

#### Update Principles
1. **Preserve User Data (Absolute Rule)**
   - NEVER overwrite files that contain user-entered content
   - Protected files: \`profile.md\`, \`my-job.md\`, \`communication-pref.md\`, \`work-style.md\`, \`current-focus.md\`, \`decisions-log.md\`, \`lessons-learned.md\`, \`preferences.md\`, \`feedback-log.md\`, \`useful-prompts.md\`
2. **Add New Items Only**
   - Folders/files newly added in this version → create them
   - New sections added to existing files → add only those sections (preserve existing content)
3. **Update System Logic**
   - System sections in \`CLAUDE.md\` (routines, GTD rules, recording rules, etc.) → replace with the latest version
   - However, user info (name, company, role) → preserve
4. **Skip Step 3 (Questions)**
   - Do not re-ask profile questions that are already filled in
5. **Change Report**
   - At the end, output a "Changes made in this update" report:
     - ✅ Newly added files/folders
     - ✅ Updated system sections
     - ⏭️ Preserved user data files
     - ⚠️ Items requiring manual review (if any)

---

## Step 0: Check & Install Recommended Plugins

Check whether the following plugins are installed, and if not, guide me through the installation.
(Settings > Community Plugins > Installed Plugins list)

| Plugin | Purpose | Priority |
|--------|---------|----------|
| **Templater** | Auto-insert note templates (inbox, daily, etc.) | High |
| **Calendar** | Manage daily notes in a calendar view | Medium |
| **Dataview** | Query & filter note data as tables/lists | Medium |
| **Tasks** | Checkbox-based task management with due-date tracking | Optional |

### How to Check & Guide
> Plugins can only be installed from within the Obsidian app. Claude can only check installation status and provide guidance.

1. Open the vault's \`.obsidian/community-plugins.json\` file to check installation status
2. **All installed** > Display "All recommended plugins are installed." and proceed to Step 1
3. **Missing plugins** > Inform the user as follows:
   - "The following plugins are not yet installed: {list}"
   - "How to install: Settings (gear icon) > Community Plugins > Browse > Search '{plugin name}' > Install > Enable"
   - For the high-priority Templater: "Strongly recommended", for the rest: "Optional"
4. Once the user confirms installation is complete (or chooses to skip), proceed to Step 1

---

## Step 1: Create GTD + PARA Folder Structure

Create the following 7 folders at the vault root:

- 00_daily/
- 01_inbox/
- 10_projects/
- 20_areas/
- 30_resources/
- 40_archive/
- attachments/

Then create subfolders under 30_resources/:
- 30_resources/manuals/
- 30_resources/forms/
- 30_resources/templates/
- 30_resources/contacts/

For subfolders under 20_areas/, ask me:
"What work areas do you manage on an ongoing basis? (e.g., Finance, HR, Marketing, Development — please list 2-4)"

Then create \`30_resources/templates/Daily Note Template.md\` with the following content:

\`\`\`
---
type: daily
date: {{date}}
mood:
energy:
tags: [daily]
---

# {{date}} {{day}}

---

## Morning Review

### Today's Focus (TOP 3)
1.
2.
3.

### Appointments & Meetings
-

### Energy Check
- [ ] Got enough sleep
- [ ] Morning routine completed

---

## Tasks

### Must Do Today (Critical/High)
-

### Should Do (Medium)
-

### Could Do (Low)
-

### Waiting For
-

---

## Inbox (Quick Capture)
> Quickly jot down thoughts, ideas, or tasks that come up during the day.
> Move them to \`01_inbox/\` during the evening review, or sort them into the appropriate folder.

-

---

## Notes & Logs
> Meeting notes, work logs, references


---

## Evening Review

### Completed Today
-

### What Went Well


### What Could Be Better


### Tomorrow's Priority
1.
2.

---

## Quick Links
- [[01_inbox|Inbox]]
- [[10_projects|Projects]]
\`\`\`

---

## Step 2: Create _me/ AI Context Folder

Create the following folder structure and files **exactly** as shown:

### _me/1_identity/profile.md
\`\`\`
# Profile

## Basic Info
- Name:
- Email:

## Professional Info
- Company/Organization:
- Title:
- Role:

## Personality & Values
- Decision-making style:
- What matters most:
- Stressful situations:
- Activities that energize me:

## Strengths
-

## Areas for Improvement
-

## Goals
### Short-term (3 months)
-

### Long-term (1 year)
-
\`\`\`

### _me/1_identity/communication-pref.md
\`\`\`
# Communication Preferences

## How I Want Claude to Communicate
- Response length:
- Tone:
- Language:

## Preferred Output Formats
- For decisions:
- For organizing information:
- For code-related topics:

## Things Claude Should NOT Do
-

## Examples of Great Responses
-
\`\`\`

### _me/1_identity/work-style.md
\`\`\`
# Work Style

## Work Patterns
- Peak focus hours:
- Preferred meeting format:
- Preferred communication channels:

## How I Work
- Multitasking vs. single-tasking:
- Planner vs. improviser:
- Solo vs. collaborative:
- Big-picture vs. detail-oriented:

## Productivity Tools
-

## Patterns I Dislike
-
\`\`\`

### _me/2_context/current-focus.md
\`\`\`
# Current Focus

> Last updated: {today's date}
> Recommended to update weekly. Just tell Claude "update my weekly focus" to refresh.

## This Week's Key Tasks
1. [ ]
2. [ ]
3. [ ]

## Active Projects
| Project | Status | Deadline | Dependencies | Notes |
|---------|--------|----------|-------------|-------|
|         |        |          |             |       |

## Upcoming Schedule
| Date | Event | Preparation |
|------|-------|-------------|
|      |       |             |

## Current Concerns
-

## This Week's Goals
-
\`\`\`

### _me/1_identity/my-job.md
\`\`\`
# My Job

## Organization
- Company name:
- Industry:
- Organization type:
- Team size:
- CEO/Leader:

## My Role in the Organization
- Title:
- Responsibilities:
- Reporting line:

## External Services
| Service | Provider | Contact Person | Purpose | Notes |
|---------|----------|---------------|---------|-------|
|         |          |               |         |       |
\`\`\`

### _me/2_context/tools-stack.md
\`\`\`
# Tools & Tech Stack

## Work Tools
| Category | Tool | Purpose | Proficiency |
|----------|------|---------|-------------|
| Project Management |  |  |  |
| Communication |  |  |  |
| Productivity |  |  |  |
| AI Assistant | Claude (Claudian) | Workflow automation | |
| Notes/Knowledge | Obsidian | Personal knowledge management | |

## Tools/Tech I Want to Learn
-

## Tool Usage Principles
-
\`\`\`

### _me/2_context/routine-system.md
\`\`\`
# Routine Check System
> Created: {today's date}

## System Overview
A system for managing daily/weekly/monthly recurring routine tasks.

### Daily Routine (Daily Morning Review)
- **Trigger**: Automatically at the start of each day's first session / keywords: "today's tasks", "TOP3", "morning review"
- **Process**: Create daily note > Scan 5 sources > Suggest TOP3 > User confirmation
- **Evening Review**: Wrap up completed items before session ends + write Tomorrow's Priority
- **Detailed logic**: See the "Daily Morning Review" section in CLAUDE.md

### Weekly Routine (Monday Routine Check)
- **Trigger**: Automatically at Monday session start / keyword: "routine check"
- Claude references the monthly routine checklist every Monday to outline this week's tasks.

## Master File
- Location: \`30_resources/manuals/monthly-routine-checklist.md\`
- Role: The master list of all routine tasks
- Maintenance: Managed directly by the user (add/edit/delete items)

## Usage Examples
- "What do I have today?" / "TOP3" > Today's daily note + TOP3 suggestions
- "Show me this week's routines" > This week's relevant tasks
- "Show me all routines this month" > Full monthly task overview
- "Add a routine: XXX" > Add item to master file
- "Wrap up today" / "Evening review" > Run Evening Review
\`\`\`

### _me/3_knowledge/decisions-log.md
\`\`\`
# Decisions Log

> Record important decisions here.
> When a similar situation arises later, Claude can reference past decisions to give better advice.

## How to Record
During a conversation, say "log this decision" and Claude will add it using the format below.

---
\`\`\`

### _me/3_knowledge/lessons-learned.md
\`\`\`
# Lessons Learned

> Record lessons learned from experience.
> Claude references past experiences to provide more personalized advice.

## Work-related
-

## Technical
-

## Organization & Collaboration
-

## Personal Growth
-
\`\`\`

### _me/3_knowledge/preferences.md
\`\`\`
# Preferences

> Record your work and technology preferences.
> Claude uses these to tailor recommendations and suggestions.

## Technology Preferences
-

## Work Style Preferences
-

## Content Preferences
-

## Dislikes
-
\`\`\`

### _me/4_interaction/feedback-log.md
\`\`\`
# Claude Feedback Log

> Record what worked well and what needs improvement in conversations with Claude.
> This helps Claude deliver increasingly personalized responses over time.

## What Worked Well
-

## Needs Improvement
-

## Especially Useful Moments
-
\`\`\`

### _me/4_interaction/useful-prompts.md
\`\`\`
# Useful Prompts

> Collect Claude prompts that worked well.
> Reuse or refine them in similar situations.

## Workflow Automation
-

## Document Writing
-

## Decision-making
-

## Code & Technical
-

## Other
-
\`\`\`

---

## Step 3: Collect Personal Information & Build Profile

> 🔄 **Update Mode**: If \`profile.md\` and other files already contain user data, skip this step and proceed to Step 4. However, if this version introduces new fields, ask only those additional questions.

After creating all the files above, ask me the following questions **one at a time**.
As I answer each one, fill in the corresponding file immediately.

### Questions for profile.md:
1. "What is your name and email?"
2. "What is your decision-making style? (data-driven / intuitive / mixed)"
3. "What do you value most in your work? (efficiency / accuracy / impact, etc.)"
4. "What are your strengths and areas for improvement?"
5. "What are your short-term goals (3 months) and long-term goals (1 year)?"

### Questions for my-job.md:
6. "What is your company/organization name, title, and specific role?"
7. "Who is your reporting line (supervisor)?"
8. "Do you use any external services regularly? (accountant, legal, banking, etc.)"

### Questions for communication-pref.md:
9. "Do you prefer Claude's responses to be concise / detailed / depends on the situation?"
10. "What conversation tone do you prefer? Casual / business / friendly yet professional?"
11. "Is there anything Claude should NOT do? (e.g., excessive emojis, unnecessary flattery, etc.)"

### Questions for work-style.md:
12. "When are your peak focus hours? What is your preferred order of communication channels?"
13. "Multitasking vs. single-tasking? Planner vs. improviser?"

Once all questions are answered, finalize profile.md, my-job.md, communication-pref.md, and work-style.md with the collected information.

---

## Step 4: Create CLAUDE.md

> 🔄 **Update Mode**: If CLAUDE.md already exists, **preserve user info (name/company/role)** and only replace system sections (routines, GTD rules, recording rules, etc.) with the latest content below. Also preserve any custom sections the user has added.

Create CLAUDE.md at the vault root. Insert the information collected in Step 3 into the {curly brace} placeholders.

\`\`\`
# Claude Memory System

> This file is automatically loaded at the start of every session.
> Refer to the files below to understand the user's context.

## User
- Name: {name}
- Company: {company}
- Role: {role summary}

## Required References (Every Session)
- \`_me/1_identity/profile.md\` — Basic info, personality, strengths/weaknesses
- \`_me/1_identity/my-job.md\` — Organization, title, responsibilities, external services
- \`_me/2_context/current-focus.md\` — Current focus areas

## Contextual References
- My job/external services > \`_me/1_identity/my-job.md\`
- Tools/tech questions > \`_me/2_context/tools-stack.md\`
- Decision-making help > \`_me/3_knowledge/decisions-log.md\`
- Advice/coaching > \`_me/3_knowledge/lessons-learned.md\`
- Preferences > \`_me/3_knowledge/preferences.md\`
- Communication style > \`_me/1_identity/communication-pref.md\`
- Claude feedback > \`_me/4_interaction/feedback-log.md\`
- Routine task check > \`_me/2_context/routine-system.md\` + \`30_resources/manuals/monthly-routine-checklist.md\`

## Memory Sync (Every Session Start)
> MEMORY.md is Claude's **temporary buffer (inbox)**. \`_me/\` is the only permanent store (Single Source of Truth).
> Content that Claude Code automatically writes to MEMORY.md during a session is classified and migrated to \`_me/\` at the start of the next session.

### Principles
- **MEMORY.md** = Temporary buffer (working memo between sessions). Keep minimal
- **\`_me/\`** = Permanent store. The authoritative source for all structured knowledge
- No duplicates: Do not keep information in MEMORY.md that already exists in \`_me/\`

### Process (Once per session start, before all other routines)
1. Read MEMORY.md
2. Classify each item:
   | Content Type | Target File |
   |-------------|-------------|
   | User preferences/dislikes | \`_me/3_knowledge/preferences.md\` |
   | Tool/service changes | \`_me/2_context/tools-stack.md\` |
   | Project status changes | \`_me/2_context/current-focus.md\` |
   | Important decisions | \`_me/3_knowledge/decisions-log.md\` |
   | Lessons/insights | \`_me/3_knowledge/lessons-learned.md\` |
   | Profile changes | \`_me/1_identity/profile.md\` |
   | Work style changes | \`_me/1_identity/work-style.md\` |
   | Communication preference changes | \`_me/1_identity/communication-pref.md\` |
   | Claude feedback | \`_me/4_interaction/feedback-log.md\` |
   | Behavioral rules (for Claude) | Suggest reflecting in CLAUDE.md itself |
3. Items already reflected in \`_me/\` > skip
4. New items > Reflect in target file (save after user confirmation)
5. Clean up MEMORY.md: Remove completed items, keep only the previous session's working state

### Triggers
- **Automatic at every session start** (runs before all other routines)
- User keywords: "clean up memory", "memory sync", "sync memory", "sync"

## Daily Morning Review (Automatic)
> **Every day** at session start, automatically execute the logic below.
> Also runs when the user says "today's tasks", "TOP3", "morning review", "daily review", etc.

### Triggers
- **Automatic at the start of each day's first session**
- User keywords: "today's tasks", "TOP3", "morning review", "daily", "morning routine", "check tasks"

### Execution Logic

#### Phase 1: Check/Create Today's Daily Note
- Check if \`00_daily/{today's date}.md\` exists
- If not, auto-create using \`30_resources/templates/Daily Note Template.md\`

#### Phase 2: Collect Today's Task Candidates (Scan 5 Sources)
1. **Yesterday's daily note** > Check \`Tomorrow's Priority\` section (carry-over tasks)
2. **\`current-focus.md\`** > Incomplete (\`[ ]\`) items that can be handled today
3. **\`01_inbox/\`** > Items with \`status: inbox\` that are due soon or quick to process
4. **\`10_projects/\`** > Next actions for projects with approaching deadlines
5. **\`30_resources/manuals/monthly-routine-checklist.md\`** > Routines applicable to today (if file exists)

#### Phase 3: Suggest TOP3
- Sort collected candidates by priority and **suggest TOP3**:
  - Red: **Due soon** (due today or tomorrow) > Highest priority
  - Yellow: **Needs to be done this week** > Important
  - Green: **Nice to progress** > If time allows
- After user confirmation/edits, record in the daily note's \`Today's Focus\` section

#### Phase 4: Today's Appointments/Meetings
- Remind about events listed in the daily note's \`Appointments & Meetings\`
- Check \`current-focus.md\`'s \`Upcoming Schedule\` for today's entries

### Evening Review (Before Session Ends)
> Runs when the session has been long, or when the user requests "wrap up today", "evening review", "close out"

1. Update the daily note's \`Completed Today\` section
2. Check incomplete items > Suggest whether to carry over to tomorrow
3. Write \`Tomorrow's Priority\` (seeds for tomorrow's TOP3)
4. Suggest whether \`current-focus.md\` needs updating

## Monday Routine Check (Automatic)
> **Every Monday** at session start, automatically execute the logic below.

1. Read \`30_resources/manuals/monthly-routine-checklist.md\` (skip if file does not exist)
2. Extract tasks relevant to **this week (Mon-Fri)** based on today's date:
   - "Weekly recurring" > Always included
   - "Monthly recurring" > Included if the date range falls within this week
   - "Quarterly/Semi-annual/Annual" > Included if this is the relevant month
   - "Ad-hoc check" > Included only during the first week of the month (days 1-5)
3. Present extracted items sorted by **priority**:
   - Red: Due soon (deadline within this week)
   - Yellow: Needs to be done this week
   - Green: Items to review/prepare
4. Even on non-Monday days, run the same logic if the user requests "this week's routines", "routine check", "check tasks", etc.

## GTD Inbox Processing Rules (Absolute Rules)
> **Whenever the user drops a new task/to-do/idea into the chat, always execute the process below.**

### Phase 1: Capture
- When a new task comes in, **immediately** create a note in \`01_inbox/\`
- Filename: \`{date}_{task-title}.md\`
- Include in frontmatter: \`status: inbox\`, \`created: {date}\`, \`gtd_type: pending\`

### Phase 2: Clarify & Organize
Apply the following GTD criteria and **suggest a classification** to the user:

| Criterion | Classification | Action |
|-----------|---------------|--------|
| Can it be done in under 2 minutes? | Do It Now | Process immediately, then move to \`40_archive/\` |
| Is it not my responsibility? | Delegate | Stay in \`01_inbox/\` with \`gtd_type: delegated\`, record delegate |
| Is it a project with a specific deadline? | Project | Move to \`10_projects/\` |
| Does it require ongoing management? | Area | Move to appropriate subfolder in \`20_areas/\` |
| Something I want to do someday but not now? | Someday/Maybe | Keep in \`01_inbox/\` with \`gtd_type: someday\` tag |
| Is it just reference material? | Reference | Move to \`30_resources/\` |

### Phase 3: Engage
- After suggesting a classification, wait for user confirmation, then move the file to the appropriate folder
- Update the frontmatter \`status\` upon moving

### Trigger Keywords
- "I need to", "can you do", "to-do", "add task", "inbox", "new task" > Start GTD process
- "clean up inbox", "GTD review", "weekly review" > Full scan of \`01_inbox/\`

### Inbox Note Template
---
status: inbox
created: {date}
gtd_type: pending
due:
delegated_to:
tags: []
---
# {Task Title}

## Description
{Task description}

## Next Action
- [ ] {Specific next action}



## Weekly Review
> GTD weekly review. Look back on the week and review the entire system.

### Automatic Triggers
- **Saturday/Sunday** session start > Suggest "Would you like to do a weekly review?"
- **Monday** session start > If no weekly review was done last weekend: "It looks like you didn't do a weekly review last weekend. Would you like to do one now?"
- Runs immediately when the user requests "weekly review", "GTD review"

### Weekly Review Process (Needed if no review record exists for last week)
> Review records are saved in \`00_daily/\` as \`{date}_weekly-review.md\`.

#### Phase 1: Inbox Cleanup
- Full scan of \`01_inbox/\` > Suggest classification for unprocessed items (\`status: inbox\`)

#### Phase 2: Project Check
- Review \`current-focus.md\` > Check completed items, add new items, update deadlines
- Scan \`10_projects/\` > Identify overdue or stalled items

#### Phase 3: _me Context Check
- \`profile.md\` — Any strengths/traits discovered in this week's conversations to reflect?
- \`work-style.md\` — Any changes in work patterns?
- \`my-job.md\` — Any new external service/provider info learned?
- \`preferences.md\` — Any new tool/method preferences?
- \`decisions-log.md\` — Any important decisions from this week missing?

#### Phase 4: Prepare for Next Week
- Preview next week's routine checklist
- Warn about upcoming deadlines

## Contact & Network Management Rules
> Automatically triggered when a person's name or organization/entity name is mentioned during work

### Trigger
- When a **person's name** or **organization/entity name** is mentioned in conversation, start the process below

### Process
1. Search \`30_resources/contacts/\`
2. Show search results to the user and **confirm whether to update**
3. Update the file after user confirmation

### Update Location Guide
| Category | Storage Location | What to Record |
|----------|-----------------|---------------|
| Personal contacts | \`30_resources/contacts/{name}.md\` | Contact info + communication history + personality notes |



## Recording Rules

### Automatic Triggers (Claude detects > suggests update)
| Detected in Conversation | Update Target | Basis |
|-------------------------|---------------|-------|
| Product name (proper noun) + description | \`my-job.md\` | Proper noun match |
| "done", "finished", "completed" + project name | \`current-focus.md\` status change | Status keywords |
| Tool/service name + positive/negative evaluation | \`preferences.md\` | Evaluation expressions |
| Important decision made | \`decisions-log.md\` suggestion | Decision keywords |
| Feedback received | \`feedback-log.md\` record | Feedback expressions |

### User-Triggered Actions (user explicitly requests)
| Keyword | Action |
|---------|--------|
| "update profile", "edit my info" | Edit \`profile.md\` |
| "update company info" | Edit \`my-job.md\` |
| "this is my style", "my habits" | Record in \`work-style.md\` |
| "update this week's focus" | Refresh \`current-focus.md\` |
| "context review", "memory check" | Full scan of \`_me/\` > Report empty/stale items |

### Update Method
- When an update is detected, after the relevant task is complete, suggest: "Shall I update XX.md with this information?"
- Execute update after user confirmation
- Collect minor items and suggest them all at once before the session ends

## Vault Structure
00_daily/                — Daily notes
01_inbox/                — Unsorted memos, quick captures
10_projects/             — One-off tasks with deadlines
20_areas/                — Ongoing management areas
30_resources/            — Reference knowledge
40_archive/              — Completed/inactive materials
attachments/             — Images, attached files
_me/                 — Claude Memory System (personal context)
\`\`\`

---

## Step 5: Verification
Once all files have been created, do the following:

### 🆕 For Fresh Install:
1. Display the list of created folders/files
2. Show the following checklist:
   - [ ] 7 folders created at vault root confirmed
   - [ ] 4 subfolders + 12 files created in _me/ confirmed
   - [ ] Personal information entered in profile.md confirmed
   - [ ] Organization/title/services entered in my-job.md confirmed
   - [ ] Preferences entered in communication-pref.md confirmed
   - [ ] Work style entered in work-style.md confirmed
   - [ ] CLAUDE.md created + user info reflected confirmed
   - [ ] Daily Note Template created (\`30_resources/templates/Daily Note Template.md\`) confirmed
   - [ ] CLAUDE.md includes Daily Morning Review + Monday Routine Check sections confirmed
3. Display: "Setup complete! Try it out: say 'I need to write the quarterly report by next week.'"
4. Display: "The daily morning routine is also configured. Say 'TOP3' or 'today's tasks' to organize your day."

### 🔄 For Update:
1. Output a **change report** in the following format:
\`\`\`
## Update Complete Report

### ✅ Newly Added
- (List of files/folders/sections newly created in this version)

### ✅ System Updated
- (List of sections replaced with latest logic in CLAUDE.md, etc.)

### ⏭️ Preserved (No Changes)
- (List of files with user data that were left untouched)

### ⚠️ Manual Review Needed (if applicable)
- (Items that require user verification/adjustment)
\`\`\`
2. Display: "Update complete! All your existing data has been preserved."

---

## Reference: About This System

### GTD (Getting Things Done) Workflow
Capture all new tasks in 01_inbox first > Classify (do now if under 2 min / delegate / project / area / someday / reference) > Move to the appropriate folder

### PARA (Projects, Areas, Resources, Archive) Structure
- 10_projects/ = Projects (tasks with a start and end)
- 20_areas/ = Areas (domains requiring ongoing management)
- 30_resources/ = Resources (reference knowledge)
- 40_archive/ = Archive (completed/inactive)

### Frontmatter Format
Apply the following YAML frontmatter to all task notes:
- status: inbox / active / delegated / someday / done
- created: date
- gtd_type: pending / project / area / reference / someday / delegated
- due: deadline
- delegated_to: delegate target
- tags: []

> Execute everything in order. Start from Step 1!`

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
