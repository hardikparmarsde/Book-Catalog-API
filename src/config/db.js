const mongoose = require("mongoose");

function looksLikeMongoUri(uri) {
  return typeof uri === "string" && /^(mongodb:\/\/|mongodb\+srv:\/\/)/i.test(uri.trim());
}

async function connectDb() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw Object.assign(new Error("Missing MONGO_URI"), { statusCode: 500 });
  }
  if (!looksLikeMongoUri(mongoUri)) {
    throw Object.assign(
      new Error(
        'Invalid MONGO_URI. Expected it to start with "mongodb://" or "mongodb+srv://".'
      ),
      { statusCode: 500 }
    );
  }

  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(mongoUri.trim());
  } catch (err) {
    const hint =
      err && (err.code === "ENOTFOUND" || err.code === "EAI_AGAIN")
        ? " (DNS lookup failed: double-check MONGO_URI host/cluster name)"
        : "";
    err.message = `Mongo connection failed${hint}: ${err.message}`;
    throw err;
  }
}

module.exports = { connectDb };

