import Config from "../models/Config";
import AppError from "../utils/appError";

export const checkLogin = async (req, res, next) => {
  const config = await Config.findOne();

  if (!config) throw new AppError("You have not set a token yet", 400);

  req.type = config.tokenType;

  next();
};
