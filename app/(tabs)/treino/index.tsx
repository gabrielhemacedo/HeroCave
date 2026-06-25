import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ToriMessage } from '@/components/mascot';
import { TORI_MESSAGES } from '@/components/mascot/messages';
import { Button, Card, Pill, ScreenContainer } from '@/components/ui';
import { useWorkouts } from '@/features/workouts/useWorkouts';
import { colors, spacing, typography } from '@/theme';

const INTENSITY_LABEL: Record<string, string> = {
  leve: 'Leve',
  moderado: 'Moderado',
  intenso: 'Intenso',
};

export default function TreinoListScreen() {
  const { data: workouts, isLoading } = useWorkouts();

  return (
    <ScreenContainer>
      <Text style={typography.title}>Treino</Text>

      <ToriMessage message={TORI_MESSAGES.homeIdle} expression="happy" />

      <Button label="Registrar treino" onPress={() => router.push('/(tabs)/treino/registrar')} />

      <View style={{ gap: spacing.sm }}>
        <Text style={typography.heading}>Historico</Text>

        {isLoading && <Text style={typography.caption}>Carregando...</Text>}

        {!isLoading && (workouts ?? []).length === 0 && (
          <Card>
            <Text style={typography.caption}>Nenhum treino registrado ainda. Vamos comecar?</Text>
          </Card>
        )}

        {(workouts ?? []).map((workout) => (
          <Pressable key={workout.id} onPress={() => router.push(`/(tabs)/treino/${workout.id}`)}>
            <Card style={{ gap: spacing.xs }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1, gap: spacing.xs }}>
                  <Pill color={workout.completed ? colors.green : colors.blue}>
                    {workout.completed ? 'Concluido' : INTENSITY_LABEL[workout.intensity]}
                  </Pill>
                  <Text style={typography.bodyStrong}>{workout.title}</Text>
                  <Text style={typography.tiny}>{workout.date}</Text>
                </View>
                {workout.completed && (
                  <Text style={[typography.tiny, { color: colors.gold }]}>+{workout.xp_earned} XP</Text>
                )}
              </View>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScreenContainer>
  );
}
