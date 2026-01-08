// src/services/adminService.ts
import { apiFetch } from '@/services/api';

export interface CreateStudentRequest {
  name: string;
  phone: string;
}

export interface CreateStudentResponse {
  userId: string;
  username: string;
  password: string;
}

export function createStudent(
  body: CreateStudentRequest,
): Promise<CreateStudentResponse> {
  return apiFetch<CreateStudentResponse>('/admin/students', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
