import { useEffect, useRef, useState } from 'react'

const COUNTDOWN_STEPS = [
  { label: 'T-10', sub: 'SYSTEMS CHECK' },
  { label: 'T-9', sub: 'FUEL PRESSURIZATION' },
  { label: 'T-8', sub: 'NAVIGATION ONLINE' },
  { label: 'T-7', sub: 'GUIDANCE SYSTEMS ARM' },
  { label: 'T-6', sub: 'ENGINE IGNITION SEQ' },
  { label: 'T-5', sub: 'THRUST NOMINAL' },
  { label: 'T-4', sub: 'PAYLOAD CONFIRMED' },
  { label: 'T-3', sub: 'LAUNCH DIRECTOR GO' },
  { label: 'T-2', sub: 'RANGE CLEAR' },
  { label: 'T-1', sub: 'FULL THROTTLE' },
  { label: 'T-0', sub: 'IGNITION' },
]

export default function BigBang({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0)
  const [launching, setLaunching] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [glitch, setGlitch] = useState(false)
  const [dateStr, setDateStr] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>()

  // Countdown ticker
  useEffect(() => {
    let current = 0
    const tick = () => {
      current++
      setStep(current)
      if (current < COUNTDOWN_STEPS.length - 1) {
        setTimeout(tick, 420)
      } else {
        // T-0 — launch sequence
        setTimeout(() => {
          setLaunching(true)
          setGlitch(true)
          setTimeout(() => setGlitch(false), 300)
          setTimeout(() => {
            setFadeOut(true)
            setTimeout(onComplete, 700)
          }, 900)
        }, 500)
      }
    }
    setTimeout(tick, 300)
  }, [onComplete])

  useEffect(() => {
    setDateStr(new Date().toUTCString().slice(0, 25).toUpperCase())
  }, [])

  // Particle exhaust on launch
  useEffect(() => {
    if (!launching) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const cx = canvas.width / 2
    const cy = canvas.height * 0.72

    const particles: { x: number; y: number; vx: number; vy: number; life: number; size: number }[] = []

    const spawn = () => {
      for (let i = 0; i < 8; i++) {
        particles.push({
          x: cx + (Math.random() - 0.5) * 30,
          y: cy,
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 5 + 2,
          life: 1,
          size: Math.random() * 4 + 1,
        })
      }
    }

    let frame = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++
      if (frame % 2 === 0) spawn()

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.03
        p.vy *= 1.05
        if (p.life > 0) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(10,10,15,${p.life * 0.7})`
          ctx.fill()
        }
      }

      if (!fadeOut) rafRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [launching, fadeOut])

  const current = COUNTDOWN_STEPS[Math.min(step, COUNTDOWN_STEPS.length - 1)]
  const isZero = step >= COUNTDOWN_STEPS.length - 1

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: '#ffffff',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.7s ease',
      fontFamily: "'Syne Mono', monospace",
      overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      {/* Top status bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '20px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid rgba(10,10,15,0.08)',
      }}>
        <span style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(10,10,15,0.4)' }}>
          MISSION CONTROL
        </span>
        <span style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(10,10,15,0.4)' }}>
          AL-001 / LAUNCH SEQUENCE
        </span>
        <span style={{ fontSize: '11px', letterSpacing: '0.2em', color: isZero ? '#16a34a' : 'rgba(10,10,15,0.4)' }}>
          {isZero ? '● IGNITION' : '● NOMINAL'}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute', top: '61px', left: 0, right: 0,
        height: '1px', background: 'rgba(10,10,15,0.06)',
      }}>
        <div style={{
          height: '100%',
          width: `${(step / (COUNTDOWN_STEPS.length - 1)) * 100}%`,
          background: 'rgba(10,10,15,0.3)',
          transition: 'width 0.35s ease',
        }} />
      </div>

      {/* Main countdown display */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* T-minus label */}
        <div style={{
          fontSize: '11px', letterSpacing: '0.3em',
          color: 'rgba(10,10,15,0.35)',
          marginBottom: '16px',
          textTransform: 'uppercase',
        }}>
          T-MINUS
        </div>

        {/* Big countdown number */}
        <div style={{
          fontSize: 'clamp(100px, 18vw, 220px)',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          color: '#0a0a0f',
          lineHeight: 0.85,
          letterSpacing: '-0.04em',
          transform: glitch ? `translate(${Math.random() * 6 - 3}px, ${Math.random() * 4 - 2}px)` : 'none',
          transition: glitch ? 'none' : 'transform 0.1s',
          opacity: glitch ? 0.7 : 1,
          minWidth: '3ch',
          display: 'inline-block',
        }}>
          {isZero ? '0' : (COUNTDOWN_STEPS.length - 1 - step).toString()}
        </div>

        {/* Status sub-label */}
        <div style={{
          fontSize: '11px', letterSpacing: '0.25em',
          color: 'rgba(10,10,15,0.4)',
          marginTop: '24px',
          textTransform: 'uppercase',
          transition: 'opacity 0.2s',
        }}>
          {current.sub}
        </div>

        {/* Checklist — completed steps */}
        <div style={{
          marginTop: '48px',
          display: 'flex', flexDirection: 'column', gap: '6px',
          alignItems: 'flex-start',
          minWidth: '280px',
        }}>
          {COUNTDOWN_STEPS.slice(0, Math.min(step + 1, COUNTDOWN_STEPS.length)).slice(-5).map((s, i, arr) => (
            <div key={s.label} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              opacity: i === arr.length - 1 ? 1 : 0.3,
              transition: 'opacity 0.3s',
            }}>
              <span style={{
                fontSize: '10px', letterSpacing: '0.1em',
                color: i === arr.length - 1 && isZero ? '#16a34a' : 'rgba(10,10,15,0.5)',
              }}>
                {i === arr.length - 1 && isZero ? '✓' : '›'}
              </span>
              <span style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(10,10,15,0.5)' }}>
                {s.label} — {s.sub}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Rocket SVG */}
      <div style={{
        position: 'absolute',
        bottom: launching ? '-120px' : '60px',
        transition: launching ? 'bottom 0.9s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
      }}>
        <svg width="40" height="56" viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', margin: '0 auto' }}>
          <polygon points="20,2 28,24 20,20 12,24" fill="#0a0a0f" />
          <polygon points="12,24 2,42 16,32 20,20" fill="rgba(10,10,15,0.08)" stroke="rgba(10,10,15,0.6)" strokeWidth="0.8" />
          <polygon points="28,24 38,42 24,32 20,20" fill="rgba(10,10,15,0.08)" stroke="rgba(10,10,15,0.6)" strokeWidth="0.8" />
          <polygon points="16,32 24,32 22,48 18,48" fill="rgba(10,10,15,0.15)" stroke="rgba(10,10,15,0.5)" strokeWidth="0.7" />
          <circle cx="20" cy="20" r="2.5" fill="white" />
          <circle cx="20" cy="2" r="1.5" fill="#0a0a0f" />
        </svg>
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '16px 40px',
        borderTop: '1px solid rgba(10,10,15,0.08)',
        display: 'flex', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(10,10,15,0.3)' }}>
          ADAM LE — PORTFOLIO
        </span>
        <span style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(10,10,15,0.3)' }}>
          {dateStr}
        </span>
      </div>
    </div>
  )
}