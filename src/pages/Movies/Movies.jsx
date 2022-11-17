import { searchMovies } from '../../components/Services/API';
import { useEffect, useState } from 'react';
import { NavLink, useSearchParams, useLocation } from 'react-router-dom';
import LoadingComponent from '../../components/Loader/Loader';

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const location = useLocation();
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!query) {
      return;
    }
    async function fetchMovies() {
      try {
        setStatus('pending');
        const movies = await searchMovies(query);
        if (movies.length === 0) {
          return Promise.reject(
            new Error(`Sorry, we didn't infortmaion`)
          ).catch(error => {
            setStatus('rejected');
          });
        } else {
          setStatus('resolved');
          setMovies(movies);
        }
      } catch {
        setStatus('idle');
      }
    }
    fetchMovies();
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
        <input type="text" name="query" placeholder="Enter Movie Name"></input>
        <button type="submit">Search</button>
      </form>
      {status === 'pending' && <LoadingComponent />}
      {status === 'resolved' ? (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <NavLink to={`${movie.id}`} state={{ from: location }}>
                {movie.title}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
    </>
  );
};
