import Config from "../../models/Config.js";
import { botType } from "../../utils/constants.js";
import botClient from "../botClient.js";
import userClient from "../userClient.js";

export const loginBotsOnStartup = async () => {
  const normalBotconfig = await Config.findOne({
    tokenType: botType.NORMAL_BOT,
  });

  const userBotconfig = await Config.findOne({ tokenType: botType.SELF_BOT });

  if (normalBotconfig) await botClient.login(normalBotconfig.token);

  if (userBotconfig) await userClient.login(userBotconfig.token);
};
