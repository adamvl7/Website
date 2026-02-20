import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  stack: string[]
  year: string
  github: string
  highlights: string[]
  image?: string
  inProgress?: boolean
  planetColor: string
  glowColor: string
  orbitBase: number
  size: number
  startAngle: number
  speed: number
}

const projects: Project[] = [
  {
    id: '01',
    title: 'IT Ops Copilot',
    subtitle: 'Backend Automation Platform',
    description:
      '• Built a lightweight ticket management REST API using Python and FastAPI, enabling full CRUD functionality for over 50+ dynamically generated service requests stored persistently in CSV format.\n• Implemented data ingestion and validation pipelines with CSV I/O, Pydantic models, and automated timestamps, cutting manual IT request entry time by over 90% compared to spreadsheet-based tracking.\n• Optimized the local development environment using Uvicorn and Swagger UI, streamlining testing and boosting debugging efficiency by around 40%.',
    stack: ['FastAPI', 'Python', 'REST API', 'CSV', 'Swagger UI'],
    year: '2025',
    github: 'https://github.com/adamvl7/it-ops-copilot.git',
    highlights: [
      'RESTful API design',
      'Data serialization',
      'Automation-ready architecture',
      'Swagger UI integration',
    ],
    image: '/images/It_Ops_Copilot.png',
    planetColor: '#1f2937',
    glowColor: 'rgba(99, 102, 241, 0.35)',
    orbitBase: 0.26,
    size: 54,
    startAngle: 0.5,
    speed: 0.00008,
  },
  {
    id: '02',
    title: 'Pickleball Match Tracker',
    subtitle: 'Full-Stack Analytics Web App',
    description:
      '• Engineered a Pickleball Match Tracker web app using Next.js, TypeScript, and Tailwind CSS to streamline match logging and performance tracking, replacing manual spreadsheets with an interactive, database-ready platform.\n• Learned core frontend and logic architecture with React hooks and localStorage persistence, enabling players to record and manage 100+ matches including opponent DUPR, scores, and outcomes, with automatic win/loss analytics and clean UI design.\n• Planned an upcoming AI/ML module leveraging Python and Elo-based models to predict optimal opponent DUPR ranges, aiming to improve match difficulty recommendations by 25-35% through personalized performance insights.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    year: '2025',
    github: 'https://github.com/adamvl7/pickleball-match-tracker.git',
    highlights: [
      'Real-time stats dashboard',
      'DUPR rating tracking',
      'Matchup analytics',
      'Performance trends',
    ],
    image: '/images/Pickleball_Match_Tracker.png',
    planetColor: '#0f172a',
    glowColor: 'rgba(34, 197, 94, 0.3)',
    orbitBase: 0.39,
    size: 68,
    startAngle: 2.3,
    speed: 0.000055,
  },
  {
    id: '03',
    title: 'AI Image Classifier',
    subtitle: 'Deep Learning Web App',
    description:
      '• Developed an interactive image classification web application using Streamlit and a pre-trained MobileNetV2 CNN model, enabling real-time object detection with over 90% accuracy across 1,000+ ImageNet classes.\n• Optimized image preprocessing pipelines using OpenCV and NumPy, reducing model inference latency by around 40% through efficient resizing, normalization, and batching of uploaded images.\n• Put together an accessible user interface for image uploads and top-3 AI predictions, resulting in a 3-second average classification time on CPU, demonstrating production-ready deployment for lightweight AI apps.',
    stack: ['Python', 'TensorFlow', 'MobileNetV2', 'Streamlit', 'OpenCV', 'NumPy'],
    year: '2024',
    github: 'https://github.com/adamvl7/AI-image-Identifier-.git',
    highlights: ['90%+ accuracy', 'MobileNetV2 (ImageNet)', 'Sub-1s inference', 'Top-3 predictions'],
    image: '/images/AI_Project.png',
    planetColor: '#111827',
    glowColor: 'rgba(59, 130, 246, 0.32)',
    orbitBase: 0.53,
    size: 78,
    startAngle: 4.2,
    speed: 0.00004,
  },
  {
    id: '04',
    title: 'PharmaGuard AI',
    subtitle: 'Full-Stack Pharmaceutical Safety Platform',
    description:
      '• Built a full-stack pharmaceutical safety platform using FastAPI, PostgreSQL, and Next.js, leveraging a Retrieval-Augmented Generation (RAG) architecture to ingest, normalize, and index official FDA drug labels, enabling structured search over 10,000+ lines of regulatory drug text with citation-backed, non-hallucinatory responses.\n• Implemented a semantic search and retrieval system using SentenceTransformers embeddings and chunked FDA label storage, improving question-to-evidence matching accuracy by around 60-75% compared to keyword-only retrieval and significantly reducing irrelevant answer snippets.\n• Developed a citation-based chat interface with real-time chunk preview, drug-to-drug interaction comparison, and FDA-grounded response logic, reducing hallucinated outputs to 0% and enabling users to trace safety-critical answers directly to official source text in under 2 seconds.',
    stack: ['AI/ML', 'API', 'Tailwind CSS', 'Next.js', 'Swagger UI', 'Python'],
    year: '2026',
    github: 'https://github.com/adamvl7/PharmaGuard-AI.git',
    highlights: ['RAG architecture', 'FDA-grounded responses', 'Semantic retrieval', 'In active development'],
    image: '',
    planetColor: '#3f2a12',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    orbitBase: 0.64,
    size: 62,
    startAngle: 5.4,
    speed: 0.000032,
    inProgress: true,
  },
]

