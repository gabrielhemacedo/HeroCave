import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { ToriMessage } from '@/components/mascot';
import { TORI_MESSAGES } from '@/components/mascot/messages';
import { Card, ScreenContainer } from '@/components/ui';
import { HeroTopBar, MissionCard, QuickActionCard } from '@/components/gamification';
import { useHeroProfile } from '@/features/hero/useHeroProfile';
import { useMissions } from '@/features/missions/useMissions';
import { spacing, typography } from '@/theme';

export default function HomeScreen() {
  const { data: profile } = useHeroProfile();
  const { data: missions } = useMissions();

  if (!profile) return null;

  const dailyMissions = (missions ?? []).filter((mission) => mission.mission_type === 'diaria');

  return (
    <ScreenContainer>
      <HeroTopBar profile={profile} />

      <ToriMessage message={TORI_MESSAGES.homeIdle} expression="happy" />

      <View style={{ gap: spacing.sm }}>
        <Text style={typography.heading}>Missoes de hoje</Text>
        {dailyMissions.length === 0 ? (
          <Card>
            <Text style={typography.caption}>Nenhuma missao por aqui ainda.</Text>
          </Card>
        ) : (
          dailyMissions.map((mission) => <MissionCard key={mission.id} mission={mission} />)
        )}
      </View>

      <View style={{ gap: spacing.sm }}>
        <Text style={typography.heading}>Atalhos</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md }}>
          <QuickActionCard
            icon="barbell"
            label="Registrar treino"
            subtitle="Ganhe XP e evolua musculos"
            onPress={() => router.push('/(tabs)/treino/registrar')}
          />
          <QuickActionCard
            icon="body"
            label="Estado corporal"
            subtitle="Veja seu mapa muscular"
            color="#33D17A"
            onPress={() => router.push('/(tabs)/progresso')}
          />
          <QuickActionCard
            icon="nutrition"
            label="Nutricao"
            subtitle="Em breve"
            color="#FFC83D"
            onPress={() => router.push('/(tabs)/nutricao')}
          />
          <QuickActionCard
            icon="leaf"
            label="Livre do Fumo"
            subtitle="Em breve"
            color="#FF8A1F"
            onPress={() => router.push('/smoking')}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
