'use client'

import { useEffect, useRef } from 'react'

/**
 * Desktop: the section pins to the viewport and its panels slide sideways as
 * the page scrolls down. The outer height is set to exactly the sideways
 * travel plus one viewport, so vertical and horizontal distance map 1:1 and
 * the motion never feels faster or slower than the user's own scrolling.
 *
 * Below lg, and for reduced motion, the same panels simply stack vertically:
 * sideways swiping on a phone fights the page scroll.
 */
export default function HorizontalPin({
  panels,
  dir,
}: {
  panels: React.ReactNode[]
  dir: 'rtl' | 'ltr'
}) {
  const outer = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const counter = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const o = outer.current
    const t = track.current
    if (!o || !t) return

    let travel = 0
    let raf = 0
    const total = panels.length

    const update = () => {
      if (travel <= 0) return
      const p = Math.min(1, Math.max(0, -o.getBoundingClientRect().top / travel))
      const x = p * travel
      // Panels run right-to-left in Arabic, so the track travels the other way.
      t.style.transform = `translate3d(${dir === 'rtl' ? x : -x}px, 0, 0)`
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
      if (counter.current) {
        const n = Math.min(total, Math.floor(p * total) + 1)
        counter.current.textContent = String(n).padStart(2, '0')
      }
    }

    const measure = () => {
      travel = Math.max(0, t.scrollWidth - window.innerWidth)
      o.style.height = travel > 0 ? `${travel + window.innerHeight}px` : ''
      update()
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    measure()
    // Fonts arriving late change panel widths; re-measure once they settle.
    document.fonts?.ready.then(measure)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
    }
  }, [panels.length, dir])

  return (
    <>
      {/* ---- pinned, desktop only ---- */}
      <div ref={outer} className="hpin-pinned relative hidden lg:block" style={{ height: '300vh' }}>
        <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden">
          <div ref={track} className="flex w-max items-stretch gap-6 px-[6vw] will-change-transform">
            {panels.map((p, i) => (
              <div key={i} className="shrink-0">
                {p}
              </div>
            ))}
          </div>

          <div className="mx-[6vw] mt-10 flex items-center gap-5">
            <span dir="ltr" className="text-xs font-bold tabular-nums text-[var(--fg-faint)]">
              <span ref={counter}>01</span> / {String(panels.length).padStart(2, '0')}
            </span>
            <div className="h-px flex-1 bg-[var(--line)]">
              <div
                ref={bar}
                className="h-px w-full bg-[var(--fg)]"
                style={{
                  transform: 'scaleX(0)',
                  transformOrigin: dir === 'rtl' ? '100% 50%' : '0 50%',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---- stacked, below lg or with reduced motion ---- */}
      <div className="hpin-strip space-y-5 px-4 py-6 sm:px-6 lg:hidden">
        {panels.map((p, i) => (
          <div key={i}>{p}</div>
        ))}
      </div>
    </>
  )
}
