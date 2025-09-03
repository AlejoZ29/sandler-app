'use client';
import React from 'react';
import Image from 'next/image';

interface ClickableImageProps {
  src: string;
  alt: string;
  imageName: string;
  className: string;
  width?: number;
  height?: number;
  isClicked: boolean;
  overlayEnabled: boolean;
  isPressed: boolean;
  onImageClick: (imageName: string) => void;
  onMouseEnter: () => void;
}

const ClickableImage: React.FC<ClickableImageProps> = ({
  src,
  alt,
  imageName,
  className,
  width = 120,
  height = 120,
  isClicked,
  overlayEnabled,
  isPressed,
  onImageClick,
  onMouseEnter
}) => {
  if (isClicked) {
    return (
      <div
        className={`${className} transition-opacity duration-300 ease-in-out flex items-center justify-center ${
          overlayEnabled && isPressed ? 'opacity-100' : 'opacity-0'
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
      className={`${className} opacity-95 transition-all duration-300 cursor-pointer ${
        overlayEnabled && isPressed
          ? ''
          : 'hover:shadow-[0_0_20px_#ffff00] hover:drop-shadow-[0_0_10px_#ffff00]'
      }`}
      onMouseEnter={overlayEnabled && isPressed ? undefined : onMouseEnter}
      onClick={(e) => {
        e.stopPropagation();
        onImageClick(imageName);
      }}
      priority
      style={{ pointerEvents: 'auto' }}
    />
  );
};

interface MovieGridProps {
  clickedImages: Set<string>;
  overlayEnabled: boolean;
  isPressed: boolean;
  onImageClick: (imageName: string) => void;
  onMouseEnter: () => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  clickedImages,
  overlayEnabled,
  isPressed,
  onImageClick,
  onMouseEnter
}) => {
  const movies = [
    {
      src: "/assets/eightcrazynights.png",
      alt: "Eight Crazy Nights",
      imageName: "eightcrazynights",
      className: "absolute top-[12%] right-[16%]"
    },
    {
      src: "/assets/angrymanager.png",
      alt: "Angry Manager",
      imageName: "angrymanager",
      className: "absolute top-[22%] right-[4%] scale-[2.5]"
    },
    {
      src: "/assets/bigdaddy.png",
      alt: "Big Daddy",
      imageName: "bigdaddy",
      className: "absolute top-[45%] right-[38%] scale-75"
    },
    {
      src: "/assets/clic.png",
      alt: "Clic",
      imageName: "clic",
      className: "absolute top-[70%] right-[46%] scale-78"
    },
    {
      src: "/assets/zookeeper.png",
      alt: "Zookeeper",
      imageName: "zookeeper",
      className: "absolute top-[20%] left-[47.5%]"
    },
    {
      src: "/assets/50firstdates.png",
      alt: "50 First Dates",
      imageName: "50firstdates",
      className: "absolute top-[59%] right-[22%] z-40"
    },
    {
      src: "/assets/golpebajo.png",
      alt: "Golpe Bajo",
      imageName: "golpebajo",
      className: "absolute bottom-[17%] right-[29%] scale-[2]"
    },
    {
      src: "/assets/grownup.png",
      alt: "Grown Up",
      imageName: "grownup",
      className: "absolute bottom-[8%] left-[2.5%] scale-150"
    },
    {
      src: "/assets/hotel.png",
      alt: "Hotel",
      imageName: "hotel",
      className: "absolute bottom-[32%] left-[13.5%] scale-200"
    },
    {
      src: "/assets/jackyjill.png",
      alt: "Jack and Jill",
      imageName: "jackyjill",
      className: "absolute bottom-[33.5%] left-[23.5%] scale-[2.2] z-20"
    },
    {
      src: "/assets/pacman.png",
      alt: "Pacman",
      imageName: "pacman",
      className: "absolute bottom-[38%] right-[16.5%] scale-[3.8] z-30"
    },
    {
      src: "/assets/justgowithit.png",
      alt: "Just Go With It",
      imageName: "justgowithit",
      className: "absolute bottom-[30.5%] right-[23%] scale-[3.2] z-20"
    },
    {
      src: "/assets/mrdeeds.png",
      alt: "Mr. Deeds",
      imageName: "mrdeeds",
      className: "absolute bottom-[25%] right-[9%] scale-[4.5] z-40"
    },
    {
      src: "/assets/puchdrunklove.png",
      alt: "Punch Drunk Love",
      imageName: "punchdrunklove",
      className: "absolute bottom-[52.5%] right-[1.5%] scale-[1.8] z-40"
    },
    {
      src: "/assets/reignoverme.png",
      alt: "Reign Over Me",
      imageName: "reignoverme",
      className: "absolute bottom-[12%] right-[42.5%] scale-[4.0] z-40"
    },
    {
      src: "/assets/shakestheclown.png",
      alt: "Shake the Clown",
      imageName: "shakestheclown",
      className: "absolute top-[36.9%] right-[31.1%] scale-105 z-40"
    },
    {
      src: "/assets/spanglish.png",
      alt: "Spanglish",
      imageName: "spanglish",
      className: "absolute bottom-[5%] right-[12%] scale-[3.0] z-40"
    },
    {
      src: "/assets/thatsmyboy.png",
      alt: "That's My Boy",
      imageName: "thatsmyboy",
      className: "absolute top-[15.5%] left-[20.9%] z-40"
    },
    {
      src: "/assets/zohan.png",
      alt: "Zohan",
      imageName: "zohan",
      className: "absolute bottom-[27.5%] right-[36.6%] scale-175 z-40"
    }
  ];

  return (
    <>
      {movies.map((movie) => (
        <ClickableImage
          key={movie.imageName}
          src={movie.src}
          alt={movie.alt}
          imageName={movie.imageName}
          className={movie.className}
          isClicked={clickedImages.has(movie.imageName)}
          overlayEnabled={overlayEnabled}
          isPressed={isPressed}
          onImageClick={onImageClick}
          onMouseEnter={onMouseEnter}
        />
      ))}
    </>
  );
};
