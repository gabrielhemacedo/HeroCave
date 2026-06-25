import { Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

export function StreakFlame({ days }: { days: number }) {
  const isActive = days > 0;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        backgroundColor: colors.backgroundCardElevated,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: radius.pill,
        borderWidth: 1,
        borderColor: isActive ? colors.orange : colors.border,
      }}
    >
      <Text style={{ fontSize: 16 }}>{isActive ? '\u{1F525}' : '\u{1F9CA}'}</Text>
      <Text style={[typography.bodyStrong, { color: isActive ? colors.orange : colors.textMuted }]}>{days}</Text>
    </View>
  );
}
