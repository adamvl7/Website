import type { AppProps } from 'next/app'
import { useState } from 'react'
import '../styles/globals.css'
import Cursor from '../components/Cursor'
import Navbar from '../components/Navbar'
import StarField from '../components/StarField'
import BigBang from '../components/BigBang'
import PageTransition from '../components/PageTransition'

export default function App({ Component, pageProps }: AppProps) {
  const [banged, setBanged] = useState(false)

  return (
    <>
      {!banged && <BigBang onComplete={() => setBanged(true)} />}
      <div className={banged ? 'site-reveal' : ''} style={{ opacity: banged ? 1 : 0 }}>
        <StarField />
        <Cursor />
        <Navbar />
        <PageTransition>
          <Component {...pageProps} />
        </PageTransition>
      </div>
    </>
  )
}
