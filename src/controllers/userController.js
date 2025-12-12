import { sendResponse } from "../utils/sendResponse.js";

export const getMe = (req, res) => {
  const data = req.client.user;

  sendResponse(req, res, data);
};
