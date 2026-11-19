import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { HiArrowDown, HiDownload } from 'react-icons/hi'
import Scramble from './Scramble'
import ErrorBoundary from './ErrorBoundary'
import useDeviceProfile from '../hooks/useDeviceProfile'
import { scrollToTarget } from '../lib/lenis'

const HeroScene = lazy(() => import('./HeroScene'))

const roles = ['Full-Stack Developer', 'AI Engineer', 'Cybersecurity Enthusiast']

function Typewriter({ play, reduce }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [display, setDisplay] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!play) return undefined
    if (reduce) {
      setDisplay(roles[0])
      return undefined
    }
    const current = roles[roleIndex]
    const speed = deleting ? 40 : 80

    if (!deleting && display === current) {
      const pause = setTimeout(() => setDeleting(true), 1800)
      return () => clearTimeout(pause)
    }

    if (deleting && display === '') {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
      return undefined
    }

    const tick = setTimeout(() => {
      setDisplay(
        deleting
          ? current.slice(0, display.length - 1)
          : current.slice(0, display.length + 1),
      )
    }, speed)

    return () => clearTimeout(tick)
  }, [play, display, deleting, roleIndex, reduce])

  return (
    <>
      <span className="sr-only">{roles.join(', ')}</span>
      <span aria-hidden="true" className="typewriter-cursor text-slate-100">
        {display}
      </span>
    </>
  )
}

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay },
  }),
}

export default function Hero({ ready = true }) {
  const { scene } = useDeviceProfile()
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(true)
  const state = ready ? 'show' : 'hidden'

  // Pause the 3D render loop once the hero is scrolled out of view.
  useEffect(() => {
    const el = sectionRef.current
    if (!el || !('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const scrollToProjects = () => {
    scrollToTarget('#projects', { offset: -72 })
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="mesh-bg relative flex min-h-svh items-center overflow-hidden"
    >
      <div className="grid-overlay pointer-events-none absolute inset-0" />

      {scene !== 'off' && (
        <>
          <div className="absolute inset-0 opacity-60 md:opacity-70">
            <ErrorBoundary>
              <Suspense fallback={null}>
                <HeroScene lite={scene === 'lite'} active={inView} />
              </Suspense>
            </ErrorBoundary>
          </div>
          {/* Keeps the text readable on top of the wireframe */}
          <div className="from-surface/85 via-surface/55 to-surface/20 pointer-events-none absolute inset-0 bg-gradient-to-r md:from-surface/70 md:via-surface/30" />
        </>
      )}

      <div className="bg-accent-warm/20 animate-float pointer-events-none absolute top-1/4 -left-32 h-72 w-72 rounded-full blur-[100px]" />
      <div
        className="bg-accent-gold/20 animate-float pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full blur-[110px]"
        style={{ animationDelay: '2s' }}
      />

      <div className="wrap relative z-10 pt-28 pb-20 md:pt-32">
        <motion.p
          variants={rise}
          custom={0}
          initial="hidden"
          animate={state}
          className="eyebrow"
        >
          Developer Portfolio
        </motion.p>

        <motion.h1
          variants={rise}
          custom={0.1}
          initial="hidden"
          animate={state}
          className="leading-none"
        >
          <span className="h-hello block">Hi, I&apos;m</span>
          <span className="h-name mt-2 block md:mt-3">
            <Scramble text="Jafer Sathik B" play={ready} />
          </span>
        </motion.h1>

        <motion.p
          variants={rise}
          custom={0.3}
          initial="hidden"
          animate={state}
          className="font-display mt-6 min-h-[2rem] text-xl text-slate-300 sm:text-2xl md:text-3xl"
        >
          <Typewriter play={ready} reduce={reduce} />
        </motion.p>

        <motion.p
          variants={rise}
          custom={0.45}
          initial="hidden"
          animate={state}
          className="font-body mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg"
        >
          Building production-ready full-stack systems, AI pipelines, and
          defensive security tooling — shipped for real clients.
        </motion.p>

        <motion.div
          variants={rise}
          custom={0.6}
          initial="hidden"
          animate={state}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            onClick={scrollToProjects}
            className="group font-display from-accent-warm via-accent to-accent-gold btn-glow inline-flex min-h-12 items-center gap-3 rounded-full bg-gradient-to-r px-7 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            View My Work
            <HiArrowDown className="text-lg transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>

          <a
            href={`${import.meta.env.BASE_URL}Jafer Sathik B - CV.pdf`}
            download="Jafer Sathik B - Resume.pdf"
            className="group font-display hover:border-accent hover:text-accent inline-flex min-h-12 items-center gap-3 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            Download Resume
            <HiDownload className="text-lg transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}