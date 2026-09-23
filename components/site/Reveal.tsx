'use client'

import { useEffect, useRef } from 'react'

/**
 * Fades and lifts its children in once they scroll into view.
 *
 * The "in" state is written straight to a data attribute rather than to React
 * state: it never needs to re-render, and a DOM write inside an effect is the
 * sanctioned way to sync with an external system. Without JavaScript, or with
 * reduced motion, the CSS leaves the content fully visible.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!('IntersectionObserver' in window)) {
      el.dataset.in = 'true'
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.dataset.in = 'true'
        io.disconnect()
      },
      // Fire a little before the element is fully on screen so the motion
      // reads as anticipation rather than as a late reaction.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal-item ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
