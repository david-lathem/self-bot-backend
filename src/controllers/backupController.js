import AppError from "../utils/appError.js";
import { startBackup } from "../utils/backup.js";
import { isDmOrGroup, isGuild, throwErrIfBot } from "../utils/checkers.js";
import { sendResponse } from "../utils/sendResponse.js";

export const backupItem = async (req, res) => {
  const {
    params: { itemId },
    query: { itemType: requestItemType },
  } = req;

  if (!req.body?.itemName)
    throw new AppError(
      "Please supply itemName (group, dm, server name) in body",
      400
    );

  if (isGuild(requestItemType)) {
    const guild = req.client.guilds.cache.get(itemId);

    if (!guild) throw new AppError(`${requestItemType} not found`, 404);

    startBackup(requestItemType, req.body.itemName, guild); // no await so it processed in background
  }

  if (isDmOrGroup(requestItemType)) {
    throwErrIfBot(req);

    const dm = req.client.channels.cache.get(itemId);

    if (!dm || !(dm.type === "DM" || dm.type === "GROUP_DM"))
      throw new AppError(`${requestItemType} not found`, 404);

    startBackup(requestItemType, req.body.itemName, dm); // no await so it processed in background
  }

  sendResponse(req, res, undefined);
};
