import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

function ScrollTint() {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      // Start immediately at 10vh, fully visible by 50vh
      const start = vh * 0.1
      const end = vh * 0.5
      const clamped = Math.max(0, Math.min(1, (scrollY - start) / (end - start)))
      setOpacity(clamped)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        background: 'rgba(185, 182, 172, 0.5)',
        opacity,
        transition: 'opacity 0.08s linear',
      }}
    />
  )
}

const SolarSystem = dynamic(() => import('../components/SolarSystem'), { ssr: false })

// Hello in many languages — includes English and Vietnamese
const HELLOS = [
  { word: 'Hello', lang: 'English' },
  { word: 'Xin chào', lang: 'Vietnamese' },
  { word: 'Bonjour', lang: 'French' },
  { word: 'こんにちは', lang: 'Japanese' },
  { word: 'Hola', lang: 'Spanish' },
  { word: '안녕하세요', lang: 'Korean' },
  { word: 'Ciao', lang: 'Italian' },
  { word: 'مرحبا', lang: 'Arabic' },
  { word: 'Hallo', lang: 'German' },
  { word: '你好', lang: 'Chinese' },
  { word: 'Olá', lang: 'Portuguese' },
  { word: 'Привет', lang: 'Russian' },
  { word: 'Merhaba', lang: 'Turkish' },
  { word: 'สวัสดี', lang: 'Thai' },
  { word: 'Namaste', lang: 'Hindi' },
  { word: 'Sawubona', lang: 'Zulu' },
  { word: 'Γεια', lang: 'Greek' },
  { word: 'שלום', lang: 'Hebrew' },
  { word: 'Hallå', lang: 'Swedish' },
  { word: 'Hej', lang: 'Danish' },
]

const skills = {
  Design: ['Figma', 'Prototyping', 'Design Systems', 'UI/UX', "..."],
  'AI / ML': ['Python', 'TensorFlow', 'PyTorch', 'Streamlit', "..."],
  Engineering: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'FastAPI', "..."],
  'Ops +': ['Docker', 'Prisma', "..."],
}

