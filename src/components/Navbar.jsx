import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { scrollToTarget } from '../lib/lenis'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const NAV_OFFSET = -72

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the link for the section currently in the middle of the screen.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const ids = ['home', ...links.map((l) => l.href.slice(1))]
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id === 'home' ? '' : e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Lock page scroll while the mobile menu is open; close on Esc / resize.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onChange)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
    }
  }, [open])

  const handleNav = (href) => {
    setOpen(false)
    if (href === '#home' || href === '#') {
      scrollToTarget(0)
    } else {
      scrollToTarget(href, { offset: NAV_OFFSET })
    }
  }

  return (
    <header
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'nav-solid' : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="wrap flex items-center justify-between py-3 md:py-4"
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            handleNav('#home')
          }}
          className="font-display text-lg font-bold tracking-tight text-white md:text-xl"
        >
          jafersathikbeta<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive = active === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNav(link.href)
                  }}
                  className={`font-body border-b-2 py-2 text-sm font-medium transition-colors hover:text-accent ${
                    isActive
                      ? 'border-accent text-accent'
                      : 'border-transparent text-slate-300'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="relative z-50 -mr-2 flex h-11 w-11 items-center justify-center text-2xl text-slate-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              tabIndex={-1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 -z-10 bg-black/60 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="nav-solid absolute inset-x-0 top-full max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-slate-700/50 md:hidden"
            >
              <ul className="wrap flex flex-col gap-1 py-5">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNav(link.href)
                      }}
                      className={`font-display block rounded-lg px-3 py-3.5 text-lg font-medium transition-colors hover:bg-white/5 hover:text-accent ${
                        active === link.href.slice(1) ? 'text-accent' : 'text-slate-100'
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}