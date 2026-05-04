import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/mdx'

export const alt = 'Blog post'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function BlogOGImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, (locale === 'en' ? 'en' : 'ko') as 'ko' | 'en')

  if (!post) {
    return new ImageResponse(
      (
        <div style={{ background: '#FFFCF8', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, color: '#2C2C34', fontFamily: 'serif' }}>
          Beronica Blog
        </div>
      ),
      { ...size }
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: '#FFFCF8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 60,
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: '#8B7EC8',
          }}
        />
        {/* Top: Category badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              background: '#8B7EC8',
              color: '#FFFCF8',
              padding: '6px 16px',
              borderRadius: 20,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {post.category}
          </div>
        </div>
        {/* Middle: Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: '#2C2C34',
            lineHeight: 1.3,
            maxWidth: '90%',
            display: 'flex',
          }}
        >
          {post.title}
        </div>
        {/* Bottom: Author + date + Beronica branding */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontSize: 20, color: '#6B6B78' }}>{post.author}</div>
            <div style={{ fontSize: 18, color: '#9B9BA8' }}>{post.date}</div>
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#8B7EC8' }}>
            Beronica
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
