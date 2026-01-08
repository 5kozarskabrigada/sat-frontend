// src/hooks/useLocalStorage.ts
import { useEffect, useState } from 'react';
export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item != null) {
                return JSON.parse(item);
            }
        }
        catch {
            // ignore
        }
        return initialValue;
    });
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
        catch {
            // ignore
        }
    }, [key, value]);
    return [value, setValue];
}
