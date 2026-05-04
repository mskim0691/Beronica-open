import { useTranslations } from 'next-intl'
import { Check, X } from 'lucide-react'

const COMPETITORS = [
  { name: 'ChatGPT\nMemory' },
  { name: 'Notion\nAI' },
  { name: 'Todoist' },
  { name: 'Saner\n.AI' },
  { name: 'Beronica', highlight: true },
] as const

type CellValue = boolean | string | null

const ROWS: { key: string; values: CellValue[] }[] = [
  { key: 'sessionMemory', values: ['simple', false, false, true, 'deep'] },
  { key: 'gtdAuto', values: [false, false, 'basic', false, 'full'] },
  { key: 'paraAuto', values: [false, 'manual', false, false, 'autoClassify'] },
  { key: 'dailyWeekly', values: [false, false, false, false, 'autoRun'] },
  { key: 'contactMgmt', values: [false, false, false, false, 'autoAccum'] },
  { key: 'localData', values: [false, false, false, false, true] },
]

export default function ComparisonTable() {
  const t = useTranslations('home.comparison')

  return (
    <section className="bg-[var(--color-surface)] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center">{t('title')}</h2>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-left text-sm font-medium text-[var(--color-text-secondary)]" />
                {COMPETITORS.map((c) => (
                  <th
                    key={c.name}
                    className={`p-3 text-center text-sm font-semibold whitespace-pre-line ${
                      'highlight' in c && c.highlight
                        ? 'rounded-t-lg bg-[var(--color-primary)] text-white'
                        : 'text-[var(--color-text)]'
                    }`}
                  >
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(({ key, values }, rowIdx) => (
                <tr key={key} className={rowIdx % 2 === 0 ? 'bg-[var(--color-bg)]' : ''}>
                  <td className="p-3 text-sm font-medium text-[var(--color-text)]">
                    {t(key)}
                  </td>
                  {values.map((val, colIdx) => {
                    const isLast = colIdx === values.length - 1
                    return (
                      <td
                        key={colIdx}
                        className={`p-3 text-center ${
                          isLast ? 'bg-[var(--color-primary)]/5 font-medium text-[var(--color-text)]' : ''
                        }`}
                      >
                        <CellContent value={val} t={t} highlight={isLast} />
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function CellContent({
  value,
  t,
  highlight,
}: {
  value: CellValue
  t: (key: string) => string
  highlight: boolean
}) {
  if (value === true) {
    return <Check className={`mx-auto h-5 w-5 ${highlight ? 'text-[var(--color-primary)]' : 'text-[var(--color-success)]'}`} />
  }
  if (value === false || value === null) {
    return <X className="mx-auto h-5 w-5 text-[var(--color-text-muted)]" />
  }
  return (
    <span className={highlight ? 'text-[var(--color-primary)] font-semibold' : 'text-[var(--color-text-secondary)]'}>
      {t(value)}
    </span>
  )
}
