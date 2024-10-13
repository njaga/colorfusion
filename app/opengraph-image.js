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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: '#ecc94b',
              marginBottom: 20,
            }}
          >
            ColorFusion
          </h1>
          <h2
            style={{
              fontSize: 40,
              color: '#ffffff',
              marginBottom: 40,
              maxWidth: '80%',
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
            }}
          >
            {['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'].map(
              (color, index) => (
                <div
                  key={index}
                  style={{
                    width: 60,
                    height: 60,
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
              marginTop: 40,
            }}
          >
            Unleash your creativity with vibrant palettes, unique patterns, and gradients
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
