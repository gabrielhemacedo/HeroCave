import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Pressable, Text, View } from 'react-native';

import { Button, Card, OptionChips, ScreenContainer, TextField } from '@/components/ui';
import { MUSCLE_GROUPS, MUSCLE_GROUP_LABEL } from '@/features/muscleProgress/api';
import { useCreateWorkout } from '@/features/workouts/useWorkouts';
import type { NewExerciseInput } from '@/features/workouts/api';
import { colors, spacing, typography } from '@/theme';
import type { MuscleGroup, WorkoutIntensity } from '@/types/database';

const INTENSITY_OPTIONS: { value: WorkoutIntensity; label: string }[] = [
  { value: 'leve', label: 'Leve' },
  { value: 'moderado', label: 'Moderado' },
  { value: 'intenso', label: 'Intenso' },
];

const MUSCLE_GROUP_OPTIONS = MUSCLE_GROUPS.map((muscleGroup) => ({
  value: muscleGroup,
  label: MUSCLE_GROUP_LABEL[muscleGroup],
}));

function emptyExercise(): NewExerciseInput {
  return { muscleGroup: 'peitorais', name: '', sets: 3, reps: 10, weightKg: 0 };
}

export default function RegistrarTreinoScreen() {
  const [title, setTitle] = useState('Treino do dia');
  const [intensity, setIntensity] = useState<WorkoutIntensity>('moderado');
  const [durationMinutes, setDurationMinutes] = useState('45');
  const [exercises, setExercises] = useState<NewExerciseInput[]>([emptyExercise()]);

  const createWorkout = useCreateWorkout();

  function updateExercise(index: number, patch: Partial<NewExerciseInput>) {
    setExercises((current) => current.map((exercise, i) => (i === index ? { ...exercise, ...patch } : exercise)));
  }

  function removeExercise(index: number) {
    setExercises((current) => current.filter((_, i) => i !== index));
  }

  function addExercise() {
    setExercises((current) => [...current, emptyExercise()]);
  }

  async function handleSubmit() {
    const validExercises = exercises.filter((exercise) => exercise.name.trim().length > 0);

    if (validExercises.length === 0) {
      Alert.alert('Adicione pelo menos um exercicio com nome.');
      return;
    }

    try {
      const workout = await createWorkout.mutateAsync({
        title: title.trim() || 'Treino',
        intensity,
        durationMinutes: Number(durationMinutes) || 0,
        exercises: validExercises,
      });
      router.replace(`/(tabs)/treino/${workout.id}`);
    } catch (error) {
      Alert.alert('Erro ao salvar treino', error instanceof Error ? error.message : 'Tente novamente.');
    }
  }

  return (
    <ScreenContainer>
      <Text style={typography.title}>Registrar treino</Text>

      <TextField label="Titulo do treino" value={title} onChangeText={setTitle} />

      <View style={{ gap: spacing.sm }}>
        <Text style={typography.caption}>Intensidade</Text>
        <OptionChips options={INTENSITY_OPTIONS} value={intensity} onChange={(value) => setIntensity(value as WorkoutIntensity)} />
      </View>

      <TextField
        label="Duracao (minutos)"
        value={durationMinutes}
        onChangeText={setDurationMinutes}
        keyboardType="numeric"
      />

      <View style={{ gap: spacing.md }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={typography.heading}>Exercicios</Text>
          <Pressable
            onPress={addExercise}
            style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
          >
            <Ionicons name="add-circle" size={20} color={colors.blue} />
            <Text style={[typography.caption, { color: colors.blue }]}>Adicionar</Text>
          </Pressable>
        </View>

        {exercises.map((exercise, index) => (
          <Card key={index} style={{ gap: spacing.md }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={typography.bodyStrong}>Exercicio {index + 1}</Text>
              {exercises.length > 1 && (
                <Pressable onPress={() => removeExercise(index)}>
                  <Ionicons name="trash" size={18} color={colors.red} />
                </Pressable>
              )}
            </View>

            <TextField
              label="Nome do exercicio"
              value={exercise.name}
              onChangeText={(value) => updateExercise(index, { name: value })}
            />

            <View style={{ gap: spacing.sm }}>
              <Text style={typography.caption}>Grupo muscular</Text>
              <OptionChips
                options={MUSCLE_GROUP_OPTIONS}
                value={exercise.muscleGroup}
                onChange={(value) => updateExercise(index, { muscleGroup: value as MuscleGroup })}
              />
            </View>

            <View style={{ flexDirection: 'row', gap: spacing.sm }}>
              <View style={{ flex: 1 }}>
                <TextField
                  label="Series"
                  value={String(exercise.sets)}
                  onChangeText={(value) => updateExercise(index, { sets: Number(value) || 0 })}
                  keyboardType="numeric"
                />
              </View>
              <View style={{ flex: 1 }}>
                <TextField
                  label="Reps"
                  value={String(exercise.reps)}
                  onChangeText={(value) => updateExercise(index, { reps: Number(value) || 0 })}
                  keyboardType="numeric"
                />
              </View>
              <View style={{ flex: 1 }}>
                <TextField
                  label="Carga (kg)"
                  value={String(exercise.weightKg)}
                  onChangeText={(value) => updateExercise(index, { weightKg: Number(value) || 0 })}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </Card>
        ))}
      </View>

      <Button label="Salvar treino" onPress={handleSubmit} loading={createWorkout.isPending} />
    </ScreenContainer>
  );
}
