// src/services/api.js
import axios from "axios";

const API_KEY = "eaadf1eff34aad27fc63545413fef65e"; // your TMDB key
const BASE_URL = "https://api.themoviedb.org/3";

const API = axios.create({ baseURL: BASE_URL });

export const getTrending = async () => {
  const res = await API.get(`/trending/movie/week?api_key=${API_KEY}`);
  return res.data.results;
};

export const getMovies = async () => {
  const res = await API.get(`/discover/movie?api_key=${API_KEY}`);
  return res.data.results;
};

export const getTopRated = async () => {
  const res = await API.get(`/movie/top_rated?api_key=${API_KEY}`);
  return res.data.results;
};

export const getMoviesByGenre = async (genreId) => {
  const res = await API.get(
    `/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  );
  return res.data.results;
};

export const getTVShows = async () => {
  const res = await API.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`);
  return res.data.results;
};

export const getNewPopular = async () => {
  const res = await API.get(`/movie/now_playing?api_key=${API_KEY}`);
  return res.data.results;
};

// ✅ Fetch movie details by ID
export const getMovieById = async (id) => {
  const res = await API.get(
    `/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images,credits`
  );
  return res.data;
};

// ✅ Fetch movie videos/trailers by ID
export const getMovieVideos = async (id) => {
  const res = await API.get(`/movie/${id}/videos?api_key=${API_KEY}`);
  return res.data.results;
};
