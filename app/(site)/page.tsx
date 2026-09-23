'use client'

import Link from 'next/link'
import GridPreview from '@/components/site/GridPreview'
import Reveal from '@/components/site/Reveal'
import StickyCta from '@/components/site/StickyCta'
import TryDemo from '@/components/site/TryDemo'
import { Burst, Circled, CurlyArrow, Star, Sticker, Tape, Underline } from '@/components/site/doodles'
import { Magnetic } from '@/components/site/kinetic'
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
  return <Svg d="M5 12h14M13 6l6 6-6 6" className={`${className} rtl:-scale-x-100`} width={2.6} />
}

function Tick({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return <Svg d="M20 6L9 17l-5-5" className={className} width={3.2} />
}

/**
 * Sign-up buttons are sunflower stickers with a hard shadow that squashes flat
 * when pressed — the page's one consistent "do this" signal.
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
        className={`chunky group inline-flex items-center gap-2.5 rounded-full font-extrabold outline-offset-4 focus-visible:outline-2 focus-visible:outline-[var(--fg)] ${
          big ? 'min-h-14 px-8 text-lg' : 'min-h-12 px-7 text-base'
        }`}
        style={
          ghost
            ? { background: 'var(--card)', color: 'var(--fg)' }
            : { background: 'var(--sun)', color: 'var(--on)' }
        }
      >
        {children}
        <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
          <Arrow />
        </span>
      </Link>
    </Magnetic>
  )
}

/** Section title with its turn of phrase underlined in pen. */
function Title({
  a,
  b,
  tone = 'sun',
  className = '',
}: {
  a: string
  b?: string
  tone?: 'sun' | 'tang' | 'mint' | 'pink' | 'leaf'
  className?: string
}) {
  return (
    <h2 className={`display text-[clamp(2.3rem,6vw,4.75rem)] font-extrabold leading-[1] ${className}`}>
      {a}
      {b ? (
        <>
          {' '}
          <span className="relative inline-block">
            {b}
            <Underline tone={tone} delay={350} />
          </span>
        </>
      ) : null}
    </h2>
  )
}

/** A strip of washi tape carrying the marquee words. */
function TapeBand({
  items,
  tone,
  rotate,
  reverse = false,
}: {
  items: readonly string[]
  tone: string
  rotate: number
  reverse?: boolean
}) {
  const row = [...items, ...items, ...items, ...items]
  return (
    <div
      aria-hidden="true"
      className="chunky-sm -mx-4 overflow-hidden py-3"
      style={{ background: tone, color: 'var(--on)', transform: `rotate(${rotate}deg)` }}
    >
      <div
        dir="ltr"
        className="marquee-track"
        data-reverse={reverse}
        style={{ '--marquee-speed': '38s' } as React.CSSProperties}
      >
        {row.map((w, i) => (
          <span key={i} className="display flex shrink-0 items-center gap-6 px-3 text-2xl font-extrabold sm:text-4xl">
            <span dir="auto">{w}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6">
              <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}

const FEATURE_TONES = ['var(--tang)', 'var(--mint)', 'var(--pink)']
const STEP_TONES = ['sun', 'mint', 'pink'] as const
const STEP_TILT = [-2, 1.5, -1.2]

export default function LandingPage() {
  const { c } = useCopy()
  const visuals = [<GridPreview key="g" />, <TasksPreview key="t" />, <YearPreview key="y" />]
  const titleWords = c.hero.titleA.split(' ')
  const tailWords = c.hero.titleB.split(' ')

  return (
    <>
      {/* ================= hero ================= */}
      <section className="paper relative overflow-hidden">
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[1fr_1.02fr] lg:gap-12 lg:pb-28 lg:pt-16">
          <div className="relative">
            <Reveal>
              <span className="chunky-sm inline-flex items-center gap-2 rounded-full bg-[var(--card)] px-4 py-2 text-xs font-bold sm:text-sm">
                <Star tone="pink" className="h-4 w-4" />
                {c.hero.badge}
              </span>
            </Reveal>

            <h1 className="display mt-8 text-[clamp(2.9rem,12vw,5rem)] font-extrabold leading-[0.98] lg:text-[clamp(3.6rem,5.6vw,5.6rem)]">
              <span className="sr-only">
                {`${c.hero.titleA} ${c.hero.titleAccent} ${c.hero.titleB}`}
              </span>
              <span aria-hidden="true">
                {titleWords.map((w, i) => (
                  <span key={`a${i}`}>
                    <span className="word-mask">
                      <span className="word" style={{ '--i': i } as React.CSSProperties}>
                        {w}
                      </span>
                    </span>{' '}
                  </span>
                ))}
                <span
                  className="pop-in relative mx-[0.08em] inline-block whitespace-nowrap"
                  style={{ '--pop-delay': '380ms' } as React.CSSProperties}
                >
                  <span className="relative z-10">{c.hero.titleAccent}</span>
                  <Circled tone="tang" delay={800} />
                </span>{' '}
                {tailWords.map((w, i) => (
                  <span key={`b${i}`}>
                    <span className="word-mask">
                      <span
                        className="word"
                        style={{ '--i': titleWords.length + 2 + i } as React.CSSProperties}
                      >
                        {w}
                      </span>
                    </span>{' '}
                  </span>
                ))}
              </span>
            </h1>

            <Reveal delay={350}>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-[var(--fg-dim)]">{c.hero.sub}</p>
            </Reveal>

            <Reveal delay={450}>
              <div id="hero-cta" className="mt-9 flex flex-wrap items-center gap-4">
                <Cta big>{c.hero.ctaPrimary}</Cta>
                <Cta ghost href="#how">
                  {c.hero.ctaSecondary}
                </Cta>
              </div>
              <p className="mt-4 text-sm font-semibold text-[var(--fg-faint)]">{c.hero.micro}</p>
            </Reveal>

            <Reveal delay={550}>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {c.hero.proof.map((p, i) => (
                  <li
                    key={p}
                    className="flex items-center gap-1.5 rounded-full border-2 border-[var(--line)] bg-[var(--card)] px-3 py-1.5 text-xs font-bold sm:text-sm"
                  >
                    <span
                      className="grid h-4 w-4 place-items-center rounded-full"
                      style={{ background: FEATURE_TONES[i % 3], color: 'var(--on)' }}
                    >
                      <Tick className="h-2.5 w-2.5" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Margin note pointing across at the demo (wide screens only). */}
            <div className="pointer-events-none absolute -end-10 bottom-[-3.5rem] hidden items-end gap-1 text-[var(--fg-dim)] lg:flex xl:-end-4">
              <span className="hand pop-in text-2xl" style={{ '--pop-delay': '1300ms' } as React.CSSProperties}>
                {c.hero.note}
              </span>
              <CurlyArrow className="h-16 w-20 -rotate-[70deg]" delay={1400} />
            </div>
          </div>

          <div className="relative">
            <Sticker tone="sun" rotate={8} delay={900} className="-top-7 end-2 z-20 sm:-end-4">
              {c.hero.stickers.free}
            </Sticker>
            <Sticker tone="pink" rotate={-7} bob={6} delay={1100} className="-bottom-6 start-4 z-20 sm:-start-6">
              {c.hero.stickers.guilt}
            </Sticker>
            <Sticker tone="leaf" rotate={-10} bob={4.5} delay={1250} className="-top-8 start-[38%] z-20 hidden sm:block">
              {c.hero.stickers.arabic}
            </Sticker>
            <Reveal delay={200}>
              <TryDemo />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= crossed tape bands ================= */}
      <div className="relative z-10 -my-4 overflow-hidden py-8">
        <TapeBand items={c.kinetic.marquee} tone="var(--sun)" rotate={-2} />
        <div className="-mt-10">
          <TapeBand items={c.kinetic.marquee} tone="var(--pink)" rotate={1.6} reverse />
        </div>
      </div>

      {/* ================= the problem, and the turn ================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <Title a={c.pain.title} b={c.pain.accent} tone="tang" className="max-w-4xl" />
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--fg-dim)]">{c.pain.sub}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-10">
          <Reveal>
            <div
              className="askew h-full rounded-[1.75rem] border-2 border-dashed border-[var(--line)] bg-[var(--bg-2)] p-8 sm:p-10"
              style={{ '--r': '-1.5deg' } as React.CSSProperties}
            >
              <h3 className="hand text-3xl text-[var(--fg-faint)]">{c.pain.beforeLabel}</h3>
              <ul className="mt-6 space-y-4">
                {c.pain.before.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-base font-semibold text-[var(--fg-faint)] line-through decoration-[var(--tang)] decoration-2"
                  >
                    <Svg d="M18 6L6 18M6 6l12 12" className="mt-[3px] h-4 w-4 shrink-0" width={2.6} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <div
              className="askew chunky relative h-full rounded-[1.75rem] p-8 sm:p-10"
              style={{ '--r': '1.8deg', background: 'var(--sun)', color: 'var(--on)' } as React.CSSProperties}
            >
              <Tape tone="mint" rotate={-4} className="-top-3 start-1/2 -translate-x-1/2" />
              <h3 className="display text-3xl font-extrabold">{c.pain.afterLabel}</h3>
              <ul className="mt-6 space-y-4">
                {c.pain.after.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-base font-bold">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[var(--on)] text-[var(--sun)]">
                      <Tick className="h-3 w-3" />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= how it works ================= */}
      <section id="how" className="paper scroll-mt-20 border-y-2 border-[var(--line)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <Title a={c.how.title} className="max-w-3xl" />
          </Reveal>

          <ol className="mt-16 grid gap-8 md:grid-cols-3">
            {c.how.steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 100} className="h-full">
                  <div
                    className="askew chunky relative h-full rounded-[1.75rem] bg-[var(--card)] p-8 pt-12"
                    style={{ '--r': `${STEP_TILT[i]}deg` } as React.CSSProperties}
                  >
                    <div className="absolute -top-8 start-6 h-16 w-16">
                      <Burst tone={STEP_TONES[i]} className="h-16 w-16" />
                      <span
                        dir="ltr"
                        className="display absolute inset-0 grid place-items-center text-2xl font-extrabold"
                        style={{ color: 'var(--on)' }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="display text-2xl font-extrabold">{s.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-[var(--fg-dim)]">{s.desc}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= features: one sticker colour each ================= */}
      <section className="mx-auto max-w-7xl space-y-10 px-4 py-20 sm:px-6 sm:py-28 lg:space-y-14">
        {c.features.map((f, i) => (
          <Reveal key={f.title}>
            <article
              className="chunky grid items-center gap-8 overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14"
              style={{ background: FEATURE_TONES[i], color: 'var(--on)', boxShadow: '8px 8px 0 var(--hard)' }}
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <span className="inline-flex rounded-full bg-[var(--on)] px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#fffdf8]">
                  {f.eyebrow}
                </span>
                <h3 className="display mt-5 text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[1.02]">
                  {f.title}
                </h3>
                <p className="mt-5 max-w-lg text-base font-medium leading-[1.7] opacity-85">{f.body}</p>
                <ul className="mt-7 space-y-3">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-base font-bold">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[var(--on)] text-[#fffdf8]">
                        <Tick className="h-3 w-3" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="askew min-w-0"
                style={{ '--r': `${i % 2 ? -2 : 2}deg` } as React.CSSProperties}
              >
                <div className="chunky-sm overflow-hidden rounded-[1.75rem]">{visuals[i]}</div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      {/* ================= free ================= */}
      <section className="paper border-y-2 border-[var(--line)] bg-[var(--bg-2)]">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <Title a={c.pricing.title} b={c.pricing.accent} tone="mint" />
            <p className="mt-7 max-w-md text-lg leading-relaxed text-[var(--fg-dim)]">{c.pricing.sub}</p>
            <div className="mt-9">
              <Cta>{c.pricing.cta}</Cta>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative">
              {/* The price tag: a burst sticker slapped on the card's corner. */}
              <div className="bob sticker absolute -top-12 end-0 z-10 h-36 w-36 sm:-end-6 sm:h-40 sm:w-40" style={{ '--r': '10deg' } as React.CSSProperties}>
                <Burst tone="sun" className="h-full w-full" />
                <div className="absolute inset-0 grid place-content-center text-center" style={{ color: 'var(--on)' }}>
                  <span dir="ltr" className="display text-4xl font-extrabold leading-none sm:text-5xl">
                    {c.pricing.price}
                  </span>
                  <span className="hand text-xl leading-none">{c.pricing.period}</span>
                </div>
              </div>

              <div className="chunky rounded-[2rem] bg-[var(--card)] p-8 pt-16 sm:p-10 sm:pt-14">
                <p className="hand text-3xl text-[var(--fg-dim)]">{c.pricing.tag}</p>
                <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {c.pricing.includes.map((f, i) => (
                    <li key={f} className="flex items-start gap-3 text-base font-semibold">
                      <span
                        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 border-[var(--edge)]"
                        style={{ background: FEATURE_TONES[i % 3], color: 'var(--on)' }}
                      >
                        <Tick className="h-2.5 w-2.5" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= faq ================= */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <Title a={c.faq.title} />
        </Reveal>

        <div className="space-y-4">
          {c.faq.items.map((item, i) => (
            <Reveal key={item.q} delay={i * 55}>
              {/* <details> gives keyboard support and expand/collapse semantics for free. */}
              <details className="chunky-sm group rounded-2xl bg-[var(--card)] px-5 py-4 open:bg-[var(--card-2)] sm:px-6">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-start text-base font-extrabold sm:text-lg [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-[var(--edge)] transition-transform duration-300 group-open:rotate-45"
                    style={{ background: 'var(--sun)', color: 'var(--on)' }}
                  >
                    <Svg d="M12 5v14M5 12h14" className="h-4 w-4" width={3} />
                  </span>
                </summary>
                <p className="mt-3 pe-12 text-base leading-[1.75] text-[var(--fg-dim)]">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= closing: one big sticky note ================= */}
      <section data-cta-zone className="px-4 pb-16 pt-6 sm:px-6 sm:pb-24">
        <Reveal>
          <div
            className="chunky relative mx-auto max-w-6xl rounded-[2.5rem] px-6 py-20 text-center sm:px-14 sm:py-24"
            style={{ background: 'var(--sun)', color: 'var(--on)', boxShadow: '10px 10px 0 var(--hard)' }}
          >
            <Tape tone="pink" rotate={-10} className="-top-3 start-10" />
            <Tape tone="mint" rotate={8} className="-top-3 end-12" />
            <Star tone="pink" className="bob sticker absolute -start-5 top-1/3 hidden h-14 w-14 sm:block" />
            <Star tone="mint" className="bob sticker absolute -end-4 bottom-10 hidden h-10 w-10 sm:block" />

            <h2 className="display mx-auto max-w-[16ch] text-[clamp(2.6rem,7.5vw,6rem)] font-extrabold leading-[0.98]">
              {c.cta.title}{' '}
              <span className="relative inline-block">
                {c.cta.accent}
                <Underline tone="tang" delay={400} />
              </span>
            </h2>
            <p className="mx-auto mt-8 max-w-md text-lg font-semibold leading-relaxed opacity-80">
              {c.cta.sub}
            </p>
            <div className="mt-10 flex justify-center">
              <Magnetic>
                <Link
                  href="/login"
                  className="chunky group inline-flex min-h-14 items-center gap-3 rounded-full px-9 text-lg font-extrabold outline-offset-4 focus-visible:outline-2 focus-visible:outline-[var(--on)]"
                  style={{ background: 'var(--on)', color: 'var(--sun)', borderColor: 'var(--on)' }}
                >
                  {c.cta.button}
                  <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                    <Arrow />
                  </span>
                </Link>
              </Magnetic>
            </div>
            <p className="mt-5 text-sm font-semibold opacity-70">{c.cta.note}</p>
          </div>
        </Reveal>
      </section>

      <StickyCta label={c.sticky} watch="hero-cta" />
    </>
  )
}
