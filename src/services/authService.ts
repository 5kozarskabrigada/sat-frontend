// src/services/authService.ts
import { apiFetch } from './api';
import type {
  AuthResponse,
  MeResponse,
  RegisterRequest,
  LoginRequest,
} from '@/types/auth';

const AUTH_PREFIX = '/auth';

export function register(request: RegisterRequest): Promise<AuthResponse> {
  return apiFetch<AuthResponse>(`${AUTH_PREFIX}/register`, {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export function login(request: LoginRequest): Promise<AuthResponse> {
  return apiFetch<AuthResponse>(`${AUTH_PREFIX}/login`, {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export function getMe(): Promise<MeResponse> {
  return apiFetch<MeResponse>(`${AUTH_PREFIX}/me`, {
    method: 'GET',
  });
}

export function logout(): Promise<void> {
  return apiFetch<void>(`${AUTH_PREFIX}/logout`, {
    method: 'POST',
  });
}
