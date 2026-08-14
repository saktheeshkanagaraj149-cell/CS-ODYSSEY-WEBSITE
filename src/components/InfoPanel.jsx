import { AnimatePresence, motion } from 'framer-motion'
import { IconX } from '@tabler/icons-react'
import { PART_DEFS } from '../data/content.js'

export default function InfoPanel({ partKey, onClose }) {
  const def = partKey ? PART_DEFS[partKey] : null

  return (
    <AnimatePresence>
      {def && (
        <motion.aside
          key={def.key}
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="glass pointer-events-auto absolute bottom-4 left-1/2 z-30 w-[94%] max-w-xl -translate-x-1/2 overflow-y-auto rounded-2xl border-t-2 border-t-gold p-5 shadow-[0_24px_70px_rgba(0,0,0,0.55)] max-h-[62svh] md:bottom-10 md:right-10 md:left-auto md:max-h-[calc(100svh-5rem)] md:w-[26rem] md:translate-x-0 md:overflow-visible"
        >
          {/* gold trace header line */}
          <div className="absolute right-6 top-0 flex items-center gap-1" aria-hidden="true">
            <span className="h-px w-8 bg-gold/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
          </div>

          <button
            onClick={onClose}
            aria-label="Close panel"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-edge text-muted transition hover:border-gold/60 hover:text-gold"
          >
            <IconX size={16} strokeWidth={2} />
          </button>

          <div className="mb-4 flex items-center gap-3.5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/50 bg-pcb/15 text-gold shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              <def.icon size={26} strokeWidth={1.7} />
            </span>
            <div>
              <h3 className="font-display text-base font-black tracking-wide text-ink md:text-lg">{def.name}</h3>
              <p className="font-display text-[9px] font-bold uppercase tracking-[0.3em] text-gold">{def.tagline}</p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-muted">{def.description}</p>

          <div className="mt-4 rounded-xl border border-edge bg-panel/60 p-4">
            <p className="mb-1.5 flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-[0.25em] text-pcb">
              <span className="h-1 w-1 rounded-full bg-pcb" />
              How it works
            </p>
            <p className="text-sm leading-relaxed text-ink/90">{def.howItWorks}</p>
          </div>

          <div className="mt-3 rounded-xl border border-cyber/25 bg-cyber/5 p-4">
            <p className="mb-1.5 flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-[0.25em] text-cyber">
              <span className="h-1 w-1 rounded-full bg-cyber animate-pulse-soft" />
              Future of {def.shortName}
            </p>
            <p className="text-sm leading-relaxed text-ink/90">{def.future}</p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
