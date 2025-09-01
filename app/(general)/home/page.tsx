'use client';
import type { Metadata } from 'next';
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { useGame } from '../../context/GameContext';
import { Button } from '@/components';
import { Counter } from '@/components/counter/Counter';

export default function HomePage() {
  const [overlayEnabled, setOverlayEnabled] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
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
    if (audioRef.current && !isMuted) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
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

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMovie(null);
  };

  const handleLearnMore = () => {
    // Por ahora no hace nada
    console.log('Learn more clicked');
  };

  const ClickableImage = ({
    src,
    alt,
    imageName,
    className,
    width = 120,
    height = 120
  }: {
    src: string;
    alt: string;
    imageName: string;
    className: string;
    width?: number;
    height?: number;
  }) => {
    const isClicked = clickedImages.has(imageName);

    if (isClicked) {
      // Return a white circle with blur effect that's only visible when overlay is active
      return (
        <div
          className={`${className} transition-opacity duration-300 ease-in-out flex items-center justify-center ${overlayEnabled && isPressed ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            pointerEvents: 'none'
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.3)',
              border: '2px solid rgba(255, 255, 255, 0.5)',
            }}
          />
        </div>
      );
    }

    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} opacity-95 transition-all duration-300 cursor-pointer ${overlayEnabled && isPressed
          ? ''
          : 'hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00]'
          }`}
        onMouseEnter={overlayEnabled && isPressed ? undefined : playSound}
        onClick={(e) => {
          e.stopPropagation();
          handleLocalImageClick(imageName);
        }}
        priority
        style={{ pointerEvents: 'auto' }}
      />
    );
  };

  return (
    <div
      className="page-home font-sans flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 relative bg-cover bg-center"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundImage: "url('/assets/background-main.jpg')" }}
    >


      {/* Fixed positioned movie images */}
      <ClickableImage
        src="/assets/eightcrazynights.png"
        alt="Eight Crazy Nights"
        imageName="eightcrazynights"
        className="absolute top-[16%] right-[16%]"
      />
      <ClickableImage
        src="/assets/angrymanager.png"
        alt="Angry Manager"
        imageName="angrymanager"
        className="absolute top-[25%] right-[4%] scale-[2.25]"
      />
      <ClickableImage
        src="/assets/bigdaddy.png"
        alt="Big Daddy"
        imageName="bigdaddy"
        className="absolute top-[42%] right-[38%] scale-75"
      />
      <ClickableImage
        src="/assets/clic.png"
        alt="Clic"
        imageName="clic"
        className="absolute top-[66%] right-[45%] scale-75"
      />
      <ClickableImage
        src="/assets/zookeeper.png"
        alt="Zookeeper"
        imageName="zookeeper"
        className="absolute top-[22%] left-[47%]"
      />
      <ClickableImage
        src="/assets/50firstdates.png"
        alt="50 First Dates"
        imageName="50firstdates"
        className="absolute top-[54%] right-[21%] z-40"
      />
      <ClickableImage
        src="/assets/golpebajo.png"
        alt="Golpe Bajo"
        imageName="golpebajo"
        className="absolute bottom-[20%] right-[28%] scale-[1.75]"
      />
      <ClickableImage
        src="/assets/grownup.png"
        alt="Grown Up"
        imageName="grownup"
        className="absolute bottom-[13%] left-[2%] scale-125"
      />
      <ClickableImage
        src="/assets/hotel.png"
        alt="Hotel"
        imageName="hotel"
        className="absolute bottom-[32%] left-[14%] scale-150"
      />
      <ClickableImage
        src="/assets/jackyjill.png"
        alt="Jack and Jill"
        imageName="jackyjill"
        className="absolute bottom-[35%] left-[23%] scale-[2.0] z-20"
      />
      <ClickableImage
        src="/assets/pacman.png"
        alt="Pacman"
        imageName="pacman"
        className="absolute bottom-[39%] right-[16%] scale-[3.25] z-30"
      />
      <ClickableImage
        src="/assets/justgowithit.png"
        alt="Just Go With It"
        imageName="justgowithit"
        className="absolute bottom-[32%] right-[23%] scale-[3.0] z-20"
      />
      <ClickableImage
        src="/assets/mrdeeds.png"
        alt="Mr. Deeds"
        imageName="mrdeeds"
        className="absolute bottom-[27%] right-[9%] scale-[4.0] z-40"
      />
      <ClickableImage
        src="/assets/puchdrunklove.png"
        alt="Punch Drunk Love"
        imageName="punchdrunklove"
        className="absolute bottom-[51%] right-[1%] scale-[1.75] z-40"
      />
      <ClickableImage
        src="/assets/reignoverme.png"
        alt="Reign Over Me"
        imageName="reignoverme"
        className="absolute bottom-[17%] right-[42.5%] scale-[3.0] z-40"
      />
      <ClickableImage
        src="/assets/shakestheclown.png"
        alt="Shake the Clown"
        imageName="shakestheclown"
        className="absolute top-[38.5%] right-[30.5%] scale-105 z-40"
      />
      <ClickableImage
        src="/assets/spanglish.png"
        alt="Spanglish"
        imageName="spanglish"
        className="absolute bottom-[10%] right-[12%] scale-[2.0] z-40"
      />
      <ClickableImage
        src="/assets/thatsmyboy.png"
        alt="That's My Boy"
        imageName="thatsmyboy"
        className="absolute top-[20.5%] left-[20.5%] z-40"
      />
      <ClickableImage
        src="/assets/zohan.png"
        alt="Zohan"
        imageName="zohan"
        className="absolute bottom-[30.5%] right-[36.6%] scale-150 z-40"
      />

      <audio ref={audioRef} preload="auto">
        <source src="/sounds/clic.mp3" type="audio/mpeg" />
      </audio>

      {/* Control Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-3 z-[1000]">
        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className="w-14 h-14 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-yellow-400/50 hover:border-yellow-400"
        >
          {isMuted ? (
            <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>

        {/* Overlay Toggle Button */}
        <button
          onClick={toggleOverlay}
          className="w-14 h-14 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-yellow-400/50 hover:border-yellow-400"
        >
          {overlayEnabled ? (
            <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>

          ) : (
            <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
            </svg>
          )}
        </button>

        {/* Reset Counter Button */}
        <button
          onClick={resetCounter}
          className="w-14 h-14 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-yellow-400/50 hover:border-yellow-400"
        >
          <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
          </svg>
        </button>
      </div>

      {/* Blue overlay - now controlled by overlayEnabled AND isPressed */}
      <div
        className={`fixed inset-0 pointer-events-none z-[999] transition-opacity duration-300 ease-in-out ${overlayEnabled && isPressed ? 'opacity-60' : 'opacity-0'
          }`}
        style={{
          background: 'linear-gradient(to right, #010204, #214457, #0C1115)'
        }}
      />

      {/* Movie Discovery Modal */}
      {modalOpen && selectedMovie && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative w-full h-full shadow-2xl border border-yellow-400/30 opacity-60"
            style={{
              background: 'linear-gradient(to right, #010204, #214457, #0C1115)'
            }}>
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-yellow-400 hover:text-white transition-colors duration-300 z-10 opacity-100"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            {/* Modal Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full p-32 opacity-100">
              {/* Left Side - Look Image */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  <Image
                    src="/assets/looks/zookeeper.png"
                    alt="Movie Look"
                    width={400}
                    height={600}
                    className="rounded-lg shadow-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="flex flex-col justify-center space-y-6">
                {/* 1. Counter - 2x larger */}
                <div className="flex items-center justify-center">
                  <Counter clickedImages={clickedImages} totalImages={totalImages} />
                </div>

                {/* 2. "Haz encontrado:" with horizontal lines */}
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-yellow-400"></div>
                  <span className="text-xl lg:text-5xl text-white font-medium px-4">Haz encontrado:</span>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-yellow-400"></div>
                </div>

                {/* 3. Movie Title Image */}
                <div className="flex justify-center">
                  <Image
                    src="/assets/movies/zookeeper.png"
                    alt="Movie Title"
                    width={600}
                    height={200}
                    className="rounded-lg"
                    priority
                  />
                </div>

                {/* 4. Horizontal line */}
                <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                {/* 5. Buttons */}
                <div className="flex space-x-4 justify-center mt-10">
                  <Button
                    callToAction={handleLearnMore}
                    classes="px-8 py-3 rounded-full border-2 border-yellow-400 text-white hover:bg-yellow-400 transition-all duration-300 font-medium"
                    textButton="Conoce más"
                  />
                  <Button
                    callToAction={closeModal}
                    classes="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 font-medium shadow-lg"
                    textButton="Continuar"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
