const KEY = 'intro-seen'

export function shouldShowIntro() {
  if (typeof window === 'undefined') return false
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  } catch {
    /* ignore */
  }
  try {
    return !sessionStorage.getItem(KEY)
  } catch {
    return true
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    /* ignore */
  }
}