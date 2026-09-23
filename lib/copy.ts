'use client'

import { useI18n } from '@/lib/i18n'

/**
 * Shown on the public privacy page. Replace with a real inbox before sharing
 * the site — a policy with no reachable contact is not much of a policy.
 */
export const CONTACT_EMAIL = 'hello@example.com'

export const APP_URL = 'https://fea-planner.vercel.app'

const ar = {
  nav: { why: 'ليه', privacy: 'الخصوصية', open: 'افتح التطبيق', signIn: 'ابدأ مجانًا' },

  hero: {
    badge: 'مجاني · بدون إعلانات · بدون تتبّع',
    titleA: 'شهرك كله في',
    titleAccent: 'شاشة واحدة',
    sub: 'متتبّع للعادات والنوم والمهام والأهداف. دوسة واحدة على المربع، والنسبة بتتحسب لوحدها — على الموبايل واللابتوب بنفس الحساب.',
    ctaPrimary: 'ابدأ مجانًا',
    ctaSecondary: 'ليه التطبيق ده؟',
    trust: ['١٥ عادة × كل يوم في الشهر', 'عربي وإنجليزي', 'بياناتك ليك إنت بس'],
  },

  tools: {
    title: 'أربع أدوات، ملف واحد',
    sub: 'مش محتاج أربع تطبيقات. كله مترابط ببعضه.',
    items: [
      {
        name: 'متتبع العادات والنوم',
        desc: 'شبكة الشهر كله: ١٥ عادة في كل يوم، كل أسبوع بلون، ونسبة كل عادة بتتحسب لوحدها.',
        points: ['ساعات نومك كل يوم ومتوسط الشهر', 'أكتر ٥ عادات التزامًا', 'تقدمك أسبوع بأسبوع'],
      },
      {
        name: 'متتبع المهام',
        desc: 'أسبوع كامل قدامك، لحد ١٤ مهمة لليوم، ونسبة الإنجاز لكل يوم وللأسبوع كله.',
        points: ['كل يوم بلونه', 'اكتب وامسح بسرعة', 'إجمالي الأسبوع في سطر'],
      },
      {
        name: 'متتبع الأهداف',
        desc: 'ستة أهداف للسنة، كل هدف مقسّم لعشر خطوات عشان تبقى قابلة للتنفيذ.',
        points: ['٦ أهداف × ١٠ خطوات', 'نسبة لكل هدف', 'تنقل بين السنين'],
      },
      {
        name: 'الملخص السنوي',
        desc: 'الاتناشر شهر جنب بعض: المكتمل والمستهدف والنسبة ومتوسط النوم.',
        points: ['مقارنة شهر بشهر', 'إجمالي السنة', 'رسم بياني للتقدم'],
      },
    ],
  },

  how: {
    title: 'بتشتغل إزاي',
    steps: [
      { title: 'اكتب عاداتك مرة واحدة', desc: 'خمستاشر عادة بالعربي والإنجليزي، وتحدد هدف كل واحدة في الشهر. وتفضل معاك كل الشهور.' },
      { title: 'دوس على المربع كل يوم', desc: 'ثانية واحدة. التطبيق بيحسب النسب والمتوسطات والأسابيع من غير ما تعمل حاجة.' },
      { title: 'بصّ على الشهر كله', desc: 'تشوف الحلو من الوحش في نظرة واحدة، وتعرف أنهي عادة ماشية وأنهي محتاجة شغل.' },
    ],
  },

  built: {
    title: 'مبني كده من الأول',
    items: [
      { title: 'عربي وإنجليزي', desc: 'تبديل فوري بين اللغتين، والاتجاه بيتظبط لوحده. مش ترجمة مركّبة بعدين.' },
      { title: 'فاتح وداكن', desc: 'مظهرين متظبطين واحد واحد، والاختيار بيتحفظ على جهازك من غير وميض وقت الفتح.' },
      { title: 'بيتثبّت زي أي تطبيق', desc: 'ضيفه على شاشة موبايلك ويفتح من غير شريط المتصفح، ويشتغل على اللابتوب بنفس الرابط.' },
      { title: 'بياناتك معزولة', desc: 'كل صف في قاعدة البيانات مربوط بحسابك على مستوى قاعدة البيانات نفسها، مش بس في الكود.' },
    ],
  },

  cta: {
    title: 'ابدأ الشهر الجاي بشكل مختلف',
    sub: 'حساب مجاني بالإيميل. من غير باسورد ومن غير كارت.',
    button: 'ابدأ مجانًا',
    note: 'بندخّلك برابط على إيميلك.',
  },

  footer: { tagline: 'متتبّع العادات والنوم والمهام والأهداف.', rights: 'كل الحقوق محفوظة.' },

  why: {
    title: 'ليه فيه تطبيق تاني للعادات؟',
    lede: 'لإن معظم التطبيقات بتوريك النهاردة بس. والنهاردة لوحده مش بيقول حاجة.',
    sections: [
      { title: 'الشهر كله في نظرة', body: 'لما تشوف ٣١ يوم جنب بعض، بتلاحظ حاجات مستحيل تلاحظها من شاشة يومية: إن التمرين بيقع كل آخر أسبوع، أو إن قرايتك بتتحسن لما بتنام بدري. النمط ده مالوش مكان في قايمة مهام.' },
      { title: 'التأشير باليد مقصود', body: 'مفيش ربط بساعة ولا استيراد تلقائي. إنك تفتح وتدوس بنفسك هو نفسه المراجعة اليومية — ثانية واحدة بتخليك واعي بيومك بدل ما رقم يتحط من غيرك.' },
      { title: 'من غير ضغط ولا شارات', body: 'مفيش سلاسل بتتكسر وتخليك تسيب، ولا إشعارات بتزنّ. النسبة رقم محايد. اليوم اللي بيفوت بيفوت، وبكرة مربع فاضي جديد.' },
      { title: 'بالعربي من الأساس', body: 'الاتجاه والخطوط والأرقام كلها متظبطة للعربي من أول سطر، مش لغة اتضافت على تطبيق إنجليزي. وتقدر تقلب إنجليزي في أي لحظة.' },
      { title: 'بياناتك مش المنتج', body: 'مفيش إعلانات ولا أدوات تتبّع ولا بيع بيانات. اللي بتكتبه بيوصل لقاعدة بيانات مربوطة بحسابك إنت بس.' },
    ],
  },

  policy: {
    title: 'سياسة الخصوصية',
    updated: 'آخر تحديث',
    intro: 'دي صفحة بتقول بالظبط أي بيانات بتتخزن وفين وليه. من غير لف ودوران.',
    sections: [
      { title: 'اللي بنجمعه', body: ['إيميلك — عشان نسجّل دخولك بيه، ومفيش باسورد أصلًا.', 'اللي بتكتبه إنت: أسماء العادات، المربعات اللي بتدوس عليها، ساعات نومك، مهامك، وأهدافك.', 'وبس. مفيش اسم ولا رقم تليفون ولا مكان ولا بصمة جهاز.'] },
      { title: 'اللي مش بنعمله', body: ['مفيش أدوات تتبّع ولا تحليلات ولا بيكسلات إعلانية على الموقع.', 'مفيش إعلانات، ومفيش بيع أو مشاركة لبياناتك مع حد.', 'مش بنقرا بياناتك ولا بنستخدمها في تدريب أي حاجة.'] },
      { title: 'فين البيانات', body: ['قاعدة البيانات عند Supabase، والموقع شغال على Vercel.', 'كل صف مربوط بحسابك بسياسة أمان على مستوى الصف جوه قاعدة البيانات نفسها — يعني حتى لو فيه غلطة في الكود، حساب تاني مش هيشوف بياناتك.'] },
      { title: 'اللي بيتحفظ على جهازك', body: ['اختيار اللغة والمظهر بيتحفظوا محليًا على متصفحك، ومش بيوصلوا للسيرفر.', 'فيه service worker بيخزّن ملفات الواجهة عشان التطبيق يفتح بسرعة ويشتغل لما النت يقطع.'] },
      { title: 'حقوقك', body: ['تقدر تطلب نسخة من بياناتك أو تطلب مسحها بالكامل في أي وقت.', 'مسح الحساب بيمسح كل الصفوف المرتبطة بيه نهائيًا.'] },
      { title: 'التواصل', body: ['لأي سؤال عن خصوصيتك أو طلب مسح بياناتك، ابعتلنا على:'] },
    ],
  },

  e404: { title: 'الصفحة دي مش موجودة', body: 'يمكن الرابط اتغير، أو يمكن كتبته غلط. مفيش مشكلة.', home: 'الرجوع للرئيسية', app: 'افتح التطبيق' },
  e500: { title: 'حصل خطأ عندنا', body: 'الغلط ده من ناحيتنا مش من ناحيتك. جرّب تاني، ولو فضل موجود استنى شوية.', retry: 'جرّب تاني', home: 'الرجوع للرئيسية' },
} as const

