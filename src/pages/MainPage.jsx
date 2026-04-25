import React, { useState, useMemo } from "react";
import MovieCard from "../components/MovieCard";
import movies from "../data/movies";
import "./MainPage.css";

const GENRES = ["All", "Sci-Fi", "Action", "Crime", "Drama", "Thriller", "Horror", "Animation"];

const SORT_OPTIONS = [
  { value: "rating-desc", label: "⭐ Highest Rated" },
  { value: "rating-asc", label: "Rating (Low–High)" },
  { value: "year-desc", label: "📅 Newest First" },
  { value: "year-asc", label: "Oldest First" },
  { value: "title-asc", label: "🔤 A → Z" },
  { value: "title-desc", label: "Z → A" },
];

function MainPage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [sortBy, setSortBy] = useState("rating-desc");

  // Combined filter + sort — both applied simultaneously
  const displayedMovies = useMemo(() => {
    let result = [...movies];

    // 1. Filter by search query
    const query = search.toLowerCase().trim();
    if (query) {
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.director.toLowerCase().includes(query)
      );
    }

    // 2. Filter by genre
    if (genre !== "All") {
      result = result.filter((m) => m.genre === genre);
    }

    // 3. Sort
    const [key, dir] = sortBy.split("-");
    result.sort((a, b) => {
      let valA = a[key];
      let valB = b[key];
      if (key === "title") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      if (valA < valB) return dir === "asc" ? -1 : 1;
      if (valA > valB) return dir === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [search, genre, sortBy]);

  return (
    <div className="main-page">
      {/* Hero Banner */}
      <header className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <p className="hero-eyebrow">🎬 Curated Cinema</p>
          <h1 className="hero-title">
            Find Your Next<br />
            <span className="hero-accent">Favourite Film</span>
          </h1>
          <p className="hero-sub">
            Explore {movies.length} handpicked movies — filter, search, and discover.
          </p>
        </div>
      </header>

      {/* Controls */}
      <section className="controls-bar">
        {/* Search */}
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by title or director…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch("")}>
              ✕
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="select-wrap">
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Genre Pills */}
      <section className="genre-pills">
        {GENRES.map((g) => (
          <button
            key={g}
            className={`pill ${genre === g ? "pill-active" : ""}`}
            onClick={() => setGenre(g)}
          >
            {g}
          </button>
        ))}
      </section>

      {/* Results count */}
      <div className="results-meta">
        {displayedMovies.length === 0 ? (
          <span>No movies match your search.</span>
        ) : (
          <span>
            Showing <strong>{displayedMovies.length}</strong> movie
            {displayedMovies.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Movie Grid */}
      {displayedMovies.length > 0 ? (
        <section className="movie-grid">
          {displayedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </section>
      ) : (
        <div className="empty-state">
          <p className="empty-icon">🎞️</p>
          <p>No movies found. Try a different search or genre.</p>
          <button
            className="pill pill-active"
            onClick={() => {
              setSearch("");
              setGenre("All");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default MainPage;
