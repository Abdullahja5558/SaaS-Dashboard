import { User } from './types';

const SESSION_KEY = 'sb_session';

export const auth = {
  setSession: (user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    }
  },
  getSession: (): User | null => {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem(SESSION_KEY);
      return session ? JSON.parse(session) : null;
    }
    return null;
  },
  clearSession: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SESSION_KEY);
    }
  },
  isAuthenticated: (): boolean => {
    return auth.getSession() !== null;
  }
};
