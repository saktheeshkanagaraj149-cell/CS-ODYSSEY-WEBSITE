export default function Footer() {
  return (
    <footer id="about" className="relative overflow-hidden border-t border-edge bg-panel/60">
      {/* top trace divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
          <div className="max-w-md">
            <p className="font-display text-2xl font-black tracking-[0.22em] text-ink">
              CS<span className="text-gold">/</span>ODYSSEY
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              A handcrafted 3D journey through the motherboard — built for the curious, the builders, and the
              future-engineers of computer science.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-pcb animate-pulse-soft" />
              <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-pcb">
                System online · all traces live
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 md:grid-cols-3">
            <div>
              <p className="mb-4 font-display text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Explore</p>
              <ul className="space-y-2.5 text-sm text-muted">
                <li><a href="#home" className="transition hover:text-pcb">Home</a></li>
                <li><a href="#explore" className="transition hover:text-pcb">Motherboard</a></li>
                <li><a href="#future" className="transition hover:text-pcb">Future of CS</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 font-display text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Craft</p>
              <ul className="space-y-2.5 text-sm text-muted">
                <li>React 19</li>
                <li>Three.js · R3F</li>
                <li>Tailwind CSS 4</li>
                <li>Framer Motion</li>
              </ul>
            </div>
            <div>
              <p className="mb-4 font-display text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Specs</p>
              <ul className="space-y-2.5 text-sm text-muted">
                <li>712 meshes</li>
                <li>9 components</li>
                <li>17 MB model</li>
                <li>100% free camera</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-edge pt-6 pb-[env(safe-area-inset-bottom)] md:flex-row">
          <p className="text-xs text-muted/70">
            © {new Date().getFullYear()} CS Odyssey · Built for the love of computer science.
          </p>
          <a
            href="#home"
            className="glass rounded-lg px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.25em] text-cyber transition hover:border-cyber/60 glow-cyber"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
