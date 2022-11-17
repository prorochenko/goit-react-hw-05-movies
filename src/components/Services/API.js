import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = '2f727d9c78f10445dbb338c23170004d';

export const getTrendingMovies = async () => {
  const response = await axios.get(`/trending/movie/day?api_key=${API_KEY}`);
  return response.data.results;
};

export const searchMovies = async query => {
  const response = await axios.get(
    `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
  );
  return response.data.results;
};

export const getMoviesDetails = async movieID => {
  const response = await axios.get(
    `/movie/${movieID}?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
};

export const getMoviesCast = async movieID => {
  const response = await axios.get(
    `/movie/${movieID}/credits?api_key=${API_KEY}&language=en-US`
  );
  return response.data.cast;
};

export const getMoviesReviews = async movieID => {
  const response = await axios.get(
    `/movie/${movieID}/reviews?api_key=${API_KEY}&language=en-US`
  );
  return response.data.results;
};
