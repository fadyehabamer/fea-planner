import { describe, expect, it } from 'vitest'
import { monthDays } from './dates'
import {
  averageSleep,
  countPerDay,
  countPerHabit,
  groupTasksByDay,
  groupWeekBands,
  habitName,
  logKey,
  monthSummary,
  nextTaskPosition,
  parseSleepHours,
  topHabits,
  weekStats,
  yearSummary,
} from './stats'
import type { Habit, Task } from './types'

const habit = (id: string, target: number, extra: Partial<Habit> = {}): Habit => ({
  id,
  position: 1,
  name_ar: '',
  name_en: '',
  target,
  active: true,
  ...extra,
})

const task = (id: string, day: string, position: number, done = false): Task => ({
  id,
  day,
  position,
  title: id,
  done,
})

describe('parseSleepHours', () => {
  it('treats an empty cell as cleared', () => {
    expect(parseSleepHours('')).toBeNull()
  })

  it('parses whole and decimal hours', () => {
    expect(parseSleepHours('7')).toBe(7)
    expect(parseSleepHours('6.5')).toBe(6.5)
  })

  it('clamps to a 0-24 hour day', () => {
    expect(parseSleepHours('30')).toBe(24)
    expect(parseSleepHours('-2')).toBe(0)
  })

  it('rejects non-numeric input', () => {
    expect(parseSleepHours('abc')).toBeUndefined()
    expect(parseSleepHours('7h')).toBeUndefined()
  })
})

describe('averageSleep', () => {
  it('averages to one decimal place', () => {
    expect(averageSleep([7, 8, 6])).toBe('7.0')
    expect(averageSleep([7.5, 6])).toBe('6.8')
  })

  it('shows a dash when nothing was logged', () => {
    expect(averageSleep([])).toBe('—')
  })
})

describe('habit log counting', () => {
  const days = monthDays(2026, 1) // February 2026, 28 days
  const habits = [habit('a', 20), habit('b', 10)]
  const logs = new Set([
    logKey('a', '2026-02-01'),
    logKey('a', '2026-02-02'),
    logKey('b', '2026-02-01'),
    logKey('ghost', '2026-02-01'), // habit since deactivated
    logKey('a', '2026-03-01'), // outside the month
  ])

  it('builds keys as id|day', () => {
    expect(logKey('abc', '2026-02-01')).toBe('abc|2026-02-01')
  })

  it('counts per habit, ignoring unknown habits and starting every habit at 0', () => {
    expect(countPerHabit(habits, logs)).toEqual({ a: 3, b: 1 })
    expect(countPerHabit([habit('c', 1)], new Set())).toEqual({ c: 0 })
  })

  it('counts per day, ignoring days outside the month', () => {
    const perDay = countPerDay(days, logs)
    expect(Object.keys(perDay)).toHaveLength(28)
    expect(perDay['2026-02-01']).toBe(3)
    expect(perDay['2026-02-02']).toBe(1)
    expect(perDay['2026-02-03']).toBe(0)
    expect(perDay['2026-03-01']).toBeUndefined()
  })

  it('handles habit ids that contain dashes (uuids)', () => {
    const id = '3f2a-11ee-b962'
    expect(countPerHabit([habit(id, 5)], [logKey(id, '2026-02-01')])).toEqual({ [id]: 1 })
  })
})

describe('groupWeekBands', () => {
  it('gives a 28-day month four full weeks', () => {
    const bands = groupWeekBands(monthDays(2026, 1))
    expect(bands.map((b) => [b.band, b.days.length])).toEqual([
      [0, 7],
      [1, 7],
      [2, 7],
      [3, 7],
    ])
  })

  it('puts days 29-31 in a short fifth band', () => {
    const bands = groupWeekBands(monthDays(2026, 0))
    expect(bands).toHaveLength(5)
    expect(bands[4]).toEqual({ band: 4, days: ['2026-01-29', '2026-01-30', '2026-01-31'] })
  })

  it('is empty for no days', () => {
    expect(groupWeekBands([])).toEqual([])
  })
})

