/**
 * Pen-and-paper marks for the notebook landing page. All decorative: every
 * piece is aria-hidden, and the paths use pathLength="1" so the .draw class
 * can animate any of them with the same dash trick.
 */

type Tone = 'sun' | 'tang' | 'mint' | 'pink' | 'leaf'

const ink = (tone: Tone) => `var(--${tone})`

/** A loose hand-drawn loop around whatever sits in the same relative box. */
export function Circled({ tone = 'tang', delay = 700 }: { tone?: Tone; delay?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 100"
      preserveAspectRatio="none"
      className="draw pointer-events-none absolute -inset-x-[8%] -inset-y-[22%] h-[144%] w-[116%]"
      style={{ '--draw-delay': `${delay}ms` } as React.CSSProperties}
    >
      <path
        pathLength={1}
        d="M246 14C190 2 76 4 30 22 2 34 4 70 40 84c52 20 190 18 236-6 26-14 22-46-10-60-36-16-120-16-176-6"
        fill="none"
        stroke={ink(tone)}
        strokeWidth="6"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/** A wavy pen underline, stretched to its parent's width. */
export function Underline({ tone = 'sun', delay = 500 }: { tone?: Tone; delay?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 20"
      preserveAspectRatio="none"
      className="draw pointer-events-none absolute inset-x-0 -bottom-[0.18em] h-[0.3em] w-full"
      style={{ '--draw-delay': `${delay}ms` } as React.CSSProperties}
    >
      <path
        pathLength={1}
        d="M3 13C40 5 70 17 110 10s72 6 110 1 58-4 77 0"
        fill="none"
        stroke={ink(tone)}
        strokeWidth="7"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/** A curly pen arrow. Mirrors itself in Arabic so it still points inward. */
export function CurlyArrow({ className = '', delay = 1200 }: { className?: string; delay?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 90"
      className={`draw pointer-events-none rtl:-scale-x-100 ${className}`}
      style={{ '--draw-delay': `${delay}ms` } as React.CSSProperties}
    >
      <path
        pathLength={1}
        d="M8 12c30-6 58 4 60 26 2 20-22 26-26 12-4-16 24-24 44-10 12 8 18 22 20 38"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        pathLength={1}
        d="M92 64l14 16 10-20"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** A chunky twelve-point burst, for price tags and "free" stickers. */
export function Burst({ tone = 'sun', className = '' }: { tone?: Tone; className?: string }) {
  const pts = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2
    const r = i % 2 === 0 ? 50 : 40
    return `${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')
  return (
    <svg aria-hidden="true" viewBox="-4 -4 108 108" className={className}>
      <polygon points={pts} fill="var(--hard)" transform="translate(3 3)" />
      <polygon points={pts} fill={ink(tone)} stroke="var(--edge)" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  )
}

/** A five-point doodle star. */
export function Star({ tone = 'pink', className = '' }: { tone?: Tone; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className={className}>
      <path
        d="M24 3l6 14 15 1-11 10 4 15-14-8-14 8 4-15L3 18l15-1z"
        fill={ink(tone)}
        stroke="var(--edge)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Washi tape. Place inside a `relative` parent; position with className. */
export function Tape({
  tone = 'sun',
  rotate = -6,
  className = '',
}: {
  tone?: Tone
  rotate?: number
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={`tape ${className}`}
      style={{ '--tape': ink(tone), transform: `rotate(${rotate}deg)` } as React.CSSProperties}
    />
  )
}

/** A rounded pill sticker that bobs slightly. */
export function Sticker({
  children,
  tone = 'sun',
  rotate = -6,
  bob = 5,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  tone?: Tone
  rotate?: number
  bob?: number
  delay?: number
  className?: string
}) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <span className="pop-in block" style={{ '--pop-delay': `${delay}ms` } as React.CSSProperties}>
        <span
          className="sticker bob chunky-sm block whitespace-nowrap rounded-full px-4 py-2 text-sm font-extrabold"
          style={
            {
              '--r': `${rotate}deg`,
              '--bob': `${bob}s`,
              '--bob-delay': `${delay / 1000}s`,
              background: ink(tone),
              color: 'var(--on)',
            } as React.CSSProperties
          }
        >
          {children}
        </span>
      </span>
    </span>
  )
}
