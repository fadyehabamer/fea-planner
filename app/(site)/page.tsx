'use client'

import Link from 'next/link'
import Counter from '@/components/site/Counter'
import GridPreview from '@/components/site/GridPreview'
import HorizontalPin from '@/components/site/HorizontalPin'
import Reveal from '@/components/site/Reveal'
import { Magnetic, MegaMarquee, SpinningBadge, SplitHeadline, Tilt } from '@/components/site/kinetic'
import { TasksPreview, YearPreview } from '@/components/site/mocks'
import { useCopy } from '@/lib/copy'

/** Latin in both locales: it is set on a circle as a brand object, and
 *  stretching Arabic along a path would break the joins between letters. */
const BADGE = 'FREE FOREVER · NO ADS · NO TRACKING · '

const BUILT_ICONS = [
  'M5 8h14M9 4v4m1.5 0c-.5 6-3.5 9-7.5 11M13 20l4-9 4 9m-6.8-2h5.6',
  'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  'M5 2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 19h2',
  'M12 2l8 4v6c0 5-3.4 8.8-8 10-4.6-1.2-8-5-8-10V6l8-4zM9.5 12l1.8 1.8L15 10',
]

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
  return <Svg d="M5 12h14M13 6l6 6-6 6" className={`${className} rtl:-scale-x-100`} width={2.2} />
}

function Cta({
  children,
  href = '/login',
  ghost = false,
}: {
  children: React.ReactNode
  href?: string
  ghost?: boolean
}) {
  return (
    <Magnetic>
      <Link
        href={href}
        className={`group inline-flex min-h-12 items-center gap-2.5 rounded-full px-7 text-sm font-bold outline-offset-4 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--fg)] ${
          ghost ? 'border border-[var(--line)] hover:border-[var(--fg)]' : ''
        }`}
        style={ghost ? undefined : { background: 'var(--brand-solid)', color: 'var(--brand-ink)' }}
      >
        {children}
        <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
          <Arrow />
        </span>
      </Link>
    </Magnetic>
  )
}

function Index({ n, label }: { n: string; label?: string }) {
  return (
    <div className="flex items-center gap-3 text-xs font-bold text-[var(--fg-faint)]">
      <span dir="ltr" className="tabular-nums">
        ({n})
      </span>
      {label ? (
        <>
          <span className="h-px w-8 bg-[var(--line)]" />
          <span className="uppercase tracking-[0.16em]">{label}</span>
        </>
      ) : null}
    </div>
  )
}

function SectionHead({ n, title, sub }: { n: string; title: string; sub?: string }) {
  return (
    <Reveal>
      <Index n={n} />
      <h2 className="display mt-5 max-w-4xl text-[clamp(2.4rem,6vw,5.25rem)] font-black leading-[0.95]">
        {title}
      </h2>
      {sub ? (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--fg-dim)]">{sub}</p>
      ) : null}
    </Reveal>
  )
}

function Tick() {
  return <Svg d="M20 6L9 17l-5-5" className="mt-[3px] h-4 w-4 shrink-0" width={2.6} />
}

