import { useEffect } from 'react';

import { supabase } from '@/lib/supabase';
import { useSessionStore } from '@/store/sessionStore';

export function useAuthListener() {
  const setSession = useSessionStore((state) => state.setSession);
  const setInitializing = useSessionStore((state) => state.setInitializing);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setInitializing(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.subscription.unsubscribe();
  }, [setSession, setInitializing]);
}
