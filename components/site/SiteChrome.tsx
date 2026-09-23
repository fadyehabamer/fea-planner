'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BrandMark from '@/components/BrandMark'
import ScrollProgress from '@/components/site/ScrollProgress'
import ThemeToggle from '@/components/ThemeToggle'
import { BRAND } from '@/lib/brand'
import { useCopy } from '@/lib/copy'
import { useI18n } from '@/lib/i18n'

function Wordmark({ size = 'md' }: { size?: 'md' | 'sm' }) {
  const { locale } = useI18n()
  return (
    <span className="flex items-center gap-2.5">
      <BrandMark className={size === 'md' ? 'h-9 w-9' : 'h-7 w-7'} />
      <span className="display text-lg font-black tracking-tight">
        {locale === 'ar' ? BRAND.ar : BRAND.en}
      </span>
    </span>
  )
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const { c } = useCopy()
  const { locale, setLocale } = useI18n()
  const pathname = usePathname()

  const links = [
    { href: '/why', label: c.nav.why },
    { href: '/policy', label: c.nav.privacy },
  ]

  return (
    <div className="min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-full focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
        style={{ background: 'var(--brand-solid)', color: 'var(--brand-ink)' }}
      >
        {locale === 'ar' ? 'تخطَّ إلى المحتوى' : 'Skip to content'}
      </a>

      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur">
        <ScrollProgress />
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Link href="/" aria-label={locale === 'ar' ? BRAND.ar : BRAND.en}>
            <Wordmark />
          </Link>

          <nav className="ms-2 hidden items-center gap-1 sm:flex">
            {links.map((l) => {
              const active = pathname === l.href
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                    active
                      ? 'text-[var(--fg)]'
                      : 'text-[var(--fg-dim)] hover:bg-[var(--card)] hover:text-[var(--fg)]'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>

          <div className="ms-auto flex items-center gap-1.5">
            <div className="flex overflow-hidden rounded-full border border-[var(--line-soft)] text-xs font-bold">
              {(['ar', 'en'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  aria-pressed={locale === l}
                  className={`grid min-h-11 min-w-11 cursor-pointer place-items-center transition-colors ${
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
            <Link
              href="/habits"
              className="hidden min-h-11 items-center rounded-full px-4 text-sm font-semibold text-[var(--fg-dim)] transition-colors hover:text-[var(--fg)] md:inline-flex"
            >
              {c.nav.open}
            </Link>
            <Link
              href="/login"
              className="ms-1 inline-flex min-h-11 items-center rounded-full px-5 text-sm font-black transition-transform duration-200 hover:scale-[1.04]"
              style={{ background: 'var(--pop)', color: 'var(--pop-ink)' }}
            >
              {c.nav.signIn}
            </Link>
          </div>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer data-cta-zone className="border-t border-[var(--line-soft)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Wordmark size="sm" />
              <p className="mt-3 max-w-xs text-xs leading-relaxed text-[var(--fg-faint)]">
                {c.footer.tagline}
              </p>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {[...links, { href: '/habits', label: c.nav.open }].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-semibold text-[var(--fg-dim)] transition-colors hover:text-[var(--brand)]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-8 border-t border-[var(--line-soft)] pt-5 text-[11px] text-[var(--fg-faint)]">
            © {new Date().getFullYear()} {locale === 'ar' ? BRAND.ar : BRAND.en} · {c.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  )
}
