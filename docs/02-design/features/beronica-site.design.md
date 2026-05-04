# beronica-site Design Document

> **Summary**: Beronica 공식 사이트(beronica.ai) — 5페이지 한·영 랜딩 + MDX 블로그 + Stibee 뉴스레터 + Vercel Analytics 커스텀 이벤트 추적을 Option C(Pragmatic Balance) 아키텍처로 구현하는 풀스택 Next.js 사이트
>
> **Project**: Beronica
> **Version**: 0.1
> **Author**: mskim@popupstudio.ai
> **Date**: 2026-04-29
> **Status**: Draft
> **Planning Doc**: [beronica-site.md](../../01-plan/beronica-site.md)

### Pipeline References

| Phase | Document | Status |
|-------|----------|--------|
| Plan | [beronica-site.md](../../01-plan/beronica-site.md) | 완료 |
| Design | 본 문서 | 진행 중 |
| Do | `/pdca do beronica-site --scope M1` | 대기 |

---

## Executive Summary

| 관점 | 내용 |
|------|------|
| **Problem** | 베로니카 앱(2026 H2 베타) 전 공식 랜딩·블로그·다운로드 추적·i18n 채널이 전무하여 SEO 자산 축적이 불가능한 상태. (뉴스레터는 런칭 후 사이클로 분리 — §Version History v0.4) |
| **Solution** | Next.js 16 App Router + next-intl 기반 한·영 5페이지 사이트에 MDX 블로그, Vercel Analytics 커스텀 이벤트를 통합하여 "검색 유입 → 자동 설치 프롬프트 복사 → 사용 시작" 전환 깔때기를 구축. |
| **Function·UX·Effect** | RSC 우선 + shadcn/ui + Tailwind 4 Warm Lavender 디자인으로 P3(개발자/파워유저) 친화 카피와 Lighthouse 90+ 품질 게이트를 동시 충족. 자동 설치 프롬프트 원클릭 복사(`copy_prompt` 이벤트)가 핵심 전환 액션. |
| **Core Value** | "AI가 일하고, 당신은 성장한다" — 텍스트·MDX 파일 기반 완전한 데이터 소유권을 가진 베로니카 시스템을 5분 내 시작할 수 있도록 안내하는 단일 허브. |

---

## Context Anchor

| Key | Value |
|-----|-------|
| **WHY** | 베로니카 앱 베타(2026 H2) 전 공식 랜딩 + SEO 콘텐츠 자산 + 다운로드 추적 채널 부재 해결. 4개 채널(랜딩/콘텐츠/다운로드 추적/i18n) 동시 구축 |
| **WHO** | P1 박지현(1인 기업가), P2 김태호(스타트업 COO), **P3 이서준(개발자·Obsidian 파워유저, 우선순위 1순)**. Phase 1~2 카피 톤은 P3 친화 우선 |
| **RISK** | R1 Next.js 16 + Tailwind 4 + React 19 동시 신규 메이저 / R2 MDX 라이브러리 결정 지연 / R3 5주 내 콘텐츠 4~5편 부담 / R5 다국어 SEO hreflang 오설정 (R4 Stibee는 출시 범위 밖으로 이월) |
| **SUCCESS** | K1 Lighthouse 90+ / K2·K4 Baseline 측정 모드 (K3 뉴스레터 구독자 KPI 제거) / K5 인덱싱 90%+ / K6 CWV "Good" 75%+. **DoD D1~D6** (5페이지 한·영 / Lighthouse / 한국어 4~5편+인덱싱 / Vercel Analytics 이벤트 / 도메인+SEO / RSS+JSON-LD) |
| **SCOPE** | In: 5페이지 한·영, MDX 블로그, Vercel Analytics 커스텀 이벤트(`copy_prompt`·`download_vault`), shadcn/ui, Tailwind 4, next-intl. Out: 다크모드, Sentry, CMS, 회원/결제, 댓글, 모바일 앱, **뉴스레터(런칭 후 별도 사이클)** |

---

## 1. Overview

### 1.1 Design Goals

| # | 목표 | 측정 방법 |
|---|------|---------|
| G1 | Lighthouse 90+ (Performance / SEO / Accessibility 3개) | 배포 직후 Lighthouse CI |
| G2 | RSC 우선으로 JS 번들 최소화 — 'use client' 컴포넌트 5개 이하 | 빌드 번들 분석 |
| G3 | MDX 라이브러리 교체 가능한 추상화 인터페이스 | `lib/mdx.ts` 단일 진입점 |
| ~~G4~~ | ~~Stibee API Key 완전 서버 격리~~ | 출시 범위 밖 (뉴스레터 런칭 후 사이클로 이월) |
| G5 | hreflang 오설정 없는 한·영 sitemap | Google Rich Results Test 통과 |

### 1.2 Design Principles

1. **RSC First** — 데이터 페칭·렌더링은 서버 컴포넌트에서. 'use client'는 인터랙션이 필수인 컴포넌트(CopyButton, UseCaseTabs, CounterSection, LangSwitcher)에만. (NewsletterForm은 출시 범위 밖.)
2. **Abstraction over Commitment** — MDX 라이브러리(Contentlayer vs next-mdx-remote)는 Phase 1 말 PoC까지 결정 유보. `lib/mdx.ts` 인터페이스로 추상화하여 구현 교체 시 페이지 레이어 변경 없음.
3. **Accessibility First** — WCAG 2.1 AA. ARIA 라벨, 키보드 네비게이션, `prefers-reduced-motion` 존중.
4. **Design Token Consistency** — Warm Lavender 팔레트를 CSS 변수로 정의하고 Tailwind 4 테마에 매핑. 컴포넌트가 직접 hex 값 사용 금지.
5. **Type Safety** — TypeScript strict mode. 모든 컴포넌트 Props, MDX frontmatter, API 요청/응답에 타입 정의.

---

## 2. Architecture

### 2.0 선택: Option C — Pragmatic Balance

사용자가 2026-04-29에 명시 선택.

| 기준 | Option A: Minimal | Option B: Clean | **Option C: Pragmatic** |
|------|:-:|:-:|:-:|
| 접근 방식 | 단일 app/dir | 엄격한 레이어 분리 | 합리적 경계 분리 |
| 신규 파일 수 | ~30 | ~60 | ~45 |
| 복잡도 | 낮음 | 높음 | **중간** |
| 유지보수성 | 낮음 | 높음 | **높음** |
| 노력 | 낮음 | 높음 | **중간** |
| MDX 추상화 | 어려움 | 자연스러움 | **자연스러움** |
| **추천** | 빠른 PoC | 장기 대형 프로젝트 | **Default (선택)** |

