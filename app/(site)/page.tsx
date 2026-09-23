'use client'

import Link from 'next/link'
import Counter from '@/components/site/Counter'
import FeatureScroller from '@/components/site/FeatureScroller'
import GridPreview from '@/components/site/GridPreview'
import Reveal from '@/components/site/Reveal'
import { BootSequence, Marquee, Readout, TerminalHead } from '@/components/site/terminal'
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
      strokeWidth="1.6"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}

function Cta({ children, href = '/login' }: { children: React.ReactNode; href?: string }) {
  return (
    <Link
      href={href}
      className="invert-hover inline-block border px-6 py-3.5 text-sm font-bold"
      style={{ background: 'var(--brand-solid)', color: 'var(--brand-ink)', borderColor: 'var(--fg)' }}
    >
      {children}
    </Link>
  )
}

function GhostCta({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="invert-hover inline-block border border-[var(--line)] px-6 py-3.5 text-sm font-bold"
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
      <section className="crt relative overflow-hidden border-b border-[var(--line)]">
        <div className="grid-texture" />

        <div className="relative z-[2] mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
          <BootSequence lines={c.term.boot} />

          <div className="mx-auto mt-10 max-w-3xl text-center">
            <Reveal>
              <h1 className="display cursor text-[2.3rem] font-bold leading-[1.1] sm:text-6xl">
                {c.hero.titleA} <span className="text-[var(--fg-dim)]">{c.hero.titleAccent}</span>
              </h1>
            </Reveal>

            <Reveal delay={90}>
              <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[var(--fg-dim)] sm:text-base">
                {c.hero.sub}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Cta>{c.hero.ctaPrimary}</Cta>
                <GhostCta href="/why">{c.hero.ctaSecondary}</GhostCta>
              </div>
            </Reveal>
          </div>

          <Reveal delay={260} className="mx-auto mt-14 max-w-4xl">
            <div className="hero-parallax">
              <GridPreview />
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={c.term.marquee} />

      {/* ---------------- stats ---------------- */}
      <section className="border-b border-[var(--line-soft)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div
            dir="ltr"
            className="mb-6 flex items-center gap-2 text-[11px] text-[var(--fg-faint)]"
          >
            <span className="select-none opacity-60">$</span>
            {c.term.cmd.stats}
          </div>

          <div className="grid grid-cols-2 gap-px bg-[var(--line-soft)] md:grid-cols-4">
            {c.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} className="bg-[var(--bg)]">
                <Readout label={`0${i + 1}`} className="border-0 h-full">
                  <div className="display text-3xl font-bold tabular-nums sm:text-4xl">
                    <Counter value={s.value} />
                  </div>
                  <div className="mt-1.5 text-[11px] text-[var(--fg-dim)]">{s.label}</div>
                </Readout>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- trackers ---------------- */}
      <section className="border-b border-[var(--line-soft)]">
        <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-24">
          <Reveal>
            <TerminalHead command={c.term.cmd.tools} title={c.tools.title} sub={c.tools.sub} />
          </Reveal>
        </div>
      </section>

      <FeatureScroller features={c.features} visuals={visuals} />

      {/* ---------------- diff ---------------- */}
      <section className="border-b border-[var(--line-soft)]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <TerminalHead
              command={c.term.cmd.compare}
              title={c.compare.title}
              sub={c.compare.sub}
            />
          </Reveal>

          {/* Rendered as an actual diff: removals dimmed, additions at full contrast. */}
          <Reveal delay={90}>
            <div className="mt-10 border border-[var(--line)]">
              <div
                dir="ltr"
                className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--card)] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--fg-faint)]"
              >
                <span>--- {c.compare.beforeLabel}</span>
                <span>+++ {c.compare.afterLabel}</span>
              </div>

              <div className="divide-y divide-[var(--line-soft)]">
                {c.compare.before.map((b) => (
                  <div key={b} className="flex gap-3 px-4 py-3 text-sm text-[var(--fg-faint)]">
                    <span aria-hidden="true" className="select-none opacity-70">
                      −
                    </span>
                    <span className="line-through decoration-[var(--line)]">{b}</span>
                  </div>
                ))}
                {c.compare.after.map((a) => (
                  <div
                    key={a}
                    className="flex gap-3 bg-[var(--card)] px-4 py-3 text-sm font-medium"
                  >
                    <span aria-hidden="true" className="select-none">
                      +
                    </span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- capabilities ---------------- */}
      <section className="border-b border-[var(--line-soft)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <TerminalHead command={c.term.cmd.built} title={c.built.title} />
          </Reveal>

          <div className="mt-10 grid gap-px bg-[var(--line-soft)] sm:grid-cols-2">
            {c.built.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 70} className="bg-[var(--bg-2)]">
                <div className="flex h-full gap-4 p-6">
                  <span className="mt-0.5 shrink-0 text-[var(--fg-faint)]">
                    <Icon d={BUILT_ICONS[i]} />
                  </span>
                  <div>
                    <h3 className="display text-base font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--fg-dim)]">
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
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <TerminalHead
              command={c.term.cmd.pricing}
              title={c.pricing.title}
              sub={c.pricing.sub}
            />
          </Reveal>

          <Reveal delay={90}>
            <div className="mt-10 border border-[var(--line)] bg-[var(--card)]">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] p-6 sm:p-8">
                <div>
                  <div
                    dir="ltr"
                    className="text-[10px] uppercase tracking-[0.18em] text-[var(--fg-faint)]"
                  >
                    {c.pricing.plan}
                  </div>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="display text-5xl font-bold tabular-nums">
                      {c.pricing.price}
                    </span>
                    <span className="text-lg font-bold text-[var(--fg-dim)]">
                      {c.pricing.currency}
                    </span>
                    <span className="text-xs text-[var(--fg-faint)]">/ {c.pricing.period}</span>
                  </div>
                </div>
                <Cta>{c.pricing.cta}</Cta>
              </div>

              <ul className="grid gap-x-8 gap-y-3 p-6 sm:grid-cols-2 sm:p-8">
                {c.pricing.includes.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-[var(--fg-dim)]"
                  >
                    <span aria-hidden="true" className="select-none opacity-70">
                      +
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <p className="border-t border-[var(--line-soft)] p-6 text-xs leading-relaxed text-[var(--fg-faint)] sm:px-8">
                {c.pricing.note}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className="border-b border-[var(--line-soft)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <TerminalHead command={c.term.cmd.faq} title={c.faq.title} />
          </Reveal>

          <div className="mt-10 divide-y divide-[var(--line-soft)] border-y border-[var(--line-soft)]">
            {c.faq.items.map((item, i) => (
              <Reveal key={item.q} delay={i * 55}>
                {/* <details> gives keyboard support and expand/collapse semantics for free. */}
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-start text-sm font-bold [&::-webkit-details-marker]:hidden">
                    <span className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="select-none text-[var(--fg-faint)] transition-opacity group-open:opacity-40"
                      >
                        ?
                      </span>
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 select-none text-[var(--fg-faint)] transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 ps-6 pe-8 text-sm leading-[1.75] text-[var(--fg-dim)]">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- closing ---------------- */}
      <section className="crt relative overflow-hidden">
        <div className="grid-texture" />
        <div className="relative z-[2] mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <div
            dir="ltr"
            className="mb-8 flex items-center justify-center gap-2 text-[11px] text-[var(--fg-faint)]"
          >
            <span className="select-none opacity-60">$</span>
            {c.term.cmd.cta}
          </div>

          <Reveal>
            <h2 className="display cursor text-3xl font-bold sm:text-5xl">{c.cta.title}</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mx-auto mt-5 max-w-md text-sm text-[var(--fg-dim)]">{c.cta.sub}</p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-9">
              <Cta>{c.cta.button}</Cta>
            </div>
            <p className="mt-4 text-xs text-[var(--fg-faint)]">{c.cta.note}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
