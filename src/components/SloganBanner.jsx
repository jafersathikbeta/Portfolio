import { motion, useReducedMotion } from 'framer-motion'

const SLOGAN = 'UNDERSTAND → DESIGN → BUILD → TEST → DEPLOY'
const REPEATS = 4

export default function SloganBanner() {
  const reduce = useReducedMotion()
  const sequence = Array.from({ length: REPEATS }, () => SLOGAN)

  return (
    <section
      aria-label="Engineering pipeline"
      className="border-accent/30 bg-surface-raised/40 relative overflow-hidden border-y py-4 shadow-[0_-1px_20px_rgba(255,91,46,0.12),0_1px_20px_rgba(255,209,102,0.1)]"
    >
      <div className="via-accent pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />
      <div className="via-accent-gold pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent" />

      <span className="sr-only">{SLOGAN}</span>

      {reduce ? (
        <div
          aria-hidden="true"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 px-5 text-center font-mono text-xs font-semibold tracking-[0.25em] uppercase sm:text-sm"
        >
          <span className="from-accent-warm via-accent to-accent-gold bg-gradient-to-r bg-clip-text text-transparent">
            {SLOGAN}
          </span>
        </div>
      ) : (
        <div className="flex overflow-hidden" aria-hidden="true">
          <motion.div
            className="flex shrink-0 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: { repeat: Infinity, repeatType: 'loop', duration: 28, ease: 'linear' },
            }}
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {sequence.map((text, i) => (
                  <span
                    key={`${copy}-${i}`}
                    className="mx-6 inline-flex items-center font-mono text-xs font-semibold tracking-[0.3em] uppercase drop-shadow-[0_0_12px_rgba(255,91,46,0.45)] sm:mx-8 sm:text-sm sm:tracking-[0.35em] md:text-base"
                  >
                    <span className="from-accent-warm via-accent to-accent-gold bg-gradient-to-r bg-clip-text text-transparent">
                      {text}
                    </span>
                    <span className="text-accent/40 mx-6 sm:mx-8">◆</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  )
}