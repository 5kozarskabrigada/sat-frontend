// src/utils/securityUtils.ts
export function requireFullscreen(): Promise<void> {
  if (!document.fullscreenElement) {
    return document.documentElement.requestFullscreen();
  }
  return Promise.resolve();
}
