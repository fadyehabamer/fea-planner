-- ============================================================
-- Planner — schema + row level security
-- Run this once in the Supabase SQL editor.
-- Every table is scoped to auth.uid(), so one database safely
-- holds many users and each only ever sees their own rows.
-- ============================================================

-- ---------- profiles ----------
create table if not exists public.profiles (
  user_id      uuid primary key references auth.users on delete cascade,
  display_name text,
  locale       text not null default 'ar' check (locale in ('ar','en')),
  sleep_target numeric(3,1) not null default 8,
  created_at   timestamptz not null default now()
);

-- ---------- habits (the 15 rows down the left of the grid) ----------
create table if not exists public.habits (
  id       uuid primary key default gen_random_uuid(),
  user_id  uuid not null default auth.uid() references auth.users on delete cascade,
  position int  not null,
  name_ar  text not null default '',
  name_en  text not null default '',
  target   int  not null default 30,
  active   boolean not null default true,
  unique (user_id, position)
);

-- ---------- habit_logs (one row per ticked cell) ----------
create table if not exists public.habit_logs (
  user_id  uuid not null default auth.uid() references auth.users on delete cascade,
  habit_id uuid not null references public.habits on delete cascade,
  day      date not null,
  primary key (habit_id, day)
);
create index if not exists habit_logs_user_day_idx on public.habit_logs (user_id, day);

-- ---------- sleep_logs ----------
create table if not exists public.sleep_logs (
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  day     date not null,
  hours   numeric(3,1) not null check (hours >= 0 and hours <= 24),
  primary key (user_id, day)
);

-- ---------- tasks (weekly tracker, up to 14 per day) ----------
create table if not exists public.tasks (
  id       uuid primary key default gen_random_uuid(),
  user_id  uuid not null default auth.uid() references auth.users on delete cascade,
  day      date not null,
  position int  not null,
  title    text not null default '',
  done     boolean not null default false,
  unique (user_id, day, position)
);
create index if not exists tasks_user_day_idx on public.tasks (user_id, day);

-- ---------- goals + steps (6 goals x 10 steps) ----------
create table if not exists public.goals (
  id       uuid primary key default gen_random_uuid(),
  user_id  uuid not null default auth.uid() references auth.users on delete cascade,
  year     int  not null,
  position int  not null,
  title    text not null default '',
  unique (user_id, year, position)
);

create table if not exists public.goal_steps (
  id       uuid primary key default gen_random_uuid(),
  user_id  uuid not null default auth.uid() references auth.users on delete cascade,
  goal_id  uuid not null references public.goals on delete cascade,
  position int  not null,
  title    text not null default '',
  done     boolean not null default false,
  unique (goal_id, position)
);
create index if not exists goal_steps_goal_idx on public.goal_steps (goal_id);

-- ============================================================
-- Row Level Security — each user is sealed into their own rows
-- ============================================================
alter table public.profiles   enable row level security;
alter table public.habits     enable row level security;
alter table public.habit_logs enable row level security;
alter table public.sleep_logs enable row level security;
alter table public.tasks      enable row level security;
alter table public.goals      enable row level security;
alter table public.goal_steps enable row level security;

do $$
declare t text;
begin
  foreach t in array array['profiles','habits','habit_logs','sleep_logs','tasks','goals','goal_steps']
  loop
    execute format('drop policy if exists %I on public.%I', t || '_owner', t);
    execute format(
      'create policy %I on public.%I for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid())',
      t || '_owner', t
    );
  end loop;
end $$;

-- ============================================================
-- Seed a new account with 15 habits and 6 goals on sign-up,
-- so the grid is never an empty page on first open.
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  seed text[][] := array[
    ['أصحى قبل 7 الصبح',          'Wake up before 7am'],
    ['تمرين الصبح (30 دقيقة)',     'Morning workout (30 min)'],
    ['أقرا 20 صفحة',              'Read 20 pages'],
    ['أشرب 2 لتر مية',            'Drink 2L of water'],
    ['جلسة شغل عميق (90 دقيقة)',  'Deep work session (90 min)'],
    ['مفيش موبايل أول ساعة',      'No phone for the first hour'],
    ['أخطط لبكرة',                'Plan tomorrow'],
    ['أمشي 8000 خطوة',            'Walk 8,000 steps'],
    ['فطار صحي',                  'Healthy breakfast'],
    ['أتعلم حاجة جديدة',          'Learn something new'],
    ['أكتب يوميات',               'Journal'],
    ['مفيش سوشيال قبل الضهر',     'No social media before noon'],
    ['تمارين إطالة',              'Stretching'],
    ['أنام قبل 12',               'Sleep before midnight'],
    ['أراجع أهدافي',              'Review my goals']
  ];
  i int;
  g int;
  new_goal uuid;
begin
  insert into public.profiles (user_id) values (new.id) on conflict do nothing;

  for i in 1..array_length(seed, 1) loop
    insert into public.habits (user_id, position, name_ar, name_en, target)
    values (new.id, i, seed[i][1], seed[i][2], 30)
    on conflict do nothing;
  end loop;

  for g in 1..6 loop
    insert into public.goals (user_id, year, position, title)
    values (new.id, extract(year from now())::int, g, '')
    returning id into new_goal;

    for i in 1..10 loop
      insert into public.goal_steps (user_id, goal_id, position, title)
      values (new.id, new_goal, i, '');
    end loop;
  end loop;

  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- Yearly roll-up. Returns one row per month so the summary page
-- is a single round trip instead of twelve count queries.
-- security invoker keeps RLS in force for the calling user.
-- ============================================================
create or replace function public.monthly_summary(p_year int)
returns table (month int, completed bigint, avg_sleep numeric)
language sql
security invoker
stable
as $$
  select
    m::int as month,
    coalesce((
      select count(*) from public.habit_logs hl
      where hl.user_id = auth.uid()
        and extract(year from hl.day) = p_year
        and extract(month from hl.day) = m
    ), 0) as completed,
    (
      select round(avg(sl.hours), 1) from public.sleep_logs sl
      where sl.user_id = auth.uid()
        and extract(year from sl.day) = p_year
        and extract(month from sl.day) = m
    ) as avg_sleep
  from generate_series(1, 12) as m;
$$;

grant execute on function public.monthly_summary(int) to authenticated;
