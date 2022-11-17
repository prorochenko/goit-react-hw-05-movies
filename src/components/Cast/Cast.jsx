import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMoviesCast } from '../Services/API';
import NoActor from '../../components/images/NoActor.png';

const Cast = () => {
  const { movieID } = useParams();
  const [actors, setActors] = useState([]);

  useEffect(() => {
    getMoviesCast(Number(movieID)).then(setActors);
  }, [movieID]);

  return (
    <ul>
      {actors.map(actor => (
        <li key={actor.id}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w300/${actor.profile_path}`
                : NoActor
            }
            alt={actor.name}
            width="200"
            height="300"
          />
          <h3>{actor.name}</h3>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default Cast;
