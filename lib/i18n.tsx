'use client'

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from 'react'

export type Locale = 'ar' | 'en'

export const dict = {
  ar: {
    appName: 'fea-planner',
    theme: 'المظهر',
    lightMode: 'فاتح',
    darkMode: 'داكن',
    habits: 'العادات والنوم',
    tasks: 'المهام',
    goals: 'الأهداف',
    year: 'الملخص السنوي',
    settings: 'الإعدادات',
    signOut: 'تسجيل الخروج',
    signIn: 'تسجيل الدخول',
    email: 'البريد الإلكتروني',
    sendLink: 'ابعتلي رابط الدخول',
    sending: 'جاري الإرسال…',
    checkEmail: 'بصّ في بريدك — بعتنالك رابط دخول. افتحه من نفس الجهاز.',
    loginBlurb: 'خطتك كلها في مكان واحد — على الموبايل واللابتوب.',
    habitTracker: 'متتبع العادات والنوم',
    integratedSystem: 'نظام الإنتاجية المتكامل',
    completed: 'مكتمل',
    missed: 'فائت',
    overall: 'الإجمالي',
    monthSummary: 'ملخص الشهر',
    dailyHabits: 'العادات اليومية',
    target: 'الهدف',
    doneCount: 'تم',
    rate: 'النسبة',
    progress: 'التقدم',
    week: 'الأسبوع',
    dailyCompleted: 'المكتمل اليوم',
    dailyRate: 'نسبة اليوم',
    sleepHours: 'ساعات النوم',
    top5: 'أكثر 5 عادات التزامًا',
    weeklyProgress: 'التقدم الأسبوعي',
    avgSleep: 'متوسط النوم',
    taskTracker: 'متتبع المهام',
    weekOf: 'أسبوع',
    addTask: 'أضف مهمة…',
    notDone: 'لم يتم',
    weekTotal: 'إنجاز الأسبوع',
    ofTasks: 'من',
    task: 'مهمة',
    goalsTracker: 'متتبع الأهداف',
    goalsBlurb: 'سنة أهدافك · كل هدف مقسّم لخطوات',
    goal: 'هدف',
    goalTitle: 'اكتب هدفك هنا…',
    stepTitle: 'خطوة…',
    steps: 'خطوات',
    yearlySummary: 'الملخص السنوي',
    yearBlurb: '12 شهر جنب بعض',
    month: 'الشهر',
    expected: 'المستهدف',
    yearTotal: 'إجمالي السنة',
    yearProgress: 'تقدمك على مدار السنة',
    habitName: 'اسم العادة',
    monthlyTarget: 'الهدف الشهري',
    language: 'اللغة',
    sleepTargetLabel: 'هدف النوم (ساعات)',
    displayName: 'الاسم',
    save: 'حفظ',
    saved: 'اتحفظ ✓',
    saving: 'جاري الحفظ…',
    settingsBlurb: 'اكتب عاداتك مرة واحدة وتتنقل لكل الشهور',
    today: 'النهاردة',
    setupTitle: 'محتاج إعداد',
    setupBody: 'مفيش بيانات اتصال بقاعدة البيانات. شغّل الخطوات اللي في README عشان تربط Supabase.',
    loading: 'جاري التحميل…',
    hoursShort: 'س',
    resetWeek: 'أسبوع جديد',
    prev: 'السابق',
    next: 'التالي',
  },
  en: {
    appName: 'fea-planner',
    theme: 'Theme',
    lightMode: 'Light',
    darkMode: 'Dark',
    habits: 'Habits & Sleep',
    tasks: 'Tasks',
    goals: 'Goals',
    year: 'Yearly Summary',
    settings: 'Settings',
    signOut: 'Sign out',
    signIn: 'Sign in',
    email: 'Email address',
    sendLink: 'Send me a sign-in link',
    sending: 'Sending…',
    checkEmail: 'Check your inbox — we sent a sign-in link. Open it on this device.',
    loginBlurb: 'Your whole plan in one place — on your phone and your laptop.',
    habitTracker: 'Habit & Sleep Tracker',
    integratedSystem: 'The complete productivity system',
    completed: 'Completed',
    missed: 'Missed',
    overall: 'Overall',
    monthSummary: 'Month summary',
    dailyHabits: 'Daily habits',
    target: 'Target',
    doneCount: 'Done',
    rate: 'Rate',
    progress: 'Progress',
    week: 'Week',
    dailyCompleted: 'Completed today',
    dailyRate: 'Daily rate',
    sleepHours: 'Sleep hours',
    top5: 'Top 5 most consistent habits',
    weeklyProgress: 'Weekly progress',
    avgSleep: 'Avg. sleep',
    taskTracker: 'Task Tracker',
    weekOf: 'Week of',
    addTask: 'Add a task…',
    notDone: 'Not done',
    weekTotal: 'Week completion',
    ofTasks: 'of',
    task: 'tasks',
    goalsTracker: 'Goals Tracker',
    goalsBlurb: 'Your year in goals · each one broken into steps',
    goal: 'Goal',
    goalTitle: 'Write your goal here…',
    stepTitle: 'Step…',
    steps: 'steps',
    yearlySummary: 'Yearly Summary',
    yearBlurb: 'All 12 months side by side',
    month: 'Month',
    expected: 'Target',
    yearTotal: 'Year total',
    yearProgress: 'Your progress across the year',
    habitName: 'Habit name',
    monthlyTarget: 'Monthly target',
    language: 'Language',
    sleepTargetLabel: 'Sleep target (hours)',
    displayName: 'Display name',
    save: 'Save',
    saved: 'Saved ✓',
    saving: 'Saving…',
    settingsBlurb: 'Write your habits once — they carry across every month',
    today: 'Today',
    setupTitle: 'Setup needed',
    setupBody: 'No database credentials found. Follow the steps in the README to connect Supabase.',
    loading: 'Loading…',
    hoursShort: 'h',
    resetWeek: 'New week',
    prev: 'Previous',
    next: 'Next',
  },
} as const

