import { useState, useEffect, useCallback } from "react";
import MovieCard from "../components/MovieCard";
import "./MainPage.css";

const API = import.meta.env.VITE_API_URL;

const GENRES = [
  "All",
  "Sci-Fi",
  "Action",
  "Crime",
  "Drama",
  "Thriller",
  "Horror",
  "Animation",
];

const SORT_OPTIONS = [
  { value: "rating-desc", label: "⭐ Highest Rated" },
  { value: "rating-asc", label: "Rating (Low–High)" },
  { value: "year-desc", label: "📅 Newest First" },
  { value: "year-asc", label: "Oldest First" },
  { value: "title-asc", label: "🔤 A → Z" },
  { value: "title-desc", label: "Z → A" },
];

const emptyForm = {
  title: "",
  director: "",
  genre: "Action",
  year: "",
  rating: "",
  poster: "",
  summary: "",
};

function MainPage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [sortBy, setSortBy] = useState("rating-desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [user, setUser] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");

 useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (genre !== "All") params.append("genre", genre);
      if (sortBy) params.append("sort", sortBy);

      const res = await fetch(`${API}/movies?${params}`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to load movies. Please try again.");
        return;
      }

      setMovies(data);
    } catch (err) {
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [search, genre, sortBy]);

  useEffect(() => {
    const timer = setTimeout(fetchMovies, 300);
    return () => clearTimeout(timer);
  }, [fetchMovies]);

  async function handleLogout() {
    try {
      await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("user");
    setUser(null);
    setShowForm(false);
  }

  function openAddForm() {
    setEditingId(null);
    setFormData(emptyForm);
    setFormError("");
    setShowForm(true);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    setFormError("");

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API}/movies/${editingId}` : `${API}/movies`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("user");
          setUser(null);
          setShowForm(false);
          alert("Your login session expired. Please login again.");
          return;
        }

        setFormError(data.message || "Failed to save movie");
        return;
      }

      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);
      fetchMovies();
    } catch (err) {
      setFormError("Something went wrong.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this movie?")) return;

    try {
      const res = await fetch(`${API}/movies/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.status === 401) {
        localStorage.removeItem("user");
        setUser(null);
        alert("Your login session expired. Please login again.");
        return;
      }

      fetchMovies();
    } catch (err) {
      alert("Failed to delete movie.");
    }
  }

  function handleEdit(movie) {
    setEditingId(movie._id);
    setFormData({
      title: movie.title || "",
      director: movie.director || "",
      genre: movie.genre || "Action",
      year: movie.year || "",
      rating: movie.rating || "",
      poster: movie.poster || "",
      summary: movie.summary || "",
    });
    setFormError("");
    setShowForm(true);
  }

  return (
    <div className="main-page">
      <header className="hero">
        <div className="hero-bg" />

        <div className="hero-content">
          <p className="hero-eyebrow">🎬 Curated Cinema</p>

          <h1 className="hero-title">
            Find Your Next
            <br />
            <span className="hero-accent">Favourite Film</span>
          </h1>

          <p className="hero-sub">
            Explore movies — filter, search, and discover.
          </p>

          <div className="hero-actions">
            {user ? (
              <>
                <span className="user-greeting">👋 {user.name}</span>
                <button className="btn-add" onClick={openAddForm}>
                  + Add Movie
                </button>
                <button className="btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <p className="login-to-add-text">Login to add movies</p>
            )}
          </div>
        </div>
      </header>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>{editingId ? "Edit Movie" : "Add New Movie"}</h3>

            {formError && <div className="auth-error">{formError}</div>}

            <form className="auth-form" onSubmit={handleFormSubmit}>
              {[
                {
                  name: "title",
                  label: "Title",
                  type: "text",
                  placeholder: "Inception",
                },
                {
                  name: "director",
                  label: "Director",
                  type: "text",
                  placeholder: "Christopher Nolan",
                },
                {
                  name: "year",
                  label: "Year",
                  type: "number",
                  placeholder: "2010",
                },
                {
                  name: "rating",
                  label: "Rating (0-10)",
                  type: "number",
                  placeholder: "8.8",
                },
                {
                  name: "poster",
                  label: "Poster URL",
                  type: "text",
                  placeholder: "https://...",
                },
                {
                  name: "summary",
                  label: "Summary",
                  type: "text",
                  placeholder: "Brief description...",
                },
              ].map((f) => (
                <div className="form-group" key={f.name}>
                  <label>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={formData[f.name]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [f.name]: e.target.value,
                      })
                    }
                    required
                    step={f.name === "rating" ? "0.1" : undefined}
                  />
                </div>
              ))}

              <div className="form-group">
                <label>Genre</label>
                <select
                  className="sort-select"
                  value={formData.genre}
                  onChange={(e) =>
                    setFormData({ ...formData, genre: e.target.value })
                  }
                >
                  {GENRES.filter((g) => g !== "All").map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", gap: "0.8rem" }}>
                <button type="submit" className="auth-btn">
                  {editingId ? "Save Changes" : "Add Movie"}
                </button>

                <button
                  type="button"
                  className="btn-logout"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="controls-bar">
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

      <div className="results-meta">
        {loading ? (
          <span>Loading movies...</span>
        ) : error ? (
          <span style={{ color: "#f87171" }}>{error}</span>
        ) : (
          <span>
            Showing <strong>{movies.length}</strong> movie
            {movies.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {!loading && !error && movies.length > 0 && (
        <section className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              currentUserId={user?.id}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </section>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="empty-state">
          <p className="empty-icon">🎞️</p>
          <p>No movies found.</p>

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