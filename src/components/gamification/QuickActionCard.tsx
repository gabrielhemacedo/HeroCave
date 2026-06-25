import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

type QuickActionCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  subtitle?: string;
  color?: string;
  onPress: () => void;
};

export function QuickActionCard({ icon, label, subtitle, color = colors.blue, onPress }: QuickActionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexBasis: '47%',
        flexGrow: 1,
        backgroundColor: colors.backgroundCard,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.lg,
        gap: spacing.sm,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: radius.md,
          backgroundColor: `${color}26`,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={typography.bodyStrong}>{label}</Text>
      {subtitle && <Text style={typography.caption}>{subtitle}</Text>}
    </Pressable>
  );
}
