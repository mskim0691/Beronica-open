// Design Ref: §6.3 layout
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { CONTACT, SITE_META } from '@/lib/site-config'

export default function Footer() {
  const t = useTranslations('footer')
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-[var(--color-text-secondary)]">
            {t('copyright', { year })}
          </p>

          {/* Links */}
          <nav aria-label="푸터 링크" className="flex items-center gap-4">
            {CONTACT.github && (
              <Link
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                aria-label={`${SITE_META.name} GitHub 저장소`}
              >
                {t('github')}
              </Link>
            )}
            <Link
              href="/rss.xml"
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
              aria-label="RSS 피드"
            >
              {t('rss')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
