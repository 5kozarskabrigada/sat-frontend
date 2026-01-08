// src/utils/validators.ts
export function isValidAccessCode(code) {
    return /^[A-Z0-9]{6}$/.test(code.trim().toUpperCase());
}
export function isValidPhone(phone) {
    return /^\+?[0-9]{7,15}$/.test(phone.replace(/\s+/g, ''));
}
