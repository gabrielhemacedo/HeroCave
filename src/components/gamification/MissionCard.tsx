import { Text, View } from 'react-native';

import { Card, Pill, ProgressBar } from '@/components/ui';
import { colors, spacing, typography } from '@/theme';
import type { MissionRow } from '@/types/database';

const TYPE_LABEL: Record<MissionRow['mission_type'], string> = {
  diaria: 'Diaria',
  semanal: 'Semanal',
  especial: 'Especial',
};

export function MissionCard({ mission }: { mission: MissionRow }) {
  return (
    <Card style={{ opacity: mission.completed ? 0.6 : 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, gap: spacing.xs }}>
          <Pill color={mission.completed ? colors.green : colors.blue}>
            {mission.completed ? 'Concluida' : TYPE_LABEL[mission.mission_type]}
          </Pill>
          <Text style={typography.bodyStrong}>{mission.title}</Text>
          {mission.description && <Text style={typography.caption}>{mission.description}</Text>}
        </View>
        <Text style={[typography.tiny, { color: colors.gold }]}>+{mission.xp_reward} XP</Text>
      </View>
      <View style={{ marginTop: spacing.sm, gap: spacing.xs }}>
        <ProgressBar progress={mission.progress_current / mission.progress_target} height={8} />
        <Text style={typography.tiny}>
          {mission.progress_current}/{mission.progress_target}
        </Text>
      </View>
    </Card>
  );
}
