import { useState } from 'react';
import { router } from 'expo-router';
import { Alert, Text, View } from 'react-native';

import { Button, Card, ScreenContainer } from '@/components/ui';
import { signOut } from '@/features/auth/api';
import { useHeroProfile } from '@/features/hero/useHeroProfile';
import { useSessionStore } from '@/store/sessionStore';
import { spacing, typography } from '@/theme';

export default function ConfiguracoesScreen() {
  const { data: profile } = useHeroProfile();
  const session = useSessionStore((state) => state.session);
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    try {
      await signOut();
      router.replace('/(auth)/login');
    } catch (error) {
      Alert.alert('Nao foi possivel sair', error instanceof Error ? error.message : 'Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer>
      <Text style={typography.title}>Configuracoes</Text>

      <Card style={{ gap: spacing.xs }}>
        <Text style={typography.caption}>Heroi</Text>
        <Text style={typography.bodyStrong}>{profile?.hero_name}</Text>
        <Text style={[typography.caption, { marginTop: spacing.sm }]}>E-mail</Text>
        <Text style={typography.bodyStrong}>{session?.user.email}</Text>
      </Card>

      <View style={{ marginTop: spacing.lg }}>
        <Button label="Sair da conta" variant="secondary" onPress={handleSignOut} loading={loading} />
      </View>
    </ScreenContainer>
  );
}
