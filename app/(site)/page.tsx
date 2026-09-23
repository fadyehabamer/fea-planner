'use client'

import Link from 'next/link'
import GridPreview from '@/components/site/GridPreview'
import Reveal from '@/components/site/Reveal'
import StickyCta from '@/components/site/StickyCta'
import TryDemo from '@/components/site/TryDemo'
import { Magnetic, MegaMarquee, SplitHeadline, Tilt } from '@/components/site/kinetic'
import { TasksPreview, YearPreview } from '@/components/site/mocks'
import { useCopy } from '@/lib/copy'

function Svg({ d, className = 'h-5 w-5', width = 1.8 }: { d: string; className?: string; width?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}

/** Points along the reading direction: right in English, left in Arabic. */
function Arrow({ className = 'h-4 w-4' }: { className?: string }) {
  return <Svg d="M5 12h14M13 6l6 6-6 6" className={`${className} rtl:-scale-x-100`} width={2.4} />
}

function Tick({ className = 'mt-[3px] h-4 w-4 shrink-0' }: { className?: string }) {
  return <Svg d="M20 6L9 17l-5-5" className={className} width={2.8} />
}

/**
 * Every sign-up button is the one lime thing on screen, so the eye always
 * knows where the next step is. `ghost` is for the quieter second option.
 */
function Cta({
  children,
  href = '/login',
  ghost = false,
  big = false,
}: {
  children: React.ReactNode
  href?: string
  ghost?: boolean
  big?: boolean
}) {
  return (
    <Magnetic>
      <Link
        href={href}
        className={`group inline-flex items-center gap-2.5 rounded-full font-black outline-offset-4 transition-[transform,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-[var(--fg)] ${
          big ? 'min-h-14 px-8 text-base' : 'min-h-12 px-7 text-sm'
        } ${ghost ? 'border border-[var(--line)] hover:border-[var(--fg)]' : 'hover:scale-[1.03]'}`}
        style={ghost ? undefined : { background: 'var(--pop)', color: 'var(--pop-ink)' }}
      >
        {children}
        <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
          <Arrow />
        </span>
      </Link>
    </Magnetic>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.16em] text-[var(--fg-faint)]">
      <span className="h-2 w-2 rounded-[3px]" style={{ background: 'var(--pop-edge)' }} />
      {children}
    </div>
  )
}

/** A two-part section title: the claim, then the turn in the highlighter. */
function Title({ a, b, className = '' }: { a: string; b?: string; className?: string }) {
  return (
    <h2
      className={`display text-[clamp(2.3rem,6vw,5rem)] font-black leading-[0.98] ${className}`}
    >
      {a}
      {b ? (
        <>
          {' '}
          <span className="marker">{b}</span>
        </>
      ) : null}
    </h2>
  )
}

