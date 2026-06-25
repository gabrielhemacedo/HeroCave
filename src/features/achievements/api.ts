import { supabase } from '@/lib/supabase';
import type { AchievementRow, MuscleProgressRow, UserAchievementRow } from '@/types/database';
import { LEAGUE_ORDER, leagueForProgress } from '@/utils/xpEngine';

export async function getAllAchievements(): Promise<AchievementRow[]> {
  const { data, error } = await supabase.from('achievements').select('*').order('xp_bonus', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getUnlockedAchievements(userId: string): Promise<UserAchievementRow[]> {
  const { data, error } = await supabase.from('user_achievements').select('*').eq('user_id', userId);
  if (error) throw error;
  return data ?? [];
}

const PRATA_INDEX = LEAGUE_ORDER.indexOf('prata');

/** Avalia condicoes de conquistas relacionadas ao treino/corpo e desbloqueia as que ainda nao foram. */
export async function evaluateWorkoutAchievements(params: {
  userId: string;
  completedWorkoutsCount: number;
  streakDays: number;
  muscleProgress: MuscleProgressRow[];
}): Promise<AchievementRow[]> {
  const { userId, completedWorkoutsCount, streakDays, muscleProgress } = params;

  const candidateKeys: string[] = [];
  if (completedWorkoutsCount >= 1) candidateKeys.push('primeiro_treino');
  if (completedWorkoutsCount >= 10) candidateKeys.push('dez_treinos');
  if (streakDays >= 7) candidateKeys.push('primeira_semana');
  if (streakDays >= 30) candidateKeys.push('trinta_dias_ativos');
  if (muscleProgress.some((row) => LEAGUE_ORDER.indexOf(leagueForProgress(row.progress_points)) >= PRATA_INDEX)) {
    candidateKeys.push('grupo_evoluido');
  }
  if (muscleProgress.some((row) => leagueForProgress(row.progress_points) === 'lendaria')) {
    candidateKeys.push('lenda_muscular');
  }

  if (candidateKeys.length === 0) return [];

  const [{ data: achievements, error: achievementsError }, { data: unlocked, error: unlockedError }] =
    await Promise.all([
      supabase.from('achievements').select('*').in('key', candidateKeys),
      supabase.from('user_achievements').select('achievement_id').eq('user_id', userId),
    ]);

  if (achievementsError) throw achievementsError;
  if (unlockedError) throw unlockedError;

  const unlockedIds = new Set((unlocked ?? []).map((row) => row.achievement_id));
  const newlyUnlocked = (achievements ?? []).filter((achievement) => !unlockedIds.has(achievement.id));

  if (newlyUnlocked.length === 0) return [];

  const { error: insertError } = await supabase
    .from('user_achievements')
    .insert(newlyUnlocked.map((achievement) => ({ user_id: userId, achievement_id: achievement.id })));

  if (insertError) throw insertError;

  return newlyUnlocked;
}
