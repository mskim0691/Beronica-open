# Plan: Beronica 공식 사이트 (beronica.ai)

## 1. Feature Metadata

| 항목 | 값 |
|---|---|
| Feature ID | `beronica-site` |
| 프로젝트 레벨 | Dynamic (BaaS 풀스택, Next.js + MDX + 외부 API) |
| 작성일 | 2026-04-29 |
| 작성자 | mskim@popupstudio.ai |
| 원본 기획서 | `beronica-site-plan.md` (1,359줄, 매우 상세한 PRD) |
| 단일 Plan 단위 | 사이트 전체 — 4-Phase 로드맵 내부 포함 |
| 현재 PDCA 단계 | Plan (Phase 1) |
| 다음 PDCA 단계 | Design |

> 본 Plan은 이미 PRD 수준으로 완성된 원본 기획서를 **PDCA 의사결정에 필요한 메타 정보 중심으로 재구성**한 문서입니다. 세부 디자인/기술 명세는 원본 기획서를 참조합니다.

---

## 2. Problem Statement

베로니카(AI-native 업무·지식 운영 시스템)는 제품 자체는 GitHub의 Vault Template / Obsidian 기반 자료로 배포되지만, 다음 채널이 부재한 상태입니다:

1. **공식 랜딩 부재** — "베로니카가 무엇인가, 왜 필요한가, 누구를 위한 것인가"를 한 페이지로 설득할 진입점 없음.
2. **콘텐츠 허브 부재** — GTD/PARA/AI Memory 관련 SEO 콘텐츠를 축적할 블로그 시스템 없음. 검색 유입 0.
3. **뉴스레터·리드 수집 채널 부재** — 잠재 사용자를 지속 관계로 전환할 이메일 리스트가 없음.
4. **다운로드 추적 불가** — Vault Template, 자동 설치 프롬프트 다운로드 동향을 측정·개선할 수 없음.
5. **국제화 부재** — 한/영 페어 콘텐츠 운영 기반 부재.

**Why now**: 베로니카 앱 퍼블릭 베타가 2026 H2에 예정되어 있어, 그 전에 SEO 자산과 뉴스레터 리스트를 축적할 기간이 필요함.

---

## 3. Goal & Success Criteria

### 3.1 Goal

베로니카의 가치 제안("AI가 일하고, 당신은 성장한다")을 전달하고, **검색 유입 → 다운로드 → 뉴스레터 구독**의 전환 깔때기를 가진 공식 웹 허브를 구축한다.

### 3.2 Success Criteria (KPI)

| # | 지표 | 측정 시점 | 목표값 |
|---|---|---|---|
| K1 | Lighthouse Performance / SEO / Accessibility | 배포 직후 | 90+ (3개 모두) — 출시 품질 게이트 |
| K2 | 월간 순방문자 (Vercel Analytics) | 출시 후 1·3개월 | **Baseline 측정 모드** — 1개월차 데이터로 목표 재설정 |
| ~~K3~~ | ~~뉴스레터 구독자 수~~ | — | 제거됨: 뉴스레터는 런칭 후 별도 사이클 (§13.3) |
| K4 | 자동 설치 프롬프트 복사 수(`copy_prompt`) + 보조 Vault zip 다운로드 수(`download_vault`) | 출시 후 1·3개월 | **Baseline 측정 모드** — 동일 |
| K5 | 블로그 인덱싱 페이지 수 (Search Console) | 출시 후 1개월 | 발행 글 90% 이상 인덱싱 |
| K6 | Core Web Vitals (LCP/INP/CLS) "Good" 비율 | 상시 | 75%+ |

