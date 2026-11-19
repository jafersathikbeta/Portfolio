import { useEffect, useState } from 'react'

let webglCache

function hasWebGL() {
  if (webglCache !== undefined) return webglCache
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    webglCache = !!gl
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    webglCache = false
  }
  return webglCache
}

function read() {
  if (typeof window === 'undefined') return { scene: 'off', smooth: false }
  const mq = (q) => window.matchMedia(q).matches
  const reduced = mq('(prefers-reduced-motion: reduce)')
  const touch = mq('(hover: none), (pointer: coarse)')
  const small = mq('(max-width: 768px)')
  const weak =
    (navigator.hardwareConcurrency || 8) < 4 ||
    (navigator.deviceMemory || 8) < 3 ||
    navigator.connection?.saveData === true

  let scene = 'full'
  if (reduced || weak || !hasWebGL()) scene = 'off'
  else if (small || touch) scene = 'lite'

  return { scene, smooth: !reduced && !touch }
}

// scene: 'full' (desktop) | 'lite' (phones/tablets) | 'off' (reduced motion, weak device, no WebGL)
// smooth: whether Lenis smooth scrolling should run
export default function useDeviceProfile() {
  const [profile, setProfile] = useState(read)

  useEffect(() => {
    const queries = [
      '(prefers-reduced-motion: reduce)',
      '(max-width: 768px)',
      '(hover: none)',
      '(pointer: coarse)',
    ].map((q) => window.matchMedia(q))

    const update = () =>
      setProfile((prev) => {
        const next = read()
        return next.scene === prev.scene && next.smooth === prev.smooth ? prev : next
      })

    queries.forEach((m) => m.addEventListener('change', update))
    return () => queries.forEach((m) => m.removeEventListener('change', update))
  }, [])

  return profile
}