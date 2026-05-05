'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface AdminSidebarProps {
  locale: string
}

export default function AdminSidebar({ locale }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const prefix = locale === 'ko' ? '' : `/${locale}`

  const links = [
    { href: `${prefix}/admin`, label: 'Dashboard', icon: '📊' },
    { href: `${prefix}/admin/posts`, label: 'Posts', icon: '📝' },
    { href: `${prefix}/admin/content`, label: 'Content', icon: '🔤' },
  ]

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push(`${prefix}/admin/login`)
    router.refresh()
  }

  return (
    <aside className="w-56 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)] p-4 flex flex-col">
      <div className="mb-6">
        <Link href={`${prefix}/`} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
          ← Back to site
        </Link>
        <h2 className="mt-2 text-lg font-bold text-[var(--color-text)]">Admin</h2>
      </div>
      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== `${prefix}/admin` && pathname.startsWith(link.href))
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)]/5'
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          )
        })}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto text-left text-sm text-[var(--color-text-muted)] hover:text-red-600 transition-colors px-3 py-2"
      >
        Sign Out
      </button>
    </aside>
  )
}
