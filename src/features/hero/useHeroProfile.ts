import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useSessionStore } from '@/store/sessionStore';
import { getHeroProfile } from './api';

export const heroProfileKey = (userId: string | undefined) => ['hero-profile', userId] as const;

export function useHeroProfile() {
  const userId = useSessionStore((state) => state.session?.user.id);

  return useQuery({
    queryKey: heroProfileKey(userId),
    queryFn: () => getHeroProfile(userId as string),
    enabled: Boolean(userId),
  });
}

export function useInvalidateHeroProfile() {
  const queryClient = useQueryClient();
  const userId = useSessionStore((state) => state.session?.user.id);
  return () => queryClient.invalidateQueries({ queryKey: heroProfileKey(userId) });
}
