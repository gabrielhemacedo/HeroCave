import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Tori } from '@/components/mascot';
import { Card, Pill, ProgressBar, ScreenContainer, StreakFlame } from '@/components/ui';
import { useHeroProfile } from '@/features/hero/useHeroProfile';
import { colors, spacing, typography } from '@/theme';
import { LEAGUE_LABEL, leagueProgressDetail, xpToReachLevel } from '@/utils/xpEngine';
import type { HeroClass } from '@/types/database';

const CLASS_LABEL: Record<HeroClass, string> = {
  guerreiro: 'Guerreiro',
  guardiao: 'Guardiao',
  estrategista: 'Estrategista',
  renascido: 'Renascido',
};

const ATTRIBUTES: { key: 'strength' | 'vitality' | 'discipline' | 'resistance' | 'focus' | 'wisdom'; label: string }[] = [
  { key: 'strength', label: 'Forca' },
  { key: 'vitality', label: 'Vitalidade' },
  { key: 'discipline', label: 'Disciplina' },
  { key: 'resistance', label: 'Resistencia' },
  { key: 'focus', label: 'Foco' },
  { key: 'wisdom', label: 'Sabedoria' },
];

export default function PerfilScreen() {
  const { data: profile } = useHeroProfile();

  if (!profile) return null;

  const detail = leagueProgressDetail(profile.total_xp);
  const xpProgress = profile.current_xp / xpToReachLevel(profile.level);

  return (
    <ScreenContainer>
      <View style={{ alignItems: 'center', gap: spacing.sm }}>
        <Tori expression="proud" size={96} />
        <Text style={typography.title}>{profile.hero_name}</Text>
        <Pill color={colors.purple}>{CLASS_LABEL[profile.class]}</Pill>
      </View>

      <Card style={{ gap: spacing.sm }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={typography.bodyStrong}>Nivel {profile.level}</Text>
          <Pill color={colors.league[detail.league]}>{LEAGUE_LABEL[detail.league]}</Pill>
        </View>
        <ProgressBar progress={xpProgress} />
        <Text style={typography.tiny}>
          {profile.current_xp}/{xpToReachLevel(profile.level)} XP
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm }}>
          <StreakFlame days={profile.streak_days} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 14 }}>{'\u{1FA99}'}</Text>
            <Text style={typography.bodyStrong}>{profile.coins}</Text>
          </View>
        </View>
      </Card>

      <View style={{ gap: spacing.sm }}>
        <Text style={typography.heading}>Atributos</Text>
        <Card style={{ gap: spacing.sm }}>
          {ATTRIBUTES.map((attribute) => (
            <View key={attribute.key} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={typography.caption}>{attribute.label}</Text>
              <Text style={typography.bodyStrong}>{profile[attribute.key]}</Text>
            </View>
          ))}
        </Card>
      </View>

      <View style={{ gap: spacing.sm }}>
        <Text style={typography.heading}>Outros pilares</Text>
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <Pressable onPress={() => router.push('/finance')} style={{ flex: 1 }}>
            <Card style={{ alignItems: 'center', gap: spacing.xs }}>
              <Text style={typography.bodyStrong}>Financas</Text>
              <Text style={typography.tiny}>Em breve</Text>
            </Card>
          </Pressable>
          <Pressable onPress={() => router.push('/smoking')} style={{ flex: 1 }}>
            <Card style={{ alignItems: 'center', gap: spacing.xs }}>
              <Text style={typography.bodyStrong}>Livre do Fumo</Text>
              <Text style={typography.tiny}>Em breve</Text>
            </Card>
          </Pressable>
        </View>
      </View>

      <Pressable onPress={() => router.push('/(tabs)/perfil/configuracoes')}>
        <Card style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={typography.bodyStrong}>Configuracoes</Text>
          <Text style={[typography.caption, { color: colors.blue }]}>Abrir</Text>
        </Card>
      </Pressable>
    </ScreenContainer>
  );
}
