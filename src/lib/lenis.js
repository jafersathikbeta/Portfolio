let instance = null

export function setLenis(l) {
  instance = l
}

export function getLenis() {
  return instance
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

// Scroll to a selector / element / y-position.
// Uses Lenis when available, otherwise falls back to native scroll
// (respecting reduced-motion preference).
export function scrollToTarget(target, options = {}) {
  if (instance) {
    instance.scrollTo(target, options)
    return
  }
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth'
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior })
    return
  }
  const el =
    typeof target === 'string' ? document.querySelector(target) : target
  if (el) el.scrollIntoView({ behavior, block: 'start' })
}