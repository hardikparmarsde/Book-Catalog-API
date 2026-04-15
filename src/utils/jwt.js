const jwt = require("jsonwebtoken");

function signToken(payload) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw Object.assign(new Error("Missing JWT_SECRET"), { statusCode: 500 });
  }
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  return jwt.sign(payload, secret, { expiresIn });
}

function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw Object.assign(new Error("Missing JWT_SECRET"), { statusCode: 500 });
  }
  return jwt.verify(token, secret);
}

module.exports = { signToken, verifyToken };

