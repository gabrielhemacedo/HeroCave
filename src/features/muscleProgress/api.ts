import { supabase } from '@/lib/supabase';
import type { MuscleGroup, MuscleProgressRow } from '@/types/database';
import { leagueForProgress, muscleProgressPointsForWorkout } from '@/utils/xpEngine';

export const MUSCLE_GROUPS: MuscleGroup[] = ['bracos', 'peitorais', 'costas', 'ombros', 'abdomen', 'pernas', 'gluteos'];

export const MUSCLE_GROUP_LABEL: Record<MuscleGroup, string> = {
  bracos: 'Bracos',
  peitorais: 'Peitorais',
  costas: 'Costas',
  ombros: 'Ombros',
  abdomen: 'Abdomen',
  pernas: 'Pernas',
  gluteos: 'Gluteos',
};

export async function seedMuscleProgress(userId: string) {
  const rows = MUSCLE_GROUPS.map((muscleGroup) => ({
    user_id: userId,
    muscle_group: muscleGroup,
    level: 1,
    league: 'madeira' as const,
    progress_points: 0,
    last_trained_at: null,
  }));

  const { error } = await supabase.from('muscle_progress').upsert(rows, { onConflict: 'user_id,muscle_group' });
  if (error) throw error;
}

export async function getMuscleProgress(userId: string): Promise<MuscleProgressRow[]> {
  const { data, error } = await supabase.from('muscle_progress').select('*').eq('user_id', userId);
  if (error) throw error;
  return data ?? [];
}

export async function applyWorkoutToMuscleGroups(
  userId: string,
  muscleGroups: MuscleGroup[],
  intensity: 'leve' | 'moderado' | 'intenso'
) {
  const points = muscleProgressPointsForWorkout(intensity);
  const uniqueGroups = Array.from(new Set(muscleGroups));

  for (const muscleGroup of uniqueGroups) {
    const { data: current, error: fetchError } = await supabase
      .from('muscle_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('muscle_group', muscleGroup)
      .maybeSingle();

    if (fetchError) throw fetchError;

    const newProgress = (current?.progress_points ?? 0) + points;
    const newLeague = leagueForProgress(newProgress);
    const newLevel = (current?.level ?? 1) + 1;

    const { error: upsertError } = await supabase.from('muscle_progress').upsert(
      {
        user_id: userId,
        muscle_group: muscleGroup,
        level: newLevel,
        league: newLeague,
        progress_points: newProgress,
        last_trained_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,muscle_group' }
    );

    if (upsertError) throw upsertError;
  }
}
