import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { ToriMessage } from '@/components/mascot';
import { TORI_MESSAGES, pickRandom } from '@/components/mascot/messages';
import { Button, Card, Pill, ScreenContainer } from '@/components/ui';
import { MUSCLE_GROUP_LABEL } from '@/features/muscleProgress/api';
import { useCompleteWorkout, useWorkout } from '@/features/workouts/useWorkouts';
import type { CompleteWorkoutResult } from '@/features/workouts/api';
import { colors, spacing, typography } from '@/theme';

const INTENSITY_LABEL: Record<string, string> = {
  leve: 'Leve',
  moderado: 'Moderado',
  intenso: 'Intenso',
};

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: workout, isLoading } = useWorkout(id);
  const completeWorkout = useCompleteWorkout();
  const [result, setResult] = useState<CompleteWorkoutResult | null>(null);

  if (isLoading || !workout) {
    return (
      <ScreenContainer>
        <Text style={typography.caption}>Carregando treino...</Text>
      </ScreenContainer>
    );
  }

  async function handleComplete() {
    if (!workout) return;
    const completionResult = await completeWorkout.mutateAsync(workout);
    setResult(completionResult);
  }

  return (
    <ScreenContainer>
      <View style={{ gap: spacing.xs }}>
        <Pill color={workout.completed ? colors.green : colors.blue}>
          {workout.completed ? 'Concluido' : INTENSITY_LABEL[workout.intensity]}
        </Pill>
        <Text style={typography.title}>{workout.title}</Text>
        <Text style={typography.caption}>
          {workout.date} - {workout.duration_minutes} min
        </Text>
      </View>

      {result && (
        <ToriMessage
          message={result.leveledUp ? TORI_MESSAGES.levelUp : pickRandom(TORI_MESSAGES.workoutComplete)}
          expression={result.leveledUp ? 'levelup' : 'cheering'}
        />
      )}

      {result && (
        <Card style={{ gap: spacing.xs }}>
          <Text style={typography.bodyStrong}>+{result.xpEarned} XP ganho</Text>
          {result.leveledUp && (
            <Text style={[typography.caption, { color: colors.gold }]}>
              Subiu {result.levelsGained} {result.levelsGained > 1 ? 'niveis' : 'nivel'}!
            </Text>
          )}
          {result.streakMilestoneHit && (
            <Text style={[typography.caption, { color: colors.orange }]}>Nova marca de sequencia atingida!</Text>
          )}
          {result.completedMissions.length > 0 && (
            <Text style={[typography.caption, { color: colors.green }]}>
              {result.completedMissions.length} missao(oes) concluida(s)
            </Text>
          )}
        </Card>
      )}

      <View style={{ gap: spacing.sm }}>
        <Text style={typography.heading}>Exercicios</Text>
        {workout.workout_exercises.map((exercise) => (
          <Card key={exercise.id} style={{ gap: spacing.xs }}>
            <Pill>{MUSCLE_GROUP_LABEL[exercise.muscle_group]}</Pill>
            <Text style={typography.bodyStrong}>{exercise.name}</Text>
            <Text style={typography.caption}>
              {exercise.sets} series x {exercise.reps} reps - {exercise.weight_kg} kg
            </Text>
          </Card>
        ))}
      </View>

      {!workout.completed && (
        <Button label="Concluir treino" onPress={handleComplete} loading={completeWorkout.isPending} />
      )}
    </ScreenContainer>
  );
}
