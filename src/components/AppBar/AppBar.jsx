import { NavLink } from 'react-router-dom';
import { BiHomeAlt, BiCameraMovie } from 'react-icons/bi';
import css from './AppBar.module.scss';
import styled from 'styled-components';

const navItems = [
  { href: 'home', text: 'Home', icon: BiHomeAlt },
  { href: 'movies', text: 'Movies', icon: BiCameraMovie },
];

const NavItem = styled(NavLink)`
  color: #000;
  text-decoration: none;
  &.active {
    color: rgba(38, 92, 228, 0.784);
  }
  :hover:not(.active),
  :focus-visible:not(.active) {
    color: #000;
  }
`;
export const AppBar = () => {
  return (
    <div className={css.Appbar}>
      {navItems.map(({ href, text, icon: Icon }) => (
        <NavItem to={href} key={href} className={css.text}>
          <Icon size="26" /> {text}
        </NavItem>
      ))}
    </div>
  );
};