/** Widen the literal strings from `as const` so both locales share one type. */
export type Dict = { readonly [K in keyof (typeof dict)['ar']]: string }

export const MONTHS = {
  ar: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
  en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
} as const

// Index 0 = Sunday, matching JavaScript's Date#getDay().
export const WEEKDAYS = {
  ar: ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],
  en: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
} as const

export const WEEKDAYS_SHORT = {
  ar: ['ح','ن','ث','ر','خ','ج','س'],
  en: ['S','M','T','W','T','F','S'],
} as const

type Ctx = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: Dict
  dir: 'rtl' | 'ltr'
}

const I18nContext = createContext<Ctx | null>(null)

const STORAGE_KEY = 'planner.locale'
const DEFAULT_LOCALE: Locale = 'ar'

// localStorage is an external store, so it is read through useSyncExternalStore
// rather than an effect: no cascading render, and no hydration mismatch.
const listeners = new Set<() => void>()

function readLocale(): Locale {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return v === 'en' || v === 'ar' ? v : DEFAULT_LOCALE
  } catch {
    // Private browsing blocks access — fall back rather than crash.
    return DEFAULT_LOCALE
  }
}

function serverLocale(): Locale {
  return DEFAULT_LOCALE
}

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  // `storage` fires in *other* tabs, keeping a second open tab in step.
  window.addEventListener('storage', onChange)
  return () => {
    listeners.delete(onChange)
    window.removeEventListener('storage', onChange)
  }
}

function writeLocale(l: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, l)
  } catch {
    // Not persisted, but the in-memory notification below still applies it.
  }
  listeners.forEach((fn) => fn())
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, readLocale, serverLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
  }, [locale])

  const setLocale = useCallback((l: Locale) => writeLocale(l), [])

  return (
    <I18nContext.Provider
      value={{ locale, setLocale, t: dict[locale], dir: locale === 'ar' ? 'rtl' : 'ltr' }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
