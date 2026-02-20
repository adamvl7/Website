import Head from 'next/head'
import Link from 'next/link'

export default function ResumePage() {
  return (
    <>
      <Head>
        <title>Resume - Adam Le</title>
      </Head>

      <div className="page" style={{ paddingTop: '60px' }}>
        <section style={{ minHeight: '100vh', padding: '24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                marginBottom: '16px',
                flexWrap: 'wrap',
              }}
            >
              <h1
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '30px',
                  margin: 0,
                  color: 'var(--star)',
                }}
              >
                Resume
              </h1>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a href="/images/AdamLe_resume.pdf" download="AdamLe_resume.pdf" className="btn btn-solid">
                  Download PDF
                </a>
                <Link href="/" className="btn">
                  Home
                </Link>
              </div>
            </div>

            <div
              style={{
                border: '1px solid var(--orbit-bright)',
                background: 'rgba(255,255,255,0.92)',
                overflow: 'hidden',
              }}
            >
              <iframe
                src="/images/AdamLe_resume.pdf"
                style={{ width: '100%', height: 'calc(100vh - 170px)', border: 'none', display: 'block' }}
                title="Adam Le Resume"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
