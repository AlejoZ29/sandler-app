'use client';

import React from 'react';
import { useOrientation } from '../../app/hooks/useOrientation';

interface LandscapePromptProps {
  showPrompt?: boolean;
}

export const LandscapePrompt: React.FC<LandscapePromptProps> = ({ 
  showPrompt = true 
}) => {
  const { isPortraitMobile } = useOrientation();

  if (!showPrompt || !isPortraitMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center landscape-prompt">
      <div className="text-center text-white p-8 max-w-sm mx-4">

        <div className="mb-6 flex justify-center">
          <svg 
            width="80" 
            height="80" 
            viewBox="0 0 100 100" 
            className="text-yellow-400 animate-pulse"
            fill="currentColor"
          >
            <path d="M20 25h60v50H20z" stroke="currentColor" strokeWidth="2" fill="none" rx="5"/>
            <path d="M85 40v20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            <path d="M82 35l3 5 3-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M82 65l3-5 3 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="25" cy="30" r="2" fill="currentColor"/>
            <rect x="30" y="35" width="20" height="2" fill="currentColor"/>
            <rect x="30" y="40" width="15" height="2" fill="currentColor"/>
            <rect x="30" y="45" width="25" height="2" fill="currentColor"/>
          </svg>
        </div>
        

        <h2 className="text-2xl font-bold mb-4 text-yellow-400">
          ¡Mejor experiencia en horizontal!
        </h2>
        <p className="text-lg mb-4 opacity-90">
          Rota tu dispositivo para disfrutar de una experiencia óptima
        </p>
        

        <div className="flex justify-center items-center space-x-2 text-sm opacity-75">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            className="animate-spin text-yellow-400"
            fill="currentColor"
          >
            <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-5.07l-2.83 2.83M9.76 14.24l-2.83 2.83M17.07 17.07l-2.83-2.83M9.76 9.76L6.93 6.93"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LandscapePrompt;
