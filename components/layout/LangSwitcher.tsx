'use client'
// Design Ref: §6.3 layout, §8 i18n
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function LangSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  // /en/... 형식인지 판단
  const isEn = pathname.startsWith('/en')

  function switchLocale() {
    if (isEn) {
      // /en → / (또는 /en/blog/slug → /blog/slug)
      const newPath = pathname.replace(/^\/en/, '') || '/'
      router.push(newPath)
    } else {
      // / → /en (또는 /blog/slug → /en/blog/slug)
      const newPath = '/en' + (pathname === '/' ? '' : pathname)
      router.push(newPath)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={switchLocale}
      aria-label={isEn ? '한국어로 전환' : 'Switch to English'}
      className="min-w-[52px] text-xs font-medium"
    >
      {isEn ? 'KO' : 'EN'}
    </Button>
  )
}
