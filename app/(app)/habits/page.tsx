'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { MONTHS, WEEKDAYS_SHORT, useI18n } from '@/lib/i18n'
import { WEEK_COLORS, iso, monthDays, pct, weekBand } from '@/lib/dates'
import {
  averageSleep,
  countPerDay,
  countPerHabit,
  groupWeekBands,
  habitName,
  logKey,
  monthSummary,
  parseSleepHours,
  topHabits,
  weekStats as computeWeekStats,
} from '@/lib/stats'
import { createClient } from '@/lib/supabase/client'
import type { Habit } from '@/lib/types'
import { Bar, Card, PageHeader, Spinner, StatCard, StepperNav, rateColor } from '@/components/ui'

const TODAY_ISO = iso(new Date())

export default function HabitsPage() {
  const { t, locale } = useI18n()
  const supabase = useMemo(() => createClient(), [])

  const now = new Date()
  const [cursor, setCursor] = useState(() => new Date(now.getFullYear(), now.getMonth(), 1))
  const [userId, setUserId] = useState<string | null>(null)
  const [habits, setHabits] = useState<Habit[]>([])
  const [logs, setLogs] = useState<Set<string>>(new Set())
  const [sleep, setSleep] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  const year = cursor.getFullYear()
  const month0 = cursor.getMonth()
  const days = useMemo(() => monthDays(year, month0), [year, month0])
  const firstDay = days[0]
  const lastDay = days[days.length - 1]

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return
      if (!cancelled) setUserId(user.id)

      const [h, l, s] = await Promise.all([
        supabase.from('habits').select('*').eq('active', true).order('position'),
        supabase.from('habit_logs').select('habit_id,day').gte('day', firstDay).lte('day', lastDay),
        supabase.from('sleep_logs').select('day,hours').gte('day', firstDay).lte('day', lastDay),
      ])

      if (cancelled) return
      setHabits((h.data as Habit[]) ?? [])
      setLogs(new Set(((l.data as { habit_id: string; day: string }[]) ?? []).map((r) => logKey(r.habit_id, r.day))))
      setSleep(
        Object.fromEntries(
          ((s.data as { day: string; hours: number }[]) ?? []).map((r) => [r.day, Number(r.hours)]),
        ),
      )
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [supabase, firstDay, lastDay])

  const toggle = useCallback(
    async (habitId: string, day: string) => {
      if (!userId) return
      const key = logKey(habitId, day)
      const wasOn = logs.has(key)

      // Optimistic: the cell flips instantly, the write follows.
      setLogs((prev) => {
        const next = new Set(prev)
        if (wasOn) next.delete(key)
        else next.add(key)
        return next
      })

      const { error } = wasOn
        ? await supabase.from('habit_logs').delete().eq('habit_id', habitId).eq('day', day)
        : await supabase.from('habit_logs').insert({ habit_id: habitId, day, user_id: userId })

      if (error) {
        setLogs((prev) => {
          const next = new Set(prev)
          if (wasOn) next.add(key)
          else next.delete(key)
          return next
        })
      }
    },
    [logs, supabase, userId],
  )

  async function setSleepHours(day: string, raw: string) {
    const value = parseSleepHours(raw)
    if (value === undefined) return

    setSleep((prev) => {
      const next = { ...prev }
      if (value === null) delete next[day]
      else next[day] = value
      return next
    })

    if (!userId) return
    if (value === null) {
      await supabase.from('sleep_logs').delete().eq('day', day).eq('user_id', userId)
    } else {
      await supabase
        .from('sleep_logs')
        .upsert({ user_id: userId, day, hours: value }, { onConflict: 'user_id,day' })
    }
  }

  // ---- derived numbers -------------------------------------------------
  const perHabitDone = useMemo(() => countPerHabit(habits, logs), [habits, logs])
  const perDayDone = useMemo(() => countPerDay(days, logs), [days, logs])

  const { completed, missed, overall } = monthSummary(habits, days.length, logs.size)
  const avgSleep = averageSleep(Object.values(sleep))

  const bands = useMemo(() => groupWeekBands(days), [days])

  const weekStats = useMemo(
    () => computeWeekStats(bands, perDayDone, habits.length),
    [bands, perDayDone, habits.length],
  )

  const top5 = useMemo(() => topHabits(habits, perHabitDone, 5), [habits, perHabitDone])

  const name = (h: Habit) => habitName(h, locale)

  function shiftMonth(delta: number) {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1))
  }

  if (loading) return <Spinner label={t.loading} />

  return (
    <>
      <PageHeader
        title={`${MONTHS[locale][month0]} ${year}`}
        subtitle={`${t.habitTracker} · ${t.integratedSystem}`}
        right={
          <StepperNav
            label={`${MONTHS[locale][month0]} ${year}`}
            onPrev={() => shiftMonth(-1)}
            onNext={() => shiftMonth(1)}
          />
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
        <StatCard label={t.completed} value={completed} color="var(--w3)" />
        <StatCard label={t.missed} value={missed} color="var(--w4)" />
        <StatCard label={t.overall} value={`${overall}%`} color="var(--brand)" />
        <StatCard
          label={t.avgSleep}
          value={avgSleep === '—' ? '—' : `${avgSleep}${t.hoursShort}`}
          sub={t.monthSummary}
          color="var(--amber)"
        />
      </div>

      {habits.length === 0 ? (
        <Card className="p-8 text-center text-sm text-[var(--fg-dim)]">{t.settingsBlurb}</Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="scroll-x">
            <table className="w-full border-separate border-spacing-0 text-[11px]">
              <thead>
                <tr>
                  <th
                    className="sticky-col border-b border-[var(--line-soft)] p-0"
                    style={{ background: 'var(--card)' }}
                  />
                  <th className="border-b border-[var(--line-soft)] p-0" />
                  {bands.map(({ band, days: bd }) => (
                    <th
                      key={band}
                      colSpan={bd.length}
                      className="border-b border-[var(--line-soft)] px-1 py-1 text-[10px] font-bold text-white"
                      style={{ background: WEEK_COLORS[band] }}
                    >
                      {t.week} {band + 1}
                    </th>
                  ))}
                  <th colSpan={3} className="border-b border-[var(--line-soft)] p-0" />
                </tr>
                <tr className="bg-[var(--card-2)]">
                  <th
                    className="sticky-col border-b border-[var(--line)] px-3 py-2 text-start text-[11px] font-bold"
                    style={{ background: 'var(--card-2)' }}
                  >
                    {t.dailyHabits}
                  </th>
                  <th className="border-b border-[var(--line)] px-1.5 py-2 text-[10px] font-semibold text-[var(--fg-faint)]">
                    {t.target}
                  </th>
                  {days.map((d, i) => {
                    const isToday = d === TODAY_ISO
                    const wd = new Date(year, month0, i + 1).getDay()
                    return (
                      <th
                        key={d}
                        className={`border-b border-[var(--line)] px-0.5 py-1 text-[10px] font-bold ${
                          isToday ? 'text-[var(--brand)]' : 'text-[var(--fg-dim)]'
                        }`}
                      >
                        <div>{i + 1}</div>
                        <div className="text-[8px] font-medium text-[var(--fg-faint)]">
                          {WEEKDAYS_SHORT[locale][wd]}
                        </div>
                      </th>
                    )
                  })}
                  <th className="border-b border-[var(--line)] px-1.5 py-2 text-[10px] font-semibold text-[var(--fg-faint)]">
                    {t.doneCount}
                  </th>
                  <th className="border-b border-[var(--line)] px-1.5 py-2 text-[10px] font-semibold text-[var(--fg-faint)]">
                    {t.rate}
                  </th>
                  <th className="border-b border-[var(--line)] px-2 py-2 text-[10px] font-semibold text-[var(--fg-faint)]">
                    {t.progress}
                  </th>
                </tr>
              </thead>

              <tbody>
                {habits.map((h, rowIdx) => {
                  const done = perHabitDone[h.id] ?? 0
                  const rate = pct(done, h.target)
                  return (
                    <tr key={h.id} className={rowIdx % 2 ? 'bg-[var(--row-alt)]' : ''}>
                      <th
                        className="sticky-col border-b border-[var(--line-soft)] px-3 py-1 text-start font-semibold"
                        style={{ background: rowIdx % 2 ? 'var(--row-alt)' : 'var(--card)' }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-4 shrink-0 text-[10px] text-[var(--fg-faint)]">
                            {h.position}
                          </span>
                          <span className="block max-w-[150px] truncate sm:max-w-[190px]" title={name(h)}>
                            {name(h)}
                          </span>
                        </div>
                      </th>
                      <td className="border-b border-[var(--line-soft)] px-1.5 text-center text-[10px] text-[var(--fg-faint)]">
                        {h.target}
                      </td>
                      {days.map((d, i) => {
                        const on = logs.has(logKey(h.id, d))
                        const color = WEEK_COLORS[weekBand(i + 1)]
                        return (
                          <td key={d} className="border-b border-[var(--line-soft)] px-0.5 py-0.5 text-center">
                            <button
                              onClick={() => toggle(h.id, d)}
                              aria-pressed={on}
                              aria-label={`${name(h)} — ${d}`}
                              className="cell-btn grid h-[22px] w-[22px] place-items-center rounded-[5px] border"
                              style={{
                                background: on ? color : 'var(--field)',
                                borderColor: on ? color : 'var(--line)',
                              }}
                            >
                              {on ? (
                                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                              ) : null}
                            </button>
                          </td>
                        )
                      })}
                      <td className="border-b border-[var(--line-soft)] px-1.5 text-center font-bold">
                        {done}
                      </td>
                      <td
                        className="border-b border-[var(--line-soft)] px-1.5 text-center font-bold"
                        style={{ color: rateColor(rate) }}
                      >
                        {rate}%
                      </td>
                      <td className="border-b border-[var(--line-soft)] px-2 py-1">
                        <div className="w-[90px]">
                          <Bar value={rate} color={rateColor(rate)} height={7} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>

              <tfoot className="bg-[var(--card-2)]">
                <tr>
                  <th style={{ background: 'var(--card-2)' }}
                    className="sticky-col px-3 py-1.5 text-start text-[10px] font-bold text-[var(--fg-dim)]">
                    {t.dailyCompleted}
                  </th>
                  <td />
                  {days.map((d) => (
                    <td key={d} className="px-0.5 text-center text-[10px] font-bold">
                      {perDayDone[d] || ''}
                    </td>
                  ))}
                  <td className="text-center text-[10px] font-bold">{completed}</td>
                  <td colSpan={2} />
                </tr>
                <tr>
                  <th style={{ background: 'var(--card-2)' }}
                    className="sticky-col px-3 py-1.5 text-start text-[10px] font-bold text-[var(--fg-dim)]">
                    {t.dailyRate}
                  </th>
                  <td />
                  {days.map((d) => {
                    const p = pct(perDayDone[d] ?? 0, habits.length)
                    return (
                      <td
                        key={d}
                        className="px-0.5 text-center text-[9px] font-bold"
                        style={{ color: p ? rateColor(p) : 'var(--fg-faint)' }}
                      >
                        {p ? `${p}%` : ''}
                      </td>
                    )
                  })}
                  <td className="text-center text-[10px] font-bold" style={{ color: rateColor(overall) }}>
                    {overall}%
                  </td>
                  <td colSpan={2} />
                </tr>
                <tr>
                  <th style={{ background: 'var(--card-2)' }}
                    className="sticky-col px-3 py-1.5 text-start text-[10px] font-bold text-[var(--amber)]">
                    {t.sleepHours}
                  </th>
                  <td />
                  {days.map((d) => (
                    <td key={d} className="px-0.5 py-1 text-center">
                      <input
                        inputMode="decimal"
                        dir="ltr"
                        value={sleep[d] ?? ''}
                        onChange={(e) => setSleepHours(d, e.target.value)}
                        aria-label={`${t.sleepHours} ${d}`}
                        className="h-[22px] w-[30px] rounded-[5px] border border-[var(--line)] bg-[var(--field)] text-center text-[10px] font-bold text-[var(--amber)] outline-none focus:border-[var(--amber)]"
                      />
                    </td>
                  ))}
                  <td className="text-center text-[10px] font-bold text-[var(--amber)]">{avgSleep}</td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      )}

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <Card className="p-4">
          <h2 className="mb-3 text-sm font-bold">{t.top5}</h2>
          <div className="space-y-2.5">
            {top5.map(({ h, done, rate }, i) => (
              <div key={h.id} className="flex items-center gap-3">
                <span className="w-4 text-[10px] font-bold text-[var(--fg-faint)]">{i + 1}</span>
                <span className="w-36 shrink-0 truncate text-xs sm:w-52" title={name(h)}>
                  {name(h)}
                </span>
                <div className="flex-1">
                  <Bar value={rate} color={WEEK_COLORS[i % WEEK_COLORS.length]} height={7} />
                </div>
                <span className="w-8 text-end text-[11px] font-bold tabular-nums">{done}</span>
              </div>
            ))}
            {top5.length === 0 ? (
              <p className="text-xs text-[var(--fg-faint)]">—</p>
            ) : null}
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="mb-3 text-sm font-bold">{t.weeklyProgress}</h2>
          <div className="space-y-2.5">
            {weekStats.map((w) => (
              <div key={w.band} className="flex items-center gap-3">
                <span className="w-16 shrink-0 text-xs font-semibold" style={{ color: WEEK_COLORS[w.band] }}>
                  {t.week} {w.band + 1}
                </span>
                <div className="flex-1">
                  <Bar value={w.pct} color={WEEK_COLORS[w.band]} height={7} />
                </div>
                <span className="w-10 text-end text-[11px] font-bold tabular-nums">{w.pct}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
