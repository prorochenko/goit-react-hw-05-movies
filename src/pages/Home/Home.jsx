import { getTrendingMovies } from '../../components/Services/API';
import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

export const Home = () => {
  const [title, setTitle] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getTrendingMovies().then(setTitle);
  }, []);

  return (
    <div>
      <h1>Trending Today</h1>
      <ul>
        {title.map(({ id, title }) => (
          <li key={title}>
            <NavLink to={`movies/${id}`}>{title}</NavLink>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};
