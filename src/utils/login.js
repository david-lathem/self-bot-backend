import Config from "../models/Config.js";
import ClientHandler from "../structures/ClientHandler.js";
import { botType } from "./constants.js";

export const loginBotsOnStartup = async () => {
  try {
    const normalBotconfig = await Config.findOne({
      tokenType: botType.NORMAL_BOT,
    });

    const userBotconfig = await Config.findOne({ tokenType: botType.SELF_BOT });

    if (normalBotconfig) await ClientHandler.loginBot(normalBotconfig.token);

    if (userBotconfig) await ClientHandler.loginSelf(userBotconfig.token);
  } catch (error) {
    console.log("Error logging in the tokens!");

    console.error(error);
  }
};
