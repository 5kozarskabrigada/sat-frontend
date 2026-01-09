import { jsx as _jsx } from "react/jsx-runtime";
// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, } from 'react';
import { getMe, logout as logoutApi } from '@/services/authService';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children, }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const refresh = async () => {
        try {
            const me = await getMe();
            setUser(me);
        }
        catch {
            setUser(null);
        }
    };
    useEffect(() => {
        (async () => {
            setLoading(true);
            await refresh();
            setLoading(false);
        })();
    }, []);
    const logout = async () => {
        try {
            await logoutApi();
        }
        finally {
            setUser(null);
        }
    };
    return (_jsx(AuthContext.Provider, { value: { user, loading, refresh, logout }, children: children }));
};
export function useAuthContext() {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error('useAuthContext must be used within AuthProvider');
    return ctx;
}
