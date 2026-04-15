function ok(res, { statusCode = 200, message = "OK", data = null } = {}) {
  return res.status(statusCode).json({ success: true, message, data });
}

function fail(
  res,
  { statusCode = 400, message = "Request failed", errors = null } = {}
) {
  const payload = { success: false, message };
  if (errors) payload.errors = errors;
  return res.status(statusCode).json(payload);
}

module.exports = { ok, fail };

