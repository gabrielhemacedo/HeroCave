import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAuthListener } from '@/features/auth/useAuthListener';
import { queryClient } from '@/lib/queryClient';
import { colors } from '@/theme';

export default function RootLayout() {
  useAuthListener();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.backgroundPrimary },
          }}
        />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
