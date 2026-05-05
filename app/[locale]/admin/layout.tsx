interface AdminLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  await params
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {children}
    </div>
  )
}
