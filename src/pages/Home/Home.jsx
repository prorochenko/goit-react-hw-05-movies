import { getTrendingMovies } from '../../components/Services/API';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const Home = () => {
  const [title, setTitle] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(setTitle);
  }, []);

  return (
    <div>
      <h1>Trending Today</h1>
      <ul>
        {title.map(title => (
          <li key={title.title}>
            <NavLink to={`${title.id}`}>{title.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
