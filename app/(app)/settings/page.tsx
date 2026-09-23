'use client'

import { useEffect, useMemo, useState } from 'react'
import { useI18n, type Locale } from '@/lib/i18n'
import { createClient } from '@/lib/supabase/client'
import type { Habit, Profile } from '@/lib/types'
import { Card, PageHeader, Spinner } from '@/components/ui'

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n()
  const supabase = useMemo(() => createClient(), [])

  const [userId, setUserId] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [profile, setProfile] = useState<Profile | null>(null)
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle')

  useEffect(() => {
    let cancelled = false
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const [p, h] = await Promise.all([
        supabase.from('profiles').select('*').eq('user_id', user.id).maybeSingle(),
        supabase.from('habits').select('*').order('position'),
      ])

      if (cancelled) return
      setUserId(user.id)
      setEmail(user.email ?? '')
      setProfile(
        (p.data as Profile) ?? {
          user_id: user.id,
          display_name: '',
          locale: 'ar',
          sleep_target: 8,
        },
      )
      setHabits((h.data as Habit[]) ?? [])
      setLoading(false)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [supabase])

  function patchHabit(id: string, patch: Partial<Habit>) {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, ...patch } : h)))
  }

  async function saveAll() {
    if (!userId || !profile) return
    setStatus('saving')

    await supabase.from('profiles').upsert(
      {
        user_id: userId,
        display_name: profile.display_name,
        locale: profile.locale,
        sleep_target: profile.sleep_target,
      },
      { onConflict: 'user_id' },
    )

    // One upsert for all rows — habits are few and always saved together.
    await supabase.from('habits').upsert(
      habits.map((h) => ({
        id: h.id,
        user_id: userId,
        position: h.position,
        name_ar: h.name_ar,
        name_en: h.name_en,
        target: h.target,
        active: h.active,
      })),
      { onConflict: 'id' },
    )

    setStatus('saved')
    setTimeout(() => setStatus('idle'), 2000)
  }

  if (loading || !profile) return <Spinner label={t.loading} />

  return (
    <>
      <PageHeader title={t.settings} subtitle={t.settingsBlurb} />

      <Card className="mb-4 p-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[var(--fg-dim)]">
              {t.displayName}
            </span>
            <input
              value={profile.display_name ?? ''}
              onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
              className="w-full rounded-lg border border-[var(--line)] bg-[var(--field)] px-3 py-2 text-sm outline-none focus:border-[var(--brand)]"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[var(--fg-dim)]">
              {t.sleepTargetLabel}
            </span>
            <input
              inputMode="decimal"
              dir="ltr"
              value={profile.sleep_target}
              onChange={(e) =>
                setProfile({ ...profile, sleep_target: Number(e.target.value) || 0 })
              }
              className="w-full rounded-lg border border-[var(--line)] bg-[var(--field)] px-3 py-2 text-sm outline-none focus:border-[var(--brand)]"
            />
          </label>

          <div>
            <span className="mb-1.5 block text-xs font-semibold text-[var(--fg-dim)]">
              {t.language}
            </span>
            <div className="flex overflow-hidden rounded-lg border border-[var(--line)]">
              {(['ar', 'en'] as Locale[]).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLocale(l)
                    setProfile({ ...profile, locale: l })
                  }}
                  className={`flex-1 px-3 py-2 text-sm font-bold transition-colors ${
                    locale === l
                      ? 'bg-[var(--brand-solid)] text-[var(--brand-ink)]'
                      : 'text-[var(--fg-dim)]'
                  }`}
                >
                  {l === 'ar' ? 'العربية' : 'English'}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-3 text-[11px] text-[var(--fg-faint)]" dir="ltr">
          {email}
        </p>
      </Card>

      <Card className="overflow-hidden">
        <div className="scroll-x">
          <table className="w-full border-separate border-spacing-0 text-xs">
            <thead>
              <tr className="bg-[var(--card-2)] text-[10px] text-[var(--fg-faint)]">
                <th className="border-b border-[var(--line)] px-3 py-2 font-semibold">#</th>
                <th className="border-b border-[var(--line)] px-3 py-2 text-start font-semibold">
                  {t.habitName} · العربية
                </th>
                <th className="border-b border-[var(--line)] px-3 py-2 text-start font-semibold">
                  {t.habitName} · English
                </th>
                <th className="border-b border-[var(--line)] px-3 py-2 font-semibold">
                  {t.monthlyTarget}
                </th>
                <th className="border-b border-[var(--line)] px-3 py-2 font-semibold">✓</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((h) => (
                <tr key={h.id} className={h.active ? '' : 'opacity-45'}>
                  <td className="border-b border-[var(--line-soft)] px-3 py-1.5 text-center text-[10px] text-[var(--fg-faint)]">
                    {h.position}
                  </td>
                  <td className="border-b border-[var(--line-soft)] px-2 py-1.5">
                    <input
                      dir="rtl"
                      value={h.name_ar}
                      onChange={(e) => patchHabit(h.id, { name_ar: e.target.value })}
                      className="w-full min-w-[160px] rounded-md bg-[var(--field)] px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[var(--brand)]"
                    />
                  </td>
                  <td className="border-b border-[var(--line-soft)] px-2 py-1.5">
                    <input
                      dir="ltr"
                      value={h.name_en}
                      onChange={(e) => patchHabit(h.id, { name_en: e.target.value })}
                      className="w-full min-w-[160px] rounded-md bg-[var(--field)] px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[var(--brand)]"
                    />
                  </td>
                  <td className="border-b border-[var(--line-soft)] px-2 py-1.5 text-center">
                    <input
                      inputMode="numeric"
                      dir="ltr"
                      value={h.target}
                      onChange={(e) =>
                        patchHabit(h.id, { target: Math.max(0, Number(e.target.value) || 0) })
                      }
                      className="w-14 rounded-md bg-[var(--field)] px-2 py-1.5 text-center text-xs outline-none focus:ring-1 focus:ring-[var(--brand)]"
                    />
                  </td>
                  <td className="border-b border-[var(--line-soft)] px-3 py-1.5 text-center">
                    <button
                      onClick={() => patchHabit(h.id, { active: !h.active })}
                      aria-pressed={h.active}
                      aria-label={h.name_en || h.name_ar}
                      className="cell-btn grid h-[18px] w-[18px] place-items-center rounded-[4px] border"
                      style={{
                        background: h.active ? 'var(--w3)' : 'var(--field)',
                        borderColor: h.active ? 'var(--w3)' : 'var(--line)',
                      }}
                    >
                      {h.active ? (
                        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      ) : null}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="sticky bottom-20 mt-4 flex justify-end md:bottom-4">
        <button
          onClick={saveAll}
          disabled={status === 'saving'}
          className="rounded-xl bg-[var(--brand-solid)] px-6 py-3 text-sm font-bold text-[var(--brand-ink)] shadow-lg shadow-[var(--shadow)] disabled:opacity-60"
        >
          {status === 'saving' ? t.saving : status === 'saved' ? t.saved : t.save}
        </button>
      </div>
    </>
  )
}
