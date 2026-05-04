import type { Metadata } from 'next'
import { generateAlternates } from '@/lib/seo'
import { SITE_META, CONTACT } from '@/lib/site-config'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'ko' ? '소개' : 'About',
    description: locale === 'ko'
      ? 'AI가 일하고, 당신은 성장한다. 베로니카는 GTD, PARA, AI Memory를 결합한 업무/지식 운영 시스템입니다.'
      : 'AI works, you grow. Beronica is a work & knowledge operating system combining GTD, PARA, and AI Memory.',
    alternates: generateAlternates('/about'),
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isKo = locale !== 'en'

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h1 className="text-3xl font-bold md:text-5xl">
            {isKo ? '베로니카를 소개합니다' : 'About Beronica'}
          </h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed">
            {isKo
              ? '"AI가 일하고, 당신은 성장한다." 베로니카는 이 한 문장에서 시작했습니다.'
              : '"AI works, you grow." Beronica started from this single sentence.'}
          </p>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-6">
            {isKo ? '왜 만들었는가' : 'Why We Built This'}
          </h2>
          <div className="space-y-4 text-[var(--color-text-secondary)] leading-relaxed">
            <p>
              {isKo
                ? '생산성 도구는 넘쳐나지만, 정작 "자동으로 정리해주는 시스템"은 없었습니다. GTD를 시작해도 3주 만에 포기하고, PARA 폴더를 만들어도 분류되지 않은 노트가 쌓여갑니다.'
                : 'Productivity tools are everywhere, but there was no system that automatically organizes everything. People start GTD but quit in 3 weeks. They create PARA folders but unsorted notes keep piling up.'}
            </p>
            <p>
              {isKo
                ? '베로니카는 이 문제를 AI로 해결합니다. 말하면 캡처하고, AI가 분류하고, 자동으로 리뷰합니다. 당신은 일에 집중하고, 시스템은 AI가 운영합니다.'
                : 'Beronica solves this with AI. Speak to capture, AI classifies, and reviews happen automatically. You focus on work, AI runs the system.'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-8">
            {isKo ? '핵심 가치' : 'Core Values'}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: isKo ? '완전한 데이터 소유권' : 'Complete Data Ownership',
                desc: isKo
                  ? '모든 데이터는 로컬 마크다운 파일. 클라우드 종속 없음.'
                  : 'All data as local markdown files. No cloud lock-in.',
              },
              {
                title: isKo ? 'AI 자동화' : 'AI Automation',
                desc: isKo
                  ? '분류, 리뷰, 정리를 AI가 대신합니다.'
                  : 'AI handles classification, review, and organization.',
              },
              {
                title: isKo ? '오픈소스' : 'Open Source',
                desc: isKo
                  ? '100% 무료, 100% 오픈소스. 누구나 사용하고 기여할 수 있습니다.'
                  : '100% free, 100% open source. Anyone can use and contribute.',
              },
            ].map((value) => (
              <div key={value.title} className="rounded-[var(--radius-card)] border border-[var(--color-border)] p-6">
                <h3 className="font-semibold text-lg">{value.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-6">
            {isKo ? '만든 사람' : 'Creator'}
          </h2>
          <div className="text-[var(--color-text-secondary)] leading-relaxed space-y-4">
            <p>
              {isKo
                ? `${SITE_META.author} — 7개월 넘게 베로니카 시스템을 직접 사용하며 개발하고 있습니다. "내가 매일 쓰는 시스템"이라는 원칙으로, 실전에서 검증된 기능만 공개합니다.`
                : `${SITE_META.author} — Building and using the Beronica system for over 7 months. Following the principle of "a system I use every day," only battle-tested features are released.`}
            </p>
            <p className="text-sm">
              {isKo ? '문의: ' : 'Contact: '}
              <a href={`mailto:${CONTACT.email}`} className="text-[var(--color-primary)] hover:underline">
                {CONTACT.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
