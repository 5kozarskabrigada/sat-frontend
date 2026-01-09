// src/services/authService.ts
import { apiFetch } from './api';
const AUTH_PREFIX = '/auth';
export function register(request) {
    return apiFetch(`${AUTH_PREFIX}/register`, {
        method: 'POST',
        body: JSON.stringify(request),
    });
}
export function login(request) {
    return apiFetch(`${AUTH_PREFIX}/login`, {
        method: 'POST',
        body: JSON.stringify(request),
    });
}
export function getMe() {
    return apiFetch(`${AUTH_PREFIX}/me`, {
        method: 'GET',
    });
}
export function logout() {
    return apiFetch(`${AUTH_PREFIX}/logout`, {
        method: 'POST',
    });
}
