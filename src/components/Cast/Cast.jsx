import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMoviesCast } from '../Services/API';
import NoActor from '../../components/images/NoActor.png';
import css from './Cast.module.scss';

const Cast = () => {
  const { movieID } = useParams();
  const [actors, setActors] = useState([]);

  useEffect(() => {
    getMoviesCast(Number(movieID)).then(setActors);
  }, [movieID]);

  return (
    <ul className={css.cast}>
      {actors.map(actor => (
        <li key={actor.id} className={css.list}>
          <div>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w300/${actor.profile_path}`
                  : NoActor
              }
              alt={actor.name}
              width="200"
              height="300"
              className={css.img}
            />
          </div>
          <h3 className={css.titlesmall}>{actor.name}</h3>
          <p className={css.text}>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default Cast;
