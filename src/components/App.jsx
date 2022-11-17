import toast, { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './Layout/Layout';
import { Home } from '../pages/Home/Home';
import { Movies } from '../pages/Movies/Movies';
import { MoviesDetails } from '../pages/MoviesDetails/MoviesDetails';
import { Cast } from './Cast/Cast';
import { Reviews } from './Reviews/Reviews';
import LoadingComponent from '../components/Loader/Loader';

export const App = () => {
  const notify = () =>
    toast.success('Good Job! 👏', {
      position: 'top-right',
    });

  return (
    <>
      <Suspense fallback={<LoadingComponent />}>
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
      </Suspense>

      <button type="button" onClick={notify}>
        press me
      </button>
      <div>
        <Toaster />
      </div>
    </>
  );
};

//home
// Home under -> Trending today
//movies
//moview-search?querry=batman
// -- movies/id/cast
// -- movies/id/reviews
