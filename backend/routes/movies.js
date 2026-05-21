const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

function requireAuth(req, res, next) {
  const userId = req.userId || req.body.userId || req.headers['x-user-id'];
  if (!userId)
    return res.status(401).json({ message: "You must be logged in" });
  req.userId = userId;
  next();
}

// GET /api/movies — get all movies (public)
router.get("/", async (req, res) => {
  try {
    const { search, genre, sort } = req.query;
    let query = {};

    if (genre && genre !== "All") query.genre = genre;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { director: { $regex: search, $options: "i" } },
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === "rating-desc") sortOption = { rating: -1 };
    else if (sort === "rating-asc") sortOption = { rating: 1 };
    else if (sort === "year-desc") sortOption = { year: -1 };
    else if (sort === "year-asc") sortOption = { year: 1 };
    else if (sort === "title-asc") sortOption = { title: 1 };
    else if (sort === "title-desc") sortOption = { title: -1 };

    const movies = await Movie.find(query).sort(sortOption).populate("createdBy", "name");
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/movies/:id — get single movie (public)
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("createdBy", "name");
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/movies — create movie (must be logged in)
router.post("/", requireAuth, async (req, res) => {
  try {
    const { title, director, genre, year, rating, poster, summary } = req.body;

    const movie = await Movie.create({
      title,
      director,
      genre,
      year,
      rating,
      poster,
      summary,
      createdBy: req.userId, // link to logged-in user
    });

    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/movies/:id — update movie (only owner can update)
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const { title, director, genre, year, rating, poster, summary } = req.body;

    // CRITICAL: Mongoose query checks BOTH id AND createdBy === logged-in user
    const movie = await Movie.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.userId },
      { title, director, genre, year, rating, poster, summary },
      { new: true, runValidators: true }
    );

    if (!movie)
      return res.status(403).json({ message: "Not authorized or movie not found" });

    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/movies/:id — delete movie (only owner can delete)
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    // CRITICAL: Mongoose query checks BOTH id AND createdBy === logged-in user
    const movie = await Movie.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.userId,
    });

    if (!movie)
      return res.status(403).json({ message: "Not authorized or movie not found" });

    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
