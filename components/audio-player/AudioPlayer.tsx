'use client';
import React, { useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react';

interface AudioPlayerProps {
  isMuted: boolean;
}

export interface AudioPlayerRef {
  playSound: () => void;
}

export const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(({ isMuted }, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [canAutoplay, setCanAutoplay] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    // Listen for first user interaction to enable audio
    const handleUserInteraction = () => {
      setUserInteracted(true);
      // Try to play and pause immediately to test autoplay capability
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              audioRef.current?.pause();
              audioRef.current!.currentTime = 0;
              setCanAutoplay(true);
            })
            .catch(() => {
              setCanAutoplay(false);
            });
        }
      }
      // Remove listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const playSound = async () => {
    if (audioRef.current && !isMuted && (userInteracted || canAutoplay)) {
      try {
        audioRef.current.currentTime = 0;
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          await playPromise;
        }
      } catch (error) {
        // Silently handle autoplay errors
        console.warn('Audio playback failed:', error);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    playSound
  }));

  return (
    <audio 
      ref={audioRef} 
      preload="auto"
      playsInline
      webkit-playsinline="true"
    >
      <source src="/sounds/switch.mp3" type="audio/mpeg" />
    </audio>
  );
});

AudioPlayer.displayName = 'AudioPlayer';