// src/utils/securityUtils.ts
export function requireFullscreen() {
    if (!document.fullscreenElement) {
        return document.documentElement.requestFullscreen();
    }
    return Promise.resolve();
}
