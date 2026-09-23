export type Habit = {
  id: string
  position: number
  name_ar: string
  name_en: string
  target: number
  active: boolean
}

export type HabitLog = { habit_id: string; day: string }

export type SleepLog = { day: string; hours: number }

export type Task = {
  id: string
  day: string
  position: number
  title: string
  done: boolean
}

export type Goal = { id: string; year: number; position: number; title: string }

export type GoalStep = {
  id: string
  goal_id: string
  position: number
  title: string
  done: boolean
}

export type Profile = {
  user_id: string
  display_name: string | null
  locale: 'ar' | 'en'
  sleep_target: number
}