export default function Home() {
  const [helloIdx, setHelloIdx] = useState(0)
  const [helloClass, setHelloClass] = useState('hello-in')
  const [coords, setCoords] = useState({ x: '0.0000', y: '0.0000' })

  // Cycle hello in all languages
  useEffect(() => {
    const cycle = () => {
      setHelloClass('hello-out')
      setTimeout(() => {
        setHelloIdx(i => (i + 1) % HELLOS.length)
        setHelloClass('hello-in')
      }, 420)
    }
    const id = setInterval(cycle, 2200)
    return () => clearInterval(id)
  }, [])

  // Live coords from mouse
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      setCoords({
        x: ((e.clientX / window.innerWidth) * 360 - 180).toFixed(4),
        y: ((e.clientY / window.innerHeight) * 180 - 90).toFixed(4),
      })
    }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  const current = HELLOS[helloIdx]

  return (
    <>
      <Head>
        <title>Adam Le — Portfolio</title>
      </Head>

      <div className="page">
        {/* ── HERO ── */}
        <section style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 48px',
          overflow: 'hidden',
        }}>
          {/* Solar system fills the right half */}
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}>
            <SolarSystem />
          </div>

          {/* Coordinate display top left */}
          <div className="coord au d1" style={{ position: 'absolute', top: '80px', left: '48px', zIndex: 2 }}>
            <div>X: {coords.x}</div>
            <div>Y: {coords.y}</div>
            <div>Z: 1.0000000000</div>
          </div>

          {/* Status pill */}
          <div className="au d1" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px', position: 'relative', zIndex: 2 }}>
            <span className="dot" />
            <span className="mono" style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--star-faint)', textTransform: 'uppercase' }}>
              Active — Ref AL-001
            </span>
          </div>

          {/* Hello cycling word */}
          <div style={{ position: 'relative', zIndex: 2, marginBottom: '8px', overflow: 'hidden', height: 'clamp(70px, 11vw, 160px)', display: 'flex', alignItems: 'center' }}>
            <h1
              className={`hero-title ${helloClass}`}
              style={{ fontSize: 'clamp(64px, 10.5vw, 150px)', position: 'absolute' }}
            >
              {current.word}
            </h1>
          </div>

          {/* Language label */}
          <div className="au d2" style={{ position: 'relative', zIndex: 2, marginBottom: '32px' }}>
            <span className="mono" style={{
              fontSize: '10px', letterSpacing: '0.2em',
              color: 'var(--star-faint)', textTransform: 'uppercase',
              transition: 'opacity 0.3s',
            }}>
              {current.lang}
            </span>
          </div>

          {/* Name + subtitle */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 className="au d3" style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(22px, 3.5vw, 44px)',
              color: 'var(--star-dim)',
              letterSpacing: '0.04em',
              marginBottom: '12px',
            }}>
              I'm <span style={{ color: 'var(--star)', fontWeight: 600 }}>Adam Le</span>
            </h2>

            <p className="au d4" style={{
              fontSize: '15px', fontWeight: 300,
              color: 'var(--star-faint)',
              maxWidth: '380px', lineHeight: 1.75,
              marginBottom: '40px',
            }}>
              Computer Engineering @ UC Irvine '27.<br />
              Interested in software, AI, and design.
            </p>

          </div>

          {/* Scroll indicator */}
          <div style={{
            position: 'absolute', bottom: '40px', left: '48px', zIndex: 2,
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, rgba(240,244,255,0.6), transparent)' }} />
            <span className="mono" style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'var(--star-faint)', textTransform: 'uppercase' }}>
              Scroll
            </span>
          </div>
        </section>

        {/* Smooth scroll tint — fades in as you leave the hero */}
        <ScrollTint />

        {/* ── ABOUT ── */}
        <section style={{padding: '120px 48px 120px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2,}}>   
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div className="hr-w" />
            <span className="eyebrow" style={{ fontSize: '20px' }}>About</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '19px', lineHeight: 1.9, color: 'var(--star-dim)', marginBottom: '22px', fontWeight: 300 }}>
                Hi, I'm Adam Le, a <span style={{ color: 'var(--star)' }}>student at UC Irvine, Class of 2027</span>. I enjoy solving problems through software, from designing full-stack web apps to experimenting with artificial intelligence and automation. Outside of my professional life, I would describe myself as someone who likes to stay active, try new things, and keep growing.
              </p>
              <p style={{ fontSize: '19px', lineHeight: 1.9, color: 'var(--star-dim)', marginBottom: '22px', fontWeight: 300 }}>
                I enjoy playing sports whether it's tennis, pickleball, basketball, or football; I like staying busy and pushing myself physically. It helps me clear my mind and reset after long days. One of my favorite hobbies is <span style={{ color: 'var(--star)' }}>cooking</span>. I've been cooking since I was about ten years old and I enjoy trying new dishes, testing different flavors, and seeing how small changes can make something taste better. Cooking feels natural to me, and it is something I genuinely enjoy doing for the people around me.
              </p>
              <p style={{ fontSize: '19px', lineHeight: 1.9, color: 'var(--star-dim)', fontWeight: 300 }}>
                I also like learning new skills when something catches my interest. If I get curious about something, I will usually spend time figuring it out on my own. I don't mind starting from scratch. I like the process of improving little by little.
              </p>
            </div>

            <div>
              <div style={{
                border: '1px solid var(--orbit-bright)',
                background: 'rgba(10,10,15,0.02)',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '24px',
              }}>
                {/* Corner accents */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: '1px solid rgba(10,10,15,0.4)', borderLeft: '1px solid rgba(10,10,15,0.4)' }} />
                <div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', borderTop: '1px solid rgba(10,10,15,0.4)', borderRight: '1px solid rgba(10,10,15,0.4)' }} />

                {/* Badge header */}
                <div style={{
                  background: '#0a0a0f',
                  padding: '10px 20px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '10px', letterSpacing: '0.22em', color: 'rgba(240,244,255,0.7)', textTransform: 'uppercase' }}>
                    ID — AL-001
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#3dffa0', animation: 'pulse 2s infinite' }} />
                    <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '10px', letterSpacing: '0.18em', color: '#3dffa0' }}>ACTIVE</span>
                  </div>
                </div>

                {/* Photo area */}
                <div style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  background: 'rgba(10,10,15,0.04)',
                  borderBottom: '1px solid var(--orbit-bright)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <img
                    src="/photo.jpg"
                    alt="Adam Le"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: '8px',
                  }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(10,10,15,0.2)" strokeWidth="1">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                    <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(10,10,15,0.25)' }}>
                      ADD PHOTO.JPG TO /PUBLIC
                    </span>
                  </div>
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(10,10,15,0.015) 3px, rgba(10,10,15,0.015) 4px)',
                    pointerEvents: 'none',
                  }} />
                </div>

                {/* Info rows */}
                <div style={{ padding: '0 20px' }}>
                  {[
                    { label: 'Name', value: 'Adam Le' },
                    { label: 'Studying', value: 'Computer Engineering' },
                    { label: 'University', value: 'UC Irvine' },
                    { label: 'Class', value: '2027' },
                    { label: 'Based', value: 'Irvine, CA' },
                    { label: 'Status', value: 'Open to opportunities' },
                  ].map(item => (
                    <div key={item.label} style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'baseline',
                      paddingBottom: '14px', marginTop: '14px',
                      borderBottom: '1px solid var(--orbit)',
                    }}>
                      <span className="mono" style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'var(--star-faint)', textTransform: 'uppercase' }}>
                        {item.label}
                      </span>
                      <span style={{ fontSize: '14px', color: 'var(--star-dim)', fontWeight: 300 }}>{item.value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 0' }}>
                    <span className="dot green" />
                    <span className="mono" style={{ fontSize: '10px', letterSpacing: '0.14em', color: '#16a34a' }}>AVAILABLE</span>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {[
                  { label: 'GitHub', href: 'https://github.com/adamvl7' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adam-le-4228252b7' },
                  { label: 'Email', href: 'mailto:adam.le.7184@gmail.com' },
                ].map(l => (
                  <a key={l.label} href={l.href} className="lh mono" style={{
                    fontSize: '10px', letterSpacing: '0.14em', color: 'var(--star-faint)',
                    textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--star)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--star-faint)')}
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section style={{ padding: '0 48px 120px', maxWidth: '1300px', margin: '0 auto' }}>
          <div className="hr" style={{ marginBottom: '80px' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '56px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="hr-w" />
              <span className="eyebrow">Technical Skills</span>
              <span className="mono" style={{
                fontSize: '11px', padding: '3px 10px',
                border: '1px solid rgba(61, 255, 161, 0.76)',
                color: '#30c67d', letterSpacing: '0.12em',
              }}>• VERIFIED</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '56px' }}>
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat}>
                <h3 className="mono" style={{
                  fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--star)', marginBottom: '22px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid var(--orbit-bright)',
                }}>
                  {cat}
                </h3>
                <ul style={{ listStyle: 'none' }}>
                  {items.map(item => (
                    <li key={item} className="skill-item">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="marquee-track">
          <div className="marquee-inner">
            {Array(4).fill(['COMPUTER ENGINEERING', 'UC IRVINE', 'AI / ML', 'FULL-STACK', 'NEXT.JS', 'FASTAPI', 'TENSORFLOW', 'OPEN TO WORK', 'CLASS OF 2027']).flat().map((w, i) => (
              <span key={i} className="mono" style={{
                fontSize: '10px', letterSpacing: '0.3em', marginRight: '52px',
                color: i % 6 === 0 ? 'rgba(240,244,255,0.7)' : 'var(--star-faint)',
              }}>
                {w} &nbsp;·
              </span>
            ))}
          </div>
        </div>

        <footer style={{ padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="mono" style={{ fontSize: '9px', color: 'var(--star-faint)', letterSpacing: '0.1em' }}>© 2025 ADAM LE</span>
          <span className="mono" style={{ fontSize: '9px', color: 'var(--star-faint)', letterSpacing: '0.1em' }}>BUILT IN THE VOID</span>
        </footer>
      </div>
    </>
  )
}
