// Design Ref: §2.1, §8.1, §11.1
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts')

const nextConfig: NextConfig = {
  // Strict mode for React 19
  reactStrictMode: true,
  // Images: next/image only (Design §11.1)
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default withNextIntl(nextConfig)
