import express from "express";
import { checkItemType } from "../utils/checkers.js";
import { backupItem } from "../controllers/backupController.js";

const backupRouter = express.Router();

backupRouter.get("/:backupId", backupItem);
backupRouter.post("/:itemId", checkItemType, backupItem);

export default backupRouter;
