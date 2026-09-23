/** The five week bands that colour the monthly grid, matching the printed planner. */
export const WEEK_COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#ef4444', '#ec4899'] as const

/** One colour per weekday column in the task tracker. */
export const DAY_COLORS = [
  '#8b5cf6', '#3b82f6', '#10b981', '#ef4444', '#ec4899', '#f59e0b', '#06b6d4',
] as const

/** Local-time YYYY-MM-DD. Never use toISOString() here — it shifts by timezone. */
export function iso(d: Date): string {
  const m = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

export function daysInMonth(year: number, month0: number): number {
  return new Date(year, month0 + 1, 0).getDate()
}

/** Week band 0-4 for a 1-indexed day of the month. Days 29-31 fold into band 5. */
export function weekBand(dayOfMonth: number): number {
  return Math.min(Math.ceil(dayOfMonth / 7), 5) - 1
}

export function addDays(d: Date, n: number): Date {
  const out = new Date(d)
  out.setDate(out.getDate() + n)
  return out
}

/** Sunday-first, matching the weekday order in the planner. */
export function startOfWeek(d: Date): Date {
  return addDays(d, -d.getDay())
}

export function monthDays(year: number, month0: number): string[] {
  const n = daysInMonth(year, month0)
  return Array.from({ length: n }, (_, i) => iso(new Date(year, month0, i + 1)))
}

export function pct(done: number, total: number): number {
  if (total <= 0) return 0
  return Math.round((done / total) * 100)
}
