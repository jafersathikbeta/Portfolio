import { useCallback, useEffect, useRef } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { markIntroSeen } from '../lib/intro'

const DURATION = 2
const EASE_OUT = [0.22, 1, 0.36, 1]
const EASE_CURTAIN = [0.76, 0, 0.24, 1]
const LETTERS = ['J', 'S', 'B']

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

      {/* Soft accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,91,46,0.13), transparent 70%)',
        }}
      />

      <motion.div
        className="relative z-10 h-full"
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
      >
        {/* Centre: big wordmark, letters rise out of a mask */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            aria-label="JSB"
            className="font-display flex items-baseline text-7xl font-bold tracking-tight text-white sm:text-8xl md:text-9xl"
          >
            {LETTERS.map((letter, i) => (
              <span key={letter} className="inline-block overflow-hidden py-2">
                <motion.span
                  aria-hidden="true"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: EASE_OUT }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              </span>
            ))}
            <motion.span
              aria-hidden="true"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.7 }}
              className="text-accent inline-block origin-bottom-left"
            >
              .
            </motion.span>
          </h1>
        </div>

        {/* Bottom row: name left, percentage right */}
        <div
          className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-8 sm:px-10 sm:pb-10"
          style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-left"
          >
            <p className="font-display text-xs font-semibold tracking-[0.3em] text-white/90 uppercase sm:text-sm">
              Jafer Sathik B
            </p>
            <p className="font-body mt-1.5 text-xs text-slate-400 sm:text-sm">
              Full-Stack · AI · Security
            </p>
          </motion.div>

          <p className="font-display text-5xl leading-none font-bold text-white/90 tabular-nums sm:text-7xl">
            <motion.span>{percent}</motion.span>
            <span className="text-accent text-2xl sm:text-3xl">%</span>
          </p>
        </div>

        {/* Full-width progress line along the very bottom */}
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