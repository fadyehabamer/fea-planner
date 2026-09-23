'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Tape } from '@/components/site/doodles'
import { useCopy } from '@/lib/copy'

const DAYS = 7
const TODAY = DAYS - 1
/** Taps before the sign-up nudge appears: enough to have felt the loop once. */
const NUDGE_AFTER = 3

/** One sticker colour per habit, so a ticked row reads as that habit's own. */
const TONES = ['var(--tang)', 'var(--mint)', 'var(--sun)', 'var(--pink)', 'var(--leaf)']

/**
 * The past six days arrive half-ticked so the page looks lived in, and today
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

/** Fixed confetti spray: direction, distance, spin and colour per piece. */
const CONFETTI = Array.from({ length: 22 }, (_, i) => {
  const a = (i / 22) * Math.PI * 2 + (i % 3) * 0.3
  const dist = 110 + ((i * 37) % 90)
  return {
    x: `${Math.round(Math.cos(a) * dist)}px`,
    y: `${Math.round(Math.sin(a) * dist - 40)}px`,
    rot: `${(i % 2 ? 1 : -1) * (180 + ((i * 53) % 360))}deg`,
    bg: TONES[i % TONES.length],
  }
})

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="M20 6L9 17l-5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * A working slice of the habit grid, drawn as a taped-in notebook page.
 * Nothing is saved: the point is to let a visitor feel the one-tap loop —
 * and a little reward for it — before being asked for anything.
 */
