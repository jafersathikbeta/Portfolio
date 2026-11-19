import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: x }}
      className="from-accent-warm via-accent to-accent-gold fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r"
    />
  )
}