import { supabase } from '@/lib/supabase';
import { grantXp } from '@/features/hero/api';
import { applyWorkoutToMuscleGroups } from '@/features/muscleProgress/api';
import { incrementMissionsByCategory } from '@/features/missions/api';
import type { MissionRow, MuscleGroup, WorkoutExerciseRow, WorkoutIntensity, WorkoutRow } from '@/types/database';
import { XP_REWARDS } from '@/utils/xpEngine';

export type WorkoutWithExercises = WorkoutRow & { workout_exercises: WorkoutExerciseRow[] };

export type NewExerciseInput = {
  muscleGroup: MuscleGroup;
  name: string;
  sets: number;
  reps: number;
  weightKg: number;
};

export async function getWorkouts(userId: string): Promise<WorkoutWithExercises[]> {
  const { data, error } = await supabase
    .from('workouts')
    .select('*, workout_exercises(*)')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (error) throw error;
  return (data ?? []) as WorkoutWithExercises[];
}

export async function getWorkout(workoutId: string): Promise<WorkoutWithExercises | null> {
  const { data, error } = await supabase
    .from('workouts')
    .select('*, workout_exercises(*)')
    .eq('id', workoutId)
    .maybeSingle();

  if (error) throw error;
  return data as WorkoutWithExercises | null;
}

export async function createWorkout(params: {
  userId: string;
  title: string;
  intensity: WorkoutIntensity;
  durationMinutes: number;
  exercises: NewExerciseInput[];
}): Promise<WorkoutWithExercises> {
  const { data: workout, error: workoutError } = await supabase
    .from('workouts')
    .insert({
      user_id: params.userId,
      date: new Date().toISOString().slice(0, 10),
      title: params.title,
      workout_type: 'manual',
      duration_minutes: params.durationMinutes,
      intensity: params.intensity,
      completed: false,
      xp_earned: 0,
      notes: null,
    })
    .select('*')
    .single();

  if (workoutError) throw workoutError;

  const exerciseRows = params.exercises.map((exercise) => ({
    workout_id: workout.id,
    muscle_group: exercise.muscleGroup,
    name: exercise.name,
    sets: exercise.sets,
    reps: exercise.reps,
    weight_kg: exercise.weightKg,
    rest_seconds: 60,
    completed: false,
  }));

  const { data: exercises, error: exercisesError } = await supabase
    .from('workout_exercises')
    .insert(exerciseRows)
    .select('*');

  if (exercisesError) throw exercisesError;

  return { ...(workout as WorkoutRow), workout_exercises: (exercises ?? []) as WorkoutExerciseRow[] };
}

export type CompleteWorkoutResult = {
  leveledUp: boolean;
  levelsGained: number;
  streakMilestoneHit: boolean;
  xpEarned: number;
  completedMissions: MissionRow[];
};

export async function completeWorkout(userId: string, workout: WorkoutWithExercises): Promise<CompleteWorkoutResult> {
  const xpEarned = workout.intensity === 'intenso' ? XP_REWARDS.workoutIntense : XP_REWARDS.workoutCompleted;

  const xpResult = await grantXp(userId, xpEarned);

  await applyWorkoutToMuscleGroups(
    userId,
    workout.workout_exercises.map((exercise) => exercise.muscle_group),
    workout.intensity
  );

  const { error } = await supabase
    .from('workouts')
    .update({ completed: true, xp_earned: xpEarned })
    .eq('id', workout.id);

  if (error) throw error;

  const completedMissions = await incrementMissionsByCategory(userId, 'treino', 1);

  return {
    leveledUp: xpResult.leveledUp,
    levelsGained: xpResult.levelsGained,
    streakMilestoneHit: xpResult.streakMilestoneHit,
    xpEarned,
    completedMissions,
  };
}
