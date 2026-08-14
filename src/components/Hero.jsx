import { motion } from 'framer-motion'

function CircuitBoard() {
  return (
    <svg viewBox="0 0 420 360" fill="none" className="h-full w-full" aria-hidden="true">
      <rect x="4" y="4" width="412" height="352" rx="18" fill="#12172b" stroke="#2c3a5e" strokeWidth="1.5" />

      {/* gold traces */}
      <g stroke="#f5c518" strokeOpacity="0.5" strokeWidth="1.6" fill="none">
        <path d="M70 60 H180 V120 H250" />
        <path d="M70 300 H140 V260 H250" />
        <path d="M350 70 H300 V150 H250" />
        <path d="M350 300 H280 V260 H250" />
        <path d="M200 170 H250 V90" />
        <path d="M200 200 V250 H120 V300" />
        <path d="M200 200 H320 V180" />
      </g>

      {/* corner screws */}
      {[
        [34, 34],
        [386, 34],
        [34, 326],
        [386, 326],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="9" fill="#0a0e1a" stroke="#3a4a78" strokeWidth="1.2" />
          <circle cx={cx} cy={cy} r="4" fill="#55669c" />
          <line x1={cx - 2.5} y1={cy} x2={cx + 2.5} y2={cy} stroke="#0a0e1a" strokeWidth="1" />
        </g>
      ))}

      {/* green pads */}
      {[
        [60, 60],
        [60, 300],
        [360, 70],
        [360, 300],
        [120, 140],
        [120, 220],
        [300, 140],
        [300, 220],
        [200, 60],
        [200, 300],
      ].map(([cx, cy], i) => (
        <g key={`p-${i}`}>
          <circle cx={cx} cy={cy} r="6" fill="#00b85c" fillOpacity="0.35" stroke="#00b85c" strokeWidth="1.4" />
          <circle cx={cx} cy={cy} r="2" fill="#00e5ff" />
        </g>
      ))}

      {/* memory slots */}
      <rect x="70" y="150" width="90" height="26" rx="3" fill="#151b33" stroke="#3a4a78" strokeWidth="1.2" />
      <g stroke="#00b85c" strokeOpacity="0.7" strokeWidth="1">
        {[80, 94, 108, 122, 136, 150].map((x) => (
          <line key={x} x1={x} y1="156" x2={x} y2="170" />
        ))}
      </g>

      {/* main chip */}
      <g>
        <rect x="155" y="140" width="130" height="120" rx="6" fill="#0f1426" stroke="#00b85c" strokeWidth="1.6" />
        <rect x="165" y="150" width="110" height="100" rx="4" fill="#13203a" stroke="#2c3a5e" strokeWidth="1" />
        <path d="M196 150 h48 v20 h-48 z" fill="#00b85c" fillOpacity="0.25" stroke="#00b85c" strokeWidth="1" />
        <text x="220" y="212" textAnchor="middle" fill="#f5c518" fontSize="11" fontFamily="Orbitron, sans-serif" letterSpacing="2">
          CPU
        </text>
        {[175, 195, 215, 235, 255, 275].map((x) => (
          <line key={`t-${x}`} x1={x} y1="140" x2={x} y2="132" stroke="#f5c518" strokeWidth="2" />
        ))}
        {[175, 195, 215, 235, 255, 275].map((x) => (
          <line key={`b-${x}`} x1={x} y1="260" x2={x} y2="268" stroke="#f5c518" strokeWidth="2" />
        ))}
        {[150, 170, 190, 210, 230, 250].map((y) => (
          <line key={`l-${y}`} x1="155" y1={y} x2="147" y2={y} stroke="#00e5ff" strokeWidth="2" />
        ))}
        {[150, 170, 190, 210, 230, 250].map((y) => (
          <line key={`r-${y}`} x1="285" y1={y} x2="293" y2={y} stroke="#00e5ff" strokeWidth="2" />
        ))}
      </g>

      {/* south bridge */}
      <rect x="250" y="285" width="70" height="40" rx="4" fill="#0f1426" stroke="#2c3a5e" strokeWidth="1.2" />
      <circle cx="285" cy="305" r="8" fill="#00e5ff" fillOpacity="0.2" stroke="#00e5ff" strokeWidth="1.2" />
      <circle cx="285" cy="305" r="3" fill="#00e5ff" />

      {/* battery */}
      <rect x="70" y="70" width="34" height="22" rx="3" fill="#0f1426" stroke="#00b85c" strokeWidth="1.2" />
      <circle cx="87" cy="81" r="5" fill="#f5c518" fillOpacity="0.3" stroke="#f5c518" strokeWidth="1" />
      <line x1="84" y1="81" x2="90" y2="81" stroke="#f5c518" strokeWidth="1" />

      {/* blinking dot */}
      <circle cx="220" cy="330" r="4" fill="#00e5ff" className="animate-pulse-soft" />
    </svg>
  )
}

