// src/services/api.ts
import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://sat-backend-ftt2.onrender.com/api';

// Axios instance used by examService and useAPI
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send sat_jwt cookie
});

// Fetch-based helper used by authService (and anything else you prefer)
export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}
