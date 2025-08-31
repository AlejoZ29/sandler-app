'use client';
import type { Metadata } from 'next';
import React, { useState } from 'react'

export default function HomePage() {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  return (
    <div 
      className="page-home font-sans flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 relative"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={`fixed inset-0 pointer-events-none z-10 transition-opacity duration-300 ease-in-out ${
          isPressed ? 'opacity-40' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to right, #010204, #214457, #0C1115)'
        }}
      />
    </div>
  )
}
