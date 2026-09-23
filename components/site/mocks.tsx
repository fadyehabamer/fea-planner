'use client'

/** Decorative stand-ins for the real screens. Purely visual, never announced. */

const DAY_PCT = [100, 67, 75, 100, 40]
const TASKS_PER_DAY = [5, 4, 5, 4, 5]

export function TasksPreview() {
  return (
    <div
      aria-hidden="true"
      className="rounded-[1.75rem] border border-[var(--line-soft)] bg-[var(--card)] p-3 shadow-2xl shadow-[var(--shadow)] sm:p-4"
    >
      <div className="grid grid-cols-5 gap-2">
        {DAY_PCT.map((pct, d) => (
          <div key={d} className="overflow-hidden rounded-xl border border-[var(--line-soft)]">
            <div
              className="h-1.5 w-full"
              style={{ background: 'var(--brand-solid)', opacity: 1 - d * 0.17 }}
            />
            <div className="p-1.5">
              <div className="h-1.5 w-2/3 bg-[var(--line)]" />
              <div
                className="mt-2 text-[13px] font-extrabold leading-none text-[var(--fg)]"
              >
                {pct}%
              </div>
              <div className="mt-1.5 h-1 w-full bg-[var(--line-soft)]">
                <div
                  className="h-1 "
                  style={{ width: `${pct}%`, background: 'var(--brand-solid)', opacity: 1 - d * 0.17 }}
                />
              </div>

              <div className="mt-2.5 space-y-1.5">
                {Array.from({ length: TASKS_PER_DAY[d] }, (_, i) => {
                  const done = i < Math.round((TASKS_PER_DAY[d] * pct) / 100)
                  return (
                    <div key={i} className="flex items-center gap-1">
                      <span
                        className="h-[7px] w-[7px] shrink-0 "
                        style={{
                          background: done ? 'var(--brand-solid)' : 'var(--field)',
                          opacity: done ? 1 - d * 0.17 : 1,
                          border: done ? 'none' : '1px solid var(--line)',
                        }}
                      />
                      <span
                        className="h-[5px] bg-[var(--line)]"
                        style={{ width: `${52 + ((i * 17) % 40)}%` }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const MONTH_PCT = [71, 78, 82, 76, 86, 89, 81, 84, 94, 91, 96, 99]

export function YearPreview() {
  return (
    <div
      aria-hidden="true"
      className="rounded-[1.75rem] border border-[var(--line-soft)] bg-[var(--card)] p-4 shadow-2xl shadow-[var(--shadow)] sm:p-5"
    >
      <div className="mb-4 flex items-end justify-between">
        <div className="h-2 w-24 bg-[var(--line)]" />
        <div className="h-2 w-10 bg-[var(--line)]" />
      </div>

      <div className="flex h-36 items-end gap-1.5">
        {MONTH_PCT.map((pct, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[8px] font-bold tabular-nums text-[var(--fg-faint)]">{pct}</span>
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full "
                style={{
                  height: `${pct}%`,
                  background: 'var(--brand-solid)',
                  opacity: 0.4 + (i / 11) * 0.6,
                }}
              />
            </div>
            <span className="h-[5px] w-full bg-[var(--line)]" />
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2 border-t border-[var(--line-soft)] pt-4">
        {[75, 60, 40].map((pct, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="h-[6px] w-16 shrink-0 bg-[var(--line)]" />
            <div className="h-1.5 flex-1 bg-[var(--line-soft)]">
              <div
                className="h-1.5 "
                style={{ width: `${pct}%`, background: 'var(--brand-solid)', opacity: 1 - i * 0.22 }}
              />
            </div>
            <span
              className="w-8 text-end text-[10px] font-extrabold tabular-nums text-[var(--fg-dim)]"
            >
              {pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
