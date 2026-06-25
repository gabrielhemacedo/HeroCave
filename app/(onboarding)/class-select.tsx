import { useState } from 'react';
import { router } from 'expo-router';
import { Alert, Pressable, Text, View } from 'react-native';

import { Tori } from '@/components/mascot';
import { Button, Card, ProgressBar, ScreenContainer } from '@/components/ui';
import { finalizeOnboarding } from '@/features/onboarding/api';
import { heroProfileKey } from '@/features/hero/useHeroProfile';
import { useSessionStore } from '@/store/sessionStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { colors, spacing, typography } from '@/theme';
import type { HeroClass } from '@/types/database';
import { useQueryClient } from '@tanstack/react-query';

const CLASSES: { value: HeroClass; title: string; description: string; bonus: string }[] = [
  { value: 'guerreiro', title: 'Guerreiro', description: 'Foco em treino e forca.', bonus: '+XP em treinos' },
  { value: 'guardiao', title: 'Guardiao', description: 'Foco em saude e consistencia.', bonus: '+XP em streak' },
  { value: 'estrategista', title: 'Estrategista', description: 'Foco em financas e rotina.', bonus: '+XP em financas' },
  { value: 'renascido', title: 'Renascido', description: 'Foco em parar de fumar e disciplina.', bonus: '+XP sem fumar' },
];

export default function ClassSelectScreen() {
  const heroClass = useOnboardingStore((state) => state.heroClass);
  const setField = useOnboardingStore((state) => state.setField);
  const onboardingState = useOnboardingStore();
  const session = useSessionStore((state) => state.session);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    if (!session || !heroClass) return;
    setLoading(true);
    try {
      await finalizeOnboarding(session.user.id, onboardingState);
      await queryClient.invalidateQueries({ queryKey: heroProfileKey(session.user.id) });
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Nao foi possivel concluir', error instanceof Error ? error.message : 'Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer>
      <View style={{ gap: spacing.xs }}>
        <Text style={typography.caption}>Passo 4 de 4</Text>
        <ProgressBar progress={1} />
      </View>

      <View style={{ alignItems: 'center', gap: spacing.sm }}>
        <Tori expression="proud" size={96} />
        <Text style={typography.title}>Escolha sua classe</Text>
      </View>

      <View style={{ gap: spacing.md }}>
        {CLASSES.map((item) => {
          const selected = item.value === heroClass;
          return (
            <Pressable key={item.value} onPress={() => setField('heroClass', item.value)}>
              <Card elevated={selected} style={{ borderColor: selected ? colors.blue : colors.border }}>
                <Text style={typography.heading}>{item.title}</Text>
                <Text style={[typography.caption, { marginTop: spacing.xs }]}>{item.description}</Text>
                <Text style={[typography.tiny, { color: colors.blue, marginTop: spacing.xs }]}>{item.bonus}</Text>
              </Card>
            </Pressable>
          );
        })}
      </View>

      <Button label="Comecar jornada" onPress={handleConfirm} loading={loading} disabled={!heroClass} />
    </ScreenContainer>
  );
}
