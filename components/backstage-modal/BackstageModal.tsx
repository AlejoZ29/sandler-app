'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useGame } from '@/app/context/GameContext';
import moviesData from '@/app/data.json';

interface BackstageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackstageModal: React.FC<BackstageModalProps> = ({
  isOpen,
  onClose
}) => {
  const { clickedImages } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movieImageError, setMovieImageError] = useState(false);
  const [lookImageError, setLookImageError] = useState(false);

  const allMovies = [
    'bigdaddy', 'spanglish', 'mrdeeds', 'clic', 'zookeeper', 
    'shakestheclown', 'hoteltransylvania', 'grownups', 'jackandjill', 
    'thatsmyboy', 'reignoverme', 'youdontmesswiththezohan', 'punchdrunkloveme', 
    '50firstdates', 'pixels', 'eightcrazynights', 'angrymanager', 
    'justgowithit', 'thelongestyard'
  ];


  const getMovieData = (movieName: string) => {
    const movieNameMap: { [key: string]: string } = {
      'bigdaddy': 'Big Daddy',
      'spanglish': 'Spanglish',
      'mrdeeds': 'Mr. Deeds',
      'clic': 'Click',
      'zookeeper': 'Zookeeper',
      'shakestheclown': 'Shakes the Clown',
      'hoteltransylvania': 'Hotel Transylvania',
      'grownups': 'Grown Ups',
      'jackandjill': 'Jack and Jill',
      'thatsmyboy': "Thats My Boy",
      'reignoverme': 'Reign Over Me',
      'youdontmesswiththezohan': "You Dont Mess with the Zohan",
      'punchdrunkloveme': 'Punch-Drunk Love',
      '50firstdates': '50 First Dates',
      'pixels': 'Pixels',
      'eightcrazynights': "Adam Sandler's Eight Crazy Nights",
      'angrymanager': 'Anger Management',
      'justgowithit': 'Just Go With It',
      'thelongestyard': 'The Longest Yard'
    };
    
    const actualMovieName = movieNameMap[movieName];
    return moviesData.find(movie => movie.name === actualMovieName);
  };

  // Mapeo de imágenes de looks
  const getLookImagePath = (movieName: string) => {
    const lookFileMap: { [key: string]: string } = {
      'bigdaddy': '/assets/looks/biddaddy.png',
      'spanglish': '/assets/looks/Spanglish.png',
      'mrdeeds': '/assets/looks/mrdeeds.png',
      'clic': '/assets/looks/clic.png',
      'zookeeper': '/assets/looks/Zookeeper.png',
      'shakestheclown': '/assets/looks/shakestheclown.png',
      'hoteltransylvania': '/assets/looks/hoteltransilvania.png',
      'grownups': '/assets/looks/grownups.png',
      'jackandjill': '/assets/looks/jackandjill.png',
      'thatsmyboy': '/assets/looks/thatsmyboy.png',
      'reignoverme': '/assets/looks/reignoverme.png',
      'youdontmesswiththezohan': '/assets/looks/youdontmesswiththezohan.png',
      'punchdrunkloveme': '/assets/looks/punchdrunklove.png',
      '50firstdates': '/assets/looks/50firstdates.png',
      'pixels': '/assets/looks/Pixels.png',
      'eightcrazynights': '/assets/looks/eightcrazynights.png',
      'angrymanager': '/assets/looks/angrymanager.png',
      'justgowithit': '/assets/looks/justgowithit.png',
      'thelongestyard': '/assets/looks/thelongestyard.png'
    };
    
    return lookFileMap[movieName] || '/assets/looks/incognito.png';
  };

  // Resetear errores cuando cambia el índice
  useEffect(() => {
    setMovieImageError(false);
    setLookImageError(false);
  }, [currentIndex]);

  if (!isOpen) return null;

  // Calcular índices anterior, actual y siguiente
  const prevIndex = (currentIndex - 1 + allMovies.length) % allMovies.length;
  const nextIndex = (currentIndex + 1) % allMovies.length;
  
  // Películas anterior, actual y siguiente
  const prevMovie = allMovies[prevIndex];
  const currentMovie = allMovies[currentIndex];
  const nextMovie = allMovies[nextIndex];
  
  // Estados de descubrimiento
  const isPrevDiscovered = clickedImages.has(prevMovie);
  const isCurrentDiscovered = clickedImages.has(currentMovie);
  const isNextDiscovered = clickedImages.has(nextMovie);
  
  // Datos de la película actual
  const movieData = getMovieData(currentMovie);
  
  // Imágenes de looks
  const prevLookImage = isPrevDiscovered ? getLookImagePath(prevMovie) : '/assets/looks/incognito.png';
  const currentLookImage = isCurrentDiscovered ? getLookImagePath(currentMovie) : '/assets/looks/incognito.png';
  const nextLookImage = isNextDiscovered ? getLookImagePath(nextMovie) : '/assets/looks/incognito.png';
  
  // Logo de la película actual
  const movieLogo = isCurrentDiscovered && movieData?.logo ? movieData.logo : null;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + allMovies.length) % allMovies.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allMovies.length);
  };

  const handleBackdropClick = () => onClose();

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
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 hover:text-white transition-colors duration-300 z-10 opacity-100"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 h-full p-8 lg:p-32 opacity-100">
          {/* Contenido centrado como en el MovieModal */}
          <div className="flex flex-col justify-center space-y-6">
            
            {/* Logo de la película (arriba) */}
            <div className="flex justify-center">
              {movieLogo && !movieImageError ? (
                <Image
                  src={movieLogo}
                  alt={`${movieData?.name} Logo`}
                  width={500}
                  height={150}
                  className="rounded-lg"
                  priority
                  onError={() => setMovieImageError(true)}
                />
              ) : (
                <div className="w-[500px] h-[150px] bg-gray-800/50 rounded-lg flex items-center justify-center">
                  <p className="text-white/50 text-center text-lg">
                    {isCurrentDiscovered ? 'Logo no disponible' : '¡Descubre esta película!'}
                  </p>
                </div>
              )}
            </div>

            {/* Slider de looks con 3 imágenes */}
            <div className="flex items-center justify-center space-x-4">
              {/* Flecha izquierda */}
              <button
                onClick={handlePrevious}
                className="text-yellow-400 hover:text-white transition-colors duration-300 p-2 z-10"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>

              {/* Imagen anterior (pequeña y opaca) */}
              <div className="relative flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105" onClick={handlePrevious}>
                {prevLookImage && !lookImageError ? (
                  <Image
                    src={prevLookImage}
                    alt={isPrevDiscovered ? `Look anterior` : 'Look oculto'}
                    width={200}
                    height={300}
                    className="rounded-lg shadow-lg transition-all duration-300"
                    style={{ 
                      filter: isPrevDiscovered ? 'brightness(0.6) saturate(0.7)' : 'brightness(0.2)',
                      opacity: 0.7
                    }}
                    onError={() => setLookImageError(true)}
                  />
                ) : (
                  <div className="w-[200px] h-[300px] bg-gray-800/30 rounded-lg shadow-lg flex items-center justify-center opacity-50">
                    <p className="text-white/30 text-center text-sm">No disponible</p>
                  </div>
                )}
              </div>

              {/* Imagen actual (grande y centrada) */}
              <div className="relative flex items-center justify-center">
                {currentLookImage && !lookImageError ? (
                  <Image
                    src={currentLookImage}
                    alt={isCurrentDiscovered ? `${movieData?.name} Look` : 'Look oculto'}
                    width={400}
                    height={600}
                    className="rounded-lg shadow-2xl transition-all duration-300"
                    style={{ 
                      filter: isCurrentDiscovered ? 'brightness(1)' : 'brightness(0.3)' 
                    }}
                    priority
                    onError={() => setLookImageError(true)}
                  />
                ) : (
                  <div className="w-[400px] h-[600px] bg-gray-800/50 rounded-lg shadow-2xl flex items-center justify-center">
                    <p className="text-white/50 text-center">Imagen no disponible</p>
                  </div>
                )}
                
                {/* Indicador de posición */}
                <div className="absolute -bottom-15 left-1/2 transform -translate-x-1/2 text-3xl ">
                  <p className="text-yellow-400 font-medium">
                    {currentIndex + 1} / {allMovies.length}
                  </p>
                </div>
              </div>

              {/* Imagen siguiente (pequeña y opaca) */}
              <div className="relative flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105" onClick={handleNext}>
                {nextLookImage && !lookImageError ? (
                  <Image
                    src={nextLookImage}
                    alt={isNextDiscovered ? `Look siguiente` : 'Look oculto'}
                    width={200}
                    height={300}
                    className="rounded-lg shadow-lg transition-all duration-300"
                    style={{ 
                      filter: isNextDiscovered ? 'brightness(0.6) saturate(0.7)' : 'brightness(0.2)',
                      opacity: 0.7
                    }}
                    onError={() => setLookImageError(true)}
                  />
                ) : (
                  <div className="w-[200px] h-[300px] bg-gray-800/30 rounded-lg shadow-lg flex items-center justify-center opacity-50">
                    <p className="text-white/30 text-center text-sm">No disponible</p>
                  </div>
                )}
              </div>

              {/* Flecha derecha */}
              <button
                onClick={handleNext}
                className="text-yellow-400 hover:text-white transition-colors duration-300 p-2 z-10"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
