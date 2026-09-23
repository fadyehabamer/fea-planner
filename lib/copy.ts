'use client';

import { useI18n } from '@/lib/i18n';

/**
 * Shown on the public privacy page. Replace with a real inbox before sharing
 * the site — a policy with no reachable contact is not much of a policy.
 */
export const CONTACT_EMAIL = 'hello@example.com';

export const APP_URL = 'https://fea-planner.vercel.app';

const ar = {
  nav: { why: 'ليه', privacy: 'الخصوصية', open: 'افتح التطبيق', signIn: 'ابدأ مجانًا' },

  hero: {
    badge: 'مجاني للأبد · من غير كارت · عربي وإنجليزي',
    titleA: 'بطّل تبدأ',
    titleAccent: 'من الأول',
    titleB: 'كل أسبوع.',
    sub: 'دفتر بيحط عاداتك ونومك ومهامك وأهدافك في صفحة واحدة للشهر كله — فتشوف النمط قبل ما تزهق وتسيب. دوسة واحدة في اليوم، وبس.',
    ctaPrimary: 'ابدأ دفترك مجانًا',
    ctaSecondary: 'بيشتغل إزاي؟',
    micro: 'إيميلك بس. من غير باسورد. أقل من ١٠ ثواني.',
    proof: ['بدون إعلانات', 'بيشتغل من غير نت', 'موبايل ولابتوب', 'بياناتك ليك بس'],
  },

  demo: {
    label: 'جرّبه هنا',
    title: 'دوس على مربعات النهاردة',
    habits: ['قراية ٢٠ دقيقة', 'تمرين', 'لترين مية', 'نوم قبل ١٢', 'من غير موبايل في السرير'],
    days: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
    daysFull: ['الأحد', 'الاتنين', 'التلات', 'الأربع', 'الخميس', 'الجمعة', 'السبت'],
    today: 'النهاردة',
    week: 'الأسبوع ده',
    nudgeTitle: 'هي دي العادة كلها.',
    nudgeBody: 'دلوقتي تخيّل الشهر كله قدامك بالشكل ده. كمّل في دفترك إنت — مجانًا.',
    nudgeCta: 'اعمل دفتري',
    reset: 'ابدأ من جديد',
  },

  pain: {
    title: 'التطبيقات بتوريك النهاردة بس.',
    accent: 'والنهاردة بيكدب.',
    sub: 'يوم وحش واحد بيحسسك إنك فشلت، فبتسيب. لكن لما تشوف ٣١ يوم جنب بعض، بتلاقي إنك ماشي أحسن ما كنت فاكر — وبتعرف بالظبط إيه اللي بيوقعك.',
    beforeLabel: 'اللي بتستخدمه دلوقتي',
    afterLabel: 'دفتر',
    before: [
      'تطبيق عادات بيوريك النهاردة بس',
      'تطبيق مهام منفصل تمامًا',
      'دفتر أهداف بتفتحه مرة في السنة',
      'شيت إكسل بتصلّحه كل شهر',
    ],
    after: [
      'شهر كامل في شاشة واحدة',
      'مهام الأسبوع جنب عاداتك',
      'أهداف مقسّمة لخطوات بتتابعها',
      'كل الحسابات بتتعمل لوحدها',
    ],
  },

  how: {
    title: 'تلات خطوات. من غير وجع دماغ.',
    steps: [
      {
        title: 'اكتب عاداتك مرة واحدة',
        desc: 'لحد ١٥ عادة بالعربي أو الإنجليزي، وهدف لكل واحدة في الشهر. وبتفضل معاك كل الشهور.',
      },
      {
        title: 'دوس على المربع كل يوم',
        desc: 'ثانية واحدة. النسب والمتوسطات والأسابيع بتتحسب لوحدها.',
      },
      {
        title: 'شوف الشهر كله',
        desc: 'تعرف أنهي عادة ماشية وأنهي محتاجة شغل — في نظرة واحدة.',
      },
    ],
  },

  features: [
    {
      eyebrow: 'العادات والنوم',
      title: 'الشهر كله، مش النهاردة بس',
      body: 'شبكة واحدة فيها ١٥ عادة في كل يوم من أيام الشهر، وساعات نومك تحتها في نفس الشاشة — عشان تشوف العلاقة بين نومك وباقي يومك من غير ما تدوّر.',
      points: [
        'نسبة لكل عادة مقابل هدفها الشهري',
        'صف للنوم كل ليلة ومتوسط الشهر',
        'أكتر ٥ عادات التزامًا وتقدمك أسبوع بأسبوع',
      ],
    },
    {
      eyebrow: 'المهام',
      title: 'أسبوع تقدر تخطّطه فعلًا',
      body: 'سبع أعمدة قدامك، لحد ١٤ مهمة لليوم. كل يوم بنسبته، وفي الآخر سطر واحد بيقولك عملت كام من كام.',
      points: ['نسبة إنجاز لكل يوم', 'إجمالي الأسبوع في سطر', 'إضافة ومسح سريع من غير نوافذ'],
    },
    {
      eyebrow: 'الأهداف والسنة',
      title: 'أهداف مقسّمة، وسنة تقدر تقارنها',
      body: 'ستة أهداف للسنة، كل واحد مقسوم لعشر خطوات — لإن «أتعلم لغة» مش مهمة، دي عشر مهام. والملخص السنوي بيحط الاتناشر شهر جنب بعض.',
      points: [
        '٦ أهداف × ١٠ خطوات لكل سنة',
        'الاتناشر شهر: المكتمل والمستهدف والنسبة',
        'متوسط النوم لكل شهر ورسم بياني للسنة',
      ],
    },
  ],

  pricing: {
    title: 'مجاني.',
    accent: 'مش «تجربة مجانية».',
    sub: 'مفيش خطط ولا ترقيات ولا حاجة مقفولة ورا دفع.',
    price: '٠',
    period: 'للأبد',
    includes: [
      'الأربع أدوات كاملة من غير قيود',
      'مزامنة بين الموبايل واللابتوب',
      'عربي وإنجليزي، فاتح وداكن',
      'بيتثبّت على شاشة الموبايل',
      'بدون إعلانات وبدون تتبّع',
      'بياناتك معزولة على مستوى قاعدة البيانات',
    ],
    cta: 'ابدأ دلوقتي',
  },

  faq: {
    title: 'أسئلة بتتسأل',
    items: [
      {
        q: 'مجاني بجد؟',
        a: 'أيوه. مفيش نسخة مدفوعة ولا تجربة مجانية ولا كارت. المشروع شغال على باقات مجانية تكفي الاستخدام الشخصي براحة.',
      },
      {
        q: 'محتاج أنزّل حاجة؟',
        a: 'لأ. بيشتغل في المتصفح على أي جهاز. ولو حبيت، ضيفه على شاشة موبايلك من قايمة المشاركة وهيفتح زي أي تطبيق.',
      },
      {
        q: 'لو فاتني يوم؟',
        a: 'مفيش حاجة بتتكسر. مفيش سلاسل ولا إشعارات بتزنّ. اليوم اللي فات بيفضل مربع فاضي، والنسبة رقم محايد من غير ما يحسّسك بذنب.',
      },
      {
        q: 'مين يقدر يشوف بياناتي؟',
        a: 'إنت بس. كل صف مربوط بحسابك بسياسة أمان جوه قاعدة البيانات نفسها — حتى لو فيه غلطة في الكود، حساب تاني مش هيقدر يقرا بياناتك.',
      },
      {
        q: 'أقدر أغيّر العادات؟',
        a: 'أيوه، من الإعدادات. اكتبهم بالعربي والإنجليزي وحدد هدف كل واحدة، واقفل أي عادة مش محتاجها.',
      },
    ],
  },

  cta: {
    title: 'الشهر الجاي بيبدأ',
    accent: 'بدوسة واحدة.',
    sub: 'اعمل دفترك في أقل من ١٠ ثواني. إيميلك بس — من غير باسورد ومن غير كارت.',
    button: 'ابدأ دفترك مجانًا',
    note: 'بنبعتلك رابط دخول على إيميلك.',
  },

  sticky: 'ابدأ مجانًا',

  kinetic: {
    marquee: ['العادات', 'النوم', 'المهام', 'الأهداف', 'السنة'],
  },

  footer: { tagline: 'دوسة واحدة في اليوم، وشهرك كله في صفحة.', rights: 'كل الحقوق محفوظة.' },

  why: {
    title: 'ليه فيه تطبيق تاني للعادات؟',
    lede: 'لإن معظم التطبيقات بتوريك النهاردة بس. والنهاردة لوحده مش بيقول حاجة.',
    sections: [
      {
        title: 'الشهر كله في نظرة',
        body: 'لما تشوف ٣١ يوم جنب بعض، بتلاحظ حاجات مستحيل تلاحظها من شاشة يومية: إن التمرين بيقع كل آخر أسبوع، أو إن قرايتك بتتحسن لما بتنام بدري. النمط ده مالوش مكان في قايمة مهام.',
      },
      {
        title: 'التأشير باليد مقصود',
        body: 'مفيش ربط بساعة ولا استيراد تلقائي. إنك تفتح وتدوس بنفسك هو نفسه المراجعة اليومية — ثانية واحدة بتخليك واعي بيومك بدل ما رقم يتحط من غيرك.',
      },
      {
        title: 'من غير ضغط ولا شارات',
        body: 'مفيش سلاسل بتتكسر وتخليك تسيب، ولا إشعارات بتزنّ. النسبة رقم محايد. اليوم اللي بيفوت بيفوت، وبكرة مربع فاضي جديد.',
      },
      {
        title: 'بالعربي من الأساس',
        body: 'الاتجاه والخطوط والأرقام كلها متظبطة للعربي من أول سطر، مش لغة اتضافت على تطبيق إنجليزي. وتقدر تقلب إنجليزي في أي لحظة.',
      },
      {
        title: 'بياناتك مش المنتج',
        body: 'مفيش إعلانات ولا أدوات تتبّع ولا بيع بيانات. اللي بتكتبه بيوصل لقاعدة بيانات مربوطة بحسابك إنت بس.',
      },
    ],
  },

  policy: {
    title: 'سياسة الخصوصية',
    updated: 'آخر تحديث',
    intro: 'دي صفحة بتقول بالظبط أي بيانات بتتخزن وفين وليه. من غير لف ودوران.',
    sections: [
      {
        title: 'اللي بنجمعه',
        body: [
          'إيميلك — عشان نسجّل دخولك بيه، ومفيش باسورد أصلًا.',
          'اللي بتكتبه إنت: أسماء العادات، المربعات اللي بتدوس عليها، ساعات نومك، مهامك، وأهدافك.',
          'وبس. مفيش اسم ولا رقم تليفون ولا مكان ولا بصمة جهاز.',
        ],
      },
      {
        title: 'اللي مش بنعمله',
        body: [
          'مفيش أدوات تتبّع ولا تحليلات ولا بيكسلات إعلانية على الموقع.',
          'مفيش إعلانات، ومفيش بيع أو مشاركة لبياناتك مع حد.',
          'مش بنقرا بياناتك ولا بنستخدمها في تدريب أي حاجة.',
        ],
      },
      {
        title: 'فين البيانات',
        body: [
          'قاعدة البيانات عند Supabase، والموقع شغال على Vercel.',
          'كل صف مربوط بحسابك بسياسة أمان على مستوى الصف جوه قاعدة البيانات نفسها — يعني حتى لو فيه غلطة في الكود، حساب تاني مش هيشوف بياناتك.',
        ],
      },
      {
        title: 'اللي بيتحفظ على جهازك',
        body: [
          'اختيار اللغة والمظهر بيتحفظوا محليًا على متصفحك، ومش بيوصلوا للسيرفر.',
          'فيه service worker بيخزّن ملفات الواجهة عشان التطبيق يفتح بسرعة ويشتغل لما النت يقطع.',
        ],
      },
      {
        title: 'حقوقك',
        body: [
          'تقدر تطلب نسخة من بياناتك أو تطلب مسحها بالكامل في أي وقت.',
          'مسح الحساب بيمسح كل الصفوف المرتبطة بيه نهائيًا.',
        ],
      },
      { title: 'التواصل', body: ['لأي سؤال عن خصوصيتك أو طلب مسح بياناتك، ابعتلنا على:'] },
    ],
  },

  e404: {
    title: 'الصفحة دي مش موجودة',
    body: 'يمكن الرابط اتغير، أو يمكن كتبته غلط. مفيش مشكلة.',
    home: 'الرجوع للرئيسية',
    app: 'افتح التطبيق',
  },
  e500: {
    title: 'حصل خطأ عندنا',
    body: 'الغلط ده من ناحيتنا مش من ناحيتك. جرّب تاني، ولو فضل موجود استنى شوية.',
    retry: 'جرّب تاني',
    home: 'الرجوع للرئيسية',
  },
} as const;

