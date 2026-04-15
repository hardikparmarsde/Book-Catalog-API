const bcrypt = require("bcryptjs");

const User = require("../models/User");
const { signToken } = require("../utils/jwt");

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered"
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: { id: user._id, name: user.name, email: user.email }
      }
    });
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered"
      });
    }
    return next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = signToken({ id: user._id.toString() });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: { id: user._id, name: user.name, email: user.email }
      }
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { register, login };

