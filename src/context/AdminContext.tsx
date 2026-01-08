// src/context/AdminContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { TestSummaryResponse } from '@/types/exam';
import { getTests } from '@/services/examService';

interface AdminContextValue {
  tests: TestSummaryResponse[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tests, setTests] = useState<TestSummaryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getTests();
      setTests(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const value: AdminContextValue = {
    tests,
    loading,
    refresh: load,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export function useAdminContext() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdminContext must be used within AdminProvider');
  return ctx;
}
