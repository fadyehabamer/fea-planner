'use client'

const ROWS = 9
const COLS = 28

/**
 * A single rose stepped down in opacity, rather than the app's five week hues.
 * A monochrome ramp is what keeps the page reading as one system.
 */
const BAND_ALPHA = [1, 0.74, 0.5, 0.32]

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
        {BAND_ALPHA.map((a, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full"
            style={{ background: 'var(--brand-solid)', opacity: a }}
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
              const alpha = BAND_ALPHA[Math.min(Math.floor(col / 7), BAND_ALPHA.length - 1)]
              return (
                <div
                  key={col}
                  className="aspect-square flex-1 rounded-[2px]"
                  style={{
                    background: on ? 'var(--brand-solid)' : 'var(--field)',
                    opacity: on ? alpha : 1,
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
            style={{ background: 'var(--fg-faint)', opacity: 0.18 + ((col * 7) % 10) / 22 }}
          />
        ))}
      </div>
    </div>
  )
}
