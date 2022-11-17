import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import AppBar from '../AppBar/AppBar';
import css from './layout.module.scss';
import LoadingComponent from '../Loader/Loader';

const Layout = () => {
  return (
    <div className={css.box}>
      <AppBar />
      <Suspense fallback={LoadingComponent()}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
