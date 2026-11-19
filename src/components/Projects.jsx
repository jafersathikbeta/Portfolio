import { motion } from 'framer-motion'
import TiltCard from './TiltCard'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import {
  FaBrain,
  FaShieldAlt,
  FaChartLine,
  FaProjectDiagram,
} from 'react-icons/fa'

// Reverse-chronological. Add a `live: 'https://...'` field to any project
// to show a "Live Demo" link next to "View Source Code".
const projects = [
  {
    title: 'Agent-Integration',
    tagline: 'Agent Middleware',
    year: 'Sep – Nov 2026',
    description: [
      'Desktop middleware monitor visualizing agent pipelines. Validates actions against Sentinel API before routing to LLM chatbots.',
    ],
    tech: ['Python', 'FastAPI', 'PyWebView', 'HTTPX', 'Pydantic', 'LLM Integration', 'API Middleware'],
    github: 'https://github.com/jafersathikbeta/Agent-Integration',
    icon: FaProjectDiagram,
    accent: 'text-orange-300',
    glow: 'shadow-[0_0_32px_rgba(255,138,61,0.25)]',
    border: 'border-orange-400/25',
  },
  {
    title: 'AegisRAG',
    tagline: 'Offline RAG',
    year: 'May – Aug 2026',
    description: [
      '100% offline, air-gapped Multimodal RAG desktop app with runtime NetworkGuard, automated PII redaction, and FAISS vector search.',
    ],
    tech: ['Python', 'FastAPI', 'FAISS', 'Sentence Transformers', 'Tesseract OCR', 'faster-whisper', 'PyWebView', 'Security'],
    github: 'https://github.com/jafersathikbeta/AegisRAG',
    icon: FaBrain,
    accent: 'text-orange-300',
    glow: 'shadow-[0_0_32px_rgba(255,91,46,0.25)]',
    border: 'border-orange-400/25',
  },
  {
    title: 'Incubrix Growth Engine',
    tagline: 'Lead Generation',
    year: 'Oct 2025',
    description: [
      'Hackathon assessment: B2B lead generation pipeline generating 5,000+ leads using Groq LLMs, YouTube API, and ytscrape fallback.',
    ],
    tech: ['Python', 'Streamlit', 'Groq LLM', 'YouTube Data API', 'SQLite', 'Pandas', 'OpenPyXL', 'B2B Lead Generation'],
    github: 'https://github.com/jafersathikbeta/Incubrix-Growth-Engine',
    icon: FaChartLine,
    accent: 'text-amber-300',
    glow: 'shadow-[0_0_32px_rgba(255,209,102,0.28)]',
    border: 'border-amber-400/25',
  },
  {
    title: 'Sentinel AI Gateway',
    tagline: 'AI Security',
    year: 'Jan – Mar 2025',
    description: [
      'Defensive API gateway validating AI agent actions against MITRE ATLAS and NIST CSF 2.0 threat signatures with SQLite auditing.',
    ],
    tech: ['Python', 'FastAPI', 'SQLite', 'MITRE ATLAS', 'NIST CSF 2.0', 'API Security'],
    github: 'https://github.com/jafersathikbeta/Sentinel-AI-Gateway',
    icon: FaShieldAlt,
    accent: 'text-emerald-300',
    glow: 'shadow-[0_0_32px_rgba(52,211,153,0.25)]',
    border: 'border-emerald-400/25',
  },
]

const linkClass =
  'font-body text-accent hover:text-white inline-flex min-h-11 items-center gap-1.5 text-sm font-medium transition-colors'

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 md:py-28 lg:py-32">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">Projects</p>
          <h2 className="h-section">Featured Work</h2>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-14 md:gap-6">
          {projects.map((project, i) => {
            const Icon = project.icon

            return (
              <TiltCard key={project.title} className="h-full">
                <motion.article
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="glass group flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,91,46,0.08)]"
                >
                  <div className="flex flex-1 flex-col p-5 md:p-7">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border bg-white/5 p-4 backdrop-blur-md ${project.border} ${project.glow}`}
                    >
                      <Icon className={`text-4xl ${project.accent}`} />
                    </motion.div>

                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-display text-xl font-semibold text-white">
                        {project.title}
                      </h3>
                      <span className="font-body text-sm font-semibold text-slate-300">
                        — {project.tagline}
                      </span>
                      <span className="font-body text-accent-gold text-sm sm:ml-auto">
                        {project.year}
                      </span>
                    </div>

                    <ul className="mt-3 space-y-2">
                      {project.description.map((line, idx) => (
                        <li
                          key={idx}
                          className="font-body flex gap-2.5 text-sm leading-relaxed text-slate-300"
                        >
                          <span className="bg-accent mt-2 h-1 w-1 shrink-0 rounded-full" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="font-body rounded-md border border-slate-600/50 bg-slate-800/40 px-2 py-0.5 text-xs font-medium text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-wrap gap-x-5 pt-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        <FiGithub />
                        View Source Code
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          <FiExternalLink />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}