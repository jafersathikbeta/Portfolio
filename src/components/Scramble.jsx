import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&'

// The real text is rendered invisibly to reserve its exact width, so the
// scrambling overlay never shifts the layout. Screen readers get the real text.
export default function Scramble({ text, play = true }) {
  const reduce = useReducedMotion()
  const [out, setOut] = useState(text)

  useEffect(() => {
    if (!play || reduce) {
      setOut(text)
      return undefined
    }
    let i = 0
    const step = () => {
      setOut(
        text
          .split('')
          .map((c, k) =>
            c === ' ' || k < i
              ? c
              : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(''),
      )
      if (i++ >= text.length) {
        setOut(text)
        clearInterval(id)
      }
    }
    const id = setInterval(step, 55)
    step()
    return () => clearInterval(id)
  }, [text, reduce, play])

  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="invisible">{text}</span>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="text-gradient absolute inset-0">
        {out}
      </span>
    </span>
  )
}