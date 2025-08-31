'use client';
import type { Metadata } from 'next';
import React, { useState, useRef } from 'react'
import Image from 'next/image'

export default function HomePage() {
  const [isPressed, setIsPressed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
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
      <Image
        src="/assets/eightcrazynights.png"
        alt="Eight Crazy Nights"
        width={120}
        height={120}
        className="absolute top-[16%] right-[16%] hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-20"
        onMouseEnter={playSound}
        priority
      />
      <Image
        src="/assets/angrymanager.png"
        alt="Angry Manager"
        width={120}
        height={120}
        className="absolute top-[25%] right-[4%] scale-225 hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-20"
        onMouseEnter={playSound}
        priority
      />
      <Image
        src="/assets/bigdaddy.png"
        alt="Big Daddy"
        width={120}
        height={120}
        className="absolute top-[42%] right-[38%] scale-75 hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-20"
        onMouseEnter={playSound}
        priority
      />
      <Image
        src="/assets/clic.png"
        alt="Clic"
        width={120}
        height={120}
        className="absolute top-[66%] right-[45%] -scale-65 rotate-180 hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-20"
        onMouseEnter={playSound}
        priority
      />
      <Image
        src="/assets/zookeeper.png"
        alt="Zookeeper"
        width={120}
        height={120}
        className="absolute top-[22%] left-[47%] hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-20"
        onMouseEnter={playSound}
        priority
      />
      <Image
        src="/assets/50firstdates.png"
        alt="50 First Dates"
        width={120}
        height={120}
        className="absolute top-[54%] right-[21%] hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-50"
        onMouseEnter={playSound}
        priority
      />
      <Image
        src="/assets/golpebajo.png"
        alt="Golpe Bajo"
        width={120}
        height={120}
        className="absolute bottom-[20%] right-[28%] scale-175 hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-20"
        onMouseEnter={playSound}
        priority
      />
      <Image
        src="/assets/grownup.png"
        alt="Grown Up"
        width={120}
        height={120}
        className="absolute bottom-[13%] left-[2%] scale-125 hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-20"
        onMouseEnter={playSound}
        priority
      />
      <Image
        src="/assets/hotel.png"
        alt="Hotel"
        width={120}
        height={120}
        className="absolute bottom-[32%] left-[14%] scale-150 hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-20"
        onMouseEnter={playSound}
        priority
      />
      <Image
        src="/assets/jackyjill.png"
        alt="Jack and Jill"
        width={120}
        height={120}
        className="absolute bottom-[35%] left-[23%] scale-200 hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-20"
        onMouseEnter={playSound}
        priority
      />
      <Image
        src="/assets/pacman.png"
        alt="Pacman"
        width={120}
        height={120}
        className="absolute bottom-[39%] right-[16%] scale-325 hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-30"
        onMouseEnter={playSound}
        priority
      />
      <Image
        src="/assets/justgowithit.png"
        alt="Just Go With It"
        width={120}
        height={120}
        className="absolute bottom-[32%] right-[23%] scale-300 hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-20"
        onMouseEnter={playSound}
        priority
      />
      <Image
        src="/assets/mrdeeds.png"
        alt="Mr. Deeds"
        width={120}
        height={120}
        className="absolute bottom-[27%] right-[9%] scale-400 hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-40"
        onMouseEnter={playSound}
        priority
      />
      <Image
        src="/assets/puchdrunklove.png"
        alt="Puch Drunk Love"
        width={120}
        height={120}
        className="absolute bottom-[51%] right-[1%] scale-175 hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-40"
        onMouseEnter={playSound}
        priority
      />
      <Image
        src="/assets/reignoverme.png"
        alt="Reign Over Me"
        width={120}
        height={120}
        className="absolute bottom-[17%] right-[42.5%] scale-300 hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-40"
        onMouseEnter={playSound}
        priority
      />
      <Image
        src="/assets/shakestheclown.png"
        alt="Shake the Clown"
        width={120}
        height={120}
        className="absolute top-[38.5%] right-[30.5%] scale-105  hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-40"
        onMouseEnter={playSound}
        priority
      />
      <Image
        src="/assets/spanglish.png"
        alt="Spanglish"
        width={120}
        height={120}
        className="absolute bottom-[10%] right-[12%] scale-200  hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-40"
        onMouseEnter={playSound}
        priority
      />
      <Image
        src="/assets/thatsmyboy.png"
        alt="That's My Boy"
        width={120}
        height={120}
        className="absolute top-[20.5%] left-[20.5%] hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-40"
        onMouseEnter={playSound}
        priority
      />
      <Image
        src="/assets/zohan.png"
        alt="Zohan"
        width={120}
        height={120}
        className="absolute bottom-[30.5%] right-[36.6%] scale-150 hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00] transition-all duration-300 cursor-pointer z-40"
        onMouseEnter={playSound}
        priority
      />

      <audio ref={audioRef} preload="auto">
        <source src="/sounds/alert.mp3" type="audio/mpeg" />
      </audio>

      <div
        className={`fixed inset-0 pointer-events-none z-[999] transition-opacity duration-300 ease-in-out ${isPressed ? 'opacity-40' : 'opacity-0'
          }`}
        style={{
          background: 'linear-gradient(to right, #010204, #214457, #0C1115)'
        }}
      />
    </div>
  )
}