**Baseline 모드 결정 근거 (2026-04-29 확정)**:
- 별도 운영 SNS 채널 없음, GitHub 저장소 초기 단계 → 비교 데이터 부재
- 신규 도메인 SEO 인덱싱·바이럴 동력은 변동성이 매우 큼 → 사전 절대값은 추측
- 출시 품질 게이트(K1, K5, K6)는 절대값 유지 → Plan 단계 완료 판정 가능
- K2~K4 첫 리뷰 시점: **Phase 2 종료 직후(2~3주차)** 첫 데이터 + **출시 후 1개월차**에 PDCA Check 페이즈에서 정식 목표 설정

### 3.3 Plan 단위 DoD (Definition of Done)

다음 7가지 모두 충족해야 Plan이 완료된 것으로 판정 (Phase 4 종료 시 점검):

| # | 항목 | 판정 기준 |
|---|---|---|
| D1 | 5페이지 한·영 렌더링 | Home / Features / Get Started / Blog / About — 한국어(`/`)·영어(`/en`) 양쪽 정상 렌더 + 404 없음 |
| D2 | 품질 게이트 | 모든 페이지 Lighthouse 90+ (Performance / SEO / Accessibility 3개 모두) + Core Web Vitals "Good" 비율 75%+ |
| D3 | 콘텐츠 | 한국어 블로그 4~5편 발행 + Search Console에서 90% 이상 인덱싱 확인 |
| D4 | 추적 동작 | Vercel Analytics 커스텀 이벤트 `copy_prompt`·`download_vault` 발생 확인 (대시보드 조회) |
| D5 | 인프라 | beronica.ai 도메인 연결 + HTTPS + sitemap.xml(한·영 분리)·robots.txt·hreflang Google Rich Results Test 통과 |
| D6 | 부속 산출물 | RSS 피드 발행, JSON-LD (Organization / Article / FAQ) 검증 |

> 이전 D4(뉴스레터 통합)는 제거. 뉴스레터(Stibee 통합)는 런칭 후 별도 PDCA 사이클 (§13.3 결정).

---

## 4. Target Users / Personas

원본 기획서 §2 페르소나 3종 요약:

| # | 페르소나 | 핵심 페인 | 사이트 방문 경로 (가설) |
|---|---|---|---|
| P1 | 박지현 (34, UX 디자이너 / 1인 기업가) | 업무 도구 산재, GTD 운영 부담 | 검색 "GTD 자동화", "AI 비서 Obsidian" |
| P2 | 김태호 (38, 스타트업 COO) | 다영역 업무 관리, AI 컨텍스트 손실 | SNS·뉴스레터 추천, 비교 검색 |
| P3 | 이서준 (29, 개발자 / Obsidian 파워유저) | PARA 수동 분류 피로 | GitHub trending, 한글 IT 블로그 |

**우선순위**: P3 → P1 → P2 (얼리 어답터인 개발자/파워유저가 초기 트래픽·피드백·바이럴 동력)

**Plan 차원 적용 가이드**: Phase 1~2 페이지 카피·블로그 톤은 **P3(개발자/파워유저)** 친화로 우선 작성. P1·P2를 위한 톤 분기·세그먼트별 랜딩 등은 Design 페이즈에서 정의.

---

## 5. Scope

### 5.1 In Scope (이번 Plan 범위)

- 5개 메인 페이지: Home, Features, **Get Started**, Blog, About
- MDX 기반 블로그 시스템 (Contentlayer 또는 next-mdx-remote)
- 한/영 i18n (next-intl)
- Vercel Analytics 통합
- SEO 기본 (sitemap.xml, robots.txt, JSON-LD, hreflang)
- shadcn/ui + Tailwind 4 기반 디자인 시스템
- 초기 블로그 한국어 4~5편 발행 (Phase 3, 영문판은 후행 운영 단계)
- Vercel Pro 배포 + CI/CD

### 5.2 Out of Scope (이번 Plan 제외)

