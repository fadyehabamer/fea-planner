import { describe, expect, it } from 'vitest'
import { rateColor } from './ui'

describe('rateColor', () => {
  it.each([
    [100, 'var(--w3)'],
    [80, 'var(--w3)'],
    [79, 'var(--w2)'],
    [60, 'var(--w2)'],
    [59, 'var(--w1)'],
    [40, 'var(--w1)'],
    [39, 'var(--amber)'],
    [20, 'var(--amber)'],
    [19, 'var(--w4)'],
    [0, 'var(--w4)'],
  ])('%i%% is %s', (p, color) => {
    expect(rateColor(p)).toBe(color)
  })
})
