import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { OptionChips, ProgressBar, ScreenContainer, TextField } from '@/components/ui';
import { Button } from '@/components/ui';
import { useOnboardingStore } from '@/store/onboardingStore';
import { spacing, typography } from '@/theme';

const FITNESS_GOALS = [
  { value: 'ganhar_massa', label: 'Ganhar massa' },
  { value: 'emagrecer', label: 'Emagrecer' },
  { value: 'recomposicao', label: 'Recomposicao' },
  { value: 'condicionamento', label: 'Condicionamento' },
  { value: 'rotina', label: 'Criar rotina' },
];

const WEEKLY_FREQUENCIES = [
  { value: '2', label: '2x/semana' },
  { value: '3', label: '3x/semana' },
  { value: '4', label: '4x/semana' },
  { value: '5', label: '5x+/semana' },
];

export default function ProfileScreen() {
  const { age, heightCm, weightKg, fitnessGoal, weeklyFrequency, setField } = useOnboardingStore();

  return (
    <ScreenContainer>
      <View style={{ gap: spacing.xs }}>
        <Text style={typography.caption}>Passo 2 de 4</Text>
        <ProgressBar progress={0.5} />
      </View>

      <Text style={typography.title}>Sobre voce</Text>

      <View style={{ flexDirection: 'row', gap: spacing.md }}>
        <View style={{ flex: 1 }}>
          <TextField label="Idade" value={age} onChangeText={(v) => setField('age', v)} keyboardType="numeric" placeholder="28" />
        </View>
        <View style={{ flex: 1 }}>
          <TextField
            label="Altura (cm)"
            value={heightCm}
            onChangeText={(v) => setField('heightCm', v)}
            keyboardType="numeric"
            placeholder="175"
          />
        </View>
        <View style={{ flex: 1 }}>
          <TextField
            label="Peso (kg)"
            value={weightKg}
            onChangeText={(v) => setField('weightKg', v)}
            keyboardType="numeric"
            placeholder="78"
          />
        </View>
      </View>

      <View style={{ gap: spacing.sm }}>
        <Text style={typography.bodyStrong}>Objetivo fisico</Text>
        <OptionChips options={FITNESS_GOALS} value={fitnessGoal} onChange={(v) => setField('fitnessGoal', v)} />
      </View>

      <View style={{ gap: spacing.sm }}>
        <Text style={typography.bodyStrong}>Frequencia semanal</Text>
        <OptionChips options={WEEKLY_FREQUENCIES} value={weeklyFrequency} onChange={(v) => setField('weeklyFrequency', v)} />
      </View>

      <Button label="Continuar" onPress={() => router.push('/(onboarding)/goals')} />
    </ScreenContainer>
  );
}
