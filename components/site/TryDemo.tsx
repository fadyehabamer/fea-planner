'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCopy } from '@/lib/copy'

const DAYS = 7
const TODAY = DAYS - 1
/** Taps before the sign-up nudge appears: enough to have felt the loop once. */
const NUDGE_AFTER = 3

/**
 * The past six days arrive half-ticked so the sheet looks lived in, and today
 * is left empty — that empty column is the invitation. Fixed, not random, so
 * the server render and hydration agree.
 */
const SEED = [
  [1, 1, 0, 1, 1, 1, 0],
  [1, 0, 1, 0, 1, 0, 0],
  [1, 1, 1, 1, 0, 1, 0],
  [0, 1, 0, 1, 1, 0, 0],
  [1, 0, 0, 1, 0, 1, 0],
].map((row) => row.map(Boolean))

function Ring({ pct }: { pct: number }) {
  const r = 26
  const len = 2 * Math.PI * r
  return (
    <div className="relative grid h-16 w-16 shrink-0 place-items-center">
      <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="32" cy="32" r={r} fill="none" stroke="var(--line)" strokeWidth="6" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="var(--pop-edge)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={len}
          strokeDashoffset={len * (1 - pct / 100)}
          style={{ transition: 'stroke-dashoffset 500ms cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      <span dir="ltr" className="text-sm font-black tabular-nums">
        {pct}%
      </span>
    </div>
  )
}

/**
 * A working slice of the habit grid on the landing page. Nothing is saved:
 * the point is to let a visitor feel the one-tap loop before being asked for
 * anything, then offer to keep going for real.
 */
export default function TryDemo() {
  const { c } = useCopy()
  const d = c.demo
  const [grid, setGrid] = useState(SEED)
  const [taps, setTaps] = useState(0)
  const [last, setLast] = useState<string | null>(null)

  const toggle = (h: number, day: number) => {
    setGrid((g) => g.map((row, i) => (i === h ? row.map((v, j) => (j === day ? !v : v)) : row)))
    setTaps((t) => t + 1)
    setLast(`${h}-${day}`)
  }

  const reset = () => {
    setGrid(SEED)
    setTaps(0)
    setLast(null)
  }

  const total = grid.flat().filter(Boolean).length
  const pct = Math.round((total / (grid.length * DAYS)) * 100)
  const nudge = taps >= NUDGE_AFTER

  return (
    <div className="relative rounded-[1.75rem] border border-[var(--line)] bg-[var(--card)] p-4 shadow-2xl shadow-[var(--shadow)] sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em]"
            style={{ background: 'var(--pop)', color: 'var(--pop-ink)' }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {d.label}
          </span>
          <h2 className="display mt-2.5 text-xl font-black sm:text-2xl">{d.title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-end text-[11px] font-bold text-[var(--fg-faint)] sm:block">
            {d.week}
          </div>
          <Ring pct={pct} />
        </div>
      </div>

      <div className="-mx-1 mt-5 overflow-x-auto">
        <table className="w-full border-separate border-spacing-[3px] text-sm sm:border-spacing-[4px]">
          <thead>
            <tr>
              <th className="sr-only">{d.week}</th>
              {d.days.map((day, j) => (
                <th
                  key={j}
                  scope="col"
                  className={`pb-1 text-center text-[11px] font-black ${
                    j === TODAY ? 'text-[var(--fg)]' : 'text-[var(--fg-faint)]'
                  }`}
                >
                  <abbr title={d.daysFull[j]} className="no-underline">
                    {j === TODAY ? d.today : day}
                  </abbr>
                </th>
              ))}
              <th className="hidden w-10 sm:table-cell" />
            </tr>
          </thead>
          <tbody>
            {d.habits.map((habit, h) => {
              const rowPct = Math.round((grid[h].filter(Boolean).length / DAYS) * 100)
              return (
                <tr key={habit}>
                  <th
                    scope="row"
                    className="w-24 pe-1 text-start text-xs font-bold leading-tight text-[var(--fg-dim)] sm:w-32 sm:text-[13px]"
                  >
                    {habit}
                  </th>
                  {grid[h].map((on, day) => {
                    const isToday = day === TODAY
                    const beckon = isToday && taps === 0 && h === 0
                    return (
                      <td key={day} className="p-0 text-center">
                        <button
                          type="button"
                          onClick={() => toggle(h, day)}
                          aria-pressed={on}
                          aria-label={`${habit} — ${d.daysFull[day]}`}
                          className={`cell-btn grid h-8 w-full min-w-7 cursor-pointer place-items-center rounded-lg border outline-offset-2 focus-visible:outline-2 focus-visible:outline-[var(--fg)] sm:h-9 ${
                            on ? '' : 'hover:border-[var(--fg-faint)]'
                          } ${beckon ? 'pulse-ring' : ''} ${last === `${h}-${day}` && on ? 'tick-in' : ''}`}
                          style={
                            on
                              ? { background: 'var(--pop)', borderColor: 'var(--pop-edge)', color: 'var(--pop-ink)' }
                              : {
                                  background: isToday ? 'var(--pop-soft)' : 'var(--field)',
                                  borderColor: isToday ? 'var(--pop-edge)' : 'var(--line-soft)',
                                  borderStyle: isToday ? 'dashed' : 'solid',
                                }
                          }
                        >
                          {on ? (
                            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                              <path
                                d="M20 6L9 17l-5-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : null}
                        </button>
                      </td>
                    )
                  })}
                  <td
                    dir="ltr"
                    className="hidden w-10 ps-1 text-end text-[11px] font-black tabular-nums text-[var(--fg-faint)] sm:table-cell"
                  >
                    {rowPct}%
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Announced politely so screen-reader users get the same payoff. */}
      <div aria-live="polite" className="min-h-0">
        {nudge ? (
          <div
            className="nudge-in mt-5 flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
            style={{ background: 'var(--fg)', color: 'var(--bg)' }}
          >
            <div>
              <p className="display text-lg font-black">{d.nudgeTitle}</p>
              <p className="mt-1 text-sm opacity-75">{d.nudgeBody}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={reset}
                className="min-h-11 cursor-pointer px-2 text-xs font-bold underline-offset-4 opacity-70 hover:underline hover:opacity-100"
              >
                {d.reset}
              </button>
              <Link
                href="/login"
                className="inline-flex min-h-11 items-center rounded-full px-5 text-sm font-black transition-transform duration-200 hover:scale-[1.04]"
                style={{ background: 'var(--pop)', color: 'var(--pop-ink)' }}
              >
                {d.nudgeCta}
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
