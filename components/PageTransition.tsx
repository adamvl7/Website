import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [stage, setStage] = useState<'idle' | 'out' | 'in'>('idle')

  useEffect(() => {
    const handleStart = () => setStage('out')

    const handleComplete = () => {
      setDisplayChildren(children)
      setStage('in')
      setTimeout(() => setStage('idle'), 500)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
    }
  }, [router, children])

  useEffect(() => {
    setDisplayChildren(children)
    setStage('in')
    setTimeout(() => setStage('idle'), 500)
  }, [children])

  const opacity = stage === 'out' ? 0 : 1
  const translateY = stage === 'out' ? '-12px' : stage === 'in' ? '0px' : '0px'
  const blur = stage === 'out' ? '6px' : '0px'

  return (
    <div style={{
      opacity,
      transform: `translateY(${translateY})`,
      filter: `blur(${blur})`,
      transition: stage === 'out'
        ? 'opacity 0.25s ease, transform 0.25s ease, filter 0.25s ease'
        : 'opacity 0.45s ease, transform 0.45s ease, filter 0.45s ease',
    }}>
      {displayChildren}
    </div>
  )
}
