import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Tori } from '@/components/mascot';
import { Button, ProgressBar, ScreenContainer, TextField } from '@/components/ui';
import { useOnboardingStore } from '@/store/onboardingStore';
import { spacing, typography } from '@/theme';

export default function WelcomeScreen() {
  const heroName = useOnboardingStore((state) => state.heroName);
  const setField = useOnboardingStore((state) => state.setField);

  return (
    <ScreenContainer>
      <View style={{ gap: spacing.xs }}>
        <Text style={typography.caption}>Passo 1 de 4</Text>
        <ProgressBar progress={0.25} />
      </View>

      <View style={{ alignItems: 'center', gap: spacing.md }}>
        <Tori expression="cheering" size={120} />
        <Text style={typography.display}>Bem-vindo, heroi!</Text>
        <Text style={[typography.body, { color: '#B9B8C7', textAlign: 'center' }]}>
          Eu sou a Tori. Vamos despertar o heroi que existe em voce. Como ele se chama?
        </Text>
      </View>

      <View style={{ gap: spacing.lg }}>
        <TextField
          label="Nome do heroi"
          value={heroName}
          onChangeText={(value) => setField('heroName', value)}
          placeholder="Ex: Thiago, o Forte"
        />
        <Button
          label="Continuar"
          onPress={() => router.push('/(onboarding)/profile')}
          disabled={heroName.trim().length === 0}
        />
      </View>
    </ScreenContainer>
  );
}
