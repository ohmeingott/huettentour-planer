import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Hüttentour Planer — Mehrtages-Hüttentouren in den Alpen planen'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f0f7f4 0%, #d9ede2 40%, #84c4a5 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L4 16h4v10h16V16h4L16 4z" fill="#215a42" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
              <rect x="13" y="19" width="6" height="7" rx="0.5" fill="#fbbf24"/>
              <rect x="8" y="14" width="4" height="3" rx="0.5" fill="#fde68a"/>
              <rect x="20" y="14" width="4" height="3" rx="0.5" fill="#fde68a"/>
            </svg>
            <span style={{ fontSize: 56, fontWeight: 700, color: '#1d4836', letterSpacing: '-1px' }}>
              Hüttentour Planer
            </span>
          </div>

          <span style={{ fontSize: 24, color: '#57534e', maxWidth: 600, textAlign: 'center', lineHeight: 1.4 }}>
            Plane deine Mehrtages-Hüttentour in den Alpen
          </span>

          <div style={{ display: 'flex', gap: '32px', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: '#287050' }}>2</span>
              <span style={{ fontSize: 18, color: '#78716c' }}>Regionen</span>
            </div>
            <div style={{ width: 1, height: 28, background: '#d6d3d1' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: '#c2410c' }}>27</span>
              <span style={{ fontSize: 18, color: '#78716c' }}>Hütten</span>
            </div>
            <div style={{ width: 1, height: 28, background: '#d6d3d1' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: '#0ea5e9' }}>Live</span>
              <span style={{ fontSize: 18, color: '#78716c' }}>Verfügbarkeit</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