export default function Projects() {
  const [clock, setClock] = useState(0)
  const [selected, setSelected] = useState<Project | null>(null)
  const [hoveredPlanetId, setHoveredPlanetId] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [viewport, setViewport] = useState({ width: 1280, height: 900 })

  useEffect(() => {
    let raf = 0
    const start = performance.now()

    const animate = (now: number) => {
      setClock(now - start)
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const onResize = () =>
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      })

    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const stars = useMemo(() => {
    return Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: (i * 47) % 100,
      y: (i * 29) % 100,
      size: (i % 4) + 1,
      alpha: 0.08 + (i % 5) * 0.04,
    }))
  }, [])

  const isSmall = viewport.width < 960
  const sceneHeight = 'calc(100vh - 60px)'
  const minSide = Math.min(viewport.width, viewport.height)
  const orbitScale = Math.max(180, minSide * 0.9)

  return (
    <>
      <Head>
        <title>Projects - Adam Le</title>
      </Head>

      <div className="page">
        <section
          style={{
            minHeight: '100vh',
            paddingTop: '60px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 25% 20%, rgba(15,23,42,0.11), transparent 36%), radial-gradient(circle at 75% 80%, rgba(30,41,59,0.12), transparent 40%)',
            }}
          />

          {stars.map(star => (
            <span
              key={star.id}
              style={{
                position: 'absolute',
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                borderRadius: '50%',
                background: `rgba(10,10,15,${star.alpha})`,
                pointerEvents: 'none',
              }}
            />
          ))}

          <div
            style={{
              position: 'relative',
              zIndex: 2,
              height: sceneHeight,
            }}
          >
            <div
              style={{
                position: 'relative',
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: '28px', left: '32px', zIndex: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span className="dot static" />
                  <span className="mono" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'var(--star-faint)' }}>
                    PROJECT ORBIT MAP
                  </span>
                </div>
                <p className="mono" style={{ fontSize: '9px', color: 'var(--star-faint)', letterSpacing: '0.12em' }}>
                  Click a planet to open its project details
                </p>
              </div>

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '92%',
                    maxWidth: '900px',
                    aspectRatio: '1 / 1',
                  }}
                >
                  {[...projects]
                    .sort((a, b) => a.orbitBase - b.orbitBase)
                    .map((project, i) => (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: `${orbitScale * project.orbitBase}px`,
                        height: `${orbitScale * project.orbitBase * 0.66}px`,
                        transform: 'translate(-50%, -50%)',
                        border: '1px solid rgba(10,10,15,0.1)',
                        borderRadius: '50%',
                      }}
                    />
                  ))}

                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: '72px',
                      height: '72px',
                      transform: 'translate(-50%, -50%)',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.75) 45%, rgba(10,10,15,0.1) 100%)',
                      boxShadow: '0 0 60px rgba(10,10,15,0.22)',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <span className="mono" style={{ fontSize: '9px', letterSpacing: '0.16em', color: 'rgba(245,245,240,0.85)' }}>
                      PROJECTS
                    </span>
                  </div>

                  {projects.map(project => {
                    const rx = orbitScale * project.orbitBase
                    const ry = rx * 0.66
                    const angle = project.startAngle + clock * project.speed
                    const x = Math.cos(angle) * rx
                    const y = Math.sin(angle) * ry
                    const selectedPlanet = selected?.id === project.id
                    const hoveredPlanet = hoveredPlanetId === project.id

                    return (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => {
                          setSelected(project)
                          setHoveredPlanetId(project.id)
                        }}
                        onMouseEnter={() => setHoveredPlanetId(project.id)}
                        onMouseLeave={() => setHoveredPlanetId(prev => (prev === project.id ? null : prev))}
                        aria-label={`Open ${project.title}`}
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${hoveredPlanet ? 1.1 : 1})`,
                          width: `${project.size}px`,
                          height: `${project.size}px`,
                          borderRadius: '50%',
                          border:
                            selectedPlanet || hoveredPlanet
                              ? '1px solid rgba(10,10,15,0.6)'
                              : '1px solid rgba(10,10,15,0.25)',
                          background: `radial-gradient(circle at 30% 30%, #f8fafc, ${project.planetColor} 55%, #020617 100%)`,
                          boxShadow: hoveredPlanet
                            ? `0 0 55px ${project.glowColor}, 0 0 0 8px rgba(255,255,255,0.35)`
                            : `0 0 35px ${project.glowColor}`,
                          transition: 'transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease',
                          cursor: 'none',
                          zIndex: 5,
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            inset: '-12px',
                            borderRadius: '50%',
                            border: `1px solid ${hoveredPlanet ? 'rgba(10,10,15,0.35)' : 'rgba(10,10,15,0)'}`,
                            opacity: hoveredPlanet ? 1 : 0,
                            transform: `scale(${hoveredPlanet ? 1.12 : 0.92})`,
                            transition: 'all 0.25s ease',
                          }}
                        />
                        {project.inProgress && (
                          <span
                            style={{
                              position: 'absolute',
                              inset: '-18px',
                              borderRadius: '50%',
                              border: '1px dashed rgba(245, 158, 11, 0.55)',
                              animation: 'orbitSpin 8s linear infinite',
                              opacity: 0.9,
                            }}
                          />
                        )}
                        {project.inProgress && (
                          <span
                            style={{
                              position: 'absolute',
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',
                              right: '4px',
                              top: '4px',
                              background: '#f59e0b',
                              boxShadow: '0 0 16px rgba(245, 158, 11, 0.9)',
                              animation: 'pulse 1.6s ease infinite',
                            }}
                          />
                        )}
                        <span
                          style={{
                            position: 'absolute',
                            inset: '-24px',
                            borderRadius: '50%',
                            border: `1px dashed ${hoveredPlanet ? 'rgba(10,10,15,0.28)' : 'rgba(10,10,15,0)'}`,
                            opacity: hoveredPlanet ? 1 : 0,
                            animation: hoveredPlanet ? 'orbitSpin 5s linear infinite' : 'none',
                          }}
                        />
                        <span
                          className="mono"
                          style={{
                            position: 'absolute',
                            left: '50%',
                            top: `${project.size + 14}px`,
                            transform: 'translateX(-50%)',
                            whiteSpace: 'nowrap',
                            color: hoveredPlanet ? 'rgba(10,10,15,1)' : 'var(--star)',
                            fontSize: '10px',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            background: hoveredPlanet ? 'rgba(255,255,255,0.94)' : 'rgba(255,255,255,0.76)',
                            border: hoveredPlanet
                              ? '1px solid rgba(10,10,15,0.32)'
                              : '1px solid rgba(10,10,15,0.18)',
                            padding: '4px 8px',
                            transition: 'all 0.25s ease',
                          }}
                        >
                          {project.title}
                          {project.inProgress ? ' (WIP)' : ''}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setDrawerOpen(v => !v)}
              aria-label={drawerOpen ? 'Close projects list' : 'Open projects list'}
              style={{
                position: 'absolute',
                right: drawerOpen ? `${isSmall ? 'min(88vw, 360px)' : '380px'}` : '0',
                top: '50%',
                transform: 'translateY(-50%)',
                border: '1px solid var(--orbit-bright)',
                borderRight: 'none',
                background: 'rgba(255,255,255,0.94)',
                width: '44px',
                height: '156px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'right 0.35s ease',
                zIndex: 9,
                cursor: 'none',
              }}
            >
              <span
                className="mono"
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  color: 'var(--star-dim)',
                  textTransform: 'uppercase',
                }}
              >
                {drawerOpen ? 'Close List' : 'Projects List'}
              </span>
            </button>

            <aside
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                height: '100%',
                width: isSmall ? 'min(88vw, 360px)' : '380px',
                padding: isSmall ? '26px 20px' : '36px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                background: 'rgba(255,255,255,0.86)',
                backdropFilter: 'blur(8px)',
                borderLeft: '1px solid var(--orbit)',
                transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.35s ease',
                zIndex: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="hr-w" />
                <span className="eyebrow">Current Projects</span>
              </div>

              {projects.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelected(p)}
                  style={{
                    textAlign: 'left',
                    border: '1px solid var(--orbit)',
                    background:
                      selected?.id === p.id ? 'rgba(10,10,15,0.08)' : 'rgba(255,255,255,0.55)',
                    padding: '12px',
                    cursor: 'none',
                  }}
                >
                  <p className="mono" style={{ fontSize: '9px', letterSpacing: '0.14em', color: 'var(--star-faint)', marginBottom: '6px' }}>
                    {p.id} - {p.year}
                  </p>
                  <p style={{ fontFamily: "'Syne', sans-serif", color: 'var(--star)', fontSize: '16px', marginBottom: '4px' }}>
                    {p.title}
                    {p.inProgress ? ' (WIP)' : ''}
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--star-faint)' }}>{p.subtitle}</p>
                </button>
              ))}

              <p style={{ marginTop: 'auto', fontSize: '12px', color: 'var(--star-faint)', lineHeight: 1.7 }}>
                The planets orbit slowly to mirror long-term project growth. Open any one to inspect details.
              </p>
            </aside>
          </div>
        </section>

        {selected && (
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 300,
              background: 'rgba(5, 8, 12, 0.45)',
              backdropFilter: 'blur(6px)',
              display: 'grid',
              placeItems: 'center',
              padding: '20px',
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                width: 'min(900px, 96vw)',
                maxHeight: '90vh',
                overflowY: 'auto',
                background: 'rgba(255,255,255,0.96)',
                border: '1px solid var(--orbit-bright)',
                boxShadow: '0 24px 70px rgba(0,0,0,0.2)',
                padding: '22px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                <div>
                  <p className="mono" style={{ fontSize: '10px', letterSpacing: '0.14em', color: 'var(--star-faint)' }}>
                    {selected.id} - {selected.year}
                  </p>
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '30px', color: 'var(--star)' }}>
                    {selected.title}
                  </h2>
                  <p style={{ color: 'var(--star-faint)' }}>{selected.subtitle}</p>
                  {selected.inProgress && (
                    <p
                      className="mono"
                      style={{
                        marginTop: '8px',
                        fontSize: '10px',
                        letterSpacing: '0.12em',
                        color: '#b45309',
                        textTransform: 'uppercase',
                      }}
                    >
                      In Progress
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  style={{
                    border: '1px solid var(--orbit-bright)',
                    background: 'transparent',
                    padding: '8px 10px',
                    fontFamily: "'Syne Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    cursor: 'none',
                  }}
                >
                  CLOSE
                </button>
              </div>

              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9',
                  border: '1px solid var(--orbit)',
                  marginBottom: '18px',
                  background: 'rgba(10,10,15,0.04)',
                }}
              >
                {selected.image ? (
                  <Image src={selected.image} alt={selected.title} fill style={{ objectFit: 'contain' }} />
                ) : (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'grid',
                      placeItems: 'center',
                      background:
                        'radial-gradient(circle at 30% 30%, rgba(245,158,11,0.2), rgba(10,10,15,0.04))',
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        fontSize: '11px',
                        letterSpacing: '0.12em',
                        color: 'rgba(10,10,15,0.7)',
                        textTransform: 'uppercase',
                      }}
                    >
                      Preview Coming Soon
                    </span>
                  </div>
                )}
              </div>

              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--star-dim)',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  whiteSpace: 'pre-line',
                }}
              >
                {selected.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                {selected.highlights.map(h => (
                  <span
                    key={h}
                    className="mono"
                    style={{
                      fontSize: '9px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      border: '1px solid var(--orbit-bright)',
                      padding: '4px 8px',
                      color: 'var(--star-dim)',
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {selected.stack.map(tech => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>

              <a href={selected.github} target="_blank" rel="noreferrer" className="btn">
                GitHub {'->'}
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
