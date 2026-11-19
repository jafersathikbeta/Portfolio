import { motion } from 'framer-motion'
import { FaBoxes, FaTicketAlt } from 'react-icons/fa'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const experiences = [
  {
    title: 'Forge Inventory',
    tagline: 'Inventory Management',
    year: 'Dec 2025 – Apr 2026',
    clientLabel: 'Company',
client: 'IT Core Solutions',
    role: 'Software Engineering Intern',
    description: [
      "Developed inventory and order-management features spanning products, materials, composite BOMs, stock transactions and order workflows. Deployed the production build remotely to the client's server via cPanel.",
      'Implemented BOM-based material calculations, transactional stock deductions, role-based access, PDF reports and Telegram notifications.',
    ],
    tech: ['Laravel', 'PHP', 'MySQL', 'Telegram API', 'cPanel'],
    live: 'https://ams.itcoresolutions.in',
    github: 'https://github.com/jafersathikbeta/Forge-Inventory',
    icon: FaBoxes,
    accent: 'orange',
  },
  {
    title: 'Yutira 2026 Symposium',
    tagline: 'Event Platform',
    year: 'Feb 2026 – Mar 2026',
    clientLabel: 'Client',
client: 'PSG College of Technology (Civil Dept)',
    role: 'Freelance Full-Stack Developer',
    description: [
      'Built an event platform that processed 242 attendee registrations and 28 research-paper submissions, handling email verification, payment-status management and attendance tracking end to end.',
      'Delivered admin workflows, paper-decision management and participant exports, cutting manual coordination for the department.',
    ],
    tech: ['Next.js', 'React', 'JavaScript', 'MongoDB', 'Tailwind CSS', 'JWT', 'Nodemailer'],
    live: 'https://yutira.psgtech.ac.in',
    github: 'https://github.com/jafersathikbeta/Yutira-Event-Platform',
    icon: FaTicketAlt,
    accent: 'gold',
  },
]

const accentStyles = {
  orange: {
    icon: 'text-accent',
    glow: 'shadow-[0_0_28px_rgba(255,91,46,0.35)]',
    border: 'border-orange-400/40',
    ring: 'from-orange-500/20 via-slate-900 to-orange-600/10',
    dot: 'bg-accent',
  },
  gold: {
    icon: 'text-accent-gold',
    glow: 'shadow-[0_0_28px_rgba(255,209,102,0.35)]',
    border: 'border-amber-400/40',
    ring: 'from-amber-500/20 via-slate-900 to-red-600/10',
    dot: 'bg-accent-gold',
  },
}

const linkClass =
  'font-body hover:text-white text-accent inline-flex min-h-11 items-center gap-1.5 text-sm font-medium transition-colors'

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-28 lg:py-32">
      <div className="via-accent-gold/5 pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />

      <div className="wrap relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">Experience</p>
          <h2 className="h-section">Where I&apos;ve Built</h2>
        </motion.div>

        <div className="relative mt-12 ml-2 border-l border-slate-700/80 pl-6 sm:ml-3 sm:pl-8 md:mt-14 md:ml-6 md:pl-12">
          {experiences.map((exp, i) => {
            const Icon = exp.icon
            const style = accentStyles[exp.accent]

            return (
              <motion.article
                key={exp.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className="relative mb-10 last:mb-0 md:mb-12"
              >
                <span className="border-accent bg-surface absolute top-1.5 -left-[1.9rem] flex h-4 w-4 items-center justify-center rounded-full border-2 sm:-left-[2.4rem] md:-left-[3.4rem]">
                  <span className="bg-accent h-1.5 w-1.5 rounded-full shadow-[0_0_8px_#FF5B2E]" />
                </span>

                <div className="glass flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:gap-6 md:p-8">
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border bg-gradient-to-br sm:h-24 sm:w-24 ${style.ring} ${style.border} ${style.glow}`}
                  >
                    <Icon className={`text-3xl sm:text-5xl ${style.icon}`} />
                  </motion.div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                        {exp.title}
                      </h3>
                      <span className="font-body text-sm font-semibold text-slate-300">
                        — {exp.tagline}
                      </span>
                      <span className="font-body text-accent-gold text-sm sm:ml-auto">
                        {exp.year}
                      </span>
                    </div>

                    <p className="font-body mt-1 text-sm text-slate-400 italic">
                      {exp.clientLabel}: {exp.client}
                    </p>

                    <p className="font-body mt-4 text-base font-medium text-slate-200">
                      {exp.role}
                    </p>

                    <ul className="mt-3 space-y-2">
                      {exp.description.map((line, idx) => (
                        <li
                          key={idx}
                          className="font-body flex gap-2.5 text-sm leading-relaxed text-slate-300"
                        >
                          <span
                            className={`mt-2 h-1 w-1 shrink-0 rounded-full ${style.dot}`}
                          />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="font-body text-accent-warm rounded-md border border-slate-600/60 bg-slate-800/50 px-2.5 py-1 text-xs font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-5">
                      {exp.live && (
                        <a
                          href={exp.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          <FiExternalLink />
                          Live Site
                        </a>
                      )}
                      {exp.github && (
                        <a
                          href={exp.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          <FiGithub />
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}