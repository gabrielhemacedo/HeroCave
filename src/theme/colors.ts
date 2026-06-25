export const colors = {
  backgroundPrimary: '#09061A',
  backgroundSecondary: '#131026',
  backgroundCard: '#1B1733',
  backgroundCardElevated: '#221D40',

  blue: '#43B3FF',
  purple: '#8B5CFF',
  green: '#33D17A',
  orange: '#FF8A1F',
  gold: '#FFC83D',
  red: '#FF5B5B',

  textPrimary: '#F8F9FC',
  textSecondary: '#B9B8C7',
  textMuted: '#75728F',

  border: '#2A2547',
  overlay: 'rgba(9, 6, 26, 0.72)',

  league: {
    madeira: '#9C7A52',
    bronze: '#C97B3D',
    prata: '#C7CEDB',
    ouro: '#FFC83D',
    platina: '#7FE9D6',
    diamante: '#5FC8FF',
    mestre: '#B07CFF',
    lendaria: '#FF5BA8',
  },

  rarity: {
    comum: '#9CA3B8',
    rara: '#43B3FF',
    epica: '#8B5CFF',
    lendaria: '#FFC83D',
  },
} as const;

export type LeagueKey = keyof typeof colors.league;
export type RarityKey = keyof typeof colors.rarity;
