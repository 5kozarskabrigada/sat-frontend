// src/services/api.ts
import axios, { type InternalAxiosRequestConfig } from 'axios';
import { supabase } from './supabaseClient';

const apiBase = import.meta.env.VITE_API_BASE || '/api';

export const api = axios.create({
  baseURL: apiBase,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (token) {
      // preserve existing AxiosHeaders object
      config.headers = config.headers ?? {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
);



// src/services/api.ts
export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include', // critical so sat_jwt cookie is sent
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }

  // For 204/empty responses, avoid JSON parse error
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}
