import { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { colors, radius, spacing } from '@/theme';

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  elevated?: boolean;
};

export function Card({ children, style, elevated }: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: elevated ? colors.backgroundCardElevated : colors.backgroundCard,
          borderRadius: radius.lg,
          padding: spacing.lg,
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
