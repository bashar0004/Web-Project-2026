import React from "react";
import "./MovieCard.css";

const genreColors = {
  "Sci-Fi": "#00c8ff",
  Action: "#ff6b35",
  Crime: "#c084fc",
  Drama: "#facc15",
  Thriller: "#f87171",
  Horror: "#4ade80",
  Animation: "#fb923c",
};

function StarRating({ rating }) {
  const stars = Math.round(rating / 2); // out of 5
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= stars ? "star filled" : "star"}>
          ★
        </span>
      ))}
      <span className="rating-num">{rating.toFixed(1)}</span>
    </div>
  );
}

function MovieCard({ movie }) {
  const accentColor = genreColors[movie.genre] || "#ffffff";

  return (
    <div className="movie-card" style={{ "--accent": accentColor }}>
      {/* Poster */}
      <div className="card-poster">
        <img src={movie.poster} alt={movie.title} loading="lazy" />

        {/* Hover overlay */}
        <div className="card-overlay">
          <div className="overlay-inner">
            <p className="overlay-summary">{movie.summary}</p>
            <div className="overlay-meta">
              <span>🎬 {movie.director}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card info */}
      <div className="card-info">
        <div className="card-header">
          <span className="genre-badge">{movie.genre}</span>
          <span className="year">{movie.year}</span>
        </div>
        <h3 className="movie-title">{movie.title}</h3>
        <StarRating rating={movie.rating} />
      </div>
    </div>
  );
}

export default MovieCard;
