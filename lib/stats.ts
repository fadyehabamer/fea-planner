// Pure calculations behind the habits, tasks and yearly-summary pages. Kept
// free of React and Supabase so they can be unit-tested directly.
import { pct, weekBand } from './dates'
import type { Habit, Task } from './types'

/** Key for one checked cell in the habit grid: `<habit id>|<YYYY-MM-DD>`. */
export function logKey(habitId: string, day: string): string {
  return `${habitId}|${day}`
}

/**
 * Parse the raw text of a sleep-hours cell.
 * Returns `null` when the cell was cleared, `undefined` when the input is not a
 * number (the edit is ignored), and otherwise the hours clamped to 0-24.
 */
export function parseSleepHours(raw: string): number | null | undefined {
  if (raw === '') return null
  const value = Math.max(0, Math.min(24, Number(raw)))
  return Number.isNaN(value) ? undefined : value
}

/** Mean of the values to one decimal place, or an em dash when there are none. */
export function averageSleep(values: number[]): string {
  if (!values.length) return '—'
  return (values.reduce((a, b) => a + Number(b), 0) / values.length).toFixed(1)
}

/** Checked cells per habit. Logs for habits not in the list are ignored. */
export function countPerHabit(habits: Pick<Habit, 'id'>[], logs: Iterable<string>) {
  const m: Record<string, number> = {}
  for (const h of habits) m[h.id] = 0
  for (const key of logs) {
    const id = key.slice(0, key.indexOf('|'))
    if (id in m) m[id] += 1
  }
  return m
}

/** Checked cells per day. Logs for days outside the list are ignored. */
export function countPerDay(days: string[], logs: Iterable<string>) {
  const m: Record<string, number> = {}
  for (const d of days) m[d] = 0
  for (const key of logs) {
    const d = key.slice(key.indexOf('|') + 1)
    if (d in m) m[d] += 1
  }
  return m
}

export type WeekBand = { band: number; days: string[] }

/** Split a month's days into the coloured week bands (days 29-31 join band 5). */
export function groupWeekBands(days: string[]): WeekBand[] {
  const out: WeekBand[] = []
  days.forEach((d, i) => {
    const b = weekBand(i + 1)
    const last = out[out.length - 1]
    if (last && last.band === b) last.days.push(d)
    else out.push({ band: b, days: [d] })
  })
  return out
}

/** Completion per week band: checked cells out of days × habits. */
export function weekStats(
  bands: WeekBand[],
  perDayDone: Record<string, number>,
  habitCount: number,
) {
  return bands.map(({ band, days }) => {
    const done = days.reduce((s, d) => s + (perDayDone[d] ?? 0), 0)
    const total = days.length * habitCount
    return { band, done, total, pct: pct(done, total) }
  })
}

/** The most consistent habits: highest rate against target, ties broken by count. */
export function topHabits<H extends Pick<Habit, 'id' | 'target'>>(
  habits: H[],
  perHabitDone: Record<string, number>,
  n = 5,
) {
  return [...habits]
    .map((h) => ({ h, done: perHabitDone[h.id] ?? 0, rate: pct(perHabitDone[h.id] ?? 0, h.target) }))
    .sort((a, b) => b.rate - a.rate || b.done - a.done)
    .slice(0, n)
}

/** Headline numbers for the month view. */
export function monthSummary(
  habits: Pick<Habit, 'target'>[],
  dayCount: number,
  completed: number,
) {
  const targetSum = habits.reduce((s, h) => s + h.target, 0)
  return {
    completed,
    missed: Math.max(0, habits.length * dayCount - completed),
    overall: pct(completed, targetSum),
  }
}

/** The habit's name in the current language, falling back to the other one. */
export function habitName(h: Pick<Habit, 'name_ar' | 'name_en'>, locale: 'ar' | 'en'): string {
  return (locale === 'ar' ? h.name_ar : h.name_en) || h.name_en || h.name_ar
}

/** Tasks bucketed by day (only the given days), each bucket sorted by position. */
export function groupTasksByDay(tasks: Task[], days: string[]) {
  const m: Record<string, Task[]> = {}
  for (const d of days) m[d] = []
  for (const task of tasks) m[task.day]?.push(task)
  for (const d of days) m[d].sort((a, b) => a.position - b.position)
  return m
}

/** Position for a task appended after an already position-sorted list. */
export function nextTaskPosition(sorted: Pick<Task, 'position'>[]): number {
  return (sorted.at(-1)?.position ?? 0) + 1
}

export type MonthRow = { month: number; completed: number; avg_sleep: number | null }

/** Year totals from the `monthly_summary` rows (numeric columns may arrive as strings). */
export function yearSummary(rows: MonthRow[], habits: Pick<Habit, 'target'>[]) {
  const monthlyTarget = habits.reduce((s, h) => s + h.target, 0)
  const totalCompleted = rows.reduce((s, r) => s + Number(r.completed), 0)
  const totalTarget = monthlyTarget * 12
  const sleepVals = rows.map((r) => r.avg_sleep).filter((v): v is number => v != null)
  return {
    monthlyTarget,
    totalCompleted,
    totalTarget,
    totalPct: pct(totalCompleted, totalTarget),
    yearSleep: averageSleep(sleepVals.map(Number)),
  }
}
