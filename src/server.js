const http = require("http");

const app = require("./app");
const { connectDb } = require("./config/db");

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDb();

  const server = http.createServer(app);
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server:", err);
  process.exit(1);
});

