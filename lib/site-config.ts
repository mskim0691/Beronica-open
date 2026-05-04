// Design Ref: §4.3, §9.1
export const CONTACT = {
  email:    'beronica.aigtd@gmail.com',
  github:   'https://github.com/Master-Beronica',
  kakao:    undefined as string | undefined,    // 개설 예정
  twitter:  undefined as string | undefined,    // @beronica_ai 예정
  linkedin: undefined as string | undefined,    // Minsu Kim 프로필 예정
} as const

export const SITE_META = {
  name:           'Beronica',
  tagline:        'AI가 일하고, 당신은 성장한다.',
  url:            'https://beronica.ai',
  defaultLocale:  'ko',
  locales:        ['ko', 'en'] as const,
  author:         'Minsu Kim',
  authorEmail:    'beronica.aigtd@gmail.com',
  twitterHandle:  '@beronica_ai',
  ogImage:        '/og/default.png',
} as const

export const NAV_LINKS = [
  { key: 'home',       href: '/' },
  { key: 'features',   href: '/features' },
  { key: 'getStarted', href: '/get-started' },
  { key: 'blog',       href: '/blog' },
  { key: 'about',      href: '/about' },
] as const

export type NavLink = (typeof NAV_LINKS)[number]
