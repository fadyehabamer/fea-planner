'use client'

import { useI18n } from '@/lib/i18n'

export function Card({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border border-[var(--line-soft)] bg-[var(--card)] ${className}`}
    >
      {children}
    </div>
  )
}

export function StatCard({
  label,
  value,
  sub,
  color = 'var(--fg)',
}: {
  label: string
  value: string | number
  sub?: string
  color?: string
}) {
  return (
    <Card className="px-4 py-3">
      <div className="text-[11px] font-semibold tracking-wide text-[var(--fg-faint)]">
        {label}
      </div>
      <div className="mt-0.5 text-2xl font-extrabold leading-tight" style={{ color }}>
        {value}
      </div>
      {sub ? <div className="text-[11px] text-[var(--fg-faint)]">{sub}</div> : null}
    </Card>
  )
}

export function Bar({
  value,
  color,
  height = 8,
  track = true,
}: {
  value: number
  color: string
  height?: number
  track?: boolean
}) {
  return (
    <div
      className="w-full rounded-full"
      style={{ height, background: track ? 'var(--line-soft)' : 'transparent' }}
    >
      <div
        className="rounded-full transition-[width] duration-300"
        style={{ width: `${Math.max(0, Math.min(100, value))}%`, height, background: color }}
      />
    </div>
  )
}

/** Colour ramp used for completion rates, so a glance reads as good / middling / poor. */
export function rateColor(p: number): string {
  if (p >= 80) return 'var(--w3)'
  if (p >= 60) return 'var(--w2)'
  if (p >= 40) return 'var(--w1)'
  if (p >= 20) return 'var(--amber)'
  return 'var(--w4)'
}

export function PageHeader({
  title,
  subtitle,
  right,
}: {
  title: string
  subtitle?: string
  right?: React.ReactNode
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1>
        {subtitle ? (
          <p className="mt-0.5 text-xs text-[var(--fg-faint)]">{subtitle}</p>
        ) : null}
      </div>
      {right}
    </div>
  )
}

export function StepperNav({
  label,
  onPrev,
  onNext,
}: {
  label: string
  onPrev: () => void
  onNext: () => void
}) {
  const { t, dir } = useI18n()
  // In RTL the "previous" arrow must point the other way to still mean "back".
  const back = dir === 'rtl' ? '›' : '‹'
  const fwd = dir === 'rtl' ? '‹' : '›'
  return (
    <div className="flex items-center gap-1 rounded-xl border border-[var(--line-soft)] bg-[var(--card)] p-1">
      <button
        onClick={onPrev}
        aria-label={t.prev}
        className="h-8 w-8 rounded-lg text-lg leading-none text-[var(--fg-dim)] hover:bg-[var(--card-2)]"
      >
        {back}
      </button>
      <span className="min-w-28 px-2 text-center text-sm font-bold">{label}</span>
      <button
        onClick={onNext}
        aria-label={t.next}
        className="h-8 w-8 rounded-lg text-lg leading-none text-[var(--fg-dim)] hover:bg-[var(--card-2)]"
      >
        {fwd}
      </button>
    </div>
  )
}

export function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-20 text-sm text-[var(--fg-faint)]">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--line)] border-t-[var(--brand)]" />
      {label}
    </div>
  )
}
