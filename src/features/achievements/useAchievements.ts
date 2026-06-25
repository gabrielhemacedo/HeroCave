import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useSessionStore } from '@/store/sessionStore';
import { getAllAchievements, getUnlockedAchievements } from './api';

export const achievementsKey = ['achievements'] as const;
export const unlockedAchievementsKey = (userId: string | undefined) => ['user-achievements', userId] as const;

export function useAchievements() {
  return useQuery({
    queryKey: achievementsKey,
    queryFn: getAllAchievements,
  });
}

export function useUnlockedAchievements() {
  const userId = useSessionStore((state) => state.session?.user.id);

  return useQuery({
    queryKey: unlockedAchievementsKey(userId),
    queryFn: () => getUnlockedAchievements(userId as string),
    enabled: Boolean(userId),
  });
}

export function useInvalidateUnlockedAchievements() {
  const queryClient = useQueryClient();
  const userId = useSessionStore((state) => state.session?.user.id);
  return () => queryClient.invalidateQueries({ queryKey: unlockedAchievementsKey(userId) });
}
