import botClient from "../discord/botClient.js";
import userClient from "../discord/userClient.js";
import Config from "../models/Config.js";
import AppError from "../utils/appError.js";
import { isCorrectBotType } from "../utils/checkers.js";
import { botType } from "../utils/constants.js";
import { sendResponse } from "../utils/sendResponse.js";

export const getConfig = async (req, res) => {
  const configs = await Config.find({});

  sendResponse(req, res, configs);
};

export const setConfig = async (req, res) => {
  const { token } = req.body;
  const { tokenType } = req.query;

  if (!token || !tokenType)
    throw new AppError(
      `Token (in body) and tokenType (in query param) (${botType.NORMAL_BOT} | ${botType.SELF_BOT}) are required`,
      400
    );

  isCorrectBotType(req);

  let err;

  if (tokenType === botType.NORMAL_BOT)
    err = await botClient.login(token).catch((e) => e);

  if (tokenType === botType.SELF_BOT)
    err = await userClient.login(token).catch((e) => e);

  if (err instanceof Error) {
    if (
      err.code === "TOKEN_INVALID" ||
      err.code === "TokenInvalid" ||
      err.code === "INVALID_INTENTS" // happens when normal bot token used on self bot login
    )
      throw new AppError("Invalid token", 400);

    console.error(err);

    // if err other than token invalid
    throw new AppError("Something went wrong", 500);
  }

  const existing = await Config.findOne();

  const config = await Config.findOneAndUpdate(
    { tokenType },
    { token, tokenType },
    { new: true, upsert: true, runValidators: true }
  );

  const statusCode = existing ? 200 : 201;

  sendResponse(req, res, config, statusCode);
};
