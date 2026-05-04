'use client'

import { useTranslations } from 'next-intl'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/lib/analytics'

export default function VaultDownload() {
  const t = useTranslations('getStarted')

  function handleDownload() {
    trackEvent('download_vault')
    window.location.href = '/vault-template.zip'
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <h3 className="text-base font-semibold">{t('vaultDownload')}</h3>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        {t('vaultDownloadDesc')}
      </p>
      <p className="mt-1 text-xs text-[var(--color-text-muted)]">
        {t('vaultDownloadNote')}
      </p>
      <Button
        onClick={handleDownload}
        variant="outline"
        size="default"
        className="mt-4"
      >
        <Download className="mr-2 h-4 w-4" />
        {t('vaultDownload')}
      </Button>
    </div>
  )
}
