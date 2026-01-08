import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { getMe, logout as logoutApi } from '../services/authService';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const refresh = async () => {
        try {
            const { data } = await supabase.auth.getSession();
            if (!data.session) {
                setUser(null);
                return;
            }
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
        const { data: sub } = supabase.auth.onAuthStateChange(async () => {
            await refresh();
        });
        return () => {
            sub.subscription.unsubscribe();
        };
    }, []);
    const logout = async () => {
        await logoutApi();
        setUser(null);
    };
    return (_jsx(AuthContext.Provider, { value: { user, loading, refresh, logout }, children: children }));
};
export function useAuthContext() {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error('useAuthContext must be used within AuthProvider');
    return ctx;
}