**선택 근거**: 5페이지 + MDX 블로그 규모에서 Full Clean Architecture는 과투자. Minimal은 MDX 라이브러리 교체 시 페이지 레이어 수정 필요. Option C는 `lib/`의 평면 추상화로 교체 비용을 격리하면서도 팀 온보딩 부담이 낮음.

**트레이드오프**: app/ 내 일부 로직이 Use Case 레이어와 혼재될 수 있음. 사이트 규모(5페이지)에서는 허용 가능. 블로그 콘텐츠가 수백 편 이상으로 확장 시 재검토.

### 2.1 디렉토리 트리 (Option C)

```
beronica-site/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              ← next-intl Provider + 글로벌 메타
│   │   ├── page.tsx                ← Home (9 섹션, RSC)
│   │   ├── features/
│   │   │   └── page.tsx            ← Features (7개 기능, RSC)
│   │   ├── get-started/
│   │   │   └── page.tsx            ← Get Started (자동 설치 프롬프트 복사 중심, RSC + CopyButton 클라이언트)
│   │   ├── blog/
│   │   │   ├── page.tsx            ← 블로그 목록 (RSC)
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx        ← 블로그 상세 (RSC, MDX 렌더)
│   │   │   ├── category/
│   │   │   │   └── [cat]/page.tsx  ← 카테고리 필터 (RSC)
│   │   │   └── tag/
│   │   │       └── [tag]/page.tsx  ← 태그 필터 (RSC)
│   │   └── about/
│   │       └── page.tsx            ← About (RSC)
│   ├── sitemap.ts                  ← Next.js 내장 sitemap 생성 (한·영 alternate)
│   ├── robots.ts                   ← robots.txt 생성
│   └── rss.xml/
│       └── route.ts                ← RSS 피드 생성
│
├── components/
│   ├── ui/                         ← shadcn/ui 원자 (커뮤니티 표준 격리)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── separator.tsx
│   │   ├── tabs.tsx
│   │   └── toast.tsx
│   ├── sections/                   ← 베로니카 도메인 컴포넌트
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProblemSection.tsx
│   │   │   ├── SolutionSection.tsx
│   │   │   ├── FeaturesOverview.tsx
│   │   │   ├── ComparisonTable.tsx
│   │   │   ├── UseCaseTabs.tsx     ← 'use client' (탭 전환 인터랙션)
│   │   │   ├── SocialProof.tsx
│   │   │   └── CounterSection.tsx  ← 'use client' (숫자 카운터 애니메이션)
│   │   │       (NewsletterCTA 섹션은 출시 범위 밖 — 런칭 후 추가)
│   │   ├── features/
│   │   │   ├── FeatureBlock.tsx    ← 좌우 교대 레이아웃 단위
│   │   │   └── AnchorNav.tsx
│   │   ├── get-started/
│   │   │   ├── CopyButton.tsx      ← 'use client' (복사 + va.track('copy_prompt'))
│   │   │   ├── StepGuide.tsx
│   │   │   ├── FolderPreview.tsx   ← 결과 데모 (폴더 구조 시각화)
│   │   │   └── VaultDownload.tsx   ← 'use client' (va.track('download_vault'))
│   │   └── blog/
│   │       ├── PostCard.tsx
│   │       ├── PostList.tsx
│   │       ├── TagCloud.tsx
│   │       ├── CategoryFilter.tsx
│   │       └── BlogMDX.tsx         ← MDX 커스텀 컴포넌트 매핑
│   └── layout/
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── LangSwitcher.tsx        ← 'use client' (언어 전환 라우팅)
│           (NewsletterForm은 출시 범위 밖 — 런칭 후 사이클에서 추가)
│
├── lib/
│   ├── mdx.ts                      ← MDX 추상화 인터페이스 (구현 swap 진입점)
│   ├── analytics.ts                ← Vercel Analytics 커스텀 이벤트 헬퍼
│   ├── i18n.ts                     ← next-intl 설정·헬퍼
│   ├── seo.ts                      ← JSON-LD 생성기 (Organization, Article, FAQ) + OG 메타
│   └── reading-time.ts             ← 단어 수 기반 독서 시간 자동 계산
│       (lib/stibee.ts는 출시 범위 밖 — 런칭 후 사이클에서 추가)
│
├── content/
│   └── posts/
│       ├── ko/                     ← 한국어 MDX 파일
│       │   └── *.mdx
│       └── en/                     ← 영문 MDX 파일 (Phase 4 또는 후행)
│           └── *.mdx
│
├── messages/
│   ├── ko.json                     ← 한국어 UI 텍스트
│   └── en.json                     ← 영어 UI 텍스트
│
├── public/
│   ├── images/
│   └── og/                         ← OG 이미지 (정적)
│
├── middleware.ts                   ← next-intl 언어 감지·리다이렉트
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

### 2.2 컴포넌트 다이어그램

```
Browser Request
      │
      ▼
middleware.ts ─────── Accept-Language 감지 ──→ /en 또는 / (ko)
      │
      ▼
