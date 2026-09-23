'use client'

import Link from 'next/link'
import GridPreview from '@/components/site/GridPreview'
import { useCopy } from '@/lib/copy'

const TOOL_ICONS = [
  'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
  'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  'M12 2v4m0 12v4M2 12h4m12 0h4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  'M3 3v18h18M7 16V9m5 7V5m5 11v-5',
]

const BUILT_ICONS = [
  'M5 8h14M9 4v4m1.5 0c-.5 6-3.5 9-7.5 11M13 20l4-9 4 9m-6.8-2h5.6',
  'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  'M5 2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 19h2',
  'M12 2l8 4v6c0 5-3.4 8.8-8 10-4.6-1.2-8-5-8-10V6l8-4zM9.5 12l1.8 1.8L15 10',
]

function Icon({ d, className = 'h-5 w-5' }: { d: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--accent)"
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

export default function LandingPage() {
  const { c } = useCopy()

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="relative overflow-hidden">
        <div className="hero-glow" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
          <div className="reveal">
            <span
              className="inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-bold"
              style={{ borderColor: 'var(--line)', color: 'var(--brand)' }}
            >
              {c.hero.badge}
            </span>

            <h1 className="display mt-5 text-[2.35rem] font-extrabold leading-[1.1] sm:text-5xl lg:text-[3.4rem]">
              {c.hero.titleA}{' '}
              <span style={{ color: 'var(--brand)' }}>{c.hero.titleAccent}</span>
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--fg-dim)] sm:text-base">
              {c.hero.sub}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="rounded-xl px-6 py-3.5 text-sm font-bold transition-opacity hover:opacity-90"
                style={{ background: 'var(--brand-solid)', color: 'var(--brand-ink)' }}
              >
                {c.hero.ctaPrimary}
              </Link>
              <Link
                href="/why"
                className="rounded-xl border border-[var(--line)] px-6 py-3.5 text-sm font-bold text-[var(--fg)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                {c.hero.ctaSecondary}
              </Link>
            </div>

            <ul className="mt-8 flex flex-col gap-2 text-xs text-[var(--fg-faint)] sm:flex-row sm:flex-wrap sm:gap-x-5">
              {c.hero.trust.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal" style={{ animationDelay: '90ms' }}>
            <GridPreview />
          </div>
        </div>
      </section>

      {/* ---------------- the four tools ---------------- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="display text-3xl font-extrabold sm:text-4xl">{c.tools.title}</h2>
          <p className="mt-3 text-[15px] text-[var(--fg-dim)]">{c.tools.sub}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {c.tools.items.map((tool, i) => (
            <article
              key={tool.name}
              className="group rounded-2xl border border-[var(--line-soft)] bg-[var(--card)] p-6 transition-colors duration-200 hover:border-[var(--brand)]"
            >
              <span
                className="grid h-11 w-11 place-items-center rounded-xl"
                style={{
                  background: 'color-mix(in oklab, var(--brand) 16%, transparent)',
                  color: 'var(--brand)',
                }}
              >
                <Icon d={TOOL_ICONS[i]} className="h-[22px] w-[22px]" />
              </span>

              <h3 className="display mt-4 text-lg font-extrabold">{tool.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--fg-dim)]">{tool.desc}</p>

              <ul className="mt-4 space-y-2">
                {tool.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[13px] text-[var(--fg-dim)]">
                    <Check />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------- how it works ---------------- */}
      <section className="border-y border-[var(--line-soft)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="display text-3xl font-extrabold sm:text-4xl">{c.how.title}</h2>

          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
            {c.how.steps.map((step, i) => (
              <li key={step.title} className="relative">
                <span
                  className="display grid h-10 w-10 place-items-center rounded-xl text-base font-extrabold"
                  style={{ background: 'var(--brand-solid)', color: 'var(--brand-ink)' }}
                >
                  {i + 1}
                </span>
                <h3 className="display mt-4 text-lg font-extrabold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-dim)]">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- built this way ---------------- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="display text-3xl font-extrabold sm:text-4xl">{c.built.title}</h2>

        <div className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2">
          {c.built.items.map((item, i) => (
            <div key={item.title} className="flex gap-4">
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                style={{
                  background: 'color-mix(in oklab, var(--accent) 15%, transparent)',
                  color: 'var(--accent)',
                }}
              >
                <Icon d={BUILT_ICONS[i]} />
              </span>
              <div>
                <h3 className="display text-base font-extrabold">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--fg-dim)]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- closing CTA ---------------- */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--line-soft)] bg-[var(--card)] px-6 py-14 text-center sm:px-12">
          <div className="hero-glow" />
          <div className="relative">
            <h2 className="display text-3xl font-extrabold sm:text-4xl">{c.cta.title}</h2>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-[var(--fg-dim)]">{c.cta.sub}</p>
            <Link
              href="/login"
              className="mt-8 inline-block rounded-xl px-8 py-4 text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: 'var(--brand-solid)', color: 'var(--brand-ink)' }}
            >
              {c.cta.button}
            </Link>
            <p className="mt-4 text-xs text-[var(--fg-faint)]">{c.cta.note}</p>
          </div>
        </div>
      </section>
    </>
  )
}
