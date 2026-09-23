'use client'

import { CONTACT_EMAIL, useCopy } from '@/lib/copy'

/** Fixed so the stated date reflects the policy text, not the render time. */
const UPDATED = '2026-09-23'

export default function PolicyPage() {
  const { c, locale } = useCopy()

  const updatedLabel = new Date(UPDATED).toLocaleDateString(
    locale === 'ar' ? 'ar-EG' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' },
  )

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <header>
        <h1 className="display text-4xl font-extrabold sm:text-5xl">{c.policy.title}</h1>
        <p className="mt-3 text-xs font-semibold text-[var(--fg-faint)]">
          {c.policy.updated} · <time dateTime={UPDATED}>{updatedLabel}</time>
        </p>
        <p className="mt-6 text-[15px] leading-relaxed text-[var(--fg-dim)]">{c.policy.intro}</p>
      </header>

      <div className="rule my-10" />

      <div className="space-y-10">
        {c.policy.sections.map((s, i) => {
          const isContact = i === c.policy.sections.length - 1
          return (
            <section key={s.title}>
              <h2 className="display text-xl font-extrabold">{s.title}</h2>
              <ul className="mt-3 space-y-2.5">
                {s.body.map((line) => (
                  <li
                    key={line}
                    className="flex gap-3 text-[15px] leading-[1.7] text-[var(--fg-dim)]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: 'var(--accent)' }}
                    />
                    {line}
                  </li>
                ))}
              </ul>

              {isContact ? (
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  dir="ltr"
                  className="mt-4 inline-block rounded-xl border border-[var(--line)] px-5 py-3 text-sm font-bold transition-colors hover:border-[var(--brand)]"
                  style={{ color: 'var(--brand)' }}
                >
                  {CONTACT_EMAIL}
                </a>
              ) : null}
            </section>
          )
        })}
      </div>
    </article>
  )
}
