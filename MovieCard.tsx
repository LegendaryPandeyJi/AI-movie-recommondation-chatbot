
import React from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

// Simple hash to get a consistent image ID from the movie title
const getHash = (input: string): number => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
};


const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const imageId = getHash(movie.title) % 1000; // use modulo to keep ID in a reasonable range
  const imageUrl = `https://picsum.photos/seed/${imageId}/500/750`;

  return (
    <div className="bg-brand-surface rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_25px_rgba(229,9,20,0.4)] flex flex-col group">
      <div className="relative">
          <img src={imageUrl} alt={`Poster for ${movie.title}`} className="w-full h-60 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base font-bold text-brand-light truncate">{movie.title}</h3>
        <p className="text-xs text-brand-dark font-semibold mt-1 uppercase tracking-wider">
          {movie.year} &bull; {movie.genre}
        </p>
        <p className="text-xs text-brand-dark font-semibold mt-1 mb-2 uppercase tracking-wider">
          {movie.nation} &bull; {movie.language}
        </p>
        <p className="text-brand-medium text-sm flex-grow line-clamp-3">{movie.description}</p>
      </div>
    </div>
  );
};

export default MovieCard;