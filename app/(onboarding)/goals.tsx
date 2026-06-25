import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button, OptionChips, ProgressBar, ScreenContainer, TextField } from '@/components/ui';
import { useOnboardingStore } from '@/store/onboardingStore';
import { spacing, typography } from '@/theme';

const NUTRITION_GOALS = [
  { value: 'comer_melhor', label: 'Comer melhor' },
  { value: 'bater_proteina', label: 'Bater proteina' },
  { value: 'beber_agua', label: 'Beber mais agua' },
  { value: 'reduzir_doces', label: 'Reduzir doces' },
];

const FINANCIAL_GOALS = [
  { value: 'economizar', label: 'Economizar' },
  { value: 'controlar_gastos', label: 'Controlar gastos' },
  { value: 'quitar_dividas', label: 'Quitar dividas' },
  { value: 'reserva', label: 'Montar reserva' },
];

const SMOKING_OPTIONS = [
  { value: 'nao', label: 'Nao fumo' },
  { value: 'sim', label: 'Fumo' },
];

export default function GoalsScreen() {
  const { nutritionGoal, smokes, cigarettesPerDay, financialGoal, setField } = useOnboardingStore();

  return (
    <ScreenContainer>
      <View style={{ gap: spacing.xs }}>
        <Text style={typography.caption}>Passo 3 de 4</Text>
        <ProgressBar progress={0.75} />
      </View>

      <Text style={typography.title}>Seus objetivos</Text>

      <View style={{ gap: spacing.sm }}>
        <Text style={typography.bodyStrong}>Alimentacao</Text>
        <OptionChips options={NUTRITION_GOALS} value={nutritionGoal} onChange={(v) => setField('nutritionGoal', v)} />
      </View>

      <View style={{ gap: spacing.sm }}>
        <Text style={typography.bodyStrong}>Voce fuma?</Text>
        <OptionChips
          options={SMOKING_OPTIONS}
          value={smokes ? 'sim' : 'nao'}
          onChange={(v) => setField('smokes', v === 'sim')}
        />
        {smokes && (
          <TextField
            label="Cigarros por dia"
            value={cigarettesPerDay}
            onChangeText={(v) => setField('cigarettesPerDay', v)}
            keyboardType="numeric"
            placeholder="10"
          />
        )}
      </View>

      <View style={{ gap: spacing.sm }}>
        <Text style={typography.bodyStrong}>Financas</Text>
        <OptionChips options={FINANCIAL_GOALS} value={financialGoal} onChange={(v) => setField('financialGoal', v)} />
      </View>

      <Button label="Continuar" onPress={() => router.push('/(onboarding)/class-select')} />
    </ScreenContainer>
  );
}
