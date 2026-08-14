import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MotherboardScene from './MotherboardScene.jsx'
import InfoPanel from './InfoPanel.jsx'
import { PART_DEFS, PART_ORDER } from '../data/content.js'

export default function Explorer() {
  const [selectedKey, setSelectedKey] = useState(null)
  const [hoverKey, setHoverKey] = useState(null)
  const [foundKeys, setFoundKeys] = useState([])
  const [ready, setReady] = useState(false)
  const [resetCount, setResetCount] = useState(0)
  const [legendOpen, setLegendOpen] = useState(true)

  const legendParts = PART_ORDER.filter((k) => foundKeys.includes(k))
  const selectedDef = selectedKey ? PART_DEFS[selectedKey] : null

  const resetView = () => {
    setSelectedKey(null)
    setResetCount((c) => c + 1)
  }

  return (
    <section id="explore" className="relative h-screen h-[100svh] min-h-[560px] overflow-hidden bg-deep md:min-h-[640px]">
      <div className="absolute inset-0 cursor-crosshair">
        <MotherboardScene
          selectedKey={selectedKey}
          hoverKey={hoverKey}
          resetCount={resetCount}
          onSelect={setSelectedKey}
          onHover={setHoverKey}
          onFound={setFoundKeys}
          onReady={setReady}
        />
      </div>

      {/* loading state */}
      {!ready && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-5 bg-deep">
          <div className="relative h-14 w-14">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-edge border-t-pcb" />
            <div className="absolute inset-2 animate-spin rounded-full border border-edge border-b-gold" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }} />
          </div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.35em] text-pcb">Wiring up the board</p>
          <p className="text-xs text-muted">Fetching 16 MB of 3D data — one moment…</p>
        </div>
      )}

      {/* HUD overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-4 md:p-6">
        {/* top row */}
        <div className="pointer-events-auto flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="min-w-0"
          >
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.35em] text-gold md:text-xs">
              Interactive Explorer
            </p>
            <h2 className="mt-1 max-w-xl font-display text-xl font-black leading-snug text-ink md:text-3xl">
              Click a component.
              <br className="hidden md:block" />
              <span className="text-muted"> Learn what it does.</span>
            </h2>
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted md:text-sm">
              <span className="sm:hidden">Drag to rotate · pinch to zoom · swipe to scroll.</span>
              <span className="hidden sm:inline">
                Hover for a highlight · drag to orbit · scroll to zoom. A gold outline marks your selection.
              </span>
            </p>
          </motion.div>

          <div className="pointer-events-auto flex shrink-0 gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLegendOpen((o) => !o)}
              className="glass rounded-lg px-3.5 py-2.5 font-display text-[10px] font-black uppercase tracking-[0.2em] text-pcb transition hover:border-pcb/50 glow-pcb md:text-[11px]"
            >
              PARTS {legendOpen ? '▾' : '▸'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetView}
              className="glass rounded-lg px-3.5 py-2.5 font-display text-[10px] font-black uppercase tracking-[0.2em] text-muted transition hover:border-gold/50 hover:text-gold md:text-[11px]"
            >
              RESET
            </motion.button>
          </div>
        </div>

        {/* bottom row */}
        <div className="flex items-end justify-between gap-4">
          <AnimatePresence>
            {legendOpen && legendParts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                className="glass-light pointer-events-auto max-h-[46vh] w-56 overflow-y-auto rounded-2xl p-2"
              >
                <div className="flex items-center gap-2 px-2 pb-1.5 pt-1">
                  <span className="h-px w-4 bg-gold" />
                  <p className="font-display text-[9px] font-bold uppercase tracking-[0.25em] text-muted">
                    Discovered parts
                  </p>
                </div>
                {legendParts.map((k) => {
                  const d = PART_DEFS[k]
                  const active = selectedKey === k
                  const hovered = hoverKey === k
                  return (
                    <button
                      key={k}
                      onClick={() => setSelectedKey(active ? null : k)}
                      onMouseEnter={() => setHoverKey(k)}
                      onMouseLeave={() => setHoverKey(null)}
                      className={`mb-1 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs transition ${
                        active
                          ? 'border border-gold/40 bg-gold/10 text-gold'
                          : hovered
                            ? 'border border-pcb/30 bg-pcb/10 text-pcb'
                            : 'border border-transparent text-muted hover:bg-panel/60'
                      }`}
                    >
                      <d.icon size={16} strokeWidth={1.8} />
                      <span className="font-medium">{d.shortName}</span>
                      {active && <span className="ml-auto text-gold">●</span>}
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pointer-events-none hidden shrink-0 flex-col items-end gap-2 md:flex">
            <div className="glass rounded-lg px-4 py-2 text-right">
              <p className="font-display text-[9px] uppercase tracking-[0.3em] text-muted">View</p>
              <p className="font-display text-xs font-bold text-cyber">
                DRAG · ORBIT <span className="text-muted">/</span> SCROLL · ZOOM
              </p>
            </div>
            {selectedDef && (
              <div className="glass rounded-lg border-gold/30 px-4 py-2 text-right">
                <p className="font-display text-[9px] uppercase tracking-[0.3em] text-muted">Selected</p>
                <p className="flex items-center gap-1.5 font-display text-sm font-black text-gold">
                  <selectedDef.icon size={14} strokeWidth={2.2} />
                  {selectedDef.shortName}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <InfoPanel partKey={selectedKey} onClose={() => setSelectedKey(null)} />
    </section>
  )
}
