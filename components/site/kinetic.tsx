'use client'

import { Fragment, useEffect, useId, useRef } from 'react'

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Pointer effects only make sense with a mouse or trackpad. On touch they'd
 *  fire on tap and leave the element stuck mid-tilt. */
function finePointer() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

/**
 * Pulls its child toward the cursor, then springs back when the cursor leaves.
 * The listener sits on a padded wrapper, so the pull starts before the pointer
 * actually reaches the button — that is what makes it read as magnetic.
 */
export function Magnetic({
  children,
  strength = 0.3,
}: {
  children: React.ReactNode
  strength?: number
}) {
  const zone = useRef<HTMLSpanElement>(null)
  const body = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const z = zone.current
    const b = body.current
    if (!z || !b || !finePointer() || reducedMotion()) return

    let raf = 0
    const move = (e: PointerEvent) => {
      const r = z.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) * strength
      const y = (e.clientY - (r.top + r.height / 2)) * strength
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        b.style.transform = `translate3d(${x}px, ${y}px, 0)`
      })
    }
    const leave = () => {
      cancelAnimationFrame(raf)
      b.style.transform = ''
    }

    z.addEventListener('pointermove', move)
    z.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      z.removeEventListener('pointermove', move)
      z.removeEventListener('pointerleave', leave)
    }
  }, [strength])

  return (
    <span ref={zone} className="-m-5 inline-block p-5">
      <span ref={body} className="magnetic inline-block">
        {children}
      </span>
    </span>
  )
}

/**
 * Tilts in 3D toward the pointer, with a soft glare that tracks it. Values are
 * written as CSS variables, so the browser does the transform and React never
 * re-renders on pointer movement.
 */
export function Tilt({
  children,
  max = 6,
  className = '',
  style,
}: {
  children: React.ReactNode
  max?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !finePointer() || reducedMotion()) return

    let raf = 0
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.dataset.active = 'true'
        el.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`)
        el.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`)
        el.style.setProperty('--mx', `${px * 100}%`)
        el.style.setProperty('--my', `${py * 100}%`)
      })
    }
    const leave = () => {
      cancelAnimationFrame(raf)
      el.dataset.active = 'false'
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [max])

  return (
    <div ref={ref} className={`tilt ${className}`} style={style}>
      {children}
    </div>
  )
}

/** Circular text badge that turns slowly. Purely decorative. */
export function SpinningBadge({ text, size = 128 }: { text: string; size?: number }) {
  // useId output contains characters that are awkward in a URL fragment.
  const id = `badge${useId().replace(/[^a-zA-Z0-9]/g, '')}`

  return (
    <div aria-hidden="true" className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="spin-slow h-full w-full" direction="ltr">
        <defs>
          <path id={id} d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
        </defs>
        <text
          fill="var(--fg)"
          style={{ fontSize: 9.6, fontWeight: 800, letterSpacing: '0.18em' }}
        >
          {/* 2πr for r=47 is ~295; spacing is stretched to close the ring exactly. */}
          <textPath href={`#${id}`} textLength="292" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--fg)] text-[var(--bg)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </span>
      </div>
    </div>
  )
}

function Asterisk() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="spin-slow mx-6 h-[0.45em] w-[0.45em] shrink-0 sm:mx-10"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M11 2h2v7.6l5.4-5.4 1.4 1.4-5.4 5.4H22v2h-7.6l5.4 5.4-1.4 1.4-5.4-5.4V22h-2v-7.6l-5.4 5.4-1.4-1.4 5.4-5.4H2v-2h7.6L4.2 5.6l1.4-1.4 5.4 5.4z" />
    </svg>
  )
}

/**
 * Poster-scale ticker. Alternating words are filled and outlined. The track is
 * forced LTR so the -50% loop stays seamless in both languages, while each
 * word keeps its own direction.
 */
export function MegaMarquee({
  items,
  reverse = false,
  speed = '44s',
  outlineFirst = false,
}: {
  items: readonly string[]
  reverse?: boolean
  speed?: string
  outlineFirst?: boolean
}) {
  const row = [...items, ...items]
  return (
    <div aria-hidden="true" className="overflow-hidden py-3">
      <div
        dir="ltr"
        className="marquee-track"
        data-reverse={reverse}
        style={{ '--marquee-speed': speed } as React.CSSProperties}
      >
        {row.map((w, i) => (
          <span
            key={i}
            className="display flex shrink-0 items-center text-[clamp(2.75rem,8vw,7rem)] font-black leading-[1.1]"
          >
            <span dir="auto" className={(i % 2 === 0) === outlineFirst ? 'outline-text' : ''}>
              {w}
            </span>
            <Asterisk />
          </span>
        ))}
      </div>
    </div>
  )
}

/**
 * Headline whose words rise out of a mask in sequence, with the accent phrase
 * kept whole under a highlighter swipe. Screen readers get the sentence once,
 * from a visually hidden copy; the animated words are hidden from them so the
 * heading isn't read out word by word.
 */
export function SplitHeadline({
  lead,
  accent,
  tail = '',
  className = '',
}: {
  lead: string
  accent: string
  tail?: string
  className?: string
}) {
  const split = (t: string) => t.split(' ').filter(Boolean)
  const words = [
    ...split(lead).map((w) => ({ w, mark: false })),
    { w: accent, mark: true },
    ...split(tail).map((w) => ({ w, mark: false })),
  ]

  return (
    <h1 className={className}>
      <span className="sr-only">{[lead, accent, tail].filter(Boolean).join(' ')}</span>
      <span aria-hidden="true">
        {words.map(({ w, mark }, i) => (
          <Fragment key={i}>
            {/* The highlighter overhangs its words, so its mask gets side room. */}
            <span className={`word-mask ${mark ? 'px-[0.14em] -mx-[0.14em]' : ''}`}>
              <span className="word" style={{ '--i': i } as React.CSSProperties}>
                {mark ? <span className="marker">{w}</span> : w}
              </span>
            </span>{' '}
          </Fragment>
        ))}
      </span>
    </h1>
  )
}
