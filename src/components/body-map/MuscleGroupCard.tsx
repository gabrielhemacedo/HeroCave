import { Text, View } from 'react-native';

import { Card, Pill, ProgressBar } from '@/components/ui';
import { MUSCLE_GROUP_LABEL } from '@/features/muscleProgress/api';
import { colors, spacing, typography } from '@/theme';
import type { MuscleProgressRow } from '@/types/database';
import { LEAGUE_LABEL, leagueProgressDetail } from '@/utils/xpEngine';

export function MuscleGroupCard({ progress }: { progress: MuscleProgressRow }) {
  const detail = leagueProgressDetail(progress.progress_points);
  const leagueColor = colors.league[detail.league];

  return (
    <Card style={{ gap: spacing.sm }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={typography.bodyStrong}>{MUSCLE_GROUP_LABEL[progress.muscle_group]}</Text>
        <Pill color={leagueColor}>{LEAGUE_LABEL[detail.league]}</Pill>
      </View>
      <Text style={typography.tiny}>Nivel {progress.level}</Text>
      <ProgressBar progress={detail.progress} fillColors={[leagueColor, leagueColor]} />
      <Text style={typography.tiny}>
        {detail.nextLeague ? `${detail.pointsToNext} pts para ${LEAGUE_LABEL[detail.nextLeague]}` : 'Liga maxima atingida'}
      </Text>
    </Card>
  );
}
