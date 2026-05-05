import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'

interface AuthLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function AuthenticatedAdminLayout({ children, params }: AuthLayoutProps) {
  const { locale } = await params
  const prefix = locale === 'ko' ? '' : `/${locale}`

  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(`${prefix}/admin/login`)
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar locale={locale} />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  )
}
