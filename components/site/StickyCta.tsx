'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

/**
 * A phone-only sign-up bar that slides in once the hero's own button has
 * scrolled away, so the next step is always one thumb-tap off. It hides again
 * whenever an element marked [data-cta-zone] (the closing section) is on
 * screen, where a second button would just be noise.
 */
export default function StickyCta({ label, watch }: { label: string; watch: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = ref.current
    const anchor = document.getElementById(watch)
    if (!bar || !anchor || !('IntersectionObserver' in window)) return

    let pastHero = false
    let inZone = false
    const sync = () => {
      bar.dataset.show = String(pastHero && !inZone)
    }

    const heroIo = new IntersectionObserver(([e]) => {
      pastHero = !e.isIntersecting && e.boundingClientRect.top < 0
      sync()
    })
    heroIo.observe(anchor)

    const zoneIo = new IntersectionObserver((entries) => {
      inZone = entries.some((e) => e.isIntersecting)
      sync()
    })
    document.querySelectorAll('[data-cta-zone]').forEach((el) => zoneIo.observe(el))

    return () => {
      heroIo.disconnect()
      zoneIo.disconnect()
    }
  }, [watch])

  return (
    <div
      ref={ref}
      data-show="false"
      className="sticky-cta fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[var(--bg)]/95 px-4 pt-3 backdrop-blur sm:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <Link
        href="/login"
        className="flex min-h-12 w-full items-center justify-center rounded-full text-base font-black"
        style={{ background: 'var(--pop)', color: 'var(--pop-ink)' }}
      >
        {label}
      </Link>
    </div>
  )
}
