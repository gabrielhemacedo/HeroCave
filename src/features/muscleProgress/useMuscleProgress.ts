import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useSessionStore } from '@/store/sessionStore';
import { getMuscleProgress } from './api';

export const muscleProgressKey = (userId: string | undefined) => ['muscle-progress', userId] as const;

export function useMuscleProgress() {
  const userId = useSessionStore((state) => state.session?.user.id);

  return useQuery({
    queryKey: muscleProgressKey(userId),
    queryFn: () => getMuscleProgress(userId as string),
    enabled: Boolean(userId),
  });
}

export function useInvalidateMuscleProgress() {
  const queryClient = useQueryClient();
  const userId = useSessionStore((state) => state.session?.user.id);
  return () => queryClient.invalidateQueries({ queryKey: muscleProgressKey(userId) });
}
