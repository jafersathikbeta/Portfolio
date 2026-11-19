import { useState } from 'react'

function detectLowPower() {
  if (typeof window === 'undefined') return false
  try {
    return (
      matchMedia('(prefers-reduced-motion: reduce)').matches ||
      matchMedia('(max-width: 768px)').matches ||
      (navigator.hardwareConcurrency || 8) < 4
    )
  } catch {
    return false
  }
}

export default function useLowPower() {
  const [low] = useState(detectLowPower)
  return low
}