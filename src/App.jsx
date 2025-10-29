// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import TopNavbar from "./components/TopNavbar";
import MovieDetails from "./components/MovieDetails";
import Login from "./components/Login";
import Home from "./pages/Home";
import WatchPage from "./pages/WatchPage";

// ⬇️ new imports
import TvShows from "./pages/TvShows";
import MoviesPage from "./pages/MoviesPage";
import NewPopular from "./pages/NewPopular";
import MyList from "./pages/MyList";

import {
  // getMovies,
  getTopRated,
  getMoviesByGenre,
  getTrending,
  // getTVShows,
} from "./services/api";

export default function App() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [action, setAction] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const [pop, top, act] = await Promise.all([
          getTrending(),
          getTopRated(),
          getMoviesByGenre(28),
        ]);
        setTrending(pop);
        setTopRated(top);
        setAction(act);
        setFilteredMovies(pop);
      } catch (err) {
        console.error("Error loading movies:", err);
      }
    };
    fetchAllMovies();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredMovies(trending);
      return;
    }
    const filtered = trending.filter(
      (movie) =>
        movie.title?.toLowerCase().includes(query.toLowerCase()) ||
        movie.tamilTitle?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div className="app bg-dark min-vh-100 text-white">
      <TopNavbar
        onLoginClick={() => setIsLoggedIn(false)}
        onSearch={handleSearch}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              trending={filteredMovies.length > 0 ? filteredMovies : trending}
              topRated={topRated}
              action={action}
            />
          }
        />

        {/* ✅ New Pages */}
        <Route path="/tvshows" element={<TvShows />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/new-popular" element={<NewPopular />} />
        <Route path="/mylist" element={<MyList />} />

        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watch/movie/:id" element={<WatchPage />} />
      </Routes>
    </div>
  );
}
