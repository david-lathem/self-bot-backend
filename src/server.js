import mongoose from "mongoose";
import app from "./app.js";
import Config from "./models/Config.js";
import botClient from "./discord/botClient.js";
import userClient from "./discord/userClient.js";

const { PORT = 3000, MONGO_URI } = process.env;

await mongoose.connect(MONGO_URI);

console.log("Connected to database");

const config = await Config.findOne();

if (config && config.tokenType === "bot") await botClient.login(config.token);
if (config && config.tokenType === "user") await userClient.login(config.token);

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
