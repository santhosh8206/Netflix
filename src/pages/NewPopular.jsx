import React, { useEffect, useState } from "react";
import { getNewPopular } from "../services/api";
import MovieCard from "../components/MovieCard";

export default function NewPopular() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getNewPopular().then(setMovies).catch(console.error);
  }, []);

  return (
    <div className="movie-row mb-4">
      <h2 className="text-white mb-3">New & Popular</h2>
      <div className="movie-row-scroll d-flex overflow-auto pb-2">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}
