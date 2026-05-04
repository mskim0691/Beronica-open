import { ImageResponse } from 'next/og'

export const alt = 'Beronica — AI가 일하고, 당신은 성장한다'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FFFCF8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
        {/* Logo */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#8B7EC8',
            marginBottom: 16,
          }}
        >
          Beronica
        </div>
        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: '#2C2C34',
            marginBottom: 12,
          }}
        >
          AI가 일하고, 당신은 성장한다.
        </div>
        {/* Subtitle */}
        <div
          style={{
            fontSize: 20,
            color: '#6B6B78',
          }}
        >
          GTD · PARA · AI Memory — 업무/지식 운영 시스템
        </div>
      </div>
    ),
    { ...size }
  )
}
