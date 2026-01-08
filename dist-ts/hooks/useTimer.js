// src/hooks/useTimer.ts
import { useEffect, useState } from 'react';
export function useTimer({ initialSeconds, onExpire }) {
    const [remaining, setRemaining] = useState(initialSeconds);
    useEffect(() => {
        setRemaining(initialSeconds);
    }, [initialSeconds]);
    useEffect(() => {
        if (remaining <= 0) {
            onExpire();
            return;
        }
        const id = setInterval(() => {
            setRemaining((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(id);
    }, [remaining, onExpire]);
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    return {
        remaining,
        minutes,
        seconds,
    };
}
