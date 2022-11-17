import css from './layout.module.scss';

import { AppBar } from '../AppBar/AppBar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className={css.box}>
      <div>
        <AppBar />
        <Outlet />
      </div>
    </div>
  );
};
