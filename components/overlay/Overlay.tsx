'use client';
import React from 'react';

interface OverlayProps {
  overlayEnabled: boolean;
  isPressed: boolean;
}

export const Overlay: React.FC<OverlayProps> = ({
  overlayEnabled,
  isPressed
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-[999] transition-opacity duration-300 ease-in-out ${
        overlayEnabled && isPressed ? 'opacity-60' : 'opacity-0'
      }`}
      style={{
        background: 'linear-gradient(to right, #010204, #214457, #0C1115)'
      }}
    />
  );
};