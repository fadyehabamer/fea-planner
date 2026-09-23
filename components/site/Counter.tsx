'use client'

import { useEffect, useRef } from 'react'

const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Counts up to `value` when scrolled into view.
 *
 * The final value is what renders on the server, and the animation only ever
 * overwrites textContent on the client. So with no JavaScript, an old browser,
 * or reduced motion enabled, the correct number is simply there.
 */
export default function Counter({
  value,
  duration = 1200,
  className = '',
}: {
  value: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    const target = Number(value)
    if (!el || Number.isNaN(target) || target === 0) return
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let start = 0

    const step = (now: number) => {
      if (!start) start = now
      const t = Math.min((now - start) / duration, 1)
      el.textContent = String(Math.round(EASE_OUT(t) * target))
      if (t < 1) raf = requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        el.textContent = '0'
        raf = requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )

    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