- 회원가입·로그인·인증 (랜딩+블로그 사이트라 불필요)
- 자체 결제·구독 시스템
- 베로니카 앱 자체 (별도 GitHub 저장소·빌드 파이프라인)
- 댓글·커뮤니티 시스템 (블로그는 read-only)
- CMS 백오피스 (블로그는 마크다운 파일 기반 git workflow)
- 다크 모드 UI (이번 범위 제외 확정 — §13.3)
- 에러 모니터링 SDK (Sentry 등 미도입 확정 — §13.3)
- 뉴스레터 통합 (Stibee 구독 폼·`/api/subscribe`·환영 자동화) — **런칭 후 별도 PDCA 사이클** (§13.3 결정)
- Home의 "Newsletter CTA" 섹션 — 출시 시점 Home은 8섹션 (Hero → Problem → Solution → Features Overview → Comparison → Use Cases → Social Proof → Footer)
- 모바일 네이티브 앱

### 5.3 Non-Goals (의도적으로 하지 않을 것)

- 기능 목록을 무리하게 늘리지 않음 — 7개 핵심 기능 + 5페이지 구조 고정
- 과도한 애니메이션 회피 (Reduced motion 기본 존중)
- 추적·트래킹 SDK 추가 안 함 (Vercel Analytics만)

---

## 6. Feature List

### 6.1 7개 핵심 기능 (Features 페이지 노출)

원본 기획서 §3에서 정의된 베로니카 제품의 핵심 기능을 사이트가 **소개·설명**한다 (구현이 아니라 기술):

1. AI Memory — 세션 간 컨텍스트 유지
2. GTD Inbox — 자동 분류
3. Daily Review — TOP3 제안
4. PARA Structure — 자동 분류
5. Weekly Review — 자동 실행
6. Contact Management — 인맥 자동 관리
7. Local Privacy — 완전한 데이터 소유권

각 기능은 **좌우 교대 레이아웃 (icon + 설명 + demo)** 으로 표시.

### 6.2 사이트 자체 기능 (개발 대상)

| # | 기능 | 우선순위 | Phase |
|---|---|---|---|
| F1 | Home 랜딩 (Hero + 9 섹션) | P0 | 1 |
| F2 | Features 페이지 (7개 기능 상세) | P0 | 2 |
| F3 | Get Started 페이지 (자동 설치 프롬프트 복사 중심 + 사용 가이드 + 결과 데모, Vault zip은 보조) | P0 | 2 |
| F4 | MDX Blog 시스템 (목록·상세·태그·시리즈) | P0 | 3 |
| F5 | About 페이지 (팀·스토리·연락처) | P1 | 3 |
| F6 | i18n (한/영 라우팅·메시지·hreflang) | P0 | 4 |
| F7 | SEO 메타·sitemap·JSON-LD | P0 | 4 |
| ~~F8~~ | ~~Stibee 구독 폼 + 자동화~~ | — | **런칭 후 별도 사이클** (§13.3) |
| F9 | RSS 피드 | P1 | 4 |

> 다크 모드는 §5.2 Out of Scope (이번 범위 제외 확정).

---

## 7. Sitemap / Page Structure

```
/                       Home (랜딩 8 섹션, Newsletter CTA 제외)
/features               Features (7개 기능 상세)
/get-started            Get Started (자동 설치 프롬프트 복사 + 사용 가이드 + 결과 데모, Vault zip 보조)
/blog                   Blog 목록
/blog/[slug]            Blog 상세
/blog/category/[cat]    카테고리 필터
/blog/tag/[tag]         태그 필터
/about                  About
/en/...                 영문 동일 구조 (next-intl)
/sitemap.xml
/robots.txt
/rss.xml
```

**Home 8 섹션** (Newsletter CTA 제외, 런칭 후 사이클에서 재추가): Hero → Problem → Solution → Features Overview → Comparison → Use Cases → Social Proof → Footer

---

## 8. Tech Stack & Constraints

