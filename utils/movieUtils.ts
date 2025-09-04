import movieData from '../app/data.json';

export interface MovieData {
  nombre: string;
  trailer: string;
  sinopsis: string;
  poster: string;
  release: string;
  logo: string;
}


const movieNameMapping: { [key: string]: string } = {
  '50firstdates': '50 First Dates',
  'eightcrazynights': 'Adam Sandler\'s Eight Crazy Nights',
  'angrymanager': 'Anger Management',
  'bigdaddy': 'Big Daddy',
  'clic': 'Click',
  'grownup': 'Grown Ups',
  'hotel': 'Hotel Transylvania',
  'jackyjill': 'Jack and Jill',
  'justgowithit': 'Just Go With It',
  'golpebajo': 'The Longest Yard',
  'mrdeeds': 'Mr. Deeds',
  'pacman': 'Pixels',
  'puchdrunklove': 'Punch-Drunk Love',
  'reignoverme': 'Reign Over Me',
  'shakestheclown': 'Shakes the Clown',
  'spanglish': 'Spanglish',
  'thatsmyboy': 'That\'s My Boy',
  'zohan': 'You Don\'t Mess with the Zohan',
  'zookeeper': 'Zookeeper'
};

export const getMovieData = (movieName: string): MovieData | null => {
  const mappedName = movieNameMapping[movieName];
  if (!mappedName) {
    return null;
  }
  
  const movie = movieData.find(movie => movie.nombre === mappedName);
  if (!movie) {
    return null;
  }
  
  return movie;
};
