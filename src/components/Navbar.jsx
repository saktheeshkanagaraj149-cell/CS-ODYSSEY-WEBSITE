import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function ChipLogo() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="9" y="9" width="14" height="14" rx="2" fill="#00b85c" fillOpacity="0.15" stroke="#00b85c" strokeWidth="1.4" />
      <rect x="12.5" y="12.5" width="7" height="7" rx="1" fill="#f5c518" fillOpacity="0.25" stroke="#f5c518" strokeWidth="1" />
      {[12, 16, 20].map((x) => (
        <g key={x}>
          <line x1={x} y1="9" x2={x} y2="5" stroke="#f5c518" strokeWidth="1.6" />
          <line x1={x} y1="23" x2={x} y2="27" stroke="#f5c518" strokeWidth="1.6" />
          <line x1="9" y1={x} x2="5" y2={x} stroke="#00e5ff" strokeWidth="1.6" />
          <line x1="23" y1={x} x2="27" y2={x} stroke="#00e5ff" strokeWidth="1.6" />
        </g>
      ))}
      <circle cx="3.5" cy="3.5" r="1" fill="#00e5ff" />
      <circle cx="28.5" cy="28.5" r="1" fill="#00b85c" />
    </svg>
  )
}

export default function Navbar() {
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#explore', label: 'Motherboard' },
    { href: '#future', label: 'Future of CS' },
    { href: '#about', label: 'About' },
  ]
  const [open, setOpen] = useState(false)

  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-edge pt-[env(safe-area-inset-top)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        <a href="#home" className="group flex items-center gap-2.5">
          <span className="transition-transform duration-300 group-hover:rotate-6">
            <ChipLogo />
          </span>
          <span className="font-display text-sm font-black tracking-[0.22em] text-ink md:text-base">
            CS<span className="text-gold">/</span>ODYSSEY
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-edge text-ink md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-edge md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 font-display text-xs font-bold uppercase tracking-[0.18em] text-muted transition hover:bg-pcb/10 hover:text-pcb"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