| 영역 | 선택 | 비고 |
|---|---|---|
| Framework | Next.js 16 (App Router) | RSC 우선 |
| Language | TypeScript (strict) | — |
| Runtime UI | React 19 | — |
| Styling | Tailwind CSS 4 | OKLCH 컬러 |
| 컴포넌트 | shadcn/ui + Lucide React | — |
| 콘텐츠 | MDX 3 + (Contentlayer or next-mdx-remote) | **Phase 1 말 PoC로 결정** (§13.3) |
| 코드 하이라이트 | Shiki | — |
| i18n | next-intl | — |
| 폰트 | Playfair Display / Pretendard / JetBrains Mono | next/font |
| 분석 | Vercel Analytics | — |
| 호스팅 | Vercel Pro | Edge + ISR |
| CI/CD | Vercel GitHub 연동 | preview deployment 자동 |

**제약**:
- Lighthouse 90+ (모든 카테고리)
- next/image, next/font 강제
- 외부 폰트 CDN 금지 (CLS 위험)
- 클라이언트 컴포넌트 최소화 (Hero 카운터·뉴스레터 폼만 'use client')

---

## 9. Data Model Summary

블로그·기능 표시용 정적/MDX 데이터 모델만 존재 (DB 없음):

```ts
type BlogPost = {
  slug: string;
  title: string;
  date: ISO8601;
  category: 'GTD' | 'PARA' | 'AI Memory' | 'Build Log' | 'Tutorial';
  tags: string[];
  description: string;
  image?: string;
  series?: { name: string; order: number };
  locale: 'ko' | 'en';
  readingTime: number;
  featured: boolean;
};

type Feature = {
  id: string;
  icon: LucideIcon;
  title: { ko: string; en: string };
  description: { ko: string; en: string };
  demoSection?: ReactNode; // 좌/우 교대
};

type Contact = {
  email: string;
  github: string;
  kakao?: string;
  twitter?: string;
  linkedin?: string;
};
```

영속 저장소 없음. 블로그 글은 `content/posts/{ko|en}/*.mdx` 파일 시스템 기반.

---

## 10. External Integrations

| 서비스 | 용도 | 인증 | 실패 시 동작 |
|---|---|---|---|
| GitHub | Vault Template Star 수, Release 링크 | Public API | 캐시된 마지막 값 표시 |
| Vercel Analytics | 페이지뷰·CWV·**커스텀 이벤트**(`copy_prompt`, `download_vault`, 향후 추가) | 자동 | Silent fail |
| Vercel Edge | 배포·ISR | — | — |

에러 모니터링 SDK 미도입 — Vercel 서버 로그로만 관찰 (§13.3 참조).

---

## 11. Non-Functional Requirements

| 영역 | 요구사항 |
|---|---|
| 성능 | LCP < 2.5s, INP < 200ms, CLS < 0.1, Lighthouse 90+ |
| SEO | sitemap.xml (한/영 분리), robots.txt, hreflang, Open Graph, Twitter Card, JSON-LD (Organization / Article / FAQ) |
| 접근성 | ARIA 라벨, 키보드 네비게이션, 색상 대비 WCAG AA, prefers-reduced-motion 존중 |
| i18n | 자동 언어 감지 (Accept-Language), URL 기반 분기 (`/`, `/en`), 양쪽 언어 sitemap |
| 보안 | HTTPS only, CSP 헤더, 외부 스크립트 최소화, 모든 시크릿(향후 추가 분 포함) 서버 라우트 경유 — `NEXT_PUBLIC_` 접두어 사용 금지 |
| 모바일 | 모바일 우선 디자인, 320px~ 지원 |
| 브라우저 | 최신 Chrome/Safari/Firefox/Edge 2버전 |

---

## 12. Phase Roadmap (4 Weeks)

### Phase 1 — Setup + Home (Week 1~2)

**산출물**: 프로젝트 셋업 완료 + Home 페이지 9 섹션 + Vercel 첫 배포

