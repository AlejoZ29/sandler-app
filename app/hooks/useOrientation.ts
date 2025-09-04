'use client';

import { useState, useEffect } from 'react';

type Orientation = 'portrait' | 'landscape';

interface UseOrientationReturn {
  orientation: Orientation;
  isMobile: boolean;
  isPortraitMobile: boolean;
}

export const useOrientation = (): UseOrientationReturn => {
  const [orientation, setOrientation] = useState<Orientation>('landscape');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      if (typeof window !== 'undefined') {
        const isPortrait = window.innerHeight > window.innerWidth;
        setOrientation(isPortrait ? 'portrait' : 'landscape');
        
        // Detectar si es móvil basado en el tamaño de pantalla
        const isMobileDevice = window.innerWidth <= 768;
        setIsMobile(isMobileDevice);
      }
    };

    // Llamada inicial
    updateOrientation();

    // Escuchar cambios de orientación
    window.addEventListener('resize', updateOrientation);
    window.addEventListener('orientationchange', updateOrientation);

    return () => {
      window.removeEventListener('resize', updateOrientation);
      window.removeEventListener('orientationchange', updateOrientation);
    };
  }, []);

  const isPortraitMobile = isMobile && orientation === 'portrait';

  return {
    orientation,
    isMobile,
    isPortraitMobile,
  };
};
