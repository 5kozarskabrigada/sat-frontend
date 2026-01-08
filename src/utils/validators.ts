// src/utils/validators.ts
export function isValidAccessCode(code: string): boolean {
  return /^[A-Z0-9]{6}$/.test(code.trim().toUpperCase());
}

export function isValidPhone(phone: string): boolean {
  return /^\+?[0-9]{7,15}$/.test(phone.replace(/\s+/g, ''));
}
