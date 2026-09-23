'use client'

import Link from 'next/link'
import Counter from '@/components/site/Counter'
import FeatureScroller from '@/components/site/FeatureScroller'
import GridPreview from '@/components/site/GridPreview'
import Reveal from '@/components/site/Reveal'
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

function Tick() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
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

function PrimaryCta({ children, href = '/login' }: { children: React.ReactNode; href?: string }) {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg px-6 py-3.5 text-sm font-bold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
      style={{ background: 'var(--brand-solid)', color: 'var(--brand-ink)' }}
    >
      {children}
    </Link>
  )
}

function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <Reveal>
      <h2 className="display text-3xl font-extrabold sm:text-4xl">{title}</h2>
      {sub ? <p className="mt-3 text-[15px] text-[var(--fg-dim)]">{sub}</p> : null}
    </Reveal>
  )
}

export default function LandingPage() {
  const { c } = useCopy()
  const visuals = [<GridPreview key="g" />, <TasksPreview key="t" />, <YearPreview key="y" />]

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="relative overflow-hidden border-b border-[var(--line-soft)]">
        <div className="grid-texture" />
        <div className="hero-glow" />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-24">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <span
                className="inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-bold"
                style={{ borderColor: 'var(--line)', color: 'var(--fg-dim)' }}
              >
                {c.hero.badge}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="display mt-6 text-[2.5rem] font-extrabold leading-[1.08] text-[var(--fg-dim)] sm:text-6xl">
                {c.hero.titleA}{' '}
                <span className="text-[var(--fg)]">{c.hero.titleAccent}</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--fg-dim)] sm:text-lg">
                {c.hero.sub}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <PrimaryCta>{c.hero.ctaPrimary}</PrimaryCta>
                <Link
                  href="/why"
                  className="rounded-lg border border-[var(--line)] px-6 py-3.5 text-sm font-bold transition-colors duration-200 hover:border-[var(--fg)]"
                >
                  {c.hero.ctaSecondary}
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={320} className="mx-auto mt-14 max-w-4xl">
            <div className="hero-parallax">
              <GridPreview />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- stats ---------------- */}
      <section className="border-b border-[var(--line-soft)] bg-[var(--bg-2)]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-4 py-12 sm:px-6 md:grid-cols-4">
          {c.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="px-2 text-center">
              <div className="display text-3xl font-extrabold tabular-nums sm:text-4xl">
                <Counter value={s.value} />
              </div>
              <div className="mt-1.5 text-[11px] font-semibold text-[var(--fg-faint)]">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- features: pinned visual, scrolling copy ---------------- */}
      <FeatureScroller features={c.features} visuals={visuals} />

      {/* ---------------- comparison ---------------- */}
      <section className="border-b border-[var(--line-soft)]">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <SectionHead title={c.compare.title} sub={c.compare.sub} />
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Reveal>
              <div className="lift h-full rounded-2xl border border-[var(--line-soft)] p-6 hover:border-[var(--line)]">
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
            </Reveal>

            <Reveal delay={110}>
              <div
                className="lift h-full rounded-2xl border p-6"
                style={{
                  borderColor: 'var(--fg)',
                  background: 'color-mix(in oklab, var(--fg) 4%, transparent)',
                }}
              >
                <h3 className="display text-xs font-extrabold uppercase tracking-wider">
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- built this way ---------------- */}
      <section className="border-b border-[var(--line-soft)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHead title={c.built.title} />

          <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {c.built.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="flex gap-4">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition-colors duration-200"
                    style={{ borderColor: 'var(--line)' }}
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- pricing ---------------- */}
      <section className="border-b border-[var(--line-soft)]">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <SectionHead title={c.pricing.title} sub={c.pricing.sub} />

          <Reveal delay={110}>
            <div className="lift mt-10 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-8 text-start hover:border-[var(--fg-faint)] sm:p-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="display text-xs font-extrabold uppercase tracking-wider text-[var(--fg-faint)]">
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
          </Reveal>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className="border-b border-[var(--line-soft)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHead title={c.faq.title} />

          <div className="mt-10 divide-y divide-[var(--line-soft)] border-y border-[var(--line-soft)]">
            {c.faq.items.map((item, i) => (
              <Reveal key={item.q} delay={i * 60}>
                {/* <details> gives keyboard support and expand/collapse semantics for free. */}
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-start text-[15px] font-bold transition-colors duration-200 hover:text-[var(--fg-dim)] [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="h-4 w-4 shrink-0 text-[var(--fg-faint)] transition-transform duration-300 group-open:rotate-[135deg]"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </summary>
                  <p className="mt-3 pe-8 text-sm leading-[1.75] text-[var(--fg-dim)]">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- closing CTA ---------------- */}
      <section className="relative overflow-hidden">
        <div className="grid-texture" />
        <div className="hero-glow" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <Reveal>
            <h2 className="display text-3xl font-extrabold sm:text-5xl">{c.cta.title}</h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="mx-auto mt-4 max-w-md text-[15px] text-[var(--fg-dim)]">{c.cta.sub}</p>
          </Reveal>
          <Reveal delay={170}>
            <div className="mt-9">
              <PrimaryCta>{c.cta.button}</PrimaryCta>
            </div>
            <p className="mt-4 text-xs text-[var(--fg-faint)]">{c.cta.note}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
