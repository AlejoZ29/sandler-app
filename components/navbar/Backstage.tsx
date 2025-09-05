'use client';
import React from 'react';
import Image from 'next/image';

interface BackstageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  isActive?: boolean;
  onOpenModal: () => void;
}

export const Backstage: React.FC<BackstageProps> = ({
  src,
  alt,
  width,
  height,
  isActive = false,
  onOpenModal
}) => {
  return (
    <button
      onClick={onOpenModal}
      className={`transition-opacity duration-300 ${isActive ? 'opacity-50' : 'opacity-100'} cursor-pointer`}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className="mx-auto"
      />
    </button>
  );
};