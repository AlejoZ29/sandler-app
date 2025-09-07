'use client';
import React from 'react';

interface ControlButtonsProps {
  isMuted: boolean;
  overlayEnabled: boolean;
  onToggleMute: () => void;
  onToggleOverlay: () => void;
  onResetCounter: () => void;
}

export const ControlButtons: React.FC<ControlButtonsProps> = ({
  isMuted,
  overlayEnabled,
  onToggleMute,
  onToggleOverlay,
  onResetCounter
}) => {
  // Check if route protection is disabled (development mode)
  const isDevMode = process.env.NEXT_PUBLIC_DISABLE_ROUTE_PROTECTION === 'true';

  return (
    <div className="fixed bottom-0 lg:bottom-6 right-6 flex gap-3 z-[40] mr-32 2xl:mr-50 scale-70 lg:scale-100">
      {/* Mute/Unmute Button */}
      <button
        onClick={onToggleMute}
        className="w-10 h-10 xl:w-14 xl:h-14 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-yellow-400/50 hover:border-yellow-400"
      >
        {isMuted ? (
          <svg className="w-4 h-4 xl:w-6 xl:h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 xl:w-6 xl:h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>

      {/* Overlay Toggle Button */}
      <button
        onClick={onToggleOverlay}
        className="w-10 h-10 xl:w-14 xl:h-14 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-yellow-400/50 hover:border-yellow-400"
      >
        {overlayEnabled ? (
          <svg className="w-4 h-4 xl:w-6 xl:h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 xl:w-6 xl:h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
          </svg>
        )}
      </button>

      {/* Reset Counter Button - Only available in development mode */}
      {isDevMode && (
        <button
          onClick={onResetCounter}
          className="w-10 h-10 xl:w-14 xl:h-14 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-yellow-400/50 hover:border-yellow-400"
        >
          <svg className="w-4 h-4 xl:w-6 xl:h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
          </svg>
        </button>
      )}
    </div>
  );
};