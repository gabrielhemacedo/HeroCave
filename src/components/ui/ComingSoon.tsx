import { Text, View } from 'react-native';

import { Tori, ToriExpression } from '@/components/mascot';
import { spacing, typography } from '@/theme';

type ComingSoonProps = {
  title: string;
  message: string;
  expression?: ToriExpression;
};

export function ComingSoon({ title, message, expression = 'happy' }: ComingSoonProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, paddingVertical: spacing.xl }}>
      <Tori expression={expression} size={120} />
      <Text style={typography.title}>{title}</Text>
      <Text style={[typography.caption, { textAlign: 'center' }]}>{message}</Text>
    </View>
  );
}
