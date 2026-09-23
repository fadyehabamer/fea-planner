'use client'

import { useEffect, useRef } from 'react'

/** Shared guard: honour the OS setting everywhere motion is introduced. */
function reducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Types its text out once it scrolls into view.
 *
 * The complete string is what server-renders; the animation only ever
 * overwrites textContent on the client. So without JS, on an old browser, or
 * with reduced motion, the full text is simply there — never a blank line.
 */
export function Typewriter({
  text,
  speed = 26,
  startDelay = 0,
  className = '',
}: {
  text: string
  speed?: number
  startDelay?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion() || !('IntersectionObserver' in window)) return

    let timer: ReturnType<typeof setTimeout>
    let cancelled = false

    const type = () => {
      let i = 0
      const tick = () => {
        if (cancelled) return
        i += 1
        el.textContent = text.slice(0, i)
        if (i < text.length) timer = setTimeout(tick, speed)
      }
      tick()
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        el.textContent = ''
        timer = setTimeout(type, startDelay)
      },
      { threshold: 0.3 },
    )

    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
      clearTimeout(timer)
    }
  }, [text, speed, startDelay])

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  )
}

/**
 * Decorative boot readout above the hero. Deliberately NOT wrapping the
 * headline: content must never be gated behind an animation finishing.
 */
export function BootSequence({ lines }: { lines: readonly string[] }) {
  return (
    <div
      aria-hidden="true"
      className="mx-auto max-w-md space-y-1 text-start font-normal text-[11px] leading-relaxed text-[var(--fg-faint)] sm:text-xs"
      dir="ltr"
    >
      {lines.map((line, i) => (
        <div key={line} className="flex gap-2">
          <span className="select-none opacity-60">{i === lines.length - 1 ? '>' : '$'}</span>
          <Typewriter text={line} speed={18} startDelay={i * 420} />
        </div>
      ))}
    </div>
  )
}

/** Section header rendered as a shell command. Commands stay Latin in both
 *  locales, which is what a terminal would actually show. */
export function TerminalHead({
  command,
  title,
  sub,
}: {
  command: string
  title: string
  sub?: string
}) {
  return (
    <div>
      <div
        dir="ltr"
        className="flex items-center gap-2 text-[11px] text-[var(--fg-faint)] sm:text-xs"
      >
        <span className="select-none opacity-60">$</span>
        <Typewriter text={command} speed={22} />
      </div>
      <div className="mt-4 h-px w-full bg-[var(--line)]" />
      <h2 className="display mt-6 text-3xl font-bold sm:text-4xl">{title}</h2>
      {sub ? <p className="mt-3 text-sm leading-relaxed text-[var(--fg-dim)]">{sub}</p> : null}
    </div>
  )
}

/** Infinite ticker. Content is duplicated so the -50% translate loops seamlessly. */
export function Marquee({ items }: { items: readonly string[] }) {
  const row = [...items, ...items]
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-[var(--line-soft)] py-3">
      <div className="marquee">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-6 px-6 text-[11px] uppercase tracking-[0.18em] text-[var(--fg-faint)]"
          >
            {item}
            <span className="h-1 w-1 bg-[var(--fg-faint)]" />
          </span>
        ))}
      </div>
    </div>
  )
}

/** Small labelled readout, the page's repeating structural unit. */
export function Readout({
  label,
  children,
  className = '',
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`border border-[var(--line-soft)] p-4 ${className}`}>
      <div
        dir="ltr"
        className="text-[10px] uppercase tracking-[0.18em] text-[var(--fg-faint)]"
      >
        {label}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  )
}
