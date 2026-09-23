'use client'

import { useState } from 'react'
import { I18nProvider, useI18n } from '@/lib/i18n'
import { createClient } from '@/lib/supabase/client'
import ThemeToggle from '@/components/ThemeToggle'

const CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)

function LoginForm() {
  const { t, locale, setLocale } = useI18n()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    const { error } = await createClient().auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) {
      setError(error.message)
      setStatus('error')
    } else {
      setStatus('sent')
    }
  }

  return (
    <div className="grid min-h-dvh place-items-center px-5 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--brand-solid)] text-lg font-extrabold text-[var(--brand-ink)]">
              F
            </span>
            <span className="text-lg font-extrabold">{t.appName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <div className="flex overflow-hidden rounded-lg border border-[var(--line-soft)] text-[11px] font-bold">
              {(['ar', 'en'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`px-2.5 py-1.5 ${
                    locale === l
                      ? 'bg-[var(--card-2)] text-[var(--fg)]'
                      : 'text-[var(--fg-faint)]'
                  }`}
                >
                  {l === 'ar' ? 'ع' : 'EN'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold leading-tight">{t.signIn}</h1>
        <p className="mt-2 text-sm text-[var(--fg-dim)]">{t.loginBlurb}</p>

        {!CONFIGURED ? (
          <div className="mt-6 rounded-2xl border border-[var(--amber)]/40 bg-[var(--amber)]/10 p-4">
            <div className="text-sm font-bold text-[var(--amber)]">{t.setupTitle}</div>
            <p className="mt-1 text-xs leading-relaxed text-[var(--fg-dim)]">{t.setupBody}</p>
          </div>
        ) : status === 'sent' ? (
          <div className="mt-6 rounded-2xl border border-[var(--w3)]/40 bg-[var(--w3)]/10 p-4 text-sm leading-relaxed text-[var(--fg)]">
            {t.checkEmail}
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-3">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-[var(--fg-dim)]">
                {t.email}
              </span>
              <input
                type="email"
                required
                autoComplete="email"
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--card)] px-3.5 py-3 text-sm outline-none focus:border-[var(--brand)]"
              />
            </label>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full cursor-pointer rounded-xl bg-[var(--brand-solid)] px-4 py-3 text-sm font-bold text-[var(--brand-ink)] transition-opacity disabled:opacity-60"
            >
              {status === 'sending' ? t.sending : t.sendLink}
            </button>
            {error ? (
              <p className="text-xs leading-relaxed text-[var(--w4)]">{error}</p>
            ) : null}
          </form>
        )}
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <I18nProvider>
      <LoginForm />
    </I18nProvider>
  )
}
