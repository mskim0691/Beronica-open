// Design Ref: §8.1, §8.2, §8.3
import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = ['ko', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ko'

export function isValidLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale)
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale

  if (!locale || !isValidLocale(locale)) {
    notFound()
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
