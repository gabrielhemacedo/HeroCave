import { Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';
import { Tori, ToriExpression } from './Tori';

type ToriMessageProps = {
  message: string;
  expression?: ToriExpression;
  size?: number;
};

export function ToriMessage({ message, expression = 'happy', size = 64 }: ToriMessageProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
      <Tori expression={expression} size={size} />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.backgroundCardElevated,
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          padding: spacing.md,
        }}
      >
        <Text style={typography.bodyStrong}>{message}</Text>
      </View>
    </View>
  );
}
