import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Badge, Card } from '@/components/ui';
import { colors, spacing, typography } from '@/theme';
import type { AchievementRow } from '@/types/database';

const ICON_BY_KEY: Record<string, keyof typeof Ionicons.glyphMap> = {
  dumbbell: 'barbell',
  flame: 'flame',
  shield: 'shield',
  crown: 'trophy',
};
const ICON_FALLBACK: keyof typeof Ionicons.glyphMap = 'trophy';

export function AchievementCard({ achievement, unlocked }: { achievement: AchievementRow; unlocked: boolean }) {
  const color = unlocked ? colors.rarity[achievement.rarity] : colors.textMuted;
  const iconName = (achievement.icon && ICON_BY_KEY[achievement.icon]) || ICON_FALLBACK;

  return (
    <Card style={{ flexBasis: '47%', flexGrow: 1, gap: spacing.xs, opacity: unlocked ? 1 : 0.55 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
        <Ionicons name={iconName} size={22} color={color} />
        <Badge rarity={achievement.rarity} locked={!unlocked} />
      </View>
      <Text style={typography.bodyStrong}>{achievement.title}</Text>
      {achievement.description && <Text style={typography.tiny}>{achievement.description}</Text>}
      <Text style={[typography.tiny, { color: colors.gold }]}>+{achievement.xp_bonus} XP</Text>
    </Card>
  );
}
