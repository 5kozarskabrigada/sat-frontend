// src/hooks/useAPI.ts
import { useMemo } from 'react';
import { api } from '../services/api';

export function useAPI() {
  // In future you can add per-hook interceptors or base params here
  return useMemo(() => api, []);
}
