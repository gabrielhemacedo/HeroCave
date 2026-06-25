import { ReactNode } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

type PillProps = {
  children: ReactNode;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function Pill({ children, color = colors.blue, style }: PillProps) {
  return (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          backgroundColor: `${color}26`,
          borderRadius: radius.pill,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.xs,
          borderWidth: 1,
          borderColor: color,
        },
        style,
      ]}
    >
      {typeof children === 'string' ? (
        <Text style={[typography.tiny, { color }]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}
