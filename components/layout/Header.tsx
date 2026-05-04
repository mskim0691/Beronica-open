// Design Ref: §6.3 layout
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { NAV_LINKS, SITE_META } from '@/lib/site-config'
import LangSwitcher from './LangSwitcher'

export default function Header() {
  const t = useTranslations('nav')

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-bg)]/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition-opacity"
          aria-label={`${SITE_META.name} 홈으로 이동`}
        >
          <img src="/logo.svg" alt={SITE_META.name} className="h-8 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="주요 네비게이션" className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] rounded-md hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        {/* Right slot: LangSwitcher */}
        <div className="flex items-center gap-2">
          <LangSwitcher />
        </div>
      </div>
    </header>
  )
}
