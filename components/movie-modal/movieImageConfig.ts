export interface MovieImageConfig {
  movie: string;
  look: string;
  displayName: string;
}

export const movieImageMap: Record<string, MovieImageConfig> = {
  'eightcrazynights': { 
    movie: 'eightcrazynights.png', 
    look: 'eightcrazynights.png',
    displayName: 'Eight Crazy Nights'
  },
  'angrymanager': { 
    movie: 'angrymanager.png', 
    look: 'angrymanager.png',
    displayName: 'Angry Manager'
  },
  'bigdaddy': { 
    movie: 'bigdaddy.png', 
    look: 'bigdaddy.png',
    displayName: 'Big Daddy'
  },
  'clic': { 
    movie: 'clic.png', 
    look: 'clic.png',
    displayName: 'Clic'
  },
  'zookeeper': { 
    movie: 'zookeeper.png', 
    look: 'zookeeper.png',
    displayName: 'Zookeeper'
  },
  '50firstdates': { 
    movie: '50firstdates.png', 
    look: '50firstdates.png',
    displayName: '50 First Dates'
  },
  'golpebajo': { 
    movie: 'golpebajo.png', 
    look: 'golpebajo.png',
    displayName: 'Golpe Bajo'
  },
  'grownup': { 
    movie: 'grownup.png', 
    look: 'grownup.png',
    displayName: 'Grown Up'
  },
  'hotel': { 
    movie: 'hotel.png', 
    look: 'hotel.png',
    displayName: 'Hotel'
  },
  'jackyjill': { 
    movie: 'jackyjill.png', 
    look: 'jackyjill.png',
    displayName: 'Jack and Jill'
  },
  'pacman': { 
    movie: 'pacman.png', 
    look: 'pacman.png',
    displayName: 'Pacman'
  },
  'justgowithit': { 
    movie: 'justgowithit.png', 
    look: 'justgowithit.png',
    displayName: 'Just Go With It'
  },
  'mrdeeds': { 
    movie: 'mrdeeds.png', 
    look: 'mrdeeds.png',
    displayName: 'Mr. Deeds'
  },
  'punchdrunklove': { 
    movie: 'punchdrunklove.png', 
    look: 'punchdrunklove.png',
    displayName: 'Punch Drunk Love'
  },
  'reignoverme': { 
    movie: 'reignoverme.png', 
    look: 'reignoverme.png',
    displayName: 'Reign Over Me'
  },
  'shakestheclown': { 
    movie: 'shakestheclown.png', 
    look: 'shakestheclown.png',
    displayName: 'Shake the Clown'
  },
  'spanglish': { 
    movie: 'spanglish.png', 
    look: 'spanglish.png',
    displayName: 'Spanglish'
  },
  'thatsmyboy': { 
    movie: 'thatsmyboy.png', 
    look: 'thatsmyboy.png',
    displayName: "That's My Boy"
  },
  'zohan': { 
    movie: 'zohan.png', 
    look: 'zohan.png',
    displayName: 'Zohan'
  }
};

export const getMovieImagePaths = (movieKey: string) => {
  const movieConfig = movieImageMap[movieKey];
  
  if (!movieConfig) {
    return {
      movie: '/assets/movies/zookeeper.png',
      look: '/assets/looks/zookeeper.png',
      displayName: 'Zookeeper'
    };
  }

  return {
    movie: `/assets/movies/${movieConfig.movie}`,
    look: `/assets/looks/${movieConfig.look}`,
    displayName: movieConfig.displayName
  };
};
