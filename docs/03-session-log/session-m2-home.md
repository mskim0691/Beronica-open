# Session Log: M2 Home Page Implementation

> **Date**: 2026-04-29
> **Module**: M2 Home
> **Status**: Complete
> **Author**: mskim@popupstudio.ai

---

## Summary

M1 placeholder를 교체하여 Home 페이지 8섹션 중 7섹션(NewsletterCTA 제외)을 구현 완료.

## Created / Modified Files

| File | Action | Description |
|------|--------|-------------|
| `lib/analytics.ts` | Created | Vercel Analytics 커스텀 이벤트 헬퍼 (`trackEvent`) |
| `messages/ko.json` | Modified | Home 8섹션 한국어 i18n 키 추가 (hero, problem, solution, features, comparison, useCases, social) |
| `messages/en.json` | Modified | Home 8섹션 영어 i18n 키 추가 |
| `components/sections/home/HeroSection.tsx` | Created | RSC — 태그라인 + subtitle + 2 CTA(Primary/Outline) + 스크린샷 placeholder |
| `components/sections/home/ProblemSection.tsx` | Created | RSC — 인용문 + 5개 고통점 카드(Lucide 아이콘) + 통계 인용 + insight 강조 |
| `components/sections/home/SolutionSection.tsx` | Created | RSC — Before/After 비교 카드 + 채팅 데모 목업(ChatBubble) + killer copy |
| `components/sections/home/FeaturesOverview.tsx` | Created | RSC — 7개 기능 카드 그리드(3+4) + hover 애니메이션 + CTA 링크 |
| `components/sections/home/ComparisonTable.tsx` | Created | RSC — 6행x6열 경쟁사 비교 테이블, Beronica 열 강조, Check/X 아이콘 |
| `components/sections/home/UseCaseTabs.tsx` | Created | **Client** — Radix Tabs 3개 페르소나, 8초 자동 전환, prefers-reduced-motion 존중 |
| `components/sections/home/CounterSection.tsx` | Created | **Client** — 5개 숫자 fade-in 애니메이션, IntersectionObserver, reduced-motion 존중 |
| `components/sections/home/SocialProof.tsx` | Created | RSC — CounterSection 래퍼 (Surface 배경) |
| `app/[locale]/page.tsx` | Replaced | M1 placeholder → 7섹션 import 조립 |

**Total**: 12 files (10 new, 2 modified)

## Design Compliance

| Criteria | Status |
|----------|--------|
| 'use client' 5개 이하 (G2) | **Pass** — 2개 (UseCaseTabs, CounterSection) |
| RSC 우선 | **Pass** — 5/7 섹션이 Server Component |
| i18n 하드코딩 없음 | **Pass** — 모든 텍스트 `useTranslations` 처리 |
| 디자인 토큰 CSS 변수만 사용 | **Pass** — hex 직접 사용 없음 |
| A11y prefers-reduced-motion | **Pass** — CounterSection, UseCaseTabs 모두 적용 |
| `next build` 성공 | **Pass** — 타입/린트 에러 없음 |

## Build Output

```
Route (app)                    Size    First Load JS
└ ƒ /[locale]                7.92 kB   133 kB
```

## Issues & Resolutions

| Issue | Cause | Resolution |
|-------|-------|------------|
| 초기 무한 로딩 | dev 서버 프로세스 충돌 (포트 점유) | `kill-port 3000` 후 재시작으로 해결. 컴포넌트 단계별 추가 테스트로 모든 섹션 정상 확인 |

## Next Steps (M3)

- [ ] `app/[locale]/features/page.tsx` — 7개 기능 상세 (FeatureBlock 좌우 교대 레이아웃)
- [ ] `app/[locale]/get-started/page.tsx` — CopyButton + VaultDownload + StepGuide + FolderPreview
- [ ] `components/sections/features/` — FeatureBlock, AnchorNav
- [ ] `components/sections/get-started/` — CopyButton('use client'), StepGuide, FolderPreview, VaultDownload('use client')
- [ ] `lib/features-data.ts` — 7개 기능 정적 데이터
