'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components';
import { Counter } from '@/components/counter/Counter';
import moviesData from '@/app/data.json';

interface MovieModalProps {
  isOpen: boolean;
  selectedMovie: string | null;
  clickedImages: Set<string>;
  totalImages: number;
  onClose: (resetMovie?: boolean) => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({
  isOpen,
  selectedMovie,
  clickedImages,
  totalImages,
  onClose,
}) => {
  const [movieImageError, setMovieImageError] = useState(false);
  const [lookImageError, setLookImageError] = useState(false);

  useEffect(() => {
    if (selectedMovie) {
      setMovieImageError(false);
      setLookImageError(false);
    }
  }, [selectedMovie]);

  if (!isOpen || !selectedMovie) return null;

  const handleBackdropClick = () => onClose(true);
  const handleCloseButtonClick = () => onClose(true);
  const handleContinueClick = () => onClose(true);

  // Función para convertir URL de YouTube a embed
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';

    // Limpiar espacios en blanco
    url = url.trim();

    // Si ya es una URL de embed, devolverla tal como está
    if (url.includes('embed/')) return url;

    // Extraer el ID del video de diferentes formatos de URL de YouTube
    let videoId = '';

    if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  // Función para obtener datos de la película desde data.json
  const getMovieData = (movieName: string | null) => {
    if (!movieName) return null;

    // Mapear nombres de polylines a nombres exactos de películas
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
      'eightcrazynights': "Eight Crazy Nights",
      'angrymanager': 'Anger Management',
      'justgowithit': 'Just Go With It',
      'thelongestyard': 'The Longest Yard',
    };

    const actualMovieName = movieNameMap[movieName] || movieName;
    return moviesData.find(movie => movie.name === actualMovieName);
  };

  // Función para mapear nombres de película a archivos de looks
  const getLookImagePath = (movieName: string | null) => {
    if (!movieName) return '/assets/looks/zookeeper.png';

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
      'thelongestyard': '/assets/looks/thelongestyard.png',
    };

