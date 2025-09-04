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
    if (overlayEnabled && e.target === e.currentTarget) {
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
      setIsPressed(true);
    } else {
      setIsPressed(false);
    }
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


  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="relative w-full md:w-[3000px] h-full bg-home bg-cover bg-center bg-no-repeat"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <MovieGrid
          clickedImages={clickedImages}
          overlayEnabled={overlayEnabled}
          isPressed={isPressed}
          onImageClick={handleLocalImageClick}
          onMouseEnter={playSound}
        />

        <Overlay overlayEnabled={overlayEnabled} isPressed={isPressed} />
      </div>

      <div className="fixed top-24 right-6 flex gap-3 z-[1000]">
        {/* Audio Player */}
        <AudioPlayer ref={audioPlayerRef} isMuted={isMuted} />
      </div>

      <ControlButtons
        isMuted={isMuted}
        overlayEnabled={overlayEnabled}
        onToggleMute={toggleMute}
        onToggleOverlay={toggleOverlay}
        onResetCounter={resetCounter}
      />

      <MovieModal
        isOpen={modalOpen && clickedImages.size !== 10}
        selectedMovie={selectedMovie}
        clickedImages={clickedImages}
        totalImages={totalImages}
        onClose={closeModal}
      />
    </div>
  );
}
