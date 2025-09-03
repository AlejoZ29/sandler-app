'use client';
import React, { useState, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import { 
  MovieGrid, 
  ControlButtons, 
  MovieModal, 
  Overlay, 
  AudioPlayer,
  AudioPlayerRef 
} from '@/components';

export default function HomePage() {
  const [overlayEnabled, setOverlayEnabled] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const audioPlayerRef = useRef<AudioPlayerRef>(null);
  const { clickedImages, totalImages, handleImageClick } = useGame();

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only activate overlay if it's enabled and clicking on the background
    if (overlayEnabled && e.target === e.currentTarget) {
      console.log('Overlay activated');
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const toggleOverlay = () => {
    setOverlayEnabled(!overlayEnabled);
    if (!overlayEnabled) {
      // If enabling overlay, also show it immediately for testing
      setIsPressed(true);
      // Removed the automatic timeout - overlay will stay visible until manually hidden
    } else {
      setIsPressed(false);
    }
    console.log('Overlay enabled:', !overlayEnabled);
  };

  const playSound = () => {
    audioPlayerRef.current?.playSound();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleLocalImageClick = (imageName: string) => {
    handleImageClick(imageName);
    setSelectedMovie(imageName);
    setModalOpen(true);
  };

  const resetCounter = () => {
    localStorage.removeItem('clickedImages');
    handleImageClick('RESET_ALL');
  };

  const closeModal = (resetMovie = true) => {
    setModalOpen(false);
    if (resetMovie) {
      setSelectedMovie(null);
    }
  };

  const handleLearnMore = () => {
    // Esta función ya no es necesaria, el modal maneja internamente el cambio de vista
  };

  return (
    <div className="relative w-full h-screen overflow-x-auto overflow-y-hidden">
      {/* Background Container with Fixed Size */}
      <div
        className="relative w-[3000px] h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/background-main.jpg')" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Movie Grid - Fixed to Background */}
        <MovieGrid
          clickedImages={clickedImages}
          overlayEnabled={overlayEnabled}
          isPressed={isPressed}
          onImageClick={handleLocalImageClick}
          onMouseEnter={playSound}
        />

        {/* Overlay - Fixed to Background */}
        <Overlay overlayEnabled={overlayEnabled} isPressed={isPressed} />
      </div>

      {/* Fixed Controls - Above Everything */}
      <div className="fixed top-24 right-6 flex gap-3 z-[1000]">
        {/* Audio Player */}
        <AudioPlayer ref={audioPlayerRef} isMuted={isMuted} />
      </div>

      {/* Control Buttons - Fixed Position */}
      <ControlButtons
        isMuted={isMuted}
        overlayEnabled={overlayEnabled}
        onToggleMute={toggleMute}
        onToggleOverlay={toggleOverlay}
        onResetCounter={resetCounter}
      />

      {/* Movie Modal */}
      <MovieModal
        isOpen={modalOpen}
        selectedMovie={selectedMovie}
        clickedImages={clickedImages}
        totalImages={totalImages}
        onClose={closeModal}
        onLearnMore={handleLearnMore}
      />
    </div>
  );
}
