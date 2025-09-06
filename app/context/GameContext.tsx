'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameContextType {
  clickedImages: Set<string>;
  totalImages: number;
  handleImageClick: (imageName: string) => void;
  congratsModalOpen: boolean;
  openCongratsModal: () => void;
  closeCongratsModal: () => void;
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
  const [congratsModalOpen, setCongratsModalOpen] = useState(false);
  const totalImages = 19;

  useEffect(() => {
    const savedImages = localStorage.getItem('clickedImages');
    if (savedImages) {
      setClickedImages(new Set(JSON.parse(savedImages)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clickedImages', JSON.stringify(Array.from(clickedImages)));
  }, [clickedImages]);

  const handleImageClick = (imageName: string) => {
    if (imageName === 'RESET_ALL') {
      setClickedImages(new Set());
      return;
    }
    
    setClickedImages(prev => {
      const newSet = new Set(prev);
      if (!newSet.has(imageName)) {
        newSet.add(imageName);
      }
      return newSet;
    });
  };

  const openCongratsModal = () => setCongratsModalOpen(true);
  const closeCongratsModal = () => setCongratsModalOpen(false);

  return (
    <GameContext.Provider value={{
      clickedImages,
      totalImages,
      handleImageClick,
      congratsModalOpen,
      openCongratsModal,
      closeCongratsModal
    }}>
      {children}
    </GameContext.Provider>
  );
};