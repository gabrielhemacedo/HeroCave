import { Pressable, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

type Option = { value: string; label: string };

type OptionChipsProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export function OptionChips({ options, value, onChange }: OptionChipsProps) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={{
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.sm,
              borderRadius: radius.pill,
              backgroundColor: selected ? colors.blue : colors.backgroundCardElevated,
              borderWidth: 1,
              borderColor: selected ? colors.blue : colors.border,
            }}
          >
            <Text style={[typography.caption, { color: selected ? colors.backgroundPrimary : colors.textSecondary }]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
