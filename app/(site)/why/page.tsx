'use client'

import Link from 'next/link'
import { useCopy } from '@/lib/copy'

export default function WhyPage() {
  const { c } = useCopy()

  return (
    <article className="relative overflow-hidden">
      <div className="hero-glow" />

      <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <header className="reveal">
          <h1 className="display text-4xl font-extrabold leading-[1.15] sm:text-5xl">
            {c.why.title}
          </h1>
          <p
            className="mt-5 text-lg leading-relaxed text-[var(--fg-dim)] sm:text-xl"
          >
            {c.why.lede}
          </p>
        </header>

        <div className="rule my-12" />

        <div className="space-y-12">
          {c.why.sections.map((s, i) => (
            <section key={s.title}>
              <div className="flex items-baseline gap-3">
                <span
                  className="display text-xs font-extrabold tabular-nums text-[var(--fg-faint)]"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="display text-xl font-extrabold sm:text-2xl">{s.title}</h2>
              </div>
              <p className="mt-3 text-[15px] leading-[1.75] text-[var(--fg-dim)] sm:text-base">
                {s.body}
              </p>
            </section>
          ))}
        </div>

        <div className="rule my-12" />

        <div className="flex flex-wrap gap-3">
          <Link
            href="/login"
            className="px-6 py-3.5 text-sm font-bold transition-opacity hover:opacity-90"
            style={{ background: 'var(--brand-solid)', color: 'var(--brand-ink)' }}
          >
            {c.cta.button}
          </Link>
          <Link
            href="/policy"
            className="border border-[var(--line)] px-6 py-3.5 text-sm font-bold transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
          >
            {c.nav.privacy}
          </Link>
        </div>
      </div>
    </article>
  )
}
