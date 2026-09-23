'use client'

import { useEffect, useMemo, useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { pct } from '@/lib/dates'
import { createClient } from '@/lib/supabase/client'
import type { Goal, GoalStep } from '@/lib/types'
import { Bar, Card, PageHeader, Spinner, StepperNav } from '@/components/ui'
import { useDebouncedSave } from '@/lib/useDebouncedSave'

const GOALS_PER_YEAR = 6
const STEPS_PER_GOAL = 10
const GOAL_COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#ef4444', '#ec4899', '#f59e0b']

export default function GoalsPage() {
  const { t } = useI18n()
  const supabase = useMemo(() => createClient(), [])
  const save = useDebouncedSave()

  const [year, setYear] = useState(() => new Date().getFullYear())
  const [goals, setGoals] = useState<Goal[]>([])
  const [steps, setSteps] = useState<GoalStep[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      let { data: goalRows } = await supabase
        .from('goals')
        .select('*')
        .eq('year', year)
        .order('position')

      // A year the user has never opened has no rows yet — create the six slots.
      if (!goalRows || goalRows.length === 0) {
        const { data: created } = await supabase
          .from('goals')
          .insert(
            Array.from({ length: GOALS_PER_YEAR }, (_, i) => ({
              user_id: user.id,
              year,
              position: i + 1,
              title: '',
            })),
          )
          .select()

        goalRows = created ?? []
        if (goalRows.length) {
          await supabase.from('goal_steps').insert(
            goalRows.flatMap((g) =>
              Array.from({ length: STEPS_PER_GOAL }, (_, i) => ({
                user_id: user.id,
                goal_id: g.id,
                position: i + 1,
                title: '',
                done: false,
              })),
            ),
          )
        }
      }

      const ids = (goalRows ?? []).map((g) => g.id)
      const { data: stepRows } = ids.length
        ? await supabase.from('goal_steps').select('*').in('goal_id', ids).order('position')
        : { data: [] as GoalStep[] }

      if (cancelled) return
      setGoals((goalRows as Goal[]) ?? [])
      setSteps((stepRows as GoalStep[]) ?? [])
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [supabase, year])

  const stepsByGoal = useMemo(() => {
    const m: Record<string, GoalStep[]> = {}
    for (const s of steps) (m[s.goal_id] ??= []).push(s)
    for (const k in m) m[k].sort((a, b) => a.position - b.position)
    return m
  }, [steps])

  function updateGoalTitle(id: string, title: string) {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, title } : g)))
    save(`g:${id}`, () => {
      void supabase.from('goals').update({ title }).eq('id', id)
    })
  }

  function updateStepTitle(id: string, title: string) {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, title } : s)))
    save(`s:${id}`, () => {
      void supabase.from('goal_steps').update({ title }).eq('id', id)
    })
  }

  async function toggleStep(step: GoalStep) {
    const done = !step.done
    setSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, done } : s)))
    await supabase.from('goal_steps').update({ done }).eq('id', step.id)
  }

  if (loading) return <Spinner label={t.loading} />

  return (
    <>
      <PageHeader
        title={t.goalsTracker}
        subtitle={t.goalsBlurb}
        right={
          <StepperNav
            label={String(year)}
            onPrev={() => setYear((y) => y - 1)}
            onNext={() => setYear((y) => y + 1)}
          />
        }
      />

      <div className="grid gap-3 lg:grid-cols-2">
        {goals.map((goal, gi) => {
          const list = stepsByGoal[goal.id] ?? []
          const done = list.filter((s) => s.done).length
          const p = pct(done, list.length || STEPS_PER_GOAL)
          const color = GOAL_COLORS[gi % GOAL_COLORS.length]

          return (
            <Card key={goal.id} className="overflow-hidden">
              <div className="flex items-center gap-2 border-b border-[var(--line-soft)] bg-[var(--card-2)] px-3 py-2">
                <span
                  className="shrink-0 rounded-md px-2 py-1 text-[10px] font-extrabold text-white"
                  style={{ background: color }}
                >
                  {t.goal} {goal.position}
                </span>
                <input
                  value={goal.title}
                  onChange={(e) => updateGoalTitle(goal.id, e.target.value)}
                  placeholder={t.goalTitle}
                  className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none"
                />
              </div>

              <div className="px-3 pt-3">
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold" style={{ color }}>
                    {p}%
                  </span>
                  <span className="text-[11px] font-bold text-[var(--fg-faint)]">
                    {t.doneCount} {done} / {list.length || STEPS_PER_GOAL}
                  </span>
                </div>
                <Bar value={p} color={color} height={8} />
              </div>

              <div className="grid gap-1 p-3 sm:grid-cols-2">
                {list.map((step) => (
                  <div key={step.id} className="flex items-center gap-2">
                    <button
                      onClick={() => toggleStep(step)}
                      aria-pressed={step.done}
                      aria-label={step.title || `${t.goal} ${goal.position} · ${step.position}`}
                      className="cell-btn grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[4px] border"
                      style={{
                        background: step.done ? color : 'var(--field)',
                        borderColor: step.done ? color : 'var(--line)',
                      }}
                    >
                      {step.done ? (
                        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      ) : null}
                    </button>
                    <input
                      value={step.title}
                      onChange={(e) => updateStepTitle(step.id, e.target.value)}
                      placeholder={`${t.stepTitle}`}
                      className={`min-w-0 flex-1 bg-transparent text-[11px] outline-none ${
                        step.done ? 'text-[var(--fg-faint)] line-through' : ''
                      }`}
                    />
                  </div>
                ))}
              </div>
            </Card>
          )
        })}
      </div>
    </>
  )
}
