'use client'

import { useState, useTransition } from 'react'
import { updateContent } from '@/app/[locale]/admin/(authenticated)/content/actions'

interface ContentEditorProps {
  grouped: Record<string, Record<string, { key: string; value: string; id: string }[]>>
}

export default function ContentEditor({ grouped }: ContentEditorProps) {
  const [activeLocale, setActiveLocale] = useState<string>('ko')
  const [changes, setChanges] = useState<Record<string, string>>({})
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')

  const sections = grouped[activeLocale] ?? {}

  function handleChange(id: string, value: string) {
    setChanges(prev => ({ ...prev, [id]: value }))
  }

  function handleSave() {
    const items = Object.entries(changes).map(([id, value]) => ({ id, value }))
    if (items.length === 0) return

    startTransition(async () => {
      const result = await updateContent(items)
      if (result.error) {
        setMessage(`Error: ${result.error}`)
      } else {
        setMessage('Saved successfully!')
        setChanges({})
        setTimeout(() => setMessage(''), 3000)
      }
    })
  }

  return (
    <div>
      {/* Locale tabs */}
      <div className="flex gap-2 mb-6">
        {Object.keys(grouped).map(loc => (
          <button
            key={loc}
            onClick={() => { setActiveLocale(loc); setChanges({}) }}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              activeLocale === loc
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)]/10'
            }`}
          >
            {loc.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Sections */}
      {Object.entries(sections).map(([section, items]) => (
        <div key={section} className="mb-8">
          <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-3">
            {section}
          </h3>
          <div className="space-y-3 rounded-lg border border-[var(--color-border)] bg-white p-4">
            {items.map(item => (
              <div key={item.id}>
                <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1">
                  {item.key}
                </label>
                {item.value.length > 80 ? (
                  <textarea
                    rows={3}
                    defaultValue={item.value}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    className="w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] resize-y"
                  />
                ) : (
                  <input
                    type="text"
                    defaultValue={item.value}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    className="w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(sections).length === 0 && (
        <p className="text-[var(--color-text-muted)] text-sm">
          No content entries found. Run the seed script to populate site content from messages/*.json files.
        </p>
      )}

      {/* Save button */}
      <div className="sticky bottom-4 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={Object.keys(changes).length === 0 || isPending}
          className="rounded-lg bg-[var(--color-primary)] px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {isPending ? 'Saving...' : `Save Changes (${Object.keys(changes).length})`}
        </button>
        {message && (
          <span className={`text-sm ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </span>
        )}
      </div>
    </div>
  )
}
