# Daftar · دفتر

A bilingual (العربية / English) habit, sleep, task and goal planner, in dark or
light. One app, synced across your phone and your laptop.

**Live:** https://fea-planner.vercel.app

## Pages

| Page | What it does |
|---|---|
| `/` | Public landing page. |
| `/why` | The reasoning behind the product. |
| `/policy` | Privacy policy. |
| `404` / `500` | [`app/not-found.tsx`](app/not-found.tsx), [`app/error.tsx`](app/error.tsx) and [`app/global-error.tsx`](app/global-error.tsx). |
| `/habits` | The monthly grid — 15 habits × every day of the month, coloured by week, with per-habit %, a daily completion row, and nightly sleep hours. |
| `/tasks` | Weekly task tracker — 7 days, up to 14 tasks each, % per day and per week. |
| `/goals` | 6 goals per year, each broken into 10 steps. |
| `/year` | All 12 months side by side: completed vs. target, % and average sleep. |
| `/settings` | Rename the 15 habits (Arabic + English), set monthly targets, switch language. |

Language (ع / EN) and theme (sun / moon) toggle from the header on every page,
including the sign-in screen. Both persist per device and follow along in a
second open tab. Dark is the default; an inline script in the document head
applies the saved theme before first paint, so light-theme users get no dark flash.

## Using it on your devices

- **iPhone / iPad** — open the live URL in Safari → Share → *Add to Home Screen*.
- **Android** — open in Chrome → menu → *Install app*.
- **Laptop** — just the URL, or Chrome's install button in the address bar.

Sign-in is a magic link by email, so there is no password to carry between devices.

## One-time setup step

Magic links only redirect to URLs Supabase has been told to trust. In the
Supabase dashboard → **Authentication → URL Configuration**:

- **Site URL**: `https://fea-planner.vercel.app`
- **Redirect URLs**: add `https://fea-planner.vercel.app/**` and `http://localhost:3000/**`

https://supabase.com/dashboard/project/gyrzsuvniyiafipmdrjt/auth/url-configuration

Without this, the link in the email lands on the wrong host and sign-in fails.

## Local development

```bash
pnpm install
pnpm env:pull     # pulls credentials from Vercel into .env.local
pnpm dev
```

## Database

The whole schema lives in [`supabase/schema.sql`](supabase/schema.sql) — tables,
row level security, the sign-up seed trigger and the yearly roll-up function.
It is written to be safely re-runnable:

```bash
pnpm db:migrate
```

Every table is guarded by a row level security policy scoped to `auth.uid()`,
so the database can hold many accounts and each one only ever reads its own rows.
New accounts are seeded with the 15 default habits and 6 empty goals by the
`on_auth_user_created` trigger.

## Before sharing the landing page

[`lib/copy.ts`](lib/copy.ts) exports `CONTACT_EMAIL`, which is currently the
placeholder `hello@example.com` and is printed on the public privacy page.
Replace it with a real inbox — a policy with no reachable contact is not much
of a policy. All landing, why, policy and error copy lives in that one file,
Arabic and English side by side.

## Theming

Colours are CSS custom properties defined twice in
[`app/globals.css`](app/globals.css): once on `:root` for dark, once on
`:root[data-theme="light"]`. Nothing in the components hardcodes a colour, so a
new theme is a third block of variables and nothing else.

Four tokens carry the weight: `--card` (raised surfaces), `--field` (recessed
inputs and unticked boxes), `--row-alt` (table striping) and `--line` (borders).

Brand and data colours are kept apart on purpose. `--brand` / `--brand-solid` /
`--brand-ink` (amber) and `--accent` (emerald) are identity: logo, primary
buttons, active nav, focus rings, and everything on the marketing pages.
`--w1`…`--w5` are data — the five week bands in the monthly grid — and still
span the full wheel, including blue and violet, because five bands have to stay
telling apart at a glance. Light mode uses amber-700 rather than amber-600 for
`--brand`, which is what gets button labels over 4.5:1 on white.

## Capacity

Open sign-up is on: anyone with the link can create an account, and each one is
sealed off by row level security. The practical ceiling is Supabase's free 500 MB
database. A heavy user — 15 habits ticked daily, sleep logged, a handful of tasks
a day — writes roughly 1.5 MB per year including indexes, so the free tier holds
on the order of a few hundred user-years. Supabase's free auth allowance
(50,000 monthly active users) is nowhere near binding by comparison.

To keep it private, turn off sign-ups in the Supabase dashboard under
**Authentication → Sign In / Providers → Allow new users to sign up** once your
own account exists.

## Stack and cost

Next.js 16 (App Router) · Tailwind CSS 4 · Supabase (Postgres + auth) · Vercel.

Both free tiers cover personal use, so running this costs nothing. Note that
Vercel's Hobby plan is for non-commercial use — selling this planner would need
a Pro plan. Supabase pauses a free project after a week with no traffic; opening
the app wakes it again.

## License

The code is released under the [MIT License](LICENSE).

## Third-party content

- **Thmanyah Sans** (`app/fonts/thmanyah/`) — the Arabic typeface by
  [Thmanyah](https://thmanyah.com). It is not covered by this repository's MIT
  license and stays under its own license terms.
- **Supabase agent skill** (`.agents/skills/supabase/`) — vendored from
  [supabase/agent-skills](https://github.com/supabase/agent-skills) (see
  `skills-lock.json`). It stays under that project's own license terms.
