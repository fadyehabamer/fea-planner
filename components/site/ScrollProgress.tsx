'use client'

/**
 * Reading-progress bar. Driven entirely by CSS scroll-driven animation, so it
 * costs no scroll listener and no main-thread work. Browsers without
 * animation-timeline leave it at scaleX(0) — invisible, which is the right
 * fallback for pure decoration.
 */
export default function ScrollProgress() {
  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
      <div className="scroll-progress h-full w-full" style={{ background: 'var(--fg)' }} />
    </div>
  )
}
