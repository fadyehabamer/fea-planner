'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ScrollProgress from '@/components/site/ScrollProgress'
import ThemeToggle from '@/components/ThemeToggle'
import { useCopy } from '@/lib/copy'
import { useI18n } from '@/lib/i18n'

function Wordmark({ size = 'md' }: { size?: 'md' | 'sm' }) {
  const box = size === 'md' ? 'h-9 w-9 text-base' : 'h-7 w-7 text-xs'
  return (
    <span className="flex items-center gap-2.5">
      <span
        className={`grid ${box} place-items-center font-extrabold`}
        style={{ background: 'var(--brand-solid)', color: 'var(--brand-ink)' }}
      >
        F
      </span>
      <span className="display text-[15px] font-extrabold tracking-tight">fea-planner</span>
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
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
        style={{ background: 'var(--brand-solid)', color: 'var(--brand-ink)' }}
      >
        {locale === 'ar' ? 'تخطَّ إلى المحتوى' : 'Skip to content'}
      </a>

      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur">
        <ScrollProgress />
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Link href="/" aria-label="fea-planner">
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
                  className={`px-3 py-2 text-sm font-semibold transition-colors ${
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
            <div className="flex overflow-hidden border border-[var(--line-soft)] text-[11px] font-bold">
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
            <Link
              href="/habits"
              className="invert-hover ms-1 hidden border px-4 py-2 text-sm font-bold sm:inline-block"
              style={{
                background: 'var(--brand-solid)',
                color: 'var(--brand-ink)',
                borderColor: 'var(--fg)',
              }}
            >
              {c.nav.open}
            </Link>
          </div>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="border-t border-[var(--line-soft)] bg-[var(--bg-2)]">
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
            © {new Date().getFullYear()} fea-planner · {c.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  )
}
