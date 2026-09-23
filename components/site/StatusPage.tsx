'use client'

import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import { useCopy } from '@/lib/copy'
import { I18nProvider, useI18n } from '@/lib/i18n'

type Kind = '404' | '500'

const BRAND_TONES = ['var(--brand-solid)', 'var(--accent)']

/** A row of ticked boxes with a deliberate gap — the missing page, in the app's own visual language. */
function BrokenRow({ gapAt }: { gapAt: number }) {
  return (
    <div aria-hidden="true" className="flex items-center gap-1.5">
      {Array.from({ length: 12 }, (_, i) => {
        const missing = i === gapAt || i === gapAt + 1
        return (
          <span
            key={i}
            className="h-5 w-5 rounded-[5px]"
            style={
              missing
                ? { border: '1.5px dashed var(--line)', background: 'transparent' }
                : { background: BRAND_TONES[i % BRAND_TONES.length], opacity: 0.85 }
            }
          />
        )
      })}
    </div>
  )
}

function Inner({ kind, onRetry }: { kind: Kind; onRetry?: () => void }) {
  const { c } = useCopy()
  const { locale, setLocale } = useI18n()
  const copy = kind === '404' ? c.e404 : c.e500

  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden px-5 py-14">
      <div className="hero-glow" />

      <div className="absolute end-4 top-4 flex items-center gap-1.5">
        <div className="flex overflow-hidden rounded-lg border border-[var(--line-soft)] text-[11px] font-bold">
          {(['ar', 'en'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              aria-pressed={locale === l}
              className={`cursor-pointer px-2.5 py-1.5 transition-colors ${
                locale === l
                  ? 'bg-[var(--card-2)] text-[var(--fg)]'
                  : 'text-[var(--fg-faint)] hover:text-[var(--fg)]'
              }`}
            >
              {l === 'ar' ? 'ع' : 'EN'}
            </button>
          ))}
        </div>
        <ThemeToggle />
      </div>

      <div className="relative w-full max-w-lg text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <span
            className="grid h-9 w-9 place-items-center rounded-xl text-base font-extrabold"
            style={{ background: 'var(--brand-solid)', color: 'var(--brand-ink)' }}
          >
            F
          </span>
          <span className="display text-[15px] font-extrabold">fea-planner</span>
        </Link>

        <p
          className="display mt-10 text-[5.5rem] font-extrabold leading-none tabular-nums sm:text-[7rem]"
          style={{ color: 'var(--brand)' }}
        >
          {kind}
        </p>

        <h1 className="display mt-3 text-2xl font-extrabold sm:text-3xl">{copy.title}</h1>
        <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-[var(--fg-dim)]">
          {copy.body}
        </p>

        <div className="mt-9 flex justify-center">
          <BrokenRow gapAt={kind === '404' ? 5 : 8} />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {kind === '500' && onRetry ? (
            <button
              onClick={onRetry}
              className="cursor-pointer rounded-xl px-6 py-3.5 text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: 'var(--brand-solid)', color: 'var(--brand-ink)' }}
            >
              {c.e500.retry}
            </button>
          ) : (
            <Link
              href="/habits"
              className="rounded-xl px-6 py-3.5 text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: 'var(--brand-solid)', color: 'var(--brand-ink)' }}
            >
              {c.e404.app}
            </Link>
          )}

          <Link
            href="/"
            className="rounded-xl border border-[var(--line)] px-6 py-3.5 text-sm font-bold transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
          >
            {copy.home}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function StatusPage(props: { kind: Kind; onRetry?: () => void }) {
  // Error and not-found routes render outside the (site) and (app) layouts,
  // so they bring their own locale provider.
  return (
    <I18nProvider>
      <Inner {...props} />
    </I18nProvider>
  )
}
