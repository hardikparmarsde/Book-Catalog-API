const { verifyToken } = require("../utils/jwt");

function authRequired(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");
    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: missing or invalid Authorization header"
      });
    }

    const decoded = verifyToken(token);
    req.user = { id: decoded.id };
    return next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: invalid or expired token"
    });
  }
}

module.exports = { authRequired };

