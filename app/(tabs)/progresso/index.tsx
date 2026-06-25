import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import { MuscleGroupCard, MuscleMapBack, MuscleMapFront } from '@/components/body-map';
import { AchievementCard, LeagueCard } from '@/components/gamification';
import { ToriMessage } from '@/components/mascot';
import { TORI_MESSAGES } from '@/components/mascot/messages';
import { Card, OptionChips, Pill, ProgressBar, ScreenContainer } from '@/components/ui';
import { useAchievements, useUnlockedAchievements } from '@/features/achievements/useAchievements';
import { useHeroProfile } from '@/features/hero/useHeroProfile';
import { MUSCLE_GROUP_LABEL, MUSCLE_GROUPS } from '@/features/muscleProgress/api';
import { useMuscleProgress } from '@/features/muscleProgress/useMuscleProgress';
import { colors, spacing, typography } from '@/theme';
import { LEAGUE_LABEL, leagueForProgress, leagueProgressDetail } from '@/utils/xpEngine';
import type { MuscleGroup } from '@/types/database';

const FUTURE_PILLAR_AREAS = ['Nutricao', 'Disciplina', 'Financas', 'Sem Fumar'];

const SECTION_OPTIONS = [
  { value: 'corpo', label: 'Corpo' },
  { value: 'ligas', label: 'Ligas' },
  { value: 'galeria', label: 'Galeria' },
];

const VIEW_OPTIONS = [
  { value: 'frente', label: 'Frente' },
  { value: 'costas', label: 'Costas' },
];

export default function ProgressoScreen() {
  const [section, setSection] = useState<'corpo' | 'ligas' | 'galeria'>('corpo');
  const [view, setView] = useState<'frente' | 'costas'>('frente');
  const { data: muscleProgress, isLoading } = useMuscleProgress();
  const { data: heroProfile } = useHeroProfile();
  const { data: achievements } = useAchievements();
  const { data: unlockedAchievements } = useUnlockedAchievements();

  const unlockedIds = useMemo(
    () => new Set((unlockedAchievements ?? []).map((row) => row.achievement_id)),
    [unlockedAchievements],
  );

  const generalLeagueDetail = useMemo(
    () => leagueProgressDetail(heroProfile?.total_xp ?? 0),
    [heroProfile?.total_xp],
  );

  const colorByGroup = useMemo(() => {
    const map: Partial<Record<MuscleGroup, string>> = {};
    for (const row of muscleProgress ?? []) {
      map[row.muscle_group] = colors.league[leagueForProgress(row.progress_points)];
    }
    return map;
  }, [muscleProgress]);

  return (
    <ScreenContainer>
      <Text style={typography.title}>Progresso</Text>

      <OptionChips
        options={SECTION_OPTIONS}
        value={section}
        onChange={(value) => setSection(value as typeof section)}
      />

      {section === 'corpo' && (
        <View style={{ gap: spacing.lg }}>
          <ToriMessage message={TORI_MESSAGES.streakKeep} expression="proud" />

          <View style={{ alignItems: 'center', gap: spacing.md }}>
            <OptionChips options={VIEW_OPTIONS} value={view} onChange={(value) => setView(value as typeof view)} />
            {view === 'frente' ? (
              <MuscleMapFront colors={colorByGroup} />
            ) : (
              <MuscleMapBack colors={colorByGroup} />
            )}
          </View>

          <View style={{ gap: spacing.sm }}>
            <Text style={typography.heading}>Grupos musculares</Text>
            {isLoading && <Text style={typography.caption}>Carregando...</Text>}
            {MUSCLE_GROUPS.map((muscleGroup) => {
              const progress = (muscleProgress ?? []).find((row) => row.muscle_group === muscleGroup);
              if (!progress) return null;
              return <MuscleGroupCard key={muscleGroup} progress={progress} />;
            })}
          </View>
        </View>
      )}

      {section === 'ligas' && (
        <View style={{ gap: spacing.lg }}>
          <ToriMessage message="Suba de liga em cada área e vire uma lenda." expression="proud" />

          <Card style={{ gap: spacing.sm }}>
            <Text style={typography.bodyStrong}>Liga geral</Text>
            <Pill color={colors.league[generalLeagueDetail.league]}>{LEAGUE_LABEL[generalLeagueDetail.league]}</Pill>
            <ProgressBar
              progress={generalLeagueDetail.progress}
              fillColors={[colors.league[generalLeagueDetail.league], colors.league[generalLeagueDetail.league]]}
            />
            {generalLeagueDetail.nextLeague && (
              <Text style={typography.tiny}>
                {generalLeagueDetail.pointsToNext} pts para {LEAGUE_LABEL[generalLeagueDetail.nextLeague]}
              </Text>
            )}
          </Card>

          <View style={{ gap: spacing.sm }}>
            <Text style={typography.heading}>Ligas por grupo muscular</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
              {MUSCLE_GROUPS.map((muscleGroup) => {
                const progress = (muscleProgress ?? []).find((row) => row.muscle_group === muscleGroup);
                return (
                  <LeagueCard
                    key={muscleGroup}
                    label={MUSCLE_GROUP_LABEL[muscleGroup]}
                    progressPoints={progress?.progress_points ?? 0}
                  />
                );
              })}
            </View>
          </View>

          <View style={{ gap: spacing.sm }}>
            <Text style={typography.heading}>Próximos pilares</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
              {FUTURE_PILLAR_AREAS.map((area) => (
                <LeagueCard key={area} label={area} progressPoints={0} disabled />
              ))}
            </View>
          </View>
        </View>
      )}

      {section === 'galeria' && (
        <View style={{ gap: spacing.sm }}>
          <ToriMessage
            message={`Voce desbloqueou ${unlockedIds.size} de ${achievements?.length ?? 0} conquistas.`}
            expression={unlockedIds.size > 0 ? 'proud' : 'happy'}
          />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
            {(achievements ?? []).map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                unlocked={unlockedIds.has(achievement.id)}
              />
            ))}
          </View>
        </View>
      )}
    </ScreenContainer>
  );
}
