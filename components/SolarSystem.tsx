import { useEffect, useRef } from 'react'

interface Planet {
  name: string
  radius: number      // orbit radius
  size: number        // planet size
  speed: number       // orbit speed (rad/frame)
  angle: number       // current angle
  color: string
  glowColor: string
  moons?: { radius: number; size: number; speed: number; angle: number }[]
}

export default function SolarSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>()
  const mouseRef = useRef({ x: -999, y: -999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.addEventListener('mousemove', onMouseMove)

    const planets: Planet[] = [
      {
        name: 'mercury',
        radius: 60, size: 4, speed: 0.018, angle: 0.8,
        color: '#b8bcc8', glowColor: 'rgba(184,188,200,0.4)',
      },
      {
        name: 'venus',
        radius: 96, size: 6.5, speed: 0.011, angle: 2.1,
        color: '#e8d5a3', glowColor: 'rgba(232,213,163,0.4)',
      },
      {
        name: 'earth',
        radius: 136, size: 7, speed: 0.008, angle: 4.2,
        color: '#4a9eff', glowColor: 'rgba(74,158,255,0.4)',
        moons: [{ radius: 16, size: 2.2, speed: 0.045, angle: 0 }],
      },
      {
        name: 'mars',
        radius: 176, size: 5.5, speed: 0.006, angle: 1.0,
        color: '#e07050', glowColor: 'rgba(224,112,80,0.35)',
      },
      {
        name: 'jupiter',
        radius: 228, size: 14, speed: 0.003, angle: 3.5,
        color: '#c8a878', glowColor: 'rgba(200,168,120,0.35)',
        moons: [
          { radius: 22, size: 2.5, speed: 0.04, angle: 1 },
          { radius: 30, size: 2, speed: 0.025, angle: 3 },
        ],
      },
      {
        name: 'saturn',
        radius: 292, size: 12, speed: 0.002, angle: 0.4,
        color: '#dcc89a', glowColor: 'rgba(220,200,154,0.3)',
      },
    ]

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      const cx = W / 2
      const cy = H / 2
      const mouse = mouseRef.current

      ctx.clearRect(0, 0, W, H)

      // Mouse parallax offset
      const px = (mouse.x - W / 2) / W * 8
      const py = (mouse.y - H / 2) / H * 8

      const ox = cx + px
      const oy = cy + py

      // Draw sun
      const sunR = 22
      const sunGrd = ctx.createRadialGradient(ox, oy, 0, ox, oy, sunR * 4)
      sunGrd.addColorStop(0, 'rgba(255,255,220,1)')
      sunGrd.addColorStop(0.15, 'rgba(255,240,180,0.9)')
      sunGrd.addColorStop(0.5, 'rgba(255,220,100,0.2)')
      sunGrd.addColorStop(1, 'rgba(255,200,60,0)')
      ctx.beginPath()
      ctx.arc(ox, oy, sunR * 4, 0, Math.PI * 2)
      ctx.fillStyle = sunGrd
      ctx.fill()

      ctx.beginPath()
      ctx.arc(ox, oy, sunR, 0, Math.PI * 2)
      ctx.fillStyle = '#fff9e0'
      ctx.fill()

      // Draw orbits + planets
      for (const p of planets) {
        // Orbit ring
        ctx.beginPath()
        ctx.arc(ox, oy, p.radius, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(240,244,255,0.06)'
        ctx.lineWidth = 1
        ctx.stroke()

        // Advance angle
        p.angle += p.speed

        const px2 = ox + Math.cos(p.angle) * p.radius
        const py2 = oy + Math.sin(p.angle) * p.radius

        // Planet glow
        const grd = ctx.createRadialGradient(px2, py2, 0, px2, py2, p.size * 2.5)
        grd.addColorStop(0, p.glowColor)
        grd.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.arc(px2, py2, p.size * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Saturn rings
        if (p.name === 'saturn') {
          ctx.save()
          ctx.translate(px2, py2)
          ctx.scale(1, 0.35)
          ctx.beginPath()
          ctx.arc(0, 0, p.size * 2.4, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(220,200,154,0.45)'
          ctx.lineWidth = 3.5
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(220,200,154,0.2)'
          ctx.lineWidth = 2
          ctx.stroke()
          ctx.restore()
        }

        // Planet body
        ctx.beginPath()
        ctx.arc(px2, py2, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        // Earth continents hint
        if (p.name === 'earth') {
          ctx.beginPath()
          ctx.arc(px2 - 1.5, py2 - 1, p.size * 0.55, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(60,160,80,0.7)'
          ctx.fill()
        }

        // Moons
        if (p.moons) {
          for (const m of p.moons) {
            m.angle += m.speed
            const mx = px2 + Math.cos(m.angle) * m.radius
            const my = py2 + Math.sin(m.angle) * m.radius
            // moon orbit
            ctx.beginPath()
            ctx.arc(px2, py2, m.radius, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(240,244,255,0.08)'
            ctx.lineWidth = 0.5
            ctx.stroke()
            // moon body
            ctx.beginPath()
            ctx.arc(mx, my, m.size, 0, Math.PI * 2)
            ctx.fillStyle = 'rgba(200,210,230,0.85)'
            ctx.fill()
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.88,
      }}
    />
  )
}