**완료 기준**:
- `next dev` 정상 동작, TypeScript strict 통과
- Home 페이지 모바일/데스크톱 반응형
- Lighthouse 90+ (Home 단일 페이지 기준)
- Vercel preview URL 발급
- shadcn/ui 초기 컴포넌트 8종 설치

**위험**: Tailwind 4 + Next.js 16 호환성 (둘 다 비교적 신규 메이저)

### Phase 2 — Features + Get Started (Week 3)

**산출물**: Features 페이지 (7개 기능 좌우 교대), Get Started 페이지 (자동 설치 프롬프트 복사 중심)

**완료 기준**:
- 7개 기능 카피·아이콘·데모 모두 채워짐
- Get Started 페이지: ① 자동 설치 프롬프트 텍스트 노출 + 원클릭 복사 버튼, ② 사용 가이드(어떤 AI에 붙여넣어 어떻게 실행하는지), ③ 실행 결과 데모(생성되는 폴더 구조 시각화), ④ Vault zip 보조 다운로드 링크
- 자동 설치 프롬프트 복사 버튼 → Vercel Analytics 커스텀 이벤트(`copy_prompt`) 전송 동작 확인 (보조 Vault zip 클릭은 `download_vault` 이벤트로 동일 처리)
- Lighthouse 90+ 유지

### Phase 3 — Blog System + About (Week 4 전반)

**산출물**: MDX 기반 블로그 (목록/상세/태그/시리즈), About 페이지, 초기 5편 포스트

**완료 기준**:
- MDX 렌더링 (Shiki 코드 하이라이트 포함)
- 카테고리·태그·시리즈 필터 동작
- 5편 한국어 포스트 발행 (영문은 Phase 4 또는 점진)
- About 팀 정보·연락처 노출
- 블로그 페이지 Lighthouse 90+

**전제**: Phase 1 말 PoC로 Contentlayer vs next-mdx-remote 결정 완료된 상태에서 시작 (§13.3).

### Phase 4 — i18n + SEO + 최종 배포 (Week 4 후반~Week 5)

**산출물**: 한/영 i18n 완성, sitemap·JSON-LD·RSS, 프로덕션 배포

**완료 기준**:
- `/` 한국어 / `/en` 영어 모두 5페이지 렌더링
- hreflang, sitemap.xml(한·영 분리), robots.txt 검증
- JSON-LD 검증 (Google Rich Results Test)
- Vercel 프로덕션 배포 + 도메인 연결 (beronica.ai)
- 전체 Lighthouse 90+ 재검증

### Phase 5 — 운영 (Plan 외, 참고)

- 블로그 월 4편 이상
- 뉴스레터 월 1회
- 앱 퍼블릭 베타 연계 캠페인 (2026 H2)

---

## 13. Risks & Open Questions

### 13.1 Risks

| # | 리스크 | 영향 | 완화책 |
|---|---|---|---|
| R1 | Next.js 16 + Tailwind 4 + React 19 동시 신규 메이저 | 빌드 호환성 이슈, 디버깅 시간 증가 | Phase 1 초반 PoC, 문제 시 Next.js 15 LTS로 다운그레이드 |
| R2 | MDX 라이브러리 선택 지연 | Phase 3 일정 압박 | Phase 1 말~Phase 2 초에 PoC로 결정 |
| R3 | 5주 일정 내 콘텐츠(블로그 5편) 작성 부담 | Phase 3 슬립 | 작가 1인 부족 시 4편으로 축소, 영문은 후행 |
| ~~R4~~ | ~~Stibee API Rate Limit / 장애~~ | — | 출시 범위 밖 (런칭 후 사이클로 이월) |
| R5 | 다국어 SEO hreflang 오설정 | 검색 노출 분산 | Search Console 인덱싱 검증 Phase 4 완료 기준에 포함 |

### 13.2 Open Questions (사용자 검토 필요)

