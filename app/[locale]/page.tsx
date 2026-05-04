import type { Metadata } from 'next'
import HeroSection from '@/components/sections/home/HeroSection'
import ProblemSection from '@/components/sections/home/ProblemSection'
import SolutionSection from '@/components/sections/home/SolutionSection'
import FeaturesOverview from '@/components/sections/home/FeaturesOverview'
import ComparisonTable from '@/components/sections/home/ComparisonTable'
import UseCaseTabs from '@/components/sections/home/UseCaseTabs'
import SocialProof from '@/components/sections/home/SocialProof'
import { generateAlternates, generateOrganizationJsonLd } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'ko' ? 'Beronica — AI가 일하고, 당신은 성장한다' : 'Beronica — AI works, you grow',
    description: locale === 'ko'
      ? 'AI가 기억하고 정리해주는 업무/지식 운영 시스템. GTD, PARA, AI Memory를 결합하여 5분이면 시작합니다.'
      : 'An AI-powered work & knowledge operating system. Combining GTD, PARA, and AI Memory — start in 5 minutes.',
    alternates: generateAlternates('/'),
  }
}

export default function HomePage() {
  const jsonLd = generateOrganizationJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesOverview />
      <ComparisonTable />
      <UseCaseTabs />
      <SocialProof />
    </>
  )
}
