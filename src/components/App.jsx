import toast, { Toaster } from 'react-hot-toast';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './Layout/Layout';

const Home = lazy(() => import('../pages/Home/Home'));
const Movies = lazy(() => import('../pages/Movies/Movies'));
const MoviesDetails = lazy(() =>
  import('../pages/MoviesDetails/MoviesDetails')
);
const Cast = lazy(() => import('../components/Cast/Cast'));
const Reviews = lazy(() => import('../components/Reviews/Reviews'));

export const App = () => {
  const notify = () =>
    toast.success('Good Job! 👏', {
      position: 'top-right',
    });

  return (
    <>
      {/* <Suspense fallback={<LoadingComponent />}> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieID" element={<MoviesDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
      {/* </Suspense> */}

      <button type="button" onClick={notify}>
        press me
      </button>
      <div>
        <Toaster />
      </div>
    </>
  );
};
