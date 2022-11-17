import { searchMovies } from '../../components/Services/API';
import { useEffect, useState } from 'react';
import { NavLink, useSearchParams, useLocation } from 'react-router-dom';
import LoadingComponent from '../../components/Loader/Loader';
import css from './Movies.module.scss';

const Movies = () => {
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
        <input
          className={css.searchbox}
          type="text"
          name="query"
          placeholder="Enter Movie Name"
        ></input>
        <button className={css.btnSearch} type="submit">
          Search
        </button>
      </form>
      {status === 'pending' && <LoadingComponent />}
      {status === 'resolved' ? (
        <ul className={css.items}>
          {movies.map(movie => (
            <li key={movie.id} className={css.list}>
              <NavLink to={`${movie.id}`} state={{ from: location }}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  width="300"
                  height="450"
                  className={css.img}
                />
                <div className={css.text}>
                  <span>{movie.title}</span>
                  <span>{movie.vote_average}</span>
                </div>
                <button type="button" className={css.btn}>
                  More
                </button>
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

export default Movies;
