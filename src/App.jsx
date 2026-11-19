import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import { setLenis } from './lib/lenis'
import { shouldShowIntro } from './lib/intro'
import useDeviceProfile from './hooks/useDeviceProfile'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SloganBanner from './components/SloganBanner'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import Intro from './components/Intro'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  const { smooth } = useDeviceProfile()
  const [introActive, setIntroActive] = useState(shouldShowIntro)

  useEffect(() => {
    if (!smooth) {
      setLenis(null)
      return undefined
    }
    const lenis = new Lenis()
    setLenis(lenis)
    let id
    const raf = (t) => {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      setLenis(null)
    }
  }, [smooth])

  return (
    <div className="min-h-svh bg-surface text-slate-200">
      <AnimatePresence>
        {introActive && (
          <Intro key="intro" onDone={() => setIntroActive(false)} />
        )}
      </AnimatePresence>
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero ready={!introActive} />
        <SloganBanner />
        <About />
        <Experience />
        <Projects />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}