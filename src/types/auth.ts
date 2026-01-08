export interface RegisterRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  userId: string;
  token: string;
  role: 'STUDENT' | 'ADMIN';
}

export interface MeResponse {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  role: 'STUDENT' | 'ADMIN';
}
