import { Client } from "discord.js-selfbot-v13";

const userClient = new Client();

userClient.on("ready", () => {
  console.log(`[USER-BOT] Logged in as ${userClient.user.username}`);
});

userClient.type = "user";

export default userClient;
