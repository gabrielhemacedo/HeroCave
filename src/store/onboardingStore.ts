import { create } from 'zustand';

import type { HeroClass } from '@/types/database';

type OnboardingState = {
  heroName: string;
  age: string;
  heightCm: string;
  weightKg: string;
  fitnessGoal: string;
  weeklyFrequency: string;
  nutritionGoal: string;
  smokes: boolean;
  cigarettesPerDay: string;
  financialGoal: string;
  heroClass: HeroClass | null;
  setField: <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) => void;
  reset: () => void;
};

const initialState = {
  heroName: '',
  age: '',
  heightCm: '',
  weightKg: '',
  fitnessGoal: 'ganhar_massa',
  weeklyFrequency: '3',
  nutritionGoal: 'comer_melhor',
  smokes: false,
  cigarettesPerDay: '',
  financialGoal: 'economizar',
  heroClass: null as HeroClass | null,
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,
  setField: (key, value) => set({ [key]: value } as Partial<OnboardingState>),
  reset: () => set(initialState),
}));