const stats = [
  { value: '9', label: 'parts to explore' },
  { value: '15', label: 'future technologies' },
  { value: '3', label: 'eras of computing' },
]

const marqueeWords = ['QUANTUM', 'NEURAL', 'OPTICAL', 'DNA STORAGE', 'AGI', '6G', 'NEUROMORPHIC', 'HOLOGRAMS', 'BRAIN-COMPUTER', 'NANOCHIPS']

export default function Hero() {
  return (
    <section id="home" className="trace-grid relative flex min-h-screen min-h-[100svh] flex-col overflow-hidden pt-28">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[26rem] w-[26rem] rounded-full bg-pcb/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-cyber/5 blur-2xl" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-6 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* copy */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pcb/40 bg-pcb/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-pcb animate-pulse-soft" />
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-pcb">
              Interactive 3D Experience
            </span>
          </div>

          <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight text-ink md:text-6xl">
            The Heart of
            <br />
            <span className="text-gold">Computing</span>
            <span className="text-cyber">_</span>
          </h1>

          <p className="mt-5 max-w-lg font-display text-sm font-medium tracking-wide text-muted md:text-lg">
            Exploring the motherboard, one component at a time — then looking where computer science is heading next.
          </p>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted/80">
            Click every component of a real 3D motherboard to learn what it does. Hover, rotate, zoom — then journey
            from the near horizon to the far frontier of computing.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="#explore"
              className="pcb-button rounded-full px-8 py-3.5 font-display text-xs font-black tracking-[0.2em] text-ink"
            >
              ENTER THE MOTHERBOARD →
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="#future"
              className="rounded-full border border-cyber/50 px-8 py-3.5 font-display text-xs font-bold tracking-[0.2em] text-cyber transition hover:bg-cyber/10 glow-cyber"
            >
              FUTURE OF CS
            </motion.a>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-3 divide-x divide-edge">
            {stats.map((s) => (
              <div key={s.label} className="px-4 first:pl-0">
                <p className="font-display text-2xl font-black text-gold md:text-3xl">{s.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-muted md:text-[11px]">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* decorative circuit panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="animate-float rounded-2xl border border-edge bg-panel/70 p-3 shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
            <div className="overflow-hidden rounded-xl">
              <CircuitBoard />
            </div>
          </div>

          <div className="glass-light absolute -left-4 top-8 hidden rounded-xl px-4 py-3 sm:block">
            <p className="font-display text-[9px] uppercase tracking-[0.25em] text-muted">Status</p>
            <p className="font-display text-sm font-bold text-pcb">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-pcb animate-pulse-soft" />
              LIVE · 712 MESHES
            </p>
          </div>

          <div className="glass-light absolute -right-3 bottom-10 hidden rounded-xl px-4 py-3 sm:block">
            <p className="font-display text-[9px] uppercase tracking-[0.25em] text-muted">Trace</p>
            <p className="font-display text-sm font-bold text-gold">01 · MOTHERBOARD</p>
          </div>
        </motion.div>
      </div>

      {/* marquee strip */}
      <div className="relative z-10 border-t border-edge bg-panel/60 py-3">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-[11px] font-bold uppercase tracking-[0.3em] text-muted/70">
              {w}
              <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
