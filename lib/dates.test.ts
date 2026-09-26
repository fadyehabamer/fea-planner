import { describe, expect, it } from 'vitest'
import {
  DAY_COLORS,
  WEEK_COLORS,
  addDays,
  daysInMonth,
  iso,
  monthDays,
  pct,
  startOfWeek,
  weekBand,
} from './dates'

describe('iso', () => {
  it('formats local dates as zero-padded YYYY-MM-DD', () => {
    expect(iso(new Date(2026, 0, 5))).toBe('2026-01-05')
    expect(iso(new Date(2026, 11, 31))).toBe('2026-12-31')
  })

  it('uses local time, not UTC, near midnight', () => {
    expect(iso(new Date(2026, 2, 1, 0, 0, 1))).toBe('2026-03-01')
    expect(iso(new Date(2026, 2, 1, 23, 59, 59))).toBe('2026-03-01')
  })
})

describe('daysInMonth', () => {
  it('handles 30/31-day months', () => {
    expect(daysInMonth(2026, 0)).toBe(31)
    expect(daysInMonth(2026, 3)).toBe(30)
    expect(daysInMonth(2026, 11)).toBe(31)
  })

  it('handles February in leap and common years', () => {
    expect(daysInMonth(2024, 1)).toBe(29)
    expect(daysInMonth(2026, 1)).toBe(28)
    expect(daysInMonth(2000, 1)).toBe(29)
    expect(daysInMonth(1900, 1)).toBe(28)
  })
})

describe('weekBand', () => {
  it('maps each 7-day block to its own band', () => {
    expect([1, 7, 8, 14, 15, 21, 22, 28].map(weekBand)).toEqual([0, 0, 1, 1, 2, 2, 3, 3])
  })

  it('folds days 29-31 into the fifth band', () => {
    expect([29, 30, 31].map(weekBand)).toEqual([4, 4, 4])
  })

  it('always returns an index into WEEK_COLORS', () => {
    for (let d = 1; d <= 31; d++) {
      expect(WEEK_COLORS[weekBand(d)]).toBeDefined()
    }
  })
})

describe('addDays', () => {
  it('crosses month and year boundaries', () => {
    expect(iso(addDays(new Date(2026, 0, 31), 1))).toBe('2026-02-01')
    expect(iso(addDays(new Date(2026, 11, 31), 1))).toBe('2027-01-01')
    expect(iso(addDays(new Date(2026, 2, 1), -1))).toBe('2026-02-28')
  })

  it('does not mutate its input', () => {
    const d = new Date(2026, 5, 10)
    addDays(d, 5)
    expect(iso(d)).toBe('2026-06-10')
  })
})

describe('startOfWeek', () => {
  it('returns the Sunday on or before the date', () => {
    // 2026-09-26 is a Saturday; 2026-09-20 the Sunday before.
    expect(iso(startOfWeek(new Date(2026, 8, 26)))).toBe('2026-09-20')
    expect(iso(startOfWeek(new Date(2026, 8, 20)))).toBe('2026-09-20')
    expect(startOfWeek(new Date(2026, 8, 23)).getDay()).toBe(0)
  })

  it('can land in the previous month', () => {
    // 2026-10-01 is a Thursday.
    expect(iso(startOfWeek(new Date(2026, 9, 1)))).toBe('2026-09-27')
  })

  it('has one colour per weekday column', () => {
    expect(DAY_COLORS).toHaveLength(7)
  })
})

describe('monthDays', () => {
  it('lists every day of the month in order', () => {
    const days = monthDays(2024, 1)
    expect(days).toHaveLength(29)
    expect(days[0]).toBe('2024-02-01')
    expect(days.at(-1)).toBe('2024-02-29')
    expect([...days].sort()).toEqual(days)
  })
})

describe('pct', () => {
  it('rounds to a whole percentage', () => {
    expect(pct(1, 3)).toBe(33)
    expect(pct(2, 3)).toBe(67)
    expect(pct(5, 5)).toBe(100)
  })

  it('returns 0 when there is nothing to complete', () => {
    expect(pct(3, 0)).toBe(0)
    expect(pct(0, -1)).toBe(0)
  })

  it('can exceed 100 when a target is overshot', () => {
    expect(pct(12, 10)).toBe(120)
  })
})
