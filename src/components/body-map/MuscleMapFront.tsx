import Svg, { Circle, Ellipse, Rect } from 'react-native-svg';

import { colors as theme } from '@/theme';
import type { MuscleGroup } from '@/types/database';

type MuscleMapProps = {
  colors: Partial<Record<MuscleGroup, string>>;
  size?: number;
};

const NEUTRAL = theme.backgroundCardElevated;

export function MuscleMapFront({ colors: groupColors, size = 180 }: MuscleMapProps) {
  const color = (group: MuscleGroup) => groupColors[group] ?? NEUTRAL;

  return (
    <Svg width={size} height={size * 1.6} viewBox="0 0 160 300">
      <Circle cx="80" cy="30" r="22" fill={NEUTRAL} stroke={theme.border} strokeWidth={1.5} />
      <Rect x="72" y="48" width="16" height="14" fill={NEUTRAL} />

      <Ellipse cx="34" cy="80" rx="18" ry="15" fill={color('ombros')} stroke={theme.border} strokeWidth={1} />
      <Ellipse cx="126" cy="80" rx="18" ry="15" fill={color('ombros')} stroke={theme.border} strokeWidth={1} />

      <Rect x="12" y="70" width="22" height="108" rx="11" fill={color('bracos')} stroke={theme.border} strokeWidth={1} />
      <Rect x="126" y="70" width="22" height="108" rx="11" fill={color('bracos')} stroke={theme.border} strokeWidth={1} />

      <Rect x="46" y="66" width="68" height="48" rx="18" fill={color('peitorais')} stroke={theme.border} strokeWidth={1} />
      <Rect x="52" y="110" width="56" height="50" rx="14" fill={color('abdomen')} stroke={theme.border} strokeWidth={1} />

      <Rect x="50" y="156" width="60" height="20" rx="10" fill={NEUTRAL} />

      <Rect x="44" y="172" width="28" height="118" rx="14" fill={color('pernas')} stroke={theme.border} strokeWidth={1} />
      <Rect x="88" y="172" width="28" height="118" rx="14" fill={color('pernas')} stroke={theme.border} strokeWidth={1} />
    </Svg>
  );
}
