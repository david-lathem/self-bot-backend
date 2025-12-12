import botClient from "../discord/botClient.js";
import userClient from "../discord/userClient.js";
import { sendResponse } from "../utils/sendResponse.js";

export const getServers = async (req, res) => {
  let servers = [];
  let client = botClient;

  if (req.type === "user") client = userClient;

  servers = [...client.guilds.cache.values()];

  sendResponse(req, res, servers);
};