const en = {
  nav: { why: 'Why', privacy: 'Privacy', open: 'Open app', signIn: 'Start free' },

  hero: {
    badge: 'Free · No ads · No tracking',
    titleA: 'Your whole month on',
    titleAccent: 'one screen',
    sub: 'A tracker for habits, sleep, tasks and goals. Tap the box, the percentages work themselves out — on your phone and your laptop, same account.',
    ctaPrimary: 'Start free',
    ctaSecondary: 'Why this exists',
    trust: ['15 habits × every day of the month', 'Arabic and English', 'Your data stays yours'],
  },

  tools: {
    title: 'Four tools, one file',
    sub: 'You do not need four apps. Everything connects.',
    items: [
      {
        name: 'Habits & sleep',
        desc: 'The whole month as a grid: 15 habits across every day, a colour per week, and a rate per habit that counts itself.',
        points: ['Sleep hours per night and a monthly average', 'Your five most consistent habits', 'Week-by-week progress'],
      },
      {
        name: 'Task tracker',
        desc: 'A full week at a glance, up to 14 tasks a day, with a completion rate per day and for the week.',
        points: ['A colour per day', 'Type and clear quickly', 'Week total in one line'],
      },
      {
        name: 'Goal tracker',
        desc: 'Six goals for the year, each broken into ten steps so they stay something you can actually do.',
        points: ['6 goals × 10 steps', 'A rate per goal', 'Move between years'],
      },
      {
        name: 'Yearly summary',
        desc: 'All twelve months side by side: completed, target, rate and average sleep.',
        points: ['Month against month', 'Year total', 'Progress chart'],
      },
    ],
  },

  how: {
    title: 'How it works',
    steps: [
      { title: 'Write your habits once', desc: 'Fifteen habits in Arabic and English, each with a monthly target. They carry across every month from then on.' },
      { title: 'Tap a box each day', desc: 'One second. Rates, averages and weekly bands are all worked out for you.' },
      { title: 'Look at the whole month', desc: 'See the good weeks and the bad ones at a glance, and which habit is drifting.' },
    ],
  },

  built: {
    title: 'Built this way from the start',
    items: [
      { title: 'Arabic and English', desc: 'Switch instantly; direction follows. Not a translation layer bolted on afterwards.' },
      { title: 'Light and dark', desc: 'Two themes tuned separately. Your choice is remembered per device, with no flash on load.' },
      { title: 'Installs like an app', desc: 'Add it to your home screen and it opens without browser chrome. Same URL on your laptop.' },
      { title: 'Your rows are sealed off', desc: 'Every row is tied to your account by a database policy, not just by application code.' },
    ],
  },

  cta: {
    title: 'Start next month differently',
    sub: 'A free account with your email. No password, no card.',
    button: 'Start free',
    note: 'We sign you in with a link sent to your inbox.',
  },

  footer: { tagline: 'Habit, sleep, task and goal tracker.', rights: 'All rights reserved.' },

  why: {
    title: 'Why another habit tracker?',
    lede: 'Because most of them only show you today. And today, on its own, tells you almost nothing.',
    sections: [
      { title: 'A month at a glance', body: 'Put 31 days next to each other and you notice things a daily screen can never show you: that the workout collapses in the last week of every month, or that your reading improves whenever you sleep early. That pattern has nowhere to live in a to-do list.' },
      { title: 'Ticking by hand is the point', body: 'No watch to pair, no automatic import. Opening the grid and tapping it yourself is the daily review — one second that keeps you honest about your day, instead of a number filled in for you.' },
      { title: 'No streaks, no badges', body: 'Nothing to break and guilt you into quitting, and no notifications nagging you. A percentage is a neutral number. A missed day is just a missed day, and tomorrow is a fresh empty box.' },
      { title: 'Arabic from the first line', body: 'Direction, type and numerals were set up for Arabic from the start, not retrofitted onto an English app. Switch to English whenever you want.' },
      { title: 'You are not the product', body: 'No ads, no trackers, no data sold. What you type goes to a database row bound to your account and nowhere else.' },
    ],
  },

  policy: {
    title: 'Privacy policy',
    updated: 'Last updated',
    intro: 'This page says exactly what is stored, where, and why. Nothing buried.',
    sections: [
      { title: 'What we collect', body: ['Your email address — it is how you sign in, and there is no password at all.', 'What you type: habit names, the boxes you tick, sleep hours, tasks and goals.', 'That is the lot. No name, no phone number, no location, no device fingerprinting.'] },
      { title: 'What we do not do', body: ['No trackers, no analytics, no advertising pixels anywhere on this site.', 'No ads, and your data is never sold or shared with anyone.', 'We do not read your entries or use them to train anything.'] },
      { title: 'Where it lives', body: ['The database is hosted by Supabase and the site runs on Vercel.', 'Every row is bound to your account by a row-level security policy inside the database itself — so even a bug in the application code cannot show your rows to another account.'] },
      { title: 'What stays on your device', body: ['Your language and theme choices are stored locally in your browser and never sent to the server.', 'A service worker caches interface files so the app opens quickly and survives a dropped connection.'] },
      { title: 'Your rights', body: ['You can ask for a copy of your data, or ask for all of it to be deleted, at any time.', 'Deleting your account permanently removes every row attached to it.'] },
      { title: 'Contact', body: ['For any question about your privacy, or to request deletion, write to:'] },
    ],
  },

  e404: { title: 'This page does not exist', body: 'The link may have changed, or there may be a typo. No harm done.', home: 'Back to home', app: 'Open the app' },
  e500: { title: 'Something broke on our side', body: 'That one is on us, not on you. Try again, and if it keeps happening give it a few minutes.', retry: 'Try again', home: 'Back to home' },
} as const

export const marketing = { ar, en }

export function useCopy() {
  const { locale, dir, t } = useI18n()
  return { c: marketing[locale] as typeof en, locale, dir, t }
}
