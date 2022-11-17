// import { Box } from './Box';
import css from './layout.module.scss';

import { AppBar } from '../AppBar/AppBar';

export const Layout = () => {
  return (
    <div className={css.box}>
      <div>
        <AppBar />
      </div>
    </div>
  );
};
