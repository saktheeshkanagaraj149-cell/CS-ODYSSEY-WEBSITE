import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ring = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const el = ring.current
    if (!el) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rx = x
    let ry = y
    let raf = 0
    let visible = false

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (!visible) {
        visible = true
        el.style.opacity = '1'
        rx = x
        ry = y
      }
    }
    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      el.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`
      raf = requestAnimationFrame(loop)
    }
    const onLeave = () => {
      visible = false
      el.style.opacity = '0'
    }

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-9 w-9 rounded-full border border-cyber/50 opacity-0 transition-opacity duration-300 [@media(pointer:fine)]:block"
      style={{ boxShadow: '0 0 18px rgba(0,229,255,0.25), inset 0 0 10px rgba(245,197,24,0.15)' }}
    />
  )
}
