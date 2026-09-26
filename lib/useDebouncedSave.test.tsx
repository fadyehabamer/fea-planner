// @vitest-environment jsdom
import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDebouncedSave } from './useDebouncedSave'

describe('useDebouncedSave', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('runs only the last write for a key after the delay', () => {
    const { result } = renderHook(() => useDebouncedSave(500))
    const first = vi.fn()
    const last = vi.fn()

    result.current('task-1', first)
    vi.advanceTimersByTime(300)
    result.current('task-1', last)
    vi.advanceTimersByTime(499)
    expect(last).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(first).not.toHaveBeenCalled()
    expect(last).toHaveBeenCalledTimes(1)
  })

  it('debounces each key independently', () => {
    const { result } = renderHook(() => useDebouncedSave(200))
    const a = vi.fn()
    const b = vi.fn()

    result.current('a', a)
    vi.advanceTimersByTime(100)
    result.current('b', b)
    vi.advanceTimersByTime(100)
    expect(a).toHaveBeenCalledTimes(1)
    expect(b).not.toHaveBeenCalled()
    vi.advanceTimersByTime(100)
    expect(b).toHaveBeenCalledTimes(1)
  })

  it('flushes pending writes on unmount instead of dropping them', () => {
    const { result, unmount } = renderHook(() => useDebouncedSave())
    const pending = vi.fn()
    const done = vi.fn()

    result.current('done', done)
    vi.advanceTimersByTime(600)
    result.current('pending', pending)
    unmount()

    expect(pending).toHaveBeenCalledTimes(1)
    expect(done).toHaveBeenCalledTimes(1)
    // The cancelled timer must not fire a second write later.
    vi.runAllTimers()
    expect(pending).toHaveBeenCalledTimes(1)
  })

  it('returns a stable function across renders', () => {
    const { result, rerender } = renderHook(() => useDebouncedSave(300))
    const before = result.current
    rerender()
    expect(result.current).toBe(before)
  })
})
