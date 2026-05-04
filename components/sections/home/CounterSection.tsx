'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

const ITEMS = [
  { key: 'months' },
  { key: 'opensource' },
  { key: 'startTime' },
  { key: 'weeklyHours' },
  { key: 'cost' },
] as const

export default function CounterSection() {
  const t = useTranslations('home.social')
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
      {ITEMS.map(({ key }) => (
        <div key={key} className="text-center">
          <p
            className={`text-3xl font-bold text-[var(--color-primary)] transition-all duration-700 md:text-4xl ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            {t(key)}
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            {t(`${key}Label`)}
          </p>
        </div>
      ))}
    </div>
  )
}