| # | 질문 | 영향 |
|---|---|---|
| OQ1 | 블로그 작성자 추가 시 권한·프로세스 (PR 기반? 직접 push?) | Phase 3 운영 |
| OQ2 | 베로니카 앱 베타 사이트 연동 시점 (2026 H2 정확한 분기) | Phase 5 운영 계획 |

### 13.3 Resolved Decisions (의사결정 로그)

| 일자 | 항목 | 결정 | 근거 |
|---|---|---|---|
| 2026-04-29 | KPI 절대값 (K2/K3/K4) | **Baseline 측정 모드** — 절대값 미설정, 1·3개월차 데이터 기반 재설정 | 별도 SNS 채널 없음, GitHub 초기 단계, 비교 데이터 부재 |
| 2026-04-29 | "Download" 페이지 정체성 | **`/get-started` 페이지로 재정의** — 자동 설치 프롬프트 복사가 메인 액션, Vault zip은 보조 다운로드 | Vault zip은 단순 폴더 구조 zip에 불과, 실제 가치는 자동 설치 프롬프트 실행으로 폴더가 자동 생성되는 것. K4는 "복사 수(`copy_prompt`) + 보조 zip 다운로드 수(`download_vault`)"로 재정의 (§3.2) |
| 2026-04-29 | 핵심 용어 통일 | 원본 기획서의 "Auto Setup Prompt" → **"자동 설치 프롬프트"** (한글)로 통일. Plan·Design·Do 전 산출물에 적용 | 영어 약칭("Setup Prompt")이 사용자에게 직관적이지 않음. 한글 명칭이 페이지 카피·블로그·뉴스레터 모든 채널에서 일관성 유지 |
| 2026-04-29 | 자동 설치 프롬프트 복사 추적 방식 | **Vercel Analytics 커스텀 이벤트** (`copy_prompt`, 보조 Vault zip은 `download_vault`) | 이미 Vercel Analytics 도입 결정됨 → 추가 비용·구축 0. cookieless라 "Local Privacy" 메시지와 정합. 정밀도 부족 시 PDCA 다음 사이클에서 서버 라우트로 업그레이드 가능 |
| 2026-04-29 | 다크 모드 | **이번 범위 제외 확정** | 디자인 토큰 미정·범위 압박. 향후 PDCA 사이클에서 별도 feature로 처리 |
| 2026-04-29 | 에러 모니터링 (Sentry 등) | **미도입 확정** — Vercel 서버 로그만 활용 | 사이트 규모·트래픽 초기 단계라 풀 모니터링은 과투자. 외부 API 실패는 Vercel 로그로 관찰 충분 |
| 2026-04-29 | MDX 라이브러리 결정 시점 | **Phase 1 말~Phase 2 초에 PoC로 결정** (Contentlayer vs next-mdx-remote, 1~2일 분량) | 결과물은 거의 동일, 개발 경험 차이가 본질. 지금 추측 결정은 Phase 3에서 후회 가능. PoC 후 결정이 합리적 |
| 2026-04-29 (Design) | Primary 색상 사용 정책 | **Primary `#8B7EC8`(Warm Lavender)은 헤딩(18pt+)·CTA·아이콘·강조 박스 한정. 본문은 `#2C2C34`(Warm Charcoal) 별도 토큰** | `#8B7EC8` on white 대비 약 3.5:1로 AA 일반 텍스트 4.5:1 미달, AA Large Text 3:1 통과. shadcn/ui 표준 패턴(Primary 강조용·Foreground 별도) 채택. 브랜드 색상 코드는 그대로 보존 |
| 2026-04-29 (Do M1) | 뉴스레터 서비스 변경 | **MailerLite → Stibee** (한국 서비스). API Key는 `STIBEE_ACCESS_TOKEN`, 주소록은 `STIBEE_LIST_ID`. lib 파일 `mailerlite.ts` → `stibee.ts` | 사용자가 기존부터 Stibee 사용 중. 한국어 뉴스레터 운영·발송에 더 친화적. 정확한 API 명세(endpoint·헤더·body 스키마)는 도입 시점에 사용자 확인 후 확정 |
| 2026-04-29 (Do M1) | **뉴스레터 통합 자체 출시 범위에서 제외** | NewsletterForm·`/api/subscribe`·`lib/stibee.ts`·환영 자동화·Home Newsletter CTA 섹션 모두 제거. **런칭 후 별도 PDCA 사이클**에서 도입 | Stibee API 명세 확정 지연으로 출시 차단 위험. 출시 자체는 SEO·콘텐츠 자산 축적이 핵심 목적이라 뉴스레터 없어도 가치 보존. Home은 9 → 8 섹션 (Newsletter CTA 제거). KPI K3·DoD D4·Risk R4·Feature F8 모두 비활성. lib/stibee.ts 변수명·placeholder 코드는 §13.3 직전 결정에서 정의된 상태로 보존 (재도입 시 그대로 활용) |

