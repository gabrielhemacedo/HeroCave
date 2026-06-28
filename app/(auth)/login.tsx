import { useState } from 'react';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { Tori } from '@/components/mascot';
import { Button, ScreenContainer, TextField } from '@/components/ui';
import { signInWithEmail } from '@/features/auth/api';
import { colors, spacing, typography } from '@/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmail(email.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nao foi possivel entrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer>
      <View style={{ alignItems: 'center', gap: spacing.md, marginTop: spacing.xxl }}>
        <Tori expression="happy" size={110} />
        <Text style={typography.display}>Modo Heroi</Text>
        <Text style={[typography.body, { color: '#B9B8C7', textAlign: 'center' }]}>
          Entre para continuar sua jornada de evolucao.
        </Text>
      </View>

      <View style={{ gap: spacing.lg }}>
        <TextField
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="voce@email.com"
        />
        <TextField label="Senha" value={password} onChangeText={setPassword} secureTextEntry placeholder="********" />
        {error && (
          <Text style={[typography.caption, { color: colors.red, textAlign: 'center' }]}>{error}</Text>
        )}
        <Button label="Entrar" onPress={handleLogin} loading={loading} disabled={!email || !password} />
        <Link href="/(auth)/signup" style={{ alignSelf: 'center', marginTop: spacing.sm }}>
          <Text style={typography.caption}>Nao tem conta? Criar heroi</Text>
        </Link>
      </View>
    </ScreenContainer>
  );
}
