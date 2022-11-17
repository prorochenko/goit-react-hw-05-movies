import toast, { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './Layout/Layout';

export const App = () => {
  const notify = () =>
    toast('Hello Darkness!', {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="*" element={<p>Path not resolved</p>} />
      </Routes>
      <div>React homework template</div>
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
