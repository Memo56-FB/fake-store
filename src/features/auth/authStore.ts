import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

interface AuthState {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = createStore<AuthState>()(
  persist(
    (set) => ({
      token: null,
      login: (token: string) => set({ token }),
      logout: () => set({ token: null }),
    }),
    {
      name: 'token', 
    }
  )
);
