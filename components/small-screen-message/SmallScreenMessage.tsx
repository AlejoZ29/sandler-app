'use client';
import React, { useState, useEffect } from 'react';

interface SmallScreenMessageProps {
  showMessage?: boolean;
}

export const SmallScreenMessage: React.FC<SmallScreenMessageProps> = ({
  showMessage = true 
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const small = window.innerWidth < 1366;
      setIsSmallScreen(small);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!isSmallScreen || !showMessage) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div 
        className="relative w-full h-full shadow-2xl border border-yellow-400/30"
        style={{
          background: 'linear-gradient(to right, #010204, #214457, #0C1115)'
        }}
      >
        <div className="flex items-center justify-center h-full p-8">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-yellow-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <h2 className="text-2xl font-bold text-white mb-4">Mejor experiencia en pantallas grandes</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Para disfrutar de la mejor experiencia visual, te recomendamos usar minimo una pantalla de computadora.
              </p>
            </div>
            
            <div className="text-yellow-400 text-sm">
              Esta pantalla solo desaparecerá cuando uses una pantalla más grande
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
