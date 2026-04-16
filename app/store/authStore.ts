import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  createdAt?: string;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, name: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'login', email, password }),
          });
          const data = await res.json();
          if (!res.ok) {
            set({ error: data.error || 'Login failed', isLoading: false });
            return false;
          }
          set({ user: data, isLoading: false, error: null });
          return true;
        } catch {
          set({ error: 'Network error. Please try again.', isLoading: false });
          return false;
        }
      },

      register: async (email: string, name: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'register', email, name, password }),
          });
          const data = await res.json();
          if (!res.ok) {
            set({ error: data.error || 'Registration failed', isLoading: false });
            return false;
          }
          set({ user: data, isLoading: false, error: null });
          return true;
        } catch {
          set({ error: 'Network error. Please try again.', isLoading: false });
          return false;
        }
      },

      logout: () => set({ user: null, error: null }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'hombox-auth-storage',
      // Only persist the user, not loading/error state
      partialize: (state) => ({ user: state.user }),
    }
  )
);
