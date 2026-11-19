import { useCallback, useEffect, useRef } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { markIntroSeen } from '../lib/intro'

const DURATION = 2.6
const EASE_OUT = [0.22, 1, 0.36, 1]
const EASE_CURTAIN = [0.76, 0, 0.24, 1]

const WORDS = ['JAFER', 'SATHIK', 'B']
const ROLES = ['Full-Stack Developer', 'AI Engineer', 'Cybersecurity Enthusiast']

// Give every letter a running index so the reveal staggers across the whole name.
let letterCount = 0
const NAME = WORDS.map((word) =>
  word.split('').map((ch) => ({ ch, i: letterCount++ })),
)

function Corner({ className }) {
  return (
    <span
      aria-hidden="true"
      className={`border-accent absolute h-5 w-5 ${className}`}
    />
  )
}

export default function Intro({ onDone }) {
  const ref = useRef(null)
  const doneRef = useRef(false)
  const onDoneRef = useRef(onDone)
  const progress = useMotionValue(0)
  const percent = useTransform(progress, (v) => Math.round(v))
  const barScale = useTransform(progress, (v) => v / 100)

  useEffect(() => {
    onDoneRef.current = onDone
  })

  const finish = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    markIntroSeen()
    document.body.style.overflow = ''
    onDoneRef.current?.()
  }, [])

  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
    document.body.style.overflow = 'hidden'

    let cancelled = false
    let timer
    const controls = animate(progress, 100, {
      duration: DURATION,
      ease: EASE_OUT,
      onComplete: () => {
        const fonts = document.fonts?.ready ?? Promise.resolve()
        const cap = new Promise((resolve) => setTimeout(resolve, 1500))
        Promise.race([fonts, cap]).then(() => {
          if (!cancelled) timer = setTimeout(finish, 300)
        })
      },
    })

    return () => {
      cancelled = true
      controls.stop()
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [progress, finish])

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Loading portfolio"
      tabIndex={-1}
      onClick={finish}
      onKeyDown={(e) => {
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          finish()
        }
      }}
      className="fixed inset-0 z-[100] cursor-pointer outline-none"
    >
      {/* Curtains: split open on exit */}
      <motion.div
        className="bg-surface absolute inset-x-0 top-0 h-1/2"
        exit={{
          y: '-100%',
          transition: { duration: 0.9, ease: EASE_CURTAIN, delay: 0.2 },
        }}
      />
      <motion.div
        className="bg-surface absolute inset-x-0 bottom-0 h-1/2"
        exit={{
          y: '100%',
          transition: { duration: 0.9, ease: EASE_CURTAIN, delay: 0.2 },
        }}
      />

      <motion.div
        className="relative z-10 h-full overflow-hidden"
        exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.3 } }}
      >
        {/* Background: grid + glow */}
        <div
          aria-hidden="true"
          className="grid-overlay pointer-events-none absolute inset-0"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(255,91,46,0.16), transparent 70%)',
          }}
        />

        {/* One scan line sweeping top to bottom */}
        <motion.div
          aria-hidden="true"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: '100vh', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.7, delay: 0.2, ease: 'easeInOut' }}
          className="via-accent pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent shadow-[0_0_24px_rgba(255,91,46,0.9)]"
        />

        {/* HUD frame */}
        <Corner className="top-5 left-5 border-t-2 border-l-2" />
        <Corner className="top-5 right-5 border-t-2 border-r-2" />
        <Corner className="bottom-5 left-5 border-b-2 border-l-2" />
        <Corner className="right-5 bottom-5 border-r-2 border-b-2" />

        <div className="absolute inset-x-0 top-0 flex justify-between px-9 pt-9 font-mono text-[11px] tracking-[0.3em] text-slate-500 uppercase sm:px-12 sm:pt-11">
          <span>AVAILABLE FOR WORK</span>
          <span>{new Date().getFullYear()}</span>
        </div>

        {/* Centre: logo mark, name, roles */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

          <h1
            aria-label="Jafer Sathik B"
            className="font-display flex flex-wrap justify-center gap-x-[0.3em] text-5xl leading-none font-bold tracking-tight text-white sm:text-7xl md:text-8xl"
          >
            {NAME.map((word, w) => (
              <span key={w} className="inline-flex" aria-hidden="true">
                {word.map(({ ch, i }) => (
                  <span key={i} className="inline-block overflow-hidden py-1">
                    <motion.span
                      initial={{ y: '110%', opacity: 0, filter: 'blur(8px)' }}
                      animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                      transition={{
                        duration: 0.7,
                        delay: 0.3 + i * 0.045,
                        ease: EASE_OUT,
                      }}
                      className={`inline-block ${w === NAME.length - 1 ? 'text-gradient' : ''}`}
                    >
                      {ch}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 1, ease: EASE_OUT }}
            className="via-accent mt-7 h-px w-full max-w-md bg-gradient-to-r from-transparent to-transparent"
          />

          <div className="font-body mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-slate-300 sm:text-base">
            {ROLES.map((role, i) => (
              <motion.span
                key={role}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 + i * 0.18 }}
                className="flex items-center gap-2"
              >
                <span className="bg-accent inline-block h-1.5 w-1.5" />
                {role}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bottom row: status left, counter right */}
        <div
          className="absolute inset-x-0 bottom-0 flex items-end justify-between px-9 sm:px-12"
          style={{ paddingBottom: 'max(2.25rem, env(safe-area-inset-bottom))' }}
        >
          <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] text-slate-400 uppercase">
            <span className="bg-accent h-1.5 w-1.5 animate-pulse rounded-full" />
            Loading portfolio
          </p>

          <p className="font-display text-5xl leading-none font-bold text-white/90 tabular-nums sm:text-5xl">
            <motion.span>{percent}</motion.span>
            <span className="text-accent text-2xl sm:text-3xl">%</span>
          </p>
        </div>

        {/* Full-width progress line */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
          <motion.div
            style={{ scaleX: barScale }}
            className="from-accent-warm via-accent to-accent-gold h-full origin-left bg-gradient-to-r"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}