import React, { useEffect, useState } from "react";
import { getMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import "../components/MovieRow.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then(setMovies).catch(console.error);
  }, []);

  return (
    <div className="movie-row mb-4">
      <h2 className="text-white mb-3">All Movies</h2>
      <div className="movie-row-scroll d-flex overflow-auto pb-2">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
          
        ))}
      </div>
    </div>
  );
}
