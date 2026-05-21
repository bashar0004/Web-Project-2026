const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Normalize Jordanian phone number to 07XXXXXXXX
function normalizePhone(phone) {
  if (!phone) return "";

  let cleaned = String(phone)
    .trim()
    .replace(/\s+/g, "")
    .replace(/-/g, "")
    .replace(/[()]/g, "");

  // +9627XXXXXXXX -> 07XXXXXXXX
  if (cleaned.startsWith("+962")) {
    cleaned = "0" + cleaned.slice(4);
  }

  // 9627XXXXXXXX -> 07XXXXXXXX
  if (cleaned.startsWith("962")) {
    cleaned = "0" + cleaned.slice(3);
  }

  // 7XXXXXXXX -> 07XXXXXXXX
  if (cleaned.startsWith("7")) {
    cleaned = "0" + cleaned;
  }

  return cleaned;
}

function isValidJordanPhone(phone) {
  return /^07\d{8}$/.test(phone);
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const normalizedName = name?.trim();
    const normalizedEmail = email?.toLowerCase().trim();
    const normalizedPhone = normalizePhone(phone);

    if (!normalizedName || !normalizedEmail || !normalizedPhone || !password) {
      return res.status(400).json({
        message: "Name, email, phone, and password are required",
      });
    }

    if (!isValidJordanPhone(normalizedPhone)) {
      return res.status(400).json({
        message: "Please enter a valid Jordanian phone number",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { phone: normalizedPhone }],
    });

    if (existingUser) {
      if (existingUser.email === normalizedEmail) {
        return res.status(400).json({
          message: "Email is already in use",
        });
      }

      if (existingUser.phone === normalizedPhone) {
        return res.status(400).json({
          message: "Phone number is already in use",
        });
      }
    }

    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      phone: normalizedPhone,
      password,
    });

    req.userId = user._id;
    req.session.userName = user.name;

    return res.status(201).json({
      message: "Registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Email or phone number is already in use",
      });
    }

    return res.status(500).json({
      message: "Registration failed",
    });
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

    let user;

    if (normalizedEmail) {
      user = await User.findOne({ email: normalizedEmail });
    } else {
      if (!isValidJordanPhone(normalizedPhone)) {
        return res.status(400).json({
          message: "Please enter a valid Jordanian phone number",
        });
      }

      user = await User.findOne({ phone: normalizedPhone });
    }

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

    req.userId = user._id;
    req.session.userName = user.name;

    return res.json({
      message: "Logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Login failed",
    });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        message: "Logout failed",
      });
    }

    res.clearCookie("connect.sid");

    return res.json({
      message: "Logged out successfully",
    });
  });
});

// GET /api/auth/me
router.get("/me", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Not logged in",
      });
    }

    const user = await User.findById(req.userId).select(
      "name email phone"
    );

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to check user",
    });
  }
});

module.exports = router;