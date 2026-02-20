import { useEffect, useRef } from 'react'

export default function Cursor() {
  const shipRef = useRef<SVGSVGElement>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const prevRef = useRef({ x: -100, y: -100 })
  const angleRef = useRef(0)
  const rafRef = useRef<number>()

  useEffect(() => {
    const ship = shipRef.current
    if (!ship) return

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const frame = () => {
      const pos = posRef.current
      const prev = prevRef.current
      const vx = pos.x - prev.x
      const vy = pos.y - prev.y
      const speed = Math.sqrt(vx * vx + vy * vy)

      if (speed > 0.5) {
        const targetAngle = Math.atan2(vy, vx) * (180 / Math.PI) + 90
        const delta = ((targetAngle - angleRef.current + 540) % 360) - 180
        angleRef.current += delta * 0.12
      }

      prevRef.current = { x: pos.x, y: pos.y }

      if (ship) {
        ship.style.left = pos.x + 'px'
        ship.style.top = pos.y + 'px'
        ship.style.transform = `translate(-14px, -12px) rotate(${angleRef.current}deg)`
      }

      rafRef.current = requestAnimationFrame(frame)
    }

    document.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(frame)

    return () => {
      document.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <svg
      ref={shipRef}
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '36px',
        height: '44px',
        pointerEvents: 'none',
        zIndex: 9999,
        filter: 'drop-shadow(0 0 3px rgba(10,10,15,0.3))',
        willChange: 'transform, left, top',
      }}
    >
      {/* Main nose spike */}
      <polygon
        points="20,2 26,22 20,18 14,22"
        fill="rgba(10,10,15,0.9)"
        stroke="rgba(10,10,15,1)"
        strokeWidth="0.7"
      />
      {/* Left wing */}
      <polygon
        points="14,22 3,38 16,28 20,18"
        fill="rgba(10,10,15,0.08)"
        stroke="rgba(10,10,15,0.6)"
        strokeWidth="0.7"
      />
      {/* Right wing */}
      <polygon
        points="26,22 37,38 24,28 20,18"
        fill="rgba(10,10,15,0.08)"
        stroke="rgba(10,10,15,0.6)"
        strokeWidth="0.7"
      />
      {/* Cross braces */}
      <line x1="20" y1="2" x2="3" y2="38" stroke="rgba(10,10,15,0.25)" strokeWidth="0.6" />
      <line x1="20" y1="2" x2="37" y2="38" stroke="rgba(10,10,15,0.25)" strokeWidth="0.6" />
      {/* Engine body */}
      <polygon
        points="16,28 24,28 22,42 18,42"
        fill="rgba(10,10,15,0.1)"
        stroke="rgba(10,10,15,0.45)"
        strokeWidth="0.6"
      />
      {/* Exhaust */}
      <circle cx="20" cy="44" r="1.4" fill="rgba(40,40,60,0.9)" />
      <circle cx="20" cy="46" r="0.7" fill="rgba(40,40,60,0.5)" />
      {/* Center node */}
      <circle cx="20" cy="18" r="2" fill="rgba(10,10,15,0.95)" />
      {/* Tip */}
      <circle cx="20" cy="2" r="1.1" fill="#0a0a0f" />
    </svg>
  )
}
