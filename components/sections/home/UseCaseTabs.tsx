'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

const PERSONAS = ['freelancer', 'operator', 'developer'] as const

export default function UseCaseTabs() {
  const t = useTranslations('home.useCases')
  const [active, setActive] = useState<string>(PERSONAS[0])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prefersReduced = useRef(false)

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced.current) return

    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const idx = PERSONAS.indexOf(prev as typeof PERSONAS[number])
        return PERSONAS[(idx + 1) % PERSONAS.length]
      })
    }, 8000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  function handleTabChange(value: string) {
    setActive(value)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center">{t('title')}</h2>

        <div className="mt-12">
          <Tabs value={active} onValueChange={handleTabChange}>
            <TabsList className="mx-auto flex w-fit">
              {PERSONAS.map((p) => (
                <TabsTrigger key={p} value={p}>
                  {t(p)}
                </TabsTrigger>
              ))}
            </TabsList>

            {PERSONAS.map((p) => (
              <TabsContent key={p} value={p}>
                <div className="mx-auto mt-8 max-w-2xl rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-2xl">
                    {p === 'freelancer' ? '🎨' : p === 'operator' ? '📊' : '💻'}
                  </div>
                  <p className="text-lg font-semibold text-[var(--color-text)]">
                    {t(`${p}Name`)}
                  </p>
                  <p className="mt-2 text-[var(--color-text-secondary)]">
                    &ldquo;{t(`${p}Pain`)}&rdquo;
                  </p>
                  <div className="mt-6 border-l-4 border-[var(--color-primary)] pl-4">
                    <p className="text-sm font-medium text-[var(--color-text-muted)]">
                      Beronica {t(p === 'freelancer' ? 'freelancer' : p === 'operator' ? 'operator' : 'developer')} &rarr;
                    </p>
                    <p className="mt-1 text-[var(--color-text)]">
                      &ldquo;{t(`${p}After`)}&rdquo;
                    </p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
