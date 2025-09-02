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
    <div
      className="page-home font-sans flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 relative bg-cover bg-center"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundImage: "url('/assets/background-main.jpg')" }}
    >
      {/* Movie Grid */}
      <MovieGrid
        clickedImages={clickedImages}
        overlayEnabled={overlayEnabled}
        isPressed={isPressed}
        onImageClick={handleLocalImageClick}
        onMouseEnter={playSound}
      />

      {/* Audio Player */}
      <AudioPlayer ref={audioPlayerRef} isMuted={isMuted} />

      {/* Control Buttons */}
      <ControlButtons
        isMuted={isMuted}
        overlayEnabled={overlayEnabled}
        onToggleMute={toggleMute}
        onToggleOverlay={toggleOverlay}
        onResetCounter={resetCounter}
      />

      {/* Overlay */}
      <Overlay overlayEnabled={overlayEnabled} isPressed={isPressed} />

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
