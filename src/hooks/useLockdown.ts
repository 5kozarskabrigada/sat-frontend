// src/hooks/useLockdown.ts
import { useEffect, useState } from 'react';

interface UseLockdownOptions {
  onViolation?: (type: 'BLUR' | 'VISIBILITY' | 'FULLSCREEN_EXIT') => void;
}

export function useLockdown({ onViolation }: UseLockdownOptions = {}) {
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(
    !!document.fullscreenElement,
  );

  useEffect(() => {
    const handleBlur = () => {
      setIsWindowFocused(false);
      onViolation?.('BLUR');
    };
    const handleFocus = () => setIsWindowFocused(true);

    const handleVisibility = () => {
      const visible = document.visibilityState === 'visible';
      setIsDocumentVisible(visible);
      if (!visible) onViolation?.('VISIBILITY');
    };

    const handleFullscreenChange = () => {
      const fs = !!document.fullscreenElement;
      setIsFullscreen(fs);
      if (!fs) onViolation?.('FULLSCREEN_EXIT');
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [onViolation]);

  return {
    isWindowFocused,
    isDocumentVisible,
    isFullscreen,
  };
}