app/[locale]/layout.tsx
  └── next-intl Provider (messages/ko.json or en.json)
      └── Header (LangSwitcher 'use client')
          └── page.tsx (RSC)
              ├── components/sections/** (RSC)
              │     └── 'use client' 컴포넌트는 필요한 leaf에만
              └── lib/mdx.ts (서버사이드 데이터 페칭)

app/api/subscribe/route.ts
  └── lib/stibee.ts (서버 전용, API Key 노출 없음)

app/sitemap.ts / app/robots.ts / app/rss.xml/route.ts
  └── lib/mdx.ts (전체 포스트 목록 조회)
```

### 2.3 의존성 맵

| 컴포넌트/모듈 | 의존 대상 | 목적 |
|-------------|---------|------|
| `app/[locale]/page.tsx` | `components/sections/home/*`, `lib/i18n.ts`, `lib/seo.ts` | Home 페이지 조립 |
| `app/[locale]/blog/[slug]/page.tsx` | `lib/mdx.ts`, `lib/seo.ts`, `components/sections/blog/BlogMDX.tsx` | MDX 렌더링 |
| `app/api/subscribe/route.ts` | `lib/stibee.ts` | 구독 처리 |
| `components/layout/NewsletterForm.tsx` | `/api/subscribe` (fetch) | 폼 제출 |
| `components/sections/get-started/CopyButton.tsx` | `lib/analytics.ts` | `copy_prompt` 이벤트 |
| `app/sitemap.ts` | `lib/mdx.ts` | 모든 포스트 슬러그 수집 |

---

## 3. Design System

### 3.1 디자인 토큰 (Warm Lavender)

원본 기획서 §4.1 컬러 팔레트를 Tailwind 4 CSS 변수로 정의.

```css
/* app/globals.css */
@layer base {
  :root {
    --color-bg:              #FFFCF8;   /* Cream White — 페이지 배경 */
    --color-surface:         #F8F6F3;   /* Warm Surface — 카드·섹션 배경 */
    --color-primary:         #8B7EC8;   /* Lavender — CTA·헤딩(18pt+)·아이콘·강조 박스 한정. 본문 텍스트 사용 금지 (대비 3.5:1로 AA 미달) */
    --color-primary-hover:   #7A6DB7;
    --color-accent:          #D97757;   /* Terracotta — 긴급 CTA·배지 */
    --color-accent-hover:    #C86646;
    --color-text:            #2C2C34;   /* Warm Charcoal — 본문 */
    --color-text-secondary:  #6B6B78;   /* 보조 텍스트·캡션 */
    --color-text-muted:      #9B9BA8;   /* 비활성·힌트 */
    --color-border:          #E8E5E0;
    --color-success:         #5B9A6F;
    --color-error:           #D94F4F;

    /* Typography */
    --font-display: 'Playfair Display', Georgia, serif;   /* 영문 H1~H3 */
    --font-sans:    'Pretendard', system-ui, sans-serif;  /* 한글 + 본문 */
    --font-mono:    'JetBrains Mono', 'Courier New', monospace; /* 코드 */

    /* Spacing */
    --radius-card: 12px;
    --radius-btn:  8px;
  }
}
```

> 다크 모드 변수는 이번 범위 제외 확정(§13.3). CSS 변수 구조는 향후 다크 모드 추가를 위한 준비 상태 유지.

### 3.2 shadcn/ui 설치 컴포넌트 목록

Phase 1에서 초기 설치할 컴포넌트 (추가 가능):

| 컴포넌트 | 용도 |
|---------|------|
| `button` | CTA, 복사 버튼, 제출 버튼 |
| `card` | 기능 카드, 포스트 카드, 다운로드 카드 |
| `input` | 뉴스레터 이메일 입력 |
| `badge` | 카테고리 배지, 태그 |
| `separator` | 섹션 구분선 |
| `tabs` | Use Cases 탭 (페르소나 전환) |
| `toast` | 구독 완료·복사 완료 알림 |
| `skeleton` | 로딩 상태 |

### 3.3 타이포그래피 스케일

| Element | 데스크톱 | 모바일 | 서체 |
|---------|---------|--------|------|
| H1 | 48px / 1.2 | 32px | Playfair Display 700 (영문) / Pretendard 700 (한글) |
| H2 | 36px / 1.3 | 28px | Pretendard 700 |
| H3 | 24px / 1.4 | 20px | Pretendard 600 |
| Body | 18px / 1.7 | 16px | Pretendard 400 |
| Small | 14px / 1.5 | 14px | Pretendard 400 |
| Code | 14px / 1.6 | 14px | JetBrains Mono 400 |

### 3.4 반응형 브레이크포인트

| Breakpoint | Width | 컨텐츠 최대폭 |
|------------|-------|------------|
| base | 320px~ | — |
| sm | 640px | — |
| md | 768px | — |
| lg | 1024px | — |
| xl | 1280px | `max-w-6xl` (1152px) |
| 블로그 본문 | — | `max-w-3xl` (768px) |

---

## 4. Data Model

### 4.1 BlogPost (MDX frontmatter 기반)

```typescript
// lib/mdx.ts 내 타입 정의
import { z } from 'zod'

export const BlogPostFrontmatterSchema = z.object({
  title:       z.string(),
  date:        z.string().regex(/^\d{4}-\d{2}-\d{2}$/),  // ISO 8601 날짜
  category:    z.enum(['GTD', 'PARA', 'AI Memory', 'Build Log', 'Tutorial']),
  tags:        z.array(z.string()),
  description: z.string(),
  image:       z.string().optional(),
  series:      z.object({ name: z.string(), order: z.number() }).optional(),
  locale:      z.enum(['ko', 'en']),
  author:      z.string().default('Minsu Kim'),
  featured:    z.boolean().default(false),
})

export type BlogPostFrontmatter = z.infer<typeof BlogPostFrontmatterSchema>

// lib/mdx.ts 에서 readingTime을 자동 계산하여 주입
export type BlogPost = BlogPostFrontmatter & {
  slug:        string
  readingTime: number  // lib/reading-time.ts 자동 계산
  content:     string  // raw MDX 텍스트 (상세 페이지용)
}
```

**MDX frontmatter 예시**:

```yaml
---
title: "GTD, 3주 만에 포기했다면 당신 잘못이 아닙니다"
date: 2026-04-20
category: GTD
tags: [GTD, 생산성, AI, 자동화]
description: "GTD를 시작했지만 주간 리뷰에서 막혀 포기한 적 있나요? 그건 당신의 의지력 문제가 아닙니다."
image: /images/blog/gtd-failure.jpg
locale: ko
author: Minsu Kim
featured: false
---
```

### 4.2 Feature (정적 데이터)

```typescript
// lib/features-data.ts (서버 컴포넌트에서만 import)
import type { LucideIcon } from 'lucide-react'

export type Feature = {
  id:          string           // 'ai-memory', 'gtd-inbox', ...
  icon:        LucideIcon
  anchorId:    string           // '#ai-memory' 앵커 네비게이션용
  title:       { ko: string; en: string }
  description: { ko: string; en: string }
  demoType:    'chat' | 'folder' | 'table' | 'diagram'
  order:       number           // 좌우 교대 레이아웃 계산 (짝수: 텍스트 좌, 홀수: 텍스트 우)
}
```

### 4.3 Contact (정적 상수)

```typescript
// lib/site-config.ts
export const CONTACT = {
  email:    'beronica.aigtd@gmail.com',
  github:   'https://github.com/Master-Beronica',
  kakao:    undefined,           // 개설 예정
  twitter:  undefined,           // @beronica_ai 예정
  linkedin: undefined,           // Minsu Kim 프로필 예정
} as const

export const SITE_META = {
  name:        'Beronica',
  tagline:     'AI가 일하고, 당신은 성장한다.',
  url:         'https://beronica.ai',
  defaultLocale: 'ko',
  locales:     ['ko', 'en'],
} as const
```

### 4.4 엔티티 관계

```
BlogPost (MDX 파일 기반, DB 없음)
  └── locale: 'ko' | 'en'
  └── category: 5개 열거형
  └── tags: 자유 배열
  └── series?: { name, order }  ← 시리즈 그룹핑용

Feature (정적 배열, 7개 고정)
  └── 위치·언어별 렌더링에 사용

