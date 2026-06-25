import { Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';
import { ProgressBar } from './ProgressBar';

type XPBarProps = {
  level: number;
  currentXp: number;
  xpToNextLevel: number;
};

export function XPBar({ level, currentXp, xpToNextLevel }: XPBarProps) {
  return (
    <View style={{ flex: 1, gap: spacing.xs }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={typography.tiny}>NIVEL {level}</Text>
        <Text style={typography.tiny}>
          {currentXp}/{xpToNextLevel} XP
        </Text>
      </View>
      <ProgressBar progress={currentXp / xpToNextLevel} fillColors={[colors.blue, colors.purple]} />
    </View>
  );
}
