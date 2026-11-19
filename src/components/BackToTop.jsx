import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowUp } from 'react-icons/hi'
import { scrollToTarget } from '../lib/lenis'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          onClick={() => scrollToTarget(0)}
          style={{
            bottom: 'max(1.25rem, env(safe-area-inset-bottom))',
            right: 'max(1.25rem, env(safe-area-inset-right))',
          }}
          className="from-accent-warm to-accent-gold shadow-accent/30 fixed z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-lg text-slate-950 shadow-lg transition-transform hover:scale-110 active:scale-95"
        >
          <HiArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  )
}