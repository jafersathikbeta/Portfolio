import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'

export default function TiltCard({ children, className = '' }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]))
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]))

  const move = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const b = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - b.left) / b.width - 0.5)
    y.set((e.clientY - b.top) / b.height - 0.5)
  }

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}