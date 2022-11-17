import { searchMovies } from '../../components/Services/API';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Movies = () => {
  const [movies, setMovies] = useState('');

  useEffect(() => {
    searchMovies().then(setMovies);
  }, []);

  return (
    <>
      <input></input>
      <button>Search</button>
      <div>
        {movies.map(movie => (
          <NavLink to={`${movie.id}`}>{movie.id}</NavLink>
        ))}
      </div>
    </>
  );
};
