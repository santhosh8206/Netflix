import React, { useEffect, useState } from "react";
import { getTVShows } from "../services/api";
import MovieCard from "../components/MovieCard";
import "../components/MovieRow.css";

export default function TvShows() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    getTVShows().then(setShows).catch(console.error);
  }, []);

  return (
    <div className="movie-row mb-4">
      <h2 className="text-white mb-3">Popular TV Shows</h2>
      <div className="movie-row-scroll d-flex overflow-auto pb-2">
        {shows.map((show) => (
          <MovieCard key={show.id} movie={show} />
        ))}
      </div>
    </div>
  );
}
