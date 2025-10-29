import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById, getMovieVideos } from "../services/api";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const movieData = await getMovieById(id);
        if (!mounted) return;
        setMovie(movieData);

        const videos = await getMovieVideos(id);
        if (!mounted) return;
        const ytTrailer =
          videos?.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
          videos?.find((v) => v.site === "YouTube");

        setTrailer(ytTrailer || null);
      } catch (err) {
        console.error("MovieDetails fetch error:", err);
        setError("Failed to load movie details.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="p-6 text-center text-white">Loading...</div>;
  if (error) return <div className="p-6 text-center text-danger">{error}</div>;
  if (!movie) return <div className="p-6 text-center text-white">Movie not found.</div>;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/fallback-banner.jpg";

  const releaseYear = (movie.release_date || movie.first_air_date || "").slice(0, 4);

  return (
    <div
      className="movie-details-page text-white"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3)), url(${backdropUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "3rem 0",
      }}
    >
      <div className="container">
        {/* ✅ Transparent container for both poster + info */}
        <div className="info-box p-4 p-md-5 rounded-4 shadow-lg">
          <div className="row align-items-start g-4">
            {/* Left side - poster */}
            <div className="col-md-4 text-center">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/fallback.jpg"
                }
                alt={movie.title || movie.name}
                className="img-fluid rounded movie-poster"
                onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
              />
            </div>

            {/* Right side - trailer + info */}
            <div className="col-md-8">
              {trailer && (
                <div
                  className="ratio ratio-16x9 mb-4"
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 0 20px rgba(0,0,0,0.6)",
                    backgroundColor: "rgba(0,0,0,0.3)",
                  }}
                >
                  <iframe
                    title="Trailer"
                    src={`https://www.youtube.com/embed/${trailer.key}?rel=0`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
              )}

              <h1 className="fw-bold mb-2">{movie.title || movie.name}</h1>
              <p className="text-danger mb-2">
                {releaseYear} • {movie.runtime ? `${movie.runtime} min • ` : ""}⭐{" "}
                {typeof movie.vote_average !== "undefined" ? movie.vote_average : "N/A"}
              </p>

              <p style={{ maxWidth: 800 }}>{movie.overview}</p>

              {/* ✅ Only Watch Movie + Back buttons */}
              <div className="mt-4 d-flex flex-wrap gap-3">
                <button
                  className="btn btn-outline-light"
                  onClick={() => navigate(`/watch/movie/${id}`)}
                >
                  ▶ Watch Movie
                </button>

                <button className="btn btn-light" onClick={() => navigate(-1)}>
                  ← Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
