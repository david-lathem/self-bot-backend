import { Client, GatewayIntentBits } from "discord.js";

const botClient = new Client({
  intents: [GatewayIntentBits.Guilds],
});

botClient.on("clientReady", () => {
  console.log(`[BOT] Logged in as ${botClient.user.username}`);
});

botClient.type = "bot";

export default botClient;