export default function LandingPage() {
  const { c, dir } = useCopy()
  const visuals = [<GridPreview key="g" />, <TasksPreview key="t" />, <YearPreview key="y" />]

  const panels = [
    <div
      key="intro"
      className="flex flex-col justify-between py-4 lg:min-h-[64vh] lg:w-[min(44vw,600px)]"
    >
      <div>
        <Index n="01" />
        <h2 className="display mt-5 text-[clamp(2.5rem,5.5vw,5rem)] font-black leading-[0.95]">
          {c.tools.title}
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--fg-dim)]">
          {c.tools.sub}
        </p>
      </div>
      <div className="hpin-hint mt-10 hidden items-center gap-3 text-sm font-bold lg:flex">
        {c.kinetic.scroll}
        <Arrow />
      </div>
    </div>,

    ...c.features.map((f, i) => (
      <article
        key={f.title}
        className="grid gap-8 rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-6 sm:p-10 lg:min-h-[64vh] lg:w-[min(82vw,1080px)] lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-12"
      >
        <div>
          <Index n={`0${i + 1}`} label={f.eyebrow} />
          <h3 className="display mt-5 text-[clamp(1.9rem,3.2vw,3rem)] font-black leading-[1.02]">
            {f.title}
          </h3>
          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--fg-dim)]">{f.body}</p>
          <ul className="mt-6 space-y-2.5">
            {f.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-[var(--fg-dim)]">
                <Tick />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">{visuals[i]}</div>
      </article>
    )),
  ]

  return (
    <>
      {/* ================= hero ================= */}
      <section className="relative overflow-hidden">
        <div className="grid-texture" />
        <div className="relative mx-auto max-w-7xl px-4 pt-14 sm:px-6 sm:pt-20">
          <Reveal>
            <span className="inline-flex rounded-full border border-[var(--line)] px-4 py-2 text-xs font-bold text-[var(--fg-dim)]">
              {c.hero.badge}
            </span>
          </Reveal>

          <SplitHeadline
            lead={c.hero.titleA}
            accent={c.hero.titleAccent}
            className="display mega mt-8 max-w-[13ch]"
          />

          <div className="mt-10 grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <Reveal delay={450}>
              <p className="max-w-md text-base leading-relaxed text-[var(--fg-dim)] sm:text-lg">
                {c.hero.sub}
              </p>
            </Reveal>
            <Reveal delay={550}>
              <div className="flex flex-wrap items-center gap-4">
                <Cta>{c.hero.ctaPrimary}</Cta>
                <Cta ghost href="/why">
                  {c.hero.ctaSecondary}
                </Cta>
                <div className="hidden lg:block">
                  <SpinningBadge text={BADGE} />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={250} className="pb-12 pt-14">
            <div className="hero-parallax">
              <Tilt max={4} className="rounded-[1.75rem]">
                <GridPreview />
              </Tilt>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= mega marquee ================= */}
      <div className="border-y border-[var(--line)] py-4">
        <MegaMarquee items={c.kinetic.marquee} />
        <MegaMarquee items={c.kinetic.marquee} reverse outlineFirst speed="54s" />
      </div>

      {/* ================= stats ================= */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--line)] md:grid-cols-4">
          {c.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="bg-[var(--bg)] p-6 sm:p-9">
              <div className="display text-[clamp(3rem,6.5vw,5.5rem)] font-black leading-none tabular-nums">
                <Counter value={s.value} />
              </div>
              <div className="mt-3 text-sm text-[var(--fg-dim)]">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= trackers: pinned horizontal ================= */}
      <section className="border-t border-[var(--line)]">
        <HorizontalPin panels={panels} dir={dir} />
      </section>

      {/* ================= comparison ================= */}
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <SectionHead n="02" title={c.compare.title} sub={c.compare.sub} />

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <Reveal>
              <Tilt className="h-full rounded-[2rem] border border-[var(--line)] p-8 sm:p-10">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--fg-faint)]">
                  {c.compare.beforeLabel}
                </h3>
                <ul className="mt-8 space-y-4">
                  {c.compare.before.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-base text-[var(--fg-faint)] line-through decoration-[var(--line)]"
                    >
                      <Svg d="M18 6L6 18M6 6l12 12" className="mt-[3px] h-4 w-4 shrink-0" width={2.4} />
                      {b}
                    </li>
                  ))}
                </ul>
              </Tilt>
            </Reveal>

            {/* The answer card inverts: in a black-and-white system, inversion
                is the strongest emphasis available. */}
            <Reveal delay={110}>
              <Tilt
                className="h-full rounded-[2rem] p-8 sm:p-10"
                style={{ background: 'var(--fg)', color: 'var(--bg)' }}
              >
                <h3 className="display text-xs font-bold uppercase tracking-[0.16em]">
                  {c.compare.afterLabel}
                </h3>
                <ul className="mt-8 space-y-4">
                  {c.compare.after.map((a) => (
                    <li key={a} className="flex items-start gap-3 text-base font-semibold">
                      <Tick />
                      {a}
                    </li>
                  ))}
                </ul>
              </Tilt>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= capabilities ================= */}
      <section className="border-t border-[var(--line)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <SectionHead n="03" title={c.built.title} />

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {c.built.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="lift h-full rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-8 hover:border-[var(--fg-faint)] sm:p-10">
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-[var(--line)]">
                      <Svg d={BUILT_ICONS[i]} />
                    </span>
                    <span
                      aria-hidden="true"
                      dir="ltr"
                      className="display text-5xl font-black leading-none tabular-nums text-[var(--line)]"
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="display mt-10 text-xl font-black">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--fg-dim)]">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= pricing ================= */}
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <SectionHead n="04" title={c.pricing.title} sub={c.pricing.sub} />

          <Reveal delay={90} className="mt-14">
            <Tilt max={3} className="rounded-[2rem] border border-[var(--line)] bg-[var(--card)]">
              <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--fg-faint)]">
                    {c.pricing.plan}
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="display text-[clamp(5rem,12vw,9rem)] font-black leading-none tabular-nums">
                      {c.pricing.price}
                    </span>
                    <span className="text-2xl font-black text-[var(--fg-dim)]">
                      {c.pricing.currency}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-[var(--fg-faint)]">/ {c.pricing.period}</div>
                  <div className="mt-8">
                    <Cta>{c.pricing.cta}</Cta>
                  </div>
                </div>

                <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {c.pricing.includes.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[var(--fg-dim)]">
                      <Tick />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="border-t border-[var(--line)] px-8 py-6 text-xs leading-relaxed text-[var(--fg-faint)] sm:px-12">
                {c.pricing.note}
              </p>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* ================= faq ================= */}
      <section className="border-t border-[var(--line)] bg-[var(--bg-2)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead n="05" title={c.faq.title} />

          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {c.faq.items.map((item, i) => (
              <Reveal key={item.q} delay={i * 55}>
                {/* <details> gives keyboard support and expand/collapse semantics for free. */}
                <details className="group py-6">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-start text-base font-bold sm:text-lg [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--line)] transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-[var(--fg)] group-open:text-[var(--bg)]">
                      <Svg d="M12 5v14M5 12h14" className="h-4 w-4" width={2.4} />
                    </span>
                  </summary>
                  <p className="mt-4 pe-14 text-[15px] leading-[1.75] text-[var(--fg-dim)]">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= closing ================= */}
      <section className="relative overflow-hidden border-t border-[var(--line)]">
        <div className="grid-texture" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal>
            <h2 className="display max-w-[16ch] text-[clamp(2.75rem,8vw,7.5rem)] font-black leading-[0.95]">
              {c.cta.title}
            </h2>
          </Reveal>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-10">
            <Reveal delay={90}>
              <p className="max-w-md text-base leading-relaxed text-[var(--fg-dim)]">{c.cta.sub}</p>
              <div className="mt-8">
                <Cta>{c.cta.button}</Cta>
              </div>
              <p className="mt-4 text-xs text-[var(--fg-faint)]">{c.cta.note}</p>
            </Reveal>
            <div className="hidden sm:block">
              <SpinningBadge text={BADGE} size={168} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
