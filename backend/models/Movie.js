const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    director: {
      type: String,
      required: [true, "Director is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: ["Sci-Fi", "Action", "Crime", "Drama", "Thriller", "Horror", "Animation"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: 1900,
      max: new Date().getFullYear() + 1,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 0,
      max: 10,
    },
    poster: {
      type: String,
      default: "https://via.placeholder.com/500x750?text=No+Poster",
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
    },
    // Reference to the user who created this movie — required by rubric
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
