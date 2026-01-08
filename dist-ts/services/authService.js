// src/services/authService.ts
import { api } from './api';
import { supabase } from './supabaseClient';
const AUTH_PREFIX = '/auth';
export async function register(request) {
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
    if (error)
        throw error;
    // 2. Call backend to sync local user + token if needed
    const res = await api.post(`${AUTH_PREFIX}/register`, {
        name: request.name,
        phone: request.phone,
        email: request.email,
    });
    return res.data;
}
export async function login(request) {
    const { error } = await supabase.auth.signInWithPassword({
        email: request.email,
        password: request.password,
    });
    if (error)
        throw error;
    const res = await api.post(`${AUTH_PREFIX}/login`, {
        identifier: request.email,
        password: request.password,
    });
    return res.data;
}
export async function getMe() {
    const res = await api.get(`${AUTH_PREFIX}/me`);
    return res.data;
}
export async function logout() {
    await supabase.auth.signOut();
}
