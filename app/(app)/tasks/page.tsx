'use client'

import { useEffect, useMemo, useState } from 'react'
import { MONTHS, WEEKDAYS, useI18n } from '@/lib/i18n'
import { DAY_COLORS, addDays, iso, pct, startOfWeek } from '@/lib/dates'
import { createClient } from '@/lib/supabase/client'
import type { Task } from '@/lib/types'
import { Bar, Card, PageHeader, Spinner, StepperNav } from '@/components/ui'
import { useDebouncedSave } from '@/lib/useDebouncedSave'
import { groupTasksByDay, nextTaskPosition } from '@/lib/stats'

const MAX_PER_DAY = 14
const TODAY_ISO = iso(new Date())

export default function TasksPage() {
  const { t, locale } = useI18n()
  const supabase = useMemo(() => createClient(), [])
  const save = useDebouncedSave()

  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()))
  const [userId, setUserId] = useState<string | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => iso(addDays(weekStart, i))),
    [weekStart],
  )
  const from = weekDays[0]
  const to = weekDays[6]

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return
      if (!cancelled) setUserId(user.id)

      const { data } = await supabase
        .from('tasks')
        .select('*')
        .gte('day', from)
        .lte('day', to)
        .order('position')

      if (cancelled) return
      setTasks((data as Task[]) ?? [])
      setLoading(false)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [supabase, from, to])

  const byDay = useMemo(() => groupTasksByDay(tasks, weekDays), [tasks, weekDays])

  async function addTask(day: string, title: string) {
    if (!userId || !title.trim()) return
    const used = byDay[day] ?? []
    if (used.length >= MAX_PER_DAY) return
    const position = nextTaskPosition(used)

    const { data } = await supabase
      .from('tasks')
      .insert({ user_id: userId, day, position, title: title.trim(), done: false })
      .select()
      .single()

    if (data) setTasks((prev) => [...prev, data as Task])
  }

  function updateTitle(id: string, title: string) {
    setTasks((prev) => prev.map((x) => (x.id === id ? { ...x, title } : x)))
    save(id, () => {
      void supabase.from('tasks').update({ title }).eq('id', id)
    })
  }

  async function toggleDone(task: Task) {
    const done = !task.done
    setTasks((prev) => prev.map((x) => (x.id === task.id ? { ...x, done } : x)))
    await supabase.from('tasks').update({ done }).eq('id', task.id)
  }

  async function remove(id: string) {
    setTasks((prev) => prev.filter((x) => x.id !== id))
    await supabase.from('tasks').delete().eq('id', id)
  }

  const weekDone = tasks.filter((x) => x.done).length
  const weekTotal = tasks.length
  const weekPct = pct(weekDone, weekTotal)

  const label = `${MONTHS[locale][weekStart.getMonth()].slice(0, 6)} ${weekStart.getDate()}`

  if (loading) return <Spinner label={t.loading} />

  return (
    <>
      <PageHeader
        title={t.taskTracker}
        subtitle={`${t.weekOf} ${weekStart.getDate()} ${MONTHS[locale][weekStart.getMonth()]} ${weekStart.getFullYear()}`}
        right={
          <StepperNav
            label={label}
            onPrev={() => setWeekStart((d) => addDays(d, -7))}
            onNext={() => setWeekStart((d) => addDays(d, 7))}
          />
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {weekDays.map((day, i) => {
          const list = byDay[day] ?? []
          const done = list.filter((x) => x.done).length
          const p = pct(done, list.length)
          const color = DAY_COLORS[i]
          const isToday = day === TODAY_ISO
          const d = new Date(day + 'T00:00:00')

          return (
            <Card
              key={day}
              className={`flex flex-col overflow-hidden ${isToday ? 'ring-2 ring-[var(--brand)]' : ''}`}
            >
              <div
                className="flex items-baseline justify-between px-3 py-1.5 text-white"
                style={{ background: color }}
              >
                <span className="text-xs font-bold">{WEEKDAYS[locale][d.getDay()]}</span>
                <span className="text-[10px] font-semibold opacity-90" dir="ltr">
                  {d.getDate()}/{d.getMonth() + 1}
                </span>
              </div>

              <div className="px-3 pt-2">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-xl font-extrabold" style={{ color }}>
                    {p}%
                  </span>
                  {isToday ? (
                    <span className="text-[10px] font-bold text-[var(--brand)]">{t.today}</span>
                  ) : null}
                </div>
                <Bar value={p} color={color} height={6} />
              </div>

              <div className="flex-1 space-y-1 px-2 py-2">
                {list.map((task) => (
                  <div key={task.id} className="group flex items-center gap-1.5">
                    <button
                      onClick={() => toggleDone(task)}
                      aria-pressed={task.done}
                      aria-label={task.title}
                      className="cell-btn grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[4px] border"
                      style={{
                        background: task.done ? color : 'var(--field)',
                        borderColor: task.done ? color : 'var(--line)',
                      }}
                    >
                      {task.done ? (
                        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      ) : null}
                    </button>
                    <input
                      value={task.title}
                      onChange={(e) => updateTitle(task.id, e.target.value)}
                      className={`min-w-0 flex-1 bg-transparent text-[11px] outline-none ${
                        task.done ? 'text-[var(--fg-faint)] line-through' : 'text-[var(--fg)]'
                      }`}
                    />
                    <button
                      onClick={() => remove(task.id)}
                      aria-label="delete"
                      className="shrink-0 px-1 text-[13px] leading-none text-[var(--fg-faint)] opacity-0 transition-opacity hover:text-[var(--w4)] focus:opacity-100 group-hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {list.length < MAX_PER_DAY ? (
                  <input
                    placeholder={t.addTask}
                    className="w-full rounded-md bg-[var(--field)] px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-[var(--line)]"
                    onKeyDown={(e) => {
                      if (e.key !== 'Enter') return
                      const el = e.currentTarget
                      void addTask(day, el.value)
                      el.value = ''
                    }}
                    onBlur={(e) => {
                      if (!e.currentTarget.value.trim()) return
                      void addTask(day, e.currentTarget.value)
                      e.currentTarget.value = ''
                    }}
                  />
                ) : null}
              </div>

              <div className="flex items-center justify-between border-t border-[var(--line-soft)] px-3 py-1.5 text-[10px] font-bold">
                <span style={{ color }}>
                  {t.doneCount} {done}
                </span>
                <span className="text-[var(--fg-faint)]">
                  {t.notDone} {list.length - done}
                </span>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="mt-4 flex items-center gap-4 p-4">
        <span className="text-xs font-bold text-[var(--fg-dim)]">
          {t.weekTotal} · {weekDone} {t.ofTasks} {weekTotal} {t.task}
        </span>
        <div className="flex-1">
          <Bar value={weekPct} color="var(--brand)" height={10} />
        </div>
        <span className="text-lg font-extrabold text-[var(--brand)]">{weekPct}%</span>
      </Card>
    </>
  )
}
