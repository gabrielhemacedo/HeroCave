import { Text, TextInput, TextInputProps, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

type TextFieldProps = TextInputProps & {
  label: string;
};

export function TextField({ label, style, ...inputProps }: TextFieldProps) {
  return (
    <View style={{ gap: spacing.xs }}>
      <Text style={typography.caption}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[
          {
            height: 52,
            borderRadius: radius.md,
            paddingHorizontal: spacing.lg,
            backgroundColor: colors.backgroundCardElevated,
            borderWidth: 1,
            borderColor: colors.border,
            color: colors.textPrimary,
            fontSize: 15,
          },
          style,
        ]}
        {...inputProps}
      />
    </View>
  );
}
