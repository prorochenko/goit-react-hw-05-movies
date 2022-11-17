import { getMoviesDetails } from '../../components/Services/API';
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

export const MoviesDetails = () => {
  const [details, setDetails] = useState(null);
  const { movieID } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getMoviesDetails(movieID).then(setDetails);
  }, [movieID]);

  return (
    <>
      {details ? (
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
    </>
  );
};
