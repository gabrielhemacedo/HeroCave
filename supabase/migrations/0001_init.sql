-- Modo Heroi - schema inicial
-- Todas as tabelas por usuario tem RLS habilitado com policy `auth.uid() = user_id`.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- hero_profiles
-- ---------------------------------------------------------------------------
create table if not exists hero_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  hero_name text not null,
  class text not null check (class in ('guerreiro', 'guardiao', 'estrategista', 'renascido')),
  level integer not null default 1,
  current_xp integer not null default 0,
  total_xp integer not null default 0,
  strength integer not null default 0,
  vitality integer not null default 0,
  discipline integer not null default 0,
  resistance integer not null default 0,
  focus integer not null default 0,
  wisdom integer not null default 0,
  streak_days integer not null default 0,
  last_active_date date,
  coins integer not null default 0,
  league_general text not null default 'madeira',
  created_at timestamptz not null default now()
);

alter table hero_profiles enable row level security;

create policy "hero_profiles_owner" on hero_profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- user_goals
-- ---------------------------------------------------------------------------
create table if not exists user_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  fitness_goal text,
  nutrition_goal text,
  smoking_goal text,
  financial_goal text,
  smokes boolean not null default false,
  cigarettes_per_day integer,
  water_goal_ml integer not null default 2000,
  protein_goal_g integer not null default 120,
  monthly_saving_goal numeric,
  created_at timestamptz not null default now()
);

alter table user_goals enable row level security;

create policy "user_goals_owner" on user_goals
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- workouts + workout_exercises
-- ---------------------------------------------------------------------------
create table if not exists workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  date date not null default current_date,
  title text not null,
  workout_type text,
  duration_minutes integer,
  intensity text check (intensity in ('leve', 'moderado', 'intenso')) default 'moderado',
  completed boolean not null default false,
  xp_earned integer not null default 0,
  notes text,
  created_at timestamptz not null default now()
);

alter table workouts enable row level security;

create policy "workouts_owner" on workouts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists workout_exercises (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid not null references workouts (id) on delete cascade,
  muscle_group text not null check (
    muscle_group in ('bracos', 'peitorais', 'costas', 'ombros', 'abdomen', 'pernas', 'gluteos')
  ),
  name text not null,
  sets integer,
  reps integer,
  weight_kg numeric,
  rest_seconds integer,
  completed boolean not null default false
);

alter table workout_exercises enable row level security;

create policy "workout_exercises_owner" on workout_exercises
  for all using (
    exists (select 1 from workouts w where w.id = workout_exercises.workout_id and w.user_id = auth.uid())
  )
  with check (
    exists (select 1 from workouts w where w.id = workout_exercises.workout_id and w.user_id = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- muscle_progress
-- ---------------------------------------------------------------------------
create table if not exists muscle_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  muscle_group text not null check (
    muscle_group in ('bracos', 'peitorais', 'costas', 'ombros', 'abdomen', 'pernas', 'gluteos')
  ),
  level integer not null default 1,
  league text not null default 'madeira',
  progress_points integer not null default 0,
  last_trained_at timestamptz,
  unique (user_id, muscle_group)
);

alter table muscle_progress enable row level security;

create policy "muscle_progress_owner" on muscle_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- meals + water_logs (Nutricao - schema pronto, UI ainda nao implementada)
-- ---------------------------------------------------------------------------
create table if not exists meals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  date date not null default current_date,
  meal_type text check (meal_type in ('cafe', 'almoco', 'lanche', 'jantar', 'ceia', 'livre')),
  title text,
  protein_g numeric,
  calories integer,
  quality text,
  notes text,
  created_at timestamptz not null default now()
);

alter table meals enable row level security;

create policy "meals_owner" on meals
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists water_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  date date not null default current_date,
  amount_ml integer not null,
  created_at timestamptz not null default now()
);

alter table water_logs enable row level security;

create policy "water_logs_owner" on water_logs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- smoking_logs (Livre do Fumo - schema pronto, UI ainda nao implementada)
-- ---------------------------------------------------------------------------
create table if not exists smoking_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  date date not null default current_date,
  cigarettes_smoked integer not null default 0,
  craving_level integer,
  trigger_label text,
  relapse boolean not null default false,
  notes text,
  created_at timestamptz not null default now()
);

alter table smoking_logs enable row level security;

create policy "smoking_logs_owner" on smoking_logs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- financial_transactions (Cofre do Heroi - schema pronto, UI ainda nao implementada)
-- ---------------------------------------------------------------------------
create table if not exists financial_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  date date not null default current_date,
  type text not null check (type in ('entrada', 'saida')),
  amount numeric not null,
  category text,
  description text,
  created_at timestamptz not null default now()
);

alter table financial_transactions enable row level security;

create policy "financial_transactions_owner" on financial_transactions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- missions
-- ---------------------------------------------------------------------------
create table if not exists missions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  description text,
  category text,
  mission_type text not null check (mission_type in ('diaria', 'semanal', 'especial')),
  xp_reward integer not null default 0,
  progress_current integer not null default 0,
  progress_target integer not null default 1,
  completed boolean not null default false,
  due_date date,
  created_at timestamptz not null default now()
);

alter table missions enable row level security;

create policy "missions_owner" on missions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- achievements (catalogo global) + user_achievements
-- ---------------------------------------------------------------------------
create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text not null,
  description text,
  rarity text not null check (rarity in ('comum', 'rara', 'epica', 'lendaria')),
  category text,
  icon text,
  xp_bonus integer not null default 0
);

alter table achievements enable row level security;

create policy "achievements_read_all" on achievements
  for select using (true);

create table if not exists user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  achievement_id uuid not null references achievements (id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  unique (user_id, achievement_id)
);

alter table user_achievements enable row level security;

create policy "user_achievements_owner" on user_achievements
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
