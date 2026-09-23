'use client'

import { useCallback, useEffect, useRef } from 'react'

/**
 * Coalesces rapid edits (typing) into one write per key.
 * Pending writes are flushed when the component unmounts so nothing is lost
 * if the user navigates away mid-sentence.
 */
export function useDebouncedSave(delay = 600) {
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>())
  const pending = useRef(new Map<string, () => void>())

  useEffect(() => {
    const t = timers.current
    const p = pending.current
    return () => {
      t.forEach(clearTimeout)
      p.forEach((run) => run())
      t.clear()
      p.clear()
    }
  }, [])

  return useCallback(
    (key: string, run: () => void) => {
      const existing = timers.current.get(key)
      if (existing) clearTimeout(existing)
      pending.current.set(key, run)
      timers.current.set(
        key,
        setTimeout(() => {
          timers.current.delete(key)
          pending.current.delete(key)
          run()
        }, delay),
      )
    },
    [delay],
  )
}
