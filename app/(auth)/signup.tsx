import { useState } from 'react';
import { Link, router } from 'expo-router';
import { Text, View } from 'react-native';

import { Tori } from '@/components/mascot';
import { Button, ScreenContainer, TextField } from '@/components/ui';
import { signUpWithEmail } from '@/features/auth/api';
import { colors, spacing, typography } from '@/theme';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function handleSignup() {
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      const { session } = await signUpWithEmail(email.trim(), password);
      if (!session) {
        setInfo('Conta criada! Confirme seu e-mail e depois entre com sua senha.');
        setTimeout(() => router.replace('/(auth)/login'), 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nao foi possivel criar a conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer>
      <View style={{ alignItems: 'center', gap: spacing.md, marginTop: spacing.xxl }}>
        <Tori expression="cheering" size={110} />
        <Text style={typography.display}>Criar heroi</Text>
        <Text style={[typography.body, { color: '#B9B8C7', textAlign: 'center' }]}>
          Sua jornada de evolucao comeca agora.
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
        <TextField
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Minimo 6 caracteres"
        />
        {error && (
          <Text style={[typography.caption, { color: colors.red, textAlign: 'center' }]}>{error}</Text>
        )}
        {info && (
          <Text style={[typography.caption, { color: colors.green, textAlign: 'center' }]}>{info}</Text>
        )}
        <Button label="Criar conta" onPress={handleSignup} loading={loading} disabled={!email || password.length < 6} />
        <Link href="/(auth)/login" style={{ alignSelf: 'center', marginTop: spacing.sm }}>
          <Text style={typography.caption}>Ja tem conta? Entrar</Text>
        </Link>
      </View>
    </ScreenContainer>
  );
}
