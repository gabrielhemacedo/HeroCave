import type { LeagueKey } from '@/types/database';

/** Tabela de XP por acao (spec "Modo Heroi", secao 10). Nesta entrega apenas os valores de
 * Treino sao de fato concedidos pela UI; os demais ficam definidos para os proximos pilares. */
export const XP_REWARDS = {
  workoutCompleted: 50,
  workoutIntense: 70,
  goodMeal: 25,
  proteinGoalHit: 40,
  waterGoalHit: 25,
  expenseLogged: 20,
  dailySavings: 40,
  smokeFreeDay: 80,
  weeklyGoalBonus: 60,
  allDailyMissionsBonus: 40,
} as const;

/** XP necessario para alcancar o nivel `n` (a partir do nivel atual). Curva crescente suave. */
export function xpToReachLevel(level: number): number {
  return Math.round(100 * level ** 1.3);
}

export type XpApplicationResult = {
  newLevel: number;
  newCurrentXp: number;
  newTotalXp: number;
  leveledUp: boolean;
  levelsGained: number;
};

export function applyXp(params: { level: number; currentXp: number; totalXp: number; xpGained: number }): XpApplicationResult {
  let { level, currentXp } = params;
  let remaining = currentXp + params.xpGained;
  let levelsGained = 0;

  let xpNeeded = xpToReachLevel(level);
  while (remaining >= xpNeeded) {
    remaining -= xpNeeded;
    level += 1;
    levelsGained += 1;
    xpNeeded = xpToReachLevel(level);
  }

  return {
    newLevel: level,
    newCurrentXp: remaining,
    newTotalXp: params.totalXp + params.xpGained,
    leveledUp: levelsGained > 0,
    levelsGained,
  };
}

export const LEAGUE_ORDER: LeagueKey[] = [
  'madeira',
  'bronze',
  'prata',
  'ouro',
  'platina',
  'diamante',
  'mestre',
  'lendaria',
];

export const LEAGUE_LABEL: Record<LeagueKey, string> = {
  madeira: 'Madeira',
  bronze: 'Bronze',
  prata: 'Prata',
  ouro: 'Ouro',
  platina: 'Platina',
  diamante: 'Diamante',
  mestre: 'Mestre',
  lendaria: 'Lendaria',
};

/** Pontos de progresso acumulados necessarios para alcancar cada liga (indice = posicao em LEAGUE_ORDER). */
const LEAGUE_THRESHOLDS = [0, 150, 400, 800, 1400, 2200, 3200, 4500];

export function leagueForProgress(progressPoints: number): LeagueKey {
  let current: LeagueKey = LEAGUE_ORDER[0];
  for (let i = 0; i < LEAGUE_ORDER.length; i += 1) {
    if (progressPoints >= LEAGUE_THRESHOLDS[i]) {
      current = LEAGUE_ORDER[i];
    }
  }
  return current;
}

export function leagueProgressDetail(progressPoints: number) {
  const leagueIndex = LEAGUE_ORDER.indexOf(leagueForProgress(progressPoints));
  const isMax = leagueIndex === LEAGUE_ORDER.length - 1;
  const currentThreshold = LEAGUE_THRESHOLDS[leagueIndex];
  const nextThreshold = isMax ? currentThreshold : LEAGUE_THRESHOLDS[leagueIndex + 1];
  const span = nextThreshold - currentThreshold;
  const progressInLeague = progressPoints - currentThreshold;

  return {
    league: LEAGUE_ORDER[leagueIndex],
    nextLeague: isMax ? null : LEAGUE_ORDER[leagueIndex + 1],
    progress: isMax ? 1 : Math.max(0, Math.min(1, progressInLeague / span)),
    pointsToNext: isMax ? 0 : Math.max(0, nextThreshold - progressPoints),
  };
}

/** Pontos de progresso de liga ganhos por treino concluido em um grupo muscular. */
export function muscleProgressPointsForWorkout(intensity: 'leve' | 'moderado' | 'intenso'): number {
  if (intensity === 'intenso') return 35;
  if (intensity === 'moderado') return 25;
  return 15;
}

/** Calcula o novo streak ao registrar atividade "hoje", dado o streak e ultima data ativos. */
export function computeNextStreak(params: {
  currentStreak: number;
  lastActiveDate: string | null;
  today: string;
}): { streakDays: number; alreadyCountedToday: boolean } {
  const { currentStreak, lastActiveDate, today } = params;

  if (lastActiveDate === today) {
    return { streakDays: currentStreak, alreadyCountedToday: true };
  }

  if (lastActiveDate) {
    const diffDays = Math.round(
      (new Date(today).getTime() - new Date(lastActiveDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays === 1) {
      return { streakDays: currentStreak + 1, alreadyCountedToday: false };
    }
  }

  return { streakDays: 1, alreadyCountedToday: false };
}

export const STREAK_MILESTONES = [3, 7, 14, 30, 100] as const;

export function isStreakMilestone(streakDays: number): boolean {
  return (STREAK_MILESTONES as readonly number[]).includes(streakDays);
}