const en = {
  nav: { why: 'Why', privacy: 'Privacy', open: 'Open app', signIn: 'Start free' },

  hero: {
    badge: 'Free forever · No card · Arabic & English',
    titleA: 'Stop',
    titleAccent: 'starting over',
    titleB: 'every Monday.',
    sub: 'Daftar puts your habits, sleep, tasks and goals on one page for the whole month — so you see the pattern before you give up. One tap a day. That is it.',
    ctaPrimary: 'Start your Daftar free',
    ctaSecondary: 'How it works',
    micro: 'Just your email. No password. Under 10 seconds.',
    proof: ['No ads', 'Works offline', 'Phone + laptop', 'Your data stays yours'],
  },

  demo: {
    label: 'Try it right here',
    title: "Tap today's boxes",
    habits: ['Read 20 min', 'Workout', 'Drink 2L water', 'Asleep by 12', 'No phone in bed'],
    days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    daysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    today: 'Today',
    week: 'This week',
    nudgeTitle: 'That is the whole habit.',
    nudgeBody: 'Now picture your whole month like this. Keep going in your own Daftar — free.',
    nudgeCta: 'Make my Daftar',
    reset: 'Start over',
  },

  pain: {
    title: 'Habit apps show you today.',
    accent: 'Today lies.',
    sub: 'One bad day feels like failing, so you quit. Put 31 days side by side and you find you are doing better than you thought — and exactly what keeps tripping you up.',
    beforeLabel: 'What you use now',
    afterLabel: 'Daftar',
    before: [
      'A habit app that only shows today',
      'A separate to-do app',
      'A goals notebook you open once a year',
      'A spreadsheet you repair every month',
    ],
    after: [
      'A whole month on one screen',
      "This week's tasks next to your habits",
      'Goals split into steps you actually track',
      'Every calculation done for you',
    ],
  },

  how: {
    title: 'Three steps. Zero setup pain.',
    steps: [
      {
        title: 'Write your habits once',
        desc: 'Up to 15 habits in Arabic or English, each with a monthly target. They carry across every month.',
      },
      {
        title: 'Tap a box each day',
        desc: 'One second. Rates, averages and weekly progress work themselves out.',
      },
      {
        title: 'See the whole month',
        desc: 'Which habit is holding and which one is drifting — at a single glance.',
      },
    ],
  },

  features: [
    {
      eyebrow: 'Habits & sleep',
      title: 'The month, not just today',
      body: 'One grid holds 15 habits across every day of the month, with your sleep hours right underneath — so the link between how you slept and how the day went is right there.',
      points: [
        'A rate per habit against its monthly target',
        'A sleep row per night and a monthly average',
        'Your five most consistent habits, week by week',
      ],
    },
    {
      eyebrow: 'Tasks',
      title: 'A week you can actually plan',
      body: 'Seven columns, up to 14 tasks a day. Each day gets a completion rate, and one line at the bottom tells you how much of the week you finished.',
      points: [
        'A completion rate per day',
        'Week total in a single line',
        'Add and clear quickly, no dialogs',
      ],
    },
    {
      eyebrow: 'Goals & the year',
      title: 'Goals broken down, years you can compare',
      body: 'Six goals a year, each split into ten steps — because "learn a language" is not a task, it is ten of them. The yearly view puts all twelve months side by side.',
      points: [
        '6 goals × 10 steps per year',
        'Twelve months: completed, target and rate',
        'Average sleep per month, and a chart for the year',
      ],
    },
  ],

  pricing: {
    title: 'Free.',
    accent: 'Not "free trial" free.',
    sub: 'No plans, no upgrades, nothing held behind a paywall.',
    price: '$0',
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
  },

  faq: {
    title: 'Questions people ask',
    items: [
      {
        q: 'Is it really free?',
        a: 'Yes. There is no paid tier, no trial and no card. It runs on free tiers that comfortably cover personal use.',
      },
      {
        q: 'Do I need to install anything?',
        a: 'No. It runs in the browser on any device. If you like, add it to your home screen from the share menu and it opens like any other app.',
      },
      {
        q: 'What if I miss a day?',
        a: 'Nothing breaks. No streaks, no nagging notifications. A missed day stays an empty box, and the percentage is a neutral number — no guilt trip.',
      },
      {
        q: 'Who can see my data?',
        a: 'Only you. Every row is tied to your account by a security policy inside the database itself — even a bug in the app cannot show your rows to another account.',
      },
      {
        q: 'Can I change the habits?',
        a: 'Yes, from settings. Write them in Arabic and English, set a monthly target for each, and switch off any you do not need.',
      },
    ],
  },

  cta: {
    title: 'Next month starts',
    accent: 'with one tap.',
    sub: 'Set up your Daftar in under 10 seconds. Just your email — no password, no card.',
    button: 'Start your Daftar free',
    note: 'We sign you in with a link sent to your inbox.',
  },

  sticky: 'Start free',

  kinetic: {
    marquee: ['Habits', 'Sleep', 'Tasks', 'Goals', 'The year'],
  },

  footer: { tagline: 'One tap a day. Your whole month on one page.', rights: 'All rights reserved.' },

  why: {
    title: 'Why another habit tracker?',
    lede: 'Because most of them only show you today. And today, on its own, tells you almost nothing.',
    sections: [
      {
        title: 'A month at a glance',
        body: 'Put 31 days next to each other and you notice things a daily screen can never show you: that the workout collapses in the last week of every month, or that your reading improves whenever you sleep early. That pattern has nowhere to live in a to-do list.',
      },
      {
        title: 'Ticking by hand is the point',
        body: 'No watch to pair, no automatic import. Opening the grid and tapping it yourself is the daily review — one second that keeps you honest about your day, instead of a number filled in for you.',
      },
      {
        title: 'No streaks, no badges',
        body: 'Nothing to break and guilt you into quitting, and no notifications nagging you. A percentage is a neutral number. A missed day is just a missed day, and tomorrow is a fresh empty box.',
      },
      {
        title: 'Arabic from the first line',
        body: 'Direction, type and numerals were set up for Arabic from the start, not retrofitted onto an English app. Switch to English whenever you want.',
      },
      {
        title: 'You are not the product',
        body: 'No ads, no trackers, no data sold. What you type goes to a database row bound to your account and nowhere else.',
      },
    ],
  },

  policy: {
    title: 'Privacy policy',
    updated: 'Last updated',
    intro: 'This page says exactly what is stored, where, and why. Nothing buried.',
    sections: [
      {
        title: 'What we collect',
        body: [
          'Your email address — it is how you sign in, and there is no password at all.',
          'What you type: habit names, the boxes you tick, sleep hours, tasks and goals.',
          'That is the lot. No name, no phone number, no location, no device fingerprinting.',
        ],
      },
      {
        title: 'What we do not do',
        body: [
          'No trackers, no analytics, no advertising pixels anywhere on this site.',
          'No ads, and your data is never sold or shared with anyone.',
          'We do not read your entries or use them to train anything.',
        ],
      },
      {
        title: 'Where it lives',
        body: [
          'The database is hosted by Supabase and the site runs on Vercel.',
          'Every row is bound to your account by a row-level security policy inside the database itself — so even a bug in the application code cannot show your rows to another account.',
        ],
      },
      {
        title: 'What stays on your device',
        body: [
          'Your language and theme choices are stored locally in your browser and never sent to the server.',
          'A service worker caches interface files so the app opens quickly and survives a dropped connection.',
        ],
      },
      {
        title: 'Your rights',
        body: [
          'You can ask for a copy of your data, or ask for all of it to be deleted, at any time.',
          'Deleting your account permanently removes every row attached to it.',
        ],
      },
      {
        title: 'Contact',
        body: ['For any question about your privacy, or to request deletion, write to:'],
      },
    ],
  },

  e404: {
    title: 'This page does not exist',
    body: 'The link may have changed, or there may be a typo. No harm done.',
    home: 'Back to home',
    app: 'Open the app',
  },
  e500: {
    title: 'Something broke on our side',
    body: 'That one is on us, not on you. Try again, and if it keeps happening give it a few minutes.',
    retry: 'Try again',
    home: 'Back to home',
  },
} as const;

export const marketing = { ar, en };

export function useCopy() {
  const { locale, dir, t } = useI18n();
  return { c: marketing[locale] as typeof en, locale, dir, t };
}
