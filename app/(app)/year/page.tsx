'use client'

import { useEffect, useMemo, useState } from 'react'
import { MONTHS, useI18n } from '@/lib/i18n'
import { WEEK_COLORS, pct } from '@/lib/dates'
import { createClient } from '@/lib/supabase/client'
import type { Habit } from '@/lib/types'
import { Bar, Card, PageHeader, Spinner, StepperNav, rateColor } from '@/components/ui'

type Row = { month: number; completed: number; avg_sleep: number | null }

export default function YearPage() {
  const { t, locale } = useI18n()
  const supabase = useMemo(() => createClient(), [])

  const [year, setYear] = useState(() => new Date().getFullYear())
  const [rows, setRows] = useState<Row[]>([])
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      const [summary, h] = await Promise.all([
        supabase.rpc('monthly_summary', { p_year: year }),
        supabase.from('habits').select('*').eq('active', true).order('position'),
      ])
      if (cancelled) return
      setRows(((summary.data as Row[]) ?? []).sort((a, b) => a.month - b.month))
      setHabits((h.data as Habit[]) ?? [])
      setLoading(false)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [supabase, year])

  const monthlyTarget = habits.reduce((s, h) => s + h.target, 0)
  const totalCompleted = rows.reduce((s, r) => s + Number(r.completed), 0)
  const totalTarget = monthlyTarget * 12
  const totalPct = pct(totalCompleted, totalTarget)

  const sleepVals = rows.map((r) => r.avg_sleep).filter((v): v is number => v != null)
  const yearSleep = sleepVals.length
    ? (sleepVals.reduce((a, b) => a + Number(b), 0) / sleepVals.length).toFixed(1)
    : '—'

  if (loading) return <Spinner label={t.loading} />

  return (
    <>
      <PageHeader
        title={t.yearlySummary}
        subtitle={`${year} · ${t.yearBlurb}`}
        right={
          <StepperNav
            label={String(year)}
            onPrev={() => setYear((y) => y - 1)}
            onNext={() => setYear((y) => y + 1)}
          />
        }
      />

      <Card className="overflow-hidden">
        <div className="scroll-x">
          <table className="w-full border-separate border-spacing-0 text-xs">
            <thead>
              <tr className="bg-[var(--card-2)] text-[10px] text-[var(--fg-faint)]">
                <th className="border-b border-[var(--line)] px-3 py-2 text-start font-semibold">
                  {t.month}
                </th>
                <th className="border-b border-[var(--line)] px-3 py-2 font-semibold">
                  {t.completed}
                </th>
                <th className="border-b border-[var(--line)] px-3 py-2 font-semibold">
                  {t.expected}
                </th>
                <th className="border-b border-[var(--line)] px-3 py-2 font-semibold">{t.rate}</th>
                <th className="w-[45%] border-b border-[var(--line)] px-3 py-2 font-semibold">
                  {t.progress}
                </th>
                <th className="border-b border-[var(--line)] px-3 py-2 font-semibold">
                  {t.avgSleep}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const completed = Number(r.completed)
                const p = pct(completed, monthlyTarget)
                return (
                  <tr key={r.month} className={i % 2 ? 'bg-[var(--row-alt)]' : ''}>
                    <td className="border-b border-[var(--line-soft)] px-3 py-2 font-semibold">
                      {MONTHS[locale][r.month - 1]}
                    </td>
                    <td className="border-b border-[var(--line-soft)] px-3 py-2 text-center font-bold tabular-nums">
                      {completed}
                    </td>
                    <td className="border-b border-[var(--line-soft)] px-3 py-2 text-center tabular-nums text-[var(--fg-faint)]">
                      {monthlyTarget}
                    </td>
                    <td
                      className="border-b border-[var(--line-soft)] px-3 py-2 text-center font-bold tabular-nums"
                      style={{ color: rateColor(p) }}
                    >
                      {p}%
                    </td>
                    <td className="border-b border-[var(--line-soft)] px-3 py-2">
                      <Bar value={p} color={WEEK_COLORS[i % WEEK_COLORS.length]} height={8} />
                    </td>
                    <td className="border-b border-[var(--line-soft)] px-3 py-2 text-center font-bold tabular-nums text-[var(--amber)]">
                      {r.avg_sleep ?? '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="bg-[var(--card-2)] font-extrabold">
                <td className="px-3 py-2.5">{t.yearTotal}</td>
                <td className="px-3 py-2.5 text-center tabular-nums">{totalCompleted}</td>
                <td className="px-3 py-2.5 text-center tabular-nums">{totalTarget}</td>
                <td className="px-3 py-2.5 text-center tabular-nums" style={{ color: rateColor(totalPct) }}>
                  {totalPct}%
                </td>
                <td className="px-3 py-2.5">
                  <Bar value={totalPct} color="var(--brand)" height={10} />
                </td>
                <td className="px-3 py-2.5 text-center tabular-nums text-[var(--amber)]">
                  {yearSleep}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>

      <Card className="mt-4 p-4">
        <h2 className="mb-4 text-sm font-bold">{t.yearProgress}</h2>
        <div className="flex h-44 items-end gap-1.5 sm:gap-2.5">
          {rows.map((r, i) => {
            const p = pct(Number(r.completed), monthlyTarget)
            return (
              <div key={r.month} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-[9px] font-bold tabular-nums text-[var(--fg-faint)] sm:text-[10px]">
                  {p}%
                </span>
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md transition-[height] duration-500"
                    style={{
                      height: `${Math.max(p, 1)}%`,
                      background: WEEK_COLORS[i % WEEK_COLORS.length],
                    }}
                  />
                </div>
                <span className="w-full truncate text-center text-[9px] text-[var(--fg-faint)] sm:text-[10px]">
                  {MONTHS[locale][r.month - 1].slice(0, 4)}
                </span>
              </div>
            )
          })}
        </div>
      </Card>
    </>
  )
}
