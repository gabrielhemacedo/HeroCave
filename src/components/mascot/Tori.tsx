import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, Stop } from 'react-native-svg';

import { colors } from '@/theme';

export type ToriExpression = 'happy' | 'proud' | 'cheering' | 'worried' | 'levelup';

type ToriProps = {
  expression?: ToriExpression;
  size?: number;
};

const EXPRESSION_CONFIG: Record<
  ToriExpression,
  { mouth: string; pupilDy: number; armsUp: boolean; sparkles: boolean; sweatDrop: boolean; browsUp: boolean }
> = {
  happy: { mouth: 'M46 80 Q60 92 74 80', pupilDy: 0, armsUp: false, sparkles: false, sweatDrop: false, browsUp: false },
  proud: { mouth: 'M48 82 Q60 88 72 80', pupilDy: -1, armsUp: false, sparkles: false, sweatDrop: false, browsUp: true },
  cheering: {
    mouth: 'M50 78 Q60 94 70 78 Q60 86 50 78',
    pupilDy: -1,
    armsUp: true,
    sparkles: true,
    sweatDrop: false,
    browsUp: true,
  },
  worried: { mouth: 'M48 85 Q60 79 72 85', pupilDy: 1, armsUp: false, sparkles: false, sweatDrop: true, browsUp: false },
  levelup: {
    mouth: 'M48 76 Q60 96 72 76 Q60 90 48 76',
    pupilDy: -1,
    armsUp: true,
    sparkles: true,
    sweatDrop: false,
    browsUp: true,
  },
};

function Sparkle({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <Path
      d="M0 -6 L1.6 -1.6 L6 0 L1.6 1.6 L0 6 L-1.6 1.6 L-6 0 L-1.6 -1.6 Z"
      fill={colors.gold}
      transform={`translate(${x} ${y}) scale(${scale})`}
    />
  );
}

export function Tori({ expression = 'happy', size = 120 }: ToriProps) {
  const cfg = EXPRESSION_CONFIG[expression];

  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        <LinearGradient id="toriBody" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={colors.blue} />
          <Stop offset="1" stopColor={colors.purple} />
        </LinearGradient>
      </Defs>

      {/* tail */}
      <Path d="M90 84 Q106 90 101 74 Q97 81 90 84 Z" fill="url(#toriBody)" />

      {/* legs */}
      <Ellipse cx="40" cy="103" rx="10" ry="6" fill="url(#toriBody)" />
      <Ellipse cx="80" cy="103" rx="10" ry="6" fill="url(#toriBody)" />

      {/* arms (raised only for cheering / levelup) */}
      {cfg.armsUp ? (
        <>
          <Ellipse cx="16" cy="58" rx="8" ry="5" fill="url(#toriBody)" transform="rotate(-40 16 58)" />
          <Ellipse cx="104" cy="58" rx="8" ry="5" fill="url(#toriBody)" transform="rotate(40 104 58)" />
        </>
      ) : (
        <>
          <Ellipse cx="20" cy="80" rx="8" ry="5" fill="url(#toriBody)" transform="rotate(20 20 80)" />
          <Ellipse cx="100" cy="80" rx="8" ry="5" fill="url(#toriBody)" transform="rotate(-20 100 80)" />
        </>
      )}

      {/* gills */}
      {[-1, 1].map((side) =>
        [0, 1, 2].map((i) => (
          <Ellipse
            key={`${side}-${i}`}
            cx={side === -1 ? 16 : 104}
            cy={38 + i * 9}
            rx="7"
            ry="3"
            fill={colors.gold}
            opacity={0.85}
            transform={`rotate(${side === -1 ? -25 + i * 8 : 25 - i * 8} ${side === -1 ? 16 : 104} ${38 + i * 9})`}
          />
        ))
      )}

      {/* body */}
      <Ellipse cx="60" cy="64" rx="46" ry="42" fill="url(#toriBody)" />

      {/* belly */}
      <Ellipse cx="60" cy="78" rx="25" ry="19" fill={colors.backgroundPrimary} opacity={0.18} />

      {/* cheeks */}
      <Circle cx="33" cy="70" r="5" fill={colors.orange} opacity={0.35} />
      <Circle cx="87" cy="70" r="5" fill={colors.orange} opacity={0.35} />

      {/* brows */}
      {cfg.browsUp && (
        <>
          <Path d="M34 44 Q44 38 52 44" stroke={colors.backgroundPrimary} strokeWidth={2.5} fill="none" strokeLinecap="round" />
          <Path d="M68 44 Q76 38 86 44" stroke={colors.backgroundPrimary} strokeWidth={2.5} fill="none" strokeLinecap="round" />
        </>
      )}

      {/* eyes */}
      <Ellipse cx="44" cy="58" rx="11" ry="13" fill="#FFFFFF" />
      <Ellipse cx="76" cy="58" rx="11" ry="13" fill="#FFFFFF" />
      <Circle cx="44" cy={58 + cfg.pupilDy} r="5" fill={colors.backgroundPrimary} />
      <Circle cx="76" cy={58 + cfg.pupilDy} r="5" fill={colors.backgroundPrimary} />

      {/* mouth */}
      <Path d={cfg.mouth} stroke={colors.backgroundPrimary} strokeWidth={3} fill="none" strokeLinecap="round" />

      {/* sweat drop */}
      {cfg.sweatDrop && (
        <Path d="M92 40 Q98 50 92 54 Q86 50 92 40 Z" fill={colors.blue} opacity={0.8} />
      )}

      {/* sparkles */}
      {cfg.sparkles && (
        <>
          <Sparkle x={18} y={20} scale={0.9} />
          <Sparkle x={104} y={24} scale={0.7} />
          <Sparkle x={60} y={10} scale={1.1} />
        </>
      )}
    </Svg>
  );
}
