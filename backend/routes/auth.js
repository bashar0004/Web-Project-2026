const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Helpers

/**
 * Normalizes a phone number to the local Jordanian format (0XXXXXXXXX).
 * Strips whitespace, dashes, and handles +962 / 962 prefixes.
 *
 * @param {string} phone - Raw phone input from the user
 * @returns {string} Normalized phone number, or empty string if falsy
 */
function normalizePhone(phone) {
  if (!phone) return "";

  let cleaned = phone.replace(/\s+/g, "").replace(/-/g, "");

  if (cleaned.startsWith("+962")) {
    cleaned = "0" + cleaned.slice(4);
  }

  if (cleaned.startsWith("962")) {
    cleaned = "0" + cleaned.slice(3);
  }

  return cleaned;
}

// ---------------------------------------------------------------------------
// Auth Routes
// ---------------------------------------------------------------------------

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // --- Normalize inputs ---
    const normalizedEmail = email?.toLowerCase().trim();
    const normalizedPhone = normalizePhone(phone);

    // --- Validate required fields ---
    if (!name || !normalizedEmail || !normalizedPhone || !password) {
      return res.status(400).json({
        message: "Name, email, phone, and password are required",
      });
    }

    // --- Validate password strength ---
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    // --- Check for duplicate email or phone ---
    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { phone: normalizedPhone }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or phone number is already in use",
      });
    }

    // --- Create user & initialize session ---
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      phone: normalizedPhone,
      password,
    });

    req.session.userId = user._id;
    req.session.userName = user.name;

    res.status(201).json({
      message: "Registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    const normalizedEmail = email?.toLowerCase().trim();
    const normalizedPhone = normalizePhone(phone);

    if ((!normalizedEmail && !normalizedPhone) || !password) {
      return res.status(400).json({
        message: "Email or phone and password are required",
      });
    }

    const user = await User.findOne(
      normalizedEmail ? { email: normalizedEmail } : { phone: normalizedPhone },
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid login details",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid login details",
      });
    }

    req.session.userId = user._id;
    req.session.userName = user.name;

    res.json({
      message: "Logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

// GET /api/auth/me
router.get("/me", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const user = await User.findById(req.session.userId).select(
      "name email phone",
    );

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
