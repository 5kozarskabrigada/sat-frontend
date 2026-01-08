// src/services/authService.ts
import { api } from './api';
import { supabase } from './supabaseClient';
import type { AuthResponse, MeResponse, RegisterRequest, LoginRequest } from '../types/auth';

const AUTH_PREFIX = '/auth';

export async function register(request: RegisterRequest): Promise<AuthResponse> {

  const { error } = await supabase.auth.signUp({
    email: request.email,
    password: request.password,
    options: {
      data: {
        name: request.name,
        phone: request.phone,
      },
    },
  });

  if (error) throw error;


  // 2. Call backend to sync local user + token if needed
  const res = await api.post<AuthResponse>(`${AUTH_PREFIX}/register`, {
    name: request.name,
    phone: request.phone,
    email: request.email,
  });

  return res.data;
}

export async function login(request: LoginRequest): Promise<AuthResponse> {

  const { error } = await supabase.auth.signInWithPassword({
    email: request.email,
    password: request.password,
  });

  if (error) throw error;


  const res = await api.post<AuthResponse>(`${AUTH_PREFIX}/login`, {
    identifier: request.email,
    password: request.password,
  });

  return res.data;
}

export async function getMe(): Promise<MeResponse> {
  const res = await api.get<MeResponse>(`${AUTH_PREFIX}/me`);
  return res.data;
}

export async function logout(): Promise<void> {
  await supabase.auth.signOut();
}
