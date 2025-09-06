'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components';
import { Counter } from '@/components/counter/Counter';
import moviesData from '@/app/data.json';

interface CongratsModalProps {
  isOpen: boolean;
  clickedImages: Set<string>;
  totalImages: number;
  onClose: () => void;
}

export const CongratsModal: React.FC<CongratsModalProps> = ({
  isOpen,
  clickedImages,
  totalImages,
  onClose,
}) => {
  const [hoveredMovie, setHoveredMovie] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const handleImageError = (movieName: string) => {
    setImageErrors(prev => new Set([...prev, movieName]));
  };

  const handleBackdropClick = () => onClose();
  const handleCloseButtonClick = () => onClose();
  const handleContinueClick = () => onClose();

  // Función para truncar el texto de la sinopsis
  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

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

        <div className="flex flex-col items-center justify-start h-full p-8 lg:p-16 overflow-y-auto opacity-100">
          {/* Contador */}
          <div className="flex items-center justify-center mb-6">
            <Counter clickedImages={clickedImages} totalImages={totalImages} />
          </div>

          {/* Título y texto de congratulaciones */}
          <div className="text-center mb-8 max-w-4xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-yellow-300 mb-6">
              ¡Felicitaciones!
            </h1>
            <p className="text-xl lg:text-2xl text-white mb-4">
              Has completado con éxito el reto de encontrar los <span className="text-yellow-300 font-bold">10 elementos de película</span>.
            </p>
            <p className="text-lg lg:text-xl text-white mb-6">
              Ahora puedes ver el <span className="text-yellow-300 font-bold">inventario completo de películas</span> de que tenemos para complementar tu oferta.
            </p>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-yellow-400"></div>
              <span className="text-lg lg:text-xl text-yellow-300 font-medium px-4">
                PORQUE NO HAY NADA MEJOR QUE ESTAR A LA MODA,<br />
                Y ESTAR A LA MODA ES TENER A ADAM SANDLER EN TU PANTALLA
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-yellow-400"></div>
            </div>
          </div>

          {/* Grid de películas */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 mb-8 max-w-7xl">
            {moviesData.map((movie, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredMovie(movie.name)}
                onMouseLeave={() => setHoveredMovie(null)}
              >
                <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden border-2 border-transparent bg-gradient-to-r from-yellow-200 via-yellow-600 to-yellow-200 p-[2px] transition-all duration-300 hover:scale-105 hover:shadow-lg opacity-100">
                  <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-800">
                    <Image
                      src={movie.poster}
                      alt={movie.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover"
                      onError={(e) => {
                        console.log(`Error loading image for ${movie.name}: ${movie.poster}`);
                        e.currentTarget.style.display = 'none';
                        handleImageError(movie.name);
                      }}
                      onLoad={() => console.log(`Successfully loaded image for ${movie.name}`)}
                    />
                    
                    {imageErrors.has(movie.name) && (
                      <div className="absolute inset-0 w-full h-full bg-gray-700 flex flex-col items-center justify-center text-white p-2">
                        <div className="text-2xl mb-2">🎬</div>
                        <p className="text-xs text-center leading-tight">{movie.name}</p>
                      </div>
                    )}
                    
                    {/* Overlay con información al hacer hover */}
                    {hoveredMovie === movie.name && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent flex flex-col justify-end p-3 text-white opacity-100">
                        <h3 className="font-bold text-sm lg:text-base mb-1 leading-tight">
                          {movie.name}
                        </h3>
                        <p className="text-xs lg:text-sm text-yellow-300 mb-2">
                          {movie.release}
                        </p>
                        <p className="text-xs leading-tight">
                          {truncateText(movie.synopsis, 100)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón Continuar */}
          <div className="flex justify-center opacity-100">
            <Button
              callToAction={handleContinueClick}
              classes="px-8 py-3 rounded-full transition-all duration-300 font-medium shadow-lg"
              textButton="Continuar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
