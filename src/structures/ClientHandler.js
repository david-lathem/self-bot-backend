import { Client as selfClient } from "discord.js-selfbot-v13";
import { Client, Intents } from "discord.js";
import { botType } from "../utils/constants.js";
import AppError from "../utils/appError.js";

class ClientHandler {
  #botClient;
  #userClient;
  constructor() {}

  getClient(req) {
    if (req.type === botType.NORMAL_BOT) {
      if (!this.#botClient?.isReady())
        throw new AppError("Bot not logged in, please re-login", 400);

      return this.#botClient;
    }

    if (req.type === botType.SELF_BOT) {
      if (!this.#userClient?.isReady())
        throw new AppError("User bot not logged in, please re-login", 400);

      return this.#userClient;
    }
  }

  async loginBot(token) {
    this.#botClient = new Client({
      intents: [Intents.FLAGS.GUILDS],
    });

    await this.#botClient.login(token);
  }

  async loginSelf(token) {
    this.#userClient = new selfClient();

    await this.#userClient.login(token);
  }
}

export default new ClientHandler();
