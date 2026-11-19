import { useEffect, useRef } from 'react'

// Custom ring + dot cursor. Only active on devices with a real mouse/trackpad.
export default function Cursor() {
  const ring = useRef(null)
  const dot = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return undefined
    }

    const root = document.documentElement
    root.classList.add('has-custom-cursor')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let tx = -100
    let ty = -100
    let x = -100
    let y = -100
    let big = false
    let shown = false
    let raf = 0

    const render = () => {
      const ease = reduce ? 1 : 0.2
      x += (tx - x) * ease
      y += (ty - y) * ease
      if (ring.current) {
        ring.current.style.transform = `translate3d(${x - 16}px,${y - 16}px,0) scale(${big ? 1.6 : 1})`
      }
      if (dot.current) {
        dot.current.style.transform = `translate3d(${tx - 3}px,${ty - 3}px,0)`
      }
      raf = Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1
        ? requestAnimationFrame(render)
        : 0
    }

    const setVisible = (v) => {
      const o = v ? '1' : '0'
      if (ring.current) ring.current.style.opacity = o
      if (dot.current) dot.current.style.opacity = o
    }

    const move = (e) => {
      tx = e.clientX
      ty = e.clientY
      if (!shown) {
        shown = true
        x = tx
        y = ty
        setVisible(true)
      }
      big = !!e.target.closest?.('a, button, [role="button"]')
      if (!raf) raf = requestAnimationFrame(render)
    }

    const leave = (e) => {
      if (!e.relatedTarget) {
        shown = false
        setVisible(false)
      }
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('mouseout', leave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('mouseout', leave)
      root.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="border-accent/70 pointer-events-none fixed top-0 left-0 z-[90] h-8 w-8 rounded-full border opacity-0 mix-blend-screen transition-opacity duration-200"
      />
      <div
        ref={dot}
        aria-hidden="true"
        className="bg-accent pointer-events-none fixed top-0 left-0 z-[90] h-1.5 w-1.5 rounded-full opacity-0 transition-opacity duration-200"
      />
    </>
  )
}