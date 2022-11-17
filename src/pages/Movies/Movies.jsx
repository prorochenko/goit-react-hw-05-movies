import { searchMovies } from '../../components/Services/API';
import { useEffect, useState } from 'react';
import { NavLink, useSearchParams, useLocation } from 'react-router-dom';

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const location = useLocation();

  useEffect(() => {
    if (!query) {
      return;
    }
    searchMovies(query).then(setMovies);
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const input = e.currentTarget;
    setSearchParams({ query: input.elements.query.value });
    input.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query"></input>
        <button type="submit">Search</button>
      </form>
      <ul>
        {movies.map(movie => (
          <li>
            <NavLink to={`${movie.id}`} state={{ from: location }}>
              {movie.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};
