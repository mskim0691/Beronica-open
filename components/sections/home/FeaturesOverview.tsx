import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Brain, Inbox, Sun, FolderTree, ClipboardCheck, Users, Shield } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const FEATURES = [
  { key: 'aiMemory', icon: Brain },
  { key: 'gtdInbox', icon: Inbox },
  { key: 'dailyReview', icon: Sun },
  { key: 'paraStructure', icon: FolderTree },
  { key: 'weeklyReview', icon: ClipboardCheck },
  { key: 'contactMgmt', icon: Users },
  { key: 'localPrivacy', icon: Shield },
] as const

export default function FeaturesOverview() {
  const t = useTranslations('home.features')

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2>{t('title')}</h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">{t('subtitle')}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.slice(0, 3).map(({ key, icon: Icon }) => (
            <FeatureCard key={key} icon={Icon} title={t(key)} desc={t(`${key}Desc`)} />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.slice(3).map(({ key, icon: Icon }) => (
            <FeatureCard key={key} icon={Icon} title={t(key)} desc={t(`${key}Desc`)} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/features">{t('cta')} &rarr;</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
          <Icon className="h-5 w-5 text-[var(--color-primary)]" />
        </div>
        <h3 className="mt-4 text-base font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{desc}</p>
      </CardContent>
    </Card>
  )
}
