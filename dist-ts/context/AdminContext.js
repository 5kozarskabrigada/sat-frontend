import { jsx as _jsx } from "react/jsx-runtime";
// src/context/AdminContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { getTests } from '../services/examService';
const AdminContext = createContext(undefined);
export const AdminProvider = ({ children }) => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const load = async () => {
        setLoading(true);
        try {
            const data = await getTests();
            setTests(data);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        void load();
    }, []);
    const value = {
        tests,
        loading,
        refresh: load,
    };
    return _jsx(AdminContext.Provider, { value: value, children: children });
};
export function useAdminContext() {
    const ctx = useContext(AdminContext);
    if (!ctx)
        throw new Error('useAdminContext must be used within AdminProvider');
    return ctx;
}
