import { motion } from 'framer-motion'
import { FaBoxes, FaTicketAlt } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import {
  SiPython,
  SiPhp,
  SiJavascript,
  SiLaravel,
  SiReact,
  SiNextdotjs,
  SiFastapi,
  SiNodedotjs,
  SiMysql,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiCpanel,
} from 'react-icons/si'

const skills = [
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'PHP', icon: SiPhp, color: '#777BB4' },
  { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'cPanel', icon: SiCpanel, color: '#FF6C2C' },
]

const aiSecuritySkills = [
  'LLM Integration',
  'Groq LLM',
  'RAG',
  'FAISS',
  'Sentence Transformers',
  'Tesseract OCR',
  'faster-whisper',
  'PII Redaction',
  'MITRE ATLAS',
  'NIST CSF 2.0',
  'API Security',
  'PyWebView',
]

const stats = [
  { value: '242', label: 'Event registrations handled' },
  { value: '28', label: 'Paper submissions managed' },
  { value: '5,000+', label: 'B2B leads generated' },
  { value: '4', label: 'Featured projects shipped' },
]

const deployments = [
  {
    name: 'Yutira 2026 Symposium',
    host: 'yutira.psgtech.ac.in',
    note: 'Deployed on the college domain',
    href: 'https://yutira.psgtech.ac.in',
    icon: FaTicketAlt,
  },
  {
    name: 'Forge Inventory',
    host: 'ams.itcoresolutions.in',
    note: "Deployed remotely to the client's server",
    href: 'https://ams.itcoresolutions.in',
    icon: FaBoxes,
  },
]

const education = [
  {
    school: 'PSG College of Technology, Coimbatore',
    degree: 'B.Tech. Information Technology',
    score: '',
    year: 'Expected 2027',
  },
  {
    school: 'Al-Ameen Polytechnic College, Erode',
    degree: 'Diploma in Civil Engineering',
    score: '',
    year: '',
  },
  {
    school: 'SSVM Matriculation Higher Secondary School, Mettupalayam',
    degree: 'SSLC',
    score: '',
    year: '',
  },
]

const achievements = [
  {
    title: 'Panel Head — Final Year Project Reviews',
    meta: 'PSG College of Technology',
    description:
      'Owned end-to-end review scheduling for final-year B.Tech IT projects. Coordinated with faculty panel members and student teams, tracked deliverables through each review cycle, and communicated outcomes and structured feedback to both sides.',
  },
  {
    title: 'Niral Thiruvizha 3.0',
    meta: 'TNSDC · Naan Mudhalvan',
    description:
      'Idea pitch selected among the Top 1,000 under the Tamil Nadu Skill Development Corporation (TNSDC) Naan Mudhalvan upskilling initiative.',
  },
  {
    title: 'IEEE Students Chapter (Chapter 12951)',
    meta: 'PSG College of Technology',
    description:
      'Directed promotional video strategies and executed videography for Srishti, the annual national-level technical symposium.',
  },
  {
    title: 'Under-17 Zonal Badminton',
    meta: 'Tamil Nadu School Education Department',
    description: 'Doubles Runner-up at the zonal-level tournament.',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 lg:py-32">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <p className="eyebrow">About</p>
              <h2 className="h-section">What I Build</h2>

              <p className="font-body mt-6 text-lg leading-relaxed text-slate-300 md:text-xl">
                I work on AI pipelines and defensive security — offline
                multimodal RAG with PII redaction and tamper-evident logs
                (AegisRAG), and an API gateway that maps agent actions to MITRE
                ATLAS and NIST CSF 2.0 (Sentinel).
              </p>

              <p className="font-body mt-4 text-lg leading-relaxed text-slate-300 md:text-xl">
                Alongside that I ship production software: inventory and BOM systems in Laravel for a client, 
                and a symposium platform that handled 242 registrations and 28 paper submissions.
              </p>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45 }}
              className="mt-12 md:mt-14"
            >
              <p className="eyebrow eyebrow-gold">Education</p>

              <div className="space-y-5">
                {education.map((edu) => (
                  <div key={edu.school}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-display text-base font-semibold text-white sm:text-lg">
                        {edu.school}
                      </h3>
                      {edu.year && (
                        <span className="font-body text-accent-gold text-sm sm:ml-auto">
                          {edu.year}
                        </span>
                      )}
                    </div>
                    <p className="font-body mt-1 text-base text-slate-300">
                      {edu.degree}
                      {edu.score && (
                        <>
                          {' — '}
                          <span className="text-accent/90">{edu.score}</span>
                        </>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column: stats + live deployments */}
          <div className="lg:pt-28">
            <motion.aside
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              aria-label="Highlights"
              className="grid grid-cols-2 content-start gap-3 sm:gap-4"
            >
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  variants={item}
                  className="glass p-4 sm:p-5"
                >
                  <p className="font-display text-gradient text-3xl font-bold sm:text-4xl">
                    {s.value}
                  </p>
                  <p className="font-body mt-2 text-xs leading-snug text-slate-400 sm:text-sm">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.aside>

            <p className="eyebrow eyebrow-gold mt-8">Live Deployments</p>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-3 sm:space-y-4"
            >
              {deployments.map((d) => {
                const Icon = d.icon
                return (
                  <motion.a
                    key={d.name}
                    variants={item}
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass group flex items-center gap-4 p-4 sm:p-5"
                  >
                    <span className="text-accent flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl">
                      <Icon />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="font-display block truncate text-sm font-semibold text-white sm:text-base">
                        {d.name}
                      </span>
                      <span className="font-body text-accent-gold block truncate text-xs sm:text-sm">
                        {d.host}
                      </span>
                      <span className="font-body block text-xs leading-snug text-slate-400">
                        {d.note}
                      </span>
                    </span>
                    <FiExternalLink className="group-hover:text-accent shrink-0 text-lg text-slate-400 transition-colors" />
                  </motion.a>
                )
              })}
            </motion.div>
          </div>
        </div>

        {/* Technical skills */}
        <div className="mt-16 md:mt-20">
          <p className="eyebrow eyebrow-gold">Technical Skills</p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7 md:gap-4"
          >
            {skills.map((skill) => {
              const Icon = skill.icon
              return (
                <motion.div
                  key={skill.name}
                  variants={item}
                  whileHover={{ y: -6, scale: 1.04 }}
                  className="glass group flex flex-col items-center gap-3 px-2 py-5 sm:px-3"
                >
                  <Icon
                    className="text-3xl transition-transform duration-300 group-hover:scale-110 md:text-4xl"
                    style={{ color: skill.color }}
                  />
                  <span className="font-body text-xs font-medium text-slate-400 group-hover:text-slate-200 md:text-sm">
                    {skill.name}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>

          <p className="eyebrow eyebrow-gold mt-10">AI &amp; Security</p>
          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-wrap gap-2"
          >
            {aiSecuritySkills.map((s) => (
              <motion.li
                key={s}
                variants={item}
                className="font-body rounded-md border border-slate-600/60 bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-200 sm:text-sm"
              >
                {s}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Achievements */}
        <div className="mt-16 md:mt-20">
          <p className="eyebrow eyebrow-gold">Achievements</p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-4 md:grid-cols-2 md:gap-5"
          >
            {achievements.map((a) => (
              <motion.article
                key={a.title}
                variants={item}
                className="glass p-5 sm:p-6"
              >
                <h3 className="font-display text-base font-semibold text-white sm:text-lg">
                  {a.title}
                </h3>
                <p className="font-body text-accent/90 mt-1 text-sm">{a.meta}</p>
                <p className="font-body mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {a.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}