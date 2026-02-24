import Head from 'next/head'
import { useState } from 'react'

const works = [
  {
    no: '001',
    name: 'Contractor',
    role: 'Full Stack Engineer',
    description: 'Contributed to student data migration and infrastructure reliability improvements using Python and AWS services.',
    bullets: [
      'Developed a Python script to migrate 2,000+ student records from locally stored CSV files to an AWS RDS database, reducing manual spreadsheet processing time by approximately 60%.',
      'Implemented data validation checks for missing fields, duplicate student IDs, and inconsistent date formatting, improving data consistency and preventing import errors during migration.',
      'Assisted in configuring AWS RDS and automated S3 backups under IT supervision, improving data reliability and reducing dependency on on-premise storage.',
    ],
    tags: ['Python', 'Amazon Relational Database Service (RDS)', 'SQL', 'CSV Data Processing', 'Data Validation'],
    status: 'ARCHIVED', year: 'May 2024 - June 2024',
  },
]

const statusColor: Record<string, string> = {
  ACTIVE: '#3dffa0',
  CURRENT: 'var(--red)',
  SHIPPED: 'var(--star-dim)',
  ARCHIVED: 'rgba(140, 142, 142, 0.59)',
}

export default function Work() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      <Head><title>Experience - Your Name</title></Head>
      <div className="page">

        {/* HERO */}
        <section style={{ paddingTop: '56px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ padding: '72px 48px 48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <div className="hr-red" />
              <span className="eyebrow">Operations Log</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '16px' }}>
                <span className="dot green" />
                <span className="mono" style={{ fontSize: '9px', color: '#2fc27b', letterSpacing: '0.14em' }}>ONLINE</span>
              </span>
                <span className="mono" style={{ marginLeft: 'auto', fontSize: '9px', color: 'var(--star-faint)', letterSpacing: '0.1em' }}>001 Entry</span>
            </div>

            <h1 className="display" style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: 'clamp(56px, 9vw, 120px)', lineHeight: 0.9,
              color: 'var(--star)', letterSpacing: '-0.03em',
            }}>
              Experience
            </h1>

            <p style={{ marginTop: '20px', fontSize: '14px', color: 'var(--star-faint)', fontWeight: 300 }}>
              Select an entry to expand.
            </p>
          </div>

          {/* orbital accent */}
          <div style={{
            position: 'absolute', right: '-200px', top: '-200px',
            width: '500px', height: '500px',
            borderRadius: '50%',
            border: '1px solid rgba(240,244,255,0.04)',
            pointerEvents: 'none',
          }} />
        </section>

        {/* TABLE */}
        <section style={{ padding: '0 48px 100px' }}>
          {/* Column headers */}
          <div className="mono" style={{
            display: 'grid',
            gridTemplateColumns: '64px 1fr 2fr 120px 140px',
            gap: '16px',
            padding: '14px 0',
            fontSize: '9px', letterSpacing: '0.16em', color: 'var(--star-faint)',
            textTransform: 'uppercase',
            borderBottom: '1px solid var(--orbit-bright)',
            borderTop: '1px solid var(--orbit-bright)',
          }}>
            <span>No</span>
            <span>Name</span>
            <span>Description</span>
            <span>Status</span>
            <span>Year</span>
          </div>

          {works.map((w, i) => (
            <div key={i}>
              <div
                className="work-row"
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr 2fr 120px 140px',
                  gap: '16px',
                  padding: '32px 0',
                  cursor: 'none',
                }}
              >
                <span
                  className="mono wnum"
                  style={{ fontSize: '11px', color: 'var(--star-faint)', letterSpacing: '0.06em', paddingTop: '3px' }}
                >
                  {w.no}
                </span>

                <div>
                  <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '5px', color: 'var(--star)' }}>{w.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--star-faint)', fontWeight: 300 }}>{w.role}</div>
                </div>

                <div>
                  <p style={{ fontSize: '13px', color: 'var(--star-dim)', lineHeight: 1.7, fontWeight: 300, marginBottom: '12px' }}>
                    {w.description}
                  </p>
                  <ul style={{ listStyle: 'disc', paddingLeft: '18px', marginBottom: '12px' }}>
                    {(w.bullets ?? []).map(point => (
                      <li key={point} style={{ fontSize: '13px', color: 'var(--star-dim)', lineHeight: 1.7, fontWeight: 300, marginBottom: '6px' }}>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {w.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>

                <span className="mono" style={{ fontSize: '10px', color: statusColor[w.status], paddingTop: '3px', letterSpacing: '0.1em' }}>
                  {w.status}
                </span>
                <span className="mono" style={{ fontSize: '11px', color: 'var(--star-faint)', paddingTop: '3px' }}>{w.year}</span>
              </div>

              {open === i && (
                <div style={{
                  padding: '28px 64px',
                  background: 'rgba(240,244,255,0.015)',
                  borderBottom: '1px solid var(--orbit)',
                  borderLeft: '1px solid rgba(240,244,255,0.4)',
                  animation: 'fadeUp 0.3s ease',
                  display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'center',
                }}>
                  {[
                    { label: 'Role', value: w.role },
                    { label: 'Period', value: w.year },
                    { label: 'Stack', value: w.tags.join(' | ') },
                  ].map(item => (
                    <div key={item.label}>
                      <p className="mono" style={{ fontSize: '9px', letterSpacing: '0.14em', color: 'var(--star-faint)', marginBottom: '6px' }}>
                        {item.label.toUpperCase()}
                      </p>
                      <p style={{ fontSize: '14px', color: 'var(--star-dim)', fontWeight: 300 }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        <footer style={{ padding: '32px 48px', display: 'flex', justifyContent: 'space-between' }}>
          <span className="mono" style={{ fontSize: '9px', color: 'var(--star-faint)', letterSpacing: '0.1em' }}>(c) 2025 ADAM LE</span>
        </footer>
      </div>
    </>
  )
}
