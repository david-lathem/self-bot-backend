import { sendResponse } from "../utils/sendResponse.js";

export const backupDM = async (req, res) => {
  sendResponse(req, res, dms);
};
