import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  opacity: number
  speed: number
  twinkleSpeed: number
  twinklePhase: number
  brightness: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -999, y: -999 })
  const starsRef = useRef<Star[]>([])
  const rafRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 3500)
      starsRef.current = Array.from({ length: count }, () => {
        const isBright = Math.random() < 0.15
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: isBright ? Math.random() * 2.2 + 1.0 : Math.random() * 1.2 + 0.3,
          opacity: isBright ? Math.random() * 0.4 + 0.55 : Math.random() * 0.45 + 0.25,
          speed: Math.random() * 0.01 + 0.002,
          twinkleSpeed: Math.random() * 0.012 + 0.004,
          twinklePhase: Math.random() * Math.PI * 2,
          brightness: isBright ? 1.0 : Math.random() * 0.5 + 0.3,
        }
      })
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const draw = () => {
      timeRef.current += 1
      const t = timeRef.current
      const stars = starsRef.current
      const mouse = mouseRef.current
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)

      // Constellation lines near mouse
      const CONNECT_RADIUS = 200
      const MAX_DIST = 100

      const nearby = stars.filter(s => {
        const dx = s.x - mouse.x
        const dy = s.y - mouse.y
        return Math.sqrt(dx * dx + dy * dy) < CONNECT_RADIUS
      })

      for (let i = 0; i < nearby.length; i++) {
        for (let j = i + 1; j < nearby.length; j++) {
          const a = nearby[i], b = nearby[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.3
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(10, 15, 30, ${alpha})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      // Draw stars
      for (const s of stars) {
        const twinkle = Math.sin(t * s.twinkleSpeed + s.twinklePhase) * 0.35 + 0.65
        const opacity = s.opacity * twinkle

        // Glow for brighter stars
        if (s.r > 1.2) {
          const glowSize = s.r * 4
          const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowSize)
          grd.addColorStop(0, `rgba(10, 15, 30, ${opacity * 0.45})`)
          grd.addColorStop(0.5, `rgba(10, 15, 30, ${opacity * 0.1})`)
          grd.addColorStop(1, 'rgba(10, 15, 30, 0)')
          ctx.beginPath()
          ctx.arc(s.x, s.y, glowSize, 0, Math.PI * 2)
          ctx.fillStyle = grd
          ctx.fill()

          // Cross sparkle for very bright stars
          if (s.r > 1.8) {
            ctx.strokeStyle = `rgba(10, 15, 30, ${opacity * 0.35})`
            ctx.lineWidth = 0.5
            const sl = s.r * 5
            ctx.beginPath()
            ctx.moveTo(s.x - sl, s.y)
            ctx.lineTo(s.x + sl, s.y)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(s.x, s.y - sl)
            ctx.lineTo(s.x, s.y + sl)
            ctx.stroke()
          }
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(10, 15, 30, ${opacity})`
        ctx.fill()

        s.y += s.speed
        if (s.y > H + 2) {
          s.y = -2
          s.x = Math.random() * W
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    resize()
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="star-canvas"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}