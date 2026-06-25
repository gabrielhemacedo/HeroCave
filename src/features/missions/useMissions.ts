import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useSessionStore } from '@/store/sessionStore';
import { getActiveMissions } from './api';

export const missionsKey = (userId: string | undefined) => ['missions', userId] as const;

export function useMissions() {
  const userId = useSessionStore((state) => state.session?.user.id);

  return useQuery({
    queryKey: missionsKey(userId),
    queryFn: () => getActiveMissions(userId as string),
    enabled: Boolean(userId),
  });
}

export function useInvalidateMissions() {
  const queryClient = useQueryClient();
  const userId = useSessionStore((state) => state.session?.user.id);
  return () => queryClient.invalidateQueries({ queryKey: missionsKey(userId) });
}