Contact / SiteMeta (상수, 환경에 따라 변하지 않음)
```

---

## 5. API Contract

### 5.1 POST /api/subscribe ⚠ **출시 범위 밖 (런칭 후 별도 PDCA 사이클)**

> **2026-04-29 결정**: 뉴스레터(Stibee 통합)는 런칭 후 사이클로 분리 (Plan §13.3). 이 섹션의 명세는 **재도입 시 활용할 보존 자료**로 둠. M2/M3에서 구현 대상 아님.

Stibee API를 서버 라우트에서만 호출. API Key는 환경 변수 `STIBEE_ACCESS_TOKEN` (서버 only, `NEXT_PUBLIC_` 접두어 사용 금지).

**요청**:

```typescript
// POST /api/subscribe
// Content-Type: application/json
{
  email:  string,   // 필수, 이메일 형식 검증
  locale: 'ko' | 'en'  // 선택, 기본값 'ko'. 환영 이메일 언어 결정
}
```

**응답**:

| 상태 코드 | 상황 | 응답 본문 |
|---------|------|---------|
| 201 Created | 구독 성공 | `{ success: true, message: "구독 완료" }` |
| 400 Bad Request | 이메일 형식 오류 또는 필드 누락 | `{ error: "INVALID_EMAIL" }` |
| 409 Conflict | 이미 구독된 이메일 | `{ error: "ALREADY_SUBSCRIBED" }` |
| 429 Too Many Requests | Stibee Rate Limit 초과 | `{ error: "RATE_LIMIT", retryAfter: 60 }` |
| 500 Internal Server Error | Stibee API 장애 등 | `{ error: "SERVICE_ERROR" }` — 서버 콘솔(Vercel 로그)에 상세 기록 |

**Stibee 호출 명세** (`lib/stibee.ts`):

> **NOTE (2026-04-29 결정 변경)**: 사용자가 기존부터 Stibee를 사용 중. 정확한 endpoint·헤더 키·body 스키마는 사용자가 보유한 Stibee 대시보드의 API 문서 기준으로 M2 진입 시 확정. 아래는 일반적인 Stibee 패턴 기반 placeholder.

```typescript
// lib/stibee.ts (서버 전용)
// Stibee 공식 문서 기준 endpoint·body는 M2 진입 시 사용자 확인 후 확정
const STIBEE_BASE = 'https://api.stibee.com/v1'

