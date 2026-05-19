import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { usePageScrollProgress } from '../hooks/usePageScrollProgress';

const UniverseContext = createContext(null);

export function UniverseProvider({ children }) {
  const scrollProgress = usePageScrollProgress();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [quality, setQuality] = useState('high');
  const focusProjectRef = useRef(null);

  const registerFocusProject = useCallback((fn) => {
    focusProjectRef.current = fn;
    return () => {
      focusProjectRef.current = null;
    };
  }, []);

  const focusProject = useCallback((id) => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => focusProjectRef.current?.(id), 400);
  }, []);

  const value = useMemo(
    () => ({
      scrollProgress,
      mouseRef,
      quality,
      setQuality,
      focusProject,
      registerFocusProject,
    }),
    [scrollProgress, quality, focusProject, registerFocusProject],
  );

  return <UniverseContext.Provider value={value}>{children}</UniverseContext.Provider>;
}

export function useUniverse() {
  const ctx = useContext(UniverseContext);
  if (!ctx) throw new Error('useUniverse must be used within UniverseProvider');
  return ctx;
}
