import { supabase } from '@/lib/supabase';
import { createHeroProfile } from '@/features/hero/api';
import { seedMuscleProgress } from '@/features/muscleProgress/api';
import { seedDefaultMissions } from '@/features/missions/api';
import type { HeroClass } from '@/types/database';
import type { useOnboardingStore } from '@/store/onboardingStore';

type OnboardingData = Omit<ReturnType<typeof useOnboardingStore.getState>, 'setField' | 'reset'>;

export async function finalizeOnboarding(userId: string, data: OnboardingData) {
  if (!data.heroClass) throw new Error('Escolha uma classe para o seu heroi.');

  const { error: goalsError } = await supabase.from('user_goals').upsert(
    {
      user_id: userId,
      fitness_goal: data.fitnessGoal,
      nutrition_goal: data.nutritionGoal,
      smoking_goal: data.smokes ? 'reduzir_gradualmente' : null,
      financial_goal: data.financialGoal,
      smokes: data.smokes,
      cigarettes_per_day: data.smokes ? Number(data.cigarettesPerDay) || 0 : null,
      water_goal_ml: 2000,
      protein_goal_g: 120,
      monthly_saving_goal: null,
    },
    { onConflict: 'user_id' }
  );
  if (goalsError) throw goalsError;

  await createHeroProfile({ userId, heroName: data.heroName || 'Heroi', heroClass: data.heroClass as HeroClass });
  await seedMuscleProgress(userId);
  await seedDefaultMissions(userId);
}
