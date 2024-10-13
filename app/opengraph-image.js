import { ImageResponse } from 'next/server'

export const runtime = 'edge'

export const alt = 'ColorFusion - Design with Ease, Create with Precision'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  const interSemiBold = await fetch(
    new URL('./fonts/Inter-SemiBold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  const interBold = await fetch(
    new URL('./fonts/Inter-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #1a202c, #2d3748)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: '50%',
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#ecc94b',
              marginBottom: 20,
            }}
          >
            ColorFusion
          </h1>
          <h2
            style={{
              fontSize: 36,
              color: '#ffffff',
              marginBottom: 20,
              maxWidth: '90%',
            }}
          >
            Design with Ease, Create with Precision
          </h2>
          <p
            style={{
              fontSize: 24,
              color: '#cbd5e0',
              marginTop: 20,
              maxWidth: '90%',
            }}
          >
            Unleash your creativity with vibrant palettes, unique patterns, and gradients
          </p>
        </div>
        <div
          style={{
            width: '50%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src="https://colorfusion.vercel.app/img/bobgeneration.png"
            alt="ColorFusion Preview"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interSemiBold,
          style: 'normal',
          weight: 600,
        },
        {
          name: 'Inter',
          data: interBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
