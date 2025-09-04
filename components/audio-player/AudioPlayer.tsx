'use client';
import React, { useRef, useImperativeHandle, forwardRef } from 'react';

interface AudioPlayerProps {
  isMuted: boolean;
}

export interface AudioPlayerRef {
  playSound: () => void;
}

export const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(({ isMuted }, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playSound = () => {
    if (audioRef.current && !isMuted) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  useImperativeHandle(ref, () => ({
    playSound
  }));

  return (
    <audio ref={audioRef} preload="auto">
      <source src="/sounds/clic.mp3" type="audio/mpeg" />
    </audio>
  );
});

AudioPlayer.displayName = 'AudioPlayer';
