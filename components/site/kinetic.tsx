'use client'

import { useEffect, useRef } from 'react'

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Pointer effects only make sense with a mouse or trackpad. On touch they'd
 *  fire on tap and leave the element stuck mid-tilt. */
function finePointer() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

/**
 * Pulls its child toward the cursor, then springs back when the cursor leaves.
 * The listener sits on a padded wrapper, so the pull starts before the pointer
 * actually reaches the button — that is what makes it read as magnetic.
 */
export function Magnetic({
  children,
  strength = 0.3,
}: {
  children: React.ReactNode
  strength?: number
}) {
  const zone = useRef<HTMLSpanElement>(null)
  const body = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const z = zone.current
    const b = body.current
    if (!z || !b || !finePointer() || reducedMotion()) return

    let raf = 0
    const move = (e: PointerEvent) => {
      const r = z.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) * strength
      const y = (e.clientY - (r.top + r.height / 2)) * strength
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        b.style.transform = `translate3d(${x}px, ${y}px, 0)`
      })
    }
    const leave = () => {
      cancelAnimationFrame(raf)
      b.style.transform = ''
    }

    z.addEventListener('pointermove', move)
    z.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      z.removeEventListener('pointermove', move)
      z.removeEventListener('pointerleave', leave)
    }
  }, [strength])

  return (
    <span ref={zone} className="-m-5 inline-block p-5">
      <span ref={body} className="magnetic inline-block">
        {children}
      </span>
    </span>
  )
}
