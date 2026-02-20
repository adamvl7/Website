import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

const contacts = [
  { label: 'Email', value: 'adam.le.7184@gmail.com', href: 'mailto:adam.le.7184@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/adam-le-4228252b7', href: 'https://linkedin.com/in/adam-le-4228252b7' },
  { label: 'GitHub', value: 'github.com/adamvl7', href: 'https://github.com/adamvl7' },
]

type GalaxyPhase = 'stable' | 'exploding' | 'reforming'

type GalaxyParticle = {
  baseR: number
  baseTheta: number
  armJitter: number
  size: number
  alpha: number
  targetAlpha: number
  twinkle: number
  speed: number
  x: number
  y: number
  vx: number
  vy: number
}

function GalaxyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -999, y: -999 })
  const rafRef = useRef<number>()
  const phaseRef = useRef<GalaxyPhase>('stable')
  const phaseClockRef = useRef(0)
  const rotationRef = useRef(0)
  const burstRef = useRef(0)
  const wavesRef = useRef<{ radius: number; alpha: number; width: number }[]>([])
  const particlesRef = useRef<GalaxyParticle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const createParticles = () => {
      const armCount = 5
      const count = 340
      const maxR = Math.max(180, Math.min(canvas.width, canvas.height) * 0.42)
      const particles: GalaxyParticle[] = []

      for (let i = 0; i < count; i++) {
        const arm = i % armCount
        const baseR = Math.pow(Math.random(), 0.72) * maxR
        const theta =
          arm * ((Math.PI * 2) / armCount) +
          baseR * 0.043 +
          (Math.random() - 0.5) * 0.9
        const targetAlpha = 0.35 + Math.random() * 0.5

        particles.push({
          baseR,
          baseTheta: theta,
          armJitter: (Math.random() - 0.5) * 16,
          size: Math.max(0.5, 2.4 - (baseR / maxR) * 1.45 + Math.random() * 0.9),
          alpha: targetAlpha,
          targetAlpha,
          twinkle: Math.random() * Math.PI * 2,
          speed: 0.0004 + (1 - baseR / maxR) * 0.0024 + Math.random() * 0.0007,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
        })
      }

      particlesRef.current = particles
    }

    createParticles()

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener('mousemove', onMouseMove)

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const dx = mx - cx
      const dy = my - cy
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > Math.min(canvas.width, canvas.height) * 0.42) return
      if (phaseRef.current === 'exploding') return

      phaseRef.current = 'exploding'
      phaseClockRef.current = 0
      burstRef.current = 1
      wavesRef.current.push({ radius: 32, alpha: 0.45, width: 2.4 })

      for (const particle of particlesRef.current) {
        const pDist = Math.sqrt(particle.x * particle.x + particle.y * particle.y) || 1
        const spread = 1.5 + Math.random() * 2.6 + pDist * 0.008
        particle.vx = (particle.x / pDist) * spread + (Math.random() - 0.5) * 1.3
        particle.vy = (particle.y / pDist) * spread + (Math.random() - 0.5) * 1.3
      }
    }
    canvas.addEventListener('click', onClick)

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      const mouse = mouseRef.current
      const parallax = 12
      const px = ((mouse.x - W / 2) / W) * parallax
      const py = ((mouse.y - H / 2) / H) * parallax
      const cx = W / 2 + px
      const cy = H / 2 + py
      const maxR = Math.max(180, Math.min(W, H) * 0.42)
      const phase = phaseRef.current

      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < 42; i++) {
        const angle = (i / 42) * Math.PI * 2 + rotationRef.current * 0.2
        const radius = maxR * (0.55 + (i % 7) * 0.07)
        const sx = cx + Math.cos(angle) * radius
        const sy = cy + Math.sin(angle) * radius * 0.5
        ctx.beginPath()
        ctx.arc(sx, sy, 0.8, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(10,10,15,0.06)'
        ctx.fill()
      }

      rotationRef.current += 0.004

      if (phase === 'exploding') {
        phaseClockRef.current += 1
        if (phaseClockRef.current > 85) {
          phaseRef.current = 'reforming'
          phaseClockRef.current = 0
        }
      } else if (phase === 'reforming') {
        phaseClockRef.current += 1
        if (phaseClockRef.current > 330) {
          phaseRef.current = 'stable'
          phaseClockRef.current = 0
        }
      }

      burstRef.current *= 0.94
      if (burstRef.current < 0.01) burstRef.current = 0

      for (const wave of wavesRef.current) {
        wave.radius += 4.6
        wave.alpha *= 0.95
      }
      wavesRef.current = wavesRef.current.filter(
        w => w.alpha > 0.02 && w.radius < maxR * 1.35
      )

      for (const wave of wavesRef.current) {
        ctx.beginPath()
        ctx.arc(cx, cy, wave.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(10,10,15,${wave.alpha})`
        ctx.lineWidth = wave.width
        ctx.stroke()
      }

      const reformProgress = Math.min(1, phaseClockRef.current / 330)
      const easeOut = 1 - Math.pow(1 - reformProgress, 3)

      for (const particle of particlesRef.current) {
        const swirl = particle.baseTheta + rotationRef.current * (0.5 + particle.speed * 15)
        const twinkle = Math.sin(rotationRef.current * 6 + particle.twinkle) * 0.12
        const warp = Math.sin(rotationRef.current * 2 + particle.baseR * 0.02) * particle.armJitter
        const targetX = Math.cos(swirl) * particle.baseR + Math.cos(swirl + Math.PI / 2) * warp
        const targetY =
          Math.sin(swirl) * particle.baseR * 0.52 +
          Math.sin(swirl + Math.PI / 2) * warp * 0.5

        if (phase === 'stable') {
          particle.x = targetX
          particle.y = targetY
          particle.alpha = Math.min(1, particle.targetAlpha + twinkle)
        } else if (phase === 'exploding') {
          particle.x += particle.vx
          particle.y += particle.vy
          particle.vx *= 0.988
          particle.vy *= 0.988
          particle.alpha *= 0.982
        } else {
          particle.x += (targetX - particle.x) * 0.048
          particle.y += (targetY - particle.y) * 0.048
          const targetAlpha = (particle.targetAlpha + twinkle) * easeOut
          particle.alpha += (targetAlpha - particle.alpha) * 0.05
        }

        const drawX = cx + particle.x
        const drawY = cy + particle.y

        const starGlow = ctx.createRadialGradient(
          drawX,
          drawY,
          0,
          drawX,
          drawY,
          particle.size * 4.8
        )
        starGlow.addColorStop(0, `rgba(10,10,15,${Math.min(0.75, particle.alpha)})`)
        starGlow.addColorStop(1, 'rgba(10,10,15,0)')
        ctx.beginPath()
        ctx.arc(drawX, drawY, particle.size * 4.8, 0, Math.PI * 2)
        ctx.fillStyle = starGlow
        ctx.fill()

        ctx.beginPath()
        ctx.arc(drawX, drawY, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(10,10,15,${Math.min(0.95, particle.alpha + 0.15)})`
        ctx.fill()
      }

      const coreRadius = 22 + burstRef.current * 16
      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius * 3.8)
      coreGlow.addColorStop(0, `rgba(10,10,15,${0.9 - burstRef.current * 0.2})`)
      coreGlow.addColorStop(0.45, `rgba(10,10,15,${0.28 + burstRef.current * 0.14})`)
      coreGlow.addColorStop(1, 'rgba(10,10,15,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, coreRadius * 3.8, 0, Math.PI * 2)
      ctx.fillStyle = coreGlow
      ctx.fill()

      ctx.beginPath()
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(10,10,15,0.95)'
      ctx.fill()

      ctx.beginPath()
      ctx.arc(cx, cy, coreRadius * 0.55, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(245,245,240,0.22)'
      ctx.fill()

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('click', onClick)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer' }}
    />
  )
}

export default function Contact() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <Head>
        <title>Contact - Adam Le</title>
      </Head>
      <div className="page">
        <section
          style={{
            minHeight: '100vh',
            paddingTop: '60px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <div
            style={{
              position: 'relative',
              borderRight: '1px solid var(--orbit-bright)',
              overflow: 'hidden',
              minHeight: '100vh',
            }}
          >
            <GalaxyCanvas />

            <div
              style={{
                position: 'absolute',
                bottom: '48px',
                left: '48px',
                zIndex: 1,
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  color: 'var(--star-faint)',
                  marginBottom: '8px',
                }}
              >
                33.68N 117.82W
              </div>
              <div
                className="mono"
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  color: 'var(--star-faint)',
                }}
              >
                UTC {time}
              </div>
            </div>

            <div style={{ position: 'absolute', top: '80px', left: '48px', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="dot" />
                <span
                  className="mono"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    color: 'var(--star-faint)',
                    textTransform: 'uppercase',
                  }}
                >
                  Galaxy Reactor Online
                </span>
              </div>
              <div className="coord" style={{ opacity: 0.5 }}>
                <div>SECTOR: IRVINE, CA</div>
                <div>CLEARANCE: OPEN</div>
              </div>
            </div>

            <div style={{ position: 'absolute', top: '80px', right: '48px', zIndex: 1, textAlign: 'right' }}>
              <div
                className="mono"
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.16em',
                  color: 'var(--star-faint)',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                Click core to trigger supernova
              </div>
              <div className="mono" style={{ fontSize: '9px', letterSpacing: '0.12em', color: 'var(--star-faint)' }}>
                Reforms automatically
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '80px 64px',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '56px' }}>
              <div className="hr-w" />
              <span className="eyebrow">Direct Channels</span>
            </div>

            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(48px, 6vw, 90px)',
                lineHeight: 0.9,
                letterSpacing: '-0.025em',
                color: 'var(--star)',
                marginBottom: '64px',
              }}
            >
              Get In
              <br />
              <span
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(10,10,15,0.3)',
                }}
              >
                Touch.
              </span>
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {contacts.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                >
                  <div
                    style={{
                      padding: '28px 0',
                      borderBottom: '1px solid var(--orbit)',
                      borderTop: i === 0 ? '1px solid var(--orbit)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.25s ease',
                      transform: activeIdx === i ? 'translateX(8px)' : 'translateX(0)',
                    }}
                  >
                    <div>
                      <p
                        className="mono"
                        style={{
                          fontSize: '10px',
                          letterSpacing: '0.2em',
                          color: activeIdx === i ? 'var(--star)' : 'var(--star-faint)',
                          textTransform: 'uppercase',
                          marginBottom: '8px',
                          transition: 'color 0.25s',
                        }}
                      >
                        {c.label}
                      </p>
                      <p
                        style={{
                          fontSize: '16px',
                          fontWeight: 300,
                          color: activeIdx === i ? 'var(--star)' : 'var(--star-dim)',
                          transition: 'color 0.25s',
                          wordBreak: 'break-all',
                        }}
                      >
                        {c.value}
                      </p>
                    </div>

                    <div
                      style={{
                        opacity: activeIdx === i ? 1 : 0,
                        transform: activeIdx === i ? 'translate(0, 0)' : 'translate(-8px, 8px)',
                        transition: 'all 0.25s ease',
                        fontSize: '20px',
                        color: 'var(--star)',
                        flexShrink: 0,
                        marginLeft: '24px',
                      }}
                    >
                      {'->'}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div
              style={{
                marginTop: '48px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 20px',
                border: '1px solid var(--orbit-bright)',
                alignSelf: 'flex-start',
              }}
            >
              <span className="dot green" />
              <span
                className="mono"
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.16em',
                  color: 'var(--star-dim)',
                  textTransform: 'uppercase',
                }}
              >
                Open to opportunities
              </span>
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                left: '64px',
                right: '64px',
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: '1px solid var(--orbit)',
                paddingTop: '20px',
              }}
            >
              <span className="mono" style={{ fontSize: '10px', color: 'var(--star-faint)', letterSpacing: '0.1em' }}>
                (c) 2025 ADAM LE
              </span>
              <span className="mono" style={{ fontSize: '10px', color: 'var(--star-faint)', letterSpacing: '0.1em' }}>
                IRVINE, CA - EARTH
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
