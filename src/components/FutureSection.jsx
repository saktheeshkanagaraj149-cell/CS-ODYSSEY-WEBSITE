import { motion } from 'framer-motion'
import { FUTURE_ERAS } from '../data/content.js'

const accentMap = {
  pcb: { text: 'text-pcb', border: 'border-pcb/50', node: 'bg-pcb', glow: 'glow-pcb', hover: 'hover:border-pcb/60' },
  gold: { text: 'text-gold', border: 'border-gold/50', node: 'bg-gold', glow: 'glow-gold', hover: 'hover:border-gold/60' },
  cyber: { text: 'text-cyber', border: 'border-cyber/50', node: 'bg-cyber', glow: 'glow-cyber', hover: 'hover:border-cyber/60' },
}

export default function FutureSection() {
  return (
    <section id="future" className="trace-grid relative overflow-hidden bg-deep px-5 py-24 md:py-32">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[50rem] -translate-x-1/2 rounded-full bg-cyber/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.4em] text-pcb md:text-xs">Looking Ahead</p>
          <h2 className="mt-3 font-display text-3xl font-black text-ink md:text-5xl">
            The Future of <span className="text-cyber">Computer Science</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            Every motherboard component you explored has a future waiting for it. Here is where computing is heading —
            from the near horizon to the far frontier.
          </p>
        </motion.div>

        {FUTURE_ERAS.map((era) => {
          const acc = accentMap[era.accent] || accentMap.cyber
          return (
            <div key={era.era} className="relative mb-20 last:mb-0">
              {/* era node */}
              <div className="relative z-10 mb-10 flex justify-start pl-12 md:justify-center md:pl-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5 }}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 md:gap-3 md:px-5 ${acc.border} glass ${acc.glow}`}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${acc.node} opacity-60`} />
                    <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${acc.node}`} />
                  </span>
                  <span className={`font-display text-sm font-black tracking-[0.2em] ${acc.text}`}>{era.era}</span>
                  <span className="font-display text-[11px] tracking-[0.15em] text-muted">{era.period}</span>
                </motion.div>
              </div>

              {/* curved timeline path */}
              <div className="pointer-events-none absolute inset-y-0 left-5 -translate-x-1/2 md:left-1/2" aria-hidden="true">
                <svg className="absolute inset-y-0 w-40 -translate-x-1/2 md:w-72" viewBox="0 0 288 400" preserveAspectRatio="none">
                  <path
                    d="M20 0 C 20 90, 268 90, 268 180 C 268 270, 20 270, 20 360 L 20 400"
                    fill="none"
                    stroke="url(#futureLine)"
                    strokeWidth="2.5"
                    strokeDasharray="2 8"
                  />
                  <defs>
                    <linearGradient id="futureLine" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00b85c" />
                      <stop offset="55%" stopColor="#f5c518" />
                      <stop offset="100%" stopColor="#00e5ff" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* staggered cards */}
              <div className="relative z-10 space-y-8 md:space-y-14">
                {era.items.map((item, i) => {
                  const left = i % 2 === 0
                  const colClass = left
                    ? 'md:col-start-1 md:col-end-2 md:items-end md:text-right md:pr-20'
                    : 'md:col-start-2 md:col-end-3 md:items-start md:text-left md:pl-20'
                  const fromX = left ? -34 : 34
                  return (
                    <div key={item.title} className="pl-12 md:grid md:grid-cols-2 md:gap-x-4 md:pl-0">
                      <span
                        className={`absolute left-5 top-2 -translate-x-1/2 md:left-1/2 ${left ? '' : 'md:mt-16'}`}
                        aria-hidden="true"
                      >
                        <span className={`block h-2.5 w-2.5 rounded-full ${acc.node}`} />
                        <span className={`absolute -inset-1.5 rounded-full border ${acc.border}`} />
                      </span>

                      <motion.div
                        initial={{ opacity: 0, x: fromX, y: 16 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.55, delay: (i % 2) * 0.12, ease: 'easeOut' }}
                        className={`flex ${colClass} ${left ? 'md:mt-0' : 'md:mt-16'}`}
                      >
                        <div
                          className={`group w-full rounded-2xl border border-edge bg-panel/70 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 ${acc.hover} ${acc.glow}`}
                        >
                          <span className={`inline-block ${acc.text} transition-transform duration-300 group-hover:scale-110`}>
                            <item.icon size={28} strokeWidth={1.5} />
                          </span>
                          <h3 className={`mt-3 font-display text-base font-bold transition ${acc.text} group-hover:brightness-125`}>
                            {item.title}
                          </h3>
                          <p className="mt-2 text-xs leading-relaxed text-muted md:text-sm">{item.description}</p>
                          <div className={`mt-4 flex items-center gap-2 ${left ? 'md:flex-row-reverse' : ''}`}>
                            <span className={`h-px w-8 ${acc.node}`} />
                            <span className="font-display text-[9px] font-bold uppercase tracking-[0.25em] text-muted">
                              Track 0{i + 1}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
