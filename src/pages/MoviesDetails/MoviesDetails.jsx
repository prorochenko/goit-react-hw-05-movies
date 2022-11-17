import { getMoviesDetails } from '../../components/Services/API';
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import LoadingComponent from '../../components/Loader/Loader';

export const MoviesDetails = () => {
  const [details, setDetails] = useState(null);
  const { movieID } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (movieID === null) {
      return;
    }
    // .then(setDetails);
    async function fetchMovies() {
      try {
        setStatus('pending');
        const movies = await getMoviesDetails(movieID);
        if (movies.length === 0) {
          return Promise.reject(
            new Error(`Sorry, we didn't infortmaion`)
          ).catch(error => {
            setStatus('rejected');
          });
        } else {
          setStatus('resolved');
          setDetails(movies);
        }
      } catch {
        setStatus('idle');
      }
    }
    fetchMovies();
  }, [movieID, status]);

  return (
    <>
      {status === 'pending' && <LoadingComponent />}
      {status === 'idle' ? (
        <>
          <p>{`Hello! We are going to our backend to make magic`} </p>
          <LoadingComponent />
        </>
      ) : (
        ''
      )}
      {status === 'resolved' ? (
        <div>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
              alt={details.title}
              width="300"
              height="450"
            />
            <h1>{details.title}</h1>
            <p>User Score: {details.vote_average}%</p>
            <h2>Overview</h2>
            <p>{details.overview}</p>
            <h2>Genres</h2>
            <p>{details.genres.map(genre => genre.name)}</p>
          </div>
          <div>
            <h2>Additional Information</h2>
            <ul>
              <button
                type="button"
                onClick={() => {
                  navigate(`cast`, { state: { from: location.state?.from } });
                }}
              >
                Cast
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate(`reviews`, {
                    state: { from: location.state?.from },
                  });
                }}
              >
                Reviews
              </button>
            </ul>
          </div>
        </div>
      ) : (
        ''
      )}

      {/* {details ? (
        <div>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
              alt={details.title}
              width="300"
              height="450"
            />
            <h1>{details.title}</h1>
            <p>User Score: {details.vote_average}%</p>
            <h2>Overview</h2>
            <p>{details.overview}</p>
            <h2>Genres</h2>
            <p>{details.genres.map(genre => genre.name)}</p>
          </div>
          <div>
            <h2>Additional Information</h2>
            <ul>
              <button
                type="button"
                onClick={() => {
                  navigate(`cast`, { state: { from: location.state?.from } });
                }}
              >
                Cast
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate(`reviews`, {
                    state: { from: location.state?.from },
                  });
                }}
              >
                Reviews
              </button>
            </ul>
          </div>
        </div>
      ) : (
        <LoadingComponent />
      )} */}
    </>
  );
};
