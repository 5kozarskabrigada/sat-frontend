// src/services/api.ts
import axios from 'axios';
import { supabase } from './supabaseClient';
const apiBase = import.meta.env.VITE_API_BASE || '/api';
export const api = axios.create({
    baseURL: apiBase,
});
api.interceptors.request.use(async (config) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (token) {
        // preserve existing AxiosHeaders object
        config.headers = config.headers ?? {};
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});
