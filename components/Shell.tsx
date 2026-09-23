'use client'

import Link from 'next/link'
import BrandMark from '@/components/BrandMark'
import { usePathname, useRouter } from 'next/navigation'
import { useI18n } from '@/lib/i18n'
import { createClient } from '@/lib/supabase/client'
import ThemeToggle from '@/components/ThemeToggle'

const ICONS = {
  habits: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
  tasks: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  goals: 'M12 2v4m0 12v4M2 12h4m12 0h4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  year: 'M3 3v18h18M7 16V9m5 7V5m5 11v-5',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
} as const

type NavKey = keyof typeof ICONS

function Icon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const { t, locale, setLocale } = useI18n()
  const pathname = usePathname()
  const router = useRouter()

  const nav: { key: NavKey; href: string; label: string }[] = [
    { key: 'habits', href: '/habits', label: t.habits },
    { key: 'tasks', href: '/tasks', label: t.tasks },
    { key: 'goals', href: '/goals', label: t.goals },
    { key: 'year', href: '/year', label: t.year },
    { key: 'settings', href: '/settings', label: t.settings },
  ]

  async function signOut() {
    await createClient().auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-[var(--line-soft)] bg-[var(--bg)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-3 py-2.5 sm:px-5">
          <Link href="/habits" className="flex items-center gap-2">
            <BrandMark className="h-8 w-8" />
            <span className="text-sm font-extrabold">{t.appName}</span>
          </Link>

          <nav className="mx-2 hidden flex-1 items-center gap-1 md:flex">
            {nav.map((n) => {
              const active = pathname.startsWith(n.href)
              return (
                <Link
                  key={n.key}
                  href={n.href}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-[var(--brand-solid)] text-[var(--brand-ink)]'
                      : 'text-[var(--fg-dim)] hover:bg-[var(--card)] hover:text-[var(--fg)]'
                  }`}
                >
                  {n.label}
                </Link>
              )
            })}
          </nav>

          <div className="ms-auto flex items-center gap-1.5 md:ms-0">
            <div className="flex overflow-hidden rounded-full border border-[var(--line-soft)] text-xs font-bold">
              {(['ar', 'en'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`grid min-h-11 min-w-11 place-items-center transition-colors ${
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
            <button
              onClick={signOut}
              title={t.signOut}
              aria-label={t.signOut}
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line-soft)] text-[var(--fg-dim)] hover:text-[var(--w4)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* pb leaves room for the mobile tab bar */}
      <main className="mx-auto max-w-[1400px] px-3 pb-28 pt-4 sm:px-5 md:pb-10">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line-soft)] bg-[var(--bg-2)]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        <div className="grid grid-cols-5">
          {nav.map((n) => {
            const active = pathname.startsWith(n.href)
            return (
              <Link
                key={n.key}
                href={n.href}
                className={`flex flex-col items-center gap-0.5 py-2 text-[10px] font-semibold transition-colors ${
                  active ? 'text-[var(--brand)]' : 'text-[var(--fg-faint)]'
                }`}
              >
                <Icon d={ICONS[n.key]} />
                <span className="max-w-full truncate px-0.5">{n.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
