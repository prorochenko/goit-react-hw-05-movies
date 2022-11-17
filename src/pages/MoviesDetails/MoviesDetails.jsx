import { getMoviesDetails } from '../../components/Services/API';
import { useState, useEffect } from 'react';
import css from './MoviesDetails.module.scss';

import {
  useParams,
  useLocation,
  useNavigate,
  Link,
  Outlet,
} from 'react-router-dom';

import LoadingComponent from '../../components/Loader/Loader';

const MoviesDetails = () => {
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

  const backLinkHref = location.state?.from ?? '/';

  return (
    <>
      {status === 'pending' && <LoadingComponent />}
      {status === 'idle' ? (
        <>
          <div>{`Hello! We are going to our backend to make magic`} </div>
          {/* <LoadingComponent /> */}
        </>
      ) : (
        ''
      )}
      {status === 'resolved' ? (
        <div>
          <Link className={css.link} to={backLinkHref}>
            <div className={css.btn}>&#11013; Go Back</div>
          </Link>

          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
              alt={details.title}
              width="300"
              height="450"
              className={css.img}
            />
            <div className={css.subbox}>
              <h1 className={css.title}>{details.title}</h1>
              <p className={css.text}>User Score: {details.vote_average}%</p>
              <h2 className={css.titlesmall}>Overview</h2>
              <p className={css.text}> {details.overview}</p>
              <h2 className={css.titlesmall}>Genres</h2>
              <p className={css.text}>
                {details.genres.map(genre => genre.name)}
              </p>
            </div>
            <div>
              <p className={css.titlesmall}>Additional Information</p>
              <div className={css.btnbox}>
                <button
                  className={css.btn}
                  type="button"
                  onClick={() => {
                    navigate(`cast`, { state: { from: location.state?.from } });
                  }}
                >
                  Cast
                </button>
                <button
                  className={css.btn}
                  type="button"
                  onClick={() => {
                    navigate(`reviews`, {
                      state: { from: location.state?.from },
                    });
                  }}
                >
                  Reviews
                </button>
              </div>
            </div>
            <Outlet />
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

export default MoviesDetails;
