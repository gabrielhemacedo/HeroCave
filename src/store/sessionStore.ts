import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

type SessionState = {
  session: Session | null;
  initializing: boolean;
  setSession: (session: Session | null) => void;
  setInitializing: (initializing: boolean) => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  initializing: true,
  setSession: (session) => set({ session }),
  setInitializing: (initializing) => set({ initializing }),
}));