    return lookFileMap[movieName] || '/assets/looks/zookeeper.png';
  };

  // Función para obtener rutas de imágenes
  const getMovieImagePaths = (movieName: string | null) => {
    if (!movieName) return {
      movie: '/assets/movies/zookeeper.svg',
      look: '/assets/looks/zookeeper.png',
      displayName: 'Película desconocida'
    };

    const movieData = getMovieData(movieName);

    return {
      movie: (movieData?.logo) || '/assets/movies/zookeeper.svg',
      look: getLookImagePath(movieName), // Usar la nueva función de mapeo
      displayName: movieData?.name || 'Película desconocida'
    };
  };

  const { movie: movieImagePath, look: lookImagePath, displayName } = getMovieImagePaths(selectedMovie);
  const movieData = getMovieData(selectedMovie);

  const finalMovieImage = movieImageError ? '/assets/movies/zookeeper.svg' : movieImagePath;
  const finalLookImage = lookImageError ? '/assets/looks/zookeeper.png' : lookImagePath;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />

      <div
        className="relative w-full h-full shadow-2xl border border-yellow-400/30 opacity-60 overflow-auto"
        style={{
          background: 'linear-gradient(to right, #010204, #214457, #0C1115)'
        }}
      >
        <button
          onClick={handleCloseButtonClick}
          className="hidden 2xl:block absolute bottom-[35%] lg:-top-4 lg:bottom-[90%] right-0 lg:right-4 text-yellow-400 hover:text-white transition-colors duration-300 z-10 opacity-100 scale-10 xl:scale-100"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        <div className="flex flex-col-reverse 2xl:grid 2xl:grid-cols-4 gap-8 h-full p-8 lg:p-32 opacity-100 overflow-auto">

        <div className="flex 2xl:hidden  justify-center 2xl:justify-start mt-12 my-6 md:my-0">
            <Button
              callToAction={handleContinueClick}
              classes="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 font-medium shadow-lg"
              textButton="Continuar"
            />
          </div>
          {/* Columna izquierda: Solo Look y Trailer */}
          <div className="flex flex-col justify-center space-y-8 col-start-1 col-end-3">
            {/* Look image */}
            <div className="flex items-center justify-center">
              <div className="relative">
                {finalLookImage && finalLookImage.trim() !== '' ? (
                  <Image
                    src={finalLookImage}
                    alt={`${displayName} Look`}
                    width={300}
                    height={500}
                    className="rounded-lg shadow-2xl"
                    priority
                    onError={() => setLookImageError(true)}
                  />
                ) : (
                  <div className="w-[350px] h-[500px] bg-gray-800 rounded-lg shadow-2xl flex items-center justify-center">
                    <p className="text-white text-center">Imagen no disponible</p>
                  </div>
                )}
              </div>
            </div>

            {/* Trailer de YouTube */}
            {movieData && movieData.trailer && (
              <div className="flex flex-col items-center justify-center">
                <div className="w-[90%] h-[500px]">
                  {getYouTubeEmbedUrl(movieData.trailer) && getYouTubeEmbedUrl(movieData.trailer).trim() !== '' ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={getYouTubeEmbedUrl(movieData.trailer)}
                      title={movieData.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg mr-25"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                      <p className="text-white text-center">Trailer no disponible</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Columna derecha: Todo lo demás */}
          <div className="flex flex-col justify-center space-y-6 cols-span-4 col-start-3 col-end-5">
            {/* Contador */}
            <div className="flex items-center justify-center">
              <Counter clickedImages={clickedImages} totalImages={totalImages} />
            </div>

            {/* Texto "Haz encontrado" */}
            <div className="flex items-center justify-center space-x-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-yellow-400"></div>
              <span className="text-xl lg:text-3xl text-white font-medium px-4">Haz encontrado:</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-yellow-400"></div>
            </div>

            {/* Logo de la película */}


            {movieData && (
              <>
                {/* Poster */}
                <div className="flex flex-col row-reverse justify-center items-center">
                  <div className="flex justify-center">
                    {finalMovieImage && finalMovieImage.trim() !== '' ? (
                      <Image
                        src={finalMovieImage}
                        alt={`${displayName} Title`}
                        width={400}
                        height={120}
                        className="rounded-lg"
                        priority
                        onError={() => setMovieImageError(true)}
                      />
                    ) : (
                      <div className="w-[400px] h-[120px] bg-gray-800 rounded-lg flex items-center justify-center">
                        <p className="text-white text-center">Logo no disponible</p>
                      </div>
                    )}
                  </div>
                  <div className="relative w-40 h-60 lg:w-48 lg:h-72">
                    {movieData.poster && movieData.poster.trim() !== '' ? (
                      <Image
                        src={movieData.poster}
                        alt={`${movieData.name} Poster`}
                        fill
                        className="rounded-lg object-cover shadow-lg"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 rounded-lg shadow-lg flex items-center justify-center">
                        <p className="text-white text-center text-sm">Poster no disponible</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Fecha de estreno */}
                <div className="text-left">
                  <p className="text-white text-sm lg:text-base leading-relaxed font-bold mb-2">Fecha de estreno:</p>
                  <p className="text-white text-sm lg:text-base leading-relaxed">
                    {movieData.release}
                  </p>
                </div>

                {/* Línea horizontal */}
                <div className="h-px bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200"></div>

                {/* Descripción */}
                <div className="text-left mb-12">
                  <p className="text-white text-sm lg:text-base leading-relaxed">
                    {movieData.synopsis}
                  </p>
                </div>

                {/* Botón Continuar */}
                <div className="hidden 2xl:flex justify-center 2xl:justify-start mt-12 my-6 md:my-0">
                  <Button
                    callToAction={handleContinueClick}
                    classes="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 font-medium shadow-lg"
                    textButton="Continuar"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};