---

## 14. Decisions Required Before Design Phase

다음 의사결정을 사용자가 확인하면 Design 페이즈로 진입합니다:

- [x] ~~**KPI 목표값 확정**~~ — Baseline 모드로 결정 (§13.3)
- [x] ~~**"Download" 페이지 정체성**~~ — `/get-started` 재정의 (자동 설치 프롬프트 복사 메인) (§13.3)
- [x] ~~**핵심 용어 통일**~~ — "자동 설치 프롬프트" (한글) (§13.3)
- [x] ~~**자동 설치 프롬프트 복사 추적 방식**~~ — Vercel Analytics 커스텀 이벤트로 결정 (§13.3)
- [x] ~~**다크 모드 처리**~~ — 이번 범위 제외 확정 (§13.3)
- [x] ~~**에러 모니터링 도입 여부**~~ — 미도입 확정 (§13.3)
- [x] ~~**MDX 라이브러리 결정 시점 합의**~~ — Phase 1 말~Phase 2 초 PoC로 결정 (§13.3)

**모든 의사결정 완료 (2026-04-29). Design 페이즈 진입 가능.**

---

## 15. Next PDCA Step

**Plan 승인 후 → Design 페이즈** (`/pdca design beronica-site` 또는 phase-1-schema 진입)

Design에서 다룰 항목 (예상):
- 데이터 모델·MDX frontmatter 스키마 (phase-1-schema)
- 코딩 컨벤션·디렉토리 구조 (phase-2-convention)
- UI 목업·컴포넌트 트리 (phase-3-mockup)
- 디자인 토큰·shadcn 테마 (phase-5-design-system)
- API 라우트 설계 (Stibee 구독, GitHub Star fetcher) (phase-4-api)

---

## Appendix A — 원본 기획서 매핑

이 Plan은 원본 [beronica-site-plan.md](../../beronica-site-plan.md)의 다음 섹션을 압축·재구성한 것입니다:

| Plan 섹션 | 원본 섹션 |
|---|---|
| §2 Problem | §1 프로젝트 개요, §1.2 비즈니스 목표 |
| §3 Goal/KPI | §1.3 KPI |
| §4 Personas | §2 타겟 페르소나 |
| §6 Features | §3 핵심 기능, §4 페이지 구성 |
| §7 Sitemap | §4 페이지 구성 |
| §8 Tech Stack | §5 기술 스택 |
| §9 Data Model | §6 데이터 모델 |
| §10 Integrations | §7 외부 연동 |
| §11 NFR | §1.4 비기능 요구사항, §9 SEO·접근성 |
| §12 Roadmap | §8 구현 로드맵 |

세부 디자인 토큰·컴포넌트 패턴·페이지별 레이아웃 목업 등은 원본 기획서를 직접 참조하세요. Design 페이즈에서 해당 내용을 표준 산출물로 변환합니다.
