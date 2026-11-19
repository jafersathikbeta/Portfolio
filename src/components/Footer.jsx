import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jafersathikbeta',
    icon: FaLinkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/jafersathikbeta',
    icon: FaGithub,
  },
  {
    label: 'Email',
    href: 'mailto:jafersathikbeta@gmail.com',
    icon: FaEnvelope,
  },
]

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-accent/20 relative border-t py-16 md:py-20"
      style={{ paddingBottom: 'max(4rem, env(safe-area-inset-bottom))' }}
    >
      <div className="from-accent-warm/5 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />

      <div className="wrap relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">Contact</p>
          <h2 className="h-section">Let&apos;s Build Something</h2>
          <p className="font-body mx-auto mt-5 max-w-md text-balance text-slate-300">
            Open to internships and freelance work now, and full&#8209;time roles from 2027.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="glass hover:text-accent flex h-12 w-12 items-center justify-center text-xl text-slate-300 transition-all hover:scale-110"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>

        <p className="font-body mt-14 text-xs text-slate-400">
          © {new Date().getFullYear()} Jafer Sathik B. Built with React,
          Three.js &amp; Framer Motion.
        </p>
      </div>
    </footer>
  )
}