import express from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const router = express.Router();

// Store admin credentials
const adminCredential = {
  username: "admin",
  password: process.env.ADMIN_PASSWORD, // Plain text password from .env
};

// @route   POST /api/admin/login
// @desc    Admin login
// @access  Public
router.post(
  "/login",
  [
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Check username
    if (username !== adminCredential.username) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, adminCredential.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // If valid, generate JWT token
    const payload = { user: { id: username } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  }
);

export default router;
