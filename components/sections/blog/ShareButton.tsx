'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { track } from '@vercel/analytics'

interface ShareButtonProps {
  slug: string
}

export default function ShareButton({ slug }: ShareButtonProps) {
  const t = useTranslations('blog')
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const url = window.location.href
    await navigator.clipboard.writeText(url)
    setCopied(true)
    track('share_post', { slug, method: 'copy' })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
      aria-label={t('sharePost')}
    >
      {copied ? t('linkCopied') : t('copyLink')}
    </button>
  )
}
