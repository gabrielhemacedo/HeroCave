import { Stack } from 'expo-router';

import { colors } from '@/theme';

export default function TreinoLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.backgroundPrimary },
      }}
    />
  );
}