export default function LandingPage() {
  const { c } = useCopy()
  const visuals = [<GridPreview key="g" />, <TasksPreview key="t" />, <YearPreview key="y" />]

  return (
    <>
      {/* ================= hero: promise on one side, the product itself on the other ================= */}
      <section className="relative overflow-hidden">
        <div className="grid-texture" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 end-[-10%] h-[36rem] w-[36rem] rounded-full blur-3xl"
          style={{ background: 'var(--pop-soft)' }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24 lg:pt-20">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-xs font-bold text-[var(--fg-dim)]">
                <span className="h-2 w-2 rounded-full" style={{ background: 'var(--pop-edge)' }} />
                {c.hero.badge}
              </span>
            </Reveal>

            <SplitHeadline
              lead={c.hero.titleA}
              accent={c.hero.titleAccent}
              tail={c.hero.titleB}
              className="display mt-7 text-[clamp(2.7rem,11vw,4.75rem)] font-black leading-[0.98] tracking-[-0.045em] lg:text-[clamp(3.5rem,5.4vw,5.5rem)]"
            />

            <Reveal delay={350}>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-[var(--fg-dim)] sm:text-lg">
                {c.hero.sub}
              </p>
            </Reveal>

            <Reveal delay={450}>
              <div id="hero-cta" className="mt-9 flex flex-wrap items-center gap-3">
                <Cta big>{c.hero.ctaPrimary}</Cta>
                <Cta ghost href="#how">
                  {c.hero.ctaSecondary}
                </Cta>
              </div>
              <p className="mt-4 text-xs font-semibold text-[var(--fg-faint)]">{c.hero.micro}</p>
            </Reveal>

            <Reveal delay={550}>
              <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-2.5">
                {c.hero.proof.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm font-bold text-[var(--fg-dim)]">
                    <Tick className="h-4 w-4 shrink-0 text-[var(--fg)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <TryDemo />
          </Reveal>
        </div>
      </section>

      {/* ================= marquee ================= */}
      <div className="border-y border-[var(--line)]">
        <MegaMarquee items={c.kinetic.marquee} speed="50s" />
      </div>

      {/* ================= the problem, and the turn ================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <Title a={c.pain.title} b={c.pain.accent} className="max-w-5xl" />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-dim)] sm:text-lg">
            {c.pain.sub}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[2rem] border border-[var(--line)] p-8 sm:p-10">
              <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[var(--fg-faint)]">
                {c.pain.beforeLabel}
              </h3>
              <ul className="mt-8 space-y-4">
                {c.pain.before.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-base text-[var(--fg-faint)] line-through decoration-[var(--line)]"
                  >
                    <Svg d="M18 6L6 18M6 6l12 12" className="mt-[3px] h-4 w-4 shrink-0" width={2.4} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <Tilt
              className="h-full rounded-[2rem] p-8 sm:p-10"
              style={{ background: 'var(--pop)', color: 'var(--pop-ink)' }}
            >
              <h3 className="display text-xs font-black uppercase tracking-[0.16em]">
                {c.pain.afterLabel}
              </h3>
              <ul className="mt-8 space-y-4">
                {c.pain.after.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-base font-bold">
                    <Tick />
                    {a}
                  </li>
                ))}
              </ul>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* ================= how it works ================= */}
      <section id="how" className="scroll-mt-20 border-t border-[var(--line)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <Title a={c.how.title} className="max-w-3xl" />
          </Reveal>

          <ol className="mt-14 grid gap-5 md:grid-cols-3">
            {c.how.steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 90} className="h-full">
                  <div className="lift h-full rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-8 hover:border-[var(--fg-faint)]">
                  <span
                    dir="ltr"
                    className="grid h-14 w-14 place-items-center rounded-2xl text-2xl font-black tabular-nums"
                    style={
                      i === 1
                        ? { background: 'var(--pop)', color: 'var(--pop-ink)' }
                        : { border: '1px solid var(--line)' }
                    }
                  >
                    {i + 1}
                  </span>
                  <h3 className="display mt-8 text-2xl font-black">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--fg-dim)]">{s.desc}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= features: alternating, each with its screen ================= */}
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-7xl space-y-24 px-4 py-20 sm:px-6 sm:py-28 lg:space-y-32">
          {c.features.map((f, i) => (
            <div
              key={f.title}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <Reveal className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <Eyebrow>{f.eyebrow}</Eyebrow>
                <h3 className="display mt-5 text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.02]">
                  {f.title}
                </h3>
                <p className="mt-5 max-w-lg text-base leading-[1.75] text-[var(--fg-dim)]">{f.body}</p>
                <ul className="mt-7 space-y-3">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[15px] font-semibold">
                      <span
                        className="mt-[1px] grid h-5 w-5 shrink-0 place-items-center rounded-md"
                        style={{ background: 'var(--pop)', color: 'var(--pop-ink)' }}
                      >
                        <Tick className="h-3 w-3" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={120} className="min-w-0">
                <Tilt max={4} className="rounded-[1.75rem]">
                  {visuals[i]}
                </Tilt>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* ================= free ================= */}
      <section className="border-t border-[var(--line)] bg-[var(--bg-2)]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <Title a={c.pricing.title} b={c.pricing.accent} />
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--fg-dim)]">{c.pricing.sub}</p>
            <div className="mt-9">
              <Cta>{c.pricing.cta}</Cta>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-8 sm:p-10">
              <div className="flex items-baseline gap-3">
                <span className="display text-[clamp(4.5rem,11vw,7.5rem)] font-black leading-none tabular-nums">
                  {c.pricing.price}
                </span>
                <span className="text-lg font-black text-[var(--fg-dim)]">/ {c.pricing.period}</span>
              </div>
              <ul className="mt-8 grid gap-x-8 gap-y-4 border-t border-[var(--line)] pt-8 sm:grid-cols-2">
                {c.pricing.includes.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm font-semibold text-[var(--fg-dim)]">
                    <Tick className="mt-[2px] h-4 w-4 shrink-0 text-[var(--fg)]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= faq ================= */}
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Title a={c.faq.title} />
          </Reveal>

          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {c.faq.items.map((item, i) => (
              <Reveal key={item.q} delay={i * 55}>
                {/* <details> gives keyboard support and expand/collapse semantics for free. */}
                <details className="group py-6">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-start text-base font-bold sm:text-lg [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--line)] transition-[transform,background-color,color,border-color] duration-300 group-open:rotate-45 group-open:border-[var(--pop-edge)] group-open:bg-[var(--pop)] group-open:text-[var(--pop-ink)]">
                      <Svg d="M12 5v14M5 12h14" className="h-4 w-4" width={2.4} />
                    </span>
                  </summary>
                  <p className="mt-4 pe-14 text-[15px] leading-[1.75] text-[var(--fg-dim)]">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= closing: the whole section is the button's stage ================= */}
      <section data-cta-zone className="px-4 pb-6 sm:px-6 sm:pb-10">
        <div
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-6 py-20 sm:px-14 sm:py-28"
          style={{ background: 'var(--pop)', color: 'var(--pop-ink)' }}
        >
          <Reveal>
            <h2 className="display max-w-[15ch] text-[clamp(2.6rem,8vw,7rem)] font-black leading-[0.95]">
              {c.cta.title} <span className="underline decoration-[0.08em] underline-offset-[0.12em]">{c.cta.accent}</span>
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="mt-8 max-w-md text-base font-semibold leading-relaxed opacity-80 sm:text-lg">
              {c.cta.sub}
            </p>
            <div className="mt-10">
              <Magnetic>
                <Link
                  href="/login"
                  className="group inline-flex min-h-14 items-center gap-3 rounded-full px-8 text-base font-black outline-offset-4 transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-[var(--pop-ink)]"
                  style={{ background: 'var(--pop-ink)', color: 'var(--pop)' }}
                >
                  {c.cta.button}
                  <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                    <Arrow />
                  </span>
                </Link>
              </Magnetic>
            </div>
            <p className="mt-4 text-xs font-semibold opacity-70">{c.cta.note}</p>
          </Reveal>
        </div>
      </section>

      <StickyCta label={c.sticky} watch="hero-cta" />
    </>
  )
}
