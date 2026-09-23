'use client'

const ROWS = 9
const COLS = 28

/**
 * Marketing visuals use the two brand tones only. The app's own week bands
 * span five hues including blue and violet, which do not belong on this page.
 */
const BANDS = ['var(--brand-solid)', 'var(--accent)', 'var(--brand-solid)', 'var(--accent)']

/**
 * Deterministic pseudo-noise. Math.random() would differ between the server
 * render and hydration, so the pattern is derived from the cell coordinates.
 */
function filled(row: number, col: number): boolean {
  const h = Math.sin(row * 12.9898 + col * 78.233) * 43758.5453
  const n = h - Math.floor(h)
  // Later rows thin out a little, which reads as a real month rather than noise.
  return n > 0.24 + row * 0.028
}

/** A decorative stand-in for the real monthly grid. Purely visual. */
export default function GridPreview() {
  return (
    <div
      aria-hidden="true"
      className="rounded-2xl border border-[var(--line-soft)] bg-[var(--card)] p-3 shadow-2xl shadow-[var(--shadow)] sm:p-4"
    >
      <div className="mb-3 flex items-center gap-1.5">
        {BANDS.map((c, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full"
            style={{ background: c, opacity: 0.85 }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-[3px]">
        {Array.from({ length: ROWS }, (_, r) => (
          <div key={r} className="flex items-center gap-[3px]">
            <div
              className="h-[9px] shrink-0 rounded-sm bg-[var(--line)]"
              style={{ width: 34 + ((r * 13) % 22) }}
            />
            {Array.from({ length: COLS }, (_, col) => {
              const on = filled(r, col)
              const color = BANDS[Math.min(Math.floor(col / 7), BANDS.length - 1)]
              return (
                <div
                  key={col}
                  className="aspect-square flex-1 rounded-[2px]"
                  style={{
                    background: on ? color : 'var(--field)',
                    opacity: on ? 0.92 : 1,
                    border: on ? 'none' : '1px solid var(--line-soft)',
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-[3px]">
        <div className="h-[9px] w-12 shrink-0 rounded-sm bg-[var(--line)]" />
        {Array.from({ length: COLS }, (_, col) => (
          <div
            key={col}
            className="aspect-square flex-1 rounded-[2px]"
            style={{ background: 'var(--amber)', opacity: 0.2 + ((col * 7) % 10) / 14 }}
          />
        ))}
      </div>
    </div>
  )
}
