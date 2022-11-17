import { getTrendingMovies } from '../../components/Services/API';
import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import css from './Home.module.scss';

const Home = () => {
  const [title, setTitle] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getTrendingMovies().then(setTitle);
  }, []);

  return (
    <div>
      <h1 className={css.title}>Trending Today</h1>
      <ul className={css.items}>
        {title.map(({ id, title, poster_path, vote_average }) => (
          <li key={title} className={css.list}>
            <NavLink to={`/movies/${id}`} state={{ from: location }}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt={title}
                width="300"
                height="450"
                className={css.img}
              />
              <div className={css.text}>
                <span>{title}</span>
                <span>{vote_average}</span>
              </div>
              <button type="button" className={css.btn}>
                More
              </button>
            </NavLink>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default Home;
