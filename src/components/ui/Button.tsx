import { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleProp, Text, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, radius, spacing, typography } from '@/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Button({ label, onPress, variant = 'primary', disabled, loading, icon, style }: ButtonProps) {
  const isDisabled = disabled || loading;

  const content = (
    <>
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? colors.blue : colors.backgroundPrimary} />
      ) : (
        <>
          {icon}
          <Text
            style={{
              ...typography.bodyStrong,
              color: variant === 'secondary' || variant === 'ghost' ? colors.textPrimary : colors.backgroundPrimary,
            }}
          >
            {label}
          </Text>
        </>
      )}
    </>
  );

  const baseStyle: ViewStyle = {
    height: 52,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    opacity: isDisabled ? 0.5 : 1,
  };

  if (variant === 'primary') {
    return (
      <Pressable onPress={onPress} disabled={isDisabled} style={style}>
        <LinearGradient colors={[colors.blue, colors.purple]} style={baseStyle}>
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[
        baseStyle,
        {
          backgroundColor: variant === 'secondary' ? colors.backgroundCardElevated : 'transparent',
          borderWidth: variant === 'ghost' ? 1 : 0,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {content}
    </Pressable>
  );
}
