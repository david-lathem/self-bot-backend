import mongoose from "mongoose";
import app from "./app.js";
import { loginBotsOnStartup } from "./utils/login.js";

const { PORT = 3000, MONGO_URI } = process.env;

await mongoose.connect(MONGO_URI);

console.log("Connected to database");

console.log(`Logging in the bots (if any)`);

await loginBotsOnStartup();

console.log("Logged in!");

const server = app.listen(PORT, () => {
  console.log(`Server is running at port http://localhost:${PORT}`);
});

// give some time to server to process requests before shutting down

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
