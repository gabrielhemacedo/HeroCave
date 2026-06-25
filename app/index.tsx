import { Redirect } from 'expo-router';
import { View } from 'react-native';

import { Tori } from '@/components/mascot';
import { useHeroProfile } from '@/features/hero/useHeroProfile';
import { useSessionStore } from '@/store/sessionStore';
import { colors } from '@/theme';

export default function Index() {
  const initializing = useSessionStore((state) => state.initializing);
  const session = useSessionStore((state) => state.session);
  const heroProfileQuery = useHeroProfile();

  if (initializing || (session && heroProfileQuery.isLoading)) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.backgroundPrimary }}>
        <Tori expression="happy" size={96} />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!heroProfileQuery.data) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  return <Redirect href="/(tabs)" />;
}
