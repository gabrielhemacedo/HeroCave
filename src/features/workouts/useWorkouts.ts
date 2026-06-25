import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useSessionStore } from '@/store/sessionStore';
import { useInvalidateUnlockedAchievements } from '@/features/achievements/useAchievements';
import { useInvalidateHeroProfile } from '@/features/hero/useHeroProfile';
import { useInvalidateMissions } from '@/features/missions/useMissions';
import { useInvalidateMuscleProgress } from '@/features/muscleProgress/useMuscleProgress';
import {
  completeWorkout,
  createWorkout,
  getWorkout,
  getWorkouts,
  type CompleteWorkoutResult,
  type NewExerciseInput,
  type WorkoutWithExercises,
} from './api';
import type { WorkoutIntensity } from '@/types/database';

export const workoutsKey = (userId: string | undefined) => ['workouts', userId] as const;
export const workoutKey = (workoutId: string | undefined) => ['workout', workoutId] as const;

export function useWorkouts() {
  const userId = useSessionStore((state) => state.session?.user.id);

  return useQuery({
    queryKey: workoutsKey(userId),
    queryFn: () => getWorkouts(userId as string),
    enabled: Boolean(userId),
  });
}

export function useWorkout(workoutId: string | undefined) {
  return useQuery({
    queryKey: workoutKey(workoutId),
    queryFn: () => getWorkout(workoutId as string),
    enabled: Boolean(workoutId),
  });
}

export function useCreateWorkout() {
  const userId = useSessionStore((state) => state.session?.user.id);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      title: string;
      intensity: WorkoutIntensity;
      durationMinutes: number;
      exercises: NewExerciseInput[];
    }) => createWorkout({ userId: userId as string, ...params }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workoutsKey(userId) });
    },
  });
}

export function useCompleteWorkout() {
  const userId = useSessionStore((state) => state.session?.user.id);
  const queryClient = useQueryClient();
  const invalidateHeroProfile = useInvalidateHeroProfile();
  const invalidateMissions = useInvalidateMissions();
  const invalidateMuscleProgress = useInvalidateMuscleProgress();
  const invalidateUnlockedAchievements = useInvalidateUnlockedAchievements();

  return useMutation<CompleteWorkoutResult, Error, WorkoutWithExercises>({
    mutationFn: (workout) => completeWorkout(userId as string, workout),
    onSuccess: (_result, workout) => {
      queryClient.invalidateQueries({ queryKey: workoutsKey(userId) });
      queryClient.invalidateQueries({ queryKey: workoutKey(workout.id) });
      invalidateHeroProfile();
      invalidateMissions();
      invalidateMuscleProgress();
      invalidateUnlockedAchievements();
    },
  });
}
