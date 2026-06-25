import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, radius } from '@/theme';

type ProgressBarProps = {
  progress: number;
  height?: number;
  trackColor?: string;
  fillColors?: [string, string];
};

export function ProgressBar({
  progress,
  height = 12,
  trackColor = colors.backgroundCardElevated,
  fillColors = [colors.blue, colors.purple],
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <View
      style={{
        height,
        borderRadius: radius.pill,
        backgroundColor: trackColor,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <LinearGradient
        colors={fillColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ width: `${clamped * 100}%`, height: '100%', borderRadius: radius.pill }}
      />
    </View>
  );
}
