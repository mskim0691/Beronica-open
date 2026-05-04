'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/lib/navigation'
import { Button } from '@/components/ui/button'

export default function LangSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale() {
    const newLocale = locale === 'ko' ? 'en' : 'ko'
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={switchLocale}
      aria-label={locale === 'en' ? '한국어로 전환' : 'Switch to English'}
      className="min-w-[52px] text-xs font-medium"
    >
      {locale === 'en' ? 'KO' : 'EN'}
    </Button>
  )
}
