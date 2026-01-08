// src/hooks/useAuth.ts
import { useAuthContext } from '@/context/AuthContext';

export function useAuth() {
  const { user, loading, refresh, logout } = useAuthContext();
  const isAdmin = user?.role === 'ADMIN';
  const isStudent = user?.role === 'STUDENT';

  return { user, loading, isAdmin, isStudent, refresh, logout };
}