describe('weekStats', () => {
  it('rates each band against days x habits', () => {
    const days = monthDays(2026, 0)
    const perDay = countPerDay(days, ['a|2026-01-01', 'b|2026-01-01', 'a|2026-01-30'])
    const stats = weekStats(groupWeekBands(days), perDay, 2)
    expect(stats[0]).toEqual({ band: 0, done: 2, total: 14, pct: 14 })
    expect(stats[4]).toEqual({ band: 4, done: 1, total: 6, pct: 17 })
  })

  it('is 0% rather than NaN when there are no habits', () => {
    const days = monthDays(2026, 1)
    const stats = weekStats(groupWeekBands(days), countPerDay(days, []), 0)
    expect(stats.every((s) => s.pct === 0 && s.total === 0)).toBe(true)
  })
})

describe('topHabits', () => {
  const habits = [habit('low', 10), habit('high', 4), habit('tieBig', 20), habit('tieSmall', 10), habit('none', 5), habit('extra', 1)]
  const done = { low: 1, high: 4, tieBig: 10, tieSmall: 5, extra: 0 }

  it('ranks by completion rate, then by raw count, and keeps the top n', () => {
    const top = topHabits(habits, done, 5)
    expect(top.map((x) => x.h.id)).toEqual(['high', 'tieBig', 'tieSmall', 'low', 'none'])
    expect(top[0]).toMatchObject({ done: 4, rate: 100 })
    expect(top[4]).toMatchObject({ done: 0, rate: 0 })
  })

  it('does not reorder the input array', () => {
    const copy = [...habits]
    topHabits(habits, done)
    expect(habits).toEqual(copy)
  })
})

describe('monthSummary', () => {
  it('computes completed, missed and overall rate against targets', () => {
    expect(monthSummary([habit('a', 20), habit('b', 10)], 30, 15)).toEqual({
      completed: 15,
      missed: 45,
      overall: 50,
    })
  })

  it('never reports negative misses', () => {
    expect(monthSummary([habit('a', 1)], 1, 3).missed).toBe(0)
  })

  it('is 0% with no habits', () => {
    expect(monthSummary([], 31, 0)).toEqual({ completed: 0, missed: 0, overall: 0 })
  })
})

describe('habitName', () => {
  const h = { name_ar: 'قراءة', name_en: 'Reading' }

  it('picks the current language', () => {
    expect(habitName(h, 'ar')).toBe('قراءة')
    expect(habitName(h, 'en')).toBe('Reading')
  })

  it('falls back to the other language when one is blank', () => {
    expect(habitName({ name_ar: '', name_en: 'Reading' }, 'ar')).toBe('Reading')
    expect(habitName({ name_ar: 'قراءة', name_en: '' }, 'en')).toBe('قراءة')
    expect(habitName({ name_ar: '', name_en: '' }, 'en')).toBe('')
  })
})

describe('groupTasksByDay', () => {
  const week = ['2026-09-20', '2026-09-21']

  it('buckets by day and sorts each bucket by position', () => {
    const m = groupTasksByDay(
      [task('b', '2026-09-20', 2), task('a', '2026-09-20', 1), task('c', '2026-09-21', 1)],
      week,
    )
    expect(m['2026-09-20'].map((t) => t.id)).toEqual(['a', 'b'])
    expect(m['2026-09-21'].map((t) => t.id)).toEqual(['c'])
  })

  it('has an empty bucket for every day and drops tasks outside the week', () => {
    const m = groupTasksByDay([task('x', '2026-10-01', 1)], week)
    expect(m).toEqual({ '2026-09-20': [], '2026-09-21': [] })
  })
})

describe('nextTaskPosition', () => {
  it('appends after the last task, or starts at 1', () => {
    expect(nextTaskPosition([])).toBe(1)
    expect(nextTaskPosition([{ position: 1 }, { position: 4 }])).toBe(5)
  })
})

describe('yearSummary', () => {
  it('totals the year and averages only months with sleep data', () => {
    const rows = [
      { month: 1, completed: 40, avg_sleep: 7 },
      // Postgres numeric/bigint columns come back from PostgREST as strings.
      { month: 2, completed: '20' as unknown as number, avg_sleep: '8' as unknown as number },
      { month: 3, completed: 0, avg_sleep: null },
    ]
    expect(yearSummary(rows, [habit('a', 5), habit('b', 5)])).toEqual({
      monthlyTarget: 10,
      totalCompleted: 60,
      totalTarget: 120,
      totalPct: 50,
      yearSleep: '7.5',
    })
  })

  it('handles an empty year', () => {
    expect(yearSummary([], [])).toEqual({
      monthlyTarget: 0,
      totalCompleted: 0,
      totalTarget: 0,
      totalPct: 0,
      yearSleep: '—',
    })
  })
})
