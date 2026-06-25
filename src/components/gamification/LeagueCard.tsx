import { Text, View } from 'react-native';

import { Pill, ProgressBar } from '@/components/ui';
import { colors, radius, spacing, typography } from '@/theme';
import { LEAGUE_LABEL, leagueProgressDetail } from '@/utils/xpEngine';

type LeagueCardProps = {
  label: string;
  progressPoints: number;
  disabled?: boolean;
};

export function LeagueCard({ label, progressPoints, disabled }: LeagueCardProps) {
  const detail = leagueProgressDetail(progressPoints);
  const leagueColor = disabled ? colors.textMuted : colors.league[detail.league];

  return (
    <View
      style={{
        flexBasis: '47%',
        flexGrow: 1,
        backgroundColor: colors.backgroundCard,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.md,
        gap: spacing.xs,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Text style={typography.bodyStrong}>{label}</Text>
      <Pill color={leagueColor}>{LEAGUE_LABEL[detail.league]}</Pill>
      <ProgressBar progress={detail.progress} height={6} fillColors={[leagueColor, leagueColor]} />
      {disabled && <Text style={typography.tiny}>Em breve</Text>}
    </View>
  );
}
