import { ImageResponse } from 'next/server'

export const runtime = 'edge'

export const alt = 'ColorFusion - Design with Ease, Create with Precision'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #1a202c, #2d3748)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="20" fill="#FFFFFF"/>
            <path d="M30 70 L70 70 L50 30 Z" fill="#FFD700"/>
            <path d="M30 70 L70 70 L50 90 Z" fill="#000000"/>
          </svg>
          <h1
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: '#FFD700',
              marginLeft: 20,
            }}
          >
            ColorFusion
          </h1>
        </div>
        <h2
          style={{
            fontSize: 40,
            color: '#ffffff',
            marginBottom: 40,
            maxWidth: '80%',
            textAlign: 'center',
          }}
        >
          Design with Ease, Create with Precision
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            marginBottom: 40,
          }}
        >
          {['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'].map(
            (color, index) => (
              <div
                key={index}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: color,
                }}
              />
            )
          )}
        </div>
        <p
          style={{
            fontSize: 24,
            color: '#cbd5e0',
            maxWidth: '80%',
            textAlign: 'center',
          }}
        >
          Unleash your creativity with vibrant palettes, unique patterns, and gradients
        </p>
      </div>
    ),
    {
      ...size,
    }
  )
}
