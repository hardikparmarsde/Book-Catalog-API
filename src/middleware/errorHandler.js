function errorHandler(err, _req, res, _next) {
  const statusCode = Number(err.statusCode) || 500;

  if (statusCode >= 500) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  return res.status(statusCode).json({
    success: false,
    message: statusCode >= 500 ? "Internal server error" : err.message || "Error"
  });
}

module.exports = { errorHandler };

