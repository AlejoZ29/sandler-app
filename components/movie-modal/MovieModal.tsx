'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components';
import { Counter } from '@/components/counter/Counter';
import { getMovieImagePaths } from './movieImageConfig';
import { VideoPlayer } from '@/components/video-player/VideoPlayer';
import { getMovieData } from '@/utils/movieUtils';
import { useRouter } from 'next/navigation';

interface MovieModalProps {
  isOpen: boolean;
  selectedMovie: string | null;
  clickedImages: Set<string>;
  totalImages: number;
  onClose: (resetMovie?: boolean) => void;
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
  const [movieImageError, setMovieImageError] = useState(false);
  const [lookImageError, setLookImageError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (selectedMovie) {
      setMovieImageError(false);
      setLookImageError(false);
      setShowDetails(false);
    }
  }, [selectedMovie]);

  if (!isOpen || !selectedMovie) return null;

  const handleBackdropClick = () => onClose(true);
  const handleCloseButtonClick = () => onClose(true);
  const handleContinueClick = () => onClose(true);

  const handleLearnMoreClick = () => {
    setShowDetails(true);
  };

  const handleContinueFromDetails = () => {
    onClose(true);
    router.push('/home');
  };

  const { movie: movieImagePath, look: lookImagePath, displayName } = getMovieImagePaths(selectedMovie);

  const finalMovieImage = movieImageError ? '/assets/movies/zookeeper.png' : movieImagePath;
  const finalLookImage = lookImageError ? '/assets/looks/zookeeper.png' : lookImagePath;

  const movieData = getMovieData(selectedMovie);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />

      <div 
        className="relative w-full h-full shadow-2xl border border-yellow-400/30 opacity-60"
        style={{
          background: 'linear-gradient(to right, #010204, #214457, #0C1115)'
        }}
      >
        <button
          onClick={handleCloseButtonClick}
          className="absolute top-4 right-4 text-yellow-400 hover:text-white transition-colors duration-300 z-10 opacity-100"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full p-8 lg:p-32 opacity-100">
          {showDetails && movieData ? (
            <>
              <div className="flex items-center justify-center">
                <div className="w-[95%] h-[70%]">
                  <VideoPlayer 
                    videoUrl={movieData.trailer} 
                    title={movieData.nombre} 
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-6">
                <div className="flex justify-start">
                  <div className="relative w-48 h-72 lg:w-64 lg:h-96">
                    <Image
                      src={movieData.poster}
                      alt={`${movieData.nombre} Poster`}
                      fill
                      className="rounded-lg object-cover"
                      priority
                    />
                  </div>
                </div>

                <div className="text-left">
                  <p className="text-white text-sm lg:text-base leading-relaxed font-bold">Fecha de estreno:</p>
                  <p className="text-white text-sm lg:text-base leading-relaxed">
                    {movieData.release}
                  </p>
                </div>

                <div className="h-px bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200"></div>

                <div className="text-left">
                  <p className="text-white text-sm lg:text-base leading-relaxed">
                    {movieData.sinopsis}
                  </p>
                </div>

                <div className="flex justify-start mt-6">
                  <Button
                    callToAction={handleContinueFromDetails}
                    textButton="Continuar"
                    variant="primary"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <Image
                    src={finalLookImage}
                    alt={`${displayName} Look`}
                    width={400}
                    height={600}
                    className="rounded-lg shadow-2xl"
                    priority
                    onError={() => setLookImageError(true)}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-6">
                <div className="flex items-center justify-center">
                  <Counter clickedImages={clickedImages} totalImages={totalImages} />
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-yellow-400"></div>
                  <span className="text-xl lg:text-5xl text-white font-medium px-4">Haz encontrado:</span>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-yellow-400"></div>
                </div>

                <div className="flex justify-center">
                  <Image
                    src={finalMovieImage}
                    alt={`${displayName} Title`}
                    width={600}
                    height={200}
                    className="rounded-lg"
                    priority
                    onError={() => setMovieImageError(true)}
                  />
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

                <div className="flex space-x-4 justify-center mt-10">
                  <Button
                    callToAction={handleLearnMoreClick}
                    classes="px-8 py-3 rounded-full border-2 border-yellow-400 text-white hover:bg-yellow-400 transition-all duration-300 font-medium"
                    textButton="Conoce más"
                  />
                  <Button
                    callToAction={handleContinueClick}
                    classes="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 font-medium shadow-lg"
                    textButton="Continuar"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
