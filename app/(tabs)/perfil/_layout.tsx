import { Stack } from 'expo-router';

import { colors } from '@/theme';

export default function PerfilLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.backgroundPrimary },
      }}
    />
  );
}
