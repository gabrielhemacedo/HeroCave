import { colors } from './colors';

export const typography = {
  display: { fontSize: 30, fontWeight: '800' as const, color: colors.textPrimary },
  title: { fontSize: 22, fontWeight: '700' as const, color: colors.textPrimary },
  heading: { fontSize: 18, fontWeight: '700' as const, color: colors.textPrimary },
  body: { fontSize: 15, fontWeight: '400' as const, color: colors.textPrimary },
  bodyStrong: { fontSize: 15, fontWeight: '600' as const, color: colors.textPrimary },
  caption: { fontSize: 13, fontWeight: '500' as const, color: colors.textSecondary },
  tiny: { fontSize: 11, fontWeight: '600' as const, color: colors.textMuted },
} as const;
