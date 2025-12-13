import botClient from "../discord/botClient.js";
import userClient from "../discord/userClient.js";
import Config from "../models/Config.js";
import AppError from "../utils/appError.js";
import { isCorrectBotType } from "../utils/checkers.js";
import { botType } from "../utils/constants.js";

export const checkLogin = async (req, res, next) => {
  isCorrectBotType(req);

  const config = await Config.findOne({ tokenType: req.query.tokenType });

  if (!config) throw new AppError("You have not set a token yet", 400);

  if (config.tokenType === botType.NORMAL_BOT && !botClient.isReady())
    throw new AppError("Bot not logged in, please re-login", 400);

  if (config.tokenType === botType.SELF_BOT && !userClient.isReady())
    throw new AppError("User bot not logged in, please re-login", 400);

  req.type = config.tokenType;

  let client = botClient;

  if (config.tokenType === botType.SELF_BOT) client = userClient;

  req.client = client;

  next();
};
