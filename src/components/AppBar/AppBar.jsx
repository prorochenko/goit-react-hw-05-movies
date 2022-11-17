import { NavLink } from 'react-router-dom';
import { BiHomeAlt, BiCameraMovie } from 'react-icons/bi';

import css from './AppBar.module.scss';
import styled from 'styled-components';

const navItems = [
  { href: 'home', text: 'Home', icon: BiHomeAlt },
  { href: 'movies', text: 'Movies', icon: BiCameraMovie },
];

const NavItem = styled(NavLink)`
  color: #f9f9f9;
  text-decoration: none;
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
  &.active {
    color: #00b9ae;
  }
  :hover:not(.active),
  :focus-visible:not(.active) {
    color: #f9f9f9;
  }
`;

const AppBar = () => {
  return (
    <div className={css.Appbar}>
      {navItems.map(({ href, text, icon: Icon }) => (
        <NavItem to={href} key={href} className={css.text}>
          <Icon size="24" /> {text}
        </NavItem>
      ))}
    </div>
  );
};

export default AppBar;
