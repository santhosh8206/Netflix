import React from "react";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Hero({ movies = [] }) {
  const imageBase = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate();

  if (!movies || movies.length === 0) return null;

  return (
    <div className="hero-carousel mb-4">
      <Carousel fade interval={4000} controls={false}>
        {movies.slice(0, 5).map((movie) => (
          <Carousel.Item key={movie.id}>
            <div
              className="hero-slide"
              style={{
                backgroundImage: `url(${imageBase}${movie.backdrop_path})`,
                height: "85vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              {/* Dark overlay for text visibility */}
              <div
                className="overlay position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.2))",
                }}
              ></div>

              {/* Content area */}
              <div
                className="content position-absolute text-white"
                style={{
                  bottom: "20%",
                  left: "5%",
                  maxWidth: "600px",
                  zIndex: 10,
                }}
              >
                <h1 className="fw-bold mb-3">{movie.title || movie.name}</h1>
                <p
                  className="lead mb-4"
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.5",
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {movie.overview?.slice(0, 160)}...
                </p>

                {/* ✅ Netflix-style buttons */}
                <div className="d-flex gap-3">
                  <button
                    className="btn btn-light btn-lg fw-semibold px-4"
                    onClick={() => navigate(`/watch/movie/${movie.id}`)}
                    style={{
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    ▶ Play
                  </button>

                  <button
                    className="btn btn-secondary btn-lg fw-semibold px-4"
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    style={{
                      backgroundColor: "rgba(109,109,110,0.7)",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  >
                    ℹ️ More Info
                  </button>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
