import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  email: string;
  walletAddress: string;
  avatar: string;
  banner: string;
  bio: string;
  isVerified: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  solBalance: number | null;
  setAuth: (auth: Partial<AuthState>) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      solBalance: null,
      setAuth: (auth) =>
        set((state) => ({ ...state, ...auth, isAuthenticated: true })),
      clearAuth: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          solBalance: null,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
