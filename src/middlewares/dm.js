import { botType } from "../utils/constants.js";

export const dmOnly = async (req, res, next) => {
  if (req.type === botType.NORMAL_BOT)
    throw new Error("No DMs with bot, use user bot", 400);

  next();
};
