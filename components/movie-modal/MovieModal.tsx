'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components';
import { Counter } from '@/components/counter/Counter';

interface MovieModalProps {
  isOpen: boolean;
  selectedMovie: string | null;
  clickedImages: Set<string>;
  totalImages: number;
  onClose: () => void;
  onLearnMore: () => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({
  isOpen,
  selectedMovie,
  clickedImages,
  totalImages,
  onClose,
  onLearnMore
}) => {
  if (!isOpen || !selectedMovie) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className="relative w-full h-full shadow-2xl border border-yellow-400/30 opacity-60"
        style={{
          background: 'linear-gradient(to right, #010204, #214457, #0C1115)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
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
                callToAction={onLearnMore}
                classes="px-8 py-3 rounded-full border-2 border-yellow-400 text-white hover:bg-yellow-400 transition-all duration-300 font-medium"
                textButton="Conoce más"
              />
              <Button
                callToAction={onClose}
                classes="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 font-medium shadow-lg"
                textButton="Continuar"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
