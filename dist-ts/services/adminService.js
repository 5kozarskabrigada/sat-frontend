// src/services/adminService.ts
import { apiFetch } from '@/services/api';
export function createStudent(body) {
    return apiFetch('/admin/students', {
        method: 'POST',
        body: JSON.stringify(body),
    });
}
