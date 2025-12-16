import botClient from "../discord/botClient.js";
import userClient from "../discord/userClient.js";
import Config from "../models/Config.js";
import { botType } from "./constants.js";

export const loginBotsOnStartup = async () => {
  const normalBotconfig = await Config.findOne({
    tokenType: botType.NORMAL_BOT,
  });

  const userBotconfig = await Config.findOne({ tokenType: botType.SELF_BOT });

  if (normalBotconfig) await botClient.login(normalBotconfig.token);

  if (userBotconfig) await userClient.login(userBotconfig.token);
};
