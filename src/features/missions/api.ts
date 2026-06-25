import { supabase } from '@/lib/supabase';
import type { MissionRow } from '@/types/database';

function endOfWeekISO(): string {
  const now = new Date();
  const daysUntilSunday = 7 - now.getDay();
  const end = new Date(now);
  end.setDate(now.getDate() + daysUntilSunday);
  return end.toISOString().slice(0, 10);
}

export async function seedDefaultMissions(userId: string) {
  const today = new Date().toISOString().slice(0, 10);

  const { data: existing, error: existingError } = await supabase
    .from('missions')
    .select('id')
    .eq('user_id', userId)
    .eq('due_date', today);

  if (existingError) throw existingError;
  if (existing && existing.length > 0) return;

  const { error } = await supabase.from('missions').insert([
    {
      user_id: userId,
      title: 'Treino do dia',
      description: 'Complete um treino hoje.',
      category: 'treino',
      mission_type: 'diaria',
      xp_reward: 50,
      progress_current: 0,
      progress_target: 1,
      completed: false,
      due_date: today,
    },
    {
      user_id: userId,
      title: 'Semana de heroi',
      description: 'Complete 4 treinos esta semana.',
      category: 'treino',
      mission_type: 'semanal',
      xp_reward: 100,
      progress_current: 0,
      progress_target: 4,
      completed: false,
      due_date: endOfWeekISO(),
    },
  ]);

  if (error) throw error;
}

export async function getActiveMissions(userId: string): Promise<MissionRow[]> {
  const { data, error } = await supabase
    .from('missions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

/** Incrementa o progresso de todas as missoes ativas de uma categoria (ex.: ao concluir um treino). */
export async function incrementMissionsByCategory(
  userId: string,
  category: string,
  amount: number
): Promise<MissionRow[]> {
  const { data: missions, error } = await supabase
    .from('missions')
    .select('*')
    .eq('user_id', userId)
    .eq('category', category)
    .eq('completed', false);

  if (error) throw error;
  if (!missions || missions.length === 0) return [];

  const justCompleted: MissionRow[] = [];

  for (const mission of missions) {
    const progress = Math.min(mission.progress_target, mission.progress_current + amount);
    const completed = progress >= mission.progress_target;

    const { data: updated, error: updateError } = await supabase
      .from('missions')
      .update({ progress_current: progress, completed })
      .eq('id', mission.id)
      .select('*')
      .single();

    if (updateError) throw updateError;
    if (completed) justCompleted.push(updated as MissionRow);
  }

  return justCompleted;
}
