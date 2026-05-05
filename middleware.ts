import { NextResponse, type NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { createServerClient } from '@supabase/ssr'
import { locales, defaultLocale } from '@/lib/i18n'

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
})

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Run intl middleware first for all routes
  const response = intlMiddleware(request)

  // Check if this is an admin route
  const isAdminRoute = /\/(ko|en)?\/admin/.test(pathname) || pathname === '/admin' || pathname.startsWith('/admin')
  const isLoginPage = pathname.includes('/admin/login')

  if (!isAdminRoute) {
    return response
  }

  // Create Supabase client for auth check
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (isLoginPage) {
    if (user) {
      // Already logged in, redirect to admin dashboard
      const url = request.nextUrl.clone()
      url.pathname = pathname.replace('/login', '')
      return NextResponse.redirect(url)
    }
    return response
  }

  // Not authenticated -> redirect to login
  if (!user) {
    const url = request.nextUrl.clone()
    // Find the locale prefix if any
    const localeMatch = pathname.match(/^\/(ko|en)/)
    const localePrefix = localeMatch ? localeMatch[0] : ''
    url.pathname = `${localePrefix}/admin/login`
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
