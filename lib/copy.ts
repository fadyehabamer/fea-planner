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


  stats: [
    { value: '465', label: 'نقطة بيانات في الشهر' },
    { value: '4', label: 'أدوات في ملف واحد' },
    { value: '2', label: 'لغة بالكامل' },
    { value: '0', label: 'جنيه، للأبد' },
  ],

  features: [
    {
      eyebrow: 'العادات والنوم',
      title: 'الشهر كله، مش النهاردة بس',
      body: 'شبكة واحدة فيها ١٥ عادة في كل يوم من أيام الشهر. كل أسبوع بلون، وكل عادة ليها نسبتها، وساعات نومك تحت في نفس الشاشة — عشان تشوف العلاقة بين نومك وباقي يومك من غير ما تدوّر.',
      points: ['نسبة لكل عادة مقابل هدفها الشهري', 'صف للنوم كل ليلة ومتوسط الشهر', 'أكتر ٥ عادات التزامًا وتقدمك أسبوع بأسبوع'],
    },
    {
      eyebrow: 'المهام',
      title: 'أسبوع تقدر تخطّطه فعلًا',
      body: 'سبع أعمدة قدامك، لحد ١٤ مهمة لليوم. كل يوم بلونه ونسبته، وفي الآخر سطر واحد بيقولك عملت كام من كام في الأسبوع كله.',
      points: ['نسبة إنجاز لكل يوم', 'إجمالي الأسبوع في سطر', 'إضافة ومسح سريع من غير نوافذ'],
    },
    {
      eyebrow: 'الأهداف والسنة',
      title: 'أهداف مقسّمة، وسنة تقدر تقارنها',
      body: 'ستة أهداف للسنة، كل واحد مقسوم لعشر خطوات — لإن «أتعلم لغة» مش مهمة، دي عشر مهام. والملخص السنوي بيحط الاتناشر شهر جنب بعض عشان تشوف فين اتحسنت وفين وقعت.',
      points: ['٦ أهداف × ١٠ خطوات لكل سنة', 'الاتناشر شهر: المكتمل والمستهدف والنسبة', 'متوسط النوم لكل شهر ورسم بياني للسنة'],
    },
  ],

  compare: {
    title: 'بدل أربع تطبيقات',
    sub: 'كل حاجة من دول بتعيش في مكان لوحدها. هنا بيعيشوا في ملف واحد.',
    beforeLabel: 'اللي بتستخدمه دلوقتي',
    afterLabel: 'fea-planner',
    before: ['تطبيق عادات بيوريك النهاردة بس', 'تطبيق مهام منفصل تمامًا', 'دفتر أهداف بتفتحه مرة في السنة', 'شيت إكسل بتصلّحه كل شهر'],
    after: ['شهر كامل في شاشة واحدة', 'مهام الأسبوع جنب عاداتك', 'أهداف مقسّمة لخطوات بتتابعها', 'كل الحسابات بتتعمل لوحدها'],
  },

  pricing: {
    title: 'التسعير',
    sub: 'مفيش خطط ولا ترقيات ولا حاجة مقفولة.',
    plan: 'مجاني',
    price: '0',
    currency: 'ج.م',
    period: 'للأبد',
    includes: [
      'الأربع أدوات كاملة من غير أي قيود',
      'مزامنة بين الموبايل واللابتوب',
      'عربي وإنجليزي، فاتح وداكن',
      'تثبيت على شاشة الموبايل',
      'بدون إعلانات وبدون تتبّع',
      'بياناتك معزولة على مستوى قاعدة البيانات',
    ],
    cta: 'ابدأ دلوقتي',
    note: 'ده مشروع شخصي شغال على الباقات المجانية. مفيش نية نحطّ حاجة ورا دفع، ولو ده اتغير يومًا هتعرف قبلها.',
  },

  faq: {
    title: 'أسئلة بتتسأل',
    items: [
      { q: 'مجاني بجد؟', a: 'أيوه. مفيش نسخة مدفوعة ولا تجربة مجانية ولا كارت. المشروع شغال على الباقة المجانية في Vercel و Supabase، وده كفاية للاستخدام الشخصي.' },
      { q: 'محتاج أنزّل حاجة؟', a: 'لأ. بيشتغل في المتصفح على أي جهاز. ولو حبيت، تقدر تضيفه على شاشة موبايلك من قايمة المشاركة وهيفتح من غير شريط المتصفح زي أي تطبيق.' },
      { q: 'أقدر أستخدمه بالعربي؟', a: 'التطبيق كله بالعربي والإنجليزي، والاتجاه بيتظبط لوحده. تقدر تقلب بين اللغتين في أي وقت من زرار في الأعلى، والاختيار بيتحفظ على جهازك.' },
      { q: 'مين يقدر يشوف بياناتي؟', a: 'إنت بس. كل صف في قاعدة البيانات مربوط بحسابك بسياسة أمان جوه قاعدة البيانات نفسها، مش في الكود — يعني حتى لو فيه غلطة برمجية، حساب تاني مش هيقدر يقرا بياناتك.' },
      { q: 'لو فاتني يوم؟', a: 'مفيش حاجة بتتكسر. مفيش سلاسل ولا إشعارات ولا شارات. اليوم اللي فات بيفضل مربع فاضي، والنسبة رقم محايد بيقولك المعلومة من غير ما يحسّسك بذنب.' },
      { q: 'أقدر أغيّر الـ١٥ عادة؟', a: 'أيوه، من صفحة الإعدادات. تكتبهم بالعربي والإنجليزي وتحدد هدف كل واحدة في الشهر، وتقدر تقفل أي عادة مش محتاجها. وبيفضلوا معاك في كل الشهور.' },
    ],
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


  stats: [
    { value: '465', label: 'data points a month' },
    { value: '4', label: 'trackers in one file' },
    { value: '2', label: 'languages, fully' },
    { value: '0', label: 'cost, forever' },
  ],

  features: [
    {
      eyebrow: 'Habits & sleep',
      title: 'The month, not just today',
      body: 'One grid holds 15 habits across every day of the month. A colour per week, a rate per habit, and your sleep hours on the same screen — so the link between how you slept and how the rest of the day went is right there, not buried in another app.',
      points: ['A rate per habit against its monthly target', 'A sleep row per night and a monthly average', 'Your five most consistent habits, and week-by-week progress'],
    },
    {
      eyebrow: 'Tasks',
      title: 'A week you can actually plan',
      body: 'Seven columns in front of you, up to 14 tasks a day. Each day gets a colour and a completion rate, and one line at the bottom tells you how much of the week you actually finished.',
      points: ['A completion rate per day', 'Week total in a single line', 'Add and clear quickly, no dialogs'],
    },
    {
      eyebrow: 'Goals & the year',
      title: 'Goals broken down, years you can compare',
      body: 'Six goals a year, each split into ten steps — because "learn a language" is not a task, it is ten of them. The yearly summary then puts all twelve months side by side, so you can see where you improved and where you slipped.',
      points: ['6 goals × 10 steps per year', 'Twelve months: completed, target and rate', 'Average sleep per month, and a chart for the year'],
    },
  ],

  compare: {
    title: 'Instead of four apps',
    sub: 'Each of these normally lives somewhere else. Here they live in one file.',
    beforeLabel: 'What you use now',
    afterLabel: 'fea-planner',
    before: ['A habit app that only shows today', 'A separate to-do app', 'A goals notebook you open once a year', 'A spreadsheet you repair every month'],
    after: ['A whole month on one screen', 'This week\'s tasks next to your habits', 'Goals split into steps you actually track', 'Every calculation done for you'],
  },

  pricing: {
    title: 'Pricing',
    sub: 'No plans, no upgrades, nothing held back.',
    plan: 'Free',
    price: '0',
    currency: '$',
    period: 'forever',
    includes: [
      'All four trackers, no limits',
      'Synced between phone and laptop',
      'Arabic and English, light and dark',
      'Installs to your home screen',
      'No ads and no tracking',
      'Your rows sealed off at the database level',
    ],
    cta: 'Start now',
    note: 'This is a personal project running on free tiers. There is no plan to put anything behind a paywall, and if that ever changed you would hear about it first.',
  },

  faq: {
    title: 'Questions people ask',
    items: [
      { q: 'Is it really free?', a: 'Yes. There is no paid tier, no trial and no card. It runs on the Vercel and Supabase free tiers, which comfortably covers personal use.' },
      { q: 'Do I need to install anything?', a: 'No. It runs in the browser on any device. If you want, add it to your home screen from the share menu and it opens without browser chrome, like any other app.' },
      { q: 'Can I use it in Arabic?', a: 'The whole app is in Arabic and English, and the layout direction follows. Switch between them any time from the header; your choice is remembered on that device.' },
      { q: 'Who can see my data?', a: 'Only you. Every row is tied to your account by a security policy inside the database itself, not in application code — so even a bug in the app cannot show your rows to another account.' },
      { q: 'What if I miss a day?', a: 'Nothing breaks. There are no streaks, no notifications and no badges. A missed day stays an empty box, and the percentage is a neutral number that tells you the fact without making you feel bad about it.' },
      { q: 'Can I change the 15 habits?', a: 'Yes, from the settings page. Write them in Arabic and English, set a monthly target for each, and switch off any you do not need. They then carry across every month.' },
    ],
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
