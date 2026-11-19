import { useCallback, useEffect, useRef } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { markIntroSeen } from '../lib/intro'

const DURATION = 1.8
const EASE_OUT = [0.22, 1, 0.36, 1]
const EASE_CURTAIN = [0.76, 0, 0.24, 1]

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
        className="absolute inset-x-0 top-0 h-1/2 bg-surface"
        exit={{
          y: '-100%',
          transition: { duration: 0.9, ease: EASE_CURTAIN, delay: 0.2 },
        }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-surface"
        exit={{
          y: '100%',
          transition: { duration: 0.9, ease: EASE_CURTAIN, delay: 0.2 },
        }}
      />

      {/* Soft accent glow behind the content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 35% at 50% 50%, rgba(255,91,46,0.12), transparent 70%)',
        }}
      />

      {/* Centre content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center gap-5 px-6 text-center"
        exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.25 } }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="glass flex h-20 w-24 items-center justify-center bg-surface font-display text-2xl font-bold tracking-tight text-white"
        >
          JSB<span className="text-accent">.</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="font-display text-xs font-semibold tracking-[0.35em] text-white/90 uppercase sm:text-sm">
            Jafer Sathik B
          </p>
          <p className="font-body mt-2 text-xs tracking-wide text-slate-400 sm:text-sm">
            Full-Stack · AI · Security
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-2 w-48 sm:w-56"
        >
          <div className="h-[2px] w-full overflow-hidden bg-white/10">
            <motion.div
              style={{ scaleX: barScale }}
              className="h-full origin-left bg-gradient-to-r from-accent-warm via-accent to-accent-gold"
            />
          </div>
          <p className="text-accent mt-3 font-mono text-[11px] tracking-widest tabular-nums">
            <motion.span>{percent}</motion.span>%
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}