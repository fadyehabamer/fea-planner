'use client'

import { useEffect, useRef, useState } from 'react'
import Reveal from '@/components/site/Reveal'

type Feature = {
  eyebrow: string
  title: string
  body: string
  points: readonly string[]
}

function Tick() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-[3px] h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function Copy({ feature, index }: { feature: Feature; index: number }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="display text-[11px] font-extrabold tabular-nums text-[var(--fg-faint)]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="h-px w-8 bg-[var(--line)]" />
        <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--fg-faint)]">
          {feature.eyebrow}
        </span>
      </div>

      <h2 className="display mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
        {feature.title}
      </h2>
      <p className="mt-4 text-[15px] leading-[1.75] text-[var(--fg-dim)]">{feature.body}</p>

      <ul className="mt-6 space-y-3">
        {feature.points.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-sm text-[var(--fg-dim)]">
            <Tick />
            {p}
          </li>
        ))}
      </ul>
    </>
  )
}

/**
 * Desktop: the visual column pins while the three copy blocks scroll past it,
 * crossfading to whichever feature is currently in view.
 * Below lg the whole idea collapses to plain stacked pairs — pinning on a
 * phone just steals the screen.
 */
export default function FeatureScroller({
  features,
  visuals,
}: {
  features: readonly Feature[]
  visuals: React.ReactNode[]
}) {
  const [active, setActive] = useState(0)
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const els = blockRefs.current.filter(Boolean) as HTMLDivElement[]
    if (els.length === 0 || !('IntersectionObserver' in window)) return

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the middle of the viewport, so the visual
        // never flickers between two blocks that are both partly visible.
        let best: IntersectionObserverEntry | null = null
        for (const e of entries) {
          if (!e.isIntersecting) continue
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e
        }
        if (!best) return
        const i = els.indexOf(best.target as HTMLDivElement)
        if (i >= 0) setActive(i)
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: [0.1, 0.5, 1] },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="border-b border-[var(--line-soft)]">
      {/* ---- below lg: straightforward stacked pairs ---- */}
      <div className="lg:hidden">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`border-b border-[var(--line-soft)] px-4 py-16 last:border-b-0 sm:px-6 ${
              i % 2 ? 'bg-[var(--bg-2)]' : ''
            }`}
          >
            <Reveal>
              <Copy feature={f} index={i} />
            </Reveal>
            <Reveal delay={90} className="mt-8">
              {visuals[i]}
            </Reveal>
          </div>
        ))}
      </div>

      {/* ---- lg and up: pinned visual, scrolling copy ---- */}
      <div className="mx-auto hidden max-w-6xl gap-16 px-6 lg:grid lg:grid-cols-2">
        <div>
          {features.map((f, i) => (
            <div
              key={f.title}
              ref={(el) => {
                blockRefs.current[i] = el
              }}
              className="flex min-h-[78vh] flex-col justify-center py-10"
            >
              <Reveal>
                <Copy feature={f} index={i} />
              </Reveal>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="sticky-visual flex h-[78vh] items-center">
            <div className="relative w-full">
              {visuals.map((v, i) => (
                <div
                  key={i}
                  aria-hidden={i !== active}
                  className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    i === 0 ? '' : 'absolute inset-0'
                  } ${
                    i === active
                      ? 'pointer-events-auto opacity-100 blur-0'
                      : 'pointer-events-none opacity-0 blur-[2px]'
                  }`}
                  style={{
                    transform: i === active ? 'scale(1)' : 'scale(0.97)',
                  }}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>

          {/* progress ticks, one per feature */}
          <div className="sticky top-1/2 flex -translate-y-1/2 justify-center gap-2 pt-4">
            {features.map((f, i) => (
              <span
                key={f.title}
                aria-hidden="true"
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 28 : 10,
                  background: i === active ? 'var(--fg)' : 'var(--line)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
