'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameContextType {
  clickedImages: Set<string>;
  totalImages: number;
  handleImageClick: (imageName: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [clickedImages, setClickedImages] = useState<Set<string>>(new Set());
  const totalImages = 19;

  // Load clicked images from localStorage on component mount
  useEffect(() => {
    const savedImages = localStorage.getItem('clickedImages');
    if (savedImages) {
      setClickedImages(new Set(JSON.parse(savedImages)));
    }
  }, []);

  // Save clicked images to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('clickedImages', JSON.stringify(Array.from(clickedImages)));
  }, [clickedImages]);

  const handleImageClick = (imageName: string) => {
    console.log('Context handleImageClick called with:', imageName);
    
    // Handle reset signal
    if (imageName === 'RESET_ALL') {
      console.log('Resetting all images');
      setClickedImages(new Set());
      return;
    }
    
    setClickedImages(prev => {
      const newSet = new Set(prev);
      if (!newSet.has(imageName)) {
        newSet.add(imageName);
        console.log('Image added to set:', imageName);
      } else {
        console.log('Image already in set:', imageName);
      }
      console.log('New set size:', newSet.size);
      return newSet;
    });
  };

  return (
    <GameContext.Provider value={{
      clickedImages,
      totalImages,
      handleImageClick
    }}>
      {children}
    </GameContext.Provider>
  );
};
