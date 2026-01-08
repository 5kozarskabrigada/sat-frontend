// src/types/auth.ts
export interface RegisterRequest {
  name: string;
  phone: string;
  email?: string;
}

export interface LoginRequest {
  identifier: string; // phone or email for admins
  password: string;
}

export interface AuthResponse {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  role: 'STUDENT' | 'ADMIN';
  token: string;      // still returned, even though we mainly use cookie
}

export interface MeResponse {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  role: 'STUDENT' | 'ADMIN';
  createdAt: string;
  lastLoginAt?: string | null;
}
