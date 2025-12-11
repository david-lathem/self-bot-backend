import mongoose from "mongoose";
import app from "./app.js";

const { PORT = 3000, MONGO_URI } = process.env;

mongoose.connect(MONGO_URI).then(() => console.log("Connected to database"));

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
