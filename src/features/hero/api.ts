import { supabase } from '@/lib/supabase';
import type { HeroClass, HeroProfileRow } from '@/types/database';
import { applyXp, computeNextStreak, isStreakMilestone } from '@/utils/xpEngine';

export async function getHeroProfile(userId: string): Promise<HeroProfileRow | null> {
  const { data, error } = await supabase.from('hero_profiles').select('*').eq('user_id', userId).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createHeroProfile(params: { userId: string; heroName: string; heroClass: HeroClass }) {
  const { data, error } = await supabase
    .from('hero_profiles')
    .insert({
      user_id: params.userId,
      hero_name: params.heroName,
      class: params.heroClass,
      level: 1,
      current_xp: 0,
      total_xp: 0,
      strength: 0,
      vitality: 0,
      discipline: 0,
      resistance: 0,
      focus: 0,
      wisdom: 0,
      streak_days: 0,
      last_active_date: null,
      coins: 0,
      league_general: 'madeira',
    })
    .select('*')
    .single();

  if (error) throw error;
  return data as HeroProfileRow;
}

export type GrantXpResult = {
  profile: HeroProfileRow;
  leveledUp: boolean;
  levelsGained: number;
  streakMilestoneHit: boolean;
};

export async function grantXp(userId: string, xpGained: number): Promise<GrantXpResult> {
  const profile = await getHeroProfile(userId);
  if (!profile) throw new Error('Perfil de heroi nao encontrado.');

  const today = new Date().toISOString().slice(0, 10);
  const xpResult = applyXp({
    level: profile.level,
    currentXp: profile.current_xp,
    totalXp: profile.total_xp,
    xpGained,
  });
  const streak = computeNextStreak({
    currentStreak: profile.streak_days,
    lastActiveDate: profile.last_active_date,
    today,
  });

  const { data, error } = await supabase
    .from('hero_profiles')
    .update({
      level: xpResult.newLevel,
      current_xp: xpResult.newCurrentXp,
      total_xp: xpResult.newTotalXp,
      streak_days: streak.streakDays,
      last_active_date: today,
      coins: profile.coins + Math.round(xpGained / 5),
    })
    .eq('user_id', userId)
    .select('*')
    .single();

  if (error) throw error;

  return {
    profile: data as HeroProfileRow,
    leveledUp: xpResult.leveledUp,
    levelsGained: xpResult.levelsGained,
    streakMilestoneHit: !streak.alreadyCountedToday && isStreakMilestone(streak.streakDays),
  };
}

export async function incrementAttribute(userId: string, attribute: 'strength' | 'resistance', amount: number) {
  const profile = await getHeroProfile(userId);
  if (!profile) return;

  const updates: Partial<Pick<HeroProfileRow, 'strength' | 'resistance'>> =
    attribute === 'strength'
      ? { strength: profile.strength + amount }
      : { resistance: profile.resistance + amount };

  const { error } = await supabase.from('hero_profiles').update(updates).eq('user_id', userId);

  if (error) throw error;
}