export default function TryDemo() {
  const { c } = useCopy()
  const d = c.demo
  const [grid, setGrid] = useState(SEED)
  const [taps, setTaps] = useState(0)
  const [last, setLast] = useState<{ key: string; n: number } | null>(null)
  const [party, setParty] = useState(0)

  const toggle = (h: number, day: number) => {
    const next = grid.map((row, i) => (i === h ? row.map((v, j) => (j === day ? !v : v)) : row))
    const nowOn = next[h][day]
    const todayDone = next.every((row) => row[TODAY])
    const wasDone = grid.every((row) => row[TODAY])
    setGrid(next)
    setTaps((t) => t + 1)
    setLast(nowOn ? { key: `${h}-${day}`, n: taps } : null)
    // Keyed by a counter so a second full day replays the burst.
    if (todayDone && !wasDone) setParty((p) => p + 1)
  }

  const reset = () => {
    setGrid(SEED)
    setTaps(0)
    setLast(null)
    setParty(0)
  }

  const total = grid.flat().filter(Boolean).length
  const pct = Math.round((total / (grid.length * DAYS)) * 100)
  const perfect = grid.every((row) => row[TODAY])
  const nudge = taps >= NUDGE_AFTER || perfect

  return (
    <div className="relative">
      <Tape tone="pink" rotate={-8} className="-top-3 start-8" />
      <Tape tone="mint" rotate={7} className="-top-3 end-10" />

      <div
        className="chunky paper relative rounded-[1.75rem] bg-[var(--card)] p-4 pt-6 sm:p-7 sm:pt-8"
        style={{ boxShadow: '8px 8px 0 var(--hard)' }}
      >
        {party > 0 ? (
          <div key={party} className="confetti" aria-hidden="true">
            {CONFETTI.map((p, i) => (
              <i
                key={i}
                style={
                  {
                    '--x': p.x,
                    '--y': p.y,
                    '--rot': p.rot,
                    background: p.bg,
                    animationDelay: `${(i % 5) * 25}ms`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        ) : null}

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="hand text-2xl leading-none text-[var(--fg-dim)] sm:text-[1.7rem]">{d.label}</p>
            <h2 className="display mt-1.5 text-2xl font-extrabold sm:text-3xl">{d.title}</h2>
          </div>
          <div
            className="chunky-sm grid shrink-0 place-items-center rounded-2xl px-3 py-2 text-center"
            style={{ background: 'var(--sun)', color: 'var(--on)' }}
          >
            <span dir="ltr" className="display text-2xl font-extrabold tabular-nums leading-none sm:text-3xl">
              {pct}%
            </span>
            <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide">{d.week}</span>
          </div>
        </div>

        <div className="-mx-1 mt-5 overflow-x-auto">
          <table className="w-full border-separate border-spacing-[3px] text-sm sm:border-spacing-[5px]">
            <thead>
              <tr>
                <th className="sr-only">{d.week}</th>
                {d.days.map((day, j) => (
                  <th
                    key={j}
                    scope="col"
                    className={`pb-1 text-center text-[11px] font-extrabold ${
                      j === TODAY ? 'text-[var(--fg)]' : 'text-[var(--fg-faint)]'
                    }`}
                  >
                    <abbr title={d.daysFull[j]} className="no-underline">
                      {j === TODAY ? d.today : day}
                    </abbr>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.habits.map((habit, h) => (
                <tr key={habit}>
                  <th
                    scope="row"
                    className="w-24 pe-1 text-start text-xs font-bold leading-tight sm:w-36 sm:text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="hidden h-3 w-3 shrink-0 rounded-full border-2 border-[var(--edge)] sm:block"
                        style={{ background: TONES[h] }}
                      />
                      {habit}
                    </span>
                  </th>
                  {grid[h].map((on, day) => {
                    const isToday = day === TODAY
                    const beckon = isToday && taps === 0 && h === 0
                    const justTicked = on && last?.key === `${h}-${day}`
                    return (
                      <td key={day} className="relative p-0 text-center">
                        <button
                          type="button"
                          onClick={() => toggle(h, day)}
                          aria-pressed={on}
                          aria-label={`${habit} — ${d.daysFull[day]}`}
                          className={`cell-btn grid h-8 w-full min-w-7 cursor-pointer place-items-center rounded-[10px] border-2 outline-offset-2 focus-visible:outline-2 focus-visible:outline-[var(--fg)] sm:h-10 ${
                            beckon ? 'pulse-ring' : ''
                          } ${justTicked ? 'tick-in' : ''}`}
                          style={
                            on
                              ? { background: TONES[h], borderColor: 'var(--edge)', color: 'var(--on)' }
                              : {
                                  background: isToday ? 'var(--card)' : 'var(--field)',
                                  borderColor: isToday ? 'var(--edge)' : 'var(--line)',
                                  borderStyle: isToday ? 'dashed' : 'solid',
                                }
                          }
                        >
                          {on ? <Check /> : null}
                        </button>
                        {justTicked ? (
                          <span
                            key={last?.n}
                            aria-hidden="true"
                            className="plus-one hand pointer-events-none absolute left-1/2 top-0 z-10 text-xl text-[var(--fg)]"
                          >
                            +1
                          </span>
                        ) : null}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Announced politely so screen-reader users get the same payoff. */}
        <div aria-live="polite">
          {nudge ? (
            <div
              className="nudge-in chunky-sm mt-5 flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
              style={{ background: perfect ? 'var(--mint)' : 'var(--sun)', color: 'var(--on)' }}
            >
              <div>
                <p className="display text-lg font-extrabold">{perfect ? d.perfect : d.nudgeTitle}</p>
                <p className="mt-0.5 text-sm font-semibold opacity-80">{d.nudgeBody}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={reset}
                  className="min-h-11 cursor-pointer px-2 text-xs font-bold underline-offset-4 opacity-75 hover:underline hover:opacity-100"
                >
                  {d.reset}
                </button>
                <Link
                  href="/login"
                  className="chunky inline-flex min-h-11 items-center rounded-full px-5 text-sm font-extrabold"
                  style={{ background: 'var(--on)', color: 'var(--sun)', borderColor: 'var(--on)' }}
                >
                  {d.nudgeCta}
                </Link>
              </div>
            </div>
          ) : (
            <p className="hand mt-4 text-center text-xl text-[var(--fg-faint)]">{d.hint}</p>
          )}
        </div>
      </div>
    </div>
  )
}
