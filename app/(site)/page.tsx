'use client'

import Link from 'next/link'
import GridPreview from '@/components/site/GridPreview'
import { TasksPreview, YearPreview } from '@/components/site/mocks'
import { useCopy } from '@/lib/copy'

const BUILT_ICONS = [
  'M5 8h14M9 4v4m1.5 0c-.5 6-3.5 9-7.5 11M13 20l4-9 4 9m-6.8-2h5.6',
  'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  'M5 2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 19h2',
  'M12 2l8 4v6c0 5-3.4 8.8-8 10-4.6-1.2-8-5-8-10V6l8-4zM9.5 12l1.8 1.8L15 10',
]

function Icon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}

function Tick({ tone = 'var(--brand)' }: { tone?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={tone}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-[3px] h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[11px] font-extrabold uppercase tracking-[0.14em]"
      style={{ color: 'var(--brand)' }}
    >
      {children}
    </span>
  )
}

function PrimaryCta({ children, href = '/login' }: { children: React.ReactNode; href?: string }) {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg px-6 py-3.5 text-sm font-bold transition-opacity hover:opacity-90"
      style={{ background: 'var(--brand-solid)', color: 'var(--brand-ink)' }}
    >
      {children}
    </Link>
  )
}

export default function LandingPage() {
  const { c } = useCopy()
  const visuals = [<GridPreview key="g" />, <TasksPreview key="t" />, <YearPreview key="y" />]

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="relative overflow-hidden border-b border-[var(--line-soft)]">
        <div className="hero-glow" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-24">
          <div className="reveal mx-auto max-w-3xl">
            <span
              className="inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-bold"
              style={{ borderColor: 'var(--line)', color: 'var(--fg-dim)' }}
            >
              {c.hero.badge}
            </span>

            <h1 className="display mt-6 text-[2.5rem] font-extrabold leading-[1.08] sm:text-6xl">
              {c.hero.titleA}{' '}
              <span style={{ color: 'var(--brand)' }}>{c.hero.titleAccent}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--fg-dim)] sm:text-lg">
              {c.hero.sub}
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <PrimaryCta>{c.hero.ctaPrimary}</PrimaryCta>
              <Link
                href="/why"
                className="rounded-lg border border-[var(--line)] px-6 py-3.5 text-sm font-bold transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                {c.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="reveal mx-auto mt-14 max-w-4xl" style={{ animationDelay: '90ms' }}>
            <GridPreview />
          </div>
        </div>
      </section>

      {/* ---------------- stats ---------------- */}
      <section className="border-b border-[var(--line-soft)] bg-[var(--bg-2)]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden px-4 py-10 sm:px-6 md:grid-cols-4">
          {c.stats.map((s) => (
            <div key={s.label} className="px-2 text-center">
              <div className="display text-3xl font-extrabold tabular-nums sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1.5 text-[11px] font-semibold text-[var(--fg-faint)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- alternating feature rows ---------------- */}
      {c.features.map((f, i) => (
        <section
          key={f.title}
          className={`border-b border-[var(--line-soft)] ${i % 2 ? 'bg-[var(--bg-2)]' : ''}`}
        >
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16">
            <div className={i % 2 ? 'lg:order-2' : ''}>
              <Eyebrow>{f.eyebrow}</Eyebrow>
              <h2 className="display mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                {f.title}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-[var(--fg-dim)]">{f.body}</p>
              <ul className="mt-6 space-y-3">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-[var(--fg-dim)]">
                    <Tick />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className={i % 2 ? 'lg:order-1' : ''}>{visuals[i]}</div>
          </div>
        </section>
      ))}

      {/* ---------------- comparison ---------------- */}
      <section className="border-b border-[var(--line-soft)]">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <h2 className="display text-3xl font-extrabold sm:text-4xl">{c.compare.title}</h2>
            <p className="mt-3 text-[15px] text-[var(--fg-dim)]">{c.compare.sub}</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--line-soft)] p-6">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[var(--fg-faint)]">
                {c.compare.beforeLabel}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {c.compare.before.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--fg-faint)]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-[3px] h-3.5 w-3.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-2xl border p-6"
              style={{
                borderColor: 'var(--brand)',
                background: 'color-mix(in oklab, var(--brand) 5%, transparent)',
              }}
            >
              <h3
                className="display text-xs font-extrabold uppercase tracking-wider"
                style={{ color: 'var(--brand)' }}
              >
                {c.compare.afterLabel}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {c.compare.after.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-sm leading-relaxed">
                    <Tick />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- built this way ---------------- */}
      <section className="border-b border-[var(--line-soft)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="display text-3xl font-extrabold sm:text-4xl">{c.built.title}</h2>
          <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {c.built.items.map((item, i) => (
              <div key={item.title} className="flex gap-4">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border"
                  style={{ borderColor: 'var(--line)', color: 'var(--brand)' }}
                >
                  <Icon d={BUILT_ICONS[i]} />
                </span>
                <div>
                  <h3 className="display text-base font-extrabold">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--fg-dim)]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- pricing ---------------- */}
      <section className="border-b border-[var(--line-soft)]">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <h2 className="display text-3xl font-extrabold sm:text-4xl">{c.pricing.title}</h2>
          <p className="mt-3 text-[15px] text-[var(--fg-dim)]">{c.pricing.sub}</p>

          <div className="mt-10 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-8 text-start sm:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div
                  className="display text-xs font-extrabold uppercase tracking-wider"
                  style={{ color: 'var(--brand)' }}
                >
                  {c.pricing.plan}
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="display text-5xl font-extrabold tabular-nums">
                    {c.pricing.price}
                  </span>
                  <span className="text-lg font-bold text-[var(--fg-dim)]">
                    {c.pricing.currency}
                  </span>
                  <span className="text-sm text-[var(--fg-faint)]">/ {c.pricing.period}</span>
                </div>
              </div>
              <PrimaryCta>{c.pricing.cta}</PrimaryCta>
            </div>

            <ul className="mt-8 grid gap-3 border-t border-[var(--line-soft)] pt-8 sm:grid-cols-2">
              {c.pricing.includes.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--fg-dim)]">
                  <Tick />
                  {f}
                </li>
              ))}
            </ul>

            <p className="mt-8 border-t border-[var(--line-soft)] pt-6 text-xs leading-relaxed text-[var(--fg-faint)]">
              {c.pricing.note}
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className="border-b border-[var(--line-soft)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="display text-3xl font-extrabold sm:text-4xl">{c.faq.title}</h2>

          <div className="mt-10 divide-y divide-[var(--line-soft)] border-y border-[var(--line-soft)]">
            {c.faq.items.map((item) => (
              // <details> gives keyboard support and expand/collapse semantics for free.
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-start text-[15px] font-bold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="h-4 w-4 shrink-0 text-[var(--fg-faint)] transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <p className="mt-3 pe-8 text-sm leading-[1.75] text-[var(--fg-dim)]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- closing CTA ---------------- */}
      <section className="relative overflow-hidden">
        <div className="hero-glow" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <h2 className="display text-3xl font-extrabold sm:text-5xl">{c.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-[var(--fg-dim)]">{c.cta.sub}</p>
          <div className="mt-9">
            <PrimaryCta>{c.cta.button}</PrimaryCta>
          </div>
          <p className="mt-4 text-xs text-[var(--fg-faint)]">{c.cta.note}</p>
        </div>
      </section>
    </>
  )
}
