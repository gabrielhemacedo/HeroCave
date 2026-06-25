import { Text, View } from 'react-native';

import { StreakFlame, XPBar } from '@/components/ui';
import { colors, radius, spacing, typography } from '@/theme';
import { xpToReachLevel } from '@/utils/xpEngine';
import type { HeroProfileRow } from '@/types/database';

export function HeroTopBar({ profile }: { profile: HeroProfileRow }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: radius.pill,
          backgroundColor: colors.backgroundCardElevated,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: colors.purple,
        }}
      >
        <Text style={{ fontSize: 20 }}>{'\u{1F9B8}'}</Text>
      </View>

      <XPBar level={profile.level} currentXp={profile.current_xp} xpToNextLevel={xpToReachLevel(profile.level)} />

      <StreakFlame days={profile.streak_days} />

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Text style={{ fontSize: 14 }}>{'\u{1FA99}'}</Text>
        <Text style={typography.bodyStrong}>{profile.coins}</Text>
      </View>
    </View>
  );
}
