export type HeroClass = 'guerreiro' | 'guardiao' | 'estrategista' | 'renascido';
export type MuscleGroup = 'bracos' | 'peitorais' | 'costas' | 'ombros' | 'abdomen' | 'pernas' | 'gluteos';
export type LeagueKey = 'madeira' | 'bronze' | 'prata' | 'ouro' | 'platina' | 'diamante' | 'mestre' | 'lendaria';
export type WorkoutIntensity = 'leve' | 'moderado' | 'intenso';
export type MissionType = 'diaria' | 'semanal' | 'especial';
export type AchievementRarity = 'comum' | 'rara' | 'epica' | 'lendaria';

export type HeroProfileRow = {
  id: string;
  user_id: string;
  hero_name: string;
  class: HeroClass;
  level: number;
  current_xp: number;
  total_xp: number;
  strength: number;
  vitality: number;
  discipline: number;
  resistance: number;
  focus: number;
  wisdom: number;
  streak_days: number;
  last_active_date: string | null;
  coins: number;
  league_general: LeagueKey;
  created_at: string;
}

export type UserGoalsRow = {
  id: string;
  user_id: string;
  fitness_goal: string | null;
  nutrition_goal: string | null;
  smoking_goal: string | null;
  financial_goal: string | null;
  smokes: boolean;
  cigarettes_per_day: number | null;
  water_goal_ml: number;
  protein_goal_g: number;
  monthly_saving_goal: number | null;
  created_at: string;
}

export type WorkoutRow = {
  id: string;
  user_id: string;
  date: string;
  title: string;
  workout_type: string | null;
  duration_minutes: number | null;
  intensity: WorkoutIntensity;
  completed: boolean;
  xp_earned: number;
  notes: string | null;
  created_at: string;
}

export type WorkoutExerciseRow = {
  id: string;
  workout_id: string;
  muscle_group: MuscleGroup;
  name: string;
  sets: number | null;
  reps: number | null;
  weight_kg: number | null;
  rest_seconds: number | null;
  completed: boolean;
}

export type MuscleProgressRow = {
  id: string;
  user_id: string;
  muscle_group: MuscleGroup;
  level: number;
  league: LeagueKey;
  progress_points: number;
  last_trained_at: string | null;
}

export type MissionRow = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string | null;
  mission_type: MissionType;
  xp_reward: number;
  progress_current: number;
  progress_target: number;
  completed: boolean;
  due_date: string | null;
  created_at: string;
}

export type AchievementRow = {
  id: string;
  key: string;
  title: string;
  description: string | null;
  rarity: AchievementRarity;
  category: string | null;
  icon: string | null;
  xp_bonus: number;
}

export type UserAchievementRow = {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
}

export type MealRow = {
  id: string;
  user_id: string;
  date: string;
  meal_type: string | null;
  title: string | null;
  protein_g: number | null;
  calories: number | null;
  quality: string | null;
  notes: string | null;
  created_at: string;
}

export type WaterLogRow = {
  id: string;
  user_id: string;
  date: string;
  amount_ml: number;
  created_at: string;
}

export type SmokingLogRow = {
  id: string;
  user_id: string;
  date: string;
  cigarettes_smoked: number;
  craving_level: number | null;
  trigger_label: string | null;
  relapse: boolean;
  notes: string | null;
  created_at: string;
}

export type FinancialTransactionRow = {
  id: string;
  user_id: string;
  date: string;
  type: 'entrada' | 'saida';
  amount: number;
  category: string | null;
  description: string | null;
  created_at: string;
}

type TableDef<Row, Insert> = { Row: Row; Insert: Insert; Update: Partial<Insert>; Relationships: [] };

export type Database = {
  public: {
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Tables: {
      hero_profiles: TableDef<HeroProfileRow, Omit<HeroProfileRow, 'id' | 'created_at'> & { id?: string }>;
      user_goals: TableDef<UserGoalsRow, Omit<UserGoalsRow, 'id' | 'created_at'> & { id?: string }>;
      workouts: TableDef<WorkoutRow, Omit<WorkoutRow, 'id' | 'created_at'> & { id?: string }>;
      workout_exercises: TableDef<WorkoutExerciseRow, Omit<WorkoutExerciseRow, 'id'> & { id?: string }>;
      muscle_progress: TableDef<MuscleProgressRow, Omit<MuscleProgressRow, 'id'> & { id?: string }>;
      missions: TableDef<MissionRow, Omit<MissionRow, 'id' | 'created_at'> & { id?: string }>;
      achievements: TableDef<AchievementRow, Omit<AchievementRow, 'id'> & { id?: string }>;
      user_achievements: TableDef<UserAchievementRow, Omit<UserAchievementRow, 'id' | 'unlocked_at'> & { id?: string }>;
      meals: TableDef<MealRow, Omit<MealRow, 'id' | 'created_at'> & { id?: string }>;
      water_logs: TableDef<WaterLogRow, Omit<WaterLogRow, 'id' | 'created_at'> & { id?: string }>;
      smoking_logs: TableDef<SmokingLogRow, Omit<SmokingLogRow, 'id' | 'created_at'> & { id?: string }>;
      financial_transactions: TableDef<
        FinancialTransactionRow,
        Omit<FinancialTransactionRow, 'id' | 'created_at'> & { id?: string }
      >;
    };
  };
}
