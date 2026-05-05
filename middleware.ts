// Design Ref: §8.1, §8.2
// next-intl 미들웨어 — Accept-Language 기반 자동 언어 감지
// ko는 prefix 없음(/), en은 /en/... (localePrefix: 'as-needed')
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from '@/lib/i18n'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',  // ko → /, en → /en/...
  localeDetection: false,
})

export const config = {
  // API, _next 정적 파일, 확장자 있는 파일 제외
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