export async function addSubscriber(email: string, locale: 'ko' | 'en') {
  const listId = process.env.STIBEE_LIST_ID!
  const res = await fetch(`${STIBEE_BASE}/lists/${listId}/subscribers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'AccessToken': process.env.STIBEE_ACCESS_TOKEN!,  // Stibee는 Bearer 아님 — AccessToken 헤더 직접 사용
    },
    body: JSON.stringify({
      eventOccuredBy: 'SUBSCRIBER',          // 본인 신청 (vs 'MANAGER' 관리자 추가)
      confirmEmailYN: 'N',                   // 더블 옵트인 사용 시 'Y'
      subscribers: [
        {
          email,
          $ad_agreed: 'Y',                   // 광고/마케팅 수신 동의 (Stibee 표준 필드)
          $ad_agreed_datetime: new Date().toISOString(),
          $ad_agreed_from: 'beronica.ai',
          locale,                            // 커스텀 필드 (대시보드에서 사전 정의 필요)
        },
      ],
    }),
  })

  if (res.status === 429) throw new Error('RATE_LIMIT')
  if (res.status === 409) throw new Error('ALREADY_SUBSCRIBED')
  if (!res.ok) throw new Error('SERVICE_ERROR')

  return res.json()
}
```

**환경 변수**:

| 변수명 | 범위 | 설명 |
|-------|------|------|
| `STIBEE_ACCESS_TOKEN` | 서버 only | Stibee API 토큰 (대시보드 → 설정 → API에서 발급) |
| `STIBEE_LIST_ID` | 서버 only | 구독 추가할 주소록 ID (대시보드 → 주소록 → URL의 숫자 또는 API에서 조회) |

---

## 6. Component Tree

### 6.1 components/ui/ (shadcn 원자)

shadcn/ui CLI로 생성되는 컴포넌트. 내부 수정 최소화, 커스텀 variant는 상위에서 주입.

```
components/ui/
├── button.tsx       ← variant: default|outline|ghost + size: sm|md|lg
├── card.tsx         ← Card, CardHeader, CardContent, CardFooter
├── input.tsx        ← 이메일 입력 등
├── badge.tsx        ← 카테고리·태그 배지
├── separator.tsx    ← 섹션 구분선
├── tabs.tsx         ← Tabs, TabsList, TabsTrigger, TabsContent
├── toast.tsx        ← 구독 완료·복사 알림
└── skeleton.tsx     ← 로딩 상태
```

### 6.2 components/sections/ (도메인 컴포넌트)

| 컴포넌트 | 페이지 | 서버/클라이언트 | 설명 |
|---------|------|:---:|------|
| `home/HeroSection` | Home | Server | 태그라인 + 2개 CTA + 스크린샷 영역 |
| `home/ProblemSection` | Home | Server | 5개 고통점 카드 + 통계 인용 |
| `home/SolutionSection` | Home | Server | Before/After 비교 + 채팅 데모 |
| `home/FeaturesOverview` | Home | Server | 7개 기능 카드 그리드 (3+4) |
| `home/ComparisonTable` | Home | Server | 경쟁사 비교 테이블 (반응형) |
| `home/UseCaseTabs` | Home | **Client** | 페르소나 3개 탭 전환 (자동 8초 + 수동) |
| `home/SocialProof` | Home | Server | 5개 숫자 카드 래퍼 |
| `home/CounterSection` | Home | **Client** | 숫자 카운터 애니메이션 (Intersection Observer) |
| `home/NewsletterCTA` | Home | Server | NewsletterForm을 감싸는 섹션 래퍼 |
| `features/FeatureBlock` | Features | Server | 좌우 교대 레이아웃 단위 (icon + 설명 + 데모) |
| `features/AnchorNav` | Features | Server | 앵커 네비게이션 바 (sticky) |
| `get-started/CopyButton` | Get Started | **Client** | 자동 설치 프롬프트 복사 + `va.track('copy_prompt')` |
| `get-started/StepGuide` | Get Started | Server | 3단계 시작 가이드 |
| `get-started/FolderPreview` | Get Started | Server | 생성되는 폴더 구조 시각화 |
| `get-started/VaultDownload` | Get Started | **Client** | Vault zip 보조 다운로드 + `va.track('download_vault')` |
| `blog/PostCard` | Blog | Server | 포스트 카드 (썸네일·제목·날짜·태그·읽기 시간) |
| `blog/PostList` | Blog | Server | PostCard 목록 래퍼 |
| `blog/TagCloud` | Blog | Server | 전체 태그 목록 |
| `blog/CategoryFilter` | Blog | Server | 카테고리 필터 링크 |
| `blog/BlogMDX` | Blog 상세 | Server | MDX 커스텀 컴포넌트 매핑 (Callout, CodeBlock 등) |

### 6.3 components/layout/

| 컴포넌트 | 서버/클라이언트 | 설명 |
|---------|:---:|------|
| `Header` | Server | 로고 + 네비 링크 + LangSwitcher + 모바일 햄버거 |
| `Footer` | Server | 4열 링크 + 저작권 (NewsletterForm은 출시 범위 밖) |
| `LangSwitcher` | **Client** | KO/EN 토글 → `router.push` + 현재 경로 유지 |

**'use client' 컴포넌트 총계**: 4개 (UseCaseTabs, CounterSection, CopyButton, VaultDownload, LangSwitcher 중 LangSwitcher가 Footer에 포함되지 않으므로 헤더에서 1개 사용) — G2 목표(5개 이하) 충족.

> 뉴스레터 통합이 런칭 후 사이클로 분리됨에 따라 NewsletterForm 제거. 'use client' 컴포넌트가 5 → 4개로 감소하여 G2 마진 확보.

---

## 7. MDX 추상화 인터페이스

Phase 1 말 PoC에서 Contentlayer vs next-mdx-remote 중 하나를 선택. 선택 전까지 두 라이브러리 모두 호환되는 추상화 인터페이스를 `lib/mdx.ts`에 정의.

```typescript
// lib/mdx.ts — 추상화 인터페이스 (구현은 lib/mdx.impl.ts 또는 lib/mdx.contentlayer.ts)

export interface MdxLib {
  getAllPosts(locale?: 'ko' | 'en'): Promise<BlogPost[]>
  getPostBySlug(slug: string, locale: 'ko' | 'en'): Promise<BlogPost | null>
  getCategories(locale?: 'ko' | 'en'): Promise<string[]>
  getTags(locale?: 'ko' | 'en'): Promise<string[]>
  getPostsBySeries(seriesName: string, locale?: 'ko' | 'en'): Promise<BlogPost[]>
}

// Phase 1 말 PoC 결과에 따라 아래 둘 중 하나 export:
// export { contentlayerImpl as mdx } from './mdx.contentlayer'
// export { nextMdxRemoteImpl as mdx } from './mdx.next-mdx-remote'
export { mdx } from './mdx.impl'  // PoC 전 임시 플레이스홀더
```

**PoC 판단 기준** (Phase 1 말, ~2일):

| 기준 | Contentlayer | next-mdx-remote |
|------|:-----------:|:---------------:|
| Next.js 16 공식 지원 | 불확실 (유지보수 불명확) | 공식 지원 |
| 빌드 시간 (50편 기준) | 빠름 (사전 빌드) | 온디맨드 |
| 타입 안전성 | 높음 (자동 생성) | 수동 zod 검증 |
| 핫 리로드 | 빠름 | 느릴 수 있음 |

Contentlayer 유지보수 상태가 불확실하여 **next-mdx-remote + zod 수동 검증**이 현재 기본 선호.

---

## 8. i18n 전략

### 8.1 라우팅 구조

| URL | 내용 |
|-----|------|
| `/` | 한국어 Home (기본 로케일, 리다이렉트 없이 직접 서빙) |
| `/en` | 영어 Home |
| `/blog/[slug]` | 한국어 블로그 포스트 |
| `/en/blog/[slug]` | 영어 블로그 포스트 |

next-intl `app/[locale]` 라우팅 패턴. 기본 로케일(`ko`)은 prefix 없이 `/`로 서빙 (`localePrefix: 'as-needed'` 설정).

### 8.2 middleware.ts

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  localePrefix: 'as-needed',   // ko는 prefix 없음, en은 /en/...
  localeDetection: true,       // Accept-Language 헤더 기반 자동 감지 (첫 방문 시)
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
```

### 8.3 메시지 키 네이밍 컨벤션

```json
// messages/ko.json 구조
{
  "nav": {
    "features": "기능",
    "getStarted": "시작하기",
    "blog": "블로그",
    "about": "소개"
  },
  "home": {
    "hero": {
      "tagline": "AI가 일하고, 당신은 성장한다.",
      "ctaPrimary": "5분이면 시작합니다",
      "ctaSecondary": "기능 알아보기"
    },
    "newsletter": {
      "title": "베로니카의 최신 소식을 받아보세요.",
      "placeholder": "이메일 주소 입력",
      "submit": "구독하기",
      "success": "구독 완료! 환영합니다.",
      "error": "잠시 후 다시 시도해 주세요."
    }
  },
  "blog": { ... },
  "getStarted": {
    "copyPrompt": "자동 설치 프롬프트 복사",
    "copied": "복사됨!"
  },
  "common": {
    "readMore": "더 읽기",
    "readingTime": "{minutes}분 읽기"
  }
}
```

**네이밍 규칙**:
- 최상위: 페이지 이름(`home`, `blog`, `getStarted`, `features`, `about`) 또는 공통(`nav`, `common`, `footer`)
- 중간: 섹션 또는 기능 단위
- 최하위: 구체적인 문자열 키 (camelCase)
- 키는 영어, 값만 한국어/영어 분리

### 8.4 hreflang 생성

`lib/seo.ts`의 `generateAlternates()` 함수가 페이지별 hreflang 링크를 반환. `app/[locale]/layout.tsx`의 Next.js metadata `alternates.languages`에 주입.

```typescript
// lib/seo.ts
export function generateAlternates(path: string) {
  return {
    languages: {
      'ko':      `https://beronica.ai${path}`,
      'en':      `https://beronica.ai/en${path}`,
      'x-default': `https://beronica.ai${path}`,  // ko를 x-default로
    },
  }
}
```

---

## 9. SEO · A11y 계획

### 9.1 SEO 전략

| 항목 | 구현 방법 | 파일 |
|------|---------|------|
| sitemap.xml | Next.js 내장 `app/sitemap.ts` — 포스트 슬러그 포함, 언어별 alternateRefs | `app/sitemap.ts` |
| robots.txt | Next.js 내장 `app/robots.ts` — `/api/` 차단 | `app/robots.ts` |
| hreflang | `lib/seo.ts` `generateAlternates()` → 각 페이지 metadata | `lib/seo.ts` |
| Open Graph | `lib/seo.ts` `generateOGMeta()` → 페이지별 OG 이미지 + 설명 | `lib/seo.ts` |
| Twitter Card | OG와 동일 메타 재사용 | `lib/seo.ts` |
| JSON-LD (Organization) | 홈 페이지 `<script type="application/ld+json">` | `lib/seo.ts` |
| JSON-LD (Article) | 블로그 상세 페이지 자동 생성 | `lib/seo.ts` |
| JSON-LD (FAQ) | Get Started 페이지 (자주 묻는 질문 섹션) | `lib/seo.ts` |
| RSS 피드 | `app/rss.xml/route.ts` — `content-type: application/xml` | `app/rss.xml/route.ts` |
| Canonical URL | `lib/seo.ts` `generateCanonical()` — 로케일 포함 절대 URL | `lib/seo.ts` |

**sitemap 우선순위 규칙**:

| 페이지 | priority | changefreq |
|-------|---------|-----------|
| Home | 1.0 | weekly |
| Features / Get Started | 0.8 | monthly |
| Blog 목록 | 0.8 | weekly |
| Blog 개별 포스트 | 0.7 | monthly |
| About | 0.5 | monthly |

### 9.2 A11y 계획

| 영역 | 구현 요건 |
|------|---------|
| 색상 대비 | WCAG AA 기준. **본문 텍스트는 `--color-text: #2C2C34`(Warm Charcoal) 사용 — Primary `#8B7EC8`은 본문 사용 금지**. Primary는 헤딩(18pt+ 또는 14pt 굵은) / CTA / 로고 / 아이콘 / 강조 박스 배경에 한정 (AA Large Text 3:1 기준 적용). 보조 텍스트는 `--color-text-secondary` 또는 `--color-text-muted` |
| 키보드 네비게이션 | 모든 인터랙티브 요소 `Tab` 접근 가능, `focus-visible` 스타일 명시 |
| ARIA | 햄버거 메뉴 `aria-expanded`, 탭 `role="tablist/tab/tabpanel"`, 복사 버튼 `aria-label="자동 설치 프롬프트 복사"` |
| 이미지 Alt | `next/image` 사용 시 `alt` 필수. 장식용 이미지는 `alt=""` |
| prefers-reduced-motion | CounterSection·UseCaseTabs 자동 전환·스크롤 애니메이션에 `@media (prefers-reduced-motion: reduce)` 적용 |
| 폼 접근성 | `<label>` + `<input>` 연결, 에러 메시지 `aria-describedby` |
| 스킵 네비게이션 | `<a href="#main-content">` 스킵 링크 (visually-hidden, focus 시 노출) |

---

## 10. Test Plan

> 테스트 코드는 Do 페이즈에서 구현과 1:1로 작성. 이 섹션은 **테스트 범위와 기대 동작 정의**.

### 10.1 L1: API 테스트 — **출시 범위 밖**

> 이번 PDCA 사이클에는 서버 API 라우트 없음 (뉴스레터 `/api/subscribe`는 런칭 후 사이클로 이월). API 테스트는 해당 사이클에서 §5.1 명세 기반으로 작성. 보존 자료는 §5.1 참조.

### 10.2 L2: UI 액션 테스트

| # | 페이지 | 액션 | 기대 결과 | 검증 |
|---|------|------|---------|-----|
| 1 | Get Started | CopyButton 클릭 | 클립보드에 자동 설치 프롬프트 텍스트 복사됨 | `navigator.clipboard.readText()` 확인 |
| 2 | Get Started | CopyButton 클릭 | `va.track('copy_prompt')` 호출됨 | `lib/analytics.ts` track 함수 spy |
| 3 | 임의 페이지 | LangSwitcher EN 클릭 | `/en/...` 경로로 이동 | URL 변경 확인 |

> NewsletterForm 액션 테스트는 출시 범위 밖 (런칭 후 사이클).

### 10.3 L3: E2E 시나리오 테스트

| # | 시나리오 | 스텝 | 성공 기준 |
|---|---------|------|---------|
| 1 | 블로그 탐색 | Home → Blog 목록(포스트 1개 이상) → 포스트 클릭 → 상세 페이지(제목·날짜·내용 렌더) | 404 없음, MDX 컨텐츠 렌더 확인 |
| 2 | 언어 전환 | `/` (한국어) → LangSwitcher EN → `/en` (영어) → UI 텍스트 영어로 변경 확인 | `nav` 텍스트가 `messages/en.json` 값과 일치 |
| 3 | 자동 설치 프롬프트 복사 | `/get-started` → CopyButton 클릭 → 복사 완료 상태 UI | 버튼 레이블 "복사됨!" 표시 |

> 구독 플로우 E2E는 출시 범위 밖 (뉴스레터 런칭 후 사이클).

---

## 11. Performance Plan

### 11.1 핵심 전략

| 영역 | 전략 |
|------|------|
| 이미지 | `next/image` 강제 사용 — WebP 자동 변환, 크기 최적화, lazy load 기본 |
| 폰트 | `next/font` 강제 — Pretendard, Playfair Display, JetBrains Mono 모두 next/font로 로드. 외부 CDN 금지 (CLS 위험) |
| RSC 우선 | 서버 컴포넌트에서 데이터 페칭 → 클라이언트 JS 번들 최소화. 'use client' 6개 리프로 제한 |
| 코드 스플리팅 | Next.js App Router 자동 route-level splitting. 추가 dynamic import는 BlogMDX 렌더러에만 적용 |
| ISR | 블로그 포스트: `revalidate: 3600` (1시간). 정적 페이지: `revalidate: false` (빌드 시 생성) |
| MDX 컴파일 | 빌드 시 모든 포스트 사전 컴파일 → 런타임 파싱 없음 |
| 외부 스크립트 | Vercel Analytics만 허용 (자동 삽입). Google Analytics, GTM 등 추가 스크립트 금지 |

### 11.2 Lighthouse CI 설정

Phase 1 배포 직후부터 Vercel Preview에서 Lighthouse CI 자동 실행. 임계값:

```json
{
  "performance": 90,
  "accessibility": 90,
  "best-practices": 90,
  "seo": 90
}
```

임계값 미달 시 merge block 적용 (Vercel 환경 Check 활용).

---

## 12. Implementation Guide

### 12.1 Module Map

| 모듈 | Scope Key | 설명 | 예상 LOC | 세션 분할 권장 |
|------|---------|------|---------|------------|
| **M1** Setup | `M1` | Next.js 16 + Tailwind 4 + shadcn/ui + next-intl 프로젝트 초기화, 디자인 토큰, Header/Footer | ~400 | Session 2 단독 |
| **M2** Home | `M2` | Home 8 섹션 구현 (NewsletterCTA 제외), `lib/analytics.ts`, 'use client' 컴포넌트 (CounterSection, UseCaseTabs) | ~450 | Session 3 단독 |
| **M3** Features + Get Started | `M3` | Features 7개 기능 블록 + Get Started CopyButton + VaultDownload + StepGuide + FolderPreview | ~450 | Session 4 단독 |
| **M4** MDX + Blog | `M4` | MDX PoC → 라이브러리 결정 → `lib/mdx.ts` 구현, Blog 목록·상세·태그·카테고리, About, 초기 포스트 4~5편 | ~700 | Session 5~6 (2회) |
| **M5** i18n + SEO + Deploy | `M5` | next-intl 완성, `lib/seo.ts` JSON-LD·hreflang·sitemap, RSS, `messages/en.json`, beronica.ai 도메인 배포, Lighthouse 최종 검증 | ~400 | Session 7 단독 |
| (후행) | `M6-newsletter` | Stibee 통합: `lib/stibee.ts`, `app/api/subscribe/route.ts`, NewsletterForm, Home Newsletter CTA 섹션 추가, end-to-end 검증 | ~250 | 런칭 후 별도 사이클 |

**출시 범위 총 예상 LOC**: ~2,400줄 (테스트 코드 제외, M1 ~400 + M2 ~450 + M3 ~450 + M4 ~700 + M5 ~400)

### 12.2 모듈별 산출 파일

**M1 Setup**:
- `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`
- `app/globals.css` (디자인 토큰 CSS 변수)
- `middleware.ts` (next-intl 기본 설정)
- `lib/i18n.ts`, `lib/site-config.ts`
- `messages/ko.json`, `messages/en.json` (빈 구조)
- `components/layout/Header.tsx`, `Footer.tsx`, `LangSwitcher.tsx`
- `components/ui/` (shadcn 초기 컴포넌트 8종)
- `app/[locale]/layout.tsx`

**M2 Home** (뉴스레터 제외 후 LOC ~450 추정):
- `app/[locale]/page.tsx` (M1 placeholder 교체)
- `components/sections/home/` (8개 섹션 컴포넌트, NewsletterCTA 제외)
- `lib/analytics.ts` (Vercel Analytics 커스텀 이벤트 헬퍼)

> ~~`components/layout/NewsletterForm.tsx`, `app/api/subscribe/route.ts`, `lib/stibee.ts`~~ — 출시 범위 밖 (런칭 후 사이클로 이월).

**M3 Features + Get Started**:
- `app/[locale]/features/page.tsx`
- `app/[locale]/get-started/page.tsx`
- `components/sections/features/` (FeatureBlock, AnchorNav)
- `components/sections/get-started/` (CopyButton, StepGuide, FolderPreview, VaultDownload)
- `lib/features-data.ts`

**M4 MDX + Blog**:
- `lib/mdx.ts` (추상화 인터페이스 + 구현)
- `lib/reading-time.ts`
- `app/[locale]/blog/` (page, [slug]/page, category/[cat]/page, tag/[tag]/page)
- `app/[locale]/about/page.tsx`
- `components/sections/blog/` (PostCard, PostList, TagCloud, CategoryFilter, BlogMDX)
- `content/posts/ko/*.mdx` (초기 4~5편)
- `app/rss.xml/route.ts`

**M5 i18n + SEO + Deploy**:
- `messages/ko.json`, `messages/en.json` (완성)
- `lib/seo.ts` (JSON-LD, OG, hreflang, canonical, sitemap alternates)
- `app/sitemap.ts`
- `app/robots.ts`
- `content/posts/en/*.mdx` (Phase 4 영문판, 여건에 따라 후행)
- Vercel 환경 변수 설정, beronica.ai 도메인 연결

### 11.3 Session Guide

| 세션 | 모듈 | Scope 명령 | 예상 턴 |
|------|------|-----------|-------|
| Session 1 | Plan + Design | 전체 | 30~35 |
| Session 2 | M1 Setup | `/pdca do beronica-site --scope M1` | 40~50 |
| Session 3 | M2 Home | `/pdca do beronica-site --scope M2` | 50~60 |
| Session 4 | M3 Features + Get Started | `/pdca do beronica-site --scope M3` | 45~55 |
| Session 5 | M4 MDX PoC + Blog (1/2) | `/pdca do beronica-site --scope M4` | 50~60 |
| Session 6 | M4 Blog (2/2) + About | `/pdca do beronica-site --scope M4` | 40~50 |
| Session 7 | M5 i18n + SEO + Deploy | `/pdca do beronica-site --scope M5` | 45~55 |
| Session 8 | Check + Report | 전체 | 30~40 |

> **권장 시작**: M1 전 R1 검증 PoC — `npx create-next-app` + Tailwind 4 + React 19 호환성 1일 검증. 이상 없으면 M1 진행. 호환성 문제 발생 시 R1 완화책(§13) 적용.

---

## 13. Risks · Mitigation

### 13.1 R1: Next.js 16 + Tailwind 4 + React 19 호환성

| 항목 | 내용 |
|------|------|
| **위험** | 세 라이브러리 동시 신규 메이저. 알려지지 않은 peer dependency 충돌, shadcn/ui 미지원 컴포넌트 가능성 |
| **Design 차원 완화책** | `create-next-app`으로 초기 PoC 1일 진행. 다음 체크리스트 통과 여부 확인: (1) `next dev` 정상 시작 (2) Tailwind 4 `@theme` 구문 동작 (3) shadcn `button` + `card` 렌더 (4) React 19 `use` hook 에러 없음 |
| **다운그레이드 트리거** | PoC에서 24시간 내 해결 불가한 빌드 에러 발생 시 → Next.js 15 LTS + Tailwind 3 + React 18로 즉시 다운그레이드. 아키텍처 변경 없이 버전만 교체 |
| **모니터링** | GitHub Next.js / Tailwind 릴리즈 노트 주기적 확인. `package.json`에 peer dependency 버전 고정 (`exact` 버전 사용) |

### 13.2 R2: MDX 라이브러리 결정 지연

| 항목 | 내용 |
|------|------|
| **위험** | Contentlayer vs next-mdx-remote 결정이 지연되면 M4 일정 압박 |
| **Design 차원 완화책** | `lib/mdx.ts` 추상화 인터페이스 설계 완료(§7). M1 말에 두 라이브러리 각각 `getPostBySlug()` 구현 PoC (1~2일). 결과물: 렌더링 결과 동일 → `lib/mdx.impl.ts`에 선택 라이브러리 구현 주입 |
| **기본 선호** | next-mdx-remote (Next.js 16 공식 지원 명확, Contentlayer 유지보수 불명확) |
| **결정 마감** | M2 시작 전(Phase 1 말) 반드시 결정. 미결 시 next-mdx-remote로 진행 |

### 13.3 R3: 콘텐츠 5편 작성 부담

| 항목 | 내용 |
|------|------|
| **위험** | 5주 내 한국어 블로그 5편 작성 — 1인 운영 부담 |
| **Design 차원 완화책** | M4에서 MDX 파일 구조·frontmatter 스키마 확정 후 초안 아웃라인 먼저 `content/posts/ko/` 에 생성. 글쓰기와 코딩을 병렬 진행 |
| **축소 옵션** | DoD D3은 "4~5편"으로 명시됨 — 4편으로 우선 달성 후 5편은 Phase 5 운영으로 이동 가능 |
| **영문 후행** | 영어 포스트는 DoD에 포함되지 않음. Phase 4 또는 운영 단계로 명확히 후행 처리 |

### 13.4 R4: Stibee Rate Limit / 장애 — **출시 범위 밖**

> 뉴스레터(Stibee 통합)는 런칭 후 별도 PDCA 사이클로 분리됨에 따라 R4 비활성. 재도입 사이클에서 §13.4의 완화책(429 핸들링·사용자 친화 메시지·Vercel 로그 관찰·수동 재시도 UX)을 그대로 활용 가능.

### 13.5 R5: 다국어 SEO hreflang 오설정

| 항목 | 내용 |
|------|------|
| **위험** | hreflang 태그 오설정 시 Google이 한/영 페이지를 중복 콘텐츠로 판단하거나 잘못된 언어 서빙 |
| **Design 차원 완화책** | (1) `lib/seo.ts` `generateAlternates()`를 단일 함수로 중앙화 — 수동 hreflang 작성 금지 (2) `x-default`는 한국어(`/`)로 설정 (3) sitemap의 `<xhtml:link>` alternate도 동일 함수로 생성 (4) DoD D6 완료 기준에 Google Rich Results Test + Search Console hreflang 검증 포함 |
| **검증 시점** | M5 배포 직후 Google Search Console 인덱싱 요청 + Rich Results Test 통과 확인 |

---

## 14. Coding Convention

### 14.1 네이밍 규칙

| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 파일 | PascalCase.tsx | `HeroSection.tsx`, `NewsletterForm.tsx` |
| 훅 파일 | camelCase, `use` 접두어 | `useCounter.ts`, `useInView.ts` |
| lib 유틸 파일 | camelCase | `mdx.ts`, `reading-time.ts` |
| 타입/인터페이스 | PascalCase | `BlogPost`, `Feature`, `SubscribeRequest` |
| CSS 모듈 (사용 시) | kebab-case | `hero-section.module.css` |
| 메시지 키 | camelCase | `ctaPrimary`, `readingTime` |
| 환경 변수 | UPPER_SNAKE_CASE | `STIBEE_ACCESS_TOKEN` |

### 14.2 Import 순서

```typescript
// 1. React / Next.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// 2. 외부 라이브러리
import { useTranslations } from 'next-intl'
import { track } from '@vercel/analytics'

// 3. 내부 절대 경로 (@/)
import { Button } from '@/components/ui/button'
import { mdx } from '@/lib/mdx'

// 4. 상대 경로
import { formatDate } from './utils'

// 5. 타입 import
import type { BlogPost } from '@/lib/mdx'
```

### 14.3 환경 변수 정책

| 접두어 | 범위 | 예시 |
|--------|------|------|
| `NEXT_PUBLIC_` | 클라이언트 접근 가능 | `NEXT_PUBLIC_SITE_URL` |
| (없음) | 서버 only | `STIBEE_ACCESS_TOKEN`, `STIBEE_LIST_ID` |

Stibee API Key는 절대 `NEXT_PUBLIC_` 접두어 사용 금지.

---

## 15. Clean Architecture (레이어 배치)

Option C는 엄격한 레이어 분리 대신 실용적 경계를 사용:

| 레이어 | 역할 | 위치 |
|--------|------|------|
| **Presentation** | 페이지·컴포넌트 렌더링 | `app/[locale]/`, `components/` |
| **Application** | 데이터 조합·비즈니스 흐름 | `lib/mdx.ts` (`getAllPosts` 등), `app/api/subscribe/route.ts` |
| **Domain** | 타입·데이터 모델 | `lib/mdx.ts` 타입, `lib/site-config.ts`, `lib/features-data.ts` |
| **Infrastructure** | 외부 서비스 호출 | `lib/stibee.ts`, `lib/analytics.ts` |

**의존성 방향**: Presentation → Application → Infrastructure. 역방향 의존 금지.

---

## 16. Error Handling

### 16.1 에러 코드 정의

> 출시 범위에 서버 API 라우트 없음 (뉴스레터 런칭 후 사이클로 이월). 이 표는 **재도입 사이클에서 활용할 보존 자료**.

| 코드 | HTTP | 원인 | 사용자 메시지 |
|------|------|------|------------|
| `INVALID_EMAIL` | 400 | 이메일 형식 오류 | "올바른 이메일 주소를 입력해 주세요." |
| `ALREADY_SUBSCRIBED` | 409 | 이미 구독된 이메일 | "이미 구독 중이십니다." |
| `RATE_LIMIT` | 429 | Stibee 속도 제한 | "잠시 후 다시 시도해 주세요." |
| `SERVICE_ERROR` | 500 | Stibee 장애 | "잠시 후 다시 시도해 주세요." |

### 16.2 에러 응답 형식

```json
{
  "error": "ERROR_CODE",
  "message": "선택적 디버그 메시지 (서버 로그용)"
}
```

---

## Version History

| 버전 | 날짜 | 변경 | 작성자 |
|------|------|------|--------|
| 0.1 | 2026-04-29 | 초안 작성 (Option C 아키텍처 기반) | mskim@popupstudio.ai |
| 0.2 | 2026-04-29 | Primary 색상 사용 정책 명시 (본문 사용 금지, Warm Charcoal 별도) | mskim@popupstudio.ai |
| 0.3 | 2026-04-29 | 뉴스레터 서비스 MailerLite → **Stibee** 전환. `lib/stibee.ts`, `STIBEE_ACCESS_TOKEN`, `STIBEE_LIST_ID`. API 호출 코드 예시 Stibee 패턴으로 갱신 (정확한 명세는 도입 시점에 확정) | mskim@popupstudio.ai |
| 0.4 | 2026-04-29 | **뉴스레터 통합 자체 출시 범위에서 제외** (런칭 후 별도 PDCA 사이클로 이월). NewsletterForm·`/api/subscribe`·`lib/stibee.ts`·Home Newsletter CTA 섹션 모두 비활성. Module Map에 `M6-newsletter` 후행 모듈 추가. §5 API Contract·§16 에러 코드 표는 재도입 시 보존 자료. 'use client' 컴포넌트 5 → 4개로 감소 (G2 마진 확보). Home 9 → 8 섹션 | mskim@popupstudio.ai |
