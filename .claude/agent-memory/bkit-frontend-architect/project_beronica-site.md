---
name: beronica-site 프로젝트 상태
description: beronica.ai 공식 사이트 PDCA 진행 상태 및 핵심 결정 사항
type: project
---

현재 Design 페이즈 진행 중 (2026-04-29 시작). Option C — Pragmatic Balance 아키텍처 선택 확정.

**Why:** 5페이지 + MDX 블로그 규모에서 Full Clean Architecture는 과투자. lib/ 평면 추상화로 MDX 라이브러리 교체 비용 격리.

**How to apply:** Do 페이즈 시작 시 M1부터 순차 진행. R1 검증 PoC(Next.js 16 + Tailwind 4 + React 19 호환성)를 M1 전에 1일 실시.

핵심 결정 사항:
- MDX 라이브러리: M1 말 PoC 후 결정 (기본 선호: next-mdx-remote)
- 'use client' 컴포넌트: 6개 리프로 제한 (UseCaseTabs, CounterSection, CopyButton, VaultDownload, NewsletterForm, LangSwitcher)
- 핵심 전환 액션: 자동 설치 프롬프트 원클릭 복사 (copy_prompt 이벤트)
- 다크 모드: 이번 범위 제외 확정
- Design 문서 경로: docs/02-design/features/beronica-site.design.md
