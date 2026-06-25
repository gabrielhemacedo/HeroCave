import { Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';
import type { RarityKey } from '@/theme';

const RARITY_LABEL: Record<RarityKey, string> = {
  comum: 'Comum',
  rara: 'Rara',
  epica: 'Epica',
  lendaria: 'Lendaria',
};

export function Badge({ rarity, locked }: { rarity: RarityKey; locked?: boolean }) {
  const color = colors.rarity[rarity];

  return (
    <View
      style={{
        borderRadius: radius.pill,
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        backgroundColor: locked ? colors.backgroundCardElevated : `${color}26`,
        borderWidth: 1,
        borderColor: locked ? colors.border : color,
        alignSelf: 'flex-start',
      }}
    >
      <Text style={[typography.tiny, { color: locked ? colors.textMuted : color }]}>
        {locked ? 'Bloqueada' : RARITY_LABEL[rarity]}
      </Text>
    </View>
  );
}
