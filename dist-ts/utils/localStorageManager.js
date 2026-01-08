// src/utils/localStorageManager.ts
export function loadJSON(key) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw)
            return null;
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
export function saveJSON(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch {
        // ignore
    }
}
export function removeItem(key) {
    localStorage.removeItem(key);
}
