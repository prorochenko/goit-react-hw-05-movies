import { Link } from 'react-router-dom';
import { RiMovie2Line } from 'react-icons/ri';
import css from './AppBar.module.scss';

const navItems = [
  { href: 'home', text: 'Home' },
  { href: 'movies', text: 'Movies' },
];

export const AppBar = () => {
  return (
    <div className={css.Appbar}>
      <Link to="home" key="home">
        <RiMovie2Line size={50} />
      </Link>
      {navItems.map(({ href, text }) => (
        <Link to={href} key={href}>
          {text}
        </Link>
      ))}
    </div>
  );
};
